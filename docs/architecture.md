# MVP Architecture

CyberShield Lab uses a simple frontend-only architecture.

The app has four main pieces:

- `LearningDashboard` lists the four MVP scenarios.
- `ScenarioPlayer` runs the shared learning flow.
- Scenario data files define the content for each simulation.
- `progressStorage` saves Local Learning Progress in `localStorage`.

## Diagram

```txt
LearningDashboard
      |
      v
scenarioCatalog -> scenario data
      |
      v
ScenarioPlayer
      |
      +--> Vulnerable Mode
      +--> Secure Mode
      +--> Defense View
      |
      v
progressStorage -> localStorage
```

## Scenario Flow

```txt
Scenario Brief
      |
      v
Vulnerable Mode steps
      |
      v
Secure Mode steps
      |
      v
Defense View
      |
      v
Scenario Completion
```

## MVP Scenarios

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Buffer Overflow, visual only

## Design Rules

- Keep scenario data as plain JavaScript objects.
- Reuse the same `ScenarioPlayer`.
- Do not build separate hardcoded pages for each attack.
- Do not add backend infrastructure for Version 1.
- Use simulated state only.
