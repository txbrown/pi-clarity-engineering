---
name: cl-build
description: Implement clear work with proportional behavior evidence, tight scope, and an intent check.
---

# Clarity Build

Build owns implementation and local validation. It does not publish by default.

## Entry

1. Resolve the request, ticket, plan slice, failing test, review comment, branch, or PR goal.
2. Inspect the current branch/diff and directly affected code and tests.
3. Resume a session artifact only when one exists for unfinished work.
4. Choose the smallest coherent work unit.
5. Treat depth proportionally:
   - trivial: targeted change and check;
   - small: direct behavior loop;
   - medium: execute the selected slice;
   - architectural/high-risk: require clear decisions and stronger evidence.

State depth only when it changes ceremony or operator choice.

## Evidence-first loop

- behavior change → use the narrowest existing harness that proves the solution at the real boundary: integration tests for cross-layer behavior, UI tests for interface behavior, and end-to-end tests for critical journeys;
- isolated logic → focused unit tests are sufficient when behavior does not cross a boundary;
- legacy behavior → characterize before changing it;
- bug → reproduce, minimise, hypothesise, instrument, fix, regression-test through the appropriate harness, clean up;
- mechanical change → use the smallest targeted validation; do not invent a test.

Implement the minimum in-scope behavior, run the selected harness, and keep checks green. If boundary behavior has no suitable harness, add the smallest useful one or report the validation gap rather than claiming confidence from isolated checks. Create local commits only when project policy allows; never push or publish implicitly.

## Intent check

Before completion, compare the implementation with acceptance behavior and non-goals.

- missed criterion → fix it;
- accidental scope creep → remove it or escalate;
- behavior or scope divergence → treat as `rescope` unless the current request or canonical intent source already authorizes it;
- harmless implementation detail improvement within scope → report only when review-relevant.

Intentional does not mean authorized.

## Conditional continuity and learning

Write session state only when unfinished work must survive a context boundary. Keep it to intent source, branch, completed work, remaining work, blocker, and PR.

Write or invoke Compound only when a learning is all three:

1. novel to the repository;
2. reusable beyond this ticket;
3. expensive to rediscover.

Otherwise write no session or learning artifact and do not narrate a no-op compound step.

## Output

Return the result, checks run, intent-check outcome, and files changed. Include remaining work or a blocker only when one exists. Publishing is a separate explicitly authorized action.
