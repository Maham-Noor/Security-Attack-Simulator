export const bufferOverflowScenario = {
  id: "buffer-overflow",
  title: "Buffer Overflow (Visual)",
  description: "Understand how oversized input can corrupt adjacent memory when bounds checking is missing.",
  category: "Memory Security",
  difficulty: "Advanced",
  brief: {
    concept: "If a program copies data into a memory buffer without checking its size, the data can spill over and overwrite critical system pointers.",
    safeTarget: "A conceptual 8-byte Username Buffer next to a 4-byte Return Address.",
    watchFor: "Watch what happens to the Return Address when the input exceeds 8 characters.",
  },
  vulnerableMode: {
    title: "Vulnerable Mode",
    summary: "The C function strcpy() copies data until it hits a null terminator, ignoring the buffer's size limit.",
    visualState: {
      result: "The oversized input spills over and overwrites the Return Address.",
      status: "Hijacked",
    },
  },
  secureMode: {
    title: "Secure Mode",
    summary: "The function uses strncpy() or a memory-safe language to enforce bounds checking.",
    visualState: {
      result: "The input is safely truncated to fit the buffer, protecting the Return Address.",
      status: "Protected",
    },
  },
  steps: [
    {
      id: "normal-input",
      title: "Provide valid input",
      studentAction: "Submit a username that fits within the allocated 8 bytes.",
      systemReaction: "The program copies the 8 characters into the Username Buffer.",
      visualStateChange: "The memory slots fill up exactly. The Return Address remains safe.",
      learningPoint: "When input matches expected constraints, memory behaves predictably.",
      guidedOptions: [
        {
          id: "submit-admin",
          label: "Submit: 'admin123'",
          feedback: "Input fits perfectly within the allocated 8 bytes.",
        },
      ],
      bufferData: {
        payload: "admin123",
        isAttack: false,
      },
    },
    {
      id: "overflow-attack",
      title: "Trigger buffer overflow",
      studentAction: "Submit a 16-character string into the 8-byte buffer.",
      systemReaction: "The program attempts to copy all 16 characters into memory.",
      visualStateChange: "In Vulnerable Mode, the extra 8 characters spill into the adjacent Return Address.",
      learningPoint: "Overwriting a Return Address allows an attacker to control where the program jumps next, leading to execution hijacking.",
      guidedOptions: [
        {
          id: "submit-payload",
          label: "Submit: 'AAAAAAAABBBBCCCC'",
          feedback: "Notice the bounds checking behavior on the oversized input.",
        },
      ],
      bufferData: {
        payload: "AAAAAAAABBBBCCCC",
        isAttack: true,
      },
    },
  ],
  defense: {
    title: "Defend Against Buffer Overflows",
    points: [
      "Use memory-safe languages (Rust, Go, Java, Python) when possible.",
      "Use bounds-checked functions (e.g., strncpy instead of strcpy in C/C++).",
      "Enable compiler protections like Stack Canaries, ASLR, and DEP/NX.",
    ],
  },
};
