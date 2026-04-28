---
name: cl-review
description: Review changes against shaped intent first, then tests, types, boundaries, experience, and risk.
---

# Clarity Review

Use this skill before merge, PR, handoff, or whenever a change must be checked against Clarity Engineering intent.

## Goal

Review correctness against shaped intent first.

## Inputs

- Shaped ticket or acceptance details.
- Diff, PR, design, implementation summary, or file paths.
- Relevant tests/check results.

## Review order

1. Shaped intent and acceptance details.
2. Behavior tests and validation evidence.
3. Type/state clarity.
4. Feature boundaries and safe composition.
5. Experience quality / delight.
6. Docs, references, rollout, and risk.

## Operator guidance

Guide the operator through the review order visibly so they can see which checks are complete.

Keep completion state explicit:

- `Done` — review dimensions checked and evidence considered.
- `Left` — unchecked dimensions, missing test results, unresolved risks, or follow-up fixes.
- `Blocked` — the single focused question or missing evidence needed to finish Review, if any.
- `Ready for Compound?` — yes/no, with the reason. Say yes when the review decision is clear and any required changes are either resolved or explicitly assigned.

## Output

Decision: `approve`, `request-changes`, `blocked`, or `rescope`.

Then include, as needed:

- prioritized findings;
- evidence or file references;
- suggested fixes;
- risks and follow-up;
- Review progress status: `Done`, `Left`, `Blocked`, and `Ready for Compound?`;
- one focused question if human judgement blocks the decision.

## Rules

- Do not start with style nits when intent correctness is unresolved.
- Prefer actionable findings tied to acceptance details.
- Mark rescope when implementation and shaped intent diverge but the new direction may be valid.

