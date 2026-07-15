---
title: 'AegisTwin'
tagline: 'Event-driven agent runtime with governance and replay'
description: 'An engineering reference for event-driven agent architecture, policy gates, deterministic replay, and local memory graphs.'
status: 'reference'
category: 'AI Infrastructure'
tags:
  [
    'ai-agents',
    'governance',
    'runtime',
    'replay',
    'memory-graph',
    'event-driven'
  ]
features:
  - 'Event-driven architecture with typed, traceable events'
  - 'Policy engine with configurable gates and audit logging'
  - 'Deterministic replay for debugging and verification'
  - 'Local memory graph (episodic, semantic, procedural)'
  - 'FastAPI control plane with OpenAPI documentation'
  - 'SDK for embedding in your own applications'
  - 'Docker and Kubernetes deployment artifacts'
  - 'Observability stack: Grafana, Prometheus, Jaeger'
included:
  - 'Full source code (Python with FastAPI)'
  - 'TypeScript SDK for frontend integration'
  - 'Docker Compose with observability stack'
  - 'Helm charts for Kubernetes deployment'
  - '8 example scripts covering all features'
  - 'Comprehensive documentation (16 guides)'
  - 'Synthetic test fixtures'
  - 'Integration test suite'
  - 'Enterprise security layer (auth, RBAC, encryption)'
  - 'Admin dashboard (React + TypeScript)'
  - 'Compliance-oriented mapping notes (not certification)'
targetAudience:
  - 'Teams building production AI agents'
  - 'Enterprises requiring auditable AI systems'
  - 'Developers needing deterministic agent debugging'
  - 'Organizations with AI governance requirements'
order: 3
---

## What AegisTwin Does

AegisTwin is an **agent-runtime reference build** for governance, auditability,
and reproducibility. It demonstrates patterns Toledo Technologies can apply to
custom agent work; this page is not an offer to sell or license the repository.

## The Problem It Solves

Modern AI agents need more than inference:

- No audit trail—can't explain what the agent did or why
- No policy enforcement—agents can take unauthorized actions
- No replay capability—impossible to debug non-deterministic behavior
- Cloud memory dependencies—data sovereignty concerns

AegisTwin provides the missing infrastructure layer.

## Key Capabilities

### Event-Driven Architecture

All module communication flows through typed, traceable events. Every action has a parent chain, payload hash, and timestamp for complete provenance.

### Built-in Governance

Configurable policy gates deny forbidden actions before they execute. All denials are logged with full context. Define rules like "never execute shell commands" or "block PII export."

### Deterministic Replay

Record any agent run and replay it exactly. Hash verification ensures determinism. Critical for debugging, compliance audits, and regression testing.

### Local Memory Graph

Episodic, semantic, and procedural memory systems—all running locally. No cloud dependency means full data sovereignty and privacy.

### API Reference

FastAPI control plane with:

- `/health` — Health checks
- `/demo/{name}` — Run demos
- `/ingest` — Ingest data
- `/query` — Query the system
- `/replay` — Replay runs
- `/policies` — List policies

### Embeddable SDK

Use AegisTwin as a library in your applications:

```python
from aegistwin import AegisTwin

twin = AegisTwin()
run_id = twin.ingest({"records": [...]}, source="my_app")
result = twin.query("What patterns emerged?")
```

## Technical Details

- **Language**: Python 3.10+
- **API**: FastAPI with Pydantic models
- **SDK**: Python + TypeScript clients
- **Deployment**: Docker Compose, Helm/Kubernetes
- **Observability**: OpenTelemetry, Prometheus, Grafana, Jaeger
- **Testing**: pytest with async support

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        AegisTwin                             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌───────────────┐  │
│  │ Ingest  │→ │ Pipeline │→ │ Analyze │→ │ Graph/Memory  │  │
│  └─────────┘  └──────────┘  └─────────┘  └───────────────┘  │
│       ↓            ↓             ↓              ↓           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Event Bus                          │   │
│  │    (typed events + payload hashes + parent chains)    │   │
│  └──────────────────────────────────────────────────────┘   │
│       ↓            ↓             ↓              ↓           │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌───────────────┐  │
│  │ Policy  │  │  Audit   │  │ Replay  │  │     API       │  │
│  │ Engine  │  │  Logger  │  │ Service │  │   (FastAPI)   │  │
│  └─────────┘  └──────────┘  └─────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## What's in the Box

