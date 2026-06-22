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

- A shaped ticket, ticket ID/URL, issue, PR, branch, failing test, model problem, or clear request.
- Optional constraints, dependencies, references, risks, and existing acceptance criteria.

## Context-aware Plan entry

At Plan entry, resolve the intent source before slicing:

1. Identify the input kind: ticket ID/URL, issue, PR, branch, current diff, failing test, model problem, or explicit user request.
2. Fetch/read relevant context using repo setup and available tools.
3. Determine whether the work is already sufficiently shaped.
4. If the ticket is small and coherent, avoid fake slicing and recommend building the whole ticket.
5. If the ticket is broad, risky, or contains independent capabilities, slice it vertically.
6. Ask one focused question only when acceptance behavior, selected slice, or scope is materially ambiguous.

Do not make a large plan just because Plan was called. Plan should produce only enough structure to make the next Build safe and clear. Proceed autonomously through slicing and specifying; escalate only when the selected slice, acceptance behaviour, or tracker-materialization decision requires operator judgement.

## Slice

Create an ordered ticket breakdown around meaningful vertical capability. Prefer slices that each deliver observable value or validated learning.

Include:

- ordered slices;
- outcome-oriented title per slice;
- purpose/outcome per slice;
- dependencies, `Blocked by`, and sequencing notes;
- AFK/HITL hints where useful;
- validation strategy and evidence expected per slice;
- risk or learning reduced per slice;
- risks and assumptions.

Avoid horizontal slices that only move technical layers without meaningful capability unless the ticket type is explicitly Technical Improvement or Chore / Maintenance.

## Tracker ticket creation

When Plan defines concrete tickets, child tickets, follow-up tickets, or independently buildable slices, decide whether they should be materialized in the configured issue tracker.

Use Setup to determine:

- issue tracker and project/team;
- parent/child, dependency, milestone, label, and status conventions;
- whether planned slices become child issues, linked follow-ups, checklist items on the parent ticket, local markdown only, or no tracker item;
- approval policy for creating or updating external tracker state;
- tracker comment policy, which should default to never adding comments on the operator's behalf.

Create or update tracker tickets during Plan when all are true:

1. the slice/ticket is independently buildable, reviewable, assignable, or likely to survive beyond the current session;
2. the target tracker and relationship convention are known;
3. Setup marks the operation safe or the operator explicitly approves it.

Do not create tracker tickets for every tiny implementation step. If the original ticket is small enough, state that no child tickets are needed and recommend building the original ticket directly. If tracker creation is useful but not safe/approved, produce proposed ticket text and ask one focused approval question before mutating the tracker.

Never add tracker comments on the operator's behalf during Plan. Put required context in the ticket body, relationships, checklist, or Plan output instead. If a comment would help a human follow up, return proposed comment wording without posting it.

When tickets are created or updated, link them back to the parent/source ticket or plan context through tracker fields/relationships when possible, preserve ordering/dependencies, and output the created/updated IDs plus the recommended next Build ticket.

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

- `Done` — slices created, tracker tickets created/updated or deliberately skipped/proposed, recommended slice selected, acceptance details captured.
- `Left` — missing acceptance examples, edge cases, outcomes, non-goals, dependencies, validation notes, or pending tracker creation approval.
- `Blocked` — escalation trigger fired, the single focused question needed to finish Plan.
- `Ready for Specify?` after Slice — yes/no, with the reason. Escalate only when the slice breakdown or selected next slice requires operator judgement; for straightforward breakdowns, proceed to Specify autonomously.
- `Ready for Build?` — yes/no, with the reason. Only say yes when the next slice/ticket has enough acceptance detail for Build to write the first failing behavior test. Escalate for operator confirmation before Build; in Pi use the TUI `ask_user` tool when available.

## Output

- Intent source resolved: ticket/issue/PR/branch/diff/failing test/model problem/user request and links/IDs where applicable.
- Decision on whether slicing is needed, including “whole ticket is small enough” when appropriate.
- Ordered vertical ticket breakdown with title, AFK/HITL type, blockers, purpose, validation, and risk/learning reduced when slicing is useful.
- Tracker materialization decision: created/updated ticket IDs, proposed tickets awaiting approval, checklist/local-doc decision, comment intentionally not posted when relevant, or no tracker items needed.
- Recommended next slice or next Build ticket ID.
- Acceptance details for the recommended or user-selected next slice.
- Plan progress status: `Done`, `Left`, `Blocked`, `Ready for Specify?`, `Ready for Build?`, and approval state.
- One focused question if the selected next slice or acceptance behavior is materially ambiguous.

