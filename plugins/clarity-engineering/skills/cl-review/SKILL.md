---
name: cl-review
description: Review built work against intent and evidence, producing prioritized findings and a confidence decision without publishing by default.
---

# Clarity Review

Review owns findings and confidence. It does not commit, push, create/update PRs, resolve comments, merge, or release unless the current request explicitly includes that scoped action.

## Entry

Resolve the intent source and review surface: ticket/plan plus current diff, branch, or PR. Read prior validation or drift notes only when they exist and are relevant.

## Proportional review

- trivial/small low-risk diff → one direct pass plus targeted validation;
- medium or risky diff → intent, correctness, failure modes, tests, and maintainability lenses;
- architectural/security/privacy/public-contract work → independent review and stronger evidence.

Start with intent correctness:

For confidence slices, review in stages rather than waiting for the final implementation:

- **directional review** → does the UI surface, interaction model, and PR shape move toward the intended experience? Check this before substantial business logic accumulates;
- **behavior review** → does the connected business logic support the accepted UI without invented scope or unnecessary abstraction?
- **polish review** → are states, accessibility, performance, and deliberate experience details covered?

A directional review may use a draft PR and fixtures or fake behavior. It is feedback on direction, not approval to publish incomplete production work.

1. Does the change satisfy acceptance behavior and respect non-goals?
2. When behavior crosses a boundary, does current evidence exercise it through the appropriate integration, UI, or end-to-end harness rather than only isolated or mocked tests?
3. Are failures, types/states, boundaries, and operational risks handled?
4. Is the change understandable without unnecessary complexity?
5. For product/UI work, were relevant edge cases and experience quality checked?
6. When confidence slicing was selected, did review happen early enough to prevent business logic from locking in an unproven UI direction?

Classify findings as valid, invalid, duplicate, already fixed, or requiring a product/architecture decision. Route valid fixes to the smallest Build loop.

## Decision

Return one of:

- `approve`;
- `request-changes`;
- `blocked` for missing evidence or judgment;
- `rescope` when the implementation and authorized intent diverge.

Include prioritized findings and evidence. Recommend a publishing action separately when appropriate. If publication was explicitly requested, perform only the authorized action after the review decision and follow repository policy.