```
AegisTwin/
├── aegistwin/          # Main package
│   ├── runtime/        # Core runtime engine
│   ├── governance/     # Policy engine + audit
│   ├── events/         # Pydantic event schemas
│   ├── modules/        # Connectors, pipeline, analysis
│   └── api/            # FastAPI control plane
├── sdk/typescript/     # TypeScript client SDK
├── docker/             # Docker Compose + Helm charts
├── observability/      # Grafana dashboards, Prometheus config
├── examples/           # 8 usage examples
├── docs/               # 16 documentation guides
├── fixtures/           # Synthetic test data
└── tests/              # Integration test suite
```

## 🚀 [Live Demo →](https://aegistwin-demo.vercel.app/)

Run agent actions through the policy gates, watch the hash-chained event log build up, then replay the run to verify chain integrity. The three primitives — event log, policy gates, deterministic replay — in your browser, in 60 seconds.

Public source: [github.com/ntoledo319/AegisTwin](https://github.com/ntoledo319/AegisTwin) (136 test functions in public `main`, MIT)

## Real Benchmarks — Reproducible

Run `python3 benchmarks/run_benchmarks.py` on your hardware to verify these:

| Metric                             | Number                       |
| ---------------------------------- | ---------------------------- |
| Event bus throughput               | **65,000–93,000 events/sec** |
| Replay verification rate           | **110,000+ events/sec**      |
| Policy gate overhead (10 policies) | **~41 µs mean**              |
| Memory per event                   | **~1 KB, linear scaling**    |
| 10,000-event run replay time       | **<90 ms**                   |

📄 [Full Benchmark Report (PDF)](/downloads/aegistwin-benchmarks.pdf) — every methodology + raw numbers

## What This Reference Demonstrates

The useful proof is inspectable and reproducible:

- 📄 [Performance benchmarks](/downloads/aegistwin-benchmarks.pdf) — real, reproducible numbers on the actual code
- 📄 [Comparison vs LangChain / AutoGen / CrewAI](/downloads/aegistwin-comparison.pdf) — honest positioning, including when _not_ to use AegisTwin
- ✅ 136 test functions in public `main` covering replay determinism, policy gating, and memory consistency
- ✅ Full Docker Compose with Grafana / Prometheus / Jaeger ready to deploy
- ✅ Helm chart for Kubernetes — production deployment is one command
- ✅ TypeScript SDK for frontend integration
- ✅ 16 documentation guides (architecture, plugins, embedding, observability, etc.)
- ✅ Compliance-oriented mapping notes, explicitly not an audit or certification

## FAQ

**What's the difference between this and LangChain/LangGraph?**
AegisTwin is a runtime, not a framework. You can run LangChain inside AegisTwin. AegisTwin adds replay, governance, and a typed event log that LangChain doesn't have. See the [comparison PDF](/downloads/aegistwin-comparison.pdf) for the honest breakdown.

**Can I add custom policies?**
Yes. The policy engine accepts Python functions. Define any rule: action type restrictions, content filters, rate limits, PII redaction, etc.

**How does replay work?**
Every event is logged with inputs and outputs and a hash chain. Replay loads a trace and re-executes with the same recorded inputs. Hash verification confirms determinism. 10,000-event runs replay in <90 ms — fast enough to use as a CI step on every PR.

**Is this a production guarantee?**
No. The repository includes deployment and observability assets plus a public
test suite, but production readiness depends on the target environment, threat
model, integrations, and independent verification.

**Can Toledo Technologies build from these patterns?**
Yes. Use the custom-build inquiry on this page to describe the governance,
replay, or observability problem. A separate scoped engagement would define the
deliverables, ownership, and verification plan.
