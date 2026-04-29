---
description: Apply Clarity Engineering Build mode
argument-hint: "[slice, ticket, bug, draft PR, acceptance details, or task]"
---

Use the `cl-build` skill to process the following input:

<input>
$ARGUMENTS
</input>

Follow Clarity Engineering: `Shape → Plan → Build → Review → Compound`. Build already-shaped work TDD-first from any well-known position with enough clarity: selected slice, complete small ticket, bug, technical improvement, prior Shape/Plan artefact, draft PR, or existing branch. First classify the Build entry and choose the smallest useful work unit.

Make operator progress explicit with `Done`, `Left`, `Blocked`, readiness for the next stage, and approval state. Do not advance to another lifecycle stage without explicit operator approval; in Pi use the TUI `ask_user` tool when available.

Ask one focused question when human judgement is needed.
