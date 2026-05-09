import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  Code,
  LayoutTemplate,
  Server,
  ArrowRight,
} from "lucide-react";

export function XssVisualizer({ step, mode }) {
  const xssData = step.xssData;
  if (!xssData) return null;

  const { payload, isAttack } = xssData;
  const isVulnerable = mode === "vulnerable";
  const isCompromised = isVulnerable && isAttack;
  const isProtected = !isVulnerable && isAttack;

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto pr-2 pb-4">
      <SystemIntegrityStatus
        isCompromised={isCompromised}
        isProtected={isProtected}
        isAttack={isAttack}
      />

      {isAttack && (
        <DataFlowEvaluator isVulnerable={isVulnerable} payload={payload} />
      )}

      <MockBrowser
        payload={payload}
        isAttack={isAttack}
        isVulnerable={isVulnerable}
        isCompromised={isCompromised}
      />
    </div>
  );
}

function SystemIntegrityStatus({ isCompromised, isProtected, isAttack }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-surface-950 p-5 shadow-2xl">
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
        <Activity className="h-4 w-4 text-signal-400" />
        System Integrity Status
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatusCard
          label="Encoding Pipeline"
          status={isCompromised ? "Bypassed" : "Active"}
          isBad={isCompromised}
        />
        <StatusCard
          label="DOM Context"
          status={isCompromised ? "Executable Node" : "Text Node"}
          isBad={isCompromised}
        />
        <StatusCard
          label="Execution State"
          status={isCompromised ? "Compromised" : isProtected ? "Protected" : "Normal"}
          isBad={isCompromised}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isCompromised ? "compromised" : isProtected ? "protected" : "normal"}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="mt-2 overflow-hidden"
        >
          {isCompromised && (
            <div className="flex items-center gap-3 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <AlertTriangle className="h-5 w-5" />
              </motion.div>
              <span className="text-sm font-bold tracking-wide">
                CRITICAL: SCRIPT EXECUTION DETECTED IN DOM
              </span>
            </div>
          )}
          {isProtected && (
            <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-bold tracking-wide">
                DEFENDED: PAYLOAD SAFELY ENCODED AS TEXT
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StatusCard({ label, status, isBad }) {
  return (
    <div
      className={`rounded-lg border p-3 ${
        isBad
          ? "border-rose-500/30 bg-rose-500/5"
          : "border-slate-800 bg-surface-900/50"
      }`}
    >
      <p className="text-xs text-slate-400">{label}</p>
      <p
        className={`mt-1 font-mono text-sm font-bold uppercase ${
          isBad ? "text-rose-400" : "text-emerald-400"
        }`}
      >
        {status}
      </p>
    </div>
  );
}

function DataFlowEvaluator({ isVulnerable, payload }) {
  return (
    <div className="rounded-xl border border-indigo-500/30 bg-surface-950 p-5 shadow-[0_0_20px_rgba(99,102,241,0.05)]">
      <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-400">
        <Code className="h-5 w-5" />
        Data Flow Evaluator
      </p>

      <div className="flex flex-col gap-4 font-mono text-sm">
        {/* Step 1: Input */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-900 border border-slate-700">
            <Server className="h-5 w-5 text-slate-400" />
          </div>
          <div className="flex-1 rounded-lg border border-slate-800 bg-surface-900/50 p-3">
            <span className="text-xs text-slate-500 block mb-1">Server Response Body</span>
            <div className="text-blue-400 whitespace-pre-wrap">{payload}</div>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="h-5 w-5 rotate-90 text-slate-600" />
        </div>

        {/* Step 2: Browser Encoding Engine */}
        {isVulnerable ? (
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 border border-rose-500/30">
              <AlertTriangle className="h-5 w-5 text-rose-400" />
            </div>
            <div className="flex-1 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3">
              <span className="text-xs text-rose-400 block mb-1 font-bold">Unsafe Rendering (innerHTML)</span>
              <div className="text-slate-300">Browser evaluates payload as executable HTML tags.</div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex-1 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
              <span className="text-xs text-emerald-400 block mb-1 font-bold">Output Encoding (textContent)</span>
              <div className="text-slate-300">
                &lt;script&gt; is safely encoded to <span className="text-amber-400 font-bold">&amp;lt;script&amp;gt;</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function MockBrowser({ payload, isAttack, isCompromised, isVulnerable }) {
  // We simulate the execution of the payload to avoid actually running eval() or dangerouslySetInnerHTML.
  // The payload targets "account-status".
  
  const originalStatus = "Account Active: All systems normal.";
  const compromisedStatus = "⚠ Session Compromised: Untrusted Script Executed";

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-[#0d1117] shadow-2xl overflow-hidden">
      {/* Mock Browser Chrome */}
      <div className="flex items-center gap-2 border-b border-slate-800 bg-surface-950 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <div className="ml-4 flex-1 rounded bg-surface-900 px-3 py-1 font-mono text-xs text-slate-400">
          https://mock-app.local/profile
        </div>
      </div>

      {/* Mock Page Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-xl font-bold text-blue-400">
            S
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Student User</h2>
            <p className="text-sm text-slate-400">Member since 2026</p>
          </div>
        </div>

        {/* The Target Div */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Account Status Widget
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={isCompromised ? "compromised" : "safe"}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`rounded-lg border p-4 ${
                isCompromised
                  ? "border-rose-500/50 bg-rose-500/10 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                  : "border-slate-800 bg-surface-900 text-slate-300"
              }`}
            >
              <div className="font-mono text-sm">
                <span className="text-slate-500 opacity-50 block mb-1">
                  &lt;div id="account-status"&gt;
                </span>
                <span className={isCompromised ? "font-bold text-rose-400" : ""}>
                  {isCompromised ? compromisedStatus : originalStatus}
                </span>
                <span className="text-slate-500 opacity-50 block mt-1">
                  &lt;/div&gt;
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* The Injection Point (Comments Section) */}
        <div className="mt-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Recent Comments
          </p>
          <div className="rounded-lg border border-slate-800 bg-surface-950 p-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-800"></div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-300">Anonymous</p>
                <div className="mt-1 font-mono text-sm leading-relaxed">
                  {/* If compromised, the script tag is invisible because it was executed! */}
                  {/* If secure, the script tag is rendered safely as text. */}
                  {/* If not an attack, just normal text. */}
                  {isCompromised ? (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-slate-600 italic"
                    >
                      {payload} (Hidden: Executed by DOM)
                    </motion.div>
                  ) : (
                    <span className="text-amber-400">{payload}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
