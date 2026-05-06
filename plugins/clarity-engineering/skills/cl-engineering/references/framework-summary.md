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

Most stages can contain a lightweight refinement loop: do the stage work, check it against intent, refine if needed, and repeat until there is enough confidence to ask for the next lifecycle transition. Refinement inside a stage is normal and should stay proportional; crossing to a different lifecycle stage still requires explicit operator approval.

Setup/configuration is Clarity Engineering framework setup for a codebase, not a delivery stage or lifecycle mode. It captures where tickets live, how stage commands resolve tickets/PRs/branches/diffs/tests, how Plan materializes defined slices/tickets, how Build claims work, where domain docs and ADRs live, which validation/e2e tools and MCPs are available, how Review publishes PRs, what automation is safe, where local/global memory lives, what context budget policy applies, and which decisions require human approval.

Stages are context-aware operating modes, not forms. A `cl-*` command may start from a ticket ID/URL, PR, branch, diff, failing test, review comment, model problem, or explicit user request. Resolve the intent source, retrieve narrow relevant context, perform the natural workflow actions for that stage, and ask only for blocking ambiguity, scope/risk judgement, or approval-required write-capable operations.

Memory model: current ticket/slice intent comes first, repo memory is authoritative for codebase-specific facts, global memory is supplementary for cross-repo preferences/patterns, and framework memory defines Clarity Engineering itself. Treat memory as indexed retrieval, not a context dump. Keep default stage context under ~100k tokens where possible; prefer under ~50k for Build loops.

Feature means both:

- application/business capability;
- feature-driven architecture boundary.

Deliverable work needs a clear, trackable intent source. A formal ticket is preferred for non-trivial work, but a PR review comment, failing test, explicit user request, branch/PR goal, bug report, or local markdown task can be sufficient for small work.

Ticket types:

1. Product Feature
2. Technical Improvement
3. Bug
4. Spike / Research
5. Chore / Maintenance

Important semantics:

- Use Setup when Clarity Engineering framework setup/configuration for the codebase is missing or requested. Keep setup lightweight and adaptable; prefer existing repo conventions over framework defaults.
- Stage transitions require explicit operator approval before advancing: Shape → Plan, Plan Slice → Plan Specify, Plan → Build, Build → Review, and Review → Compound.
- Plan should materialize independently buildable slices/tickets in the configured issue tracker when useful and safe/approved. If a source ticket is already small enough, say no child tickets are needed. If tracker creation is useful but not safe/approved, produce proposed ticket text and ask before mutating the tracker.
- In Pi, request transition approval through the TUI `ask_user` tool when available; otherwise ask an explicit yes/no question and stop.
- Build is TDD-first and can start from any well-known or resolvable position with enough clarity: a selected slice, ticket ID/URL, complete small ticket, shaped bug/technical-improvement/chore, failing test, model problem, prior Shape/Plan artefact from another session, review comments, or a draft PR/branch needing continued implementation or review-feedback fixes. For tickets, Build should fetch context, claim/move In Progress and create/switch branch according to Setup and approval policy. Build selects the smallest useful work unit; it does not force artificial slicing for small clear tickets, and it does not skip slicing when work is too broad. Build should proceed one behavior at a time: one failing behavior test or validation target, minimal implementation, refactor while green, then next behavior. For bugs, first establish a feedback loop: reproduce, minimise, hypothesise, instrument, fix, regression-test, cleanup.
- Review is a flexible validation stage: Review = Publish PR + Validation + Understanding + Decision. On Review entry, normally discover existing PRs to avoid duplicates, commit completed work, push the branch, and raise or update a PR so the work is reviewable. Then check built work against shaped intent first and choose the smallest useful mix of AI review, human review, automated/manual/e2e testing, builds, PR/code-diff review, release checks, and evidence gathering. If preparing PR text, discover and follow the repository-local PR template when one exists; never hardcode machine-specific template paths. Make PR descriptions evidence-aware from ticket intent, implementation summary, validation, manual QA, screenshots/logs, risks, and follow-up. Review may trigger refinement loops back to Build, Plan, or Shape when issues are found.
- Compound is decision-based: codify useful learning, or record that there is no reusable learning. Choose the right memory destination: repo memory for codebase facts/fixes, global memory for cross-repo preferences/patterns, framework memory for Clarity Engineering changes.
- Clarity Checks are lightweight lifecycle questions; transition approval is the one mandatory gate because it protects human intent from silent drift.
