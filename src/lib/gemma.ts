/**
 * Detect the best query mode for a user message:
 * - "search"   → needs real-time web data (deadlines, jobs, notifications)
 * - "thinking" → needs deep multi-step reasoning (career plans, eligibility)
 * - "standard" → normal factual Q&A
 */
export function detectQueryMode(
  userMessage: string
): "thinking" | "search" | "standard" {
  const msg = userMessage.toLowerCase();

  const searchKeywords = [
    "deadline", "last date", "apply now", "currently", "this year",
    "2024", "2025", "2026", "today", "latest", "new scheme", "recent",
    "job opening", "vacancy", "notification", "admit card", "result",
    "cut off", "cutoff", "registration open", "application open",
    "sarkari", "exam date", "syllabus",
  ];

  const thinkingKeywords = [
    "career path", "roadmap", "plan", "strategy", "which is better",
    "should i", "compare", "eligibility", "qualify", "step by step",
    "how to become", "guide me", "advise", "recommend", "what should",
    "help me decide", "pros and cons", "difference between", "best option",
    "future scope", "after 12th", "after graduation", "study plan",
    "preparation plan",
  ];

  if (searchKeywords.some((kw) => msg.includes(kw))) return "search";
  if (thinkingKeywords.some((kw) => msg.includes(kw))) return "thinking";
  return "standard";
}
