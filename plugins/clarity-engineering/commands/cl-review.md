---
description: Apply Clarity Engineering Review mode
argument-hint: "[diff, PR, design, or implementation context]"
---

Use the `cl-review` skill to process the following input:

<input>
$ARGUMENTS
</input>

Follow Clarity Engineering: `Shape → Plan → Build → Review → Compound`. Review = Publish PR + Validation + Understanding + Decision. Resolve the intent source first. Check session state and Build's intent drift check for context. Normally commit, push, and raise/update a PR by default when the repo uses PRs. Validate against shaped intent. Make PR descriptions evidence-aware. Proceed autonomously; escalate only when a trigger fires. Ask one focused question per escalation.
