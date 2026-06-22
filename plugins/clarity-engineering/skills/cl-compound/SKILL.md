---
name: cl-compound
description: Curate and organize accumulated Clarity Engineering learnings from continuous compounding across Build sessions.
---

# Clarity Compound

Use this skill to review, curate, and organize learnings that have been continuously compounded during Build sessions. Continuous compounding already captures learning at the end of every Build; the standalone Compound command curates the accumulated learnings — consolidating duplicates, refreshing stale docs, promoting patterns, and deciding what to keep, archive, or elevate.

Default source and destination locations when repo setup does not say otherwise:

```text
docs/clarity/continuous-compound/
docs/solutions/
docs/adr/
docs/agents/session-state/
```

## Goal

Curate the system's learning so it stays useful, current, and findable.

## Inputs

- Accumulated continuous compound entries from Build sessions.
- Decisions made, surprises, failures, bugs, review comments, or repeated patterns.
- Existing docs/templates/skills/tests flagged as stale or conflicting by continuous compounding.
- Existing repo memory, global memory, and framework memory to search before writing.

## Output

Always include a curation decision for each accumulated learning or flagged doc:

- `promote` — reusable beyond current ticket; move to durable memory destination;
- `refresh` — existing doc is stale; update or replace it;
- `deduplicate` — merge overlapping entries;
- `archive` — was useful once but no longer relevant;
- `keep` — leave as-is in continuous compound; useful as session-level context;
- `no action` — nothing to curate now.

When promoting:

- learning summary;
- where it should live: repo memory, global memory, framework memory, note, checklist, prompt, skill, doc, ADR, test helper, setup/config update, or follow-up ticket;
- concrete update or draft text.

Use the memory destination rule from `plugins/clarity-engineering/docs/learning-destinations.md` when available.

Use the memory destination rule:

- codebase-specific facts/fixes → repo memory, such as `docs/solutions/` or `docs/clarity/learnings/`;
- domain terms → repo `CONTEXT.md` or glossary;
- architecture decisions → repo `docs/adr/`;
- agent/tool/review workflow → repo `docs/agents/clarity-engineering.md` or split setup docs;
- cross-repo preferences/patterns → global memory;
- framework principles/workflows → framework vault and, when useful, plugin update.

Search before writing. Do not bulk-load or duplicate local/global memory; retrieve related entries narrowly and update/consolidate when appropriate.

When repo setup is incomplete, prefer these defaults:

- session resume artifacts stay in `docs/agents/session-state/`;
- raw per-Build captures stay in `docs/clarity/continuous-compound/`;
- durable codebase learnings go to `docs/solutions/`;
- architectural decisions go to `docs/adr/`.

## Relationship to continuous compounding

Continuous compounding (in Build) is the capture layer — it happens automatically at the end of every Build. This standalone Compound command is the curation layer — it reviews accumulated captures and makes durability decisions.

Think of it as:

- **Continuous compound** = quick daily notes (automatic, per-Build).
- **Standalone compound** = weekly review and organization (explicit, curation).

Both produce the same structured output; the difference is when and how they're invoked.

## Operator guidance

Keep Compound progress explicit:

- `Done` — accumulated learnings reviewed, curation decisions made, memory destinations updated, stale docs refreshed or flagged, and any default directories created or used consistently when setup was missing.
- `Left` — uncurated entries, stale docs not yet updated, missing target locations.
- `Blocked` — escalation trigger fired, the single focused question needed to finish curation.

## Rules

- Compound is curation, not automatic documentation churn.
- Prefer small reusable updates over large process documents.
- Do not codify private or one-off context unless it changes future behavior.
- Treat memory as indexed retrieval, not a context dump; preserve context budget by reading only relevant memory entries.
- Escalate with one focused question if the reuse value or target location is unclear.
