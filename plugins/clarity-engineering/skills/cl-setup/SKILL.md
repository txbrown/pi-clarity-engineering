---
name: cl-setup
description: Configure Clarity Engineering for a codebase by discovering where tickets, domain docs, ADRs, validation/e2e tools, MCPs, review workflows, session state, and escalation boundaries live.
---

# Clarity Setup

Use this skill when applying Clarity Engineering to a new repo/codebase, when an agent lacks local workflow context, or when repeated friction shows the codebase setup is incomplete.

Setup is not a new delivery lifecycle stage or lifecycle mode. It is **Clarity Engineering framework setup/configuration for a codebase**: the adapter that lets the lifecycle work across different teams, ticket systems, MCPs, e2e tools, validation commands, session-state storage, and escalation policies.

## Goal

Create or update the smallest useful Clarity Engineering framework setup artifact so humans and AI agents share reality about how this codebase works.

The setup should answer:

- whether repo-local helper files such as `.clarity-engineering/config.local.yaml` are used for machine-local defaults;

- where shaped tickets or ticket-equivalent artifacts live;
- how stage commands resolve work references such as ticket IDs/URLs, PRs, branches, diffs, failing tests, and review comments;
- how Plan materializes defined slices/tickets in the issue tracker when appropriate;
- how Build claims work through ticket status, assignment, and branch creation;
- where session state is stored and how it survives across sessions;
- where continuous compound entries are written;
- where domain language, ADRs, and supporting docs live;
- which validation, build, e2e, manual QA, and app-running paths prove behavior;
- which tools or MCPs are available, what they are for, and which operations require escalation;
- how Review publishes PRs through commits, branches, PR discovery/creation/update, CI, release checks, and evidence;
- which normal automation is safe and which actions require escalation;
- where local repo memory and global memory live;
- what memory should not be bulk-loaded;
- what context budget expectations apply by stage;
- which decisions require human judgement.

## Inputs

- A repository, service, app, package, or monorepo.
- Optional pointers to Jira, Linear, GitHub Issues, local ticket folders, Obsidian notes, docs, MCPs, test tools, PR templates, CI, or release workflows.
- Existing `AGENTS.md`, `CLAUDE.md`, `CONTEXT.md`, docs, scripts, package manifests, CI files, issue links, PR templates, or `.clarity-engineering/` config files.

## Setup discovery

Explore before asking. If the answer can be discovered from files, scripts, git remotes, docs, or existing config, discover it instead of asking.

Look for:

- repo-local machine config: `.clarity-engineering/config.local.yaml`, `.clarity-engineering/config.local.example.yaml`, and gitignore coverage for machine-local settings;

- repo instructions: `AGENTS.md`, `CLAUDE.md`, `README.md`, `.github/`, docs;
- work tracking clues: Jira/Linear/GitHub links, issue templates, ticket references, ticket key patterns, `.scratch/`, planning docs;
- domain context: `CONTEXT.md`, `CONTEXT-MAP.md`, glossary docs, product/design docs;
- decisions: `docs/adr/`, RFCs, decision logs;
- validation: package scripts, Makefiles, CI workflows, test/e2e config, app launch scripts;
- review/publish flow: git remotes, default branch, PR templates, branch/commit conventions, PR discovery commands, CI requirements;
- tools/MCPs: available MCP names, CLI tools, browser/e2e tooling, observability or design integrations;
- memory: `CONTEXT.md`, `docs/agents/`, `docs/adr/`, `docs/solutions/`, `docs/clarity/learnings/`, global memory pointers.

## Setup sections

Prefer a repo-local artifact such as:

```text
.clarity-engineering/config.local.yaml
```

for machine-local defaults, plus a repo-local durable artifact such as:

```text
docs/agents/clarity-engineering.md
```

For small repos, a section in `AGENTS.md`, `CLAUDE.md`, or `CONTEXT.md` may be enough. For larger repos, split into `docs/agents/issue-tracker.md`, `domain.md`, `validation.md`, `tools-and-mcps.md`, and `review-workflow.md` if that improves findability.

Capture only what is useful.

