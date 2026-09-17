import type { LLMMessage, LLMProvider } from "./provider";

export interface OllamaConfig {
  baseUrl?: string;
  model: string;
}

const DEFAULT_BASE_URL = "http://localhost:11434";

function toOllamaMessages(messages: LLMMessage[]) {
  return messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));
}

export class OllamaProvider implements LLMProvider {
  constructor(private readonly config: OllamaConfig) {}

  async *stream(messages: LLMMessage[], stream = true): AsyncIterable<string> {
    const baseUrl = (this.config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.config.model,
        messages: toOllamaMessages(messages),
        stream,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(
        `Ollama request failed (${response.status}): ${detail || response.statusText}`,
      );
    }

    if (!stream) {
      const data = (await response.json()) as { message?: { content?: string } };
      yield data.message?.content ?? "";
      return;
    }

    if (!response.body) {
      throw new Error("Ollama returned an empty streaming body.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);
          if (!line) continue;

          let parsed: { message?: { content?: string } | string; error?: string };
          try {
            parsed = JSON.parse(line);
          } catch {
            continue;
          }

          if (parsed.error) {
            throw new Error(parsed.error);
          }

          let content: string | undefined;
          if (parsed.message && typeof parsed.message === "object") {
            content = parsed.message.content;
          } else if (typeof parsed.message === "string") {
            content = parsed.message;
          }

          if (content) yield content;
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
