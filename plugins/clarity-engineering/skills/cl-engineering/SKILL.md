---
name: cl-engineering
description: Route work using Clarity Engineering's lightweight policy across Shape, Plan, Build, Review, and Compound.
---

# Clarity Engineering Router

Clarity Engineering is a policy and routing layer, not a second execution pipeline.

```text
Shape → Plan → Build → Review → Compound
Plan = Slice + Specify
```

Enter at the first useful point and skip stages that add no information.

## Route

Resolve the current intent source, then choose exactly one owner:

- fuzzy feature, unclear outcome, or missing boundaries → Shape;
- adoption or architecture verdict → a decision workflow;
- shaped multi-step work needing slices or acceptance detail → Plan;
- clear implementation request → Build;
- open-ended bug or regression → a diagnosis-capable Build workflow;
- diff, branch, or PR needing findings → Review;
- commit-only request → Build or a commit workflow;
- explicit push/PR/merge/release request → publishing workflow;
- proven reusable learning → Compound.

When Compound Engineering skills are installed, prefer the single matching execution owner instead of running both frameworks:

| Clarity intent | Compound owner | Standalone owner |
|---|---|---|
| Shape | `ce-brainstorm` | `cl-shape` |
| Decision | `ce-pov` | `cl-shape` using an RFC/decision artifact |
| Plan | `ce-plan` | `cl-plan` |
| Build | `ce-work` | `cl-build` |
| Bug | `ce-debug` | `cl-build` diagnosis path |
| Review | `ce-code-review` | `cl-review` |
| Commit | `ce-commit` | `cl-build` under project commit policy |
| Publish | `ce-commit-push-pr` | repository-native publishing after `cl-review` |
| Compound | `ce-compound` | `cl-compound` |

Never load both owners for the same work.

## Context rule

Read only what the selected owner needs:

1. current request/ticket/PR/test;
2. current branch or diff when relevant;
3. directly affected files and tests;
4. project setup or memory only for a specific unresolved fact.

Do not replay earlier stages when the intent is already sufficient.

## Escalation

Proceed through safe, authorized work. Ask one focused question only for unresolved intent, scope change, meaningful product/architecture/security choice, approach-challenging validation, or unauthorized external/destructive mutation.

Completion is not an escalation. The current request authorizes external actions it explicitly asks for, subject to repository policy.

## Output

Return the selected owner and result. Include validation evidence and a blocker or next action only when applicable. Avoid routine `Done / Left / Blocked` scaffolding when there is only a completed result.

Use `references/framework-summary.md` only when the full policy is needed.
