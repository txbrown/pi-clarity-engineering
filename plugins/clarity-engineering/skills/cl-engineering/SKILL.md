---
name: cl-engineering
description: Apply Ricardo's Clarity Engineering framework consistently with AI. Use for routing work across Shape, Plan, Build, Review, and Compound.
---

# Clarity Engineering Router

Use this skill when a request should be handled through Clarity Engineering or when the user asks for Clarity Engineering generally.

Lifecycle:

```text
Shape → Plan → Build → Review → Compound
```

Plan contains two substeps:

```text
Plan = Slice + Specify
```

## Inputs

- A raw idea, request, ticket, plan, diff, implementation task, or completed-work recap.
- Optional context such as constraints, references, code paths, or acceptance criteria.

## Routing

Route to the most useful mode:

- Shape: fuzzy idea, unclear problem, or deliverable work without a ticket.
- Plan: shaped work that needs vertical slicing or acceptance details for the next slice.
- Build: a selected slice with enough acceptance detail to implement TDD-first.
- Review: a diff, PR, design, or implementation that must be checked against intent.
- Compound: completed work or learning that may be worth codifying.

If routing is ambiguous and the choice materially changes the output, ask one focused routing question.

## Operator guidance

For any multi-step lifecycle work, guide the operator to completion instead of only producing the final artefact.

At the start, show:

- current stage and why it was selected;
- stage checklist, including substeps such as `Plan = Slice + Specify`;
- what evidence or decisions are needed to leave the stage.

During or at the end, keep status visible:

- `Done` — completed outputs or decisions;
- `Left` — remaining work, checks, or open decisions;
- `Blocked` — the single focused question or missing input, if any;
- `Ready for next stage?` — yes/no, next stage name, and why.

Do not create a heavy process gate for trivial work, but always make stage completion state explicit when using Clarity Engineering.

## Output

- Chosen mode and why.
- The mode-specific output, using the matching `cl-*` skill behavior.
- Operator progress status: `Done`, `Left`, `Blocked`, and `Ready for next stage?`.
- Any single next action or single focused question when human judgement is required.

## Rules

- Ticket is mandatory for deliverable work.
- Do not add ceremony for trivial work.
- Ask one focused question at a time.
- Keep implementation freedom while clarifying expected behavior.
- Use `skills/cl-engineering/references/framework-summary.md` as the portable framework reference when needed.

