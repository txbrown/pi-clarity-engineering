---
description: Apply Clarity Engineering Review mode
argument-hint: "[diff, PR, design, or implementation context]"
---

Use the `cl-review` skill to process the following input:

<input>
$ARGUMENTS
</input>

Follow Clarity Engineering: `Shape → Plan → Build → Review → Compound`. Review = Publish + Validation + Understanding + Decision. On Review entry, normally make completed work reviewable: inspect git status, commit intended changes, push the branch, and raise or update a PR when the repository workflow supports PRs. Then check shaped intent first and choose the smallest useful mix of AI review, human review, automated/manual testing, builds, PR/code-diff review, release checks, and evidence gathering. If preparing PR text, discover and follow the repository-local PR template when one exists; do not hardcode absolute template paths. If issues are found, identify the smallest refinement loop target.

Make operator progress explicit with `Done`, `Left`, `Blocked`, readiness for the next stage, and approval state. Do not advance to another lifecycle stage without explicit operator approval; in Pi use the TUI `ask_user` tool when available.

Ask one focused question when human judgement is needed.
