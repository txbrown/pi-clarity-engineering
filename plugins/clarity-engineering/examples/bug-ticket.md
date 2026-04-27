# Bug Ticket Example

## Ticket type
Bug

## Problem
Users see duplicate items after refreshing a paginated list.

## Expected behavior
Refreshing the list replaces existing page data with the latest first page.

## Actual behavior
Refreshing appends the first page to the existing list, creating duplicates.

## Scope
- Reproduce the duplicate-list behavior.
- Fix refresh state handling.
- Add regression coverage.

## Non-goals
- Redesigning pagination.
- Changing page size or sorting behavior.

## Acceptance criteria
- Given a populated paginated list, when the user refreshes, then the list contains the refreshed first page once.
- Given a refresh failure, when an error is returned, then the previous list remains visible and no duplicates are added.

## References
- Pagination state manager.
- Refresh action handler.

## Open questions
- Should refresh reset scroll position?

## Validation
Regression test that fails before the fix and passes after the fix, plus existing pagination checks.
