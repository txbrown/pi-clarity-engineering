# Maintainability Review: Dispatch AVAudioEngine Access to Main Thread

**PR:** tamlyn/react-native-elementary#27
**File:** `ios/Elementary.mm`
**Scope:** +93 / −76 lines (one file)

---

## 1. Repeated Pattern — Not DRY Enough

The same dispatch + init-guard + reject boilerplate appears **four times**, nearly verbatim:

| Method | Pattern |
|---|---|
| `getAudioInfo` | `dispatch_async(main) → initGuard → outputNode access → resolve` |
| `getSampleRate` | `dispatch_async(main) → initGuard → outputNode access → resolve` |
| `loadAudioResource` | `dispatch_async(main) → initGuard → dispatch_async(global) → I/O → resolve` |
| `unloadAudioResource` | `dispatch_async(main) → initGuard → I/O → resolve` |

The **comment** explaining *why* is also copy-pasted identically three times:

```objc
// AVAudioEngine.outputNode must be accessed on the main thread to avoid
// an RPC timeout in AURemoteIO::Cleanup when called from a background queue.
```

(`loadAudioResource` adds a second sentence — "Perform engine initialization on main thread before dispatching heavy work." — which is the only variant.)

**Recommendation:** Extract a helper that wraps the main-queue dispatch + init-guard:

```objc
- (void)performOnMainThread:(void (^)(void))block
            requiresEngine:(BOOL)requiresEngine
                    reject:(RCTPromiseRejectBlock)reject {
  dispatch_async(dispatch_get_main_queue(), ^{
    if (requiresEngine && ![self initializeAudioEngineIfNeeded]) {
      reject(@"E_AUDIO_ENGINE", @"Failed to initialize audio engine", nil);
      return;
    }
    block();
  });
}
```

Or, more idiomatically for Cocoa, a category method on `NSObject` that ensures main-queue execution. Either way, the four call-sites shrink to one line each, and the *rationale* comment lives in one place.

---

## 2. Inconsistent `self` Capture Policy

The existing file uses `__weak Elementary *weakSelf` in all long-lived or deferred blocks:

- `handleEngineConfigChange:` → `weakSelf` pattern
- `startEventPolling` → `weakSelf` pattern

The **four new blocks** capture `self` strongly. Since these are one-shot `dispatch_async` blocks (not timers), the strong capture won't cause a retain-cycle, so it isn't *wrong*. However, it is **inconsistent** with the existing convention in the same file. A future reader may wonder whether the strong capture was intentional or an oversight.

**Recommendation:** Either (a) use `weakSelf/strongSelf` everywhere for consistency, or (b) add a brief comment at the top of the file explaining the policy: "One-shot dispatch_async blocks may capture self strongly; long-lived or deferred blocks must use weakSelf."

---

## 3. `unloadAudioResource` Init Check Is Semantically Wrong

```objc
dispatch_async(dispatch_get_main_queue(), ^{
    if (![self initializeAudioEngineIfNeeded] || self.runtime == nullptr) {
      reject(@"E_RUNTIME_NOT_INITIALIZED", @"Audio runtime not initialized", nil);
      return;
    }
```

Unloading a resource should **not** require the audio engine to be initialized. If the engine was never started, there cannot be any loaded resources, so the method should simply resolve with `NO` rather than rejecting. The pre-change code had the same check, but wrapping it in `dispatch_async` makes the control flow more tangled and the unnecessary initialization on the main thread more costly.

**Recommendation:** Make the init check defensive rather than mandatory:

```objc
dispatch_async(dispatch_get_main_queue(), ^{
    if (self.audioEngineInitialized && self.runtime != nullptr) {
      // ... unload logic ...
    }
    resolve(@(NO)); // Nothing to unload
});
```

Even better: if the engine isn't initialized, skip `dispatch_async` entirely and resolve immediately on the calling thread — there's no AVAudioEngine access when there's nothing to unload.

---

## 4. Two Methods Still Bypass Main-Thread Dispatch

`applyInstructions` and `setProperty` call `initializeAudioEngineIfNeeded` **synchronously** — the exact same method that now wraps four other methods in `dispatch_async(main)`. The PR description justifies this:

> "They are performance-critical and only hit the AV engine on the first call (subsequent calls take the audioEngineInitialized fast path)."

This is **correct but fragile**: if something resets `audioEngineInitialized` to `NO` (e.g., a future engine-restart path), the next call from the JS thread hits `outputNode` off the main thread and triggers the AURemoteIO timeout.

More importantly, `initializeAudioEngineIfNeeded` internally calls `self.audioEngine.outputNode outputFormatForBus:0` (lines 47–48) and `[self.audioEngine.mainMixerNode]` (line 48), which is exactly the access pattern that necessitated this entire PR.

**Recommendation:** Add a comment inside `initializeAudioEngineIfNeeded` (or at each unguarded call-site) making the threading contract explicit:

```objc
// ⚠ Called from the JS thread by applyInstructions/setProperty.
// Safe ONLY because audioEngineInitialized=YES short-circuits before
// touching AVAudioEngine. If the engine is ever reset at runtime,
// these methods must also dispatch to main.
```

