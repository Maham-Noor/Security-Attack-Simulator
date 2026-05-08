import { ShieldCheck } from "lucide-react";
import { Panel } from "../ui/Panel.jsx";

export function DefenseView({ defense }) {
  return (
    <Panel>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-800 text-signal-400">
          <ShieldCheck aria-hidden="true" className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-signal-400">
            Defense View
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-white">{defense.title}</h2>
          <ul className="mt-4 grid gap-3">
            {defense.points.map((point) => (
              <li key={point} className="rounded-md border border-slate-800 bg-surface-950 p-4 text-sm leading-6 text-slate-300">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}
