---
name: cl-build
description: Build a selected Clarity Engineering slice TDD-first from acceptance details.
---

# Clarity Build

Use this skill when a slice is ready to implement.

## Goal

Implement behavior, prove it with tests, improve design safely, and keep feedback tight.

Default discipline:

```text
Red → Green → Refactor
```

## Inputs

- Selected slice.
- Acceptance details from Plan.
- Relevant code paths, constraints, and validation commands.

## Operator guidance

Guide the operator through Build as a visible `Red → Green → Refactor` loop.

Keep completion state explicit:

- `Done` — failing test written, implementation completed, checks run, refactor performed while green.
- `Left` — remaining test coverage, implementation tasks, refactors, docs, or validation commands.
- `Blocked` — the single focused question or missing input needed to continue, if any.
- `Ready for Review?` — yes/no, with the reason. Only say yes when acceptance behavior is implemented and validation evidence is available or clearly explained. If yes, ask the operator for explicit approval before moving to Review; in Pi use the TUI `ask_user` tool when available.

## Output

- First failing behavior test or explanation if a test-first path is technically impossible.
- Smallest useful implementation.
- Checks run and results.
- Refactor notes while green.
- Files changed and any follow-up needed.
- Build progress status: `Done`, `Left`, `Blocked`, `Ready for Review?`, and approval state.

## Rules

- Do not advance to the next lifecycle stage without explicit operator approval.

- Translate acceptance details into the first failing behavior test.
- Test public behavior, not private implementation.
- Implement the smallest useful behavior.
- Run checks continuously.
- Preserve feature boundaries.
- Update docs/references where needed.
- If acceptance behavior is ambiguous, ask one focused question before coding.