### 1. Work tracking and reference resolution

Document the local ticket system and conventions:

- system: Jira, Linear, GitHub Issues, local markdown, Obsidian, PR-only, other;
- project/team/repo location;
- ID and URL patterns;
- fetch/view/search instructions for ticket IDs, URLs, PRs, branches, diffs, failing tests, and review comments;
- ticket types and status vocabulary;
- follow-up ticket convention;
- what counts as a ticket-equivalent artifact for small work.

Document reference resolution so `cl-build <ticket>`, `cl-plan <ticket>`, `cl-review <ticket-or-pr>`, and `cl-shape <issue>` can retrieve context without guessing.

### 2. Plan ticket materialization

Document how Plan should raise or update issue-tracker tickets when it defines independently buildable slices:

- whether Plan-created slices become child issues, linked follow-up tickets, checklist items on the parent ticket, local markdown, or no tracker items;
- tracker project/team/default status;
- parent/child and dependency conventions;
- labels, milestones, estimates, assignee, and priority defaults;
- title/body format for planned tickets;
- how to link created tickets back to the source ticket or plan;
- tracker comment policy, which should default to never adding comments on the operator's behalf;
- whether creating/updating tracker tickets requires escalation;
- when not to create tickets, such as tiny implementation steps or a source ticket that is already small enough.

Plan should not create tracker tickets by default for every slice unless setup says that is the team's workflow. It should materialize only tickets that are independently buildable, reviewable, assignable, or likely to survive beyond the current session.

### 3. Build claim workflow

Document how Build should claim and prepare active work:

- when `cl-build` receives a ticket, whether to move it to In Progress;
- assignment convention;
- branch creation/switching convention;
- branch naming pattern;
- commit/ticket reference convention;
- whether ticket mutations require escalation;
- whether local branch creation is safe without asking;
- how to continue from an existing branch or draft PR.

### 0. Local config ergonomics

Document whether the repo uses a machine-local config layer for Clarity defaults:

- config file path, usually `.clarity-engineering/config.local.yaml`;
- committed example path, usually `.clarity-engineering/config.local.example.yaml`;
- gitignore rule for machine-local config;
- what belongs there, such as tracker defaults, repo aliases, review preferences, and local tool assumptions;
- what must stay in repo-tracked setup docs instead of local config.

Use local config for convenience, not for hiding essential team workflow.

### 4. Session state and compounding

Document where session state and continuous compound entries live:

- session state location, such as `docs/agents/session-state/` or inline in tickets;
- session state format;
- whether session state is per-ticket, per-branch, or global;
- continuous compound location, such as `docs/clarity/continuous-compound/`;
- standalone compound curation cadence or trigger.

### 5. Domain and decisions

Document where agents should learn language and past choices:

- domain glossary / `CONTEXT.md` / `CONTEXT-MAP.md`;
- ADR or decision-record location;
- architecture/product/design docs;
- terms that must be used precisely.

ADR rule: offer an ADR only when the decision is hard to reverse, surprising without context, and the result of a real trade-off.

### 6. Validation and feedback loops

Document the fastest reliable checks:

- fast test loop;
- typecheck;
- lint;
- build;
- e2e/component/UI tests;
- manual QA or app launch path;
- known flaky checks;
- evidence expected during Review.

For bugs, the setup should help Build establish a feedback loop before hypothesising.

### 7. Tools and MCPs

Document available tools and their safety boundaries:

| Tool / MCP | Purpose | Safe operations | Requires escalation | Fallback |
|---|---|---|---|---|

Treat write-capable tools carefully. Creating tickets, mutating Jira/Linear/GitHub, pushing branches, updating PRs, touching environments, or accessing sensitive data should have explicit escalation expectations.

### 8. Review and publishing

Document how completed work becomes reviewable:

- branch convention;
- commit convention;
- PR discovery command/tool;
- PR creation/update command/tool;
- PR template location;
- PR title/body conventions, including ticket links;
- ticket status/linking/comment behavior when PR is opened, including whether tracker comments are ever allowed;
- reviewer expectations;
- CI/build requirements;
- e2e/manual QA requirements;
- release/rollout notes;
- required evidence for approval.

