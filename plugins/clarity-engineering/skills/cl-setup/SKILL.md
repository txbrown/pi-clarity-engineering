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
- where domain language, ADRs, and supporting docs live;
- which validation, build, e2e, manual QA, and app-running paths prove behavior;
- which tools or MCPs are available, what they are for, and which operations require approval;
- how Review publishes work through commits, branches, PRs, CI, release checks, and evidence;
- which decisions require human judgement.

## Inputs

- A repository, service, app, package, or monorepo.
- Optional pointers to Jira, Linear, GitHub Issues, local ticket folders, Obsidian notes, docs, MCPs, test tools, PR templates, CI, or release workflows.
- Existing `AGENTS.md`, `CLAUDE.md`, `CONTEXT.md`, docs, scripts, package manifests, CI files, issue links, or PR templates.

## Setup discovery

Explore before asking. If the answer can be discovered from files, scripts, git remotes, docs, or existing config, discover it instead of asking.

Look for:

- repo instructions: `AGENTS.md`, `CLAUDE.md`, `README.md`, `.github/`, docs;
- work tracking clues: Jira/Linear/GitHub links, issue templates, ticket references, `.scratch/`, planning docs;
- domain context: `CONTEXT.md`, `CONTEXT-MAP.md`, glossary docs, product/design docs;
- decisions: `docs/adr/`, RFCs, decision logs;
- validation: package scripts, Makefiles, CI workflows, test/e2e config, app launch scripts;
- review/publish flow: git remotes, default branch, PR templates, branch/commit conventions;
- tools/MCPs: available MCP names, CLI tools, browser/e2e tooling, observability or design integrations.

## Setup sections

Prefer a repo-local artifact such as:

```text
docs/agents/clarity-engineering.md
```

For small repos, a section in `AGENTS.md`, `CLAUDE.md`, or `CONTEXT.md` may be enough. For larger repos, split into `docs/agents/issue-tracker.md`, `domain.md`, `validation.md`, `tools-and-mcps.md`, and `review-workflow.md` if that improves findability.

Capture only what is useful.

### 1. Work tracking

Document the local ticket system and conventions:

- system: Jira, Linear, GitHub Issues, local markdown, Obsidian, PR-only, other;
- project/team/repo location;
- link/search instructions;
- ticket types and status vocabulary;
- follow-up ticket convention;
- what counts as a ticket-equivalent artifact for small work.

### 2. Domain and decisions

Document where agents should learn language and past choices:

- domain glossary / `CONTEXT.md` / `CONTEXT-MAP.md`;
- ADR or decision-record location;
- architecture/product/design docs;
- terms that must be used precisely.

ADR rule: offer an ADR only when the decision is hard to reverse, surprising without context, and the result of a real trade-off.

### 3. Validation and feedback loops

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

### 4. Tools and MCPs

Document available tools and their safety boundaries:

| Tool / MCP | Purpose | Safe operations | Requires approval | Fallback |
|---|---|---|---|---|

Treat write-capable tools carefully. Creating tickets, mutating Jira/Linear/GitHub, pushing branches, updating PRs, touching environments, or accessing sensitive data should have explicit approval expectations.

### 5. Review and publishing

Document how completed work becomes reviewable:

- branch convention;
- commit convention;
- PR template location;
- reviewer expectations;
- CI/build requirements;
- e2e/manual QA requirements;
- release/rollout notes;
- required evidence for approval.

Review remains:

```text
Review = Publish + Validation + Understanding + Decision
```

### 6. Human decision rights

Document what cannot be assumed by the agent:

- lifecycle transition approvals;
- scope changes;
- product/taste decisions;
- architecture/security/privacy decisions;
- release decisions;
- unsafe write-capable tool operations.

## Operator guidance

When setup is incomplete, ask one focused question at a time. Do not ask questions whose answers can be discovered from the repo.

Keep setup progress explicit:

- `Done` — discovered context and written/updated setup sections.
- `Left` — missing work tracking, domain docs, validation, MCP/tool, review, or decision-rights context.
- `Blocked` — the single focused question needed to finish setup.
- `Ready for use?` — yes/no, with what parts of Clarity Engineering are now better supported.

## Output

- Setup artifact path(s) created or updated.
- Summary of discovered local workflow.
- Missing context or recommended follow-up.
- Tool/MCP safety notes.
- Validation commands and review evidence expectations.
- Whether the setup is ready for Shape/Plan/Build/Review/Compound usage.

## Rules

- Keep setup adaptable; do not assume Jira, GitHub, Linear, PRs, e2e tests, or MCPs exist.
- Prefer existing repo conventions over framework defaults.
- Do not create configuration theatre; setup exists to reduce ambiguity and improve validation.
- Do not perform write-capable external operations during setup unless explicitly requested and approved.
- Link setup from agent instructions when useful so future agents can find it.
- During Compound, update setup when repeated friction shows local configuration is missing or wrong.
