# Architectural Decisions

This document records every important architectural decision made during the development of TypeFluentAI.

Each decision includes context, rationale, implications and future considerations.

Decisions are ordered chronologically.

---

# Decision #001 — CLI as First User Interface

**Date:** 2026-07-25
**Status:** Accepted
**Affects:** User interaction layer

## Context

TypeFluentAI needs a user interface for its first working prototype.

The project is in the Foundation phase. No implementation exists yet.

The primary goal of the prototype is to validate the Learning Loop — Prompt, Write, Analyze, Understand, Rewrite, Practice, Progress — and to confirm that the agent-oriented architecture works with a local LLM.

The interface choice directly determines the complexity, scope and development speed of the prototype.

## Decision

TypeFluentAI will use a CLI as the first user interface.

## Rationale

The CLI provides the smallest possible interface required to validate the Learning Loop.

A CLI keeps the project focused on three core concerns:

- Local AI integration
- Learning behavior design
- Agent architecture

It avoids the complexity of frontend frameworks, rendering engines, state management for UI components and web servers — none of which are relevant to the learning problem being solved.

The Learning Loop is fundamentally text-based: the user writes text and receives text feedback. A CLI is the most natural and minimal way to represent this interaction.

A CLI also allows rapid iteration. The learning coach, agent communication and feedback format can all evolve quickly without being constrained by UI layer decisions.

## Implications

- The first prototype will run in a terminal session
- User input will be typed text
- AI feedback will be rendered as terminal output
- The Learning Coach will communicate through stdin/stdout
- No browser, no web server, no frontend framework is required for the first prototype
- The underlying learning engine must remain interface-agnostic so the CLI can be replaced later

## Future Considerations

The CLI is the first interface, not necessarily the final product interface.

The interface may evolve into:

- A desktop application with richer formatting and visual feedback
- A web-based interface for broader accessibility
- A mobile interface for on-the-go practice

The learning engine and agent architecture should be designed so that switching the interface does not require rewriting the core logic. The CLI is a thin layer on top of the learning engine, not the learning engine itself.

---

# Decision #002 — Local LLM Provider Architecture

**Date:** 2026-07-25
**Status:** Accepted
**Affects:** LLM integration layer

## Context

TypeFluentAI is built on the "Local AI First" principle. The Learning Coach and all internal agents depend on a local language model to analyze writing, generate feedback and guide learning.

The project needs a defined way to interact with local LLMs. This decision must be made before any agent logic or prompt design can be implemented, because the LLM is the core dependency behind every AI-driven behavior in the system.

The project also values extensibility and modularity. Locking the architecture to a single LLM runtime would contradict the principle of replaceable components.

## Decision

TypeFluentAI will interact with local language models through a provider abstraction layer that belongs to the project.

The abstraction defines a generic interface for communicating with any local LLM provider. No specific runtime is assumed by the core architecture.

Ollama will be the initial local LLM provider used by the first prototype.

The specific model used within any provider will remain a configuration choice and will not be treated as an architectural decision.

## Rationale

A provider abstraction keeps the core application decoupled from any specific LLM runtime.

This means:

- The Learning Coach and internal agents never call a specific provider directly
- Adding a new provider does not require changes to the learning engine or application layers
- The provider becomes a replaceable, configurable component behind a stable interface

This approach aligns with the existing architectural principles of replaceable agents, modular components and extensible architecture.

Ollama is chosen as the initial provider because it offers a straightforward local runtime with broad model support. It is a practical starting point, not a permanent commitment.

The specific model is a runtime configuration concern. Different users may prefer different models based on hardware, language quality or speed. The architecture should not assume or enforce a particular model choice.

## Implications

- A provider abstraction layer must be designed before implementing agent logic
- The first prototype will integrate with Ollama through this abstraction
- The Learning Coach and internal agents will depend on the abstraction interface, not on Ollama directly
- Switching from Ollama to another provider should require only a provider implementation and configuration change
- Model selection becomes a user or deployment configuration, not an architectural concern

## Future Considerations

Additional local LLM providers may be introduced over time. Potential examples include:

- LM Studio
- llama.cpp (direct integration)
- llamafile
- Any future local runtime with an accessible interface

The provider abstraction should be designed with enough clarity that new providers can be added without modifying the Learning Coach, agent logic or core application layers.

The abstraction should also be evaluated over time to confirm it remains sufficient as the system's LLM requirements evolve — including potential needs such as streaming responses, structured output or multi-modal input.

---

# Decision #003 — Learning Coach Composition for the First Prototype

