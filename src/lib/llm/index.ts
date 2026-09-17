import { OllamaProvider } from "./ollama";
import type { LLMProvider } from "./provider";

export type { LLMMessage, LLMProvider } from "./provider";
export { OllamaProvider } from "./ollama";

/**
 * Default model used by the local provider.
 * This is a runtime configuration concern (ADR #002), not an architectural
 * decision: users may configure it through an environment variable.
 */
const DEFAULT_MODEL = process.env.LLM_MODEL ?? "llama3.2";

const DEFAULT_OLLAMA_URL = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";

/**
 * Build the configured local LLM provider.
 * Currently the only provider is Ollama; the provider abstraction keeps the
 * rest of the app agnostic to this choice.
 */
export function createProvider(): LLMProvider {
  return new OllamaProvider({
    model: DEFAULT_MODEL,
    baseUrl: DEFAULT_OLLAMA_URL,
  });
}
