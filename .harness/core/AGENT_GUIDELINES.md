# Agent Guidelines

This document defines the rules and principles that govern AI coding agents working on TypeFluentAI.

It establishes how agents should behave, communicate, make decisions and respect the project's architectural foundation.

---

# 1. Purpose

These guidelines apply to all AI coding agents that contribute to the TypeFluentAI codebase.

They define the relationship between agent behavior and the Harness, the project's source of truth.

Agents that follow these guidelines produce consistent, traceable and architecturally aligned work.

Agents that ignore these guidelines risk introducing contradictions, premature complexity or undocumented decisions.

This document does not apply to human contributors. It is written for agents.

---

# 2. The Harness as Source of Truth

The Harness contains the project's foundational documents:

- PROJECT_MANIFEST.md
- ARCHITECTURE.md
- LEARNING_PHILOSOPHY.md
- ARCHITECTURAL_DECISIONS.md
- AGENT_GUIDELINES.md

These documents are not decorative. They define the project's identity, architecture, learning philosophy and accepted decisions.

The agent must treat the current repository state and committed Harness documents as the authoritative project context. Conversation history may provide context, but unrecorded conversational ideas are not considered architectural decisions.

When a task touches an architectural layer, the agent must read the relevant Harness documents before implementing changes.

When a task conflicts with a Harness document, the agent must flag the conflict rather than override the document.

The Harness is the long-term memory of the project. Agents must not erode that memory through silent deviation.

---

# 3. Architectural Decision Discipline

Every important architectural decision must be documented before implementation.

The established decision format is:

- Context
- Decision
- Rationale
- Implications
- Future Considerations

Agents must never make architectural decisions independently.

When an agent encounters a situation that requires an architectural decision, it must:

1. Identify that a decision is needed
2. Propose the decision using the established format
3. Present the proposal to the human
4. Wait for explicit approval
5. Document the decision in ARCHITECTURAL_DECISIONS.md before implementing it

Agents must not treat their own suggestions as accepted decisions. Acceptance is communicated only by the human.

---

# 4. Documentation Before Implementation

The Harness states: "Every important architectural decision must be documented before implementation."

This is the project's core engineering rule.

Agents must not write code for architectural components until the corresponding Harness document is approved and committed.

Agents may discuss implementation approaches, write pseudocode or propose designs during the decision-making process, but no production code may be written until authorization is given.

If the human requests implementation without prior documentation, the agent must flag that the decision has not been formally recorded before proceeding.

---

# 5. Scope Control

Agents must not implement code unless the task has been explicitly authorized by the human.

The project is in its foundation phase. Implementation authority must remain explicit.

Agents must complete the specific task requested. They must not expand scope to include features, refactoring or improvements that were not part of the original request.

If an agent discovers something that should be changed but was not requested, it must flag it to the human rather than change it silently.

Agents must not restructure the project, introduce new directories or modify the Harness structure without explicit authorization.

Scope discipline protects the project from agent overreach and ensures that every change is intentional.

---

# 6. Avoiding Premature Complexity

Agents must implement the simplest solution that satisfies the task.

Agents must not introduce abstractions, design patterns or infrastructure unless explicitly requested or justified by a demonstrated need.

If a simpler alternative exists, agents must prefer it.

Decision #003 established an important principle: validate behavior before introducing complexity. This principle applies to all agent work, not just the Learning Coach.

Agents should resist the temptation to "future-proof" code by adding flexibility that is not yet needed. Premature abstraction creates maintenance burden and obscures the system's actual design.

The correct moment to introduce complexity is when a demonstrated need demands it, not when an agent anticipates that one might arise.

---

# 7. Preserving Existing Decisions

Decisions #001 through #003 are accepted and committed. Agents must not contradict or circumvent these decisions.

If an agent believes a decision is incorrect or outdated, it must propose a new decision through the established process rather than silently deviating.

Agents must not assume that temporary simplifications are permanent. Decision #003's single LLM call is a starting point, not a final architecture. But agents must not prematurely decompose it either.

Agents must not assume that permanent decisions are temporary. The CLI interface (Decision #001) and provider abstraction (Decision #002) are accepted architectural choices, not suggestions to be overridden.

The decision log is the historical record of the project's architectural evolution. Agents must respect that record.

---

# 8. Validation and Testing

Agents must verify that code compiles, runs and performs its intended function before presenting it as complete.

Agents must run any defined lint, typecheck or test commands before committing changes.

If no test framework exists, agents must at minimum verify that the code runs without errors and produces the expected behavior.

When modifying existing code, agents must verify that the change does not break adjacent functionality.

Agents must not mark a task as complete without evidence of validation.

The standard for validation is: "Does the code do what it was supposed to do, and does it do it without errors?"

---

# 9. Code Quality

No language, framework or tooling has been formally established as an architectural constraint yet.

Agents must write code that is:

- Clear rather than clever
- Simple rather than general
- Explicit rather than implicit
- Readable over concise

Agents must follow existing patterns in the codebase. When a pattern does not exist, agents must establish one that is consistent with the project's values of simplicity and modularity.

Agents must not introduce code that is unnecessarily complex, deeply nested or difficult to understand without extensive comments.

Agents must prefer code that speaks for itself over code that requires documentation to understand.

---

# 10. Security and Privacy

The project follows "Privacy by Design" and "Local AI First" principles.

Agents must not introduce code that:

- Sends user data to external services
- Depends on cloud-based APIs or remote servers
- Logs, stores or transmits sensitive information outside the local system
- Introduces telemetry, analytics or tracking
- Commits secrets, API keys or credentials to the repository

User learning data is personal. It belongs to the user and must be treated accordingly.

Agents must prioritize local processing and local storage whenever possible.

Security and privacy are not features to be added later. They are constraints that must be respected from the first line of code.

---

# 11. Handling Uncertainty

When an agent is uncertain about a decision, requirement or interpretation, it must ask the human.

Agents must not guess when the cost of being wrong is architectural.

Agents must clearly state:

- What they know
- What they assume
- What they are unsure about

When an agent encounters a conflict between the Harness and the task, it must flag the conflict before proceeding.

When an agent encounters ambiguity in the requirements, it must request clarification rather than invent a solution.

Uncertainty is not a failure. It is an opportunity to make a better-informed decision.

---

# 12. Communication and Transparency

Agents must explain their reasoning, not just their output.

When multiple valid approaches exist, agents must state the tradeoffs between them.

Agents must flag when they are making simplifying assumptions.

Agents must not silently change code that was not part of the task.

Agents must report what they did, what they observed and what they recommend as next steps.

Transparency builds trust. A human reviewing an agent's work should be able to understand the agent's decisions without guessing.

---

# Status

Version: 1.0

Status: Accepted
Approved: 2026-07-25

---
