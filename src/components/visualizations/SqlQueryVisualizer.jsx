import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Table,
  AlertTriangle,
  ShieldCheck,
  Activity,
  BrainCircuit,
  Terminal,
} from "lucide-react";

export function SqlQueryVisualizer({ step, mode }) {
  const sqlData = step.sqlData;
  if (!sqlData) return null;

  const {
    usernameInput,
    passwordInput,
    queryPrefix,
    queryMiddle,
    mockTable,
    vulnerable,
    secure,
  } = sqlData;

  const isVulnerable = mode === "vulnerable";
  const stateData = isVulnerable ? vulnerable : secure;

  // Detect injection attempts
  const isAttack = passwordInput.includes("'") || passwordInput.includes(" OR ");
  const isCompromised = isVulnerable && isAttack;
  const isProtected = !isVulnerable && isAttack;

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto pr-2 pb-4">
      <SystemIntegrityStatus
        isCompromised={isCompromised}
        isProtected={isProtected}
        isAttack={isAttack}
      />

      <QueryEngine
        queryPrefix={queryPrefix}
        queryMiddle={queryMiddle}
        usernameInput={usernameInput}
        passwordInput={passwordInput}
        isVulnerable={isVulnerable}
        isAttack={isAttack}
      />

      {/* Show the Logic Evaluator ONLY if there's an attack, for the "Aha" moment. Otherwise it's normal logic. */}
      {isAttack && (
        <LogicEvaluator
          isVulnerable={isVulnerable}
          usernameInput={usernameInput}
          passwordInput={passwordInput}
        />
      )}

      <DatabaseResponse
        mockTable={mockTable}
        stateData={stateData}
        isVulnerable={isVulnerable}
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
          label="Query Integrity"
          status={isCompromised ? "Compromised" : "Protected"}
          isBad={isCompromised}
        />
        <StatusCard
          label="Access Control"
          status={isCompromised ? "Bypassed" : "Active"}
          isBad={isCompromised}
        />
        <StatusCard
          label="Auth State"
          status={isCompromised ? "Failed Open" : isProtected ? "Secure" : "Normal"}
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
                CRITICAL: UNAUTHORIZED ACCESS GRANTED
              </span>
            </div>
          )}
          {isProtected && (
            <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-bold tracking-wide">
                DEFENDED: MALICIOUS PAYLOAD NEUTRALIZED
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

function QueryEngine({
  queryPrefix,
  queryMiddle,
  usernameInput,
  passwordInput,
  isVulnerable,
  isAttack,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-surface-950 p-5 shadow-2xl">
      <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
        <Terminal className="h-4 w-4 text-signal-400" />
        Live Query Engine
      </p>
      <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-[#0d1117] p-5 font-mono text-sm leading-relaxed text-slate-300 shadow-inner">
        <span className="text-blue-400">{queryPrefix}</span>
        <AnimatePresence mode="popLayout">
          {isVulnerable ? (
            <motion.span
              key="vuln-user"
              className="mx-1 rounded bg-slate-800/50 px-1.5 py-0.5 text-slate-200 ring-1 ring-slate-700"
            >
              '{usernameInput}'
            </motion.span>
          ) : (
            <motion.span
              key="sec-user"
              className="mx-1 rounded bg-amber-500/20 px-1.5 py-0.5 font-bold text-amber-300 ring-1 ring-amber-500/50"
            >
              ?
            </motion.span>
          )}
        </AnimatePresence>

        <span className="text-blue-400">{queryMiddle}</span>

        <AnimatePresence mode="popLayout">
          {isVulnerable ? (
            <motion.span
              key="vuln-pass"
              className={`mx-1 inline-block rounded px-1.5 py-0.5 font-bold ${
                isAttack
                  ? "bg-rose-500/20 text-rose-300 ring-1 ring-rose-500/50"
                  : "bg-slate-800/50 text-slate-200 ring-1 ring-slate-700"
              }`}
            >
              '{passwordInput}'
            </motion.span>
          ) : (
            <motion.span
              key="sec-pass"
              className="mx-1 rounded bg-amber-500/20 px-1.5 py-0.5 font-bold text-amber-300 ring-1 ring-amber-500/50"
            >
              ?
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!isVulnerable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden rounded-lg border border-slate-800 bg-[#0d1117] p-4 font-mono text-sm"
          >
            <span className="text-slate-500">{"// Bound Parameters"}</span>
            <div className="mt-2 flex flex-col gap-2">
              <div>
                <span className="text-slate-400">$1 (username): </span>
                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">
                  {usernameInput}
                </span>
              </div>
              <div>
                <span className="text-slate-400">$2 (password): </span>
                <span
                  className={`rounded px-1.5 py-0.5 ${
                    isAttack
                      ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/50"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {passwordInput}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LogicEvaluator({ isVulnerable, usernameInput, passwordInput }) {
  // We simulate the breakdown of `username = 'student' AND password = '' OR '1'='1'`
  // In vulnerable mode, the OR condition is exposed. In secure mode, it is treated as a literal.

  return (
    <div className="rounded-xl border border-indigo-500/30 bg-surface-950 p-5 shadow-[0_0_20px_rgba(99,102,241,0.05)]">
      <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-400">
        <BrainCircuit className="h-5 w-5" />
        Boolean Logic Evaluation
      </p>

      {isVulnerable ? (
        <div className="flex flex-col gap-4 font-mono text-sm">
          {/* Operator Precedence Group */}
          <div className="relative rounded-lg border border-slate-800 bg-surface-900/50 p-4 pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-2 rounded-l-lg bg-slate-700" />
            
            <div className="flex items-center justify-between border-b border-slate-800/50 pb-2">
              <span className="text-slate-300">username = '{usernameInput}'</span>
              <span className="rounded bg-emerald-500/20 px-2 py-1 font-bold text-emerald-400">TRUE</span>
            </div>
            
            <div className="my-2 text-blue-400 font-bold ml-2">AND</div>
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-300">password = ''</span>
              <span className="rounded bg-rose-500/20 px-2 py-1 font-bold text-rose-400">FALSE</span>
            </div>

            <div className="mt-4 flex items-center justify-between rounded bg-surface-950 p-2">
              <span className="text-slate-500 italic">Group Result:</span>
              <span className="font-bold text-rose-400">FALSE</span>
            </div>
          </div>

          <div className="flex justify-center">
            <span className="rounded bg-rose-500/20 px-3 py-1 font-bold text-rose-400 ring-1 ring-rose-500/50">OR</span>
          </div>

          <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">'1' = '1'</span>
              <span className="rounded bg-emerald-500/20 px-2 py-1 font-bold text-emerald-400">ALWAYS TRUE</span>
            </div>
          </div>

          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="mt-2 flex items-center justify-between rounded-lg border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          >
            <span className="font-bold text-white uppercase tracking-wider">Final Evaluation</span>
            <span className="text-xl font-black text-emerald-400">➔ TRUE</span>
          </motion.div>
          <p className="mt-2 text-center text-xs text-slate-400">
            Because of operator precedence, the injected OR condition overrides the password failure.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 font-mono text-sm">
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">username = '{usernameInput}'</span>
              <span className="rounded bg-emerald-500/20 px-2 py-1 font-bold text-emerald-400">TRUE</span>
            </div>
          </div>

          <div className="flex justify-center">
            <span className="font-bold text-blue-400">AND</span>
          </div>

          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">password = '{passwordInput}'</span>
              <span className="rounded bg-rose-500/20 px-2 py-1 font-bold text-rose-400">FALSE</span>
            </div>
          </div>

          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="mt-2 flex items-center justify-between rounded-lg border border-slate-700 bg-surface-900 p-4"
          >
            <span className="font-bold text-white uppercase tracking-wider">Final Evaluation</span>
            <span className="text-xl font-black text-rose-400">➔ FALSE</span>
          </motion.div>
          <p className="mt-2 text-center text-xs text-slate-400">
            The injected payload is evaluated strictly as a string literal. The logic remains intact.
          </p>
        </div>
      )}
    </div>
  );
}

function DatabaseResponse({ mockTable, stateData, isVulnerable }) {
  const rowCount = stateData.returnedRowIds.length;

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-surface-950 p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
          <Database aria-hidden="true" className="h-4 w-4 text-signal-400" />
          Database Response
        </p>
        <span className="rounded-full bg-surface-800 px-3 py-1 text-xs font-bold text-slate-300">
          {rowCount} {rowCount === 1 ? "Row" : "Rows"} Returned
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-800 shadow-inner">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0d1117] text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Username</th>
              <th className="px-4 py-3 font-medium">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 bg-surface-950">
            <AnimatePresence>
              {mockTable.map((row, index) => {
                const isReturned = stateData.returnedRowIds.includes(row.id);
                // In an authentication bypass, returning ANY row (especially admin) is critical.
                // We highlight rows that are returned but shouldn't be (admin/teacher) as LEAKED.
                const isUnintended =
                  isReturned && row.role !== "student" && isVulnerable;

                return (
                  <motion.tr
                    key={row.id}
                    initial={false}
                    animate={{
                      backgroundColor: isUnintended
                        ? "rgba(244, 63, 94, 0.15)" // rose-500/15
                        : isReturned
                        ? "rgba(14, 165, 233, 0.1)" // sky-500/10
                        : "rgba(15, 23, 42, 1)", // surface-950
                      opacity: isReturned ? 1 : 0.4,
                      scale: isReturned ? 1 : 0.99,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: isReturned ? index * 0.1 : 0,
                    }}
                    className="relative"
                  >
                    <td className="px-4 py-3 font-mono">{row.id}</td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        isUnintended
                          ? "text-rose-300"
                          : isReturned
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {row.name}
                    </td>
                    <td className="px-4 py-3">{row.role}</td>
                    {isUnintended && (
                      <motion.td
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <span className="flex items-center gap-1 rounded bg-rose-500/20 px-2 py-0.5 text-xs font-bold tracking-wider text-rose-400 ring-1 ring-rose-500/50">
                          LEAKED
                        </span>
                      </motion.td>
                    )}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
        <AnimatePresence>
          {rowCount === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 text-center text-sm font-medium text-slate-500 bg-[#0d1117]"
            >
              Access Denied: No matching user record found.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
