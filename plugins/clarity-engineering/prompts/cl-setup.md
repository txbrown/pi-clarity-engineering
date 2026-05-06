---
description: Configure Clarity Engineering for this codebase
argument-hint: "[repo context, ticket system, tools, MCPs, validation, or review workflow]"
---

Apply Clarity Engineering framework setup to this codebase. Discover or draft the local setup/configuration that lets Clarity Engineering adapt here. This is framework configuration, not a delivery lifecycle stage or lifecycle mode.

- where tickets or ticket-equivalent artifacts live;
- how stage commands resolve ticket IDs/URLs, PRs, branches, diffs, failing tests, and review comments;
- how Plan materializes defined slices/tickets in the issue tracker when appropriate;
- how Build claims work through ticket status, assignment, and branch creation;
- where domain language, ADRs, and supporting docs live;
- which validation, build, e2e, manual QA, and app-running paths prove behavior;
- which MCPs/tools are available, what they are for, and what requires approval;
- how Review publishes PRs through commits, branches, PR discovery/creation/update, CI, release checks, and evidence;
- what automation is safe without asking and what requires approval;
- where local repo memory and global memory live;
- what memory should not be bulk-loaded;
- what context budget expectations apply by stage;
- which decisions require human judgement.

Keep the setup lightweight. Prefer existing repo conventions. Ask one focused question only when the answer cannot be discovered from the repo or supplied context.

Input:

$ARGUMENTS
