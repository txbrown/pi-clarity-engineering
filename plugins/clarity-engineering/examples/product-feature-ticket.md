# Product Feature Ticket Example

## Ticket type
Product Feature

## Problem
Users cannot save a reusable filter for a frequently repeated search.

## Why
Saving filters reduces repeated setup and helps users return to meaningful results faster.

## Scope
- Add the ability to save the current filter set with a name.
- Show saved filters in a selectable list.
- Allow applying a saved filter.

## Non-goals
- Sharing filters between users.
- Complex foldering or permissions.

## Acceptance criteria
- Given active filters, when the user saves them with a valid name, then the saved filter appears in the saved filter list.
- Given a saved filter, when the user selects it, then the saved criteria are applied to the search.
- Given an empty name, when the user attempts to save, then a clear validation message is shown.

## References
- Existing search filter UI.
- Product note: users repeat the same search setup daily.

## Open questions
- Maximum number of saved filters per user?

## Validation
Acceptance walkthrough covering save, list, apply, and validation message behavior.
