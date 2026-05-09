---
description: Apply Clarity Engineering Build mode
argument-hint: "[slice, ticket, bug, draft PR, acceptance details, or task]"
---

Use the `cl-build` skill to process the following input:

<input>
$ARGUMENTS
</input>

Follow Clarity Engineering: `Shape → Plan → Build → Review → Compound`. Resolve the intent source first. Check for session state and resume if it exists. Classify depth at entry. Build already-shaped work TDD-first from any well-known or resolvable position with enough clarity: selected slice, ticket ID/URL, complete small ticket, bug, technical improvement, failing test, model problem, prior Shape/Plan artefact, review comments, draft PR, or existing branch. For tickets, fetch context, claim/move In Progress and create/switch branch according to Setup and escalation policy.

Run intent drift check before committing. Compound learnings continuously. Update session state. Proceed autonomously; escalate only when a trigger fires. Ask one focused question per escalation.
