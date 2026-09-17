<p align="center">
  <img src="assets/logo.png" width="220" alt="TypeFluentAI Logo">
</p>

<h1 align="center">TypeFluentAI</h1>

<p align="center">
  <strong>Learn English by Writing.</strong>
</p>

<p align="center">
  A Local AI-powered English Writing Coach · Open Source · Self-Hosted
</p>

<p align="center">
  <a href="https://github.com/slaveofthecode/typefluent-ai"><img alt="GitHub" src="https://img.shields.io/badge/source-github-181717?logo=github"></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-blue"></a>
  <a href="https://github.com/slaveofthecode/typefluent-ai/blob/main/.harness/core/ARCHITECTURAL_DECISIONS.md"><img alt="ADR" src="https://img.shields.io/badge/decisions-ADR-log"></a>
</p>

---

TypeFluentAI is an open-source Local AI project designed to help people improve their written English through **active learning** instead of passive correction.

Unlike traditional AI chatbots that simply rewrite your text, TypeFluentAI encourages you to think, write, understand your mistakes, rewrite your own answers and learn through deliberate practice.

Although the initial focus is on software engineers and IT professionals, the learning model is designed to be applicable to anyone who wants to become a more confident English writer.

---

## Why TypeFluentAI?

Most AI tools optimize **productivity**.

TypeFluentAI optimizes **learning**.

The objective is not to generate better English for the user.

The objective is to help the user write better English **by themselves**.

---

## The Learning Loop

The fundamental unit of TypeFluentAI is the **Learning Loop**, a deliberately designed sequence that guides the learner through practice:

```text
Prompt
  ↓
Write
  ↓
Analyze
  ↓
Understand
  ↓
Rewrite
  ↓
Practice
  ↓
Progress
```

- **Prompt** — the coach presents a meaningful writing challenge.
- **Write** — the user produces their own response, without being interrupted.
- **Analyze** — the coach prioritizes mistakes that offer real learning value.
- **Understand** — the user understands *why* an important correction matters.
- **Rewrite** — the user reconstructs the improved version themselves (never just accepts a fix).
- **Practice** — corrections become deliberate, active practice through typing.
- **Progress** — the user recognizes real improvement over time.

The AI is a teacher and a coach — it guides, explains, suggests and challenges. It never replaces the learner's thinking.

---

## Self-Hosted & Local AI First

TypeFluentAI is designed to run **entirely on your own machine or server**.

