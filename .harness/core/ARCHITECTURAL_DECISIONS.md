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
