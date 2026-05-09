# Clarity Engineering Plugin

A portable local plugin/skill pack for applying Ricardo's Clarity Engineering framework consistently across Claude Code, Codex, and Pi / pi-agent.

Clarity Engineering is a lightweight constitution for agentic software delivery — not a project management checklist. The agent owns execution flow; the framework defines principles and escalation boundaries.

Core lifecycle:

```text
Shape → Plan → Build → Review → Compound
```

The lifecycle does not grow extra stages. Instead, each stage operates under an **autonomy with escalation** model: the agent proceeds through safe work without asking, and surfaces only when a genuine escalation trigger fires.

Plan is one lifecycle stage with two substeps:

```text
Plan = Slice + Specify
```

This first pass includes a **real Pi agent package/extension** with skills, commands, prompts, docs, and examples.

It also includes a lightweight **Setup** mode for adapting Clarity Engineering to any codebase without hardcoding one workflow: where tickets live, how stage commands resolve tickets/PRs/branches/diffs/tests, how Plan materializes defined slices/tickets, how Build claims work, where session state and continuous compound entries live, where domain docs/ADRs live, which validation/e2e tools and MCPs are available, how Review publishes PRs, what automation is safe vs requires escalation, and which decisions require human judgement.

## Escalation model

Agents own execution flow. They proceed through stages autonomously and escalate only at genuine triggers. Mechanical stage-transition approvals are replaced by the escalation model.

Escalation triggers — the only reasons to stop and ask:

- **Intent ambiguity** — acceptance criteria don't define behaviour clearly enough.
- **Scope conflict** — implementation would touch systems the ticket didn't scope.
- **Product/UX decision** — multiple valid approaches, choice matters.
- **Architecture risk** — would break invariants or create problematic patterns.
- **Validation challenge** — test fails in a way that challenges the approach.
- **External mutation** — tracker/repo/PR/environment change not pre-authorized.
- **Completion** — work is built, validated, and ready for operator inspection.

## Depth classification

Not all work needs the full lifecycle:

| Depth | Scope | Treatment |
|---|---|---|
| **Trivial** | Single file, no behaviour change | Fix, done. No ceremony. |
| **Small** | Local change, known boundary | Light Build + drift check. |
| **Medium** | Cross-module, new contracts | Full lifecycle. |
| **Architectural** | New pattern, migration, multi-service | Full lifecycle + ADR consideration. |

## Operator approval

For guided multi-stage lifecycle work, operators must explicitly approve before the agent advances from Shape → Plan, Plan Slice → Plan Specify, Plan → Build, Build → Review, and Review → Compound.

In Pi, the preferred approval mechanism is the TUI `ask_user` tool when available. In other agents, the agent must escalate with an explicit question and stop until the operator answers.

## Contents

- `package.json` — Pi package manifest with `pi.extensions`, `pi.skills`, and `pi.prompts` entries.
- `plugins/clarity-engineering/extensions/cl-engineering/index.ts` — Pi extension registering `/cl-*` commands.
- `plugins/clarity-engineering/skills/` — portable Clarity Engineering behavior layer.
- `plugins/clarity-engineering/commands/` — Claude Code slash command wrappers.
- `plugins/clarity-engineering/prompts/` — Codex/Pi-compatible prompt templates.
- `plugins/clarity-engineering/examples/` — generic ticket examples for all five ticket types.
- `plugins/clarity-engineering/docs/setup-config.md` — portable guidance for per-codebase Clarity Engineering setup/configuration.
- `plugins/clarity-engineering/docs/memory-model.md` — local/global memory hierarchy, retrieval policy, context budgets, and learning destinations.
- `scripts/install.sh` — local install helper.
- `scripts/validate.sh` — manifest/frontmatter/lifecycle/Pi-extension validation.

## Context-aware stage examples

```text
/cl-build MID-123
```

Build should resolve the ticket, classify depth, check for session state, move to In Progress according to Setup, build TDD-first, run intent drift detection, compound learnings continuously, and update session state. It proceeds autonomously and escalates only at triggers.

```text
/cl-plan MID-123
```

Plan should resolve the ticket, slice only when useful, and materialize independently buildable slices in the configured issue tracker when useful and safe. Escalate before tracker mutations unless pre-authorized. If small enough, say no child tickets are needed.

