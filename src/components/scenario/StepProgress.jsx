import { Panel } from "../ui/Panel.jsx";

export function StepProgress({ currentStep, totalSteps }) {
  const progressPercent = totalSteps === 0 ? 0 : (currentStep / totalSteps) * 100;

  return (
    <Panel className="py-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-300">
          Step {currentStep} of {totalSteps}
        </p>
        <div className="h-2 w-40 overflow-hidden rounded-full bg-surface-800">
          <div
            className="h-full rounded-full bg-signal-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </Panel>
  );
}
