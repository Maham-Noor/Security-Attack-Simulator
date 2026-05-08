import { AppShell } from "./components/layout/AppShell.jsx";
import { LearningDashboard } from "./components/dashboard/LearningDashboard.jsx";

export default function App() {
  return (
    <AppShell>
      <LearningDashboard />
    </AppShell>
  );
}
