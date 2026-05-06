---
name: cl-engineering
description: Apply Ricardo's Clarity Engineering framework consistently with AI. Use for routing work across Shape, Plan, Build, Review, and Compound.
---

# Clarity Engineering Router

Use this skill when a request should be handled through Clarity Engineering or when the user asks for Clarity Engineering generally. Also use it to route framework setup/configuration requests that make Clarity Engineering adaptable to a specific codebase.

Lifecycle:

```text
Shape → Plan → Build → Review → Compound
```

Plan contains two substeps:

```text
Plan = Slice + Specify
```

## Inputs

- A raw idea, request, ticket, issue URL, PR URL, branch, diff, failing test, implementation task, completed-work recap, or Clarity Engineering framework setup/configuration request.
- Optional context such as constraints, references, code paths, or acceptance criteria.

## Context-aware stage entry

Stages are not forms to fill out. They are context-aware operating modes. A `cl-*` command may begin from a ticket ID, ticket URL, GitHub/Jira/Linear issue, PR, review comment, branch, current diff, failing test, model problem, or explicit user request.

At the start of any stage:

1. Resolve the intent source: fetch/read the ticket, PR, branch, diff, test failure, or user request using repo setup and available tools.
2. Retrieve only relevant context: ticket first, current branch/diff second, directly relevant files third, setup/memory only as needed.
3. Decide whether the requested stage has enough clarity to proceed without replaying earlier stages.
4. Perform the natural workflow actions for that stage according to repo setup.
5. Ask one focused question only for blocking ambiguity, scope/risk judgement, or approval-required write-capable operations.

Do not force earlier stages when a later stage receives enough context. For example, `cl-build <ticket>` should fetch and understand the ticket, claim the work according to repo setup, create/switch branch when appropriate, and build TDD-first. Route back to Shape or Plan only when the ticket is too unclear or too broad to build safely.

## Routing

Route to the most useful mode:

- Setup: Clarity Engineering framework setup/configuration for the codebase is missing or requested, such as where tickets live, how Plan should materialize planned slices/tickets, which MCPs/tools to use, validation/e2e commands, domain docs, ADRs, review workflow, or human decision rights. Setup is not a delivery lifecycle stage or lifecycle mode.
- Shape: fuzzy idea, unclear problem, or deliverable work without a ticket.
- Plan: shaped work that needs vertical slicing, tracker ticket materialization for independently buildable slices, or acceptance details for the next slice.
- Build: already-shaped work with enough clarity to implement TDD-first. This can be a selected slice, a complete small ticket, a bug with expected/actual behavior, a technical improvement with target state, a prior Shape/Plan artefact from another session, a ticket URL/ID that can be resolved, a failing test, a model problem with clear invariants, or a draft PR/branch that needs continued implementation or review-feedback fixes. When Build receives a ticket, it should normally resolve the ticket, claim it according to setup, create/switch branch according to setup, then build.
- Review: built work that should be made reviewable by committing intended changes, pushing the branch, and raising or updating a PR by default when the repository workflow supports PRs, then validated against shaped intent through AI review, human review, tests, builds, PR/code-diff review, manual QA, or release-risk checks.
- Compound: completed work or learning that may be worth codifying.

If routing is ambiguous and the choice materially changes the output, ask one focused routing question.

## Operator approval gates and automation policy

For guided multi-stage lifecycle work, do not advance to the next stage without explicit operator approval. This is a mandatory human-in-the-loop clarity check, not a suggestion.

For a direct stage command such as `cl-build <ticket>` or `cl-review <current branch>`, treat the requested stage as already selected. Do not interrupt with conceptual lifecycle gates inside that stage. Instead, follow the repo/user automation policy from Setup:

- proceed automatically for safe/discoverable actions such as reading tickets, inspecting code, creating local branches, running tests, and other operations marked safe;
- ask before approval-required mutations such as moving external ticket state, assigning tickets, pushing branches, opening/updating PRs, modifying ticket descriptions, resolving comments, merging, deploying, or releasing, unless Setup explicitly authorizes them;
- always ask before scope changes, product/taste choices, risky architecture/security/privacy decisions, destructive operations, force pushes, protected-branch writes, or ambiguous unrelated changes.

