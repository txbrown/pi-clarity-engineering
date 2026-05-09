---
name: cl-build
description: Build already-shaped work TDD-first from a selected slice, clear ticket, bug, technical improvement, or draft PR refinement target.
---

# Clarity Build

Use this skill when work is clear enough to implement.

Build means **execute already-shaped work with the Clarity Engineering ethos**: preserve intent, keep scope tight, prove behavior, maintain fast feedback, detect drift before it reaches review, and compound learning continuously.

## Goal

Implement the next clearly scoped unit of work, prove it with tests or appropriate validation, improve design safely, and keep feedback tight.

Default discipline:

```text
Red → Green → Refactor
```

Useful shorthand:

```text
One behavior → one failing test → minimal code → refactor → next behavior
```

## Inputs

Build can start from any well-known position with enough clarity to act:

- A selected slice from Plan.
- A ticket ID or URL from Linear, Jira, GitHub Issues, local markdown, or another configured tracker.
- A complete small ticket that is already scoped enough to finish safely.
- A shaped Product Feature, Technical Improvement, Bug, Spike follow-up, or Chore/Maintenance ticket.
- A prior Shape/Plan artefact from another session.
- A draft PR or partially implemented branch that needs continued implementation or review-feedback fixes.
- A failing test, current branch, current diff, review comment, model problem, or explicit user request that provides a clear intent source.
- Acceptance details, expected/actual behavior, target state, relevant code paths, constraints, and validation commands.

## Context-aware Build entry

At Build entry, resolve the intent source before writing code:

1. Identify the input kind: ticket ID/URL, issue, current branch, PR, review comment, failing test, model problem, selected slice, or explicit user request.
2. Fetch/read the relevant context using repo setup and available tools. For tickets, read title, description, status, comments, acceptance criteria, links, and current assignee when available.
3. Inspect current branch awareness: `git status`, current branch, commits ahead of base, current diff, and whether the branch or commits imply a ticket key or existing PR.
4. **Check for session state**: if a session state artifact exists for this ticket, read it and resume from where it left off instead of restarting. If resuming, state what was previously completed and what remains.
5. **Classify depth** and state what it implies for ceremony (see below).
6. Decide whether this is new work, continuation, bug fix, review-feedback work, or small work.
7. Claim/setup the work according to Setup: move ticket to In Progress, assign to the operator, create/switch branch, and align branch naming when configured and safe/approved.
8. Decide the smallest useful work unit.

At Build entry, decide the smallest useful work unit:

- If the resolved input is clear and small enough, build the whole ticket.
- If the input contains multiple independent units, select the next smallest coherent unit and build that first.
- If the input is a draft PR or existing branch, inspect current state, identify what is already done, then choose the next missing/failing/refinement unit.
- If the input is PR review feedback, fetch/classify comments, build valid actionable fixes TDD-first, and ask only on disputed or product-sensitive comments.
- If the input is a model problem, identify the model, invariant, invalid state, expected behavior, persistence/API impact, migration risk, and test seam before changing code.
- If acceptance behavior or target state is unclear enough that implementation would drift, escalate with one focused question.

Do not force an artificial slice when the ticket is already small and well-defined. Do not skip slicing when the ticket is too broad to build safely in one pass. For small work without a formal ticket, use the current user request, failing test, or branch/PR goal as the intent source and keep ceremony minimal.

If local validation commands, e2e tools, app launch paths, MCP/tool expectations, branch conventions, or ticket mutation rules are unknown and materially affect Build, use or request Clarity Setup before guessing.

## Depth classification

At Build entry, classify the work into one of four depths and adapt ceremony accordingly:

| Depth | Scope | Treatment |
|---|---|---|
| **Trivial** | Single file, no behaviour change, existing test seam | Fix, self-check, done. Skip formal compound. No PR unless touching shared surface. |
| **Small** | Local behaviour change, well-understood boundary | Light Build loop + intent check. Continuous compound. Proportional Review. |
| **Medium** | Cross-module change, new tests or contracts needed | Full Build discipline. Slice if broad. Intent check. Continuous compound. |
| **Architectural** | New pattern, migration, multi-service, data-model change | Full lifecycle. Consider ADR. Slice and stage. Higher escalation sensitivity. |

State the depth classification explicitly at the start of Build. Use it to decide how much ceremony to apply.

## Session state

Maintain a lightweight session state per ticket or intent source so work survives context switches.

At the end of every Build, write or update a session state summary:

```markdown
## Session state: <ticket key or intent source>

Branch: <branch name>
Last session: <date>
Depth: trivial | small | medium | architectural
Work completed:
- ✅ <item>
- ✅ <item>

Work remaining:
- ⬜ <item>
- ⬜ <item>

PR: <url or "none">
Blockers: <description or "none">
```

At the start of Build, check whether a session state exists. If it does, read it, acknowledge where the previous session left off, and resume from the next remaining item instead of restarting. If no session state exists, create one after the first Build unit.

## Intent drift detection

Before committing or considering Build complete, run an intent drift check:

1. Re-read the ticket's acceptance criteria, expected behaviour, scope, and non-goals.
2. Compare each item against what was implemented.
3. Classify any gap:
   - **Deliberate improvement** — intentionally different but better. Flag for review, no escalation.
   - **Accidental scope creep** — implemented something the ticket didn't ask for. Reduce scope or escalate.
   - **Misunderstanding** — built the wrong thing. Escalate immediately.
   - **Missed criterion** — acceptance item not addressed. Fix or escalate.
