---
title: Implement Clarity Engineering Commands and Multi-Tool Plugin Support
type: feat
status: active
date: 2026-04-27
target_repo: /Users/ricardo.abreu/Developer/personal/clarity-engineering-plugin
---

# Implement Clarity Engineering Commands and Multi-Tool Plugin Support

## Overview

Turn the current minimal Clarity Engineering skill pack into a more complete local plugin/command package that can be used consistently across:

- Claude Code
- Codex
- Pi / pi-agent

The current plugin already exists at:

```text
/Users/ricardo.abreu/Developer/personal/clarity-engineering-plugin
```

It currently contains native Claude/Codex plugin manifests and six skills:

```text
plugins/clarity-engineering/
  .claude-plugin/plugin.json
  .codex-plugin/plugin.json
  AGENTS.md
  CLAUDE.md
  README.md
  skills/
    cl-engineering/SKILL.md
    cl-shape/SKILL.md
    cl-plan/SKILL.md
    cl-build/SKILL.md
    cl-review/SKILL.md
    cl-compound/SKILL.md
```

This plan adds slash-command/prompt entrypoints, install scripts, validation, and documentation so another LLM or developer can execute the implementation cleanly.

## Framework Source of Truth

Obsidian vault:

```text
/Users/ricardo.abreu/Library/Mobile Documents/iCloud~md~obsidian/Documents/ai
```

Relevant framework notes:

```text
Frameworks/Clarity Engineering.md
Frameworks/Clarity Engineering Principles.md
Frameworks/Clarity Engineering Lifecycle.md
Frameworks/Clarity Engineering Artifact System.md
Frameworks/Clarity Engineering Ticket Taxonomy.md
Frameworks/Clarity Checks.md
Frameworks/Applying Clarity Engineering with AI.md
```

## Core Framework Constraints

Use this lifecycle everywhere:

```text
Shape → Plan → Build → Review → Compound
```

Plan contains:

```text
Plan = Slice + Specify
```

Do **not** reintroduce the old six-stage lifecycle wording where Slice and Specify are top-level stages. The lifecycle must remain `Shape → Plan → Build → Review → Compound`, with `Plan = Slice + Specify`.

Principles:

1. Quality comes from unambiguous shaped features, captured as executable agreements.
2. Slice vertically around meaningful capability.
3. Test behavior first.
4. Types and states make intent explicit.
5. Feature boundaries enable safe composition.
6. Delight is part of done.
7. Humans and AI share the same context.
8. Compound the learning.

Ticket types:

1. Product Feature
2. Technical Improvement
3. Bug
4. Spike / Research
5. Chore / Maintenance

Important semantics:

- Ticket is mandatory for deliverable work.
- Feature means both application/business capability and feature-driven architecture boundary.
- Build is TDD-first.
- Review checks correctness against shaped intent first.
- Compound is decision-based.
- Clarity Checks are lightweight lifecycle questions, not process gates.

## Scope

### In scope

- Add Claude Code slash commands.
- Add Codex prompt files.
- Add Pi prompt files or documented Pi prompt install fallback.
- Add install scripts for Claude/Codex/Pi local development.
- Add validation script.
- Add command documentation.
- Add optional examples/reference files that make skills easier to use.
- Keep the plugin portable and minimal.

### Out of scope for this pass

- Publishing to a public marketplace.
- Building full converter infrastructure like `compound-engineering-plugin`.
- Adding subagents.
- Adding MCP servers.
- Adding hooks.
- Automating Jira/Linear creation.
- Changing the Clarity Engineering framework itself unless the plugin reveals a small wording bug.

## Desired Final Structure

Target structure after implementation:

```text
clarity-engineering-plugin/
  README.md
  IMPLEMENTATION_PLAN.md
  scripts/
    install.sh
    validate.sh
  plugins/
    cl-engineering/
      README.md
      AGENTS.md
      CLAUDE.md
      .claude-plugin/
        plugin.json
      .codex-plugin/
        plugin.json
      commands/
        cl-engineering.md
        cl-shape.md
        cl-plan.md
        cl-build.md
        cl-review.md
        cl-compound.md
      prompts/
        cl-engineering.md
        cl-shape.md
        cl-plan.md
        cl-build.md
        cl-review.md
        cl-compound.md
      skills/
        cl-engineering/
          SKILL.md
          references/
            framework-summary.md
        cl-shape/
          SKILL.md
        cl-plan/
          SKILL.md
        cl-build/
          SKILL.md
        cl-review/
          SKILL.md
        cl-compound/
          SKILL.md
      examples/
        product-feature-ticket.md
        technical-improvement-ticket.md
        bug-ticket.md
        spike-research-ticket.md
        chore-maintenance-ticket.md
```