---

## 5. Mixed Dispatch Synchronization Styles

The file now has **three** different approaches to ensuring main-thread access:

| Context | Mechanism | Blocking? |
|---|---|---|
| `setAudioSessionActive:error:` | `dispatch_sync(main)` with `__block` result | Yes — synchronous |
| `getAudioInfo`, `getSampleRate`, `loadAudioResource`, `unloadAudioResource` | `dispatch_async(main)` | No — fire-and-forget |
| `handleEngineConfigChange:` | `dispatch_after(main, 200ms)` | No — deferred |

The inconsistency is **intentional** (synchronous callers need results; async callers are promise-based), but the rationale is implicit. A reader encountering `dispatch_sync` in one method and `dispatch_async` in the next has to infer the difference.

**Recommendation:** Add a file-level or section-level comment:

```objc
// Main-thread dispatch policy:
// - setAudioSessionActive uses dispatch_sync because callers need the result.
// - Promise-based methods use dispatch_async because resolve/reject can
//   be called from any thread and the caller doesn't block.
// - handleEngineConfigChange uses dispatch_after to avoid re-entrant deadlock.
```

---

## 6. Thread-Safety Gap in `unloadAudioResource`

`loadAudioResource` (line ~594) acquires `_runtimeMutex` before calling `self.runtime->addSharedResource(...)`, but `unloadAudioResource` calls `self.runtime->pruneSharedResources()` **without** the mutex:

```objc
// In unloadAudioResource — no mutex guard:
if (found) {
    self.runtime->pruneSharedResources();
}

// In loadAudioResource — mutex guard present:
{
    std::lock_guard<std::mutex> lock(self->_runtimeMutex);
    added = self.runtime->addSharedResource(keyStr, std::move(resource));
}
```

If `pruneSharedResources` mutates internal state that the audio render callback reads concurrently (protected by `_runtimeMutex`), this is a data race. If it doesn't touch that state, the missing lock is still inconsistent.

**Recommendation:** Wrap `pruneSharedResources` with the same `_runtimeMutex` guard:

```objc
if (found) {
    std::lock_guard<std::mutex> lock(self->_runtimeMutex);
    self.runtime->pruneSharedResources();
}
```

---

## 7. Indentation / Comment Style Consistency

- **Comments**: All three identical rationale comments are 2-line blocks, consistently formatted. ✅ Good.
- **Indentation**: Inside `dispatch_async` blocks, the code is 4-space-indented from the method body, resulting in **6 levels of indentation** for the inner body of `loadAudioResource` (method → `dispatch_async(main)` → `dispatch_async(global)` → body). This is at the practical limit for readability.
- The `loadAudioResource` nested-dispatch pattern is the deepest point in the file. Consider extracting the global-queue I/O block into a private method to halve the nesting.

**Recommendation:** Extract the file-I/O and resource-registration portion of `loadAudioResource` into a private helper like `- (void)loadAudioResourceForKey:filePath:resolve:reject:`, called from the inner dispatch block.

---

## 8. `computeBufferSizeFromSession` Is Unguarded

```objc
- (int)computeBufferSizeFromSession {
  AVAudioSession *session = [AVAudioSession sharedInstance];
  AVAudioFormat *outputFormat = [self.audioEngine.outputNode outputFormatForBus:0]; // ← outputNode!
```

This method accesses `self.audioEngine.outputNode` without main-thread dispatch. It is called from:

1. `initializeAudioEngineIfNeeded` — which is now dispatched to main thread in the four modified methods ✅
2. `handleEngineConfigChange:` — which dispatches to main via `dispatch_after` ✅

But `initializeAudioEngineIfNeeded` is **also** called by `applyInstructions` and `setProperty` **without** main-thread dispatch (see §4). So if the engine isn't initialized, those methods will call `computeBufferSizeFromSession` → `outputNode` on the JS thread.

**Mitigation:** Same as §4 — document the threading contract, or guard `computeBufferSizeFromSession` to assert/crash if called off the main thread during init.

---

## Summary Table

| # | Issue | Severity | Action |
|---|---|---|---|
| 1 | Repeated dispatch+guard pattern | Medium | Extract helper method |
| 2 | Inconsistent `self` capture (strong vs weak) | Low | Adopt consistent policy or document |
| 3 | `unloadAudioResource` requires engine init unnecessarily | Medium | Remove or make defensive |
| 4 | `applyInstructions`/`setProperty` bypass dispatch | High | Document threading contract; guard for future engine resets |
| 5 | Mixed dispatch styles undocumented | Low | Add file-level comment |
| 6 | `pruneSharedResources` missing `_runtimeMutex` | High | Add mutex lock |
| 7 | Deep nesting in `loadAudioResource` | Low | Extract helper method |
| 8 | `computeBufferSizeFromSession` accesses outputNode unguarded | Medium | Document or assert main-thread requirement |

**Top-priority fixes:** #4 (silent threading hazard on engine reset), #6 (data race), and #3 (semantic incorrectness). The rest are cleanliness and maintainability improvements.