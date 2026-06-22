# Clarity Engineering Shaping Templates

Use these as lightweight defaults when Setup does not define a stronger local shape contract.

Choose the smallest artifact that makes the work executable.

## Epic template

```markdown
# <Epic title>

## Goal
- What outcome should this epic achieve?
- Why now?

## Context
- Intent source:
- Requester / beneficiary:
- Strategy / initiative / parent project:

## Boundaries
- In:
- Out:
- Stop line:

## Workstreams / likely child slices
- <theme or child ticket idea>
- <theme or child ticket idea>

## Dependencies and risks
- Dependencies:
- Risks / rabbit holes:

## Next step
- Shape child ticket / run spike / write RFC / move to Plan
```

## Spike template

```markdown
# <Spike title>

## Question to answer
- What uncertainty must be resolved?

## Why this matters
- What delivery decision depends on the answer?

## Boundaries
- In:
- Out:
- Stop line:

## Expected output
- Recommendation / benchmark / prototype / decision memo / other:

## Timebox or effort hint
- <optional>

## Success criteria
- We will consider the spike successful when:

## Next step
- Feed result into Plan / Shape / RFC / delivery ticket
```

## Shaped ticket template

```markdown
# <Ticket title>

## Goal
- Problem statement or user story:
- Desired outcome:
- Why now:

## Boundaries
- In:
- Out:
- Stop line:

## Acceptance criteria
- [ ]
- [ ]
- [ ]

## Context / dependencies
- Only include what helps execution.

## Next step
- Ready for Plan? yes/no
- Ready for Build? yes/no
```

## RFC template

```markdown
# <RFC title>

## Problem
- What problem or decision is this RFC addressing?

## Context
- Intent source:
- Constraints:
- Existing system / relevant background:

## Boundaries
- In:
- Out:
- Stop line:

## Options considered
1. <Option A>
2. <Option B>
3. <Option C>

## Recommended direction
- Chosen approach:
- Why this direction:

## Trade-offs
- Benefits:
- Costs / risks:

## Rollout / migration
- Dependencies:
- Transitional concerns:

## Open questions
- 

## Decision needed
- What approval or conclusion is required before Plan/Build?
```

## Existing ticket improvement template

```markdown
# Improve existing ticket: <ticket id or title>

## What is unclear today?
- 

## Proposed clarification
- Revised title:
- Revised problem statement:
- Revised acceptance criteria:
- Missing boundaries / dependencies:

## Suggested metadata updates
- Parent / epic:
- Labels:
- Priority:
- Team / owner:

## Next step
- Ready for Plan? yes/no
- Ready for Build? yes/no
```

## Rule of thumb

If the work is still mostly about learning, choose a spike.
If the work is broad and will spawn multiple follow-ons, choose an epic.
If the work is cross-team or hard to reverse, choose an RFC.
If the work is concrete enough to deliver, choose a shaped ticket.
If the work already exists but is vague, improve the existing ticket.