4. Report the check result in Build output.

Example output:

```markdown
## Intent drift check

Ticket criteria:
- ✅ Model hydration handles missing optional fields (added default values)
- ✅ Validation errors preserved for required fields (unchanged)
- ⚠️ "Graceful degradation for malformed payloads" — strict parsing rejects
  malformed payloads instead of degrading. Deliberate; silent degradation was
  hiding bugs. Flagged for review.

Drift: 1 deliberate. No accidental drift. No missed criteria.
```

Escalate if accidental drift or misunderstandings are found. Proceed if all gaps are deliberate and flagged.

## Continuous compounding

At the end of every Build, before the session state is written, automatically compound learnings:

1. Identify what was learned during this Build session:
   - codebase facts discovered;
   - patterns that worked well or poorly;
   - dead ends or surprises;
   - decisions made and why.
2. Decide whether each learning is reusable beyond this ticket.
3. Write or update the appropriate memory destination:
   - repo memory for codebase-specific facts;
   - global memory for cross-repo patterns;
   - skip if learning is session-local only.
4. Flag any stale or conflicting existing docs discovered during this session.

Keep this lightweight. A few bullet points is enough:

```markdown
## Continuous compound

- Learned: ModelHydration parser silently drops unknown fields.
  Caused MID-123. Added strict mode flag. → saved to docs/solutions/model-hydration.md
- Learned: optional field defaults scattered across 3 files.
  Centralized into defaults module.
- Stale doc: docs/solutions/model-parsing.md is out of date after this change.
  Flagged for compound refresh.
- No cross-repo patterns.
```

Continuous compounding is not optional. It happens at the end of every Build.

## Uncertainty handling and escalation

Before escalating to the operator, classify the issue:

- **discoverable** — inspect ticket comments, docs, code, setup, current branch, PR, tests, or logs before asking;
- **non-blocking assumption** — proceed, state the assumption, and include it in Build output;
- **escalation trigger** — ask one focused question when behaviour, scope, architecture, product choice, or external mutation would otherwise be wrong.

Escalation triggers specific to Build include intent ambiguity, scope conflict, product/UX decisions, architecture risk, validation challenges, and unauthorized external mutations.

Follow Setup's automation policy. If no policy exists, proceed autonomously for local/discoverable actions and escalate for external write-capable operations.

## Bug diagnosis path

For bugs and regressions, Build starts by creating a feedback loop before speculating about the fix:

```text
Reproduce → Minimise → Hypothesise → Instrument → Fix → Regression-test → Cleanup
```

Expectations:

- establish the fastest reliable pass/fail signal available: test, script, CLI, e2e/browser flow, replayed trace, log query, or structured manual loop;
- confirm the signal reproduces the user's actual symptom;
- generate falsifiable hypotheses before changing code;
- instrument one variable at a time;
- turn the minimized repro into a regression test when there is a correct seam;
- remove temporary debug instrumentation before Review.

If no useful feedback loop can be built, state what was tried and escalate.

## Operator guidance

Guide the operator through Build as a visible `Red → Green → Refactor` loop, adapted to the depth classification. Proceed autonomously; escalate only when a trigger fires.

Keep completion state explicit:

- `Done` — intent source resolved, depth classified, session state checked/created, work claimed/setup when configured, scoped work unit selected, failing test or validation target established, implementation completed, checks run, intent drift check performed, continuous compounding done, session state updated.
- `Left` — remaining units in the ticket/PR, test coverage, implementation tasks, refactors, docs, validation commands, or review-feedback items.
- `Blocked` — escalation trigger fired, the single focused question awaiting operator response.

## Output

- Intent source resolved: ticket/issue/PR/branch/diff/failing test/model problem/user request, plus links/IDs where applicable.
- Depth classification and ceremony implications.
- Session state: resumed from prior state or new session started.
- Claim/setup status: ticket moved/assigned?, branch created/switched?, existing PR found?, and any approval-required actions skipped or requested.
- Build entry classification: selected slice, whole small ticket, bug fix, technical improvement, review-feedback fix, draft PR continuation, small work, model problem, or other clear work unit.
- Current work unit and why it is the right scope.
- First failing behavior test, characterization test, validation target, or explanation if a test-first path is technically impossible.
- Smallest useful implementation.
- Checks run and results, including automated tests, typecheck/lint/build, e2e, and manual QA evidence when relevant.
- Intent drift check results.
- Continuous compound (learnings and memory updates).
- Updated session state.
- Files changed and any follow-up needed.
- Build completion status and any escalation trigger + question.

## Rules

- Proceed autonomously through safe local work; escalate only when a trigger fires.
- Build from known or resolvable context; do not require re-running Shape or Plan. If session state exists, resume — don't restart.
- Classify depth at entry and adapt ceremony proportionally.
- Translate acceptance details, expected behavior, bug reproduction, target state, or review feedback into the first failing behavior test or validation target.
- Test public behavior, not private implementation.
- Do not write all tests first and then all implementation; that is horizontal slicing.
- Implement the smallest useful behavior for the selected work unit.
- Run checks continuously.
- Run intent drift check before committing.
- Compound learnings continuously at the end of every Build.
- Update session state at the end of every Build.
- Preserve feature boundaries and shaped intent.
- Update docs/references where needed.
- If acceptance behavior is ambiguous, escalate with one focused question.