**Date:** 2026-07-25
**Status:** Accepted
**Affects:** Learning engine, agent architecture

## Context

The architecture describes an agent-oriented system where a Learning Coach coordinates specialized internal agents. However, the first prototype must reconcile this vision with the practical need to validate the Learning Loop before introducing agent complexity.

The Learning Loop — Prompt, Write, Analyze, Understand, Rewrite, Practice, Progress — is the core behavior that must be proven. How the Learning Coach internally handles this loop is a separate concern that should not block the first working implementation.

## Decision

TypeFluentAI's first prototype will use a single Learning Coach backed by a single LLM call.

This is an intentional simplification to validate the Learning Loop before introducing internal agent orchestration.

The first prototype is not a multi-agent implementation.

The architecture must preserve a clear boundary around the Learning Coach so that specialized internal agents can be introduced later without requiring a fundamental redesign of the user interaction layer or learning engine.

## Rationale

The primary goal of the first prototype is to validate learning behavior, not agent architecture.

A single LLM call with a well-structured system prompt can demonstrate the full Learning Loop:

- Presenting a writing prompt
- Receiving user text
- Analyzing writing quality
- Providing feedback
- Guiding the user to rewrite
- Offering practice opportunities
- Tracking improvement

This approach produces the fastest path to a working system that can be tested, iterated and evaluated against the learning philosophy.

Starting with agent dispatch risks building infrastructure before knowing whether the learning model works. Premature agent complexity may also obscure the real question: does the system actually help users learn?

The provider abstraction defined in Decision #002 ensures the LLM layer is already decoupled. The Learning Coach can be decomposed into internal agents later once the learning behavior is proven and a specific responsibility benefits from separation.

The important architectural principle behind this decision: future internal agents should be introduced when there is a demonstrated responsibility that benefits from separation, not simply for the sake of having multiple agents.

## Implications

- The first prototype implements a single Learning Coach as one LLM call
- The system prompt for the Coach must encode all learning behavior: analysis, feedback, correction prioritization and progress awareness
- The code must preserve a clear boundary around the Learning Coach so it can be internally restructured later
- No agent orchestration, dispatch or inter-agent communication is required for the first prototype
- The Learning Coach is the only component that interacts with the LLM and the user
- This is not a permanent architecture — it is a documented starting point

## Future Considerations

The Learning Coach will eventually be decomposed into specialized internal agents when the system demonstrates a clear need. Potential future agents include:

- Grammar Analysis Agent
- Vocabulary Agent
- Correction Prioritization Agent
- Progress Tracking Agent
- Exercise Generation Agent

Agent decomposition should be driven by observed responsibility boundaries in practice, not by theoretical separation of concerns alone. Each new agent must justify its existence by solving a problem that the monolithic Coach cannot handle effectively.

The boundary around the Learning Coach must be preserved throughout this evolution. The user should continue to interact with a single Coach regardless of how many internal agents collaborate behind it.

---

# Decision #005 — One LLM Call per Learning Loop Stage

**Date:** 2026-09-17
**Status:** Accepted
**Affects:** Learning engine, agent architecture

## Context

Decision #003 defined the first prototype as a single Learning Coach backed by a single LLM call. That decision validated a one-shot flow: the user writes, the Coach analyzes and provides feedback, ending by inviting the user to rewrite on their own.

That flow leaves the Learning Loop open. The user is told to rewrite but the application neither captures the rewrite nor verifies whether the feedback was applied. Without a verification turn, there is no way to know that the learner applied the corrections or to reinforce the learning (Learning Philosophy — Rewrite, Practice, Progress).

The first prototype already demonstrated the value of a single Coach. What is missing is not agent orchestration but a second sequential stage in the same loop: verification of the rewrite.

## Decision

The Learning Coach performs **one LLM call per stage** of the Learning Loop.

For the first web prototype, the loop contains two sequential calls:

- **Analyze** — the Coach analyzes the written response and provides prioritized, encouraging feedback (existing behavior).
- **Verify** — after the user submits their rewrite, the Coach compares the rewrite against the feedback it gave and confirms which corrections were applied, which were not, and whether the rewrite introduced any new issue.

