# CyberShield Lab

CyberShield Lab is an educational cybersecurity simulator designed for beginner cybersecurity students. It provides safe, guided, step-by-step visualizations that teach how common attack scenarios work and how to defend against them.

> **This is strictly an educational tool.** No real exploitation, live requests, real databases, or arbitrary payloads are used. All simulations are sandboxed and conceptual.

## Attack Scenarios

| Scenario | Category | What You Learn |
|----------|----------|----------------|
| SQL Injection | Database Security | How unsanitized input can manipulate database queries, and how parameterized queries prevent it |
| Cross-Site Scripting (XSS) | Web Security | How untrusted content renders in a browser, and how output encoding and sanitization defend against it |
| Cross-Site Request Forgery (CSRF) | Web Security | How forged cross-origin requests exploit session cookies, and how CSRF tokens and SameSite cookies block them |
| Buffer Overflow | Memory Security | How oversized input can overwrite return addresses in stack memory, and how bounds checking prevents it |

## Features

- **Vulnerable Mode vs Secure Mode** — Every scenario lets you toggle between unsafe and safe implementations to compare behavior side by side
- **Step-by-Step Visualization** — Interactive, animated visualizations walk through each attack flow with cause-and-effect explanations
- **Guided Options** — All learner inputs are predefined safe options; no arbitrary payload entry is allowed
- **Defense View** — Each scenario concludes with specific defensive techniques and best practices
- **Local Progress Tracking** — Completion status is saved in your browser's localStorage and persists across sessions

## Tech Stack

- **React 19** — Functional components with hooks
- **Vite 6** — Fast development server and production bundler
- **TailwindCSS 3** — Utility-first dark cybersecurity theme
- **Framer Motion** — Smooth animations and transitions
- **Lucide React** — Consistent icon system

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (included with Node.js)

### Installation

```bash
git clone https://github.com/your-username/Security-Attack-Simulator.git
cd Security-Attack-Simulator
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

The optimized output is generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── App.jsx                          # Root component with scenario routing
├── main.jsx                         # React entry point
├── index.css                        # Global styles and Tailwind directives
├── components/
│   ├── dashboard/
│   │   ├── LearningDashboard.jsx    # Main dashboard with scenario grid
│   │   ├── ScenarioCard.jsx         # Individual scenario card
│   │   └── ProgressSummary.jsx      # Completion progress sidebar
│   ├── layout/
│   │   ├── AppShell.jsx             # Page shell with header and main area
│   │   └── Header.jsx               # Top navigation bar
│   ├── scenario/
│   │   ├── ScenarioPlayer.jsx       # Reusable player for all scenarios
│   │   ├── ScenarioBrief.jsx        # Scenario overview panel
│   │   ├── VisualizationStep.jsx    # Step timeline + visualizer routing
│   │   ├── GuidedOptions.jsx        # Safe predefined option selector
│   │   ├── DefenseView.jsx          # Defense best practices panel
│   │   └── StepProgress.jsx         # Step progress indicator
│   ├── ui/
│   │   ├── Badge.jsx                # Status/label badge
│   │   ├── Button.jsx               # Primary action button
│   │   └── Panel.jsx                # Card/section container
│   └── visualizations/
│       ├── SqlQueryVisualizer.jsx    # SQL injection visual engine
│       ├── XssVisualizer.jsx         # XSS rendering visualizer
│       ├── CsrfRequestVisualizer.jsx # CSRF request flow visualizer
│       └── BufferMemoryVisualizer.jsx# Buffer overflow memory visualizer
├── data/
│   └── scenarios/
│       ├── index.js                 # Barrel export for all scenarios
│       ├── sqlInjectionScenario.js   # SQL injection scenario data
│       ├── xssScenario.js           # XSS scenario data
│       ├── csrfScenario.js          # CSRF scenario data
│       └── bufferOverflowScenario.js # Buffer overflow scenario data
└── services/
    ├── scenarioCatalog.js           # Scenario registry and lookup
    └── progressStorage.js           # localStorage progress persistence
```

## Safety Boundary

This project must **never**:

- Perform real exploitation
- Target real systems
- Collect real credentials
- Execute arbitrary payloads
- Send live attack requests
- Use real databases or backend services

All simulations are purely educational, using mock data and simulated state only.

## License

This project is for educational purposes.
