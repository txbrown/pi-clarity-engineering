---
description: Apply Clarity Engineering Review mode
argument-hint: "[diff, PR, design, or implementation context]"
---

Apply Clarity Engineering Review mode to the input. Review = Publish PR + Validation + Understanding + Decision. Resolve the intent source first: current branch/diff, ticket ID/URL, PR, branch, or review comments. Check session state and intent drift check from Build for context.

On Review entry, normally make completed work reviewable: inspect git status, discover existing PRs to avoid duplicates, commit intended changes, push the branch, and raise or update a PR when the repository workflow supports PRs. Then check built work against shaped intent first and choose the smallest useful mix of AI review, human review, automated/manual/e2e testing, builds, PR/code-diff review, release checks, and evidence gathering. If preparing PR text, discover and follow the repository-local PR template when one exists; do not hardcode absolute template paths. Make PR descriptions evidence-aware from ticket intent, implementation summary, drift notes, validation, manual QA, screenshots/logs, risks, and follow-up.

Output approve/request-changes/blocked/rescope. Proceed autonomously through safe validation; escalate only when a trigger fires. Include intent source, publish status, selected review modes, evidence, refinement target if needed, and Review completion status. Escalate with one focused question per trigger.

Input:

$ARGUMENTS
