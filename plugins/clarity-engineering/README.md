# Clarity Engineering

Clarity Engineering is a small policy and routing layer for agentic software delivery.

```text
Shape → Plan → Build → Review → Compound
Plan = Slice + Specify
```

Stages are optional entry modes, not gates. Start where the available intent supports safe work.

## Runtime rules

- Keep one canonical intent source.
- Retrieve only current intent, current diff, affected files/tests, and a specific setup fact when needed.
- Match ceremony to risk and reversibility.
- Proceed through safe, authorized work without transition approvals.
- Escalate only for unresolved intent, scope change, meaningful product/architecture/security decisions, approach-challenging validation, or unauthorized external/destructive mutation.
- Treat completion as a result.
- Write continuity or learning artifacts only when they will be reused.

The normative contract lives in `skills/cl-engineering/references/framework-summary.md`. Stage skills contain only their unique behavior. Commands, prompts, and the Pi extension are thin dispatch wrappers.

## Skill ownership

| Skill | Owns |
|---|---|
| `cl-engineering` | Routing to one execution owner |
| `cl-setup` | Minimum intent/validation/mutation/artifact facts |
| `cl-shape` | Intent and boundaries |
| `cl-plan` | Vertical slices and acceptance detail |
| `cl-build` | Implementation and local validation |
| `cl-review` | Findings and confidence decision |
| `cl-compound` | Proven reusable learning |

Publishing is not an implicit Review side effect. Local commits may be created during Build when project policy allows; pushes, PR mutations, merges, and releases require authorization from the current request or repository policy.

## Compound Engineering companion mode

When compatible `ce-*` skills are installed, use Clarity as policy and route to one Compound owner. Do not also load the corresponding local stage skill. The mapping is defined in `cl-engineering/SKILL.md`.

## Pi

The extension registers `/cl-engineering`, `/cl-setup`, `/cl-shape`, `/cl-plan`, `/cl-build`, `/cl-review`, `/cl-compound`, and `/cl-state`. It sets the initial stage and exposes `cl_engineering_state` for Plan Specify, blockers, and clearing the mode.

Install from the repository root:

```bash
pi install /path/to/clarity-engineering-plugin
```

Or manually:

```bash
./scripts/install.sh --target pi
```

## Claude Code

```bash
claude --plugin-dir /path/to/clarity-engineering-plugin/plugins/clarity-engineering
```

## Validation

```bash
./scripts/validate.sh
```
