---
description: Apply Clarity Engineering router
argument-hint: "[request, ticket, plan, diff, or context]"
---

Use the `cl-engineering` skill to process the following input:

<input>
$ARGUMENTS
</input>

Follow Clarity Engineering: `Shape → Plan → Build → Review → Compound`. Route the input to Shape, Plan, Build, Review, or Compound.

Make operator progress explicit with `Done`, `Left`, `Blocked`, readiness for the next stage, and approval state. Do not advance to another lifecycle stage without explicit operator approval; in Pi use the TUI `ask_user` tool when available.

Ask one focused question when human judgement is needed.
