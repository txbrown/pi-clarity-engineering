---
description: Apply Clarity Engineering Plan mode
argument-hint: "[ticket, request, or shaped context]"
---

Use the `cl-plan` skill to process the following input:

<input>
$ARGUMENTS
</input>

Follow Clarity Engineering: `Shape → Plan → Build → Review → Compound`. Plan = Slice + Specify. Produce vertical slices and acceptance details for the selected next slice.

Make operator progress explicit with `Done`, `Left`, `Blocked`, readiness for the next stage, and approval state. Do not advance to another lifecycle stage without explicit operator approval; in Pi use the TUI `ask_user` tool when available.

Ask one focused question when human judgement is needed.
