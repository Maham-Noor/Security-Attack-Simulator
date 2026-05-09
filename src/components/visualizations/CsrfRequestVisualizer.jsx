import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  Globe,
  Database,
  ArrowRight,
  Cookie,
  KeyRound,
} from "lucide-react";
import { useEffect, useState } from "react";

export function CsrfRequestVisualizer({ step, mode }) {
  const csrfData = step.csrfData;
  if (!csrfData) return null;

  const { isAttack, attackerOrigin, targetUrl, payload } = csrfData;
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

      <NetworkFlowEvaluator
        isVulnerable={isVulnerable}
        isAttack={isAttack}
        attackerOrigin={attackerOrigin}
        targetUrl={targetUrl}
        payload={payload}
        isProtected={isProtected}
      />

      <MockAppState
        isAttack={isAttack}
        isCompromised={isCompromised}
        payload={payload}
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
          label="Cross-Origin Policy"
          status={isCompromised ? "Bypassed" : "Enforced"}
          isBad={isCompromised}
        />
        <StatusCard
          label="Token Validation"
          status={isCompromised ? "Missing" : isProtected ? "Verified" : "N/A"}
          isBad={isCompromised}
        />
        <StatusCard
          label="Action State"
          status={isCompromised ? "Compromised" : isProtected ? "Protected" : "Normal"}
          isBad={isCompromised}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isCompromised ? "compromised" : isProtected ? "protected" : "normal"}
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
                CRITICAL: FORGED CROSS-ORIGIN REQUEST ACCEPTED
              </span>
            </div>
          )}
          {isProtected && (
            <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-bold tracking-wide">
                DEFENDED: FORGED REQUEST REJECTED (MISSING TOKEN)
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

function NetworkFlowEvaluator({ isVulnerable, isAttack, attackerOrigin, targetUrl, payload, isProtected }) {
  // Use a unique key to force animation re-render when switching modes or steps
  const animationKey = `${isVulnerable}-${isAttack}`;

  return (
    <div className="rounded-xl border border-indigo-500/30 bg-surface-950 p-5 shadow-[0_0_20px_rgba(99,102,241,0.05)]">
      <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-400">
        <Globe className="h-5 w-5" />
        Network Request Flow
      </p>

      <div className="relative flex flex-col items-center gap-6 overflow-hidden sm:flex-row sm:items-stretch sm:gap-4">
        
        {/* Origin / Client Side */}
        <div className="z-10 flex flex-1 flex-col items-center gap-3 rounded-lg border border-slate-700 bg-surface-900 p-4 w-full">
          <Globe className="h-8 w-8 text-slate-400" />
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Origin</p>
            <p className={`font-mono text-sm font-bold ${isAttack ? "text-rose-400" : "text-blue-400"}`}>
              {attackerOrigin}
            </p>
          </div>
        </div>

        {/* Network Transition Area */}
        <div className="relative flex flex-col items-center justify-center sm:flex-1">
          {/* Static Path Line */}
          <div className="absolute inset-y-1/2 left-0 w-full border-t border-dashed border-slate-700 hidden sm:block"></div>
          
          {/* Animated Request Packet */}
          <motion.div
            key={animationKey}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-20 flex flex-col items-center rounded-lg border border-indigo-500/50 bg-surface-950 p-3 shadow-lg shadow-indigo-500/20"
          >
            <span className="font-mono text-xs font-bold text-indigo-300">{targetUrl}</span>
            <div className="mt-2 flex flex-col gap-1 w-full">
              <div className="flex items-center gap-2 rounded bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-400">
                <Cookie className="h-3 w-3" />
                Cookie: session_id=abc123
              </div>
              
              {!isVulnerable && (
                <div className={`flex items-center gap-2 rounded px-2 py-1 text-[10px] font-bold ${isAttack ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  <KeyRound className="h-3 w-3" />
                  X-CSRF-Token: {isAttack ? "MISSING" : "valid_token"}
                </div>
              )}
            </div>
            <ArrowRight className="mt-2 h-4 w-4 text-indigo-400" />
          </motion.div>
        </div>

        {/* Target Server Side */}
        <div className="z-10 flex flex-1 flex-col items-center gap-3 rounded-lg border border-slate-700 bg-surface-900 p-4 w-full">
          <Database className="h-8 w-8 text-slate-400" />
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Destination</p>
            <p className="font-mono text-sm font-bold text-blue-400">bank.local</p>
          </div>
          
          {/* Server Decision */}
          <motion.div
            key={`${animationKey}-decision`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className={`mt-2 rounded px-3 py-1 font-mono text-xs font-bold ${
              isProtected ? "bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/50" : "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50"
            }`}
          >
            {isProtected ? "REJECTED (403)" : "ACCEPTED (200)"}
          </motion.div>
        </div>
      </div>

      <div className="mt-4 rounded border border-slate-800 bg-surface-900/50 p-3 text-center">
        <p className="text-xs text-slate-400">
          <span className="font-bold text-white">Browser Behavior:</span> The browser automatically attaches the <span className="text-emerald-400">bank.local</span> session cookie because the request is sent to <span className="text-emerald-400">bank.local</span>, regardless of the fact that it was initiated by <span className={isAttack ? "text-rose-400" : "text-blue-400"}>{attackerOrigin}</span>.
        </p>
      </div>
    </div>
  );
}

function MockAppState({ isAttack, isCompromised, payload }) {
  const [balance, setBalance] = useState(10000);
  
  // Effect to simulate balance dropping if compromised
  useEffect(() => {
    if (isCompromised) {
      // Small timeout to match network animation
      const timer = setTimeout(() => {
        setBalance(10000 - payload.amount);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setBalance(10000);
    }
  }, [isCompromised, payload]);

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-[#0d1117] shadow-2xl overflow-hidden">
      <div className="border-b border-slate-800 bg-surface-950 px-4 py-3">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Application State
        </p>
      </div>

      <div className="grid gap-px bg-slate-800 sm:grid-cols-2">
        {/* Client Mock */}
        <div className="bg-[#0d1117] p-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
            Active Browser Window
          </p>
          
          {isAttack ? (
            <div className="rounded border border-rose-500/30 bg-surface-900 p-4 text-center">
              <h3 className="text-xl font-black text-rose-400">YOU WON A IPHONE!</h3>
              <p className="mt-2 text-sm text-slate-300">Click below to claim your prize.</p>
              <button className="mt-4 rounded bg-rose-500 px-4 py-2 font-bold text-white hover:bg-rose-600">
                Claim Prize!
              </button>
              <p className="mt-4 font-mono text-[10px] text-slate-500">
                &lt;form action="https://bank.local/api/transfer" method="POST"&gt;
                <br/>&lt;input type="hidden" name="amount" value="5000"&gt;
              </p>
            </div>
          ) : (
            <div className="rounded border border-blue-500/30 bg-surface-900 p-4 text-center">
              <h3 className="text-xl font-bold text-blue-400">bank.local</h3>
              <p className="mt-2 text-sm text-slate-300">You are securely logged in.</p>
              <div className="mt-4 mx-auto w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                 <ShieldCheck className="w-8 h-8 text-blue-400"/>
              </div>
            </div>
          )}
        </div>

        {/* Server Mock */}
        <div className="bg-[#0d1117] p-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
            Bank Server Database
          </p>
          <div className="rounded border border-slate-800 bg-surface-950 p-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-sm text-slate-400">Account Owner</span>
              <span className="font-mono text-sm font-bold text-white">Student User</span>
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="text-sm text-slate-400">Current Balance</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={balance}
                  initial={{ scale: 1.5, color: "#f43f5e" }}
                  animate={{ scale: 1, color: isCompromised ? "#f43f5e" : "#10b981" }}
                  className="font-mono text-lg font-black"
                >
                  ${balance.toLocaleString()}
                </motion.span>
              </AnimatePresence>
            </div>
            {isCompromised && (
               <motion.div 
                 initial={{opacity: 0, y: 10}}
                 animate={{opacity: 1, y: 0}}
                 transition={{delay: 1.2}}
                 className="mt-4 text-xs text-rose-400 font-bold bg-rose-500/10 p-2 rounded"
               >
                 - $5,000 Transferred to attacker_acct
               </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
