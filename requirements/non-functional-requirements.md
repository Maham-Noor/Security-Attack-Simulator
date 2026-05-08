# Non-Functional Requirements

## NFR-001: Beginner-Friendly Language

The application must use clear educational language for beginner cybersecurity students.

Avoid professional offensive-security framing such as:

- hacking platform
- exploit framework
- real attack tool

## NFR-002: Responsive UI

The application must be usable on common desktop and mobile screen sizes.

Text, controls, visualizations, and panels must not overlap.

## NFR-003: Visual Clarity

Each scenario must make the simulated system state easy to understand.

Visualizations should support learning, not decorate the page without purpose.

## NFR-004: Simplicity

Implementation must stay simple.

Do not introduce unnecessary abstractions, backend layers, complex state libraries, admin tools, or cloud infrastructure for the MVP.

## NFR-005: Maintainability

Scenario content should be data-driven where practical.

Shared flow behavior should live in reusable scenario player components instead of being duplicated per scenario.

## NFR-006: Performance

The MVP should load quickly and avoid backend calls.

Scenario content should be available locally in the app bundle.

## NFR-007: Accessibility

Interactive controls must be keyboard reachable.

Important visual state changes must also be represented with text labels or explanations.

Color must not be the only way to understand a scenario state.

## NFR-008: Persistence Scope

Progress persistence must be local to the learner's current device in the MVP.

The MVP must not require accounts, cloud profiles, or shared classroom storage.

## NFR-009: Code Organization

React components must be modular and use functional components with hooks.

TailwindCSS should be used for styling.

Backend layers must not be added for Version 1.
