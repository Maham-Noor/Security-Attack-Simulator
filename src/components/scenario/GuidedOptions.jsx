import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { Panel } from "../ui/Panel.jsx";

export function GuidedOptions({ options, selectedOptionId, onSelect }) {
  const selectedOption = options.find((option) => option.id === selectedOptionId);

  return (
    <Panel>
      <h2 className="text-lg font-semibold text-white">Guided Options</h2>
      <p className="mt-1 text-sm leading-6 text-slate-400">
        Choose from safe predefined options. No arbitrary payloads are used.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((option) => (
          <Button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={
              option.id === selectedOptionId
                ? "bg-signal-400"
                : "bg-surface-800 text-slate-100 hover:bg-slate-700"
            }
          >
            {option.label}
          </Button>
        ))}
      </div>

      {selectedOption ? (
        <div className="mt-4 flex gap-3 rounded-md border border-slate-800 bg-surface-950 p-4">
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-signal-400"
          />
          <p className="text-sm leading-6 text-slate-300">{selectedOption.feedback}</p>
        </div>
      ) : null}
    </Panel>
  );
}
