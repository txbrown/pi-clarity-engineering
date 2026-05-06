---
description: Apply Clarity Engineering Build mode
argument-hint: "[slice, ticket, bug, draft PR, acceptance details, or task]"
---

Apply Clarity Engineering Build mode to the input. Resolve the intent source first. Build executes already-shaped work TDD-first from any well-known or resolvable position with enough clarity: a selected slice, ticket ID/URL, complete small ticket, bug, technical improvement, failing test, model problem, prior Shape/Plan artefact, review comments, draft PR, or existing branch. For tickets, fetch context, claim/move In Progress and create/switch branch according to Setup and approval policy. First classify the Build entry, choose the smallest useful work unit, then translate acceptance details, expected behavior, target state, or review feedback into the first failing behavior test or validation target. Implement the smallest useful behavior, run checks, then refactor while green. Ask one focused question only if acceptance behavior, target state, scope, or approval-required workflow mutation is blocking. Include intent source, claim/setup status, Build progress status with `Done`, `Left`, `Blocked`, and `Ready for Review?`.

When Build is ready, ask for explicit operator approval before moving to Review; in Pi use the TUI `ask_user` tool when available.

Input:

$ARGUMENTS
