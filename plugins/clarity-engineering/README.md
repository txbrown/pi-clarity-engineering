# Clarity Engineering

This plugin packages Clarity Engineering for Claude Code, Codex, and Pi / pi-agent.

Lifecycle:

```text
Shape → Plan → Build → Review → Compound
```

The lifecycle does not grow extra stages. Instead, each stage is context-aware: a command can start from a ticket ID/URL, PR, branch, diff, failing test, review comment, model problem, or explicit user request, resolve the relevant intent, perform the natural workflow actions for that stage, and ask only for blocking ambiguity, scope/risk judgement, or approval-required write-capable operations.

Plan contains two substeps:

```text
Plan = Slice + Specify
```

Setup is available as **Clarity Engineering framework setup/configuration for a codebase**, not as a delivery lifecycle stage or lifecycle mode. It records where tickets live, how stage commands resolve tickets/PRs/branches/diffs/tests, how Plan materializes defined slices/tickets, how Build claims work, where domain docs/ADRs live, which validation/e2e tools and MCPs are available, how Review publishes PRs, what automation is safe, where local/global memory lives, what context budget policy applies, and which decisions require human approval.

## Operator approval gates

Agents must not silently advance to the next lifecycle stage. At each transition, summarize what changed and ask for explicit operator approval before continuing:

- Shape → Plan
- Plan `Slice` → Plan `Specify`
- Plan → Build
- Build → Review
- Review → Compound

In Pi, use the TUI `ask_user` tool when available. In other agents, ask an explicit yes/no question and stop until the operator approves or redirects.

## Pi agent extension

Pi support is a first-class extension/package, not just copied skills.

- Extension entrypoint: `extensions/cl-engineering/index.ts`
- Package manifest: root `package.json` declares `pi.extensions`, `pi.skills`, and `pi.prompts`
- Manual install target: `scripts/install.sh --target pi`

The extension registers slash commands using `pi.registerCommand()`:

```text
/cl-engineering help me route this request
/cl-setup configure this repo for Clarity Engineering
/cl-shape shape this idea: ...
/cl-plan plan this ticket: ...
/cl-build build this slice TDD-first: ...
/cl-review review this change against intent: ...
/cl-compound compound the learning from this work: ...
```

Each command sends a user message that asks the agent to use the matching skill. If the agent is busy, the command queues as a follow-up. The extension shows the active Clarity Engineering state in Pi's footer/status bar, and `/cl-state` can show or manually set that state. Agents should use status details for context-aware activity such as `resolving MID-123`, `claimed ticket`, `red test`, `publishing PR`, or `validating`. If `@juanibiapina/pi-powerbar` is installed, Clarity Engineering is emitted as a `cl-engineering` powerbar segment so the state remains visible even though powerbar hides Pi's built-in footer.

Preferred local Pi package install:

```bash
pi install /path/to/clarity-engineering-plugin
```

Manual global install:

```bash
./scripts/install.sh --target pi
```

Then run `/reload` in Pi or restart Pi. When installing everything with `./scripts/install.sh --target all`, the installer keeps Clarity Engineering skills only in Pi's `~/.pi/agent/skills` location and removes duplicate `cl-*` copies from `~/.agents/skills`, because Pi scans both directories and reports skill-name collisions if both contain the same skills.

## Skills

- `cl-engineering` — route delivery work to the right lifecycle mode, or route framework-setup requests to `cl-setup`.
- `cl-setup` — configure the Clarity Engineering framework for a codebase: tickets, reference resolution, Plan ticket materialization, Build claim workflow, domain docs, ADRs, validation/e2e tools, MCPs, Review PR publishing workflow, automation policy, local/global memory, context budgets, and human decision rights.
- `cl-shape` — shape ideas or improve existing tickets into clear intent and supporting artefacts.
- `cl-plan` — create vertical slices and specify the next selected slice only when useful; materialize independently buildable planned slices/tickets in the configured issue tracker when useful and safe/approved; avoid fake slicing for small coherent tickets.
- `cl-build` — build already-shaped or resolvable work TDD-first from a selected slice, ticket ID/URL, complete small ticket, bug, failing test, model problem, technical improvement, prior plan, review comments, draft PR, or existing branch. When given a ticket, resolve it and claim/setup work according to repo Setup.
- `cl-review` — publish completed work by committing, pushing, and raising/updating a PR by default when the repo uses PRs, then validate it against shaped intent with the right mix of AI/human review, tests, builds, PR/code-diff review, manual QA, risk checks, and repository PR-template-aware review notes.
- `cl-compound` — decide whether reusable learning should be codified.

Pi also exposes skills as `/skill:name` commands when Pi skill commands are enabled. Regardless of entrypoint, stage transitions require operator approval before the agent continues.

## Claude Code slash commands

Command files live in `commands/` and wrap the matching skill:

```text
/cl-engineering help me route this request
/cl-setup configure this repo for Clarity Engineering
/cl-shape shape this idea: ...
/cl-plan plan this ticket: ...
/cl-build build this slice TDD-first: ...
/cl-review review this change against intent: ...
/cl-compound compound the learning from this work: ...
```

Run locally with:

```bash
claude --plugin-dir /path/to/clarity-engineering-plugin/plugins/clarity-engineering
```

## Codex and Pi prompts

Prompt files live in `prompts/` and can be copied into `~/.codex/prompts/` or loaded by Pi from package/manual install.

Codex style:

```text
/prompts:cl-plan <ticket or request>
```

Pi prompt templates also become `/cl-*` slash templates. The extension commands are preferred because they work even when prompt-template loading is disabled and they explicitly send the skill-oriented prompt.

## Ticket types

1. Product Feature — capability outcome; validation: acceptance walkthrough.
2. Technical Improvement — internal quality/value; validation: checks, target state, references, cleanup where applicable.
3. Bug — expected vs actual behavior; validation: regression test.
4. Spike / Research — answer uncertainty; validation: answer/evidence/recommendation/timebox.
5. Chore / Maintenance — routine upkeep; validation: task completed.

See `examples/` for generic ticket examples.

## Limitations

This package intentionally does not include subagents, converter infrastructure, MCP servers, hooks, or built-in ticketing automation. Setup may document MCPs/tools that a codebase already uses, including how to fetch tickets, claim work, push branches, and raise PRs, but the plugin does not require or provide those integrations. Skills remain the portable behavior layer; the Pi extension provides native slash-command entrypoints.
