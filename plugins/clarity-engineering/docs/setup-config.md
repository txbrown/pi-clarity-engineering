# Clarity Engineering Setup

Setup discovers only the repository facts current work needs. It should not duplicate active project instructions or inventory every possible tool.

## Minimum facts

```markdown
## Clarity Engineering

- Intent resolution: how tickets, PRs, branches, diffs, and failing tests are read
- Fast validation: smallest reliable check
- Behavior harnesses: integration, UI, or end-to-end commands used by current work
- Required validation: broader merge/release gate, if any
- External mutation: actions pre-authorized by repository policy
- Artifact root: only when durable plans/learnings use a nonstandard location
```

Existing repository instructions, scripts, CI, tracker configuration, and PR templates remain authoritative. Add a Clarity-specific section only when a durable rule is otherwise undiscoverable.

## Authorization

Local reads, edits, branches, targeted checks, and commits are allowed unless project policy says otherwise.

External or destructive actions require either:

- an explicit request for that scoped action; or
- repository policy that pre-authorizes it.

Examples include tracker mutation, push, PR creation/update, comment resolution, merge, release, deployment, and environment/data changes.

## Local config

`.clarity-engineering/config.local.yaml` is optional. Use it only for machine-local values that cannot be shared. Keep it gitignored. Do not hide team workflow rules there.

## No speculative scaffold

Do not create session-state, continuous-compound, solution, ADR, or planning directories during Setup. Create a durable artifact location only when accepted work actually needs it.
