<!-- How TypeFluentAI teaches : cómo queremos que enseñe -->

# TypeFluentAI - Learning Philosophy

## Purpose

This document defines how TypeFluentAI should teach.

It describes the learning principles, learning loop and user experience philosophy that must guide the design and implementation of the application.

It intentionally avoids implementation details.

---

# Core Learning Philosophy

TypeFluentAI is designed around **active learning**.

The system should not simply provide correct English to the user.

It should help the user develop the ability to produce better English independently.

The AI is a teacher and coach, not a replacement for the learner.

The user must remain an active participant throughout the learning process.

---

# Learning Principles

TypeFluentAI follows these principles:

- Learning requires active participation.
- The user should think before receiving the answer.
- Writing is more valuable than simply reading corrections.
- Mistakes are learning opportunities.
- Corrections should be understood, not simply accepted.
- Repetition should reinforce learning rather than create frustration.
- Feedback should encourage improvement rather than punish mistakes.
- Difficulty should evolve according to the user's progress.
- The AI should guide the user without taking control of the learning process.
- Learning effectiveness takes priority over gamification.

---

# The Learning Loop

The fundamental learning unit of TypeFluentAI is the **Learning Loop**.

The Learning Loop follows this sequence:

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

Each stage has a specific purpose.

---

## 1. Prompt

The Learning Coach presents the user with a writing challenge.

Examples include:

- Tell me about yourself.
- Describe your current role.
- Explain a technical concept.
- Describe a challenging project.
- Write a response for a daily standup.
- Explain a problem to a colleague.

Prompts should have a clear learning objective.

The system should avoid presenting random questions without a meaningful learning purpose.

---

## 2. Write

The user writes their own response.

The system should encourage the user to produce a meaningful amount of text before receiving detailed corrections.

The user should have the opportunity to express their ideas independently.

The system should not immediately interrupt the writing process with corrections unless the exercise explicitly requires real-time assistance.

---

## 3. Analyze

After the user completes their response, the Learning Coach analyzes the writing.

Analysis may consider:

- Grammar
- Vocabulary
- Sentence structure
- Clarity
- Naturalness
- Professional tone
- Repeated mistakes
- Appropriate language for the user's target level

The purpose of analysis is not to identify every possible imperfection.

The system should prioritize mistakes and improvements that provide meaningful learning value.

---

## 4. Understand

The system should explain relevant corrections clearly enough for the user to understand what can be improved and why.

The Learning Coach should avoid overwhelming the user with excessive feedback.

Feedback should be:

- Relevant
- Clear
- Actionable
- Encouraging
- Appropriate to the user's current level

The user should understand the reasoning behind an important correction before being asked to practice it.

---

## 5. Rewrite

When a meaningful correction is identified, the user should actively rewrite the sentence or passage.

The user should not simply accept a generated correction.

The system should encourage the user to reconstruct the improved version themselves.

This reinforces understanding and reduces passive dependency on the AI.

---

## 6. Practice

Important corrections should become opportunities for deliberate practice.

Practice may include:

- Rewriting a corrected sentence.
- Reusing new vocabulary.
- Applying a grammar structure again.
- Producing another sentence with the same pattern.
- Repeating a difficult construction through active typing.

The user should type the practice content rather than simply copying and pasting it.

Repetition should be used intentionally.

The goal is not mechanical repetition, but reinforcement.

---

## 7. Progress

Progress represents the user's development over time.

Progress should not be reduced to a single score.

The system should be able to recognize meaningful improvements such as:

- Fewer repeated mistakes.
- Correct use of previously difficult structures.
- Increased vocabulary range.
- Improved sentence construction.
- Better clarity.
- More natural expressions.
- Increased confidence with a specific type of writing.

A meaningful improvement can be:

> "You made this mistake in a previous exercise. This time you used the structure correctly."

Progress should focus on learning, not merely performance.

---

# Feedback Philosophy

TypeFluentAI should provide constructive feedback.

The system should avoid making the user feel that mistakes represent failure.

Instead, mistakes should be presented as opportunities to improve.

The Learning Coach should balance:

- Correction
- Explanation
- Encouragement
- Practice

The objective is to challenge the user without creating unnecessary frustration.

---

# Correction Strategy

TypeFluentAI should not attempt to correct everything at once.

Corrections should be prioritized according to factors such as:

- Learning value
- Frequency
- Severity
- Relevance to the current exercise
- Relevance to the user's current level
- Whether the mistake has appeared previously

Repeated mistakes should receive additional attention.

Correct language should not be unnecessarily rewritten merely because another version could sound slightly better.

The system should distinguish between:

- Incorrect English
- Understandable but unnatural English
- Acceptable English
- Strong and natural English

---

# User Agency

The user should remain responsible for producing the final answer.

The AI should:

- Guide
- Explain
- Suggest
- Challenge
- Encourage

The AI should not:

