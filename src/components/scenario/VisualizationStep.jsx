import { motion, AnimatePresence } from "framer-motion";
import { User, Server, Eye, Lightbulb } from "lucide-react";
import { Panel } from "../ui/Panel.jsx";
import { SqlQueryVisualizer } from "../visualizations/SqlQueryVisualizer.jsx";
import { XssVisualizer } from "../visualizations/XssVisualizer.jsx";

export function VisualizationStep({ step, modeContent, scenarioId, mode }) {
  const timelineItems = [
    {
      id: "action",
      label: "Student Action",
      value: step.studentAction,
      icon: User,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    {
      id: "reaction",
      label: "System Reaction",
      value: step.systemReaction,
      icon: Server,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20",
    },
    {
      id: "visual",
      label: "Visual State Change",
      value: step.visualStateChange,
      icon: Eye,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
    },
    {
      id: "learning",
      label: "Learning Point",
      value: step.learningPoint,
      icon: Lightbulb,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
    },
  ];

  return (
    <Panel className="overflow-hidden">
      <div className="grid gap-8 lg:grid-cols-[1fr_24rem] xl:grid-cols-[1fr_30rem]">
        {/* Left Side: Timeline */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold uppercase tracking-wide text-signal-400">
            Attack Flow
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white">{step.title}</h2>

          <div className="relative mt-8 space-y-6 before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-slate-800/80">
            <AnimatePresence mode="popLayout">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={item.id + step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.4, ease: "easeOut" }}
                  className="relative pl-14"
                >
                  <div className={`absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-surface-950 ring-4 ring-surface-900 ${item.color}`}>
                    <div className={`flex h-full w-full items-center justify-center rounded-full border ${item.bg} ${item.border}`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300">{item.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Visualizer */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={scenarioId + mode + step.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {scenarioId === "sql-injection" ? (
                <SqlQueryVisualizer step={step} mode={mode} />
              ) : scenarioId === "xss" ? (
                <XssVisualizer step={step} mode={mode} />
              ) : (
                <GenericVisualizer modeContent={modeContent} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Panel>
  );
}

function GenericVisualizer({ modeContent }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-800 bg-surface-950 p-6 shadow-xl">
      <p className="text-sm font-semibold text-white">Simulated State</p>
      <dl className="mt-4 grid gap-4">
        {Object.entries(modeContent.visualState).map(([key, value]) => (
          <div key={key} className="rounded-lg border border-slate-800/50 bg-surface-900/50 p-4">
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
  );
}

function formatLabel(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