Notes:

- `commands/` is for Claude Code plugin slash commands.
- `prompts/` is a source directory for Codex/Pi prompt installation; Codex expects `~/.codex/prompts/` for custom prompts, while Pi prompt support may vary by installation. Keep prompt files portable markdown.
- Skills remain the primary portable behavior layer.

---

## Implementation Units

### U1. Add shared framework reference to plugin skills

**Goal:** Ensure every skill has access to a concise local source of truth without relying on absolute Obsidian paths.

**Files:**

- Create: `plugins/clarity-engineering/skills/cl-engineering/references/framework-summary.md`
- Optional create/copy into each skill if needed: `plugins/clarity-engineering/skills/*/references/framework-summary.md`

**Approach:**

- Use the existing shared skill reference at:
  - `/Users/ricardo.abreu/.agents/skills/cl-engineering/references/framework-summary.md`
- Copy/adapt it into the plugin.
- Keep it short and portable.
- Mention the Obsidian vault path only as optional local source-of-truth for Ricardo's machine, not as a required runtime dependency.

**Acceptance criteria:**

- [ ] `framework-summary.md` exists inside plugin skills.
- [ ] It includes lifecycle `Shape → Plan → Build → Review → Compound`.
- [ ] It includes `Plan = Slice + Specify`.
- [ ] It includes the eight principles.
- [ ] It includes the five ticket types.
- [ ] It does not include old lifecycle wording.

**Validation:**

- Run `scripts/validate.sh` after U7 exists, or manually grep for old lifecycle wording.

---

### U2. Add Claude Code slash commands

**Goal:** Make Clarity Engineering easy to invoke in Claude Code with slash commands, not only skills.

**Files:**

- Create: `plugins/clarity-engineering/commands/cl-engineering.md`
- Create: `plugins/clarity-engineering/commands/cl-shape.md`
- Create: `plugins/clarity-engineering/commands/cl-plan.md`
- Create: `plugins/clarity-engineering/commands/cl-build.md`
- Create: `plugins/clarity-engineering/commands/cl-review.md`
- Create: `plugins/clarity-engineering/commands/cl-compound.md`
- Modify: `plugins/clarity-engineering/.claude-plugin/plugin.json`

**Approach:**

Each command should be a thin wrapper around the matching skill. Keep command files short and explicit.

Recommended command frontmatter:

```yaml
---
description: Apply Clarity Engineering [mode]
argument-hint: "[request, ticket, plan, diff, or context]"
---
```

Command body pattern:

```markdown
Use the `clarity-[mode]` skill to process the following input:

<input>
$ARGUMENTS
</input>

Follow Clarity Engineering. Ask one focused question when human judgement is needed.
```

Manifest update:

```json
{
  "commands": "./commands/",
  "skills": "./skills/"
}
```

**Acceptance criteria:**

- [ ] Claude command files exist.
- [ ] `.claude-plugin/plugin.json` references `./commands/` and `./skills/`.
- [ ] Commands use `Shape → Plan → Build → Review → Compound` where lifecycle is mentioned.
- [ ] `cl-plan` command clearly says `Plan = Slice + Specify`.
- [ ] Commands are wrappers, not duplicate long framework documents.

**Validation:**

- JSON parse manifest.
- Grep for command files.
- Optional manual test:

```bash
claude --plugin-dir /Users/ricardo.abreu/Developer/personal/clarity-engineering-plugin/plugins/clarity-engineering
```

Then try:

```text
/cl-shape shape this idea: ...
/cl-plan plan this ticket: ...
```

---

### U3. Add Codex prompt files

**Goal:** Make Clarity Engineering invokable in Codex via custom prompts as well as skills.

**Files:**

- Create: `plugins/clarity-engineering/prompts/cl-engineering.md`
- Create: `plugins/clarity-engineering/prompts/cl-shape.md`
- Create: `plugins/clarity-engineering/prompts/cl-plan.md`
- Create: `plugins/clarity-engineering/prompts/cl-build.md`
- Create: `plugins/clarity-engineering/prompts/cl-review.md`
- Create: `plugins/clarity-engineering/prompts/cl-compound.md`
- Optional modify: `plugins/clarity-engineering/.codex-plugin/plugin.json` if native plugin prompt support is available. If not, document manual prompt install.

**Approach:**

Codex prompts live in `~/.codex/prompts/` and are invoked as `/prompts:<name>`.

Prompt frontmatter supports:

