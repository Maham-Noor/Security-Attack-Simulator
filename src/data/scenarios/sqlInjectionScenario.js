export const sqlInjectionScenario = {
  id: "sql-injection",
  title: "SQL Injection",
  description: "See how unsafe input can change a simulated database query.",
  category: "Web Security",
  difficulty: "Beginner",
  brief: {
    concept: "Unsafe input can change how a database query behaves.",
    safeTarget: "A mock login form connected to a fictional users table.",
    watchFor: "Compare how the same input is handled in Vulnerable Mode and Secure Mode.",
  },
  vulnerableMode: {
    title: "Vulnerable Mode",
    summary: "The mock app directly combines user input with query text.",
    visualState: {
      query: "SELECT * FROM users WHERE name = 'student' OR '1'='1'",
      result: "The simulated query returns more records than intended.",
      table: ["student", "teacher", "admin"],
    },
  },
  secureMode: {
    title: "Secure Mode",
    summary: "The mock app treats user input as a parameter, not executable query text.",
    visualState: {
      query: "SELECT * FROM users WHERE name = ?",
      parameter: "student' OR '1'='1",
      result: "The simulated query searches for the input as plain text.",
    },
  },
  steps: [
    {
      id: "normal-input",
      title: "Try normal input",
      studentAction: "Choose a normal username.",
      systemReaction: "The mock database returns one matching user.",
      visualStateChange: "One row is highlighted in the fictional users table.",
      learningPoint: "Expected input keeps the simulated query behavior predictable.",
      guidedOptions: [
        {
          id: "student",
          label: "Use username: student",
          feedback: "The mock query returns the intended student record.",
        },
      ],
    },
    {
      id: "unsafe-input",
      title: "Compare unsafe input handling",
      studentAction: "Choose the suspicious input sample.",
      systemReaction: "Vulnerable Mode treats the input as part of the query.",
      visualStateChange: "The simulated result expands beyond the intended user.",
      learningPoint: "Parameterized queries prevent input from changing query structure.",
      guidedOptions: [
        {
          id: "suspicious-sample",
          label: "Use suspicious sample input",
          feedback: "The simulator shows the risk without executing real SQL.",
        },
      ],
    },
  ],
  defense: {
    title: "Defend Against SQL Injection",
    points: [
      "Use parameterized queries.",
      "Validate input before using it.",
      "Avoid building query text from raw user input.",
    ],
  },
};
