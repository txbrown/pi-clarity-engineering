# Clarity Engineering Setup and Configuration

Clarity Engineering is intentionally portable. The framework stays stable, while each codebase provides a small setup/configuration layer that tells agents how to apply it locally.

Setup is not a new lifecycle stage or lifecycle mode. It is **Clarity Engineering framework setup/configuration for a codebase**: the adapter between the framework's lifecycle

```text
Shape → Plan → Build → Review → Compound
```

and the codebase's real ticket system, domain language, validation tools, MCPs, e2e flows, review process, and human decision rights.

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

## Work tracking

- System:
- Project/team/repo:
- Ticket types:
- Status vocabulary:
- Link/search instructions:
- Follow-up ticket convention:
- Ticket-equivalent artifact for small work:

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
- Commit convention:
- PR template:
- CI requirements:
- Manual QA:
- Release/rollout:

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
- Treat write-capable MCPs/tools carefully.
- Update setup during Compound when repeated friction appears.

## Command

Use `/cl-setup` to discover or draft the Clarity Engineering framework setup for a repo.
