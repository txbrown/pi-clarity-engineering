---
name: cl-shape
description: Shape ambiguous work into the smallest canonical artifact that makes intent, boundaries, and the next decision clear.
---

# Clarity Shape

Use Shape only when intent, outcome, or boundaries are not clear enough for safe planning or implementation.

## Workflow

1. Resolve the existing request, ticket, PR discussion, bug report, or strategy context.
2. Reuse and improve the canonical artifact instead of creating a duplicate.
3. Choose the smallest useful form:
   - shaped ticket for concrete delivery;
   - spike for an answer or de-risking result;
   - epic for several independent capabilities;
   - RFC for a hard-to-reverse or cross-team decision.
4. Clarify goal, beneficiary, why now, in-scope behavior, non-goals, stop line, and material unknowns.
5. Ask one focused question only for a judgment that cannot be discovered.

Do not plan implementation steps unless the artifact is an RFC. Do not mutate an external tracker unless the current request or repository policy authorizes it; otherwise return proposed text.

## Output

Return:

- canonical intent source or proposed artifact;
- goal and boundaries;
- unresolved blocker, if any;
- next owner: Plan, Build, spike execution, or decision review.

Small, already-clear work should be routed directly instead of reshaped.
