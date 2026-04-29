---
description: Apply Clarity Engineering router
argument-hint: "[request, ticket, plan, diff, or context]"
---

Apply the Clarity Engineering router to the input. Route delivery work to Shape, Plan, Build, Review, or Compound. If the request is about configuring how Clarity Engineering should work in this codebase, route it to `cl-setup`. Setup is Clarity Engineering framework setup/configuration for a codebase — tickets, domain docs, validation/e2e tools, MCPs, review workflow, and human decision rights — not a delivery lifecycle stage or lifecycle mode. If the route is ambiguous and materially changes the answer, ask one focused question. Otherwise produce the mode-specific output, including operator progress status with `Done`, `Left`, `Blocked`, and readiness for the next stage.

Before advancing to another lifecycle stage, request explicit operator approval; in Pi use the TUI `ask_user` tool when available.

Input:

$ARGUMENTS
