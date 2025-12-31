# Envwatch

> **CI‑first environment variable visibility for Node.js projects**  
> Detect missing, unused, and risky environment variables *before* they break builds or production.

---

## Why Envwatch?

Environment variables are one of the most fragile parts of modern applications.

Teams often don’t know:
- Which environment variables are **actually used** in code
- Which ones are **missing in CI or production**
- Which ones are **unused or obsolete**
- Which patterns are **dangerous or misleading**

As a result:
- CI failures appear late
- Production bugs are hard to diagnose
- Configuration drift goes unnoticed

**Envwatch exists to make configuration visible, reviewable, and predictable.**

---

## What Envwatch Does

Envwatch statically analyzes your codebase to understand how `process.env` is used and produces a **clear, human‑readable summary**.

Example output:

```
🌱 Environment Variable Summary

• 14 env vars referenced in code
• 3 missing in CI
• 4 unused env vars detected
• ⚠️ 1 risky pattern detected (NODE_ENV overridden)

Review recommended
```

---

## Core Features

- 🔍 Detects referenced environment variables (`process.env.*`)
- ❌ Identifies missing environment variables
- 🧹 Flags unused or obsolete env vars
- ⚠️ Detects risky configuration patterns
- 🧠 Deterministic, static analysis (no execution)
- 🤖 CI‑first, PR‑friendly design

---

## Installation

No global installation required.

```bash
npx envwatch
```

---

## Usage

### Local Usage

```bash
npx envwatch
```

Prints a configuration summary to stdout.

---

### CI Usage (Primary)

Envwatch is designed to run in CI and surface configuration issues early.

```yaml
- name: Envwatch
  run: npx envwatch --ci
```

---

## Operating Modes

| Mode | Behavior | Exit Code |
|----|----|----|
| Default | Report only | `0` |
| `--ci` | CI‑friendly output | `0` |
| `--json` | Machine‑readable output | `0` |

> Envwatch **does not block builds in v1**. It informs — not enforces.

---

## How It Works

```text
Scan source files
        ↓
Extract process.env references
        ↓
Compare with available env vars
        ↓
Detect gaps & risks
        ↓
Generate summary
```

---

## Signals Analyzed (v1 Scope)

- Referenced env vars in code
- Missing env vars (based on execution context)
- Unused env vars
- Risky patterns (overrides, hardcoded fallbacks)

> No secret scanning. No runtime execution.

---

## Design Principles

- **Visibility before enforcement**
- **Static analysis only**
- **Deterministic output**
- **Zero side effects**
- **Readable over exhaustive**

---

## Comparison

| Tool | Focus | Envwatch Advantage |
|----|----|----|
| dotenv | Loading vars | Usage visibility |
| CI env configs | Setup | Drift detection |
| Envwatch | Analysis | Review‑ready insights |

---

## Intended Audience

- Engineers debugging CI failures
- Tech leads managing configuration drift
- Teams practicing CI hygiene

---

## Non‑Goals (v1)

- Blocking builds
- Secret detection
- Runtime env mutation
- Multi‑language support

---

## Contributing

Contributions are welcome.

1. Fork the repo
2. Create a feature branch
3. Add tests
4. Submit a PR

---

## Roadmap (Post‑v1)

- PR comments (GitHub Actions)
- Optional enforcement mode
- `.env` file comparison
- Monorepo support

---

## Final Note

> Configuration bugs are silent until they are catastrophic.

Envwatch restores **clarity, confidence, and control** to environment‑based configuration.

