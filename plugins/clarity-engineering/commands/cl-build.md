---
description: Apply Clarity Engineering Build mode
argument-hint: "[slice, acceptance details, or task]"
---

Use the `cl-build` skill to process the following input:

<input>
$ARGUMENTS
</input>

Follow Clarity Engineering: `Shape → Plan → Build → Review → Compound`. Build TDD-first from acceptance details.

Make operator progress explicit with `Done`, `Left`, `Blocked`, readiness for the next stage, and approval state. Do not advance to another lifecycle stage without explicit operator approval; in Pi use the TUI `ask_user` tool when available.

Ask one focused question when human judgement is needed.
