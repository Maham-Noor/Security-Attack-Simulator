# CyberShield Lab - MVP Scope

## Current Goal

We are ONLY building Version 1 (MVP).

The focus is creating a reusable educational simulation engine.

This is NOT a real security tool.

All scenarios are controlled educational simulations only.

---

# MVP Features Only

## Core Engine
- Learning Dashboard
- Scenario Player
- Vulnerable vs Secure comparison
- Local learning progress system

## Scenarios
- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Buffer Overflow (visual simulation only)

---

# Important Constraints

DO NOT implement:
- authentication
- multiplayer
- real attack execution
- arbitrary payload execution
- live requests
- real databases
- phishing
- brute force
- file upload vulnerabilities
- IDOR
- session hijacking
- admin panels
- cloud infrastructure

---

# Architecture Priority

The project must prioritize:
1. reusable scenario architecture
2. educational visualization
3. modular React components
4. safe simulations
5. clean state management

---

# Development Philosophy

Build the engine first.

Every scenario should use the same reusable:
- ScenarioPlayer
- VisualizationStep
- GuidedOptions
- DefenseView

Avoid hardcoded attack pages whenever possible.