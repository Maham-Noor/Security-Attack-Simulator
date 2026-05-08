import { Badge } from "../ui/Badge.jsx";
import { Panel } from "../ui/Panel.jsx";

export function ScenarioBrief({ scenario }) {
  return (
    <Panel>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{scenario.category}</Badge>
          <Badge>{scenario.difficulty}</Badge>
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-white">{scenario.title}</h1>
          <p className="mt-2 max-w-3xl text-base leading-7 text-slate-300">
            {scenario.description}
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <BriefItem label="Concept" value={scenario.brief.concept} />
          <BriefItem label="Safe Target" value={scenario.brief.safeTarget} />
          <BriefItem label="Watch For" value={scenario.brief.watchFor} />
        </div>
      </div>
    </Panel>
  );
}

function BriefItem({ label, value }) {
  return (
    <div className="rounded-md border border-slate-800 bg-surface-950 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-signal-400">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{value}</p>
    </div>
  );
}
