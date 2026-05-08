# Scenario Requirements

## MVP Scenario Set

Version 1 includes only:

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Buffer Overflow, visual simulation only

## Shared Requirements

Every scenario must include:

- Scenario Brief
- Vulnerable Mode
- Secure Mode
- Step-by-Step Visualization
- Guided Options
- Simulated System State
- Defense View
- Scenario Completion

## SQL Injection

The SQL Injection simulation must show how unsafe input can alter a mock database query.

It must show:

- simulated query text
- mock database result
- Vulnerable Mode unsafe behavior
- Secure Mode parameterized-query concept
- defense explanation for parameterized queries and validation

It must not execute real SQL.

## Cross-Site Scripting

The XSS simulation must show how unsafe rendering of untrusted content can affect a mock page.

It must show:

- mock page preview
- untrusted content as safe text
- Vulnerable Mode unsafe rendering concept
- Secure Mode escaped or sanitized output
- defense explanation for output encoding and sanitization

It must not execute real scripts.

## Cross-Site Request Forgery

The CSRF simulation must show how an unverified request can affect a mock action.

It must show:

- mock browser state
- fictional request details
- server decision state
- Vulnerable Mode missing verification
- Secure Mode token or SameSite protection
- defense explanation for CSRF tokens and SameSite cookies

It must not send real network requests.

## Buffer Overflow

The Buffer Overflow simulation must show how oversized input can exceed a conceptual memory boundary.

It must show:

- visual memory cells
- input length comparison
- Vulnerable Mode overflow concept
- Secure Mode bounds checking
- defense explanation for bounds checks, safer APIs, and memory-safe languages

It must remain visual only.
