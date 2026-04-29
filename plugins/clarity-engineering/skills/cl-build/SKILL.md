---
name: cl-build
description: Build already-shaped work TDD-first from a selected slice, clear ticket, bug, technical improvement, or draft PR refinement target.
---

# Clarity Build

Use this skill when work is clear enough to implement.

Build is not limited to one slice from a larger story. Build means **execute already-shaped work with the Clarity Engineering ethos**: preserve intent, keep scope tight, prove behavior, and maintain fast feedback.

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
- A complete small ticket that is already scoped enough to finish safely.
- A shaped Product Feature, Technical Improvement, Bug, Spike follow-up, or Chore/Maintenance ticket.
- A prior Shape/Plan artefact from another session.
- A draft PR or partially implemented branch that needs continued implementation or review-feedback fixes.
- Acceptance details, expected/actual behavior, target state, relevant code paths, constraints, and validation commands.

## Entry triage

At Build entry, decide the smallest useful work unit:

- If the input is clear and small enough, build the whole ticket.
- If the input contains multiple independent units, select the next smallest coherent unit and build that first.
- If the input is a draft PR or existing branch, inspect current state, identify what is already done, then choose the next missing/failing/refinement unit.
- If acceptance behavior or target state is unclear enough that implementation would drift, ask one focused question or route back to Shape/Plan with the reason.

Do not force an artificial slice when the ticket is already small and well-defined. Do not skip slicing when the ticket is too broad to build safely in one pass.

If local validation commands, e2e tools, app launch paths, or MCP/tool expectations are unknown and materially affect Build, use or request Clarity Setup before guessing.

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

If no useful feedback loop can be built, state what was tried and ask for the missing artifact, access, or approval.

## Operator guidance

Guide the operator through Build as a visible `Red → Green → Refactor` loop, adapted to the work type.

Keep completion state explicit:

- `Done` — scoped work unit selected, failing test or validation target established, implementation completed, checks run, refactor performed while green where applicable.
- `Left` — remaining units in the ticket/PR, test coverage, implementation tasks, refactors, docs, validation commands, or review-feedback items.
- `Blocked` — the single focused question or missing input needed to continue, if any.
- `Ready for Review?` — yes/no, with the reason. Only say yes when the selected work unit or whole ticket is implemented and validation evidence is available or clearly explained. If yes, ask the operator for explicit approval before moving to Review; in Pi use the TUI `ask_user` tool when available.

## Output

- Build entry classification: selected slice, whole small ticket, bug fix, technical improvement, draft PR continuation, or other clear work unit.
- Current work unit and why it is the right scope.
- First failing behavior test, characterization test, validation target, or explanation if a test-first path is technically impossible.
- Smallest useful implementation.
- Checks run and results.
- Refactor notes while green.
- Files changed and any follow-up needed.
- Build progress status: `Done`, `Left`, `Blocked`, `Ready for Review?`, and approval state.

## Rules

- Do not advance to the next lifecycle stage without explicit operator approval.
- Build from known context when it is sufficient; do not require re-running Shape or Plan just because they happened elsewhere.
- Translate acceptance details, expected behavior, bug reproduction, target state, or review feedback into the first failing behavior test or validation target.
- Test public behavior, not private implementation.
- Do not write all tests first and then all implementation; that is horizontal slicing.
- Implement the smallest useful behavior for the selected work unit.
- Run checks continuously.
- Preserve feature boundaries and shaped intent.
- Update docs/references where needed.
- If acceptance behavior is ambiguous, ask one focused question before coding.
