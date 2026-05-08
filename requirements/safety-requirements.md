# Safety Requirements

## SR-001: Safe Targets Only

Every Attack Scenario must run against a Safe Target.

A Safe Target is a local mock system used only for simulation.

## SR-002: Simulated System State Only

Attack Scenarios must change Simulated System State only.

They must not contact live systems, public websites, real databases, real pages, real memory, or real request targets.

## SR-003: No Real Exploitation

The simulator must never perform real exploitation.

It must not include code that exploits vulnerabilities in real systems.

## SR-004: No Credential Collection

The simulator must not collect, store, transmit, or validate real credentials.

Any credentials shown in a scenario must be fictional and clearly part of a mock system.

## SR-005: No Arbitrary Payload Playground

The MVP must not allow learners to type arbitrary attack payloads.

Learners must use Guided Options.

## SR-006: SQL Simulation Only

The SQL Injection Scenario must not execute SQL against a real database.

It may display simulated query text and fictional query results for educational purposes.

## SR-007: XSS Simulation Only

The XSS Scenario must not execute real scripts.

It may show unsafe rendering conceptually using safe text and mock previews.

## SR-008: CSRF Simulation Only

The CSRF Scenario must not send real network requests.

It may show fictional request and server decision states.

## SR-009: Buffer Overflow Is Visual Only

The Buffer Overflow Scenario must not use unsafe native code or real memory manipulation.

It may show conceptual memory cells and bounds checking.

## SR-010: Defense Required

Every Attack Scenario must include a Defense View so learners connect the risk to protective habits.