Review remains:

```text
Review = Reviewable Context + Validation + Understanding + Decision
```

`cl-review` should normally start from the existing review surface: draft PR, ready PR, or pushed branch. It should first discover whether a PR already exists for the current branch or ticket, update it when needed, and create one only when no suitable review surface exists yet.

### 9. Automation and escalation policy

Document what agents may do autonomously and what triggers escalation. Prefer repo/user-specific policy over universal assumptions.

Autonomous (no escalation):

- read tickets, PRs, comments, docs, logs, and code;
- inspect git status/branch/diff;
- classify depth at Build entry;
- create or switch local branches;
- run tests, typecheck, lint, build, e2e, or manual QA scripts;
- create local commits;
- write/update session state;
- perform continuous compounding;
- move ticket to In Progress;
- push a feature branch;
- open or update a draft/normal PR.

Tracker comments should default to disallowed on the operator's behalf unless the repo/user setup explicitly says otherwise.

Escalation-required (ask before):

- modify ticket title/description/scope;
- add tracker comments on behalf of the operator;
- assign other people;
- force push;
- push to protected/default branches;
- resolve/delete review comments;
- mark tickets Done;
- merge PRs;
- deploy/release;
- destructive data or environment operations.

Additional framework-defined escalation triggers: intent ambiguity, scope conflict, product/UX decision, architecture risk, validation challenge, completion.

### 10. Memory and context policy

Document local/global memory and retrieval discipline:

- local repo memory locations, especially `docs/solutions/`, `docs/adr/`, `docs/agents/`, and `docs/clarity/continuous-compound/` when they exist;
- global memory location, if available;
- load order for ticket, repo memory, global memory, and framework memory;
- files/directories that should not be bulk-loaded;
- default stage context budget, usually under ~100k tokens where possible;
- Build context budget, preferably under ~50k tokens;
- stale/conflicting memory policy.

Rule of thumb: local repo memory is authoritative for codebase-specific facts. Global memory is supplementary for cross-repo preferences, reusable patterns, and framework learning. Current ticket/slice intent overrides both.

### 11. Human decision rights

Document what cannot be assumed by the agent:

- escalation judgement for scope, product, architecture, security, and release;
- lifecycle transition when in guided mode;
- scope changes;
- product/taste decisions;
- architecture/security/privacy decisions;
- release decisions;
- unsafe write-capable tool operations.

## Operator guidance

When setup is incomplete, escalate one focused question at a time. Do not ask questions whose answers can be discovered from the repo.

Keep setup progress explicit:

- `Done` — discovered context and written/updated setup sections.
- `Left` — missing work tracking, domain docs, validation, MCP/tool, review, session state, escalation, memory/context policy, or decision-rights context.
- `Blocked` — escalation trigger fired, the single focused question needed to finish setup.
- `Ready for use?` — yes/no, with what parts of Clarity Engineering are now better supported.

## Output

- Setup artifact path(s) created or updated.
- Local config path(s) confirmed, created, or recommended.
- Summary of discovered local workflow.
- Missing context or recommended follow-up.
- Work reference resolution, Plan ticket materialization, Build claim/Review publish behavior, session state and compounding locations.
- Automation and escalation policy for safe vs escalation-required operations.
- Tool/MCP safety notes.
- Validation commands and review evidence expectations.
- Memory locations, load order, and context budget expectations.
- Whether the setup is ready for Shape/Plan/Build/Review/Compound usage.

## Rules

- Keep setup adaptable; do not assume Jira, GitHub, Linear, PRs, e2e tests, or MCPs exist.
- Prefer existing repo conventions over framework defaults.
- Do not create configuration theatre; setup exists to reduce ambiguity and improve validation.
- Do not perform write-capable external operations during setup unless explicitly requested and approved.
- Link setup from agent instructions when useful so future agents can find it.
- During continuous compounding or standalone Compound, update setup when repeated friction shows local configuration is missing or wrong.
- Prefer a small machine-local config file for local defaults, but keep shared workflow truth in repo-tracked docs.