- Automatically rewrite everything.
- Hide mistakes.
- Complete the exercise for the user.
- Optimize solely for speed.
- Replace the user's thinking process.

The system should help the user become less dependent on AI over time.

---

# Repetition

Repetition is an important part of the learning process.

However, repetition must have a purpose.

The system may ask the user to reproduce an improved sentence or structure through active typing.

The exact number of repetitions should not be considered a permanent rule at this stage.

Future versions may experiment with:

- Fixed repetition counts
- Adaptive repetition
- Spaced repetition
- Difficulty-based repetition
- Error-based repetition

Any repetition mechanism must prioritize learning effectiveness over mechanical completion.

---

# Motivation

TypeFluentAI may introduce motivation mechanisms to encourage consistent practice.

Possible future mechanisms include:

- Points
- Streaks
- Achievements
- Daily goals
- Challenges
- Progress indicators
- Vocabulary rewards
- Timed exercises

These mechanisms are secondary to the learning process.

They must reinforce meaningful learning behaviors rather than replace them.

For example, rewarding the correct use of previously difficult vocabulary can reinforce learning.

Rewarding the user simply for completing repetitive actions may encourage behavior that does not improve learning.

---

# Gamification Principle

TypeFluentAI prioritizes **learning effectiveness over gamification**.

Motivation mechanisms should never become the primary objective of an exercise.

The application should not encourage the user to:

- Write quickly at the expense of quality.
- Complete exercises without understanding them.
- Repeat content mechanically just to earn points.
- Optimize scores instead of improving English.

The purpose of motivation is to encourage the user to return, practice consistently and recognize their own progress.

---

# Timed Exercises

Timed exercises may be introduced when time pressure is relevant to the learning objective.

Examples include:

- Technical interview preparation
- Job interview answers
- Daily standup simulations
- Real-time professional communication

Timing should be an optional exercise mechanic rather than a global rule.

The system should not optimize general writing exercises for speed when the primary objective is accuracy, clarity or learning.

---

# Difficulty and Adaptation

The learning experience should evolve according to the user's demonstrated ability.

The system should consider:

- Current English level
- Previous mistakes
- Previous successful corrections
- Vocabulary knowledge
- Writing complexity
- Exercise history
- Learning goals

Difficulty should increase progressively when the user demonstrates readiness.

The system should also be able to reduce difficulty when the user repeatedly struggles.

Adaptation should challenge the user without creating unnecessary frustration.

---

# Learning Content

Learning content is separate from the learning engine.

The learning engine defines **how the user learns**.

Learning content defines **what the user practices**.

Examples of future learning content include:

- Tell me about yourself.
- Daily Standup
- Sprint Planning
- Sprint Review
- Sprint Retrospective
- Technical Interviews
- Software Architecture
- Code Reviews
- Technical Writing
- Professional Emails

New learning content should be possible without changing the fundamental learning engine.

---

# Learning Paths

Learning content may eventually be organized into **Learning Paths**.

A Learning Path represents a specific learning objective.

Examples may include:

```text
Interview Preparation
Agile Communication
Technical English
Professional Writing
Software Engineering Communication
```

Each Learning Path may contain exercises with different:

- Difficulty levels
- Writing objectives
- Vocabulary targets
- Grammar targets
- Professional contexts

Learning Paths are content structures and should remain separate from the core learning engine.

---

# Learning vs. AI Training

Active learning in TypeFluentAI refers to the **user's learning process**.

It does not mean that the AI model automatically retrains itself from user mistakes.

User progress, preferences and historical performance may be used to personalize future learning experiences, but this is conceptually different from training or fine-tuning the underlying AI model.

---

# Privacy and Learning Data

Learning history is part of the user's personal learning experience.

The system should prioritize local processing and local storage whenever possible.

Learning data should only be used to improve the user's experience and should not be treated as a source of model training by default.

Privacy must remain aligned with the project's Local AI First and Privacy by Design principles.

---

# Long-Term Learning Objective

The ultimate goal of TypeFluentAI is not to make the user dependent on an AI that continuously corrects their English.

The goal is to progressively reduce that dependency.

A successful learning experience should help the user move from:

```text
"I need AI to correct my English."
```

toward:

```text
"I can recognize and improve my own English."
```

The AI succeeds when the user becomes more capable without it.

---

# Non-Goals

The learning philosophy does not aim to:

- Replace human teachers completely.
- Provide instant answers to every writing problem.
- Correct every possible mistake.
- Maximize the number of exercises completed.
- Maximize gamification.
- Train the underlying AI model automatically from user mistakes.

---

# Evolution

This document defines the initial learning philosophy of TypeFluentAI.

Specific learning mechanics may evolve as the project is tested and implemented.

However, future changes should preserve the fundamental principle:

> **TypeFluentAI exists to help people learn to write better English, not to write English for them.**

---

# Status

Version: 1.0

Status: Draft

This document is part of the TypeFluentAI Harness and should be considered a foundational reference for future learning-related design decisions.
