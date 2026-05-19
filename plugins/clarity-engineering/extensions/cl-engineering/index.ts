import type { ExtensionAPI, ExtensionCommandContext, ExtensionContext } from "@mariozechner/pi-coding-agent";
import { Type, type Static } from "typebox";

type ClarityStage =
  | "route"
  | "setup"
  | "shape"
  | "plan-slice"
  | "plan-specify"
  | "build"
  | "review"
  | "compound"
  | "approval"
  | "blocked"
  | "idle";


type ClarityState = {
  stage: ClarityStage;
  detail?: string;
};

type Mode = {
  command: string;
  skill: string;
  stage: ClarityStage;
  label: string;
  description: string;
  argumentHint: string;
  instruction: string;
};

const LIFECYCLE = "Shape → Plan → Build → Review → Compound";
const PLAN = "Plan = Slice + Specify";
const OPERATOR_PROGRESS =
  "Make operator progress explicit with `Done`, `Left`, `Blocked`, readiness for the next stage, and approval state.";
const APPROVAL_GATE =
  "Do not advance to another lifecycle stage without explicit operator approval. In Pi, use the TUI `ask_user` tool when available; otherwise ask an explicit yes/no question and stop.";

const STAGE_LABELS: Record<ClarityStage, string> = {
  route: "Routing",
  setup: "Setup",
  shape: "Shape",
  "plan-slice": "Plan: Slice",
  "plan-specify": "Plan: Specify",
  build: "Build",
  review: "Review",
  compound: "Compound",
  approval: "Awaiting approval",
  blocked: "Blocked",
  idle: "Idle",
};

const POWERBAR_SEGMENT_ID = "cl-engineering";

