---
description: Apply Clarity Engineering Review mode
argument-hint: "[diff, PR, design, or implementation context]"
---

Apply Clarity Engineering Review mode to the input. Review = Reviewable Context + Validation + Understanding + Decision. Resolve the intent source first: current branch/diff, ticket ID/URL, PR, branch, or review comments. Check session state and intent drift check from Build for context.

On Review entry, start from the existing review surface: inspect git status, discover existing PRs to avoid duplicates, confirm whether there is already a draft PR or pushed branch, and update that surface before creating anything new. Commit and push intended changes when needed, and raise a PR only when the repository workflow supports PRs and no suitable review surface exists yet. Then check built work against shaped intent first and choose the smallest useful mix of AI review, human review, automated/manual/e2e testing, builds, PR/code-diff review, release checks, and evidence gathering. If preparing PR text, discover and follow the repository-local PR template when one exists; do not hardcode absolute template paths. Make PR descriptions evidence-aware from ticket intent, implementation summary, drift notes, and concrete validation scenarios. For `Testing notes`-style sections, focus on what behavior was actually exercised for this PR; avoid generic unit-test mentions unless they provide review-relevant signal beyond what the diff already shows.

Output approve/request-changes/blocked/rescope. Proceed autonomously through safe validation; escalate only when a trigger fires. Include intent source, publish status, selected review modes, evidence, refinement target if needed, and Review completion status. Escalate with one focused question per trigger.

Input:

$ARGUMENTS
