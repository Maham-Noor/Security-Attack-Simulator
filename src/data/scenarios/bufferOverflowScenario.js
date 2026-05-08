export const bufferOverflowScenario = {
  id: "buffer-overflow",
  title: "Buffer Overflow",
  description: "Visualize oversized input crossing a conceptual memory boundary.",
  category: "Memory Safety",
  difficulty: "Beginner",
  brief: {
    concept: "Oversized input can exceed a fixed memory space if bounds are not checked.",
    safeTarget: "A visual-only memory buffer made of fictional cells.",
    watchFor: "Compare overflow behavior with bounds checking.",
  },
  vulnerableMode: {
    title: "Vulnerable Mode",
    summary: "The visual buffer accepts more characters than it can safely hold.",
    visualState: {
      bufferSize: 8,
      inputLength: 12,
      result: "Extra characters spill into neighboring visual cells.",
    },
  },
  secureMode: {
    title: "Secure Mode",
    summary: "The visual buffer checks length before accepting input.",
    visualState: {
      bufferSize: 8,
      inputLength: 12,
      result: "Input is rejected or safely shortened in the simulation.",
    },
  },
  steps: [
    {
      id: "measure-input",
      title: "Measure the input",
      studentAction: "Compare input length with the visual buffer size.",
      systemReaction: "The simulator marks the input as larger than the buffer.",
      visualStateChange: "Cells beyond the buffer boundary are highlighted.",
      learningPoint: "Programs must check input size before copying data.",
      guidedOptions: [
        {
          id: "compare-size",
          label: "Compare input length",
          feedback: "The input is larger than the mock buffer can hold.",
        },
      ],
    },
    {
      id: "apply-bounds-check",
      title: "Apply bounds checking",
      studentAction: "Choose the secure handling option.",
      systemReaction: "Secure Mode rejects or safely shortens the oversized input.",
      visualStateChange: "The overflow cells are no longer modified.",
      learningPoint: "Bounds checks keep data inside the intended memory area.",
      guidedOptions: [
        {
          id: "bounds-check",
          label: "Use bounds checking",
          feedback: "The visual memory boundary is protected.",
        },
      ],
    },
  ],
  defense: {
    title: "Defend Against Buffer Overflows",
    points: [
      "Check input length before copying data.",
      "Use safer APIs that respect buffer size.",
      "Prefer memory-safe languages when possible.",
    ],
  },
};
