---
name: cl-shape
description: Shape ambiguous work into the right executable artifact for the current codebase or team: epic, spike, shaped ticket, RFC, or an improved existing ticket.
---

# Clarity Shape

Use this skill when the work is ambiguous, underdefined, strategically important, or not yet in the right form for planning or building.

`cl-shape` is not a Shape Up clone and not just a ticket-polishing step. Its job is to take unclear work and turn it into the **right level of executable clarity for this repo**.

## Goal

Produce the smallest artifact that makes the work understandable, bounded, and ready for the next decision:

- **epic** — broad outcome with multiple follow-on slices or tickets;
- **spike** — learning-oriented work where the main output is an answer, recommendation, or de-risking result;
- **shaped ticket** — a concrete piece of delivery work that can move to Plan or directly to Build when small enough;
- **RFC** — cross-team, architectural, high-blast-radius, or hard-to-reverse work that needs a decision document;
- **ticket improvement** — upgrade an existing underdefined ticket, issue, or request without changing its underlying goal.

## Inputs

- Ambiguous request from a staff engineer, EM, PM, founder, teammate, issue tracker, support signal, PR discussion, bug report, or personal project note.
- Existing ticket/issue/epic/RFC/spike that is vague or incomplete.
- Optional context: customer requests, strategy/initiative links, constraints, examples, dependencies, risks, prior docs, and setup/config.

## Shaping posture

Shape should behave more like a strong collaborative discovery pass than a template dump.

- Ask **one focused question at a time** when human judgement is required.
- Pressure-test assumptions before locking in the output shape.
- Explore multiple approaches only when the choice materially affects scope, UX, risk, or organizational alignment.
- Stay at the right altitude: concrete enough to guide planning/building, abstract enough to leave implementation freedom.
- Adapt to the current repo's shaping norms from Setup instead of forcing one product-development doctrine.

## Context-aware Shape entry

At Shape entry, resolve the intent source before writing artifacts:

1. Identify the input kind: fuzzy goal, existing issue/ticket, epic, spike request, PR thread, bug report, branch goal, or explicit user request.
2. Read relevant repo setup, strategy, tracker context, existing docs, linked tickets, and current code/diff when useful.
3. Determine whether the work is already shaped enough. If so, improve only the missing parts instead of redoing the artifact.
4. Determine the likely artifact type: epic, spike, shaped ticket, RFC, or ticket improvement.
5. Ask one focused question only when the missing judgement is not discoverable from existing context.

Proceed autonomously through shaping. Escalate only when scope, intent, priority, ownership, or product behaviour is materially ambiguous and not discoverable.

## Setup-aware shaping

`cl-shape` must adapt to the repo's local norms when Setup defines them. In particular, check for:

- preferred shaping outputs (epic, spike, ticket, RFC, local markdown, tracker-native project);
- whether shaping usually starts from an EM/SEM/PM request, customer request, or self-directed problem statement;
- whether appetite or effort sizing matters here, and whether it is required or optional;
- whether options analysis is expected by default or only for larger work;
- when a shaped item should remain local markdown versus becoming a tracker item;
- when a spike should be created instead of forcing delivery scope;
- when RFCs are required or preferred.

If Setup is missing, use portable defaults and state assumptions.

## What Shape must always clarify

For non-trivial work, shape should clarify these questions:

1. **What is the goal?** What outcome are we trying to achieve, for whom, and why now?
2. **What artifact is appropriate?** Epic, spike, shaped ticket, RFC, or update to existing work?
3. **What are the boundaries?** What is in, out, and where is the stop line?
4. **What is still ambiguous?** Which assumptions, unknowns, or dependencies could change the shape?
5. **What is the likely next step?** Plan, Build, RFC review, spike execution, or tracker refinement?

## Output contract

### 1. Context

Always include:

- intent source and links/IDs where applicable;
- who asked for it or who benefits, when relevant;
- why now;
- strategy / initiative / parent project context when it exists.

### 2. Artifact choice

State the chosen output type and why it is the right one:

- `Epic`
- `Spike`
- `Shaped ticket`
- `RFC`
- `Improve existing ticket`

