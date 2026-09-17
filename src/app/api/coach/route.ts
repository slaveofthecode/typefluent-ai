import { NextRequest } from "next/server";
import { createProvider } from "@/lib/llm";
import { SYSTEM_PROMPT } from "@/lib/coach/prompt";
import { VERIFY_SYSTEM_PROMPT } from "@/lib/coach/verify-prompt";

export const runtime = "nodejs";

type CoachStage = "analyze" | "verify";

interface CoachRequest {
  stage?: CoachStage;
  content?: string;
  original?: string;
  rewrite?: string;
  feedback?: string;
}

interface CoachMessages {
  system: string;
  user: string;
}

function buildMessages(body: CoachRequest): CoachMessages {
  if (body.stage === "verify") {
    const original = body.original?.trim();
    const rewrite = body.rewrite?.trim();
    const feedback = body.feedback?.trim();
    if (!original || !rewrite || !feedback) {
      return {
        system: VERIFY_SYSTEM_PROMPT,
        user: "",
      };
    }
    return {
      system: VERIFY_SYSTEM_PROMPT,
      user: `Here is the context for you to verify the learner's rewrite:

--- Original writing ---
${original}

--- Your previous feedback ---
${feedback}

--- The learner's rewrite ---
${rewrite}

Please verify the rewrite against your previous feedback, point by point.`,
    };
  }

  const content = body.content?.trim() ?? "";
  if (!content) {
    return { system: SYSTEM_PROMPT, user: "" };
  }
  return {
    system: SYSTEM_PROMPT,
    user: `Here is my written response for you to analyze and coach me on:\n\n${content}`,
  };
}

export async function POST(req: NextRequest) {
  let body: CoachRequest;
  try {
    body = (await req.json()) as CoachRequest;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { system, user } = buildMessages(body);
  if (!user) {
    return new Response(
      JSON.stringify({
        error:
          body.stage === "verify"
            ? "original, rewrite and feedback are required for verification."
            : "A written response is required.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const provider = createProvider();

  const responseStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(`data: {"type":"start"}\n\n`));
      try {
        for await (const chunk of provider.stream(
          [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
          true,
        )) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "token", text: chunk })}\n\n`),
          );
        }
        controller.enqueue(encoder.encode(`data: {"type":"done"}\n\n`));
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "error", error: message })}\n\n`),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(responseStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
