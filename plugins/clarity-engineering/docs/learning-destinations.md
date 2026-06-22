# Clarity Engineering Learning Destinations

Clarity Engineering should turn useful learning into durable artifacts, not leave it in session context.

## Default destinations

When repo setup does not specify a different home, use these defaults:

| Learning type | Default destination |
| --- | --- |
| Session resume state | `docs/agents/session-state/` |
| Per-Build capture | `docs/clarity/continuous-compound/` |
| Codebase-specific bug/fix/pattern | `docs/solutions/` |
| Architecture decision | `docs/adr/` |
| Repo workflow or setup rule | `docs/agents/clarity-engineering.md` |
| Cross-repo preference or reusable heuristic | global memory |

## Promotion rules

- Keep session-local details in session state unless they will help future work.
- Promote codebase-specific lessons into `docs/solutions/` when another engineer or future agent would likely hit the same problem.
- Promote hard-to-reverse, surprising, or trade-off-heavy decisions into `docs/adr/`.
- Update setup/config docs when the learning changes how the repo should be operated.
- Prefer updating an existing artifact over creating near-duplicate docs.

## Minimal artifact guidance

### Session state

Use concise resume data only:

- intent source;
- branch;
- completed work;
- remaining work;
- blockers;
- PR or review surface.

### Continuous compound

Capture only what was learned during the Build loop:

- useful discoveries;
- dead ends;
- drift or stale docs;
- candidate promotions.

### Solutions

Write a durable solution when the learning is likely to recur. Include:

- symptoms or problem;
- root cause or important context;
- working fix or pattern;
- prevention or reuse note.

### ADRs

Use ADRs only when the decision is:

- hard to reverse;
- surprising without context; and
- based on a real trade-off.

## Rule of thumb

Current ticket intent wins over memory. Durable memory exists to reduce rediscovery, not to override the work currently being shaped, planned, or built.
