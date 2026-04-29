---
description: Apply Clarity Engineering Review mode
argument-hint: "[diff, PR, design, or implementation context]"
---

Use the `cl-review` skill to process the following input:

<input>
$ARGUMENTS
</input>

Follow Clarity Engineering: `Shape → Plan → Build → Review → Compound`. Review correctness against shaped intent first.

Make operator progress explicit with `Done`, `Left`, `Blocked`, readiness for the next stage, and approval state. Do not advance to another lifecycle stage without explicit operator approval; in Pi use the TUI `ask_user` tool when available.

Ask one focused question when human judgement is needed.
