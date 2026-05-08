# First Implementation Tasks

Recommended first coding slice:

```txt
Dashboard -> scenario data -> ScenarioPlayer -> SQL scenario -> local progress
```

Keep the implementation small. Build the reusable engine first, then add the four MVP scenarios.

## Task 1: Finish Scaffold

- [ ] Install dependencies with `npm install`.
- [ ] Start the app with `npm run dev`.
- [ ] Confirm the dashboard renders.

## Task 2: Create MVP Scenario Data

- [ ] Create `src/data/scenarios/sqlInjectionScenario.js`.
- [ ] Create `src/data/scenarios/xssScenario.js`.
- [ ] Create `src/data/scenarios/csrfScenario.js`.
- [ ] Create `src/data/scenarios/bufferOverflowScenario.js`.
- [ ] Create `src/data/scenarios/index.js`.
- [ ] Give each scenario `vulnerableMode`, `secureMode`, `steps`, and `defense`.

## Task 3: Create Scenario Catalog

- [ ] Create `src/services/scenarioCatalog.js`.
- [ ] Add `getScenarios()`.
- [ ] Add `getScenarioById(id)`.

## Task 4: Build Local Progress

- [ ] Create `src/services/progressStorage.js`.
- [ ] Store progress in `localStorage`.
- [ ] Save current step.
- [ ] Save viewed modes.
- [ ] Save completion.
- [ ] Save optional reflection answer.

## Task 5: Connect Dashboard

- [ ] Load scenarios from `scenarioCatalog.js`.
- [ ] Show four MVP scenarios only.
- [ ] Show completion state from local progress.
- [ ] Add start or continue action.

## Task 6: Build Reusable Scenario Player

- [ ] Create `ScenarioPlayer`.
- [ ] Create `ScenarioBrief`.
- [ ] Create `VisualizationStep`.
- [ ] Create `GuidedOptions`.
- [ ] Create `DefenseView`.
- [ ] Create `StepProgress`.
- [ ] Add simple Vulnerable/Secure mode toggle.
- [ ] Add next and back navigation.

## Task 7: Build SQL Simulation First

- [ ] Create `SqlQueryVisualizer`.
- [ ] Show vulnerable simulated query behavior.
- [ ] Show secure parameterized-query concept.
- [ ] Show mock database result.
- [ ] Add SQL Defense View.
- [ ] Confirm no real SQL is executed.

## Task 8: Add Remaining MVP Simulations

- [ ] Create `XssVisualizer`.
- [ ] Create `CsrfRequestVisualizer`.
- [ ] Create `BufferMemoryVisualizer`.
- [ ] Connect each visualizer to the shared `ScenarioPlayer`.
- [ ] Confirm every scenario has Vulnerable Mode and Secure Mode.

## Task 9: Verify MVP Safety

- [ ] Confirm no live requests are sent.
- [ ] Confirm no real database is used.
- [ ] Confirm no scripts are executed in the XSS simulation.
- [ ] Confirm Buffer Overflow is visual only.
- [ ] Confirm learner inputs use Guided Options only.
