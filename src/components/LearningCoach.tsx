"use client";

import type React from "react";
import { useRef, useState } from "react";
import { WRITING_PROMPTS } from "@/lib/coach/prompts";
import Markdown from "./Markdown";

type CoachStatus = "idle" | "streaming" | "done" | "error";

async function fetchCoach(
  body: Record<string, unknown>,
  signal: AbortSignal,
  onToken: (text: string) => void,
): Promise<boolean> {
  const res = await fetch("/api/coach", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok || !res.body) {
    const detail = await res.text();
    throw new Error(detail || `Request failed (${res.status})`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let receivedAny = false;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf("\n\n")) !== -1) {
      const raw = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 2);
      for (const line of raw.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        let payload: { type?: string; text?: string; error?: string };
        try {
          payload = JSON.parse(trimmed.slice(5).trim());
        } catch {
          continue;
        }
        if (payload.type === "token" && payload.text) {
          receivedAny = true;
          onToken(payload.text);
        } else if (payload.type === "error") {
          throw new Error(payload.error || "Coach failed.");
        } else if (payload.type === "done") {
          break;
        }
      }
    }
  }

  return receivedAny;
}

export default function LearningCoach() {
  const [selectedId, setSelectedId] = useState<string>(WRITING_PROMPTS[0].id);
  const [userText, setUserText] = useState("");
  const [coachText, setCoachText] = useState("");
  const [status, setStatus] = useState<CoachStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [rewriteText, setRewriteText] = useState("");
  const [verifyText, setVerifyText] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<CoachStatus>("idle");
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const selectedPrompt =
    WRITING_PROMPTS.find((p) => p.id === selectedId) ?? WRITING_PROMPTS[0];

  async function handleSubmit() {
    const content = userText.trim();
    if (!content || status === "streaming") return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setCoachText("");
    setError(null);
    setStatus("streaming");
    setRewriteText("");
    setVerifyText(null);
    setVerifyError(null);
    setVerifyStatus("idle");

    try {
      const receivedAny = await fetchCoach(
        { content },
        controller.signal,
        (text) => setCoachText((prev) => prev + text),
      );
      setStatus(receivedAny ? "done" : "error");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setStatus("error");
    }
  }

  async function handleVerifySubmit() {
    const rewrite = rewriteText.trim();
    if (!rewrite || verifyStatus === "streaming") return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setVerifyText("");
    setVerifyError(null);
    setVerifyStatus("streaming");

    try {
      const receivedAny = await fetchCoach(
        {
          stage: "verify",
          original: userText,
          rewrite,
          feedback: coachText,
        },
        controller.signal,
        (text) => setVerifyText((prev) => (prev ?? "") + text),
      );
      setVerifyStatus(receivedAny ? "done" : "error");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      const message = err instanceof Error ? err.message : String(err);
      setVerifyError(message);
      setVerifyStatus("error");
    }
  }

  function handleNewPrompt() {
    abortRef.current?.abort();
    setUserText("");
    setCoachText("");
    setError(null);
    setStatus("idle");
    setRewriteText("");
    setVerifyText(null);
    setVerifyError(null);
    setVerifyStatus("idle");
  }

  const promptOptions = WRITING_PROMPTS.map((p) => (
    <option key={p.id} value={p.id}>
      {p.title}
    </option>
  ));

  return (
    <div style={{ display: "grid", gap: 20 }}>
      {/* Stage 1 — Prompt */}
      <section className="card">
        <h2>1 · Prompt</h2>
        <label style={{ fontSize: ".85rem", color: "var(--muted)" }} htmlFor="prompt-select">
          Choose a writing challenge
        </label>
        <select
          id="prompt-select"
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            handleNewPrompt();
          }}
          style={inputStyle}
        >
          {promptOptions}
        </select>
        <p style={{ marginTop: 10, color: "var(--text)" }}>{selectedPrompt.instruction}</p>
      </section>

      {/* Stage 2 — Write */}
      <section className="card">
        <h2>2 · Write your response</h2>
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="Write your answer here..."
          rows={6}
          disabled={status === "streaming"}
          style={{ ...inputStyle, width: "100%", resize: "vertical", fontFamily: "inherit" }}
        />
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button
            onClick={handleSubmit}
            disabled={status === "streaming" || !userText.trim()}
            className="btn btn-primary"
          >
            {status === "streaming" ? "Coaching…" : "Get coaching"}
          </button>
          <button onClick={handleNewPrompt} className="btn btn-ghost">
            New prompt
          </button>
        </div>
      </section>

      {/* Stage 3 — Coach feedback (Analyze / Understand) */}
      {(status === "streaming" || status === "done" || status === "error") && (
        <section className="card">
          <h2>{status === "streaming" ? "3 · Coaching…" : "3 · Coach feedback"}</h2>
          {error && (
            <p style={{ color: "#f87171", marginTop: 8 }}>
              {error} — Is Ollama running? Start it and try again.
            </p>
          )}
          {coachText && (
            <div style={{ marginTop: 12, lineHeight: 1.7 }}>
              <Markdown text={coachText} />
              {status === "streaming" && (
                <span style={{ color: "var(--primary)" }}>▌</span>
              )}
            </div>
          )}
        </section>
      )}

      {/* Stage 4 — Rewrite */}
      {status === "done" && (
        <section className="card">
          <h2>4 · Rewrite</h2>
          <p style={{ fontSize: ".85rem", color: "var(--muted)", marginTop: 4 }}>
            Now rewrite your improved version applying the coach's feedback.
          </p>
          <textarea
            value={rewriteText}
            onChange={(e) => setRewriteText(e.target.value)}
            placeholder="Type your improved version here..."
            rows={6}
            disabled={verifyStatus === "streaming"}
            style={{ ...inputStyle, width: "100%", resize: "vertical", fontFamily: "inherit" }}
          />
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button
              onClick={handleVerifySubmit}
              disabled={verifyStatus === "streaming" || !rewriteText.trim()}
              className="btn btn-primary"
            >
              {verifyStatus === "streaming" ? "Verifying…" : "Check my rewrite"}
            </button>
          </div>
        </section>
      )}

      {/* Stage 5 — Coach verification (Verify) */}
      {(verifyStatus === "streaming" || verifyStatus === "done" || verifyStatus === "error") && (
        <section className="card">
          <h2>{verifyStatus === "streaming" ? "5 · Verifying…" : "5 · Coach verification"}</h2>
          {verifyError && (
            <p style={{ color: "#f87171", marginTop: 8 }}>
              {verifyError} — Is Ollama running? Start it and try again.
            </p>
          )}
          {verifyText && (
            <div style={{ marginTop: 12, lineHeight: 1.7 }}>
              <Markdown text={verifyText} />
              {verifyStatus === "streaming" && (
                <span style={{ color: "var(--primary)" }}>▌</span>
              )}
            </div>
          )}
          {verifyStatus === "done" && (
            <div style={{ marginTop: 14 }}>
              <button onClick={handleNewPrompt} className="btn btn-ghost">
                New prompt
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--bg-soft)",
  border: "1px solid var(--line)",
  borderRadius: 10,
  color: "var(--text)",
  padding: "10px 12px",
  fontSize: "1rem",
  marginTop: 8,
};