import { Panel } from "../ui/Panel.jsx";

export function VisualizationStep({ step, modeContent }) {
  return (
    <Panel>
      <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-signal-400">
            Step
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-white">{step.title}</h2>
          <div className="mt-5 grid gap-3">
            <StepDetail label="Student action" value={step.studentAction} />
            <StepDetail label="System reaction" value={step.systemReaction} />
            <StepDetail label="Visual state change" value={step.visualStateChange} />
            <StepDetail label="Learning point" value={step.learningPoint} />
          </div>
        </div>

        <div className="rounded-md border border-slate-800 bg-surface-950 p-4">
          <p className="text-sm font-semibold text-white">Simulated State</p>
          <dl className="mt-3 grid gap-3">
            {Object.entries(modeContent.visualState).map(([key, value]) => (
              <div key={key}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {formatLabel(key)}
                </dt>
                <dd className="mt-1 break-words text-sm leading-6 text-slate-300">
                  {Array.isArray(value) ? value.join(", ") : value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Panel>
  );
}

function StepDetail({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium text-white">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-300">{value}</p>
    </div>
  );
}

function formatLabel(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
