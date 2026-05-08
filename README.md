# CyberShield Lab

CyberShield Lab is an educational Security Attack Simulator for beginner cybersecurity students.

Version 1 is an MVP focused on a reusable scenario player, local progress, and four safe simulations:

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Buffer Overflow, visual simulation only

## Safety Boundary

This project must never:

- perform real exploitation
- target real systems
- collect real credentials
- execute arbitrary payloads
- send live attack requests
- use real databases

## Development

```bash
npm install
npm run dev
```
