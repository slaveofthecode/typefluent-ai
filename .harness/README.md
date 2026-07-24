# Harness

The `.harness` directory contains the architectural knowledge of TypeFluentAI.

Instead of storing knowledge only inside AI conversations, every important decision is documented here.

The Harness acts as the project's long-term memory and defines how AI agents should understand, reason about and evolve the system.

## Purpose

The Harness is responsible for documenting:

- Project philosophy
- Learning philosophy
- Architectural decisions
- Agent responsibilities
- Workflows
- Design principles

The Harness intentionally contains **documentation instead of implementation**.

Its goal is to become the single source of truth for both developers and AI agents.

## Guiding Principle

> Every important architectural decision must be documented before implementation.

## Structure

```text
.harness/

    core/

    agents/

    workflows/

    prompts/
```

Additional directories will be introduced only when they become necessary.

The Harness is designed to evolve together with the project.
