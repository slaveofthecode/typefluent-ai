<!-- How TypeFluentAI is being built : cómo lo estamos construyendo -->

# TypeFluentAI - Implementation Roadmap

## Purpose

This document defines the concrete implementation steps for TypeFluentAI's first Web UI, based on the accepted architectural decisions (ADR #001-#004).

It translates the architecture and learning philosophy into an executable, ordered plan.

This document is a living roadmap: it will be updated as work progresses.

---

## Milestone M1 — Web UI (First Prototype)

**Goal:** A self-hosted full-stack Next.js application where a user completes a full Learning Loop with a local LLM.

**Scope reference:** ADR #004 (Web UI replaces CLI), ADR #003 (single Learning Coach, one LLM call), ADR #002 (provider abstraction, Ollama).

---

### M1 Steps

#### Step 1 — Scaffold Next.js + TypeScript (Bun)

- Initialize a Next.js application with TypeScript in the `src/` directory.
- Keep the Bun runtime and lockfile.
- Set up full-stack structure: React UI + API routes in one project.
- Outcome: a runnable Next.js app (`bun run dev`).

#### Step 2 — Provider abstraction (Ollama)

- Define an `LLMProvider` interface with a streaming method.
- Implement `OllamaProvider` against the local Ollama HTTP API (`http://localhost:11434`).
- Keep the specific model as configuration (ADR #002), not an architectural concern.
- Place behind a clean module boundary so the learning engine never calls Ollama directly.

#### Step 3 — Learning Coach backend (`/api/coach`)

- Implement a Next.js API route that hosts the Learning Coach.
- The route receives the user's response and any relevant conversation state.
- It composes the Learning Coach system prompt encoding the Learning Loop behavior (analysis, feedback prioritization, encouragement, practice guidance).
- It calls the provider abstraction once (ADR #003) and streams the response back to the browser.
- Outcome: `/api/coach` streams a coaching response for a given user input.

#### Step 4 — React UI (the Learning Loop)

- Build the UI screens that walk the user through the loop:
  - **Prompt** — display the writing challenge. ✅
  - **Write** — textarea for the user's response. ✅
  - **Analyze / Understand** — render streamed AI feedback. ✅
  - **Rewrite** — textarea to reconstruct the improved version. ✅ (empty by design; the learner types their improved version from scratch)
  - **Verify** — after submitting the rewrite, the Coach compares it against its previous feedback and confirms applied/remaining corrections. ✅ (one LLM call per stage, ADR #005)
  - **Practice** — guided rewriting of corrected sentences. ⏳ (future M1+ work — not yet implemented)
  - **Progress** — acknowledgment of improvement. ✅ (in-session acknowledgment within Verify; persistent tracking is M2)
- Keep it minimal (validate learning behavior) and avoid premature complexity (AGENT_GUIDELINES section 6).

#### Step 5 — Validate & document self-host setup

- Verify a full Learning Loop runs end-to-end with Bun + Next dev server + local Ollama.
- Confirm the app satisfies: "Does the code do what it was supposed to do, without errors?" (AGENT_GUIDELINES section 8).
- Write self-host setup instructions (clone, install, run Ollama, run dev server).

---

### M1 Non-Goals

- No multi-agent orchestration (retained for a later milestone; ADR #003).
- No account system, authentication, or cloud deployment.
- No gamification or spaced repetition.
- No persistence of learning history yet (local storage, if any, is out of M1 scope).
- No standalone Practice stage yet (guided rewriting of corrected sentences).

---

## M1 Status Update — Stage Pattern

The Learning Loop in M1 now follows ADR #005: **one LLM call per stage**, each backed by its own system prompt. Current stages: `analyze` (existing) and `verify` (added). Future stages such as `practice` should follow the same pattern.

---

## Milestone M2 — Learning Persistence & Progress (Planned)

- Store learning history and progress locally.
- Recognize repeated-mistake improvement and show progress over time.
- Introduce a simple learning memory.

## Milestone M3 — Internal Agents (Planned)

- Decompose the Learning Coach into specialized internal agents only when a demonstrated responsibility justifies it (ADR #003).
- Candidates: Grammar Analysis, Vocabulary, Correction Prioritization, Progress Tracking, Exercise Generation.

## Milestone M4 — Content & Learning Paths (Planned)

- Introduce structured learning content (interviews, standups, technical writing) and Learning Paths.

---

## Guiding Constraints

- **Local AI First / Privacy by Design:** no cloud API, no telemetry, no external data transmission.
- **Document before implementing:** any change affecting an architectural layer must be documented before code.
- **Simplicity:** implement the simplest solution that satisfies the task.
- **Validation:** verify code runs and behaves correctly before marking complete.

---

# Status

Version: 1.0

Status: Draft

This document is part of the TypeFluentAI Harness and guides the ordered implementation of the Web UI prototype.
