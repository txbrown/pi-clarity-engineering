import type { ExtensionAPI, ExtensionCommandContext } from "@mariozechner/pi-coding-agent";

type Mode = {
  command: string;
  skill: string;
  description: string;
  argumentHint: string;
  instruction: string;
};

const LIFECYCLE = "Shape → Plan → Build → Review → Compound";
const PLAN = "Plan = Slice + Specify";
const OPERATOR_PROGRESS =
  "Make operator progress explicit with `Done`, `Left`, `Blocked`, and readiness for the next stage.";

const modes: Mode[] = [
  {
    command: "cl-engineering",
    skill: "cl-engineering",
    description: "Route work through Clarity Engineering",
    argumentHint: "[request, ticket, plan, diff, or context]",
    instruction: "Route this request to Shape, Plan, Build, Review, or Compound, then apply the selected mode.",
  },
  {
    command: "cl-shape",
    skill: "cl-shape",
    description: "Shape an idea into Clarity Engineering tickets",
    argumentHint: "[idea, problem, or request]",
    instruction: "Apply Shape mode. Create clarity before delivery with shaped tickets and useful supporting artefacts.",
  },
  {
    command: "cl-plan",
    skill: "cl-plan",
    description: "Plan shaped work with Slice + Specify",
    argumentHint: "[ticket, request, or shaped context]",
    instruction: `Apply Plan mode. ${PLAN}. Produce ordered vertical slices, then acceptance details for the selected next slice. Do not define the first failing test.`,
  },
  {
    command: "cl-build",
    skill: "cl-build",
    description: "Build a slice TDD-first",
    argumentHint: "[slice, acceptance details, or task]",
    instruction: "Apply Build mode. Translate acceptance details into the first failing behavior test, implement the smallest useful behavior, run checks, and refactor while green.",
  },
  {
    command: "cl-review",
    skill: "cl-review",
    description: "Review against shaped intent first",
    argumentHint: "[diff, PR, design, or implementation context]",
    instruction: "Apply Review mode. Check correctness against shaped intent first, then tests, types/states, boundaries, experience, docs, and risk. Output approve/request-changes/blocked/rescope.",
  },
  {
    command: "cl-compound",
    skill: "cl-compound",
    description: "Decide whether learning should be codified",
    argumentHint: "[completed work, decision, or learning]",
    instruction: "Apply Compound mode. Always output a compounding decision: codify learning or no reusable learning.",
  },
];

export default function clarityEngineeringExtension(pi: ExtensionAPI) {
  for (const mode of modes) {
    pi.registerCommand(mode.command, {
      description: `${mode.argumentHint} — ${mode.description}`,
      handler: async (args, ctx) => runMode(pi, ctx, mode, args),
    });
  }

  pi.on("session_start", async (_event, ctx) => {
    ctx.ui.setStatus("clarity", "Clarity Engineering /cl-* commands loaded");
  });
}

function runMode(pi: ExtensionAPI, ctx: ExtensionCommandContext, mode: Mode, args: string) {
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
    "Ask one focused question when human judgement is needed.",
    "",
    "<input>",
    input || "No explicit input was provided. Ask one focused question to gather the missing context.",
    "</input>",
  ].join("\n");
}
