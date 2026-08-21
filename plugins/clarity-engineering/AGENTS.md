# Agent Instructions for Clarity Engineering Plugin

When editing this plugin:

- Keep lifecycle wording exactly `Shape → Plan → Build → Review → Compound` and `Plan = Slice + Specify`.
- Treat `skills/cl-engineering/references/framework-summary.md` as the single normative runtime contract.
- Keep Setup outside the delivery lifecycle.
- Keep skills portable across Claude Code, Codex, and Pi.
- Keep commands, prompts, and Pi extension messages as thin dispatch wrappers; do not duplicate stage policy there.
- Use autonomy with escalation. Do not add mechanical stage-transition approvals.
- Treat completion as a result, not an escalation trigger.
- Require authorization for external/destructive mutation from the current request or repository policy.
- Keep Build responsible for implementation/local validation and Review responsible for findings/confidence; publishing is separate.
- Make session-state and learning artifacts conditional on actual reuse.
- Add prose only when it changes an observable decision or counters a demonstrated failure mode.
- Run `./scripts/validate.sh` after edits.
- Do not introduce company-private examples or absolute runtime dependencies.
