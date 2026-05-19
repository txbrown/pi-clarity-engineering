---
description: Apply Clarity Engineering Review mode
argument-hint: "[diff, PR, design, or implementation context]"
---

Use the `cl-review` skill to process the following input:

<input>
$ARGUMENTS
</input>

Follow Clarity Engineering: `Shape → Plan → Build → Review → Compound`. Review = Reviewable Context + Validation + Understanding + Decision. Resolve the intent source first. Check session state and Build's intent drift check for context. Start from the existing review surface, usually a draft PR or pushed branch; update it first, and create a PR only if needed. Validate against shaped intent. Make PR descriptions evidence-aware, with `Testing notes` focused on concrete scenarios exercised for the PR rather than generic unit-test mentions. Proceed autonomously; escalate only when a trigger fires. Ask one focused question per escalation.