```yaml
---
description: Apply Clarity Engineering [mode]
argument-hint: "[input]"
---
```

Prompt body should instruct Codex to use the matching skill if available, or follow the embedded concise rules.

Example:

```markdown
Apply Clarity Engineering Plan mode to:

$ARGUMENTS

Plan = Slice + Specify.

First create an ordered vertical ticket breakdown. Then clarify acceptance details for the selected next slice. Do not define the first failing test; Build translates acceptance details into tests.
```

**Acceptance criteria:**

- [ ] Prompt files exist.
- [ ] Prompt frontmatter includes `description` and `argument-hint`.
- [ ] `cl-plan` prompt includes `Plan = Slice + Specify`.
- [ ] README documents installing prompts to `~/.codex/prompts/`.

**Validation:**

```bash
mkdir -p ~/.codex/prompts
cp plugins/clarity-engineering/prompts/*.md ~/.codex/prompts/
```

Then in Codex, expected invocation style:

```text
/prompts:cl-plan <ticket or request>
```

---

### U4. Add Pi prompt support / fallback documentation

**Goal:** Make Clarity Engineering convenient in Pi / pi-agent.

**Files:**

- Use `plugins/clarity-engineering/prompts/*.md` from U3.
- Modify: `README.md`
- Modify: `plugins/clarity-engineering/README.md`

**Approach:**

Pi skill/prompt discovery can vary by local setup. Support both:

1. Skills copied to `~/.pi/skills` or `~/.agents/skills`.
2. Prompt files copied to `~/.pi/prompts` if supported by local Pi installation.

Document:

```bash
mkdir -p ~/.pi/skills
cp -R plugins/clarity-engineering/skills/* ~/.pi/skills/

mkdir -p ~/.pi/prompts
cp plugins/clarity-engineering/prompts/*.md ~/.pi/prompts/
```

Also document shared fallback:

```bash
mkdir -p ~/.agents/skills
cp -R plugins/clarity-engineering/skills/* ~/.agents/skills/
```

Do not require `pi-subagents` yet because this plugin does not dispatch subagents in v0.1.

Mention future optional prerequisites:

```bash
pi install npm:pi-subagents
pi install npm:pi-ask-user
```

**Acceptance criteria:**

- [ ] README documents Pi skill install.
- [ ] README documents Pi prompt install if supported.
- [ ] README states subagents are not required in v0.1.
- [ ] README notes future optional `pi-subagents` / `pi-ask-user`.

**Validation:**

Manual check after install:

```bash
find ~/.pi/skills -maxdepth 2 -name SKILL.md | grep clarity
find ~/.pi/prompts -maxdepth 1 -name 'clarity-*.md'
```

---

### U5. Improve skill files for command/prompt handoff

**Goal:** Make the six skills robust enough to be invoked directly or through wrapper commands/prompts.

**Files:**

- Modify: `plugins/clarity-engineering/skills/cl-engineering/SKILL.md`
- Modify: `plugins/clarity-engineering/skills/cl-shape/SKILL.md`
- Modify: `plugins/clarity-engineering/skills/cl-plan/SKILL.md`
- Modify: `plugins/clarity-engineering/skills/cl-build/SKILL.md`
- Modify: `plugins/clarity-engineering/skills/cl-review/SKILL.md`
- Modify: `plugins/clarity-engineering/skills/cl-compound/SKILL.md`

**Approach:**

Review each skill for:

- clear trigger/use cases;
- clear inputs;
- clear outputs;
- one-question-at-a-time rule;
- lifecycle consistency;
- no unnecessary ceremony;
- no old lifecycle wording.

Expected skill-specific improvements:

#### cl-engineering

- Route user request to Shape, Plan, Build, Review, or Compound.
- If ambiguous, ask one focused routing question.

#### cl-shape

- Make clear output is tickets plus supporting artefacts.
- Minimum shaped ticket: problem, why, scope, acceptance criteria, references, open questions.
- Human owns scope/priority.

#### cl-plan

- Plan = Slice + Specify.
- Output ordered ticket breakdown plus acceptance details for selected next slice.
- Do not define first failing test.

#### cl-build

- TDD-first.
- Translate acceptance details into first failing behavior test.
- Red → Green → Refactor.

#### cl-review

- Review correctness against shaped intent first.
- Output approve/request-changes/blocked/rescope.

#### cl-compound

- Always output compounding decision.
- Codify learning only if useful.

**Acceptance criteria:**

- [ ] All skills have valid frontmatter.
- [ ] All skills have clear output sections.
- [ ] `cl-plan` contains `Plan = Slice + Specify`.
- [ ] No skill contains old lifecycle wording.

