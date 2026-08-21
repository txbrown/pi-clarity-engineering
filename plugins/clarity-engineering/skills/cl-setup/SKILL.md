---
name: cl-setup
description: "Discover the minimum repository facts Clarity Engineering needs: intent resolution, validation, mutation authority, and optional artifact location."
---

# Clarity Setup

Setup is an on-demand capability check, not a lifecycle stage and not a repository documentation project.

Prefer conventions already present in active project instructions, scripts, CI, tracker configuration, and PR templates. Do not duplicate them into Clarity-specific files.

## Discover

Capture only facts needed by current work:

1. **Intent resolution** — how tickets, PRs, branches, diffs, and failing tests are identified and read.
2. **Validation** — the fastest reliable check, the integration, UI, or end-to-end harness needed by current work, and any required broader gate.
3. **Mutation authority** — which tracker, branch, PR, merge, release, or environment actions are pre-authorized.
4. **Artifact root** — only when the repository uses durable plans or learnings outside existing conventions.

Ask one focused question only when a required fact cannot be discovered.

## Defaults

- Local reads, edits, branches, targeted checks, and commits are allowed unless project policy says otherwise.
- External or destructive mutation requires authorization from the current request or project policy.
- A direct request to perform a scoped external action is authorization for that action.
- Use the repository's existing ticket, plan, task, git, and PR surfaces as state.
- Do not create session-state, continuous-compound, solution, or ADR directories speculatively.
- Do not enumerate every installed tool or MCP; discover a capability when work needs it.
- Do not store approximate token budgets in repository config. Enforce narrow reads operationally.

## Persistence

Write setup only when a discovered rule will help future sessions and is not already documented. Prefer a short update to the repository's active instructions. Use `.clarity-engineering/config.local.yaml` only for machine-local values that cannot be shared.

## Output

Return the discovered facts, any single blocker, and whether current work can proceed. Create no artifact when existing repository conventions are sufficient.
