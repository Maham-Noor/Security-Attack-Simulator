import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { Panel } from "../ui/Panel.jsx";
import { DefenseView } from "./DefenseView.jsx";
import { GuidedOptions } from "./GuidedOptions.jsx";
import { ScenarioBrief } from "./ScenarioBrief.jsx";
import { StepProgress } from "./StepProgress.jsx";
import { VisualizationStep } from "./VisualizationStep.jsx";

import {
  getScenarioStep,
  saveScenarioStep,
  markModeViewed,
  markScenarioComplete,
} from "../../services/progressStorage.js";

const MODES = {
  vulnerable: "vulnerable",
  secure: "secure",
};

export function ScenarioPlayer({ scenario, onBack }) {
  const [mode, setMode] = useState(() => {
    markModeViewed(scenario.id, MODES.vulnerable);
    return MODES.vulnerable;
  });
  const [stepIndex, setStepIndex] = useState(() => getScenarioStep(scenario.id));
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [showDefense, setShowDefense] = useState(false);

  const step = scenario.steps[stepIndex];
  const modeContent =
    mode === MODES.vulnerable ? scenario.vulnerableMode : scenario.secureMode;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === scenario.steps.length - 1;

  function handleModeChange(nextMode) {
    markModeViewed(scenario.id, nextMode);
    setMode(nextMode);
    setSelectedOptionId("");
  }

  function handlePrevious() {
    if (showDefense) {
      setShowDefense(false);
      return;
    }

    setStepIndex((currentStep) => {
      const prevStep = Math.max(currentStep - 1, 0);
      saveScenarioStep(scenario.id, prevStep);
      return prevStep;
    });
    setSelectedOptionId("");
  }

  function handleNext() {
    if (showDefense) {
      markScenarioComplete(scenario.id);
      onBack();
      return;
    }

    if (isLastStep) {
      setShowDefense(true);
      return;
    }

    setStepIndex((currentStep) => {
      const nextStep = currentStep + 1;
      saveScenarioStep(scenario.id, nextStep);
      return nextStep;
    });
    setSelectedOptionId("");
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back to dashboard
      </button>

      <ScenarioBrief scenario={scenario} />

      <Panel>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-signal-400">
              Mode comparison
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white">
              {modeContent.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
              {modeContent.summary}
            </p>
          </div>

          <div className="grid grid-cols-2 rounded-md border border-slate-800 bg-surface-950 p-1">
            <button
              type="button"
              onClick={() => handleModeChange(MODES.vulnerable)}
              className={`rounded px-3 py-2 text-sm font-medium transition ${
                mode === MODES.vulnerable
                  ? "bg-signal-500 text-surface-950"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Vulnerable
            </button>
            <button
              type="button"
              onClick={() => handleModeChange(MODES.secure)}
              className={`rounded px-3 py-2 text-sm font-medium transition ${
                mode === MODES.secure
                  ? "bg-signal-500 text-surface-950"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Secure
            </button>
          </div>
        </div>
      </Panel>

      {showDefense ? (
        <DefenseView defense={scenario.defense} />
      ) : (
        <>
          <StepProgress currentStep={stepIndex + 1} totalSteps={scenario.steps.length} />
          <VisualizationStep
            step={step}
            modeContent={modeContent}
            scenarioId={scenario.id}
            mode={mode}
          />
          <GuidedOptions
            options={step.guidedOptions}
            selectedOptionId={selectedOptionId}
            onSelect={setSelectedOptionId}
          />
        </>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          onClick={handlePrevious}
          disabled={isFirstStep && !showDefense}
          className="bg-surface-800 text-slate-100 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </Button>
        <Button type="button" onClick={handleNext}>
          {showDefense ? "Finish review" : isLastStep ? "View defense" : "Next step"}
          <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
