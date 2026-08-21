---
name: cl-compound
description: Capture or curate durable learning only when it is novel, reusable, and costly to rediscover.
---

# Clarity Compound

Compound is an exception path, not a mandatory end-of-Build report.

## Admission test

Create or update durable learning only when it is:

1. novel to the repository;
2. reusable beyond the current ticket;
3. expensive to rediscover.

If any condition fails, return `no action` and create no artifact.

## Workflow

1. Search narrowly for an existing related entry.
2. Prefer updating or deduplicating over creating a new file.
3. Choose the smallest destination:
   - recurring codebase problem/fix → `docs/solutions/` or repo equivalent;
   - durable architecture trade-off → ADR location;
   - repository workflow rule → active project instructions/setup;
   - cross-repo preference → global memory when available.
4. Record problem, root cause/context, working solution or decision, and reuse guidance.
5. Archive or refresh stale conflicting entries when necessary.

Use a single-pass lightweight workflow by default. Use research/subagents only when the learning spans several systems or conflicting prior records.

## Output

Return `created`, `updated`, `deduplicated`, `archived`, or `no action`, plus the path when one changed.
