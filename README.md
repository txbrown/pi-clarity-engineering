# Clarity Engineering Plugin

A portable local plugin/skill pack for applying Ricardo's Clarity Engineering framework consistently across Claude Code, Codex, and Pi / pi-agent.

Core lifecycle:

```text
Shape → Plan → Build → Review → Compound
```

Plan is one lifecycle stage with two substeps:

```text
Plan = Slice + Specify
```

This first pass is intentionally minimal but now includes a **real Pi agent package/extension**: skills, Claude Code command wrappers, Codex/Pi prompt files, Pi extension slash commands, install scripts, validation, docs, and examples. It does not include subagents, MCP servers, hooks, Jira/Linear automation, or full converter infrastructure.

It also includes a lightweight **Setup** mode for adapting Clarity Engineering to any codebase without hardcoding one workflow: where tickets live, where domain docs/ADRs live, which validation/e2e tools and MCPs are available, how review/publishing works, and which decisions require human approval.

## Operator approval gates

Clarity Engineering protects human intent by requiring explicit operator approval before crossing lifecycle boundaries. Agents should summarize the completed stage, highlight important changed wording/assumptions/scope/title/intent, and ask whether the operator is ready for the next named stage.

Required approval points:

- Shape → Plan
- Plan `Slice` → Plan `Specify`
- Plan → Build
- Build → Review
- Review → Compound

In Pi, the preferred approval mechanism is the TUI `ask_user` tool when available. In Claude/Codex or other portable contexts, the agent must ask an explicit yes/no question and stop until the operator answers. Compound completes the lifecycle and should not silently start a new follow-up lifecycle.

## Contents

- `package.json` — Pi package manifest with `pi.extensions`, `pi.skills`, and `pi.prompts` entries.
- `plugins/clarity-engineering/extensions/cl-engineering/index.ts` — Pi extension registering `/cl-*` commands.
- `plugins/clarity-engineering/skills/` — portable Clarity Engineering behavior layer.
- `plugins/clarity-engineering/commands/` — Claude Code slash command wrappers.
- `plugins/clarity-engineering/prompts/` — Codex/Pi-compatible prompt templates.
- `plugins/clarity-engineering/examples/` — generic ticket examples for all five ticket types.
- `plugins/clarity-engineering/docs/setup-config.md` — portable guidance for per-codebase Clarity Engineering setup/configuration.
- `scripts/install.sh` — local install helper.
- `scripts/validate.sh` — manifest/frontmatter/lifecycle/Pi-extension validation.

## Commands, prompts, and skills

| Mode | Purpose |
| --- | --- |
| `cl-engineering` | Route delivery work to Shape, Plan, Build, Review, or Compound; route framework-setup requests to `cl-setup`. |
| `cl-setup` | Configure the Clarity Engineering framework for a codebase: tickets, domain docs, ADRs, validation/e2e tools, MCPs, review workflow, and human decision rights. |
| `cl-shape` | Shape fuzzy ideas into tickets and supporting artefacts. |
| `cl-plan` | Plan shaped work. Plan = Slice + Specify. |
| `cl-build` | Build already-shaped work TDD-first from a selected slice, complete small ticket, bug, technical improvement, prior plan, draft PR, or existing branch. |
| `cl-review` | Publish completed work for review, then validate it against shaped intent with the right mix of AI/human review, tests, builds, PR/code-diff review, manual QA, and risk checks. |
| `cl-compound` | Decide whether learning should be codified. |

In Pi these are registered as extension commands, so they are slash commands like:

```text
/cl-shape shape this idea: ...
/cl-plan plan this ticket: ...
/cl-review review this diff against the ticket: ...
```

The Pi extension also shows the current Clarity Engineering state in the footer/status bar, for example `🧭 CL: Shape` or `🧭 CL: Plan: Specify`. The status is set automatically by `/cl-*` commands, can be updated by the agent through the `cl_engineering_state` tool when it routes work or reaches an approval gate, and can be inspected or adjusted manually with `/cl-state`. When `@juanibiapina/pi-powerbar` is installed, the extension also emits a `cl-engineering` powerbar segment because powerbar hides Pi's built-in footer where `ctx.ui.setStatus()` normally appears.

## Install

### Pi / pi-agent

Preferred local-package install, modelled after Pi package conventions:

```bash
pi install /Users/ricardo.abreu/Developer/personal/clarity-engineering-plugin
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

Subagents are not required for v0.1. Future versions may optionally use:

```bash
pi install npm:pi-subagents
pi install npm:pi-ask-user
```

### Claude Code

Claude Code can load the local plugin directory directly:

```bash
claude --plugin-dir /Users/ricardo.abreu/Developer/personal/clarity-engineering-plugin/plugins/clarity-engineering
```

Or print the command with:

```bash
./scripts/install.sh --target claude
```

### Codex

Install skills and prompts into Codex's local directories:

```bash
./scripts/install.sh --target codex
```

Equivalent manual install:

```bash
mkdir -p ~/.codex/skills ~/.codex/prompts
cp -R plugins/clarity-engineering/skills/* ~/.codex/skills/
cp plugins/clarity-engineering/prompts/*.md ~/.codex/prompts/
```

Prompt invocation style:

```text
/prompts:cl-plan <ticket or request>
```

### Install everything

```bash
./scripts/install.sh --target all
```

`all` installs Codex and Pi agent assets, removes Clarity Engineering duplicates from `~/.agents/skills`, then prints Claude Code usage instructions. Pi scans both `~/.pi/agent/skills` and `~/.agents/skills`; keeping the same `cl-*` skill names in both locations causes Pi skill collision warnings. If you need the shared-agent fallback without Pi, run `./scripts/install.sh --target agents` separately.

## Validate

```bash
./scripts/validate.sh
```

Validation checks JSON manifests, package Pi manifest, Pi extension command registration, skill/command/prompt frontmatter, lifecycle consistency, and required framework phrases.

## Development notes

- Keep lifecycle wording as `Shape → Plan → Build → Review → Compound`.
- Treat Setup as Clarity Engineering framework setup/configuration for a codebase, not a delivery lifecycle stage or lifecycle mode.
- Keep `Plan = Slice + Specify`; do not make Slice and Specify top-level lifecycle stages.
- Keep Pi extension commands thin wrappers that send skill-oriented prompts.
- Treat Review as a flexible validation stage: Review = Publish + Validation + Understanding + Decision. On Review entry, normally make completed work reviewable by committing intended changes, pushing the branch, and raising/updating a PR when the repository workflow supports PRs. Then check shaped intent and choose proportional AI/human review, tests, builds, PR/code-diff review, manual QA, release checks, and evidence gathering. Review may reveal refinement loops back to Build, Plan, or Shape.
- When preparing PR text during Review, discover and follow the repository-local PR template if one exists; never hardcode machine-specific template paths in framework instructions.
- Keep skills portable and short enough for use by multiple tools.
- Setup may document available MCPs/tools but should not require one universal toolchain.
- Ask one focused question when human judgement is needed.
- Require explicit operator approval before crossing lifecycle boundaries; use Pi's TUI `ask_user` tool when available.
- Run `./scripts/validate.sh` after edits.
