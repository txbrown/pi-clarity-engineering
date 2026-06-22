# Clarity Engineering

This plugin packages Clarity Engineering for Claude Code, Codex, and Pi / pi-agent.

Clarity Engineering is a lightweight constitution for agentic software delivery — not a project management checklist. The agent owns execution flow; the framework defines principles and escalation boundaries.

Lifecycle:

```text
Shape → Plan → Build → Review → Compound
```

The lifecycle does not grow extra stages. Instead, each stage operates under an **autonomy with escalation** model: the agent proceeds through safe work without asking, and surfaces only when a genuine escalation trigger fires.

Plan contains two substeps:

```text
Plan = Slice + Specify
```

Setup is available as **Clarity Engineering framework setup/configuration for a codebase**, not as a delivery lifecycle stage or lifecycle mode. It records where tickets live, how stage commands resolve tickets/PRs/branches/diffs/tests, how Plan materializes defined slices/tickets, how Build claims work, where session state and continuous compound entries live, where domain docs/ADRs live, which validation/e2e tools and MCPs are available, how Review publishes PRs, what automation is safe vs requires escalation, where local/global memory lives, what context budget policy applies, and which decisions require human judgement.

Default durable artifact scaffold when setup does not override it:

```text
docs/agents/session-state/
docs/clarity/continuous-compound/
docs/solutions/
docs/adr/
.clarity-engineering/config.local.example.yaml
```

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

Not all work needs the full lifecycle. The agent classifies work at entry:

| Depth | Scope | Treatment |
|---|---|---|
| **Trivial** | Single file, no behaviour change | Fix, done. No ceremony. |
| **Small** | Local change, known boundary | Light Build + drift check. |
| **Medium** | Cross-module, new contracts | Full lifecycle. |
| **Architectural** | New pattern, migration, multi-service | Full lifecycle + ADR consideration. |

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

Each command sends a user message that asks the agent to use the matching skill. The extension shows the active Clarity Engineering state in Pi's footer/status bar. Agents should use status details for context-aware activity such as `resolving MID-123`, `depth: medium`, `drift check`, `publishing PR`, or `compounding`. If `@juanibiapina/pi-powerbar` is installed, Clarity Engineering is emitted as a `cl-engineering` powerbar segment.

Preferred local Pi package install:

```bash
pi install /path/to/clarity-engineering-plugin
```

Manual global install:

```bash
./scripts/install.sh --target pi
```

Then run `/reload` in Pi or restart Pi.

## Shaping templates

Default artifact templates for epic, spike, shaped ticket, RFC, and ticket-improvement outputs live in `plugins/clarity-engineering/docs/shaping-templates.md`. They are fallback scaffolds when Setup has not defined a stronger local shaping style.

Default destinations and naming conventions for those artifacts live in `plugins/clarity-engineering/docs/shaping-output-paths.md`.

## Local config

Use `.clarity-engineering/config.local.yaml` for machine-local defaults such as tracker aliases, review preferences, or local multi-repo paths. Keep shared workflow truth in repo-tracked setup docs. A starter template is shipped at `.clarity-engineering/config.local.example.yaml`.

## Skills

- `cl-engineering` — route delivery work with autonomous escalation.
- `cl-setup` — configure the framework for a codebase: tickets, reference resolution, Plan ticket materialization, Build claim workflow, session state and compounding storage, domain docs, ADRs, validation/e2e tools, MCPs, Review PR publishing, escalation policy, local/global memory, context budgets, and human decision rights.
- `cl-shape` — adapt ambiguous work into the right artifact for the repo: epic, spike, shaped ticket, RFC, or an improved existing ticket. Uses setup-aware shaping norms instead of assuming one company method.
- `cl-plan` — create vertical slices and specify the next slice only when useful; works from shaped tickets, epics, approved RFCs, and resolved spikes, then materializes buildable slices in the tracker when useful and safe.
- `cl-build` — build already-shaped work TDD-first. Classify depth at entry, check for session state and resume, run intent drift detection before committing, compound learnings continuously, update session state. Proceed autonomously; escalate on triggers.
- `cl-review` — work from the existing review surface, usually a draft PR or pushed branch, then validate against shaped intent. Update/create PR context only as needed. Review Build's drift notes. Evidence-aware PR descriptions with scenario-focused `Testing notes`.
- `cl-compound` — curate accumulated continuous compound learnings: promote, refresh, deduplicate, or archive.

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

## Ticket types

## Shaping model

Clarity Shape is intentionally portable. It can borrow ideas from Shape Up, Linear, or local company practice, but Setup should define the local shaping contract. In one repo the right output may be a spike or epic; in another it may be a shaped Jira ticket or RFC.

1. Product Feature — capability outcome; validation: acceptance walkthrough.
2. Technical Improvement — internal quality/value; validation: checks, target state, references.
3. Bug — expected vs actual behavior; validation: regression test.
4. Spike / Research — answer uncertainty; validation: answer/evidence/recommendation/timebox.
5. Chore / Maintenance — routine upkeep; validation: task completed.

## Limitations

This package intentionally does not include built-in ticketing automation, subagents, or MCP servers. Setup may document MCPs/tools that a codebase already uses, including how to fetch tickets, claim work, push branches, and raise PRs, but the plugin does not require or provide those integrations. Skills remain the portable behavior layer; the Pi extension provides native slash-command entrypoints.
