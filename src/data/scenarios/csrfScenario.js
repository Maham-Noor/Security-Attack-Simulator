export const csrfScenario = {
  id: "csrf",
  title: "Cross-Site Request Forgery (CSRF)",
  description: "See how a malicious site can force an authenticated browser to send unwanted requests.",
  category: "Web Security",
  difficulty: "Intermediate",
  brief: {
    concept: "Browsers automatically attach session cookies to requests, even if they originate from a different website.",
    safeTarget: "A mock banking application and a simulated attacker website.",
    watchFor: "Watch how the session cookie flows from the attacker site to the bank server.",
  },
  vulnerableMode: {
    title: "Vulnerable Mode",
    summary: "The server trusts any request that contains a valid session cookie, regardless of origin.",
    visualState: {
      result: "The bank processes the unwanted transfer because the cookie was automatically attached.",
      status: "Compromised",
    },
  },
  secureMode: {
    title: "Secure Mode",
    summary: "The server requires a secret, unpredictable CSRF Token that the attacker cannot guess.",
    visualState: {
      result: "The bank rejects the request because the X-CSRF-Token is missing.",
      status: "Protected",
    },
  },
  steps: [
    {
      id: "normal-state",
      title: "Establish authenticated session",
      studentAction: "Log into the mock banking application.",
      systemReaction: "The server issues a session cookie to your browser.",
      visualStateChange: "The session cookie is stored in the browser and automatically sent with normal bank requests.",
      learningPoint: "Session cookies prove you are logged in, but they are attached automatically by the browser.",
      guidedOptions: [
        {
          id: "login",
          label: "Log into bank.local",
          feedback: "Session established. Your browser now holds the bank.local session cookie.",
        },
      ],
      csrfData: {
        isAttack: false,
        attackerOrigin: "https://bank.local",
        targetUrl: "POST /api/transfer",
        payload: { amount: 100, to: "my_savings" },
      },
    },
    {
      id: "csrf-attack",
      title: "Trigger cross-origin request",
      studentAction: "Visit the attacker's website (evil.com).",
      systemReaction: "The malicious site secretly submits a form to bank.local.",
      visualStateChange: "The browser automatically attaches the bank.local session cookie to the evil.com request.",
      learningPoint: "Because the cookie is sent automatically, the server cannot tell the request was forged without a CSRF Token.",
      guidedOptions: [
        {
          id: "visit-evil",
          label: "Visit evil.com/prize",
          feedback: "Observe the cross-origin request flow.",
        },
      ],
      csrfData: {
        isAttack: true,
        attackerOrigin: "https://evil.com",
        targetUrl: "POST /api/transfer",
        payload: { amount: 5000, to: "attacker_acct" },
      },
    },
  ],
  defense: {
    title: "Defend Against CSRF",
    points: [
      "Use Anti-CSRF Tokens (synchronizer token pattern) for state-changing requests.",
      "Set the SameSite cookie attribute to Lax or Strict.",
      "Require re-authentication for highly sensitive actions.",
    ],
  },
};
