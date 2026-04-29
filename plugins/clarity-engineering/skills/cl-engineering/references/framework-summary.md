# Clarity Engineering Framework Summary

North-star: consistently produce quality software.

Thesis: quality software comes from shaped features — meaningful capabilities with clear intent, explicit boundaries, behavioral validation, precise types and states, thoughtful experience quality, shared human/AI context, and a learning loop.

Lifecycle:

```text
Shape → Plan → Build → Review → Compound
```

Plan contains two substeps:

```text
Plan = Slice + Specify
```

Principles:

1. Quality comes from unambiguous shaped features, captured as executable agreements.
2. Slice vertically around meaningful capability.
3. Test behavior first.
4. Types and states make intent explicit.
5. Feature boundaries enable safe composition.
6. Delight is part of done.
7. Humans and AI share the same context.
8. Compound the learning.

Feature means both:

- application/business capability;
- feature-driven architecture boundary.

Ticket is mandatory for deliverable work.

Ticket types:

1. Product Feature
2. Technical Improvement
3. Bug
4. Spike / Research
5. Chore / Maintenance

Important semantics:

- Stage transitions require explicit operator approval before advancing: Shape → Plan, Plan Slice → Plan Specify, Plan → Build, Build → Review, and Review → Compound.
- In Pi, request transition approval through the TUI `ask_user` tool when available; otherwise ask an explicit yes/no question and stop.
- Build is TDD-first.
- Review checks correctness against shaped intent first.
- Compound is decision-based: codify useful learning, or record that there is no reusable learning.
- Clarity Checks are lightweight lifecycle questions; transition approval is the one mandatory gate because it protects human intent from silent drift.

Optional local source of truth on Ricardo's machine:

`/Users/ricardo.abreu/Library/Mobile Documents/iCloud~md~obsidian/Documents/ai`
