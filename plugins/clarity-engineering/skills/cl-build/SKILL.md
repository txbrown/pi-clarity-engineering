---
name: cl-build
description: Build already-shaped work TDD-first from a selected slice, clear ticket, bug, technical improvement, or draft PR refinement target.
---

# Clarity Build

Use this skill when work is clear enough to implement.

Build is not limited to one slice from a larger story. Build means **execute already-shaped work with the Clarity Engineering ethos**: preserve intent, keep scope tight, prove behavior, and maintain fast feedback.

## Goal

Implement the next clearly scoped unit of work, prove it with tests or appropriate validation, improve design safely, and keep feedback tight.

Default discipline:

```text
Red → Green → Refactor
```

Useful shorthand:

```text
One behavior → one failing test → minimal code → refactor → next behavior
```

## Inputs

Build can start from any well-known position with enough clarity to act:

- A selected slice from Plan.
- A ticket ID or URL from Linear, Jira, GitHub Issues, local markdown, or another configured tracker.
- A complete small ticket that is already scoped enough to finish safely.
- A shaped Product Feature, Technical Improvement, Bug, Spike follow-up, or Chore/Maintenance ticket.
- A prior Shape/Plan artefact from another session.
- A draft PR or partially implemented branch that needs continued implementation or review-feedback fixes.
- A failing test, current branch, current diff, review comment, model problem, or explicit user request that provides a clear intent source.
- Acceptance details, expected/actual behavior, target state, relevant code paths, constraints, and validation commands.

## Context-aware Build entry

At Build entry, resolve the intent source before writing code:

1. Identify the input kind: ticket ID/URL, issue, current branch, PR, review comment, failing test, model problem, selected slice, or explicit user request.
2. Fetch/read the relevant context using repo setup and available tools. For tickets, read title, description, status, comments, acceptance criteria, links, and current assignee when available.
3. Inspect current branch awareness: `git status`, current branch, commits ahead of base, current diff, and whether the branch or commits imply a ticket key or existing PR.
4. Decide whether this is new work, continuation, bug fix, review-feedback work, or small work.
5. Claim/setup the work according to Setup: move ticket to In Progress, assign to the operator, create/switch branch, and align branch naming when configured and safe/approved.
6. Decide the smallest useful work unit.

At Build entry, decide the smallest useful work unit:

- If the resolved input is clear and small enough, build the whole ticket.
- If the input contains multiple independent units, select the next smallest coherent unit and build that first.
- If the input is a draft PR or existing branch, inspect current state, identify what is already done, then choose the next missing/failing/refinement unit.
- If the input is PR review feedback, fetch/classify comments, build valid actionable fixes TDD-first, and ask only on disputed or product-sensitive comments.
- If the input is a model problem, identify the model, invariant, invalid state, expected behavior, persistence/API impact, migration risk, and test seam before changing code.
- If acceptance behavior or target state is unclear enough that implementation would drift, ask one focused question or route back to Shape/Plan with the reason.

Do not force an artificial slice when the ticket is already small and well-defined. Do not skip slicing when the ticket is too broad to build safely in one pass. For small work without a formal ticket, use the current user request, failing test, or branch/PR goal as the intent source and keep ceremony minimal.

If local validation commands, e2e tools, app launch paths, MCP/tool expectations, branch conventions, or ticket mutation rules are unknown and materially affect Build, use or request Clarity Setup before guessing.

## Uncertainty handling

Before asking the operator, classify uncertainty:

- **discoverable** — inspect ticket comments, docs, code, setup, current branch, PR, tests, or logs before asking;
- **non-blocking assumption** — proceed, state the assumption, and include it in Build output;
- **blocking** — ask one focused question before coding when behavior, scope, or target state would otherwise drift.

Ask for approval before write-capable workflow mutations such as moving external ticket state, assigning tickets, pushing, or changing ticket content unless Setup marks them safe for Build.

## Bug diagnosis path

For bugs and regressions, Build starts by creating a feedback loop before speculating about the fix:

```text
Reproduce → Minimise → Hypothesise → Instrument → Fix → Regression-test → Cleanup
```

Expectations:

- establish the fastest reliable pass/fail signal available: test, script, CLI, e2e/browser flow, replayed trace, log query, or structured manual loop;
- confirm the signal reproduces the user's actual symptom;
- generate falsifiable hypotheses before changing code;
- instrument one variable at a time;
- turn the minimized repro into a regression test when there is a correct seam;
- remove temporary debug instrumentation before Review.

If no useful feedback loop can be built, state what was tried and ask for the missing artifact, access, or approval.

## Operator guidance

Guide the operator through Build as a visible `Red → Green → Refactor` loop, adapted to the work type.

Keep completion state explicit:

- `Done` — intent source resolved, work claimed/setup when configured, scoped work unit selected, failing test or validation target established, implementation completed, checks run, refactor performed while green where applicable.
- `Left` — remaining units in the ticket/PR, test coverage, implementation tasks, refactors, docs, validation commands, or review-feedback items.
- `Blocked` — the single focused question or missing input needed to continue, if any.
- `Ready for Review?` — yes/no, with the reason. Only say yes when the selected work unit or whole ticket is implemented and validation evidence is available or clearly explained. If yes, ask the operator for explicit approval before moving to Review; in Pi use the TUI `ask_user` tool when available.

## Output

- Intent source resolved: ticket/issue/PR/branch/diff/failing test/model problem/user request, plus links/IDs where applicable.
- Claim/setup status: ticket moved/assigned?, branch created/switched?, existing PR found?, and any approval-required actions skipped or requested.
- Build entry classification: selected slice, whole small ticket, bug fix, technical improvement, review-feedback fix, draft PR continuation, small work, model problem, or other clear work unit.
- Current work unit and why it is the right scope.
- First failing behavior test, characterization test, validation target, or explanation if a test-first path is technically impossible.
- Smallest useful implementation.
- Checks run and results, including automated tests, typecheck/lint/build, e2e, and manual QA evidence when relevant.
- Refactor notes while green.
- Files changed and any follow-up needed.
- Build progress status: `Done`, `Left`, `Blocked`, `Ready for Review?`, and approval state.

## Rules

- Do not advance to the next lifecycle stage without explicit operator approval; a direct `cl-build` command may complete all Build responsibilities without asking for conceptual sub-approvals inside Build.
- Build from known or resolvable context when it is sufficient; do not require re-running Shape or Plan just because they happened elsewhere or because the input is a ticket URL/ID.
- Translate acceptance details, expected behavior, bug reproduction, target state, or review feedback into the first failing behavior test or validation target.
- Test public behavior, not private implementation.
- Do not write all tests first and then all implementation; that is horizontal slicing.
- Implement the smallest useful behavior for the selected work unit.
- Run checks continuously.
- Preserve feature boundaries and shaped intent.
- Update docs/references where needed.
- If acceptance behavior is ambiguous, ask one focused question before coding.
