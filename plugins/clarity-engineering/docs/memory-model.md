# Clarity Engineering Memory Model

Clarity Engineering memory should behave like an indexed knowledge system, not a context dump.

The framework leaves room for both:

- **local repo memory** — codebase-specific, durable, and authoritative for repo facts;
- **global memory** — cross-repo preferences, reusable patterns, and framework learning.

The current ticket/slice still owns intent. If memory conflicts with the shaped ticket, surface the conflict instead of silently overriding intent.

Session state and continuous compound are live, per-session artifacts that sit alongside repo memory — they're transient working memory, not durable reference material.

## Memory hierarchy

Use memory in this order, from most task-specific to most general:

```text
Current session context
Session state (per ticket, resume-capable)
Ticket / slice context
Continuous compound (per-Build captures)
Repo memory
Global memory
Framework memory
```

## Session state and continuous compound

Session state is per-ticket working memory that survives across sessions. The agent writes it at the end of every Build and reads it at Build entry to resume where it left off.

Content:

- branch name;
- last session date;
- depth classification;
- completed work items;
- remaining work items;
- PR link;
- current blockers.

Continuous compound is the automatic capture of learnings at the end of every Build. It stays in scope during the current work cycle and is curated (promoted, refreshed, deduplicated, or archived) by the standalone Compound command.

## Repo memory

Repo memory is the primary durable context for codebase work.

Common locations:

```text
CONTEXT.md
CONTEXT-MAP.md
docs/agents/clarity-engineering.md
docs/agents/domain.md
docs/agents/validation.md
docs/agents/tools-and-mcps.md
docs/agents/review-workflow.md
docs/agents/session-state/
docs/adr/
docs/solutions/
docs/clarity/continuous-compound/
docs/clarity/learnings/
```

Repo memory is authoritative for:

- domain language;
- local architecture;
- validation commands;
- e2e/manual QA flows;
- available MCPs and tool safety;
- review/publishing workflow;
- repo-specific decisions and solved problems.

## Global memory

Global memory is supplementary for codebase work.

Use it for:

- cross-repo engineering preferences;
- reusable review heuristics;
- common debugging/testing patterns;
- deciding whether a learning should become global or framework-level;
- framework/plugin improvements.

Do not bulk-load global memory. Retrieve narrow entries by relevance.

## Context budget discipline

Practical operating targets:

```text
Default stage context: keep under ~100k tokens where possible
Build loop context: prefer under ~50k tokens
Review context: keep under ~100k unless broad architectural review is requested
```

These are heuristics, not hard limits. The point is to preserve attention for the current stage.

If context grows too large:

- summarize and checkpoint;
- keep links/paths instead of full docs;
- read only relevant sections;
- replace raw logs with distilled evidence;
- split broad work into smaller slices.

## Setup fields

`/cl-setup` should discover or draft a memory/context section like this:

```markdown
## Memory and context policy

- Local repo memory:
- Global memory:
- Session state location:
- Continuous compound location:
- Load order:
- Do not bulk-load:
- Default context budget:
- Build context budget:
- Stale/conflicting memory policy:
```

## Learning destination rules

| Learning type | Preferred home |
|---|---|
| Build-specific learning (per ticket) | Continuous compound; promoted to repo/global by standalone Compound |
| Codebase-specific fact or fix | Repo memory, such as `docs/solutions/` or `docs/clarity/learnings/` |
| Domain term | Repo `CONTEXT.md` or domain glossary |
| Architecture decision | Repo `docs/adr/` |
| Agent/tool/review workflow | Repo `docs/agents/clarity-engineering.md` or split setup docs |
| Cross-repo engineering preference | Global memory |
| Framework principle or workflow | Framework vault and, when useful, plugin update |
| Temporary session detail | Current session only; summarize if it must survive |

## Recommended default scaffold

When a repo has no Clarity-specific memory structure yet, the smallest useful default scaffold is:

```text
docs/agents/session-state/
docs/clarity/continuous-compound/
docs/solutions/
docs/adr/
```

See `plugins/clarity-engineering/docs/learning-destinations.md` for promotion rules.

## Rule of thumb

Local repo memory is authoritative for codebase-specific facts. Global memory is authoritative only for cross-repo preferences, reusable patterns, and framework learning. Current ticket/slice intent overrides both.
