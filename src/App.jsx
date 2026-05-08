import { AppShell } from "./components/layout/AppShell.jsx";
import { Badge } from "./components/ui/Badge.jsx";
import { Button } from "./components/ui/Button.jsx";
import { Panel } from "./components/ui/Panel.jsx";

export default function App() {
  return (
    <AppShell>
      <Panel className="max-w-3xl">
        <Badge>Milestone 1</Badge>
        <h1 className="mt-4 text-3xl font-semibold text-white">CyberShield Lab</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
          MVP scaffold for safe, guided security simulations with Vulnerable Mode
          and Secure Mode comparisons.
        </p>
        <div className="mt-6">
          <Button type="button">Scaffold ready</Button>
        </div>
      </Panel>
    </AppShell>
  );
}
