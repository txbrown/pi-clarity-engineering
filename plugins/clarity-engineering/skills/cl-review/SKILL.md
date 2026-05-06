---
name: cl-review
description: Validate built work against shaped intent through the right mix of AI review, human review, tests, builds, PR review, and risk checks.
---

# Clarity Review

Use this skill after Build, before merge/release/handoff, or whenever a change must be validated against Clarity Engineering intent.

Review is a **flexible validation stage**, not only a code-review pass. Its purpose is to create enough confidence that the work matches the shaped intent, can be understood by humans and future agents, and is ready for the next lifecycle decision.

Review can be summarized as:

```text
Review = Publish PR + Validation + Understanding + Decision
```

`Publish PR` means making the work reviewable: commit completed changes, push the branch, and raise or update a PR when the repository workflow uses PRs. Review is the stage that raises the PR. This usually happens at Review entry, before human review and PR-code-diff validation. Skip or adapt this only when the operator explicitly wants local-only review, the repo has no remote/PR workflow, or the work is not ready to publish.

## Goal

Publish completed work into a reviewable form when appropriate, validate it against shaped intent first, make the work understandable, then gather the evidence needed to decide whether to approve, request changes, block, or rescope.

## Inputs

- Shaped ticket, ticket ID/URL, acceptance details, selected slice, or intended outcome.
- Current branch state, commits, diff, PR URL/number, design, implementation summary, build artefact, app environment, or file paths.
- Relevant tests/check results, build status, CI status, manual QA notes, screenshots, logs, or reviewer comments.

## Context-aware Review entry: publish for review

At Review entry, resolve the intent source and review target before deciding whether to create or update a PR:

1. Identify the input kind: no argument/current branch, ticket ID/URL, PR URL/number, branch, diff, review comments, implementation summary, or explicit user request.
2. Fetch/read the relevant context using repo setup and available tools. For tickets, read title, description, status, comments, acceptance criteria, and linked branches/PRs. For PRs, read diff, description, comments, checks/CI, review state, and linked ticket.
3. Inspect current branch awareness: git status, current branch, commits ahead of base, current diff, remote tracking branch, and whether branch/commits imply a ticket key.
4. Discover existing PRs before creating new ones: current branch PR, PR linked to ticket, draft/ready state, unresolved review comments, and CI status.
5. Decide publish action: create PR if none exists and work is review-ready; update PR if one exists; perform local-only review only when requested/configured or when work is not ready to publish.

When moving from Build to Review, the default Review entry workflow is:

1. Inspect git status and confirm the intended branch/scope.
2. Run or summarize the minimum checks needed before publishing, if not already done in Build.
3. Commit completed Review-ready work with a clear message, unless the operator explicitly wants an uncommitted local review.
4. Push the branch when a remote workflow exists.
5. Raise or update a PR when the codebase uses PRs, following the repository-local PR template if found.
6. Link the PR to the ticket and move the ticket to the configured Review/In Review state when Setup marks those actions safe or the operator approves.

Do not commit unrelated user changes. Do not push directly to a protected/default branch unless the operator explicitly confirms that workflow. If the working tree contains ambiguous changes, ask one focused question before committing.

If the repo's publish/review workflow, PR template, CI requirements, e2e/manual QA path, branch convention, ticket/PR linking rules, or tool/MCP expectations are unknown and materially affect Review, use or request Clarity Setup before guessing.

## Uncertainty and automation policy

Before asking the operator, classify uncertainty:

- **discoverable** — inspect ticket/PR comments, CI, docs, code, setup, current branch, tests, or logs first;
- **non-blocking assumption** — proceed, state the assumption, and include it in Review/PR notes;
- **blocking** — ask one focused question before publishing, changing scope, or deciding.

Follow Setup's automation policy. If no policy exists, ask before write-capable external actions such as pushing, raising/updating PRs, moving tickets, modifying ticket descriptions, resolving comments, merging, deploying, releasing, or touching protected branches. Setup may pre-authorize normal Review publishing so `cl-review` can commit, push, and raise/update PR without interrupting when changes are unambiguous.

## Review feedback loop

If Review finds existing PR comments or human/AI findings, treat them as a normal refinement loop, not a new stage:

