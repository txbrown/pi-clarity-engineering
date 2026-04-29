# Clarity Engineering Memory Model

Clarity Engineering memory should behave like an indexed knowledge system, not a context dump.

The framework leaves room for both:

- **local repo memory** — codebase-specific, durable, and authoritative for repo facts;
- **global memory** — cross-repo preferences, reusable patterns, and framework learning.

The current ticket/slice still owns intent. If memory conflicts with the shaped ticket, surface the conflict instead of silently overriding intent.

## Memory hierarchy

Use memory in this order, from most task-specific to most general:

```text
Current session context
Ticket / slice context
Repo memory
Global memory
Framework memory
```

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
docs/adr/
docs/solutions/
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
- Load order:
- Do not bulk-load:
- Default context budget:
- Build context budget:
- Stale/conflicting memory policy:
```

## Learning destination rules

| Learning type | Preferred home |
|---|---|
| Codebase-specific fact or fix | Repo memory, such as `docs/solutions/` or `docs/clarity/learnings/` |
| Domain term | Repo `CONTEXT.md` or domain glossary |
| Architecture decision | Repo `docs/adr/` |
| Agent/tool/review workflow | Repo `docs/agents/clarity-engineering.md` or split setup docs |
| Cross-repo engineering preference | Global memory |
| Framework principle or workflow | Framework vault and, when useful, plugin update |
| Temporary session detail | Current session only; summarize if it must survive |

## Rule of thumb

Local repo memory is authoritative for codebase-specific facts. Global memory is authoritative only for cross-repo preferences, reusable patterns, and framework learning. Current ticket/slice intent overrides both.