If no automation policy exists, be conservative for write-capable external operations and use or request Setup when the uncertainty materially affects the workflow.

At the moment a stage appears complete:

1. Summarize the stage output and any important changed wording, assumptions, scope, title, or intent.
2. Ask whether the operator is ready to move to the named next stage.
3. In Pi, use the TUI `ask_user` tool when available. In other agents, ask an explicit yes/no question and stop.
4. Continue only after an affirmative answer. If the answer is no, revise the current stage or stop as requested.

Required approval transitions:

- Shape → Plan
- Plan `Slice` → Plan `Specify`
- Plan → Build
- Build → Review
- Review → Compound

Compound completes the lifecycle and does not advance further.

## Operator guidance

For any multi-step lifecycle work, guide the operator to completion instead of only producing the final artefact.

At the start, show:

- current stage and why it was selected;
- stage checklist, including substeps such as `Plan = Slice + Specify`;
- what evidence or decisions are needed to leave the stage.

During or at the end, keep status visible:

- `Done` — completed outputs or decisions;
- `Left` — remaining work, checks, or open decisions;
- `Blocked` — the single focused question or missing input, if any;
- `Ready for next stage?` — yes/no, next stage name, why, and whether operator approval has been requested/received.

Do not create a heavy process gate for trivial single-stage work, but never silently cross a lifecycle boundary when using Clarity Engineering.

Most stages may loop internally when refinement is needed: do the stage work, check it, refine, and repeat. Build can start from a known position instead of replaying earlier stages: a ticket, prior plan, existing branch, or draft PR can be enough when intent and validation are clear. Review makes refinement loops most visible because it can discover issues through AI review, human review, testing, builds, PR review, or manual app validation. Treat refinement loops as normal quality work, not as automatic lifecycle advancement.

When Review begins, the default posture is to make completed work reviewable: inspect git status, commit intended changes, push the branch, and raise or update a PR when the repository workflow supports PRs. Review is the stage that raises the PR. If a PR already exists, update it instead of creating a duplicate. When preparing a PR, discover and follow the repository-local PR template if one exists (for example conventional `.github` template locations). Do not use or mention machine-specific absolute template paths in portable framework output. Include validation evidence from tests, builds, e2e, manual QA, screenshots, logs, or CI in the PR description/review summary.

## Uncertainty handling

Before asking the operator, classify uncertainty:

- **discoverable** — inspect tickets, comments, docs, code, setup, branch, PR, tests, or logs first;
- **non-blocking assumption** — proceed, state the assumption, and include it in output;
- **blocking** — ask one focused question before coding, publishing, or changing scope.

When local workflow assumptions are unclear, prefer framework setup before pretending Clarity Engineering knows the codebase. Setup should discover or draft the smallest useful repo-local configuration for work tracking, Plan ticket materialization, domain/decision docs, validation/e2e tools, MCP/tool safety, review/publishing workflow, local/global memory, context budget policy, and human decision rights.

Memory should be treated as indexed retrieval, not a context dump. Load current ticket/slice and relevant repo memory before global memory. Do not bulk-load ADRs, solution archives, or global memory unless explicitly justified by the stage.

## Output

- Chosen mode and why.
- Intent source resolved, including ticket/PR/branch/diff/test/user request when applicable.
- The mode-specific output, using the matching `cl-*` skill behavior.
- Operator progress status: `Done`, `Left`, `Blocked`, `Ready for next stage?`, and approval state.
- Any single next action or single focused question when human judgement is required.

## Rules

- Deliverable work needs a clear, trackable intent source. A formal ticket is preferred for non-trivial work, but a PR review comment, failing test, explicit user request, branch/PR goal, bug report, or local markdown task can be sufficient for small work.
- Do not add ceremony for trivial work.
- Ask one focused question at a time.
- Treat stage-transition approval as human judgement; ask it explicitly before continuing.
- Keep implementation freedom while clarifying expected behavior.
- Use `skills/cl-engineering/references/framework-summary.md` as the portable framework reference when needed.
- Use Setup to configure the Clarity Engineering framework for the current codebase; do not hardcode one issue tracker, MCP set, e2e tool, PR workflow, or memory location as universal.
- Respect context budgets: prefer narrow retrieval and summaries over dumping memory into the stage context.

