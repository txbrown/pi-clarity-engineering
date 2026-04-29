---
name: cl-review
description: Validate built work against shaped intent through the right mix of AI review, human review, tests, builds, PR review, and risk checks.
---

# Clarity Review

Use this skill after Build, before merge/release/handoff, or whenever a change must be validated against Clarity Engineering intent.

Review is a **flexible validation stage**, not only a code-review pass. Its purpose is to create enough confidence that the work matches the shaped intent, can be understood by humans and future agents, and is ready for the next lifecycle decision.

Review can be summarized as:

```text
Review = Publish + Validation + Understanding + Decision
```

`Publish` means making the work reviewable: commit completed changes, push the branch, and raise or update a PR when the repository workflow uses PRs. This usually happens at Review entry, before human review and PR-code-diff validation. Skip or adapt this only when the operator explicitly wants local-only review, the repo has no remote/PR workflow, or the work is not ready to publish.

## Goal

Publish completed work into a reviewable form when appropriate, validate it against shaped intent first, make the work understandable, then gather the evidence needed to decide whether to approve, request changes, block, or rescope.

## Inputs

- Shaped ticket, acceptance details, selected slice, or intended outcome.
- Current branch state, commits, diff, PR, design, implementation summary, build artefact, app environment, or file paths.
- Relevant tests/check results, build status, manual QA notes, screenshots, logs, or reviewer comments.

## Review entry: publish for review

When moving from Build to Review, the default Review entry workflow is:

1. Inspect git status and confirm the intended branch/scope.
2. Run or summarize the minimum checks needed before publishing, if not already done in Build.
3. Commit completed Review-ready work with a clear message, unless the operator explicitly wants an uncommitted local review.
4. Push the branch when a remote workflow exists.
5. Raise or update a PR when the codebase uses PRs, following the repository-local PR template if found.

Do not commit unrelated user changes. Do not push directly to a protected/default branch unless the operator explicitly confirms that workflow. If the working tree contains ambiguous changes, ask one focused question before committing.

## Review modes

After or alongside publishing, choose the smallest useful mix for the risk and context. Review can include:

- **AI review** — inspect diff/design/implementation against shaped intent, tests, boundaries, types/states, docs, and risk.
- **Human review** — raise or update a PR, prepare review notes, summarize intent and trade-offs, and make the work understandable for human readers.
- **Behavior validation** — run automated tests, targeted checks, smoke tests, regression checks, or exploratory/manual app testing.
- **Build/release validation** — make local/CI builds, verify packaging, release configuration, feature flags, migrations, rollout, or observability.
- **Evidence gathering** — collect screenshots, logs, PR links, test output, build links, or reproduction notes.
- **Refinement loop** — if Review finds issues, return to the smallest necessary Build/Plan/Shape refinement, then review again. Do not treat this as failure; it is the normal quality loop.

## Review order

Keep shaped intent first even when the review mode varies:

1. **Publish** — commit completed work, push the branch, and raise/update the PR when appropriate for the repository workflow.
2. **Validation** — shaped intent and acceptance details first: does the work solve the agreed problem without silent scope drift?
3. **Validation evidence** — tests, manual QA, automation, builds, or other checks appropriate to the risk.
4. **Implementation quality** — type/state clarity, boundaries, composition, maintainability, and failure modes.
5. **Understanding** — PR/readme/review notes explain what changed, why, how to review it, and any important trade-offs.
6. **Experience quality** — UX, edge cases, operational experience, and delight where relevant.
7. **Decision** — approve/request changes/block/rescope, with release and follow-up risk captured.

## PR template discovery

When Review includes raising, updating, or preparing a PR, look for a repository-local PR template and follow its structure. Do not rely on an absolute path because this skill is used across many codebases.

Discovery should be local and conventional, for example:

- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/pull_request_template.md`
- `.github/PULL_REQUEST_TEMPLATE/*.md`
- `.github/pull_request_template/*.md`
- `docs/PULL_REQUEST_TEMPLATE.md`

If a template is found, preserve its headings and intent when drafting PR text. Fill sections with review evidence such as why the change is needed, how it was implemented, test/build/manual validation, screenshots or links when relevant, and known risks. If no template is found, use a compact structure that covers `Why`, `How`, `Validation`, and `Risks / Follow-up`.

## Operator guidance

At the start, state which review modes are appropriate and why. Do not require every review mode for every change; choose proportionally.

Guide the operator through the review visibly so they can see which checks are complete and which evidence is missing.

Keep completion state explicit:

- `Done` — publish step completed or deliberately skipped, review modes completed, evidence considered, and findings/decision captured.
- `Left` — uncommitted/unpushed work, PR creation/update, unchecked review modes, missing test/build/manual evidence, unresolved risks, PR/human review tasks, or follow-up fixes.
- `Blocked` — the single focused question or missing evidence needed to finish Review, if any.
- `Ready for Compound?` — yes/no, with the reason. Say yes when the review decision is clear and required changes are resolved, explicitly assigned, or deliberately accepted as follow-up. If yes, ask the operator for explicit approval before moving to Compound; in Pi use the TUI `ask_user` tool when available.

## Output

Decision: `approve`, `request-changes`, `blocked`, or `rescope`.

Then include, as needed:

- publish status: committed?, pushed?, PR raised/updated?, template followed/skipped?;
- selected review modes and why they were enough;
- prioritized findings;
- evidence or file/PR/build/test/manual-QA references;
- suggested fixes or refinement loop target;
- risks and follow-up;
- Review progress status: `Done`, `Left`, `Blocked`, `Ready for Compound?`, and approval state;
- one focused question if human judgement blocks the decision.

## Rules

- Do not advance to the next lifecycle stage without explicit operator approval.
- Do not start with style nits when intent correctness is unresolved.
- Prefer actionable findings tied to acceptance details and evidence.
- Mark `request-changes` when Review finds fixable issues that should be addressed before approval.
- Mark `blocked` when key evidence or human judgement is missing.
- Mark `rescope` when implementation and shaped intent diverge but the new direction may be valid.
- A Review refinement loop may return to Build, Plan, or Shape, but crossing lifecycle stages still requires explicit operator approval.
