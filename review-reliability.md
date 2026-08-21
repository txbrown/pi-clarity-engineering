```json
{
  "reviewer": "reliability",
  "findings": [
    {
      "severity": "medium",
      "confidence": 75,
      "location": "ios/Elementary.mm: loadAudioResource — nested dispatch (outer main + inner global)",
      "summary": "Promise resolution is now gated on main-queue availability. File I/O that previously dispatched immediately to a global queue now serializes through the main queue first for engine initialization.",
      "detail": "Before this PR, loadAudioResource did a synchronous init check then dispatched file I/O to dispatch_get_global_queue immediately. After the PR, the init check moves inside dispatch_async(main), and the file I/O dispatch is nested inside that block. If the main queue is blocked (e.g. during a heavy animation frame, UIKit layout pass, or another React Native native module call), the file I/O won't start until the main queue drains. This adds unbounded latency to loadAudioResource resolution — the promise will hang for as long as the main queue is busy. In the common case this is fine, but under load it's a regression in responsiveness.",
      "code_context": "dispatch_async(dispatch_get_main_queue(), ^{\n    if (![self initializeAudioEngineIfNeeded]) { ... }\n    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{\n        // file I/O — now delayed by main-queue availability\n    });\n});",
      "suggestion": "Consider dispatching the file I/O before or in parallel with the main-queue init, rather than nesting: check engine state first, then dispatch file work independently. Since initializeAudioEngineIfNeeded already sets audioEngineInitialized = YES atomically (the main queue is serial), the engine will be ready by the time the file I/O block needs self.runtime, without forcing the file I/O to wait behind the main queue."
    },
    {
      "severity": "low",
      "confidence": 50,
      "location": "ios/Elementary.mm: all four modified methods — dispatch_async(main) with requiresMainQueueSetup = YES",
      "summary": "dispatch_async to main is redundant when requiresMainQueueSetup returns YES, but changes method semantics from synchronous to asynchronous, potentially confusing promise timing expectations.",
      "detail": "The module declares + (BOOL)requiresMainQueueSetup { return YES; }, which means React Native already dispatches all exported method calls to the main queue. The added dispatch_async(dispatch_get_main_queue()) wraps are therefore re-dispatching to the same queue. This means: (1) the init/engine-access code already ran on main before this PR — the fix may not actually address the background-thread RPC timeout unless RN's main-queue dispatch is somehow being bypassed; (2) the dispatch_async makes method execution asynchronous — the exported method returns immediately and resolve/reject fire later. If callers have implicit assumptions about synchronous promise resolution (e.g., that engine state is immediately available after getAudioInfo resolves), this change could break that contract.",
      "code_context": "RCT_EXPORT_METHOD(getAudioInfo:...)\n{\n  dispatch_async(dispatch_get_main_queue(), ^{ ... });\n}",
      "suggestion": "Verify whether the background-thread RPC timeout actually occurs despite requiresMainQueueSetup = YES. If RN is calling these methods from a background queue despite the flag, file a bug upstream. If the flag is respected, consider dispatch_sync instead of dispatch_async to preserve synchronous semantics (though this risks deadlock if called from main). Alternatively, document that these methods are now asynchronous."
    }
  ],
  "residual_risks": [
    {
      "risk": "applyInstructions and setProperty still call initializeAudioEngineIfNeeded (which accesses AVAudioEngine.outputNode) on their first invocation, without dispatch_async protection. The PR description acknowledges this as intentional for performance, but means the RPC timeout bug persists for these two methods when they are the first exported method called on a cold engine.",
      "likelihood": "Medium — if applyInstructions is the first JS-bound method invoked after app launch (plausible if the app starts sending render instructions before querying audio info), the same AURemoteIO::Cleanup timeout will fire.",
      "mitigation": "The PR is a partial fix. Consider calling initializeAudioEngineIfNeeded eagerly during module init (which already runs on main) rather than lazily on first use, so no exported method ever triggers cold-engine outputNode access. Alternatively, wrap applyInstructions/setProperty in the same dispatch_async(main) pattern on the cold path only."
    },
    {
      "risk": "self.runtime is a std::shared_ptr read outside _runtimeMutex in loadAudioResource and unloadAudioResource (the self.runtime == nullptr check happens before acquiring the mutex). handleEngineConfigChange writes self.runtime under the mutex. This is a pre-existing data race on the shared_ptr store — shared_ptr reference counting is thread-safe, but the pointer store itself is not atomic across threads.",
      "likelihood": "Low — in practice, handleEngineConfigChange runs on main (via dispatch_after to main queue) and the global-queue blocks race against it. The shared_ptr control block makes typical use safe, but the C++ standard does not guarantee that reading the stored pointer concurrently with a write is free of torn reads.",
      "mitigation": "Move the nullptr check inside the mutex scope, or use std::atomic_load on the shared_ptr (though shared_ptr atomic operations have significant overhead). At minimum, document that runtime reads from non-main threads must hold _runtimeMutex."
    }
  ],
  "testing_gaps": [
    {
      "gap": "No test coverage for the async dispatch behavior — verify that resolve/reject are actually called after dispatch_async",
      "detail": "The PR changes four methods from synchronous to asynchronous. There's no test that verifies the promise resolves after the dispatch_async block executes. A unit test that mocks the engine and asserts resolve is called (with timeout) would catch a silently-swallowed promise (e.g., if the block is never scheduled).",
      "recommendation": "Add tests with XCTestExpectation or a similar pattern that waits for the promise to resolve after the async dispatch, and verifies it's called exactly once."
    },
    {
      "gap": "No test for concurrent loadAudioResource calls during engine initialization",
      "detail": "If loadAudioResource is called twice before the first main-queue block runs, both blocks see audioEngineInitialized == NO. The main queue serializes them so they don't race, but there's no test proving that the second one correctly sees the initialized state and skips re-initialization.",
      "recommendation": "Write a test that calls loadAudioResource twice in quick succession from a background queue and asserts that initializeAudioEngineIfNeeded is called exactly once (e.g., by checking that audioEngine is only allocated once)."
    },
    {
      "gap": "No test for module deallocation during async execution",
      "detail": "If the React Native bridge tears down the module (e.g., during a JS reload or app backgrounding) while a dispatch_async block is pending, the block's strong capture of self keeps the module alive until the block runs. There's no test verifying this doesn't cause a crash or leak.",
      "recommendation": "Simulate module deallocation while a loadAudioResource operation is in flight (e.g., after the main-queue block runs but before the global-queue block completes) and verify no crash, no dangling promise, and no retain cycle."
    }
  ]
}
```