- The app is **open source** and self-hostable.
- The language model runs **locally** (initially via [Ollama](https://ollama.com)) on the machine where the app is deployed.
- Your writing, learning history and personal data stay with you.
- **No cloud API, no telemetry, no external data transmission** at runtime.

> Deploying as a public, managed service would be a separate architectural decision. The current model deliberately keeps everything local.

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (runtime)
- [Ollama](https://ollama.com) with a model pulled locally

### 1. Install and run Ollama

```bash
ollama pull llama3.2
ollama serve
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start the app

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

Pick a writing challenge, write your response, get coaching feedback, then rewrite your version and let the coach verify it.

### Configuration

All settings have local-safe defaults. To override them, copy `.env.example` to `.env.local` and adjust:

| Variable | Default | Description |
|----------|---------|-------------|
| `LLM_MODEL` | `llama3.2` | The Ollama model used by the Learning Coach. |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Base URL of the local Ollama API. |

### Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start the development server. |
| `build` | `next build` | Create a production build. |
| `start` | `next start` | Start the production server. |
| `typecheck` | `tsc --noEmit` | Type-check the codebase. |

---

## The Harness: Documentation as Source of Truth

The `.harness/` directory is the project's **long-term memory** and **single source of truth**.

Instead of keeping knowledge only inside AI conversations or the heads of contributors, every important architectural decision is documented here so that both developers and AI coding agents can reason consistently about the system.

> **Guiding principle:** *Every important architectural decision must be documented before implementation.*

The Harness intentionally contains **documentation instead of implementation**. It evolves together with the project.

### Core documents

| Document | Purpose |
|----------|---------|
| [`PROJECT_MANIFEST.md`](.harness/core/PROJECT_MANIFEST.md) | Mission, vision, problem, solution and non-goals. |
| [`LEARNING_PHILOSOPHY.md`](.harness/core/LEARNING_PHILOSOPHY.md) | How the system teaches: principles, loop, feedback strategy, motivation. |
| [`ARCHITECTURE.md`](.harness/core/ARCHITECTURE.md) | Agent-Oriented Architecture: the Learning Coach and internal agents. |
| [`ARCHITECTURAL_DECISIONS.md`](.harness/core/ARCHITECTURAL_DECISIONS.md) | The decision log (ADRs), the historical record of architectural evolution. |
| [`AGENT_GUIDELINES.md`](.harness/core/AGENT_GUIDELINES.md) | Rules governing AI coding agents that contribute to the codebase. |
| [`IMPLEMENTATION_ROADMAP.md`](.harness/core/IMPLEMENTATION_ROADMAP.md) | The ordered implementation plan: Web UI milestone and future milestones. |

---

## Architecture

TypeFluentAI follows an **Agent-Oriented Architecture**.

- The **Learning Coach** is the only component that communicates with the user. From the user's perspective, there is a single intelligent assistant.
- **Internal agents** (Grammar Analysis, Vocabulary, Exercise Generation, Progress Tracking, etc.) may collaborate behind the Coach to solve specific problems. They never talk to the user directly.
- A **provider abstraction** decouples the application from any specific local LLM runtime, so providers (e.g. Ollama) are replaceable and configurable.

For the first web prototype, the Learning Coach is implemented as **one LLM call per Learning Loop stage** (analyze, then verify) with well-structured system prompts (see ADR #003 and ADR #005). Specialized internal agents will be introduced only when a demonstrated responsibility justifies their separation.

### Communication model

```text
User
  ↓
Learning Coach
  ↓
Local LLM (via provider abstraction, e.g. Ollama)
  ↓
Learning Coach
  ↓
User
```

---

## Architectural Decisions

Every important decision is documented in [`ARCHITECTURAL_DECISIONS.md`](.harness/core/ARCHITECTURAL_DECISIONS.md) with context, rationale, implications and future considerations.

| # | Decision | Status |
|---|----------|--------|
| #001 | CLI as First User Interface | ✅ Accepted |
| #002 | Local LLM Provider Architecture | ✅ Accepted |
| #003 | Learning Coach Composition for the First Prototype | ✅ Accepted |
| #004 | Web UI Replaces CLI as the Interface | ✅ Accepted |
| #005 | One LLM Call per Learning Loop Stage | ✅ Accepted |

---

## Current Status

✅ **Milestone M1 (Web UI prototype) is implemented and merged.**

The **Web UI** (full-stack Next.js + React + TypeScript, backend-mediated local Ollama) brings the Learning Loop to life as a self-hosted application: the learner picks a prompt, writes, receives streamed coaching feedback, rewrites their version, and the coach verifies it in-session.

Next planned work: the [**Practice**](.harness/core/IMPLEMENTATION_ROADMAP.md) stage and **Milestone M2** (Learning Persistence & Progress). See the [`IMPLEMENTATION_ROADMAP.md`](.harness/core/IMPLEMENTATION_ROADMAP.md) for the ordered plan.

Every architectural decision, document and implementation is publicly documented as the project evolves.

---

## Repository Structure

```text
.
├── .harness/            # Architectural knowledge: source of truth
│   └── core/            #   Manifest, philosophy, architecture, decisions, guidelines
├── assets/              # Branding and media
├── docs/                # GitHub Pages landing site (index.html)
├── src/                 # Application source
│   ├── app/             #   Next.js App Router (pages + API routes)
│   ├── components/      #   React components (LearningCoach, Markdown)
│   └── lib/             #   Learning Coach prompts + LLM provider abstraction
├── .env.example         # Environment configuration template
├── README.md            # Repository landing page
├── LICENSE
├── package.json
└── .gitignore
```

---

## License

This project is licensed under the MIT License.
