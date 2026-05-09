export const sqlInjectionScenario = {
  id: "sql-injection",
  title: "SQL Injection",
  description: "See how unsafe input can bypass authentication in a simulated login system.",
  category: "Web Security",
  difficulty: "Intermediate",
  brief: {
    concept: "Unsafe input can alter boolean logic and completely bypass password checks.",
    safeTarget: "A mock login form connected to a fictional users table.",
    watchFor: "Watch how the database evaluates the TRUE/FALSE logic of the injected query.",
  },
  vulnerableMode: {
    title: "Vulnerable Mode",
    summary: "The mock app directly concatenates the username and password into the query.",
    visualState: {
      query: "SELECT id, username, role FROM users WHERE username = 'student' AND password = '' OR '1'='1'",
      result: "The boolean logic is manipulated, bypassing the password check.",
      table: ["student", "teacher", "admin"],
    },
  },
  secureMode: {
    title: "Secure Mode",
    summary: "The mock app uses parameterized queries, neutralizing the logical operators.",
    visualState: {
      query: "SELECT id, username, role FROM users WHERE username = ? AND password = ?",
      parameter1: "student",
      parameter2: "' OR '1'='1",
      result: "The simulated query treats the malicious input strictly as a string literal.",
    },
  },
  steps: [
    {
      id: "normal-input",
      title: "Try normal login",
      studentAction: "Enter a valid username but an incorrect password.",
      systemReaction: "The mock database correctly rejects the login attempt.",
      visualStateChange: "No rows match the query, access is denied.",
      learningPoint: "Normal input relies on the expected AND logic (both username and password must match).",
      guidedOptions: [
        {
          id: "student",
          label: "Username: student | Password: incorrect",
          feedback: "The mock query evaluates to FALSE and rejects the login.",
        },
      ],
      sqlData: {
        usernameInput: "student",
        passwordInput: "incorrect",
        queryPrefix: "SELECT id, username, role FROM users WHERE username = ",
        queryMiddle: " AND password = ",
        mockTable: [
          { id: 1, name: "admin", role: "admin" },
          { id: 2, name: "teacher", role: "staff" },
          { id: 3, name: "student", role: "student" },
        ],
        vulnerable: {
          returnedRowIds: [],
        },
        secure: {
          returnedRowIds: [],
        },
      },
    },
    {
      id: "unsafe-input",
      title: "Bypass authentication",
      studentAction: "Inject an OR condition into the password field.",
      systemReaction: "Vulnerable Mode treats the injected OR as executable boolean logic.",
      visualStateChange: "The logic evaluates to TRUE, granting unauthorized access.",
      learningPoint: "The injected OR condition overrides the password check because of operator precedence.",
      guidedOptions: [
        {
          id: "suspicious-sample",
          label: "Username: student | Password: ' OR '1'='1",
          feedback: "The simulator evaluates the boolean logic visually.",
        },
      ],
      sqlData: {
        usernameInput: "student",
        passwordInput: "' OR '1'='1",
        queryPrefix: "SELECT id, username, role FROM users WHERE username = ",
        queryMiddle: " AND password = ",
        mockTable: [
          { id: 1, name: "admin", role: "admin" },
          { id: 2, name: "teacher", role: "staff" },
          { id: 3, name: "student", role: "student" },
        ],
        vulnerable: {
          returnedRowIds: [1, 2, 3], // The query returns all rows, typically logging in as the first row (admin)
        },
        secure: {
          returnedRowIds: [],
        },
      },
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
