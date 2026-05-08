import { ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-surface-950">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-700 bg-surface-900">
            <ShieldCheck aria-hidden="true" className="h-5 w-5 text-signal-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">CyberShield Lab</p>
            <p className="text-xs text-slate-400">Educational simulations only</p>
          </div>
        </div>
        <span className="hidden rounded-md border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300 sm:inline-flex">
          MVP scaffold
        </span>
      </div>
    </header>
  );
}
