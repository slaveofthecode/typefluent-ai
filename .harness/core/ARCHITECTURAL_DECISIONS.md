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

