import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  Cpu,
  MemoryStick,
  Terminal,
} from "lucide-react";

export function BufferMemoryVisualizer({ step, mode }) {
  const bufferData = step.bufferData;
  if (!bufferData) return null;

  const { payload, isAttack } = bufferData;
  const isVulnerable = mode === "vulnerable";
  const isCompromised = isVulnerable && isAttack;
  const isProtected = !isVulnerable && isAttack;

  // Buffer is 8 bytes, return address is 4 bytes
  const BUFFER_SIZE = 8;
  const RETURN_ADDR_SIZE = 4;
  const ORIGINAL_RETURN_ADDR = "0x08";

  // Determine what actually gets written
  const effectivePayload = isVulnerable
    ? payload
    : payload.slice(0, BUFFER_SIZE);

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto pr-2 pb-4">
      <SystemIntegrityStatus
        isCompromised={isCompromised}
        isProtected={isProtected}
        isAttack={isAttack}
      />

      <MemoryLayoutPanel
        payload={payload}
        effectivePayload={effectivePayload}
        bufferSize={BUFFER_SIZE}
        returnAddrSize={RETURN_ADDR_SIZE}
        originalReturnAddr={ORIGINAL_RETURN_ADDR}
        isVulnerable={isVulnerable}
        isAttack={isAttack}
        isCompromised={isCompromised}
        isProtected={isProtected}
      />

      <CodeComparisonPanel
        isVulnerable={isVulnerable}
        isAttack={isAttack}
        payload={payload}
      />

      <StackFrameState
        isCompromised={isCompromised}
        isProtected={isProtected}
        isAttack={isAttack}
        originalReturnAddr={ORIGINAL_RETURN_ADDR}
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
          label="Memory Bounds"
          status={isCompromised ? "Violated" : "Enforced"}
          isBad={isCompromised}
        />
        <StatusCard
          label="Return Address"
          status={isCompromised ? "Overwritten" : "Intact"}
          isBad={isCompromised}
        />
        <StatusCard
          label="Execution Flow"
          status={
            isCompromised ? "Hijacked" : isProtected ? "Protected" : "Normal"
          }
          isBad={isCompromised}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={
            isCompromised
              ? "compromised"
              : isProtected
              ? "protected"
              : "normal"
          }
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
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
                CRITICAL: RETURN ADDRESS OVERWRITTEN — EXECUTION HIJACKED
              </span>
            </div>
          )}
          {isProtected && (
            <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-bold tracking-wide">
                DEFENDED: INPUT TRUNCATED — BOUNDS CHECK ENFORCED
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

function MemoryLayoutPanel({
  payload,
  effectivePayload,
  bufferSize,
  returnAddrSize,
  originalReturnAddr,
  isVulnerable,
  isAttack,
  isCompromised,
  isProtected,
}) {
  const totalCells = bufferSize + returnAddrSize;

  // Build the memory cell data
  const cells = [];
  for (let i = 0; i < totalCells; i++) {
    const isReturnAddrRegion = i >= bufferSize;
    const charAtIndex = effectivePayload[i] || null;

    let state = "empty"; // empty, filled, overflow, protected
    if (charAtIndex) {
      if (isReturnAddrRegion && isCompromised) {
        state = "overflow";
      } else {
        state = "filled";
      }
    }

    cells.push({
      index: i,
      char: charAtIndex,
      isReturnAddr: isReturnAddrRegion,
      state,
      originalValue: isReturnAddrRegion
        ? originalReturnAddr.split("").concat(["x", "0", "8", " "])[
            i - bufferSize
          ]
        : null,
    });
  }

  // For the return address display
  const returnAddrChars = isCompromised
    ? effectivePayload.slice(bufferSize, bufferSize + returnAddrSize)
    : originalReturnAddr;

  return (
    <div className="rounded-xl border border-indigo-500/30 bg-surface-950 p-5 shadow-[0_0_20px_rgba(99,102,241,0.05)]">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-400">
        <MemoryStick className="h-5 w-5" />
        Stack Memory Layout
      </p>
      <p className="mb-5 text-xs text-slate-500">
        Visual representation of stack memory. Each cell = 1 byte.
      </p>

      {/* Input info */}
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="rounded-lg border border-slate-800 bg-surface-900/50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Input String
          </p>
          <p className="mt-0.5 font-mono text-sm font-bold text-white">
            &quot;{payload}&quot;
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-surface-900/50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Input Length
          </p>
          <p className="mt-0.5 font-mono text-sm font-bold text-white">
            {payload.length} bytes
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-surface-900/50 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Buffer Capacity
          </p>
          <p className="mt-0.5 font-mono text-sm font-bold text-white">
            {bufferSize} bytes
          </p>
        </div>
        {isAttack && (
          <div
            className={`rounded-lg border px-3 py-2 ${
              isCompromised
                ? "border-rose-500/30 bg-rose-500/10"
                : "border-emerald-500/30 bg-emerald-500/10"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Overflow
            </p>
            <p
              className={`mt-0.5 font-mono text-sm font-bold ${
                isCompromised ? "text-rose-400" : "text-emerald-400"
              }`}
            >
              {isCompromised
                ? `+${payload.length - bufferSize} bytes leaked`
                : "Prevented"}
            </p>
          </div>
        )}
      </div>

      {/* Memory Grid */}
      <div className="overflow-hidden rounded-lg border border-slate-800 bg-[#0d1117] p-4">
        {/* Address Header Row */}
        <div className="mb-1 flex gap-1">
          {cells.map((cell) => (
            <div
              key={`addr-${cell.index}`}
              className="flex-1 text-center font-mono text-[9px] text-slate-600"
            >
              0x{cell.index.toString(16).padStart(2, "0").toUpperCase()}
            </div>
          ))}
        </div>

        {/* Memory Cells */}
        <div className="flex gap-1">
          <AnimatePresence mode="popLayout">
            {cells.map((cell, index) => (
              <motion.div
                key={`cell-${cell.index}-${cell.char}-${isVulnerable}`}
                initial={{ opacity: 0, scale: 0.7, y: -10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className={`relative flex aspect-square flex-1 items-center justify-center rounded-md border-2 font-mono text-sm font-black transition-colors duration-300 ${getCellStyle(
                  cell.state,
                  cell.isReturnAddr
                )}`}
              >
                {cell.state === "overflow" && (
                  <motion.div
                    className="absolute inset-0 rounded-md bg-rose-500/20"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                )}
                <span className="relative z-10">
                  {cell.char || (cell.isReturnAddr ? "·" : "—")}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Region Labels */}
        <div className="mt-2 flex gap-1">
          <div className="flex flex-1 items-center justify-center" style={{ flexBasis: `${(bufferSize / totalCells) * 100}%` }}>
            <div className="rounded border border-blue-500/30 bg-blue-500/10 px-2 py-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                Username Buffer [{bufferSize} bytes]
              </span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center" style={{ flexBasis: `${(returnAddrSize / totalCells) * 100}%` }}>
            <div
              className={`rounded border px-2 py-0.5 ${
                isCompromised
                  ? "border-rose-500/30 bg-rose-500/10"
                  : "border-amber-500/30 bg-amber-500/10"
              }`}
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  isCompromised ? "text-rose-400" : "text-amber-400"
                }`}
              >
                Return Addr [{returnAddrSize}B]
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Return Address State */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-800 bg-surface-900/50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Original Return Address
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-amber-400">
            {originalReturnAddr} → main()
          </p>
        </div>
        <div
          className={`rounded-lg border p-3 ${
            isCompromised
              ? "border-rose-500/30 bg-rose-500/10"
              : "border-emerald-500/30 bg-emerald-500/10"
          }`}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Current Return Address
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={returnAddrChars}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mt-1 font-mono text-sm font-bold ${
                isCompromised ? "text-rose-400" : "text-emerald-400"
              }`}
            >
              {isCompromised
                ? `"${returnAddrChars}" → ???  ⚠`
                : `${originalReturnAddr} → main()  ✓`}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function getCellStyle(state, isReturnAddr) {
  switch (state) {
    case "overflow":
      return "border-rose-500 bg-rose-500/20 text-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.3)]";
    case "filled":
      return "border-blue-500/60 bg-blue-500/15 text-blue-300";
    case "empty":
      if (isReturnAddr) {
        return "border-amber-500/40 bg-amber-500/10 text-amber-300/60";
      }
      return "border-slate-700 bg-slate-800/30 text-slate-600";
    default:
      return "border-slate-700 bg-slate-800/30 text-slate-600";
  }
}

function CodeComparisonPanel({ isVulnerable, isAttack, payload }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-surface-950 p-5 shadow-2xl">
      <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
        <Terminal className="h-4 w-4 text-signal-400" />
        {isVulnerable ? "Vulnerable Code (C)" : "Secure Code (C)"}
      </p>

      <div className="overflow-hidden rounded-lg border border-slate-800 bg-[#0d1117] p-4 font-mono text-sm leading-relaxed">
        {isVulnerable ? (
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-500">
              {"// ⚠ No bounds checking"}
            </span>
            <span>
              <span className="text-blue-400">char</span>{" "}
              <span className="text-slate-200">username</span>
              <span className="text-slate-400">[</span>
              <span className="text-amber-300">8</span>
              <span className="text-slate-400">];</span>
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className={isAttack ? "text-rose-400" : "text-slate-200"}>
                strcpy
              </span>
              <span className="text-slate-400">(</span>
              <span className="text-slate-200">username</span>
              <span className="text-slate-400">, </span>
              <span
                className={`rounded px-1 ${
                  isAttack
                    ? "bg-rose-500/20 text-rose-300"
                    : "bg-slate-800 text-emerald-300"
                }`}
              >
                &quot;{payload}&quot;
              </span>
              <span className="text-slate-400">);</span>
            </motion.span>
            {isAttack && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-2 text-rose-400"
              >
                {"// ⚡ Copies all 16 bytes into 8-byte buffer!"}
              </motion.span>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-500">
              {"// ✓ Bounds-checked copy"}
            </span>
            <span>
              <span className="text-blue-400">char</span>{" "}
              <span className="text-slate-200">username</span>
              <span className="text-slate-400">[</span>
              <span className="text-amber-300">8</span>
              <span className="text-slate-400">];</span>
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-emerald-400">strncpy</span>
              <span className="text-slate-400">(</span>
              <span className="text-slate-200">username</span>
              <span className="text-slate-400">, </span>
              <span className="rounded bg-slate-800 px-1 text-emerald-300">
                &quot;{payload}&quot;
              </span>
              <span className="text-slate-400">, </span>
              <span className="text-amber-300">8</span>
              <span className="text-slate-400">);</span>
            </motion.span>
            {isAttack && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-2 text-emerald-400"
              >
                {"// ✓ Only copies 8 bytes max — overflow prevented"}
              </motion.span>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 rounded border border-slate-800 bg-surface-900/50 p-3 text-center">
        <p className="text-xs text-slate-400">
          <span className="font-bold text-white">Key Difference:</span>{" "}
          <span className="text-rose-400">strcpy()</span> copies until a null
          terminator with no size limit.{" "}
          <span className="text-emerald-400">strncpy()</span> enforces a maximum
          byte count, preventing overflow.
        </p>
      </div>
    </div>
  );
}

function StackFrameState({
  isCompromised,
  isProtected,
  isAttack,
  originalReturnAddr,
}) {
  const frames = [
    {
      label: "Local Variables",
      detail: "username[8]",
      color: "blue",
      status: "allocated",
    },
    {
      label: "Saved Frame Pointer",
      detail: "EBP → caller",
      color: "slate",
      status: "intact",
    },
    {
      label: "Return Address",
      detail: isCompromised ? "CORRUPTED" : `${originalReturnAddr} → main()`,
      color: isCompromised ? "rose" : "amber",
      status: isCompromised ? "corrupted" : "intact",
    },
    {
      label: "Caller's Stack Frame",
      detail: "main() locals",
      color: "slate",
      status: "intact",
    },
  ];

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-[#0d1117] shadow-2xl overflow-hidden">
      <div className="border-b border-slate-800 bg-surface-950 px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
          <Cpu className="h-4 w-4 text-signal-400" />
          Stack Frame Diagram
        </p>
      </div>

      <div className="p-4">
        <div className="flex flex-col gap-1">
          <div className="mb-1 flex items-center justify-between px-2">
            <span className="font-mono text-[10px] text-slate-600">
              LOW ADDRESS (Top of Stack)
            </span>
            <span className="font-mono text-[10px] text-slate-600">↑ ESP</span>
          </div>

          {frames.map((frame, index) => {
            const isCurrent =
              frame.status === "corrupted" && isCompromised;
            const colorMap = {
              blue: {
                border: "border-blue-500/40",
                bg: "bg-blue-500/10",
                text: "text-blue-400",
              },
              amber: {
                border: "border-amber-500/40",
                bg: "bg-amber-500/10",
                text: "text-amber-400",
              },
              rose: {
                border: "border-rose-500/50",
                bg: "bg-rose-500/15",
                text: "text-rose-400",
              },
              slate: {
                border: "border-slate-700",
                bg: "bg-slate-800/30",
                text: "text-slate-400",
              },
            };
            const colors = colorMap[frame.color];

            return (
              <motion.div
                key={frame.label}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`relative flex items-center justify-between rounded-md border-2 px-4 py-3 ${colors.border} ${colors.bg}`}
              >
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-md bg-rose-500/10"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
                <div className="relative z-10">
                  <p className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
                    {frame.label}
                  </p>
                  <p className="mt-0.5 font-mono text-sm text-slate-300">
                    {frame.detail}
                  </p>
                </div>
                {isCurrent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10"
                  >
                    <span className="flex items-center gap-1 rounded bg-rose-500/20 px-2 py-1 text-xs font-bold tracking-wider text-rose-400 ring-1 ring-rose-500/50">
                      <AlertTriangle className="h-3 w-3" />
                      HIJACKED
                    </span>
                  </motion.div>
                )}
                {frame.status === "intact" &&
                  frame.label === "Return Address" &&
                  isProtected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative z-10"
                    >
                      <span className="flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-1 text-xs font-bold tracking-wider text-emerald-400 ring-1 ring-emerald-500/50">
                        <ShieldCheck className="h-3 w-3" />
                        SAFE
                      </span>
                    </motion.div>
                  )}
              </motion.div>
            );
          })}

          <div className="mt-1 flex items-center justify-between px-2">
            <span className="font-mono text-[10px] text-slate-600">
              HIGH ADDRESS (Bottom of Stack)
            </span>
            <span className="font-mono text-[10px] text-slate-600">↓ EBP</span>
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-4 rounded border border-slate-800 bg-surface-950 p-3 text-center">
          <p className="text-xs text-slate-400">
            <span className="font-bold text-white">Stack Layout:</span> The
            stack grows downward. When <span className="text-rose-400">strcpy()</span>{" "}
            writes past the buffer boundary, data overwrites the{" "}
            <span className="text-amber-400">Return Address</span>, allowing an
            attacker to redirect program execution to arbitrary code.
          </p>
        </div>
      </div>
    </div>
  );
}
