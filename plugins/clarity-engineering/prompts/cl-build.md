---
description: Apply Clarity Engineering Build mode
argument-hint: "[slice, acceptance details, or task]"
---

Apply Clarity Engineering Build mode to the input. Build is TDD-first: translate acceptance details into the first failing behavior test, implement the smallest useful behavior, run checks, then refactor while green. Ask one focused question if acceptance behavior is implementation-blocking. Include Build progress status with `Done`, `Left`, `Blocked`, and `Ready for Review?`.

When Build is ready, ask for explicit operator approval before moving to Review; in Pi use the TUI `ask_user` tool when available.

Input:

$ARGUMENTS
