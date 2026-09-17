/**
 * Initial writing prompts for the Learning Loop.
 *
 * Per the Learning Philosophy, learning content is separate from the learning
 * engine. These prompt challenges have a clear learning objective. They will
 * eventually become structured Learning Paths; for the M1 prototype we keep a
 * small curated set.
 */

export interface WritingPrompt {
  id: string;
  title: string;
  instruction: string;
}

export const WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: "tell-me-about-yourself",
    title: "Tell me about yourself",
    instruction:
      "Write 4–6 sentences introducing yourself in a professional context: who you are, what you do, and one thing you are currently learning or working on.",
  },
  {
    id: "describe-your-role",
    title: "Describe your current role",
    instruction:
      "Describe your current job or role in 4–6 sentences. What do you do day to day, and what is one challenge you regularly face?",
  },
  {
    id: "explain-a-concept",
    title: "Explain a technical concept",
    instruction:
      "Pick a technical concept you know well and explain it in simple English to a non-expert, in 4–6 sentences.",
  },
  {
    id: "daily-standup",
    title: "A response for a daily standup",
    instruction:
      "Write how you would report in a daily standup today: what you did, what you will do next, and any blockers.",
  },
];
