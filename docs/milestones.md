# MVP Milestones

CyberShield Lab Version 1 is a simple educational simulator. The MVP includes a reusable scenario player, local progress, and four safe simulations:

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Buffer Overflow, visual only

Each scenario must compare **Vulnerable Mode** with **Secure Mode** using mock data and simulated state only.

Do not implement authentication, multiplayer, real attack execution, arbitrary payload execution, live requests, real databases, phishing, brute force, file upload vulnerabilities, IDOR, session hijacking, admin panels, or cloud infrastructure.

## Milestone 1: Project Scaffold

- [x] Create Vite React app files.
- [x] Configure TailwindCSS files.
- [x] Add base `src/` folder structure.
- [x] Add reusable layout components.
- [x] Add reusable UI components.
- [x] Install dependencies with `npm install`.
- [x] Confirm the app starts successfully in development mode.

## Milestone 2: Simple Scenario Model

- [x] Create one simple scenario object shape.
- [x] Include `id`, `title`, `description`, `category`, and `difficulty`.
- [x] Include `brief`, `steps`, and `defense`.
- [x] Include `vulnerableMode` and `secureMode` content.
- [x] Keep scenario data in plain JavaScript files.
- [x] Create `scenarioCatalog.js` to return the four MVP scenarios.

## Milestone 3: Learning Dashboard

- [x] Show the four MVP scenarios only.
- [x] Build `LearningDashboard`.
- [x] Build `ScenarioCard`.
- [x] Build `ProgressSummary`.
- [x] Show completion status for each scenario.
- [x] Add a start or continue button for each scenario.

## Milestone 4: Reusable Scenario Player

- [x] Build `ScenarioPlayer`.
- [x] Build `ScenarioBrief`.
- [x] Build `VisualizationStep`.
- [x] Build `GuidedOptions`.
- [x] Build `DefenseView`.
- [x] Add a simple Vulnerable/Secure mode toggle.
- [x] Support next and back step navigation.
- [x] Show short feedback after guided choices.
- [x] Reuse this player for all four scenarios.

## Milestone 5: Local Learning Progress

- [x] Create `progressStorage.js`.
- [x] Save progress in `localStorage`.
- [x] Track completed scenario ids.
- [x] Track current step per scenario.
- [x] Track whether the learner viewed both Vulnerable Mode and Secure Mode.
- [x] Track optional reflection answers.
- [x] Confirm progress remains after refresh.

## Milestone 6: SQL Injection Simulation

- [x] Create `sqlInjectionScenario.js`.
- [x] Build `SqlQueryVisualizer`.
- [x] Vulnerable Mode: show unsafe input changing a simulated query result.
- [x] Secure Mode: show parameterized query behavior conceptually.
- [x] Show a mock table and simulated query text.
- [x] Add a Defense View about parameterized queries and validation.
- [x] Confirm no real database or SQL execution is used.

## Milestone 7: XSS Simulation

- [x] Create `xssScenario.js`.
- [x] Build `XssVisualizer`.
- [x] Vulnerable Mode: show untrusted content appearing in a mock page preview.
- [x] Secure Mode: show escaped or sanitized content.
- [x] Explain the difference between unsafe rendering and safe text output.
- [x] Add a Defense View about output encoding and sanitization.
- [x] Confirm no real script execution is allowed.

## Milestone 8: CSRF Simulation

- [x] Create `csrfScenario.js`.
- [x] Build `CsrfRequestVisualizer`.
- [x] Vulnerable Mode: show a simulated unwanted request changing a mock setting.
- [x] Secure Mode: show the request blocked by token or SameSite protection.
- [x] Show mock browser, request, token, and server decision states.
- [x] Add a Defense View about CSRF tokens and SameSite cookies.
- [x] Confirm no real network request is sent.

## Milestone 9: Buffer Overflow Visual Simulation

- [ ] Create `bufferOverflowScenario.js`.
- [ ] Build `BufferMemoryVisualizer`.
- [ ] Vulnerable Mode: show oversized input overflowing visual memory cells.
- [ ] Secure Mode: show bounds checking rejecting or truncating oversized input.
- [ ] Keep the visualization conceptual and beginner-friendly.
- [ ] Add a Defense View about bounds checks, safer APIs, and memory-safe languages.
- [ ] Confirm no unsafe native code is used.

## Milestone 10: MVP Review and Polish

- [ ] Confirm all four scenarios use the same `ScenarioPlayer`.
- [ ] Confirm every scenario has Vulnerable Mode and Secure Mode.
- [ ] Confirm every scenario has a Defense View.
- [ ] Confirm all learner inputs are Guided Options.
- [ ] Confirm no live requests, real databases, or real attack execution exist.
- [ ] Make the dashboard and scenario screens responsive.
- [ ] Make buttons keyboard accessible.
- [ ] Ensure visual states also have text explanations.
- [ ] Update README with setup and usage instructions.
- [ ] Run production build.

## MVP Attack List

- [x] SQL Injection
- [x] Cross-Site Scripting (XSS)
- [x] Cross-Site Request Forgery (CSRF)
- [ ] Buffer Overflow, visual simulation only
