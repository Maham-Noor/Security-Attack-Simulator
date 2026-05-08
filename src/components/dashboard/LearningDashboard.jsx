import { getScenarios } from "../../services/scenarioCatalog.js";
import { getProgress, isScenarioComplete, getScenarioStep } from "../../services/progressStorage.js";
import { ProgressSummary } from "./ProgressSummary.jsx";
import { ScenarioCard } from "./ScenarioCard.jsx";

export function LearningDashboard({ onStartScenario }) {
  const scenarios = getScenarios();
  const progress = getProgress();
  const completedCount = progress.completedScenarios.length;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <section className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-signal-400">
            Learning Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            Choose an Attack Scenario
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
            Compare Vulnerable Mode with Secure Mode using safe, guided
            simulations. No real systems, requests, databases, or payloads are
            used.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onStart={() => onStartScenario(scenario.id)}
              isCompleted={isScenarioComplete(scenario.id)}
              currentStep={getScenarioStep(scenario.id)}
            />
          ))}
        </div>
      </section>

      <ProgressSummary completedCount={completedCount} totalCount={scenarios.length} />
    </div>
  );
}
