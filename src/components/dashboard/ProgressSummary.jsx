import { Activity } from "lucide-react";
import { Panel } from "../ui/Panel.jsx";

export function ProgressSummary({ completedCount, totalCount }) {
  const progressPercent = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <Panel className="h-fit">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-800 text-signal-400">
          <Activity aria-hidden="true" className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Local Progress</h2>
          <p className="text-sm text-slate-400">Saved in your browser</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-semibold text-white">{completedCount}</span>
          <span className="pb-1 text-sm text-slate-400">of {totalCount} complete</span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-800">
          <div
            className="h-full rounded-full bg-signal-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </Panel>
  );
}
