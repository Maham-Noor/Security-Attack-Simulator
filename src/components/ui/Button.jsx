export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`inline-flex h-10 items-center justify-center rounded-md bg-signal-500 px-4 text-sm font-semibold text-surface-950 transition hover:bg-signal-400 focus:outline-none focus:ring-2 focus:ring-signal-400 focus:ring-offset-2 focus:ring-offset-surface-950 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
