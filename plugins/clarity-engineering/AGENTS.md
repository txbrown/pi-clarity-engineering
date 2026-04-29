# Agent Instructions for Clarity Engineering Plugin

When editing this plugin:

- Keep the lifecycle wording exactly aligned with `Shape → Plan → Build → Review → Compound`.
- Keep `Plan = Slice + Specify`; Slice and Specify are substeps of Plan, not top-level lifecycle stages.
- Keep skills portable across Claude Code, Codex, and Pi.
- Keep command and prompt files thin wrappers around skills.
- Keep the Pi extension in `extensions/cl-engineering/index.ts` as native slash-command glue around skills; do not duplicate long framework docs there.
- Keep root `package.json` Pi manifest entries (`pi.extensions`, `pi.skills`, `pi.prompts`) in sync with package files.
- Do not add subagents, MCP servers, hooks, converter infrastructure, or ticketing automation in v0.1.
- Ask one focused question when human judgement is needed.
- Do not let skills/prompts advance from Shape → Plan → Build → Review → Compound without explicit operator approval at the transition moment.
- For Pi-specific behavior, prefer the TUI `ask_user` tool for transition approval when available; for portable prompts, require an explicit yes/no question and stop.
- Run `./scripts/validate.sh` after edits.
- Do not introduce company-private examples or absolute runtime dependencies.

Optional local source of truth on Ricardo's machine:

`/Users/ricardo.abreu/Library/Mobile Documents/iCloud~md~obsidian/Documents/ai/Frameworks/Clarity Engineering.md`
