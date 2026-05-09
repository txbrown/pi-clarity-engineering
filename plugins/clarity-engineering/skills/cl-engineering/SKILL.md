---
name: cl-engineering
description: Apply Ricardo's Clarity Engineering framework consistently with AI. Use for routing work across Shape, Plan, Build, Review, and Compound.
---

# Clarity Engineering Router

Use this skill when a request should be handled through Clarity Engineering or when the user asks for Clarity Engineering generally. Also use it to route framework setup/configuration requests that make Clarity Engineering adaptable to a specific codebase.

Clarity Engineering is a lightweight constitution for agentic software delivery — not a project management checklist. The agent owns execution flow; the framework defines principles, escalation boundaries, and stage semantics.

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
3. Classify depth: trivial / small / medium / architectural. State the classification and what it implies for ceremony.
4. Decide whether the requested stage has enough clarity to proceed without replaying earlier stages.
5. Perform the natural workflow actions for that stage according to repo setup, proceeding autonomously through the work.
6. Escalate only at genuine triggers: intent ambiguity, scope conflict, product decision, architecture risk, validation challenge, unauthorized external mutation, or completion.

Do not force earlier stages when a later stage receives enough context. Do not ask for approval at mechanical stage boundaries — escalate only when a trigger fires.

## Routing

Route to the most useful mode:

- Setup: Clarity Engineering framework setup/configuration for the codebase is missing or requested, such as where tickets live, how Plan should materialize planned slices/tickets, which MCPs/tools to use, validation/e2e commands, domain docs, ADRs, review workflow, or human decision rights. Setup is not a delivery lifecycle stage or lifecycle mode.
- Shape: fuzzy idea, unclear problem, or deliverable work without a ticket.
- Plan: shaped work that needs vertical slicing, tracker ticket materialization for independently buildable slices, or acceptance details for the next slice.
- Build: already-shaped or resolvable work with enough clarity to implement TDD-first. This can be a selected slice, a complete small ticket, a bug with expected/actual behavior, a technical improvement with target state, a prior Shape/Plan artefact from another session, a ticket URL/ID that can be resolved, a failing test, a model problem with clear invariants, or a draft PR/branch that needs continued implementation or review-feedback fixes. When Build receives a ticket, it should normally resolve it, classify depth, claim/setup work according to setup, create/switch branch, then build. Build includes intent drift detection before committing, and continuous compounding after completion.
- Review: built work that should be made reviewable by committing intended changes, pushing the branch, and raising or updating a PR by default when the repository workflow supports PRs, then validated against shaped intent through AI review, human review, tests, builds, PR/code-diff review, manual QA, or release-risk checks. Review includes escalation for findings that require operator judgement.
- Compound: accumulated learnings that should be curated — codify learning, update stale docs, or record no reusable learning. Continuous compounding already happens during Build; the standalone command reviews and organizes accumulated learnings rather than being the only compounding path.

If routing is ambiguous and the choice materially changes the output, ask one focused routing question.

## Escalation model

Agents own execution flow. They proceed through stages autonomously and escalate only at genuine triggers. Mechanical stage-transition approvals are replaced by the escalation model.

Escalation triggers:

1. **Intent ambiguity** — the ticket or acceptance criteria don't define behaviour clearly enough to build safely.
2. **Scope conflict** — the implementation would touch systems, modules, or contracts the ticket didn't scope.
3. **Product/UX decision** — multiple valid approaches exist and the choice affects user experience or business outcome.
4. **Architecture risk** — the approach would introduce coupling, break an invariant, or create a pattern that affects future work.
5. **Validation challenge** — a test fails in a way that suggests the approach is wrong, not just the code.
6. **External mutation** — an action that modifies external state (tracker, remote branches, PRs, environments) and Setup doesn't pre-authorize it.
7. **Completion** — the work is built, validated, and ready for the operator to inspect before publishing or merging.

Everything else — reading tickets, inspecting code, creating local branches, writing tests, implementing, running checks, committing locally, continuous compounding — the agent does without asking.

When escalating, ask exactly one focused question. In Pi, use the TUI `ask_user` tool when available. In other agents, ask an explicit question and stop.

## Operator guidance

Agents own execution flow and should keep the operator oriented without micromanaging the lifecycle.

At the start, show:

- current stage and why it was selected;
- depth classification and what it implies for ceremony;
- what evidence or decisions are needed to complete the work.

During or at the end, keep status visible:

- `Done` — completed outputs or decisions;
- `Left` — remaining work, checks, or open decisions;
- `Blocked` — the single focused escalation question;
- Escalation trigger fired and awaiting operator response.

Do not create ceremony for trivial or small work. The agent should proceed through safe work without asking, keep the status bar accurate with activity details, and escalate only when a trigger fires.

Most stages may loop internally when refinement is needed. Build can start from a known position instead of replaying earlier stages. Review makes refinement loops most visible. Treat refinement loops as normal quality work.

When Review begins, the default posture is to make completed work reviewable: commit, push, and raise/update a PR. Review is the stage that raises the PR. Include validation evidence and intent drift notes in the PR description.

## Uncertainty handling

Before asking the operator, classify uncertainty:

- **discoverable** — inspect tickets, comments, docs, code, setup, branch, PR, tests, or logs first;
- **non-blocking assumption** — proceed, state the assumption, and include it in output;
- **blocking** — ask one focused question before coding, publishing, or changing scope.

When local workflow assumptions are unclear, prefer framework setup. Setup should discover or draft the smallest useful repo-local configuration for work tracking, Plan ticket materialization, domain/decision docs, validation/e2e tools, MCP/tool safety, review/publishing workflow, local/global memory, context budget policy, escalation policy, and human decision rights.

Memory should be treated as indexed retrieval, not a context dump. Load current ticket/slice and relevant repo memory before global memory. Do not bulk-load ADRs, solution archives, or global memory unless explicitly justified by the stage.

## Output

- Chosen mode and why.
- Depth classification at Build entry.
- Intent source resolved, including ticket/PR/branch/diff/test/user request when applicable.
- The mode-specific output, using the matching `cl-*` skill behavior.
- Operator status: `Done`, `Left`, and escalation trigger + question when `Blocked`.
- Any single next action or single focused escalation question.

## Rules

- Deliverable work needs a clear, trackable intent source. A formal ticket is preferred for non-trivial work, but a PR review comment, failing test, explicit user request, branch/PR goal, bug report, or local markdown task can be sufficient for small work.
- Do not add ceremony for trivial work.
- Ask one focused question at a time.
- Do not ask for stage-transition approvals; escalate only when a trigger fires.
- Keep implementation freedom while clarifying expected behavior.
- Use `skills/cl-engineering/references/framework-summary.md` as the portable framework reference when needed.
- Use Setup to configure the Clarity Engineering framework for the current codebase; do not hardcode one issue tracker, MCP set, e2e tool, PR workflow, or memory location as universal.
- Respect context budgets: prefer narrow retrieval and summaries over dumping memory into the stage context.

