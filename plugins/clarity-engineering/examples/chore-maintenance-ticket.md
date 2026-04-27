# Chore / Maintenance Ticket Example

## Ticket type
Chore / Maintenance

## Problem
The project uses an outdated lint configuration package version.

## Why
Keeping tooling current reduces upgrade drift and avoids known lint rule bugs.

## Scope
- Update the lint configuration package.
- Apply any required config changes.
- Fix or explicitly document new lint findings.

## Non-goals
- Reformatting unrelated files.
- Introducing new lint rule categories beyond the package update.

## Acceptance criteria
- Dependency version is updated.
- Lint command passes.
- Any required config changes are documented in the PR summary.

## References
- Lint package release notes.
- Current lint config.

## Open questions
- Should this be batched with other tooling updates?

## Validation
Task completed and lint checks pass.
