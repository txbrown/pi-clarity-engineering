# Clarity Engineering Plugin

A portable policy and routing layer for reliable agentic delivery across Claude Code, Codex, and Pi.

```text
Shape → Plan → Build → Review → Compound
Plan = Slice + Specify
```

Clarity Engineering is not a mandatory pipeline. Enter at the first useful point and skip stages that add no information.

## Operating model

Agents proceed through safe, authorized work and escalate only for unresolved intent, scope changes, meaningful product/architecture/security decisions, approach-challenging validation, or unauthorized external/destructive mutation.

There are no mechanical stage-transition approvals. Completion is a result, not an escalation. A direct request for a scoped external action authorizes that action unless repository policy says otherwise.

## Proportional depth

| Depth | Treatment |
|---|---|
| Trivial | Change, targeted check, done |
| Small | Direct Build plus targeted review |
| Medium | Plan when useful, Build, proportional Review |
| Architectural/high-risk | Shape/Plan, explicit decisions, independent Review, ADR only for a real durable trade-off |

Depth may remain internal when it does not affect the operator's decision.

## Ownership

- **Shape** clarifies intent and boundaries.
- **Plan** slices and specifies; tracker mutation is optional.
- **Build** implements, validates locally, and may create local commits when project policy allows.
- **Review** produces findings and a confidence decision.
- **Publish** is a separate, explicitly authorized push/PR/merge/release action.
- **Compound** captures proven reusable learning.

Use one canonical intent source. Do not create a ticket, duplicate plan, routine session file, and learning note for the same small task.

## Using Compound Engineering

When Compound Engineering is installed, Clarity should route to one Compound execution owner instead of running both frameworks:

| Intent | Compound owner |
|---|---|
| Shape | `ce-brainstorm` |
| Decision | `ce-pov` |
| Plan | `ce-plan` |
| Build | `ce-work` |
| Bug | `ce-debug` |
| Review | `ce-code-review` |
| Commit | `ce-commit` |
| Publish | `ce-commit-push-pr` |
| Compound | `ce-compound` |

The local `cl-*` stage skills remain a standalone fallback. Never load both owners for the same work.

## Commands

| Command | Purpose |
|---|---|
| `cl-engineering` | Route to one owner |
| `cl-setup` | Discover minimum repository facts needed now |
| `cl-shape` | Clarify intent and boundaries |
| `cl-plan` | Slice and specify shaped work |
| `cl-build` | Implement with proportional evidence |
| `cl-review` | Review against intent and evidence |
| `cl-compound` | Capture proven reusable learning |

Pi exposes these as `/cl-*` commands and shows the selected stage in the footer. Commands set their initial status deterministically; the model updates it only for Plan Specify, blockers, or clearing the mode.

## Conditional artifacts

- Session state is written only when unfinished work must survive a context boundary.
- Durable learning is written only when novel, reusable, and expensive to rediscover.
- Existing repository instructions, tickets, plans, git history, task trackers, and PRs remain the normal state system.
- `.clarity-engineering/config.local.yaml` is optional and only for machine-local values not already represented by repository conventions.

## Install

### Pi package

```bash
pi install /path/to/clarity-engineering-plugin
```

Manual development install:

```bash
./scripts/install.sh --target pi
```

### Claude Code

```bash
claude --plugin-dir /path/to/clarity-engineering-plugin/plugins/clarity-engineering
```

### Codex

```bash
./scripts/install.sh --target codex
```

### Shared agent skills

```bash
./scripts/install.sh --target agents
```

## Validate

```bash
./scripts/validate.sh
```

Validation checks manifests, skill shape, thin-wrapper parity, contradictory policy wording, character-size safeguards, and the executable eval runner itself.

Run the opt-in behavior eval against an isolated fixture with the configured Pi model:

```bash
npm run eval
# Optional: npm run eval -- --model openai-codex/gpt-5.6-sol:low --json
```

The runner scores the final harness outcome, relevant checks, fail-to-pass self-correction, changed files, and scope preservation. `npm run validate` uses `eval:smoke` logic only and never calls a model.

Behavior evals execute a trusted model with the invoking user's local tool permissions. Run them inside an OS/container sandbox when evaluating untrusted models or fixtures.
