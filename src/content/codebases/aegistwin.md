---
title: "AegisTwin"
tagline: "Event-driven agent runtime with governance and replay"
description: "A productized agent runtime providing event-driven architecture, built-in policy governance, deterministic replay for debugging, and local memory graphs—everything needed to build auditable, controllable AI agents."
status: "available"
category: "AI Infrastructure"
tags: ["ai-agents", "governance", "runtime", "replay", "memory-graph", "event-driven"]
features:
  - "Event-driven architecture with typed, traceable events"
  - "Policy engine with configurable gates and audit logging"
  - "Deterministic replay for debugging and verification"
  - "Local memory graph (episodic, semantic, procedural)"
  - "FastAPI control plane with OpenAPI documentation"
  - "SDK for embedding in your own applications"
  - "Docker and Kubernetes deployment ready"
  - "Observability stack: Grafana, Prometheus, Jaeger"
included:
  - "Full source code (Python with FastAPI)"
  - "TypeScript SDK for frontend integration"
  - "Docker Compose with observability stack"
  - "Helm charts for Kubernetes deployment"
  - "8 example scripts covering all features"
  - "Comprehensive documentation (16 guides)"
  - "Synthetic test fixtures"
  - "Integration test suite"
  - "Enterprise security layer (auth, RBAC, encryption)"
  - "Admin dashboard (React + TypeScript)"
  - "Compliance documentation (SOC2, HIPAA, GDPR)"
  - "Complete IP transfer ready"
targetAudience:
  - "Teams building production AI agents"
  - "Enterprises requiring auditable AI systems"
  - "Developers needing deterministic agent debugging"
  - "Organizations with AI governance requirements"
order: 3
---

## What AegisTwin Does

AegisTwin is a **productized agent runtime** that provides the infrastructure modern AI agents need: governance, auditability, and reproducibility. Build agents that are controllable, debuggable, and enterprise-ready.

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

### Production-Ready API
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

## FAQ

**What's the difference between this and LangChain/LangGraph?**
AegisTwin focuses on runtime infrastructure—governance, audit, replay—not prompt chaining. It complements orchestration frameworks by adding the enterprise layer.

**Can I add custom policies?**
Yes. The policy engine accepts Python functions. Define any rule: action type restrictions, content filters, rate limits, etc.

**How does replay work?**
Every event is logged with inputs and outputs. Replay loads a trace and re-executes with the same inputs. Hash verification confirms deterministic behavior.

**Is this production-ready?**
Yes. Includes Docker Compose for development and Helm charts for Kubernetes production deployment. Observability stack (Prometheus, Grafana, Jaeger) included.

**How do I acquire this codebase?**
Contact us to inquire about pricing. Includes full IP transfer, all source code, SDKs, documentation, and deployment configurations. Enterprise-ready with compliance documentation for SOC2, HIPAA, and GDPR.
