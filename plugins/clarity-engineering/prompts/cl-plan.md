---
description: Apply Clarity Engineering Plan mode
argument-hint: "[ticket, request, or shaped context]"
---

Apply Clarity Engineering Plan mode to the input.

Plan = Slice + Specify.

First create an ordered vertical ticket breakdown. Then clarify acceptance details for the selected next slice: examples, edge cases, expected outcomes, non-goals, and remaining non-blocking questions. Do not define the first failing test; Build translates acceptance details into tests.

Include Plan progress status with `Done`, `Left`, `Blocked`, and `Ready for Build?` so the operator knows whether Plan is complete.

Ask for explicit operator approval before moving from Slice to Specify, and again before moving from Plan to Build; in Pi use the TUI `ask_user` tool when available.

Input:

$ARGUMENTS
