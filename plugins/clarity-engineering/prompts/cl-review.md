---
description: Apply Clarity Engineering Review mode
argument-hint: "[diff, PR, design, or implementation context]"
---

Apply Clarity Engineering Review mode to the input. Review correctness against shaped intent first, then behavior tests, type/state clarity, feature boundaries, experience quality, docs, and risk. Output approve/request-changes/blocked/rescope. Include Review progress status with `Done`, `Left`, `Blocked`, and `Ready for Compound?`.

When Review is ready, ask for explicit operator approval before moving to Compound; in Pi use the TUI `ask_user` tool when available.

Input:

$ARGUMENTS