```text
/cl-review
```

Review should inspect the current branch/diff, check session state and Build's drift notes, discover an existing PR before creating a duplicate, commit intended changes, push, raise or update a PR by default, include evidence-aware description, then validate against shaped intent.

## Commands, prompts, and skills

| Mode | Purpose |
| --- | --- |
| `cl-engineering` | Route delivery work with autonomous escalation. |
| `cl-setup` | Configure the framework for a codebase: tickets, reference resolution, Plan ticket materialization, Build claim workflow, session state and compounding storage, domain docs, ADRs, validation/e2e tools, MCPs, Review PR publishing, escalation policy, local/global memory, context budgets, and human decision rights. |
| `cl-shape` | Shape fuzzy ideas into tickets and supporting artefacts. |
| `cl-plan` | Plan shaped work. Plan = Slice + Specify. Materialize slices in the tracker when useful and safe. |
| `cl-build` | Build already-shaped work TDD-first. Classify depth, check session state, run intent drift detection, compound learnings continuously, update session state. |
| `cl-review` | Publish PR + validate against shaped intent. Review Build's drift notes. Evidence-aware PR descriptions. |
| `cl-compound` | Curate accumulated continuous compound learnings — promote, refresh, deduplicate, or archive. |

In Pi these are registered as extension commands, so they are slash commands like:

```text
/cl-shape shape this idea: ...
/cl-plan plan this ticket: ...
/cl-review review this diff against the ticket: ...
```

The Pi extension also shows the current Clarity Engineering state in the footer/status bar, for example `🧭 CL: Shape` or `🧭 CL: Build · drift check`. The status is set automatically by `/cl-*` commands, can be updated by the agent through the `cl_engineering_state` tool when it routes work, classifies depth, detects drift, publishes a PR, compounds learnings, or becomes blocked, and can be inspected or adjusted manually with `/cl-state`. When `@juanibiapina/pi-powerbar` is installed, the extension also emits a `cl-engineering` powerbar segment.

## Install

### Pi / pi-agent

Preferred local-package install, modelled after Pi package conventions:

```bash
pi install /path/to/clarity-engineering-plugin
```

This works because `package.json` declares:

```json
{
  "pi": {
    "extensions": ["./plugins/clarity-engineering/extensions/cl-engineering/index.ts"],
    "skills": ["./plugins/clarity-engineering/skills"],
    "prompts": ["./plugins/clarity-engineering/prompts"]
  }
}
```

Manual/global development install:

```bash
./scripts/install.sh --target pi
```

That copies assets into Pi's global agent paths:

```text
~/.pi/agent/extensions/cl-engineering/index.ts
~/.pi/agent/skills/cl-*/SKILL.md
~/.pi/agent/prompts/cl-*.md
~/.pi/agent/cl-engineering/install-manifest.json
```

After installing manually, run `/reload` in Pi or restart Pi. The extension registers these commands:

```text
/cl-engineering
/cl-setup
/cl-shape
/cl-plan
/cl-build
/cl-review
/cl-compound
```

Shared agent skills fallback remains available:

```bash
./scripts/install.sh --target agents
```

### Claude Code

Claude Code can load the local plugin directory directly:

```bash
claude --plugin-dir /path/to/clarity-engineering-plugin/plugins/clarity-engineering
```

### Codex

Install skills and prompts into Codex's local directories:

```bash
./scripts/install.sh --target codex
```

## Validate

```bash
./scripts/validate.sh
```

## Development notes

- Keep lifecycle wording as `Shape → Plan → Build → Review → Compound`.
- Agents own execution flow; escalate only when a trigger fires.
- Classify depth at Build entry and adapt ceremony proportionally.
- Run intent drift checks before committing.
- Compound learnings continuously at the end of every Build.
- Maintain session state per ticket for resume across sessions.
- Treat Review as: Review = Publish PR + Validation + Understanding + Decision.
- Make PR descriptions evidence-aware including drift notes.
- Keep skills portable; Setup configures codebase-specific workflow.
- Treat memory as indexed retrieval, not a context dump.
- Run `./scripts/validate.sh` after edits.