**Validation:**

Handled by `scripts/validate.sh` in U7.

---

### U6. Add example ticket files

**Goal:** Give future users and AI agents concrete examples for the five ticket types.

**Files:**

- Create: `plugins/clarity-engineering/examples/product-feature-ticket.md`
- Create: `plugins/clarity-engineering/examples/technical-improvement-ticket.md`
- Create: `plugins/clarity-engineering/examples/bug-ticket.md`
- Create: `plugins/clarity-engineering/examples/spike-research-ticket.md`
- Create: `plugins/clarity-engineering/examples/chore-maintenance-ticket.md`

**Approach:**

Each example should be short and generic. Do not include private company-specific details.

Each example should include:

- ticket type;
- problem / why;
- scope;
- acceptance criteria;
- references;
- open questions;
- validation.

Validation style per type:

- Product Feature: acceptance walkthrough.
- Technical Improvement: checks, target state, references, cleanup where applicable.
- Bug: regression test.
- Spike / Research: answer/evidence/recommendation/timebox.
- Chore / Maintenance: task completed.

**Acceptance criteria:**

- [ ] Five example files exist.
- [ ] Each example demonstrates its ticket type's validation style.
- [ ] Examples remain generic and safe to share.

---

### U7. Add validation script

**Goal:** Provide a simple repeatable validation command for manifests, skill frontmatter, command/prompt frontmatter, and lifecycle consistency.

**Files:**

- Create: `scripts/validate.sh`

**Approach:**

Implement in shell with embedded Python for JSON/frontmatter checks.

Validation should check:

1. Claude plugin manifest JSON parses.
2. Codex plugin manifest JSON parses.
3. Every `skills/*/SKILL.md` has YAML frontmatter with `name:` and `description:`.
4. Every `commands/*.md` has frontmatter with `description:`.
5. Every `prompts/*.md` has frontmatter with `description:`.
6. No file contains the old six-stage lifecycle wording where Slice and Specify appear as top-level lifecycle stages.

7. At least one file contains:

```text
Shape → Plan → Build → Review → Compound
```

8. At least one file contains:

```text
Plan = Slice + Specify
```

Example script shape:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

python3 - <<'PY'
import json, pathlib, sys
root = pathlib.Path('.')
for p in [
    root/'plugins/clarity-engineering/.claude-plugin/plugin.json',
    root/'plugins/clarity-engineering/.codex-plugin/plugin.json',
]:
    json.loads(p.read_text())
    print(f'valid json: {p}')

old_parts = ['Shape →', 'Slice → Specify → Build']
new = 'Shape → Plan → Build → Review → Compound'
plan = 'Plan = Slice + Specify'
all_text = ''
for p in root.rglob('*'):
    if p.is_file() and p.suffix in {'.md', '.json'}:
        text = p.read_text(errors='ignore')
        all_text += text + '\n'
        if all(part in text for part in old_parts):
            raise SystemExit(f'old lifecycle wording found: {p}')

if new not in all_text:
    raise SystemExit('new lifecycle wording missing')
if plan not in all_text:
    raise SystemExit('Plan = Slice + Specify missing')

for p in (root/'plugins/clarity-engineering/skills').glob('*/SKILL.md'):
    text = p.read_text()
    if not text.startswith('---'):
        raise SystemExit(f'missing frontmatter: {p}')
    fm = text.split('---', 2)[1]
    if 'name:' not in fm or 'description:' not in fm:
        raise SystemExit(f'missing name/description: {p}')
    print(f'valid skill: {p}')
PY
```

**Acceptance criteria:**

- [ ] `scripts/validate.sh` exists and is executable.
- [ ] Running `./scripts/validate.sh` exits 0.
- [ ] Script fails if old lifecycle wording is introduced.

---

### U8. Add install script

**Goal:** Make it easy to install the local plugin assets for Claude/Codex/Pi development.

**Files:**

- Create: `scripts/install.sh`
- Modify: `README.md`

**Approach:**

Script interface:

```bash
./scripts/install.sh --target codex
./scripts/install.sh --target pi
./scripts/install.sh --target agents
./scripts/install.sh --target all
```

Optional Claude target should print instructions rather than copying because Claude Code can use `--plugin-dir` directly:

```bash
./scripts/install.sh --target claude
```

Expected behavior:

- `codex`: copy skills to `~/.codex/skills`, prompts to `~/.codex/prompts`.
- `pi`: copy skills to `~/.pi/skills`, prompts to `~/.pi/prompts`.
- `agents`: copy skills to `~/.agents/skills`.
- `all`: run codex + pi + agents.
- `claude`: print `claude --plugin-dir ...` command.

Use `rsync` or `cp -R`. Avoid deleting unrelated user files.

Example:

```bash
#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PLUGIN="$ROOT/plugins/clarity-engineering"
TARGET="${2:-}"

