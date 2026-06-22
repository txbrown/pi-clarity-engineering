# Clarity Engineering Shaping Output Paths

Use these defaults when Setup does not define a different local destination.

## Default destinations

| Shape output | Default destination |
| --- | --- |
| Epic | Existing tracker epic/project when that is the local norm; otherwise `docs/brainstorms/` |
| Spike | Existing tracker issue when that is the local norm; otherwise `docs/brainstorms/` |
| Shaped ticket | Existing tracker issue when that is the local norm; otherwise `docs/brainstorms/` |
| RFC | `docs/rfcs/` |
| Improve existing ticket | Update the existing tracker item or return proposed wording; do not create a parallel local artifact unless setup says to |

## Filename suggestions for local markdown

When local markdown is the right shaping surface, use clear dated filenames:

```text
docs/brainstorms/YYYY-MM-DD-<topic>-epic.md
docs/brainstorms/YYYY-MM-DD-<topic>-spike.md
docs/brainstorms/YYYY-MM-DD-<topic>-shaped-ticket.md
docs/rfcs/YYYY-MM-DD-<topic>-rfc.md
```

Keep names descriptive, stable, and easy to grep.

## Selection rules

- Prefer the existing tracker when the repo already runs on tracker-native epics, spikes, or tickets and setup marks mutation as safe.
- Prefer local markdown when shaping is still collaborative, pre-tracker, or when setup says to draft wording first.
- Prefer `docs/rfcs/` for architectural or cross-team decision documents unless the repo has a stronger RFC convention.
- When improving an existing ticket, prefer updating the source of truth rather than creating duplicate artifacts.

## Rule of thumb

Shape should produce the smallest durable artifact that helps the next decision happen in the right place. Do not create both tracker and local markdown copies unless setup explicitly says that is the team workflow.
