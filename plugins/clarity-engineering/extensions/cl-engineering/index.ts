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
};

const STAGE_LABELS: Record<ClarityStage, string> = {
  route: "Routing",
  setup: "Setup",
  shape: "Shape",
  "plan-slice": "Plan: Slice",
  "plan-specify": "Plan: Specify",
  build: "Build",
  review: "Review",
  compound: "Compound",
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
  },
  {
    command: "cl-setup",
    skill: "cl-setup",
    stage: "setup",
    label: "Setup",
    description: "Discover minimum Clarity Engineering repository setup",
    argumentHint: "[repository workflow question]",
  },
  {
    command: "cl-shape",
    skill: "cl-shape",
    stage: "shape",
    label: "Shape",
    description: "Clarify intent and boundaries",
    argumentHint: "[idea, problem, or request]",
  },
  {
    command: "cl-plan",
    skill: "cl-plan",
    stage: "plan-slice",
    label: "Plan",
    description: "Plan shaped work with Slice + Specify",
    argumentHint: "[ticket, request, or shaped context]",
  },
  {
    command: "cl-build",
    skill: "cl-build",
    stage: "build",
    label: "Build",
    description: "Implement clear work with proportional evidence",
    argumentHint: "[slice, ticket, bug, or task]",
  },
  {
    command: "cl-review",
    skill: "cl-review",
    stage: "review",
    label: "Review",
    description: "Review work against intent and evidence",
    argumentHint: "[diff, PR, or implementation context]",
  },
  {
    command: "cl-compound",
    skill: "cl-compound",
    stage: "compound",
    label: "Compound",
    description: "Capture proven reusable learning",
    argumentHint: "[completed work, decision, or learning]",
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
    const color = state.stage === "blocked" ? "error" : "accent";

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
    description: "Show or set Clarity Engineering status: route|setup|shape|plan-slice|plan-specify|build|review|compound|blocked|idle [detail]",
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
        ctx.ui.notify("Usage: /cl-state route|setup|shape|plan-slice|plan-specify|build|review|compound|blocked|idle [detail]", "error");
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
      "Commands set their initial stage automatically. Use cl_engineering_state only when Plan moves to Specify, work becomes blocked, or Clarity mode should be cleared.",
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
  const color = state.stage === "blocked" ? "error" : "accent";

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
    `Use the \`${mode.skill}\` skill for this request.`,
    "",
    "<input>",
    input || "No input was provided. Ask one focused question for the missing context.",
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
