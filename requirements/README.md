# Requirements

This folder contains the Version 1 MVP requirements for CyberShield Lab.

The MVP is an educational Security Attack Simulator for beginner cybersecurity students. It uses Safe Targets, Guided Options, and Simulated System State only.

## Files

- `functional-requirements.md` - user-facing features and learning flows.
- `non-functional-requirements.md` - quality, usability, accessibility, and maintainability expectations.
- `safety-requirements.md` - mandatory safety boundaries for all simulations.
- `scenario-requirements.md` - MVP scenario requirements.

## MVP Scope

Version 1 includes only:

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Buffer Overflow, visual simulation only

## Product Boundary

CyberShield Lab must never:

- perform real exploitation
- target real systems
- collect real credentials
- execute arbitrary payloads
- send live attack requests
- use real databases
- behave like a real hacking tool
