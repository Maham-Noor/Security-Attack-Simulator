# CyberShield Lab - AI Agent Instructions

## Project Overview

CyberShield Lab is an educational cybersecurity simulator designed for beginner cybersecurity students.

Version 1 is an MVP. It focuses on a reusable educational simulation engine and four controlled simulations:

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Buffer Overflow, visual simulation only

This project must NEVER:

- perform real exploitation
- target real systems
- collect credentials
- execute arbitrary payloads
- send live requests as attack behavior
- behave like a real hacking tool

The application is strictly educational.

## Core Philosophy

Every feature must:

1. Teach clearly
2. Visualize concepts
3. Compare vulnerable behavior with secure behavior
4. Remain sandboxed and safe
5. Stay simple and avoid unnecessary abstractions

## Tech Stack

Frontend only for the MVP:

- React
- TailwindCSS
- Framer Motion
- Lucide React

Do not add a backend, database, authentication, admin panel, or cloud infrastructure for Version 1.

## Coding Standards

## Frontend

- Use functional React components only.
- Use hooks.
- Keep components small and modular.
- Prefer reusable UI components when reuse is obvious.
- Use TailwindCSS only.
- Keep pages clean.
- Avoid overengineering.

## Important Security Constraints

- SQL Injection must simulate queries only.
- XSS must not execute real scripts.
- CSRF must not send real requests.
- Buffer Overflow must remain visual and conceptual only.
- Never create malware behavior.
- Never expose dangerous system functionality.
- Learners must use Guided Options, not arbitrary payload input.

## UI Requirements

- Dark cybersecurity theme.
- Responsive design.
- Beginner-friendly explanations.
- Visualization panels for simulated attacks.
- Vulnerable Mode and Secure Mode comparison for each scenario.

## Git Rules

- One feature per commit.
- Keep commit messages professional.
- Never modify unrelated files.

## Preferred Workflow

Before implementing:

1. Analyze existing structure.
2. Check `docs/project_scope.md`.
3. Explain implementation plan briefly.
4. Implement incrementally.
5. Keep files small and maintainable.

## Naming Conventions

Components:

- PascalCase

Functions:

- camelCase

Constants:

- UPPER_SNAKE_CASE

CSS:

- Tailwind utility classes only

## Educational Language Rules

Use these terms:

- "Attack Scenario"
- "Safe Target"
- "Step-by-Step Visualization"
- "Vulnerable Mode"
- "Secure Mode"
- "Defense View"

Avoid:

- "hacking platform"
- "exploit framework"
- "real attack tool"

This simulator is educational only.
