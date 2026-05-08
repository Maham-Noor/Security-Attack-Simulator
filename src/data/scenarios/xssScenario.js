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
    summary: "The mock page renders untrusted content as if it belongs to the page.",
    visualState: {
      comment: "<script>alert('demo')</script>",
      preview: "The simulator highlights this as unsafe page behavior.",
    },
  },
  secureMode: {
    title: "Secure Mode",
    summary: "The mock page displays untrusted content as escaped text.",
    visualState: {
      comment: "&lt;script&gt;alert('demo')&lt;/script&gt;",
      preview: "The content is shown as text, not page behavior.",
    },
  },
  steps: [
    {
      id: "review-comment",
      title: "Review untrusted content",
      studentAction: "Inspect the fictional comment before it appears in the preview.",
      systemReaction: "The simulator labels the content as untrusted.",
      visualStateChange: "The comment moves into the mock page preview.",
      learningPoint: "Content from users should not be trusted by default.",
      guidedOptions: [
        {
          id: "inspect",
          label: "Inspect the comment",
          feedback: "Good. The simulator treats this as content that needs safe handling.",
        },
      ],
    },
    {
      id: "compare-rendering",
      title: "Compare rendering behavior",
      studentAction: "Switch between unsafe rendering and escaped output.",
      systemReaction: "Secure Mode displays the same content as harmless text.",
      visualStateChange: "The preview changes from unsafe behavior to safe text output.",
      learningPoint: "Output encoding helps prevent untrusted content from becoming page behavior.",
      guidedOptions: [
        {
          id: "escape-output",
          label: "Use escaped output",
          feedback: "The mock page now shows the content safely as text.",
        },
      ],
    },
  ],
  defense: {
    title: "Defend Against XSS",
    points: [
      "Escape output before displaying untrusted content.",
      "Sanitize content when limited formatting is allowed.",
      "Use browser protections as an extra layer, not the only defense.",
    ],
  },
};
