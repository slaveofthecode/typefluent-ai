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

