---
description: Apply Clarity Engineering Plan mode
argument-hint: "[ticket, request, or shaped context]"
---

Apply Clarity Engineering Plan mode to the input.

Plan = Slice + Specify.

Resolve the intent source first. Create an ordered vertical ticket breakdown only when useful; if the source ticket is small enough, say no child tickets are needed and recommend building the original ticket. When Plan defines concrete independently buildable slices/tickets, materialize them in the configured issue tracker as child issues, linked follow-ups, checklist items, or local markdown according to Setup and approval policy. If tracker creation is useful but not safe/approved, produce proposed ticket text and ask one focused approval question before mutating the tracker. Then clarify acceptance details for the selected next slice/ticket: examples, edge cases, expected outcomes, non-goals, and remaining non-blocking questions. Do not define the first failing test; Build translates acceptance details into tests.

Include tracker materialization status and Plan progress status with `Done`, `Left`, `Blocked`, and `Ready for Build?` so the operator knows whether Plan is complete.

Ask for explicit operator approval before moving from Slice to Specify, and again before moving from Plan to Build; in Pi use the TUI `ask_user` tool when available.

Input:

$ARGUMENTS
