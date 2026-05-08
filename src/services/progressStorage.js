const STORAGE_KEY = "cybershield_progress";

const defaultProgress = {
  completedScenarios: [],
  scenarios: {},
};

export function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultProgress;
  } catch (err) {
    console.error("Failed to parse progress from local storage", err);
    return defaultProgress;
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error("Failed to save progress to local storage", err);
  }
}

function getScenarioProgress(scenarioId) {
  const progress = getProgress();
  if (!progress.scenarios[scenarioId]) {
    progress.scenarios[scenarioId] = {
      currentStep: 0,
      viewedModes: { vulnerable: false, secure: false },
      reflectionAnswers: {},
    };
  }
  return progress.scenarios[scenarioId];
}

function updateScenarioProgress(scenarioId, updateFn) {
  const progress = getProgress();
  if (!progress.scenarios[scenarioId]) {
    progress.scenarios[scenarioId] = {
      currentStep: 0,
      viewedModes: { vulnerable: false, secure: false },
      reflectionAnswers: {},
    };
  }
  updateFn(progress.scenarios[scenarioId]);
  saveProgress(progress);
}

export function markScenarioComplete(scenarioId) {
  const progress = getProgress();
  if (!progress.completedScenarios.includes(scenarioId)) {
    progress.completedScenarios.push(scenarioId);
    saveProgress(progress);
  }
}

export function saveScenarioStep(scenarioId, stepIndex) {
  updateScenarioProgress(scenarioId, (state) => {
    state.currentStep = stepIndex;
  });
}

export function getScenarioStep(scenarioId) {
  return getScenarioProgress(scenarioId).currentStep;
}

export function markModeViewed(scenarioId, mode) {
  updateScenarioProgress(scenarioId, (state) => {
    state.viewedModes[mode] = true;
  });
}

export function saveReflectionAnswer(scenarioId, stepId, answer) {
  updateScenarioProgress(scenarioId, (state) => {
    state.reflectionAnswers[stepId] = answer;
  });
}

export function isScenarioComplete(scenarioId) {
  return getProgress().completedScenarios.includes(scenarioId);
}
