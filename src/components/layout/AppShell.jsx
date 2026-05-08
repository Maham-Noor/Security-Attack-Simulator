import { Header } from "./Header.jsx";

export function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-surface-950 text-slate-100">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
