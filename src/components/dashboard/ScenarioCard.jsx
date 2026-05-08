import { ArrowRight, ShieldAlert } from "lucide-react";
import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";
import { Panel } from "../ui/Panel.jsx";

export function ScenarioCard({ scenario }) {
  return (
    <Panel className="flex min-h-72 flex-col justify-between gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-800 text-signal-400">
            <ShieldAlert aria-hidden="true" className="h-5 w-5" />
          </div>
          <Badge>Not started</Badge>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-white">{scenario.title}</h2>
            <Badge>{scenario.difficulty}</Badge>
          </div>
          <p className="mt-2 text-sm text-slate-400">{scenario.category}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {scenario.description}
          </p>
        </div>

        <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
          <div className="rounded-md border border-slate-800 bg-surface-950 p-3">
            <p className="font-medium text-white">{scenario.vulnerableMode.title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              {scenario.vulnerableMode.summary}
            </p>
          </div>
          <div className="rounded-md border border-slate-800 bg-surface-950 p-3">
            <p className="font-medium text-white">{scenario.secureMode.title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              {scenario.secureMode.summary}
            </p>
          </div>
        </div>
      </div>

      <Button type="button" className="w-full justify-between">
        Start scenario
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Button>
    </Panel>
  );
}
