---
name: cl-plan
description: Plan shaped work with vertical slices and acceptance detail only when implementation needs that structure.
---

# Clarity Plan

```text
Plan = Slice + Specify
```

Plan only enough to make the next Build safe. Keep one canonical intent artifact and enrich it in place.

## Slice

1. Resolve the shaped request, ticket, epic, approved RFC, or completed spike.
2. If it is already one coherent buildable unit, do not invent child slices.
3. Otherwise define ordered vertical slices with outcome, dependencies, validation evidence, and risk or learning reduced.
4. Select the smallest coherent next slice.

Tracker materialization is optional. Create or update external tickets only when the current request or repository policy authorizes it and the slice is independently assignable or likely to outlive the session. Otherwise return proposed ticket text.

## Specify

For the selected slice capture:

- expected behavior and examples;
- important edge/error cases;
- non-goals and stop line;
- validation evidence required, including the integration, UI, or end-to-end harness that will prove behavior when applicable;
- remaining non-blocking assumptions.

Build, not Plan, chooses the first test or implementation sequence.

## Handoff

For medium or larger work, provide this compact envelope:

```yaml
intent_source:
scope:
non_goals:
readiness: implementation-ready
validation:
external_authority: local-only | remote-authorized
```

For small work, the request or ticket can remain the handoff. Return a blocker only when scope, selected slice, or acceptance behavior is unresolved.
