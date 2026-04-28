---
name: cl-plan
description: "Plan shaped work using Plan = Slice + Specify: vertical slices plus acceptance details for the selected next slice."
---

# Clarity Plan

Use this skill when shaped work needs to become an ordered, buildable path.

```text
Plan = Slice + Specify
```

## Inputs

- A shaped ticket or clear request.
- Optional constraints, dependencies, references, risks, and existing acceptance criteria.

## Slice

Create an ordered ticket breakdown around meaningful vertical capability. Prefer slices that each deliver observable value or validated learning.

Include:

- ordered slices;
- purpose/outcome per slice;
- dependencies and sequencing notes;
- AFK/HITL hints where useful;
- risks and assumptions.

Avoid horizontal slices that only move technical layers without meaningful capability unless the ticket type is explicitly Technical Improvement or Chore / Maintenance.

## Specify

For the selected next slice, clarify acceptance details until there is no implementation-blocking ambiguity.

Include:

- examples;
- edge cases;
- expected outcomes;
- non-goals;
- remaining non-blocking questions.

Do not define the first failing test here. Build translates acceptance details into tests.

## Operator guidance

Guide the operator through Plan as two visible substeps:

1. `Slice` — create and confirm the ordered vertical breakdown.
2. `Specify` — clarify acceptance details for the recommended or selected next slice.

Keep completion state explicit:

- `Done` — slices created, recommended slice selected, acceptance details captured.
- `Left` — missing acceptance examples, edge cases, outcomes, non-goals, dependencies, or validation notes.
- `Blocked` — the single focused question needed to finish Plan, if any.
- `Ready for Build?` — yes/no, with the reason. Only say yes when the next slice has enough acceptance detail for Build to write the first failing behavior test.

## Output

- Ordered vertical ticket breakdown.
- Recommended next slice.
- Acceptance details for the recommended or user-selected next slice.
- Plan progress status: `Done`, `Left`, `Blocked`, and `Ready for Build?`.
- One focused question if the selected next slice or acceptance behavior is materially ambiguous.

