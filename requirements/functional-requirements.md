# Functional Requirements

## FR-001: Learning Dashboard

The application must open to a Learning Dashboard.

The dashboard must show only the four MVP scenarios:

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Buffer Overflow

The dashboard must show completion state and a start or continue action for each scenario.

## FR-002: Reusable Scenario Player

All four scenarios must use the same reusable `ScenarioPlayer`.

The scenario player must show:

- Scenario Brief
- Vulnerable Mode
- Secure Mode
- Step-by-Step Visualization
- Guided Options
- Defense View

## FR-003: Vulnerable and Secure Modes

Each scenario must compare Vulnerable Mode with Secure Mode.

Vulnerable Mode must show the unsafe behavior and simulated consequence.

Secure Mode must show the protective behavior and safer outcome.

## FR-004: Step-by-Step Visualization

Each Visualization Step must include:

- student action
- system reaction
- visual state change
- learning point

## FR-005: Guided Options

The simulator must use Guided Options instead of arbitrary attack input.

Learners must choose from predefined educational options.

## FR-006: Scenario Visualizers

The MVP must include these visualizers:

- SQL query visualizer
- XSS page preview visualizer
- CSRF request visualizer
- Buffer memory visualizer

## FR-007: Defense View

Each scenario must end with a Defense View that connects the demonstrated risk to practical protective measures.

## FR-008: Local Learning Progress

The application must save Local Learning Progress on the current device.

Local Learning Progress must include:

- completed scenario ids
- current step by scenario id
- viewed mode state
- optional reflection answers

## FR-009: Continue Learning

If a learner returns after closing or refreshing the app, the dashboard must show saved completion state and allow continuing unfinished scenarios.

## FR-010: MVP Exclusions

The MVP must not include authentication, multiplayer, live requests, real databases, phishing, brute force, file upload vulnerabilities, IDOR, session hijacking, admin panels, or cloud infrastructure.
