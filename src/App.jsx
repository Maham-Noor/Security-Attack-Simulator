import { useState } from "react";
import { AppShell } from "./components/layout/AppShell.jsx";
import { LearningDashboard } from "./components/dashboard/LearningDashboard.jsx";
import { ScenarioPlayer } from "./components/scenario/ScenarioPlayer.jsx";
import { getScenarioById } from "./services/scenarioCatalog.js";

export default function App() {
  const [selectedScenarioId, setSelectedScenarioId] = useState("");
  const selectedScenario = selectedScenarioId ? getScenarioById(selectedScenarioId) : null;

  return (
    <AppShell>
      {selectedScenario ? (
        <ScenarioPlayer
          scenario={selectedScenario}
          onBack={() => setSelectedScenarioId("")}
        />
      ) : (
        <LearningDashboard onStartScenario={setSelectedScenarioId} />
      )}
    </AppShell>
  );
}
