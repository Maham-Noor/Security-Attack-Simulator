export const csrfScenario = {
  id: "csrf",
  title: "Cross-Site Request Forgery (CSRF)",
  description: "See how request verification protects a mock account setting.",
  category: "Web Security",
  difficulty: "Beginner",
  brief: {
    concept: "A request should prove it came from the intended user flow.",
    safeTarget: "A mock account settings page with a fictional email preference.",
    watchFor: "Compare a request accepted without verification with one blocked by protection.",
  },
  vulnerableMode: {
    title: "Vulnerable Mode",
    summary: "The mock server accepts a state-changing request without verification.",
    visualState: {
      request: "POST /settings/email-preferences",
      token: "missing",
      serverDecision: "Accepted in the vulnerable simulation.",
    },
  },
  secureMode: {
    title: "Secure Mode",
    summary: "The mock server checks for a valid token or same-site protection.",
    visualState: {
      request: "POST /settings/email-preferences",
      token: "valid token required",
      serverDecision: "Blocked when verification is missing.",
    },
  },
  steps: [
    {
      id: "inspect-request",
      title: "Inspect the request",
      studentAction: "Look at the fictional state-changing request.",
      systemReaction: "The simulator shows the request method, target, and token state.",
      visualStateChange: "The request card highlights missing verification.",
      learningPoint: "State-changing requests need server-side verification.",
      guidedOptions: [
        {
          id: "missing-token",
          label: "Check for a token",
          feedback: "The vulnerable request is missing verification.",
        },
      ],
    },
    {
      id: "compare-decision",
      title: "Compare server decisions",
      studentAction: "Switch from Vulnerable Mode to Secure Mode.",
      systemReaction: "Secure Mode blocks the unverified request.",
      visualStateChange: "The server decision changes from accepted to blocked.",
      learningPoint: "CSRF tokens and SameSite cookies help reject unwanted requests.",
      guidedOptions: [
        {
          id: "require-verification",
          label: "Require request verification",
          feedback: "The mock server blocks the request when verification is missing.",
        },
      ],
    },
  ],
  defense: {
    title: "Defend Against CSRF",
    points: [
      "Use CSRF tokens for state-changing requests.",
      "Use SameSite cookies where appropriate.",
      "Verify important actions on the server.",
    ],
  },
};
