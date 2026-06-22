---
name: cl-strategy
description: Evaluate founder, product, or engineering bets before they become shaped delivery work. Use when deciding whether an idea is worth pursuing, what to focus on, why now, or whether to shape, spike, prototype, park, or kill an opportunity.
---

# Clarity Strategy

Use this skill when the request is still about **which bet to make** rather than how to deliver an already-chosen bet.

Strategy is an upstream judgement layer for Clarity Engineering. It is **not** a delivery lifecycle stage and does not change the lifecycle:

```text
Shape → Plan → Build → Review → Compound
```

Strategy decides whether an idea, opportunity, product direction, engineering investment, or founder instinct deserves to enter Clarity Engineering at all.

## Goal

Produce a clear strategic recommendation:

- shape this into delivery work;
- run a spike to answer a key uncertainty;
- build a prototype/demo/fake-door to make the idea tangible;
- write an RFC for a high-blast-radius decision;
- park the idea until conditions change;
- kill the idea because it is not worth the focus.

## Inputs

- A founder/product idea, customer signal, support theme, market observation, competitor move, internal platform pain, engineering investment, or vague opportunity.
- Questions like “should we build this?”, “what should we focus on?”, “is this worth shaping?”, “why now?”, or “which option should we bet on?”.
- Optional context: strategy docs, customer evidence, metrics, constraints, technical debt, roadmap, team capacity, risk, dependencies, or prior attempts.

## Relationship to Clarity Engineering

Strategy sits above Clarity Engineering:

```text
Strategy
  ↓
Shape → Plan → Build → Review → Compound
```

Use Strategy to choose and frame bets. Use Shape to turn an approved bet into executable clarity.

Do not use Strategy for every ticket. If the work is already chosen and only needs clearer scope, use `cl-shape`. If it is already clear enough to implement, use `cl-build`.

## Strategic posture

Think like a founder or senior product/engineering leader, not a ticket formatter.

- Start with the real problem, not the proposed feature.
- Ask whether the pain is intense enough to justify focus.
- Make the story simple enough that others can repeat it.
- Prefer evidence and tangible learning over abstract conviction.
- Name trade-offs and opportunity cost.
- Recommend not doing the work when that is the honest answer.
- Ask one focused question only when a strategic judgement is not discoverable from context.

## Strategic checks

Use these proportionally. Small internal decisions may only need a few bullets; major bets deserve explicit treatment.

### 1. Strategic thesis

Capture:

- what we believe;
- who benefits;
- why now;
- what changes if this works;
- what strategic goal or constraint this supports.

### 2. Pain / value intensity

Capture:

- who feels the pain or receives the value;
- frequency and severity;
- current workaround;
- consequence of doing nothing;
- classification: `painkiller`, `vitamin`, or `hygiene`.

### 3. Story

Capture:

- **Before** — what pain, limitation, confusion, or inefficiency exists today;
- **Turning point** — why this moment or insight changes the decision;
- **After** — what becomes easier, safer, faster, or more valuable;
- **Proof** — what observation would show the bet mattered.

### 4. Readiness

Capture:

- customer/user/team readiness;
- dependency, platform, or ecosystem readiness;
- migration, rollout, support, or operational readiness;
- ownership and appetite;
- what changed that makes now viable.

### 5. Options and trade-offs

When there are multiple plausible moves, compare them:

- option;
- upside;
- cost;
- risk;
- reversibility;
- why choose or reject it.

### 6. Tangibility / learning path

Name the smallest artifact that would reduce uncertainty before delivery:

- customer interview or support review;
- fake-door or concierge test;
- sketch, prototype, clickable demo, or Storybook story;
- CLI mock, API contract sketch, benchmark harness, migration dry-run;
- spike, RFC, or decision memo.

### 7. Kill / park criteria

For meaningful bets, state what would make the team stop, defer, or change direction:

- missing evidence;
- adoption threshold not reached;
- technical risk too high;
- dependency not ready;
- opportunity cost too large.

## Output

Use this structure unless a shorter answer is clearly enough:

```markdown
## Strategic recommendation

Decision: shape | spike | prototype | RFC | park | kill
Confidence: low | medium | high
Why:

## Strategic thesis

What we believe:
Who benefits:
Why now:
What changes if this works:

## Pain / value

Audience:
Pain/value:
Frequency/severity:
Current workaround:
Consequence of doing nothing:
Classification: painkiller | vitamin | hygiene

## Story

Before:
Turning point:
After:
Proof:

## Options considered

1. <option> — upside / cost / risk / why choose or reject
2. <option> — upside / cost / risk / why choose or reject

## Readiness and risks

Ready now:
Not ready:
Main risks:

## Next move

Recommended next Clarity action: Shape | Spike | Prototype | RFC | Park | Kill
If Shape: proposed shaped artifact type and first framing.
If Spike/Prototype/RFC: question to answer and success criteria.
If Park/Kill: revisit condition or reason to stop.

## Status

Done:
Left:
Blocked:
```

## Rules

- Strategy is upstream of Clarity Engineering, not part of the delivery lifecycle.
- Do not add Strategy ceremony to routine implementation work.
- Do not force a ticket as the output; strategy may recommend shape, spike, prototype, RFC, park, or kill.
- Preserve the lifecycle wording exactly as `Shape → Plan → Build → Review → Compound`.
- If the answer is “worth pursuing,” hand off to Shape rather than planning implementation details.
- If the key uncertainty is factual or technical, recommend a spike or prototype instead of pretending confidence.
- Ask one focused question at a time when strategic judgement requires human input.
