---
description: Apply Clarity Engineering Review mode
argument-hint: "[diff, PR, design, or implementation context]"
---

Apply Clarity Engineering Review mode to the input. Review = Publish + Validation + Understanding + Decision. On Review entry, normally make completed work reviewable: inspect git status, commit intended changes, push the branch, and raise or update a PR when the repository workflow supports PRs. Then check built work against shaped intent first and choose the smallest useful mix of AI review, human review, automated/manual testing, builds, PR/code-diff review, release checks, and evidence gathering. If preparing PR text, discover and follow the repository-local PR template when one exists; do not hardcode absolute template paths. Output approve/request-changes/blocked/rescope. Include publish status, selected review modes, evidence, refinement target if needed, and Review progress status with `Done`, `Left`, `Blocked`, and `Ready for Compound?`.

When Review is ready, ask for explicit operator approval before moving to Compound; in Pi use the TUI `ask_user` tool when available.

Input:

$ARGUMENTS
