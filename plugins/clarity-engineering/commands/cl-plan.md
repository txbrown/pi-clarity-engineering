---
description: Apply Clarity Engineering Plan mode
argument-hint: "[ticket, request, or shaped context]"
---

Use the `cl-plan` skill to process the following input:

<input>
$ARGUMENTS
</input>

Follow Clarity Engineering: `Shape → Plan → Build → Review → Compound`. Resolve the intent source first. Plan = Slice + Specify. Produce vertical slices only when useful; if the source ticket is small enough, say no child tickets are needed and recommend building the original ticket. When Plan defines concrete independently buildable slices/tickets, materialize them in the configured issue tracker as child issues, linked follow-ups, checklist items, or local markdown according to Setup and approval policy. If tracker creation is useful but not safe/approved, produce proposed ticket text and ask one focused approval question before mutating the tracker. Then produce acceptance details for the selected next slice/ticket.

Make operator progress explicit with `Done`, `Left`, `Blocked`, readiness for the next stage, and approval state. Do not advance to another lifecycle stage without explicit operator approval; in Pi use the TUI `ask_user` tool when available.

Ask one focused question when human judgement is needed.
