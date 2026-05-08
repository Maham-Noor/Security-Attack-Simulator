import {
  bufferOverflowScenario,
  csrfScenario,
  sqlInjectionScenario,
  xssScenario,
} from "../data/scenarios/index.js";

const scenarios = [
  sqlInjectionScenario,
  xssScenario,
  csrfScenario,
  bufferOverflowScenario,
];

export function getScenarios() {
  return scenarios;
}

export function getScenarioById(id) {
  return scenarios.find((scenario) => scenario.id === id);
}
