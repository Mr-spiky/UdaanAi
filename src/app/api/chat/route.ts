import { streamText, appendResponseMessages } from "ai";
import { detectQueryMode } from "@/lib/gemma";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { buildMentorSystemPrompt } from "@/lib/prompts/mentor";
import { getRelevantSchemes, getSchemesContextForAI } from "@/lib/knowledge/schemes";
import { getJobsContextForAI } from "@/lib/knowledge/jobs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// ── Stable free-tier models on OpenRouter (standard OpenAI SSE format) ────────
const OPENROUTER_FREE_MODELS = [
  "openai/gpt-oss-20b:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
];

function buildOpenRouterProvider() {
  if (!process.env.OPENROUTER_API_KEY) return null;
  return createOpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
      "HTTP-Referer": "https://udaan-ai.vercel.app",
      "X-Title": "Udaan AI",
    },
  });
}

function buildGoogleProvider() {
  if (!process.env.GOOGLE_AI_API_KEY) return null;
  return createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_AI_API_KEY });
}

/**
 * Build an ordered list of models to try. Uses PREFERRED_PROVIDER to
 * decide the ordering: preferred models first, fallbacks at the end.
 */
function getModelQueue() {
  const preferred = process.env.PREFERRED_PROVIDER || "google";
  const orProvider = buildOpenRouterProvider();
  const gProvider = buildGoogleProvider();

  const orModels = orProvider
    ? OPENROUTER_FREE_MODELS.map((id) => ({ label: id, model: orProvider(id) as any }))
    : [];

  const googleModel = gProvider
    ? [{ label: "google/gemini-2.0-flash", model: gProvider("gemini-2.0-flash") as any }]
    : [];

  if (preferred === "openrouter") {
    return [...orModels, ...googleModel];
  }
  return [...googleModel, ...orModels];
}

export async function POST(req: Request) {
  try {
    const {
      messages,
      conversationId,
      documentContext,
    }: {
      messages: any[];
      conversationId?: string;
      documentContext?: string;
    } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ── Auth & profile ────────────────────────────────────────────────────
    const session = await getSession();
    let userProfile = null;
    if (session?.userId) {
      userProfile = await prisma.userProfile.findUnique({
        where: { userId: session.userId },
      });
    }

    // ── Query mode & knowledge context ────────────────────────────────────
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const lastUserText =
      typeof lastUserMessage?.content === "string"
        ? lastUserMessage.content
        : Array.isArray(lastUserMessage?.content)
        ? lastUserMessage.content
            .filter((p: any) => p.type === "text")
            .map((p: any) => p.text)
            .join(" ")
        : "";

    const queryMode = detectQueryMode(lastUserText);

    const relevantSchemes = userProfile
      ? getRelevantSchemes({
          education: userProfile.education,
          category: userProfile.category,
          annualIncome: userProfile.annualIncome,
          state: userProfile.state,
        })
      : [];

    const schemesContext = getSchemesContextForAI(relevantSchemes);
    const jobsContext = getJobsContextForAI(lastUserText);

    const systemPrompt =
      buildMentorSystemPrompt(userProfile || undefined) +
      (schemesContext ? `\n\n${schemesContext}` : "") +
      `\n\n${jobsContext}` +
      (documentContext
        ? `\n\n## 📄 Uploaded Document\nThe user has uploaded a document. Answer all questions based on the extracted text below:\n\n${documentContext.slice(0, 50_000)}\n\n(End of document)`
        : "");

    const messagesWithSystem = [
      { role: "system" as const, content: systemPrompt },
      ...messages,
    ];

    // ── Persist conversation callback ─────────────────────────────────────
    const handlePersistConversation = async ({ response }: any) => {
      if (!session?.userId || !conversationId) return;
      try {
        const allMessages = appendResponseMessages({
          messages: [...messages],
          responseMessages: response.messages || [],
        });
        const firstUserMsg = messages.find((m) => m.role === "user");
        const firstText =
          typeof firstUserMsg?.content === "string"
            ? firstUserMsg.content
            : Array.isArray(firstUserMsg?.content)
            ? firstUserMsg.content
                .filter((p: any) => p.type === "text")
                .map((p: any) => p.text)
                .join(" ")
            : "New Conversation";
        const autoTitle = firstText.slice(0, 60) + (firstText.length > 60 ? "…" : "");
        await prisma.conversation.update({
          where: { id: conversationId, userId: session.userId },
          data: { messages: JSON.stringify(allMessages), title: autoTitle },
        });
      } catch (err) {
        console.error("[Failed to persist conversation]", err);
      }
    };

    // ── Get ordered model queue ───────────────────────────────────────────
    const modelQueue = getModelQueue();

    if (modelQueue.length === 0) {
      return new Response(
        JSON.stringify({
          error:
            "No AI API key configured. Please add GOOGLE_AI_API_KEY or OPENROUTER_API_KEY to your .env file.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // ── Try each model in order until one works ───────────────────────────
    let lastError: any = null;

    for (let i = 0; i < modelQueue.length; i++) {
      const { label, model } = modelQueue[i];
      console.log(`[Chat] Trying model [${i + 1}/${modelQueue.length}]: ${label}`);

      try {
        const result = streamText({
          model,
          messages: messagesWithSystem,
          maxTokens: 4_000,
          onError: (err: any) => {
            console.warn(`[Chat] onError for ${label}:`, err?.error || err);
          },
          onFinish: handlePersistConversation,
        });

        const dataStreamResponse = result.toDataStreamResponse();
        if (!dataStreamResponse.body) throw new Error("Empty response body");

        // Read first chunk to detect silent API error chunks
        const reader = dataStreamResponse.body.getReader();
        const { value: firstChunk } = await reader.read();
        const firstText = firstChunk ? new TextDecoder().decode(firstChunk) : "";

        if (firstText.startsWith("3:")) {
          // AI SDK error chunk — try next model
          reader.releaseLock();
          console.warn(`[Chat] ${label} returned error chunk: ${firstText.trim()} — trying next model`);
          lastError = new Error(firstText.trim());
          continue;
        }

        // ✅ Success — forward the full stream
        console.log(`[Chat] ✅ Streaming with: ${label}`);
        const responseHeaders = new Headers({
          "Content-Type": "text/plain; charset=utf-8",
          "X-Vercel-AI-Data-Stream": "v1",
          "X-Gemma-Mode": queryMode,
          "X-Gemma-Provider": label,
        });

        const forwardStream = new ReadableStream({
          async start(controller) {
            if (firstChunk) controller.enqueue(firstChunk);
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                controller.enqueue(value);
              }
              controller.close();
            } catch (err) {
              controller.error(err);
            } finally {
              reader.releaseLock();
            }
          },
        });

        return new Response(forwardStream, {
          status: dataStreamResponse.status,
          headers: responseHeaders,
        });
      } catch (err: any) {
        console.warn(`[Chat] ${label} threw:`, err?.message || err);
        lastError = err;
        // Continue to next model
      }
    }

    // All models failed
    console.error("[Chat] All models exhausted. Last error:", lastError);
    return new Response(
      JSON.stringify({
        error:
          "All AI providers are currently unavailable (rate limits or errors). Please try again in a few moments.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("[Chat API fatal error]", error);
    return new Response(
      JSON.stringify({
        error: error?.message || "An unexpected error occurred. Please try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export const maxDuration = 60;
