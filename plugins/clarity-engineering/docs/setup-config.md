# Clarity Engineering Setup and Configuration

Clarity Engineering is intentionally portable. The framework stays stable, while each codebase provides a small setup/configuration layer that tells agents how to apply it locally.

Setup is not a new lifecycle stage or lifecycle mode. It is **Clarity Engineering framework setup/configuration for a codebase**: the adapter between the framework's lifecycle

```text
Shape → Plan → Build → Review → Compound
```

and the codebase's real ticket system, reference-resolution rules, Plan ticket materialization workflow, Build claim workflow, domain language, validation tools, MCPs, e2e flows, Review PR publishing process, automation policy, memory locations, context budgets, and human decision rights.

## Recommended artifact

Prefer a repo-local file:

```text
docs/agents/clarity-engineering.md
```

For small repos, a section in `AGENTS.md`, `CLAUDE.md`, or `CONTEXT.md` can be enough. For larger repos, split by concern:

```text
docs/agents/clarity-engineering.md
docs/agents/issue-tracker.md
docs/agents/domain.md
docs/agents/validation.md
docs/agents/tools-and-mcps.md
docs/agents/review-workflow.md
```

Use whatever names match the repo. Findability matters more than exact paths.

## Minimal template

```markdown
# Clarity Engineering Setup

## Work tracking and reference resolution

- System:
- Project/team/repo:
- Ticket ID patterns:
- Ticket URL patterns:
- PR URL/number patterns:
- Fetch/view/search instructions:
- Branch-to-ticket inference:
- Ticket types:
- Status vocabulary:
- Follow-up ticket convention:
- Ticket-equivalent artifact for small work:

## Plan ticket materialization

- Should Plan create tracker tickets for independently buildable slices:
- Materialization style: child issues / linked follow-ups / checklist items / local markdown / none
- Parent/child convention:
- Dependency convention:
- Default project/team/status:
- Labels/milestones/estimates/priority defaults:
- Title/body format:
- Link-back convention:
- When not to create tickets:
- Requires approval:

## Build claim workflow

- Move ticket to In Progress during `cl-build`:
- Assignment convention:
- Branch convention:
- Branch naming pattern:
- Commit/ticket reference convention:
- Continue existing branch/PR behavior:
- Requires approval:

## Domain and decisions

- Domain glossary:
- ADRs / decision records:
- Architecture/product/design docs:
- Terms to use precisely:

## Validation

- Fast test loop:
- Typecheck:
- Lint:
- Build:
- E2E/manual QA:
- App launch path:
- Known flaky checks:
- Review evidence expected:

## Tools and MCPs

| Tool / MCP | Purpose | Safe operations | Requires approval | Fallback |
|---|---|---|---|---|
|  |  |  |  |  |

## Review and publishing

- Branch convention:
- Commit convention / inference rule:
- PR discovery:
- PR creation/update:
- PR template:
- PR title/body convention:
- Ticket linking/comment/status behavior:
- CI requirements:
- Manual QA:
- Release/rollout:
- Review evidence expected:

## Automation policy

Allowed without asking:
- Read tickets/PRs/comments/docs/code:
- Inspect git status/branch/diff:
- Create/switch local branches:
- Run validation commands:
- Create local commits:
- Create planned child/follow-up tickets during Plan:
- Move ticket to In Progress:
- Push feature branch:
- Open/update PR:

Ask first:
- Modify existing ticket scope/title/description:
- Assign other people:
- Force push/protected branch writes:
- Resolve/delete review comments:
- Mark tickets Done:
- Merge/deploy/release:
- Destructive environment/data operations:

## Memory and context policy

- Local repo memory:
- Global memory:
- Load order:
- Do not bulk-load:
- Default context budget:
- Build context budget:
- Stale/conflicting memory policy:

## Human decision rights

- Lifecycle approvals:
- Scope changes:
- Product/taste:
- Architecture:
- Security/privacy:
- Write-capable tools:
```

## Principles

- Configure enough context for humans and AI agents to share reality.
- Prefer existing repo conventions over framework defaults.
- Keep setup lightweight; do not create configuration theatre.
- Stages are context-aware: resolve ticket/PR/branch/diff/test/user-request intent before doing stage work.
- `cl-plan <ticket>` should materialize independently buildable slices in the configured issue tracker when useful and safe/approved, or explicitly say no child tickets are needed.
- `cl-build <ticket>` should fetch the ticket, claim it according to setup, create/switch branch when appropriate, and build TDD-first.
- `cl-review` should normally commit, push, and raise/update a PR when the repository uses PRs.
- Treat write-capable MCPs/tools carefully and configure safe vs approval-required automation explicitly.
- Update setup during Compound when repeated friction appears.
- Treat memory as indexed retrieval, not a context dump.

## Command

Use `/cl-setup` to discover or draft the Clarity Engineering framework setup for a repo. See `docs/memory-model.md` for the local/global memory and context budget policy.