1. Collect comments/findings.
2. Classify each as valid, invalid, duplicate, already fixed, or needs human/product decision.
3. Route valid actionable fixes to the smallest necessary Build loop, preferably TDD-first.
4. Re-run targeted validation.
5. Update the PR and comment/resolve threads according to setup and approval policy.
6. Re-review until the decision is clear.

## Review modes

After or alongside publishing, choose the smallest useful mix for the risk and context. Review can include:

- **AI review** — inspect diff/design/implementation against shaped intent, tests, boundaries, types/states, docs, and risk.
- **Human review** — raise or update a PR, prepare review notes, summarize intent and trade-offs, and make the work understandable for human readers.
- **Behavior validation** — run automated tests, targeted checks, smoke tests, regression checks, or exploratory/manual app testing.
- **Build/release validation** — make local/CI builds, verify packaging, release configuration, feature flags, migrations, rollout, or observability.
- **Evidence gathering** — collect screenshots, logs, PR links, test output, build links, CI status, e2e results, manual QA notes, or reproduction notes.
- **Refinement loop** — if Review finds issues, return to the smallest necessary Build/Plan/Shape refinement, then review again. Do not treat this as failure; it is the normal quality loop.

## Review order

Keep shaped intent first even when the review mode varies:

1. **Publish PR** — commit completed work, push the branch, discover/create/update the PR, and link ticket/PR when appropriate for the repository workflow.
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

If a template is found, preserve its headings and intent when drafting PR text. Fill sections with review evidence such as why the change is needed, how it was implemented, test/build/e2e/manual validation, screenshots or links when relevant, and known risks. If no template is found, use a compact structure that covers `Why`, `How`, `Validation`, and `Risks / Follow-up`.

PR descriptions should be evidence-aware: derive them from ticket intent, implementation summary, tests run, manual QA/e2e, screenshots/logs when relevant, known risks, and follow-up decisions. Avoid generic PR text.

## Operator guidance

At the start, state which review modes are appropriate and why. Do not require every review mode for every change; choose proportionally.

Guide the operator through the review visibly so they can see which checks are complete and which evidence is missing.

Keep completion state explicit:

- `Done` — intent source resolved, PR created/updated or deliberately skipped, review modes completed, evidence considered, and findings/decision captured.
- `Left` — uncommitted/unpushed work, PR creation/update, unchecked review modes, missing test/build/manual evidence, unresolved risks, PR/human review tasks, or follow-up fixes.
- `Blocked` — the single focused question or missing evidence needed to finish Review, if any.
- `Ready for Compound?` — yes/no, with the reason. Say yes when the review decision is clear and required changes are resolved, explicitly assigned, or deliberately accepted as follow-up. If yes, ask the operator for explicit approval before moving to Compound; in Pi use the TUI `ask_user` tool when available.

## Output

Decision: `approve`, `request-changes`, `blocked`, or `rescope`.

Then include, as needed:

- intent source resolved: ticket/issue/PR/branch/diff/user request and links/IDs where applicable;
- publish status: committed?, pushed?, PR discovered/raised/updated?, ticket linked/moved?, template followed/skipped?;
- selected review modes and why they were enough;
- prioritized findings;
- evidence or file/PR/build/test/e2e/manual-QA/CI references;
- suggested fixes or refinement loop target;
- risks and follow-up;
- setup/config gaps discovered, if future Review would be clearer with local workflow documentation;
- Review progress status: `Done`, `Left`, `Blocked`, `Ready for Compound?`, and approval state;
- one focused question if human judgement blocks the decision.

## Rules

- Do not advance to the next lifecycle stage without explicit operator approval; a direct `cl-review` command may complete all Review responsibilities, including PR publication, without conceptual sub-approvals inside Review when Setup authorizes the required operations.
- Do not start with style nits when intent correctness is unresolved.
- Prefer actionable findings tied to acceptance details and evidence.
- Mark `request-changes` when Review finds fixable issues that should be addressed before approval.
- Mark `blocked` when key evidence or human judgement is missing.
- Mark `rescope` when implementation and shaped intent diverge but the new direction may be valid.
- A Review refinement loop may return to Build, Plan, or Shape, but crossing lifecycle stages still requires explicit operator approval.
