export function Panel({ className = "", children }) {
  return (
    <section
      className={`rounded-lg border border-slate-800 bg-surface-900 p-5 shadow-panel ${className}`}
    >
      {children}
    </section>
  );
}