# parse --target ...
```

**Acceptance criteria:**

- [ ] `scripts/install.sh` exists and is executable.
- [ ] `./scripts/install.sh --target codex` copies skills/prompts.
- [ ] `./scripts/install.sh --target pi` copies skills/prompts.
- [ ] `./scripts/install.sh --target agents` copies skills.
- [ ] `./scripts/install.sh --target claude` prints local plugin command.
- [ ] `./scripts/install.sh --target all` runs all copy targets except Claude print-only or includes it as informational.
- [ ] Script never deletes unrelated files.

---

### U9. Update documentation

**Goal:** Make the plugin understandable and handoff-ready.

**Files:**

- Modify: `README.md`
- Modify: `plugins/clarity-engineering/README.md`
- Modify: `plugins/clarity-engineering/AGENTS.md`
- Modify: `plugins/clarity-engineering/CLAUDE.md` only if needed; currently can remain `@AGENTS.md`.

**Approach:**

Root README should include:

- what the plugin is;
- lifecycle;
- commands/skills list;
- install instructions for Claude Code, Codex, Pi;
- validation command;
- development notes;
- limitations.

Plugin README should include:

- lifecycle;
- skill list;
- command list;
- prompt list;
- usage examples.

AGENTS.md should include concise instructions for agents operating inside the plugin source:

- keep lifecycle wording current;
- keep skills portable;
- no subagents in v0.1;
- run validation after edits;
- no old lifecycle wording.

**Acceptance criteria:**

- [ ] Root README has install instructions for all three targets.
- [ ] Plugin README has command and skill examples.
- [ ] AGENTS.md has development constraints.
- [ ] Docs mention that first pass is minimal and does not include subagents/converter infrastructure.

---

### U10. Smoke test installed assets

**Goal:** Verify the plugin can be installed locally and discovered in expected locations.

**Files:**

- No new files required, unless adding `docs/smoke-test.md` is useful.

**Approach:**

Run:

```bash
cd /Users/ricardo.abreu/Developer/personal/clarity-engineering-plugin
./scripts/validate.sh
./scripts/install.sh --target codex
./scripts/install.sh --target pi
./scripts/install.sh --target agents
```

Then verify:

```bash
find ~/.codex/skills -maxdepth 2 -name SKILL.md | grep clarity
find ~/.codex/prompts -maxdepth 1 -name 'clarity-*.md'
find ~/.pi/skills -maxdepth 2 -name SKILL.md | grep clarity
find ~/.pi/prompts -maxdepth 1 -name 'clarity-*.md'
find ~/.agents/skills -maxdepth 2 -name SKILL.md | grep clarity
```

For Claude Code, do not run an interactive session unless desired. At minimum verify plugin manifest and command files.

Optional manual test:

```bash
claude --plugin-dir /Users/ricardo.abreu/Developer/personal/clarity-engineering-plugin/plugins/clarity-engineering
```

Try:

```text
/cl-engineering help me route this request
/cl-shape shape this idea
/cl-plan plan this ticket
```

**Acceptance criteria:**

- [ ] Validation passes.
- [ ] Install script copies expected files.
- [ ] No old lifecycle wording appears.
- [ ] README commands match actual behavior.

---

## Risks and Notes

| Risk | Mitigation |
|---|---|
| Claude Code plugin command discovery differs from assumption | Follow Claude plugin spec: commands at plugin root under `commands/`, manifest references `./commands/`. Keep skills usable even if commands need adjustment. |
| Codex native plugin support varies | Provide manual `~/.codex/skills` and `~/.codex/prompts` install fallback. |
| Pi prompt/skill paths vary | Provide both `~/.pi/*` and `~/.agents/skills` fallback. Keep skills as primary behavior layer. |
| Overbuilding too early | Do not add subagents/converter infra in this pass. |
| Framework wording drifts | `scripts/validate.sh` checks lifecycle wording. |

## Final Handoff Summary Expected From Implementer

When complete, report:

1. Files created/modified.
2. Validation command output.
3. Install commands tested.
4. Any manual testing performed.
5. Remaining gaps or recommendations.

## Quick Start for Implementer

```bash
cd /Users/ricardo.abreu/Developer/personal/clarity-engineering-plugin
find . -maxdepth 5 -type f | sort
```

Then implement U1 through U10 in order.