### 3. Boundaries

For standard+ shaping, always state:

- **In** — what is included;
- **Out** — what is intentionally excluded;
- **Stop line** — where builders should stop without reopening scope.

### 4. Shape-specific output

#### Epic

Use when the goal is larger than one buildable unit and still needs later slicing.

Include:

- desired outcome;
- scope boundaries;
- major themes or workstreams;
- key dependencies;
- likely follow-on tickets or slices;
- whether a spike or RFC is needed before planning.

#### Spike

Use when the primary need is learning or de-risking.

Include:

- question to answer;
- why the uncertainty matters;
- expected output (recommendation, prototype, benchmark, decision memo, etc.);
- timebox or effort hint when known;
- success criteria for the spike.

#### Shaped ticket

Use when the work is concrete enough for planning or direct build.

Include:

- problem statement or user story;
- desired outcome;
- acceptance criteria;
- boundaries and non-goals;
- notes / context / dependencies only when they improve execution.

#### RFC

Use when the work is architectural, cross-team, hard to reverse, or high-blast-radius.

Include:

- problem and context;
- constraints;
- options considered when relevant;
- recommended direction;
- trade-offs;
- rollout / migration considerations;
- open questions;
- what decision or approval is needed.

#### Improve existing ticket

Use when the right move is to sharpen an existing artifact rather than create a new one.

Include:

- what is unclear today;
- proposed revised wording or metadata;
- any missing boundaries, dependencies, or acceptance criteria;
- whether the ticket becomes ready for Plan/Build after improvement.

## Optional but valuable shaping dimensions

Use these when they help; do not force them every time.

### Appetite or effort hint

When provided by the user, setup, or organizational workflow, capture it. If not provided, treat it as optional.

Examples:

- small / direct build;
- 1-2 engineer days;
- 1 week;
- multi-sprint / epic;
- exploration only.

Do not force Shape Up-style appetite semantics onto repos that do not use them.

### Options considered

Only include options when they materially affect the shape. For medium+ work, it is often useful to note:

- option A;
- option B;
- chosen direction;
- why the others were not chosen.

### Risks and rabbit holes

For work that could derail planning or building, surface:

- hidden complexity;
- dependency risk;
- cross-team coupling;
- migration or data risk;
- unknowns that justify a spike or RFC.

### Milestones and dependencies

When relevant, note:

- blocking dependencies;
- sequencing constraints;
- milestone relevance;
- other teams, repos, or review surfaces that matter.

## Artifact writing guidance

Keep the artifact concise and aligned to the local tracker or doc conventions discovered during Setup.

- Keep metadata out of the body when the tracker has fields for it.
- Do not add tracker comments on the operator's behalf.
- Do not jump into implementation details unless the artifact itself is a technical decision document.
- Do not force RFCs, options sections, or appetite fields when the work does not warrant them.
- If the repo prefers markdown artifacts before tracker mutation, produce the markdown first.

## Progress status

Always include:

- `Done` — goal clarified, artifact type chosen, boundaries set, artifact shaped or improved;
- `Left` — what is still missing;
- `Blocked` — the single unresolved judgement preventing completion;
- `Ready for Plan?` — yes/no, with reason;
- `Ready for Build?` — yes/no, only when the work is already small and concrete enough.

Escalate for operator confirmation before moving to the next lifecycle stage.

## Human ownership

The human owns:

- priority;
- whether the work is worth doing now;
- product/taste calls that materially change behaviour;
- approval to create or significantly rewrite external tracker items when setup says that requires consent.

If the answer can be discovered from tickets, docs, code, setup, or linked artifacts, discover it before asking.

## Rules

- Do not advance to the next lifecycle stage without explicit operator approval.
- Shape ambiguous work into the right artifact; do not assume every request should become a delivery ticket.
- Prefer epic / spike / RFC when the work is too broad, too uncertain, or too risky for a simple ticket.
- Use one focused question at a time when human judgement is required.
- Keep the output portable and setup-aware across different companies and project styles.
- Do not plan implementation steps in Shape unless the artifact is specifically a decision document that needs technical direction.
- Do not add unnecessary ceremony.
