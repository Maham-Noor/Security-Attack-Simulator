export const xssScenario = {
  id: "xss",
  title: "Cross-Site Scripting (XSS)",
  description: "Compare unsafe rendering with escaped output in a mock page preview.",
  category: "Web Security",
  difficulty: "Beginner",
  brief: {
    concept: "Untrusted content can affect a page if it is rendered unsafely.",
    safeTarget: "A mock comment preview that displays fictional user content.",
    watchFor: "Notice whether the content is treated as page behavior or safe text.",
  },
  vulnerableMode: {
    title: "Vulnerable Mode",
    summary: "The mock page renders untrusted content directly into the DOM.",
    visualState: {
      result: "The injected script is parsed as HTML and executed.",
      status: "Compromised",
    },
  },
  secureMode: {
    title: "Secure Mode",
    summary: "The mock page uses output encoding to convert special characters into safe HTML entities.",
    visualState: {
      result: "The injected script is safely rendered as plain text.",
      status: "Protected",
    },
  },
  steps: [
    {
      id: "review-comment",
      title: "Review trusted content",
      studentAction: "Submit a standard, benign text comment.",
      systemReaction: "The mock server stores the comment and the browser renders it normally.",
      visualStateChange: "The comment appears safely inside the mock page.",
      learningPoint: "Standard text naturally flows into the DOM without changing page structure.",
      guidedOptions: [
        {
          id: "inspect",
          label: "Submit: 'Hello, this is a normal comment!'",
          feedback: "The text is rendered safely. The account status remains intact.",
        },
      ],
      xssData: {
        payload: "Hello, this is a normal comment!",
        isAttack: false,
      },
    },
    {
      id: "compare-rendering",
      title: "Inject malicious script",
      studentAction: "Submit a comment containing a JavaScript payload.",
      systemReaction: "The mock server stores the payload. The browser then receives it.",
      visualStateChange: "In Vulnerable Mode, the script executes and overwrites the DOM.",
      learningPoint: "Output encoding prevents the browser from confusing user data with executable code.",
      guidedOptions: [
        {
          id: "escape-output",
          label: "Submit XSS Payload",
          feedback: "Observe how the DOM handles the HTML tags.",
        },
      ],
      xssData: {
        payload: `<script>\ndocument.getElementById("account-status").innerHTML =\n"⚠ Session Compromised: Untrusted Script Executed";\n</script>`,
        isAttack: true,
      },
    },
  ],
  defense: {
    title: "Defend Against XSS",
    points: [
      "Escape output before displaying untrusted content.",
      "Sanitize content when limited formatting is allowed.",
      "Use browser protections (like CSP) as an extra layer, not the only defense.",
    ],
  },
};