const modes: Mode[] = [
  {
    command: "cl-engineering",
    skill: "cl-engineering",
    stage: "route",
    label: "Routing",
    description: "Route work through Clarity Engineering",
    argumentHint: "[request, ticket, plan, diff, or context]",
    instruction: "Route this request to Shape, Plan, Build, Review, or Compound, then apply the selected mode. Clarity Engineering is a lightweight constitution, not a checklist. The agent owns execution flow. Resolve intent source, retrieve narrow relevant context, classify depth at Build entry, perform stage work autonomously, and escalate only when a trigger fires.",
  },
  {
    command: "cl-setup",
    skill: "cl-setup",
    stage: "setup",
    label: "Setup",
    description: "Configure the Clarity Engineering framework for this codebase",
    argumentHint: "[repo context, ticket system, tools, MCPs, validation, or review workflow]",
    instruction: "Apply Clarity Engineering framework setup. Discover or draft the local Clarity Engineering setup/configuration for this codebase: where tickets live, how stage commands resolve ticket/PR/branch/diff/test references, how Plan materializes defined slices/tickets in the issue tracker, how Build claims work, where session state and continuous compound entries live, where domain language and ADRs live, which validation/e2e tools and MCPs are available, how Review publishes PRs, where local/global memory lives, what context budget policy applies, what automation is safe and what requires escalation, and which decisions require human judgement. Setup is framework configuration, not a delivery lifecycle stage or lifecycle mode. Keep it lightweight, adaptable, and grounded in existing repo conventions.",
  },
  {
    command: "cl-shape",
    skill: "cl-shape",
    stage: "shape",
    label: "Shape",
    description: "Shape an idea into Clarity Engineering tickets",
    argumentHint: "[idea, problem, or request]",
    instruction: "Apply Shape mode. Resolve the intent source first when given a ticket/issue/PR/branch/diff/test/model problem. Create clarity before delivery with concise shaped tickets, existing-ticket improvements, and useful supporting artefacts. Proceed autonomously; escalate only when scope, priority, or product behaviour is materially ambiguous and not discoverable.",
  },
  {
    command: "cl-plan",
    skill: "cl-plan",
    stage: "plan-slice",
    label: "Plan",
    description: "Plan shaped work with Slice + Specify",
    argumentHint: "[ticket, request, or shaped context]",
    instruction: `Apply Plan mode. Resolve the intent source first when given a ticket/issue/PR/branch/diff/test/model problem. ${PLAN}. Start in Slice unless a slice is already selected; when moving from Slice to Specify, update the Clarity status to \`plan-specify\`. Slice only when useful; if a ticket is already small and coherent, say no child tickets are needed and specify enough for Build. When Plan defines concrete independently buildable slices/tickets, materialize them in the configured issue tracker as child issues, linked follow-ups, checklist items, or local markdown according to Setup and escalation policy. If tracker creation is useful but not safe, produce proposed ticket text and escalate before mutating the tracker. Do not define the first failing test.`,
  },
  {
    command: "cl-build",
    skill: "cl-build",
    stage: "build",
    label: "Build",
    description: "Build already-shaped work TDD-first",
    argumentHint: "[slice, ticket, bug, draft PR, acceptance details, or task]",
    instruction: "Apply Build mode. Resolve the intent source first. Check for session state and resume if it exists. Classify depth at entry and adapt ceremony proportionally. Build already-shaped work TDD-first from any well-known or resolvable position with enough clarity: selected slice, ticket ID/URL, complete small ticket, bug, technical improvement, failing test, model problem, prior Shape/Plan artefact, draft PR, review comments, or existing branch. For tickets, fetch context, claim/move In Progress and create/switch branch according to Setup and escalation policy. First classify the Build entry and choose the smallest useful work unit. Translate acceptance details, expected behavior, target state, or review feedback into the first failing behavior test or validation target, implement the smallest useful behavior, run checks, and refactor while green. When the work becomes meaningful enough to share, Build may open or update a draft PR before formal Review. Before committing, run intent drift check. After implementation, compound learnings continuously and update session state. Proceed autonomously; escalate only when a trigger fires.",
  },
  {
    command: "cl-review",
    skill: "cl-review",
    stage: "review",
    label: "Review",
    description: "Validate built work with the right review mix",
    argumentHint: "[diff, PR, build, app behavior, test evidence, or implementation context]",
    instruction: "Apply Review mode. Review = Reviewable Context + Validation + Understanding + Decision. Resolve the intent source first: current branch/diff, ticket ID/URL, PR, branch, or review comments. Check session state and Build's intent drift check for context. On Review entry, start from the existing review surface: inspect git status, discover existing PRs to avoid duplicates, confirm whether there is already a draft PR or pushed branch, and update that surface before creating anything new. Commit intended changes using the author's or codebase's existing commit patterns and push the branch when needed; raise or update a PR when the repository workflow supports PRs and no suitable review surface exists yet. Then check shaped intent first and choose the smallest useful mix of AI review, human review, automated/manual/e2e testing, builds, PR/code-diff review, release checks, and evidence gathering. If preparing PR text, discover and follow the repository-local PR template when one exists; do not hardcode absolute template paths. Make the PR description evidence-aware including drift notes and concrete validation scenarios; for `Testing notes` sections, describe what behavior was actually exercised for the PR and avoid generic unit-test mentions unless they add review-specific signal. Output approve/request-changes/blocked/rescope, and identify the smallest refinement loop target when issues are found. Proceed autonomously; escalate only when a trigger fires.",
  },
  {
    command: "cl-compound",
    skill: "cl-compound",
    stage: "compound",
    label: "Compound",
    description: "Decide whether learning should be codified",
    argumentHint: "[completed work, decision, or learning]",
    instruction: "Apply Compound mode. Continuous compounding already captures learnings at the end of every Build. Curate accumulated learnings: review, consolidate duplicates, refresh stale docs, promote reusable patterns, archive what's no longer relevant. For each, decide: promote, refresh, deduplicate, archive, keep, or no action. Search before writing to avoid duplicates. Escalate with one focused question if the reuse value or target location is unclear.",
  },
];

const stateSchema = Type.Object({
  stage: Type.Union([
    Type.Literal("route"),
    Type.Literal("Route"),
    Type.Literal("setup"),
    Type.Literal("Setup"),
    Type.Literal("shape"),
    Type.Literal("Shape"),
    Type.Literal("plan-slice"),
    Type.Literal("Plan: Slice"),
    Type.Literal("plan-specify"),
    Type.Literal("Plan: Specify"),
    Type.Literal("build"),
    Type.Literal("Build"),
    Type.Literal("review"),
    Type.Literal("Review"),
    Type.Literal("compound"),
    Type.Literal("Compound"),
    Type.Literal("approval"),
    Type.Literal("Approval"),
    Type.Literal("blocked"),
    Type.Literal("Blocked"),
    Type.Literal("idle"),
    Type.Literal("Idle"),
  ]),
  detail: Type.Optional(Type.String({ description: "Short optional status detail, for example the gate or blocker." })),
});

