# Clarity Engineering Context and Memory

Use memory as indexed retrieval, not a context dump.

## Read order

1. Current request, ticket, plan slice, failing test, branch, or PR.
2. Current diff and directly affected code/tests.
3. A narrowly relevant repository learning or decision.
4. Global memory only for a specific cross-repository preference.
5. Framework reference only when policy is disputed or unclear.

Current intent overrides memory. Surface conflicts instead of silently following stale guidance.

## Conditional continuity

Normal execution state lives in the issue tracker, task tracker, git history, and PR.

Write session state only when unfinished work must survive a context boundary. Keep only:

- intent source;
- branch;
- completed work;
- remaining work;
- blocker;
- PR/review surface.

Delete or archive it when no longer useful according to repository policy.

## Learning admission

Create durable learning only when it is:

1. novel to the repository;
2. reusable beyond the current ticket;
3. expensive to rediscover.

Prefer updating an existing solution, ADR, or project instruction over creating another file. Do not create a raw per-Build capture merely to curate it later.

## Context control

Use operational limits rather than approximate token fields in config:

- scan headings before reading long artifacts;
- read the active slice and linked requirements only;
- summarize logs and delegated work;
- pass file paths and compact receipts between stages;
- use fresh contexts only for independent or bounded work.
