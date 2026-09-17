export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMProvider {
  /**
   * Request a completion from the local language model.
   *
   * @param messages     The conversation to send to the model.
   * @param stream       Whether to yield tokens as they are produced.
   * @returns An async iterable of text chunks. When `stream` is false, a
   *          single chunk containing the full response is returned.
   */
  stream(messages: LLMMessage[], stream?: boolean): AsyncIterable<string>;
}
