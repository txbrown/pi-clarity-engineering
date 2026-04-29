# Clarity Engineering

This plugin packages Clarity Engineering for Claude Code, Codex, and Pi / pi-agent.

Lifecycle:

```text
Shape → Plan → Build → Review → Compound
```

Plan contains two substeps:

```text
Plan = Slice + Specify
```

Setup is available as **Clarity Engineering framework setup/configuration for a codebase**, not as a delivery lifecycle stage or lifecycle mode. It records where tickets live, where domain docs/ADRs live, which validation/e2e tools and MCPs are available, how Review publishes work, where local/global memory lives, what context budget policy applies, and which decisions require human approval.

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

Each command sends a user message that asks the agent to use the matching skill. If the agent is busy, the command queues as a follow-up. The extension shows the active Clarity Engineering state in Pi's footer/status bar, and `/cl-state` can show or manually set that state. If `@juanibiapina/pi-powerbar` is installed, Clarity Engineering is emitted as a `cl-engineering` powerbar segment so the state remains visible even though powerbar hides Pi's built-in footer.

Preferred local Pi package install:

```bash
pi install /Users/ricardo.abreu/Developer/personal/clarity-engineering-plugin
```

Manual global install:

```bash
./scripts/install.sh --target pi
```

Then run `/reload` in Pi or restart Pi. When installing everything with `./scripts/install.sh --target all`, the installer keeps Clarity Engineering skills only in Pi's `~/.pi/agent/skills` location and removes duplicate `cl-*` copies from `~/.agents/skills`, because Pi scans both directories and reports skill-name collisions if both contain the same skills.

## Skills

- `cl-engineering` — route delivery work to the right lifecycle mode, or route framework-setup requests to `cl-setup`.
- `cl-setup` — configure the Clarity Engineering framework for a codebase: tickets, domain docs, ADRs, validation/e2e tools, MCPs, review workflow, local/global memory, context budgets, and human decision rights.
- `cl-shape` — shape ideas into tickets and supporting artefacts.
- `cl-plan` — create vertical slices and specify the next selected slice.
- `cl-build` — build already-shaped work TDD-first from a selected slice, complete small ticket, bug, technical improvement, prior plan, draft PR, or existing branch.
- `cl-review` — publish completed work for review, then validate it against shaped intent with the right mix of AI/human review, tests, builds, PR/code-diff review, manual QA, risk checks, and repository PR-template-aware review notes.
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
claude --plugin-dir /Users/ricardo.abreu/Developer/personal/clarity-engineering-plugin/plugins/clarity-engineering
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

This v0.1 package intentionally does not include subagents, converter infrastructure, MCP servers, hooks, or ticketing automation. Setup may document MCPs/tools that a codebase already uses, but the plugin does not require or provide them. Skills remain the portable behavior layer; the Pi extension provides native slash-command entrypoints.
