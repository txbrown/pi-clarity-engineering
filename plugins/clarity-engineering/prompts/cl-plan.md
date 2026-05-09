---
description: Apply Clarity Engineering Plan mode
argument-hint: "[ticket, request, or shaped context]"
---

Apply Clarity Engineering Plan mode to the input.

Plan = Slice + Specify.

Resolve the intent source first. Create an ordered vertical ticket breakdown only when useful; if the source ticket is small enough, say no child tickets are needed and recommend building the original ticket. When Plan defines concrete independently buildable slices/tickets, materialize them in the configured issue tracker as child issues, linked follow-ups, checklist items, or local markdown according to Setup and escalation policy. If tracker creation is useful but not safe, produce proposed ticket text and escalate with one focused question before mutating the tracker.

Then clarify acceptance details for the selected next slice/ticket: examples, edge cases, expected outcomes, non-goals, and remaining non-blocking questions. Do not define the first failing test; Build translates acceptance details into tests.

Proceed autonomously through slicing and specifying. Escalate only when the slice breakdown, selected next slice, acceptance behaviour, or tracker materialization requires operator judgement. Include tracker materialization status, Plan progress status, and any escalation trigger + question.

Input:

$ARGUMENTS