type StateToolInput = Static<typeof stateSchema>;

export default function clarityEngineeringExtension(pi: ExtensionAPI) {
  let state: ClarityState | undefined;
  let lastCtx: ExtensionContext | undefined;

  registerPowerbarSegment(pi);

  const persistState = () => {
    pi.appendEntry("cl-engineering-state", state ?? { stage: "idle" });
  };

  const updateStatus = (ctx: ExtensionContext) => {
    lastCtx = ctx;

    if (!state || state.stage === "idle") {
      ctx.ui.setStatus("cl-engineering", undefined);
      ctx.ui.setWorkingMessage();
      updatePowerbarSegment(pi, undefined);
      return;
    }

    const label = STAGE_LABELS[state.stage];
    const detail = state.detail?.trim();
    const status = detail ? `🧭 CL: ${label} · ${detail}` : `🧭 CL: ${label}`;
    const color = state.stage === "blocked" ? "error" : state.stage === "approval" ? "warning" : "accent";

    ctx.ui.setStatus("cl-engineering", ctx.ui.theme.fg(color, status));
    updatePowerbarSegment(pi, state);
    ctx.ui.setWorkingMessage(`Clarity Engineering: ${label}${detail ? ` · ${detail}` : ""}`);
  };

  const setState = (ctx: ExtensionContext, next: ClarityState, persist = true) => {
    state = next;
    updateStatus(ctx);
    if (persist) persistState();
  };

  for (const mode of modes) {
    pi.registerCommand(mode.command, {
      description: `${mode.argumentHint} — ${mode.description}`,
      handler: async (args, ctx) => runMode(pi, ctx, mode, args, setState),
    });
  }

  pi.registerCommand("cl-state", {
    description: "Show or set Clarity Engineering status: route|setup|shape|plan-slice|plan-specify|build|review|compound|approval|blocked|idle [detail]",
    handler: async (args, ctx) => {
      const [rawStage, ...detailParts] = args.trim().split(/\s+/).filter(Boolean);
      if (!rawStage) {
        const current = state ? `${STAGE_LABELS[state.stage]}${state.detail ? ` · ${state.detail}` : ""}` : "Idle";
        ctx.ui.notify(`Clarity Engineering status: ${current}`, "info");
        updateStatus(ctx);
        return;
      }

      const stage = normalizeClarityStage(rawStage);
      if (!stage) {
        ctx.ui.notify("Usage: /cl-state route|setup|shape|plan-slice|plan-specify|build|review|compound|approval|blocked|idle [detail]", "error");
        return;
      }

      setState(ctx, { stage, detail: detailParts.join(" ") || undefined });
    },
  });

  pi.registerTool({
    name: "cl_engineering_state",
    label: "Clarity State",
    description: "Update the Clarity Engineering lifecycle status shown in Pi's footer/status bar.",
    promptSnippet: "Update the visible Clarity Engineering status bar stage.",
    promptGuidelines: [
      "Use cl_engineering_state when a Clarity Engineering command routes to a specific lifecycle stage, moves from Plan Slice to Plan Specify, reaches an approval gate, or becomes blocked.",
      "Keep cl_engineering_state.detail short; it is displayed in the status bar.",
    ],
    parameters: stateSchema,
    async execute(_toolCallId, params: StateToolInput, _signal, _onUpdate, ctx) {
      const stage = normalizeClarityStage(params.stage);
      if (!stage) {
        throw new Error(`Unsupported Clarity stage: ${params.stage}`);
      }

      setState(ctx, { stage, detail: params.detail });
      return {
        content: [
          {
            type: "text",
            text: `Clarity Engineering status set to ${STAGE_LABELS[stage]}${params.detail ? ` · ${params.detail}` : ""}.`,
          },
        ],
        details: { state },
      };
    },
  });

  pi.on("session_start", async (_event, ctx) => {
    lastCtx = ctx;
    registerPowerbarSegment(pi);
    state = restoreState(ctx) ?? state;
    updateStatus(ctx);
  });

  pi.on("agent_start", async (_event, ctx) => {
    if (state && state.stage !== "idle") updateStatus(ctx);
  });

  pi.on("agent_end", async (_event, ctx) => {
    if (state && state.stage !== "idle") updateStatus(ctx);
  });

  pi.on("session_shutdown", async () => {
    updatePowerbarSegment(pi, undefined);
    if (lastCtx) {
      lastCtx.ui.setWorkingMessage();
    }
  });
}

