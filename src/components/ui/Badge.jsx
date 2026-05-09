export function Badge({ className = "", children }) {
  return (
    <span className={`inline-flex items-center rounded-md border border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-300 ${className}`}>
      {children}
    </span>
  );
}
