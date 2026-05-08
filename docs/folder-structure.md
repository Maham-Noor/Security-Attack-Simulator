# Folder Structure

Recommended MVP layout for CyberShield Lab. Keep implementation simple and avoid folders that are not needed yet.

```txt
Security-Attack-Simulator/
  AGENTS.md
  CONTEXT.md
  README.md
  package.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  index.html

  docs/
    architecture.md
    dependencies.md
    first-implementation-tasks.md
    folder-structure.md
    milestones.md
    project_scope.md

  requirements/
    README.md
    functional-requirements.md
    non-functional-requirements.md
    safety-requirements.md
    scenario-requirements.md

  src/
    main.jsx
    App.jsx
    index.css

    data/
      scenarios/
        index.js
        sqlInjectionScenario.js
        xssScenario.js
        csrfScenario.js
        bufferOverflowScenario.js

    services/
      scenarioCatalog.js
      progressStorage.js

    hooks/
      useScenarioPlayer.js
      useLocalLearningProgress.js

    components/
      layout/
        AppShell.jsx
        Header.jsx

      dashboard/
        LearningDashboard.jsx
        ScenarioCard.jsx
        ProgressSummary.jsx

      scenario/
        ScenarioPlayer.jsx
        ScenarioBrief.jsx
        VisualizationStep.jsx
        GuidedOptions.jsx
        DefenseView.jsx
        StepProgress.jsx

      visualizations/
        SqlQueryVisualizer.jsx
        XssVisualizer.jsx
        CsrfRequestVisualizer.jsx
        BufferMemoryVisualizer.jsx

      ui/
        Button.jsx
        Panel.jsx
        Badge.jsx
```

## Notes

- Keep scenario definitions as plain JavaScript objects.
- Reuse the same `ScenarioPlayer` for all four MVP scenarios.
- Use one simple local progress service.
- Do not add backend, database, auth, admin, or cloud folders for Version 1.
