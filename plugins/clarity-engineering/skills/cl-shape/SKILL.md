---
name: cl-shape
description: Shape fuzzy ideas into clear Clarity Engineering tickets and supporting artefacts before delivery.
---

# Clarity Shape

Use this skill when the idea, problem, or request is fuzzy, strategic, underdefined, or missing a deliverable ticket.

## Goal

Create clarity before delivery by producing shaped tickets and only the supporting artefacts that help humans and AI share context.

## Inputs

- Raw idea, user problem, business request, bug report, improvement request, ticket ID/URL, issue, PR, branch, current diff, failing test, or model problem.
- Optional context, constraints, references, examples, stakeholders, or risks.

## Context-aware Shape entry

At Shape entry, resolve the intent source before creating or rewriting tickets:

1. Identify the input kind: fuzzy idea, ticket ID/URL, issue, PR, branch, diff, failing test, model problem, bug report, or explicit user request.
2. Fetch/read relevant context using repo setup and available tools.
3. If a ticket already exists, inspect whether it is already shaped before reshaping it.
4. Improve or comment on the existing ticket only when useful and safe/approved; otherwise produce suggested wording.
5. Ask one focused human-judgement question only when scope, priority, desired outcome, or product behavior is materially ambiguous and not discoverable.

Shape creates clarity; it should not invent ceremony for a clear existing ticket.

## Output

Produce one or more shaped tickets, or an assessment/update suggestion for an existing ticket. Minimum ticket shape:

- Ticket type: Product Feature, Technical Improvement, Bug, Spike / Research, or Chore / Maintenance.
- Problem.
- Why / outcome.
- Scope and non-goals.
- Acceptance criteria.
- References / notes.
- Open questions.
- Suggested validation style.

Add supporting artefacts only when useful: context summary, options, trade-offs, risks, assumptions, glossary, or setup/config gaps that affect where tickets live, which validation path applies, or which tools/MCPs are safe to use.

Also include Shape progress status and approval state:

- `Done` — intent source resolved, shaped ticket fields completed or existing ticket assessed/improved, and supporting artefacts produced where useful.
- `Left` — missing scope, outcome, acceptance, references, validation style, or stakeholder decisions.
- `Blocked` — the single focused question needed to finish Shape, if any.
- `Ready for Plan?` — yes/no, with the reason. Only say yes when the ticket is clear enough to slice. If yes, ask the operator for explicit approval before moving to Plan; in Pi use the TUI `ask_user` tool when available.

## Human ownership

The human owns scope and priority. If scope, priority, or desired outcome is materially ambiguous, ask one focused question before finalizing. If the answer can be discovered from existing tickets, docs, code, or setup/config, discover it before asking.

## Rules

- Do not advance to the next lifecycle stage without explicit operator approval.

- Deliverable work needs a clear, trackable intent source. A formal ticket is preferred for non-trivial work, but a PR review comment, failing test, explicit user request, branch/PR goal, bug report, or local markdown task can be sufficient for small work.
- Quality comes from unambiguous shaped features, captured as executable agreements.
- Feature can mean application/business capability or a feature-driven architecture boundary.
- Do not plan implementation details unless needed to clarify scope.
- Do not add unnecessary ceremony.