The user continues to interact with a single Coach (ADR #003 boundary is preserved). The interface between the user and the Coach does not change: only the number of sequential stages inside a single loop does.

## Rationale

The rewrite-verification turn is the mechanism that closes the Learning Loop in-session. It gives the learner concrete confirmation of applied corrections and keeps them accountable for following the coaching, which is the core value of active learning.

Extending the existing route with a `stage` field keeps the single-Coach composition intact and avoids premature multi-agent complexity, consistent with the spirit of ADR #003: use the simplest structure that proves learning behavior.

Each stage is represented by its own well-structured system prompt, keeping the Coach composition readable and evolvable.

## Implications

- The first prototype makes two LLM calls per completed loop (analyze + verify), not one.
- The `/api/coach` route accepts a `stage` ("analyze" default, "verify") and composes the appropriate system prompt.
- The verify stage receives the original text, the previous feedback, and the user's rewrite.
- The boundary around the Learning Coach remains intact; future stages (Practice) or internal agents (M3) slot into the same structure.
- Decision #003 is amended: "single LLM call" becomes "one call per stage", not "one call total".

## Future Considerations

Future loop stages (e.g. Practice) should follow the same pattern: one stage, one system prompt, one call.

When the Coach is later decomposed into internal agents (M3), the stage prompts become natural candidates for agent responsibilities (e.g. a Verification agent) without changing the user-facing interaction.

---

# Decision #004 — Web UI Replaces CLI as the Interface

**Date:** 2026-09-03
**Status:** Accepted
**Affects:** User interaction layer, learning engine

## Context

Decision #001 chose a CLI as the first user interface. Its purpose was to validate the Learning Loop with the smallest possible interface before introducing frontend complexity.

That validation goal remains valid: the Learning Loop and the single Learning Coach (Decision #003) are the core behaviors to prove. However, the interaction layer itself has evolved. A CLI is a poor fit for the project's long-term identity as a public, self-hostable, open-source application.

TypeFluentAI aspires to be a product that anyone can self-host and use from a web browser. A CLI limits discoverability, accessibility and the richness of feedback presentation that the Learning Philosophy describes (streamed feedback, structured practice, progress visualization).

## Decision

TypeFluentAI will use a web UI as its user interface, replacing the CLI as the default interaction layer.

The application will be built as a full-stack Next.js application:

- React with TypeScript for the user interface.
- Next.js API routes as the local backend that hosts the Learning Coach.
- The Learning Coach communicates with a local language model through the provider abstraction established in Decision #002.

The web UI communicates only with the local backend. The browser never calls the LLM directly.

The distributed model is intentionally self-hosted and local-first: each deployment runs with its own local Ollama (or other local provider) on the machine or server where the app is self-hosted. The browser talks to the local Next.js backend, and the backend talks to the local LLM. No cloud API is used at runtime.

## Rationale

A web UI is the most appropriate interface for an interactive learning coach that streams feedback and guides the user through a repeated write-rewrite-practice loop. The Learning Loop is fundamentally textual, but it benefits from a richer presentation than a CLI can naturally provide.

Next.js is chosen because it is a well-known, full-stack framework that keeps the frontend and the local backend in a single deployable project. This reduces self-hosting complexity: one repository, one dependency install, one server process, one build. That simplicity directly serves the open-source self-hosted distribution model.

Because each self-hoster runs the app on their own machine or server, the "Local AI First" and "Privacy by Design" principles are preserved. The user's learning data and language model inference remain local. The migration to a web UI does not imply moving to a cloud LLM or a managed multi-tenant service.

The CLI is retired as the default interface but remains a legitimate possible interface because the learning engine stays interface-agnostic, as originally intended in Decision #001.

The single Learning Coach as one LLM call (Decision #003) is retained for the first web prototype. The provider abstraction (Decision #002) remains the boundary between the application and the local LLM.

## Implications

- The first web prototype is a full-stack Next.js application with React + TypeScript.
- A backend API route (e.g. `/api/coach`) hosts the Learning Coach and composes the Learning Loop system prompt.
- The learning engine and provider abstraction remain UI-agnostic so the interface can evolve without rewriting core logic.
- The browser communicates only with the local backend; the backend communicates with the local LLM through the provider abstraction.
- Self-hosting requires the deploying user to install and run a local LLM runtime (e.g. Ollama) with a model pulled locally.
- The repository will host its presentation assets: a README as the repository landing page and a `docs/` directory providing a GitHub Pages landing site.
- No cloud APIs, remote servers, telemetry or external data transmission are introduced.

## Future Considerations

The web UI is the current interface. Future interfaces (desktop, mobile, or a revived CLI) should connect to the same interface-agnostic learning engine and provider abstraction.

The provider abstraction may later need to support streaming responses and structured output as the Learning Coach's requirements evolve.

Should distribution ever shift toward a managed public service, that would be a new decision requiring the introduction of a hosted LLM backend and a departure from the current local-first model. No such decision is being made here.

---
