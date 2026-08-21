# Clarity Engineering Framework Summary

Clarity Engineering is a small policy for reliable agentic delivery, not a mandatory pipeline.

```text
Shape → Plan → Build → Review → Compound
Plan = Slice + Specify
```

Enter at the first useful point. Skip stages that add no information.

## Principles

1. Keep one canonical intent source: the request, ticket, plan, failing test, branch, or PR.
2. Clarify outcomes, boundaries, and non-goals before risky implementation.
3. Slice vertically around observable capability or validated learning.
4. Validate solutions through the narrowest test harness that exercises the real behavior: integration tests for cross-layer behavior, UI tests for interface behavior, end-to-end tests for critical journeys, and targeted checks for isolated or mechanical work.
5. Make important types, states, and failure modes explicit where the language and problem benefit.
6. Preserve feature boundaries and avoid unrelated cleanup.
7. Treat experience quality as in scope only when the shaped intent makes it relevant.
8. Match ceremony to risk and reversibility.
9. Escalate only for decisions the agent cannot safely discover or assume.
10. Record learning only when it is reusable and costly to rediscover.

## Autonomy and escalation

Proceed through safe, authorized work without mechanical stage-transition approvals.

Escalate for:

- unresolved intent or acceptance ambiguity;
- scope change or conflict;
- product, UX, architecture, security, or privacy decisions with multiple meaningful outcomes;
- validation evidence that challenges the chosen approach;
- externally visible or destructive mutation not authorized by the current request or repository policy.

Completion is a result, not an escalation trigger. A direct request to create/update a ticket, push a branch, or open/update a PR is authorization for that scoped action unless repository policy says otherwise.

## Proportional depth

- **Trivial:** mechanical, no behavior change → change, targeted check, done.
- **Small:** local behavior, known boundary → direct Build plus targeted review.
- **Medium:** multiple units or contracts → Plan when useful, Build, proportional Review.
- **Architectural/high-risk:** hard-to-reverse or broad impact → Shape/Plan, explicit decisions, independent Review, ADR only for a real durable trade-off.

Depth may stay internal for trivial and small work unless it changes the operator's decision.

## Artifacts

- Enrich one canonical intent artifact; do not create ticket + duplicate plan + routine session file.
- Write session state only when unfinished work must survive a context boundary.
- Write a learning only when it is novel, reusable, and expensive to rediscover.
- Use the issue tracker, git history, task tracker, and PR as normal execution state.
- Retrieve narrow sections and evidence; never bulk-load memory by default.

## Ownership

- Shape owns intent and boundaries.
- Plan owns slicing and acceptance detail; tracker mutation is optional and separately authorized.
- Build owns implementation, local validation, and local commits when project policy allows.
- Review owns findings and confidence decisions.
- Publishing owns pushes, PR mutation, merge, and release actions.
- Compound owns durable reusable learning.
