 <!-- How TypeFluentAI is organized : cómo queremos organizarlo -->

# TypeFluentAI - Architecture

## Purpose

This document defines the high-level architecture of TypeFluentAI.

Its purpose is to describe how the system is organized, how AI agents collaborate and how responsibilities are distributed across the application.

This document intentionally avoids implementation details.

---

# Architectural Philosophy

TypeFluentAI follows an **Agent-Oriented Architecture**.

Instead of relying on a single prompt responsible for every task, the system is composed of specialized AI agents with well-defined responsibilities.

Each agent has one responsibility.

Each responsibility has one owner.

---

# Learning Coach

The **Learning Coach** is the only AI component that communicates directly with the user.

From the user's perspective, there is only one intelligent assistant.

Internally, however, multiple specialized agents collaborate to analyze requests, produce feedback and personalize the learning experience.

The user never interacts directly with internal agents.

---

# Internal Agents

Internal agents are responsible for solving specific problems.

Examples include:

- Grammar Analysis
- Vocabulary Suggestions
- Exercise Generation
- Progress Tracking
- Learning Memory
- Interview Preparation

Internal agents never communicate directly with the user.

They only communicate with the Learning Coach.

---

# Communication Model

The communication flow is intentionally simple.

User

↓

Learning Coach

↓

Internal Agents

↓

Learning Coach

↓

User

The Learning Coach is responsible for:

- Understanding user intent
- Delegating work
- Combining results
- Making final decisions
- Communicating with the user

---

# Design Principles

The architecture follows these principles:

- Single entry point.
- Single responsibility.
- Modular components.
- Replaceable agents.
- Extensible architecture.
- Local AI first.
- Privacy by design.

---

# Future Evolution

The architecture is designed to support new agents without changing the user experience.

Future versions may include:

- Technical Writing Coach
- Email Writing Coach
- Interview Writing Coach
- Writing Style Coach
- Vocabulary Coach
- Grammar Coach
- Learning Analytics

The Learning Coach will remain the single point of interaction regardless of the number of internal agents.

---

# Status

Version: 1.0

Status: Draft
