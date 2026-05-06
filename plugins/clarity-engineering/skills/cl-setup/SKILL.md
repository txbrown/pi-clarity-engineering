---
name: cl-setup
description: Configure Clarity Engineering for a codebase by discovering where tickets, domain docs, ADRs, validation/e2e tools, MCPs, review workflows, and human decision rights live.
---

# Clarity Setup

Use this skill when applying Clarity Engineering to a new repo/codebase, when an agent lacks local workflow context, or when repeated friction shows the codebase setup is incomplete.

Setup is not a new delivery lifecycle stage or lifecycle mode. It is **Clarity Engineering framework setup/configuration for a codebase**: the adapter that lets the lifecycle work across different teams, ticket systems, MCPs, e2e tools, validation commands, and review workflows.

## Goal

Create or update the smallest useful Clarity Engineering framework setup artifact so humans and AI agents share reality about how this codebase works.

The setup should answer:

- where shaped tickets or ticket-equivalent artifacts live;
- how stage commands resolve work references such as ticket IDs/URLs, PRs, branches, diffs, failing tests, and review comments;
- how Plan materializes defined slices/tickets in the issue tracker when appropriate;
- how Build claims work through ticket status, assignment, and branch creation;
- where domain language, ADRs, and supporting docs live;
- which validation, build, e2e, manual QA, and app-running paths prove behavior;
- which tools or MCPs are available, what they are for, and which operations require approval;
- how Review publishes PRs through commits, branches, PR discovery/creation/update, CI, release checks, and evidence;
- which normal automation is pre-authorized and which actions require approval;
- where local repo memory and global memory live;
- what memory should not be bulk-loaded;
- what context budget expectations apply by stage;
- which decisions require human judgement.

## Inputs

- A repository, service, app, package, or monorepo.
- Optional pointers to Jira, Linear, GitHub Issues, local ticket folders, Obsidian notes, docs, MCPs, test tools, PR templates, CI, or release workflows.
- Existing `AGENTS.md`, `CLAUDE.md`, `CONTEXT.md`, docs, scripts, package manifests, CI files, issue links, or PR templates.

## Setup discovery

Explore before asking. If the answer can be discovered from files, scripts, git remotes, docs, or existing config, discover it instead of asking.

Look for:

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
- whether creating/updating tracker tickets requires approval;
- when not to create tickets, such as tiny implementation steps or a source ticket that is already small enough.

Plan should not create tracker tickets by default for every slice unless setup says that is the team's workflow. It should materialize only tickets that are independently buildable, reviewable, assignable, or likely to survive beyond the current session.

### 3. Build claim workflow

Document how Build should claim and prepare active work:

- when `cl-build` receives a ticket, whether to move it to In Progress;
- assignment convention;
- branch creation/switching convention;
- branch naming pattern;
- commit/ticket reference convention;
- whether ticket mutations require approval;
- whether local branch creation is safe without asking;
- how to continue from an existing branch or draft PR.

### 4. Domain and decisions

Document where agents should learn language and past choices:

- domain glossary / `CONTEXT.md` / `CONTEXT-MAP.md`;
- ADR or decision-record location;
- architecture/product/design docs;
- terms that must be used precisely.

ADR rule: offer an ADR only when the decision is hard to reverse, surprising without context, and the result of a real trade-off.

### 5. Validation and feedback loops

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

### 6. Tools and MCPs

Document available tools and their safety boundaries:

| Tool / MCP | Purpose | Safe operations | Requires approval | Fallback |
|---|---|---|---|---|

Treat write-capable tools carefully. Creating tickets, mutating Jira/Linear/GitHub, pushing branches, updating PRs, touching environments, or accessing sensitive data should have explicit approval expectations.

### 7. Review and publishing

Document how completed work becomes reviewable:

- branch convention;
- commit convention;
- PR discovery command/tool;
- PR creation/update command/tool;
- PR template location;
- PR title/body conventions, including ticket links;
- ticket status/linking/comment behavior when PR is opened;
- reviewer expectations;
- CI/build requirements;
- e2e/manual QA requirements;
- release/rollout notes;
- required evidence for approval.

Review remains:

```text
Review = Publish PR + Validation + Understanding + Decision
```

`cl-review` should normally commit intended changes, push the branch, and raise or update a PR when the repository uses PRs. It should first discover whether a PR already exists for the current branch or ticket to avoid duplicates.

### 8. Automation policy

Document what agents may do without asking and what requires approval. Prefer repo/user-specific policy over universal assumptions.

Examples usually safe when configured:

- read tickets, PRs, comments, docs, logs, and code;
- inspect git status/branch/diff;
- create planned child/follow-up tickets during Plan;
- create or switch local branches;
- run tests, typecheck, lint, build, e2e, or manual QA scripts;
- create local commits;
- move ticket to In Progress;
- push a feature branch;
- open or update a draft/normal PR.

Examples usually approval-required unless explicitly pre-authorized:

- modify existing ticket title/description/scope;
- assign other people;
- force push;
- push to protected/default branches;
- resolve/delete review comments;
- mark tickets Done;
- merge PRs;
- deploy/release;
- destructive data or environment operations.

### 9. Memory and context policy

Document local/global memory and retrieval discipline:

- local repo memory locations;
- global memory location, if available;
- load order for ticket, repo memory, global memory, and framework memory;
- files/directories that should not be bulk-loaded;
- default stage context budget, usually under ~100k tokens where possible;
- Build context budget, preferably under ~50k tokens;
- stale/conflicting memory policy.

Rule of thumb: local repo memory is authoritative for codebase-specific facts. Global memory is supplementary for cross-repo preferences, reusable patterns, and framework learning. Current ticket/slice intent overrides both.

### 10. Human decision rights

Document what cannot be assumed by the agent:

- lifecycle transition approvals for guided multi-stage work;
- scope changes;
- product/taste decisions;
- architecture/security/privacy decisions;
- release decisions;
- unsafe write-capable tool operations.

## Operator guidance

When setup is incomplete, ask one focused question at a time. Do not ask questions whose answers can be discovered from the repo.

Keep setup progress explicit:

- `Done` — discovered context and written/updated setup sections.
- `Left` — missing work tracking, domain docs, validation, MCP/tool, review, memory/context policy, or decision-rights context.
- `Blocked` — the single focused question needed to finish setup.
- `Ready for use?` — yes/no, with what parts of Clarity Engineering are now better supported.

## Output

- Setup artifact path(s) created or updated.
- Summary of discovered local workflow.
- Missing context or recommended follow-up.
- Work reference resolution, Plan ticket materialization, and Build claim/Review publish behavior.
- Automation policy for safe vs approval-required operations.
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
- During Compound, update setup when repeated friction shows local configuration is missing or wrong.
