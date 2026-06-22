# Clarity Engineering Framework Summary

North-star: consistently produce quality software through autonomous agents that proceed confidently and escalate at genuine decision points.

Framework role: a lightweight constitution that agents internalize — not a project management checklist. The agent owns execution flow; the framework defines principles and escalation boundaries.

Thesis: quality software comes from shaped features — meaningful capabilities with clear intent, explicit boundaries, behavioral validation, precise types and states, thoughtful experience quality, shared human/AI context, and a learning loop.

Lifecycle:

```text
Shape → Plan → Build → Review → Compound
```

Plan contains two substeps:

```text
Plan = Slice + Specify
```

Strategy is an upstream judgement layer, not a delivery lifecycle stage. Use Strategy before Shape when the question is whether an idea, opportunity, product bet, or engineering investment is worth pursuing at all. Strategy can recommend Shape, Spike, Prototype, RFC, Park, or Kill.

Principles:

1. Quality comes from unambiguous shaped features, captured as executable agreements.
2. Slice vertically around meaningful capability.
3. Test behavior first.
4. Types and states make intent explicit.
5. Feature boundaries enable safe composition.
6. Delight is part of done.
7. Humans and AI share the same context.
8. Compound the learning continuously — not as an optional afterthought.
9. Escalate on genuine decisions, not on mechanical stage boundaries.
10. Match ceremony to risk: trivial work should feel trivial.

## Strategy layer

Strategy answers: what should we bet on, why, why now, and what would make it matter?

Use Strategy for founder/product judgement, major engineering investments, roadmap bets, ambiguous opportunities, or “should we build this?” questions. Strategy should clarify:

- strategic thesis;
- pain/value intensity;
- story: before, turning point, after, proof;
- readiness and timing;
- options and trade-offs;
- smallest tangible learning path;
- kill or park criteria.

Strategy hands off to Shape only when the bet is worth pursuing. Otherwise it may recommend a spike, prototype, RFC, parking, or killing the idea. Do not force Strategy into routine tickets or daily Build work.

## Execution model: autonomy with escalation

Agents flow through stages autonomously. They do not wait for approval at every lifecycle boundary. They proceed until they hit a genuine **escalation trigger**.

Escalation triggers — the only reasons to stop and ask the operator:

- **Intent ambiguity** — the ticket or acceptance criteria don't define behaviour clearly enough to build safely.
- **Scope conflict** — the implementation would touch systems, modules, or contracts the ticket didn't scope.
- **Product/UX decision** — multiple valid approaches exist and the choice affects user experience or business outcome.
- **Architecture risk** — the approach would introduce coupling, break an invariant, or create a pattern that affects future work.
- **Validation challenge** — a test fails in a way that suggests the approach is wrong, not just the code.
- **External mutation** — an action that modifies external state (tracker, remote branches, PRs, environments) and Setup doesn't pre-authorize it.
- **Completion** — the work is built, validated, and ready for the operator to inspect before publishing or merging.

Everything else — reading tickets, inspecting code, creating local branches, writing tests, implementing, running checks, committing locally — the agent does without asking.

Setup/configuration is Clarity Engineering framework setup for a codebase, not a delivery stage or lifecycle mode. It captures where tickets live, how stage commands resolve tickets/PRs/branches/diffs/tests, how Plan materializes defined slices/tickets, how Build claims work, where domain docs and ADRs live, which validation/e2e tools and MCPs are available, how Review publishes PRs, what automation is safe, where local/global memory lives, what context budget policy applies, and which decisions require human approval.

Stages are context-aware operating modes, not forms. A `cl-*` command may start from a ticket ID/URL, PR, branch, diff, failing test, review comment, model problem, or explicit user request. Resolve the intent source, retrieve narrow relevant context, perform the natural workflow actions for that stage, and ask only for blocking ambiguity, scope/risk judgement, or approval-required write-capable operations.

## Depth classification

Not all work needs the full lifecycle. The agent classifies work at entry and adapts ceremony proportionally.

| Depth | Scope | Treatment |
|---|---|---|
| **Trivial** | Single file, no behaviour change, existing test seam | Fix, self-check, done. No PR needed unless the change touches a shared surface. |
| **Small** | Local behaviour change, well-understood boundary | Light Build + intent check. Review is proportional. |
| **Medium** | Cross-module change, new tests or contracts needed | Full lifecycle. Slice if broad. |
| **Architectural** | New pattern, migration, multi-service, data-model change | Full lifecycle. Consider ADR. Slice and stage. Higher escalation sensitivity. |

The agent states depth classification at Build entry and uses it to decide how much ceremony to apply.

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

- Setup configures the framework for a codebase. Keep it lightweight; prefer existing conventions.
- Agents own execution flow. They proceed through stages autonomously and escalate only at genuine triggers.
- Depth classification is mandatory at Build entry: state the assessed depth and what it implies.
- Plan materializes independently buildable slices in the configured tracker when useful and safe/approved. Skip materialization for trivial/small work.
- Build is TDD-first. For bugs, reproduce → minimise → hypothesise → instrument → fix → regression-test → cleanup. After implementation and before committing, run an **intent drift check**: re-read acceptance criteria and compare against what was built. Classify any gap as deliberate improvement, accidental scope creep, or misunderstanding. Escalate accidental drift or misunderstandings.
- Continuous compounding happens at the end of every Build: identify learnings, decide reusability, write or flag memory. The standalone `cl-compound` command curates and reviews accumulated learnings rather than being the only compounding path.
- Review publishes work: commit, push, raise/update PR by default. Then validate against shaped intent. PR descriptions are evidence-aware. Review may loop back to Build.
- Session state is maintained per ticket: what was completed, what remains, blockers, and current PR state. When resuming a ticket, the agent reads session state and picks up where it left off instead of restarting from scratch.
- In Pi, use the TUI `ask_user` tool for escalation when available; otherwise ask an explicit question and stop.
- Clarity Checks are lightweight; escalation replaces mechanical stage-transition approvals.
