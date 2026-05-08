# Security Attack Simulator

An educational simulator for demonstrating security attack concepts in a controlled, non-destructive environment. Version 1 focuses on a reusable simulation engine and four MVP scenarios using mock data only.

## Language

**Security Attack Simulator**:
An educational environment for running controlled, non-destructive security attack demonstrations.
_Avoid_: Real exploitation tool, attack platform

**Attack Scenario**:
A scripted demonstration of a security concept against an intentionally safe target.
_Avoid_: Exploit, hack

**Safe Target**:
A local mock system used only for simulation.
_Avoid_: Victim, third-party target

**Beginner Cybersecurity Student**:
A learner who needs guided, visual demonstrations of security concepts before using professional security tools.
_Avoid_: Red-team operator, attacker

**Vulnerable Mode**:
The simulated version of a scenario that shows the unsafe behavior and its consequence.
_Avoid_: Real exploit mode

**Secure Mode**:
The simulated version of a scenario that shows the protective behavior and safer outcome.
_Avoid_: Patch mode

**Step-by-Step Visualization**:
A guided visual sequence that shows how a security concept unfolds and what lesson each step demonstrates.
_Avoid_: Log dump, raw tool output

**Visualization Step**:
One stage in a guided demonstration containing a student action, system reaction, visual state change, and learning point.
_Avoid_: Animation frame, log entry

**SQL Injection Scenario**:
An attack scenario that demonstrates how unsafe input can alter a mock database query.
_Avoid_: Database exploit

**XSS Scenario**:
An attack scenario that demonstrates how unsafe rendering of untrusted content can affect a mock page.
_Avoid_: Script exploit

**CSRF Scenario**:
An attack scenario that demonstrates how an unverified request can affect a mock user action.
_Avoid_: Request forgery tool

**Buffer Overflow Scenario**:
A visual-only scenario that demonstrates how oversized input can exceed a conceptual memory boundary.
_Avoid_: Native exploit

**Guided Option**:
A predefined learner choice that advances an attack scenario without requiring free-form attack payload construction.
_Avoid_: Payload, exploit string

**Defense View**:
A closing explanation that connects the demonstrated risk to practical protective measures.
_Avoid_: Mitigation dump, checklist

**Scenario Completion**:
The state reached when a learner finishes both modes and the defense view for an attack scenario.
_Avoid_: Score, win

**Reflection Answer**:
A short learner response that explains the lesson or protective habit from an attack scenario.
_Avoid_: Grade, quiz score

**Local Learning Progress**:
Saved learner progress that belongs only to the current device and does not require an account.
_Avoid_: User account, cloud profile

**Simulated System State**:
A fictional database, page, request, or memory state used to visualize security concepts without contacting live services.
_Avoid_: Live traffic, real service

**Learning Dashboard**:
The first screen where learners choose or continue attack scenarios and see local completion progress.
_Avoid_: Landing page, marketing page

**Scenario Brief**:
A short introduction that states the attack concept, safe target, and what the learner should observe.
_Avoid_: Lecture, documentation page

## Relationships

- A **Security Attack Simulator** contains one or more **Attack Scenarios**.
- A **Security Attack Simulator** starts at the **Learning Dashboard**.
- A Version 1 **Attack Scenario** is one of: **SQL Injection Scenario**, **XSS Scenario**, **CSRF Scenario**, or **Buffer Overflow Scenario**.
- An **Attack Scenario** runs against exactly one intended **Safe Target**.
- An **Attack Scenario** has **Vulnerable Mode** and **Secure Mode**.
- An **Attack Scenario** begins with a **Scenario Brief**.
- An **Attack Scenario** is explained through a **Step-by-Step Visualization**.
- A **Step-by-Step Visualization** contains one or more **Visualization Steps**.
- A **Visualization Step** may ask the student to select a **Guided Option**.
- An **Attack Scenario** ends with a **Defense View**.
- An **Attack Scenario** produces **Scenario Completion** after both modes and the defense view are finished.
- **Scenario Completion** and **Reflection Answers** may be kept as **Local Learning Progress**.
- An **Attack Scenario** changes **Simulated System State**, not live services.

## Example Dialogue

> **Dev:** "Can an **Attack Scenario** point at a public website?"
> **Domain expert:** "No, every **Attack Scenario** must run against a **Safe Target** that exists only for the simulator."

> **Dev:** "Should we optimize the flow for speed like a professional testing tool?"
> **Domain expert:** "No, the **Beginner Cybersecurity Student** needs guidance, explanation, and reflection at each step."

> **Dev:** "Should we build phishing or brute-force scenarios in Version 1?"
> **Domain expert:** "No, Version 1 is limited to **SQL Injection Scenario**, **XSS Scenario**, **CSRF Scenario**, and **Buffer Overflow Scenario**."

> **Dev:** "Can students type arbitrary attack payloads?"
> **Domain expert:** "No, Version 1 uses **Guided Options** so learners understand concepts without crafting attack payloads."

> **Dev:** "Should the simulator send requests or attempt real logins?"
> **Domain expert:** "No, every **Attack Scenario** changes **Simulated System State** instead of contacting live services."

## Flagged Ambiguities

- "Security Attack Simulator" must mean an educational, controlled simulator, not a real exploitation tool.
- Version 1 excludes phishing, brute force, file upload vulnerabilities, IDOR, session hijacking, authentication, admin panels, and cloud infrastructure.