function registerPowerbarSegment(pi: ExtensionAPI) {
  pi.events?.emit?.("powerbar:register-segment", {
    id: POWERBAR_SEGMENT_ID,
    label: "Clarity Engineering",
  });
}

function updatePowerbarSegment(pi: ExtensionAPI, state: ClarityState | undefined) {
  if (!state || state.stage === "idle") {
    pi.events?.emit?.("powerbar:update", {
      id: POWERBAR_SEGMENT_ID,
      text: undefined,
    });
    return;
  }

  const label = STAGE_LABELS[state.stage];
  const detail = state.detail?.trim();
  const color = state.stage === "blocked" ? "error" : state.stage === "approval" ? "warning" : "accent";

  pi.events?.emit?.("powerbar:update", {
    id: POWERBAR_SEGMENT_ID,
    text: detail ? `${label} · ${detail}` : label,
    icon: "🧭 CL",
    color,
  });
}

function runMode(
  pi: ExtensionAPI,
  ctx: ExtensionCommandContext,
  mode: Mode,
  args: string,
  setState: (ctx: ExtensionContext, next: ClarityState, persist?: boolean) => void,
) {
  setState(ctx, { stage: mode.stage });

  const input = args.trim();
  const prompt = buildPrompt(mode, input);

  if (ctx.isIdle()) {
    pi.sendUserMessage(prompt);
    return;
  }

  pi.sendUserMessage(prompt, { deliverAs: "followUp" });
  ctx.ui.notify(`Queued /${mode.command} as follow-up`, "info");
}

function buildPrompt(mode: Mode, input: string): string {
  return [
    `Use the \`${mode.skill}\` skill to process this request.`,
    `Follow Clarity Engineering: ${LIFECYCLE}. ${PLAN}.`,
    mode.instruction,
    OPERATOR_PROGRESS,
    APPROVAL_GATE,
    "Stages are context-aware: resolve ticket/PR/branch/diff/test/user-request intent, classify depth at Build entry, check session state and resume if it exists, proceed autonomously through safe work.",
    "Escalate only when a trigger fires: intent ambiguity, scope conflict, product/UX decision, architecture risk, validation challenge, unauthorized external mutation, or completion. Ask one focused question per escalation.",
    "Keep the Pi status bar accurate by using the `cl_engineering_state` tool when you route/select a lifecycle stage, move from Plan Slice to Plan Specify, classify depth, detect drift, publish a PR, compound learnings, become blocked, or complete/clear Clarity mode.",
    "Ask one focused question when human judgement is needed.",
    "",
    "<input>",
    input || "No explicit input was provided. Ask one focused question to gather the missing context.",
    "</input>",
  ].join("\n");
}

function restoreState(ctx: ExtensionContext): ClarityState | undefined {
  const entry = ctx.sessionManager
    .getEntries()
    .filter((e: { type: string; customType?: string }) => e.type === "custom" && e.customType === "cl-engineering-state")
    .pop() as { data?: ClarityState } | undefined;

  if (entry?.data && isClarityStage(entry.data.stage)) {
    return {
      stage: entry.data.stage,
      detail: typeof entry.data.detail === "string" ? entry.data.detail : undefined,
    };
  }

  return undefined;
}

function normalizeClarityStage(value: string): ClarityStage | undefined {
  const normalized =
    value === "Plan: Slice"
      ? "plan-slice"
      : value === "Plan: Specify"
        ? "plan-specify"
        : (value.toLowerCase() as ClarityStage);

  return isClarityStage(normalized) ? normalized : undefined;
}

function isClarityStage(value: string): value is ClarityStage {
  return Object.prototype.hasOwnProperty.call(STAGE_LABELS, value);
}
