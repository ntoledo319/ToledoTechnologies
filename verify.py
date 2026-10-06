#!/usr/bin/env python3
"""Run the complete main-site verification gate.

The success token is printed only after the real project commands and the
commercial-route/source contracts all pass.
"""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent


def run(label: str, *command: str) -> None:
    print(f"[{label}] {' '.join(command)}", flush=True)
    completed = subprocess.run(command, cwd=ROOT, check=False)
    if completed.returncode != 0:
        raise SystemExit(f"{label} failed with exit code {completed.returncode}")


def require(path: str, *needles: str) -> str:
    target = ROOT / path
    if not target.is_file():
        raise SystemExit(f"missing required file: {path}")
    text = target.read_text(encoding="utf-8")
    for needle in needles:
        if needle not in text:
            raise SystemExit(f"{path} is missing required contract text: {needle}")
    return text


def verify_contracts() -> None:
    routes = [
        "index.html",
        "services/index.html",
        "workflows/index.html",
        "workflows/care/index.html",
        "custom-tools/index.html",
        "partner/index.html",
        "brief/index.html",
        "kit/compare/index.html",
        "kit/sample/index.html",
        "kit/sample/output/report.html",
        "workflow-proof/index.html",
        "proofs/workflow/synthetic-proof.json",
    ]
    for route in routes:
        if not (ROOT / "dist" / route).is_file():
            raise SystemExit(f"build omitted commercial route: /{route}")

    # These two reviewed pages previously existed only in production and an
    # unmerged authored branch. They now build from Astro source, so prove that
    # every generated hashed asset they reference is in the same fresh payload.
    for route in ("kit/compare/index.html", "kit/sample/index.html"):
        page = (ROOT / "dist" / route).read_text(encoding="utf-8")
        assets = set(re.findall(r'(?:href|src)=["\'](/_astro/[^"\'?#]+)', page))
        if not assets:
            raise SystemExit(f"restored route has no generated asset references: /{route}")
        for asset in assets:
            if not (ROOT / "dist" / asset.lstrip("/")).is_file():
                raise SystemExit(f"restored route references missing build asset: {asset}")

    config = require(
        "astro.config.mjs",
        "'/api/services/brief'",
        "http://127.0.0.1:8765",
        "SERVICES_API_ORIGIN",
    )
    if "fake" in config.lower():
        raise SystemExit("Astro proxy must not introduce a fake intake path")

    form = require(
        "src/components/services/BriefForm.astro",
        'action="/api/services/brief"',
        'name="submission_id"',
        'name="problem"',
        'name="systems"',
        'name="company"',
        "sessionStorage",
        "cannot confirm whether the brief was recorded",
    )
    if "Math.random" in form:
        raise SystemExit("brief form contains a non-UUID random fallback")

    require(
        "src/utils/brief.ts",
        "resolveBriefRouting",
        "createUuidV4",
        "isBriefService",
    )
    require(
        "src/data/serviceOffers.ts",
        "$1,500",
        "$3,000",
        "$500/month",
    )
    require(
        "src/pages/workflows/index.astro",
        "$1,200 Integration Triage",
        "14-day correction window",
    )
    require(
        "src/pages/workflows/care.astro",
        "$500 per month",
        "60 minutes aggregate work",
        "There is no 24/7 human response",
    )
    require(
        "src/pages/custom-tools.astro",
        "$5,500 floor",
        "$3,500–$5,000",
        "$15,000+",
        "$10,000–$30,000",
    )
    proof = require(
        "src/pages/workflow-proof.astro",
        "Synthetic proof",
        "not a client result",
        "proof.notification.recovery.adapter",
        "proof.notification.recovery.sent_count",
        "proof.workflow.check_adapter",
        "recovered that same incident",
        "/proofs/",
        "/case-studies/",
        "/portfolio/",
    )
    if "ops/artifacts" in proof:
        raise SystemExit("customer-facing proof exposes an internal artifact path")
    require(
        "src/data/workflowProof.json",
        '"synthetic": true',
        '"runtime_claim": "local_fixture_only"',
        '"status": 201',
        '"status": 200',
        '"status": 422',
        '"same_incident_recovered": true',
        '"check_adapter": "owned_intake_e2e"',
        "No production runtime or delivery claim.",
    )
    require(
        "src/pages/privacy.astro",
        "eolkits.com/api/v1/lead",
        "separate workflow brief service",
        "after 90 days",
        "existing email provider",
        "saved reference",
        "promise that every message will arrive",
        "random retry ID",
        "client reference",
        "hashes, audit metadata",
        "audit metadata",
        "Backup copies",
    )
    require(
        "src/pages/terms.astro",
        "50% is due after written scope",
        "remaining 50% is due after staging",
        "14-calendar-day",
        "verified production handoff",
        "renewal takes effect at",
        "current paid period",
        "no annual",
        "lock-in",
    )

    home_html = (ROOT / "dist" / "index.html").read_text(encoding="utf-8")
    if len(re.findall(r'id=["\']specimen["\']', home_html)) != 1:
        raise SystemExit("homepage must contain exactly one #specimen anchor")


def main() -> None:
    run("typecheck", "npm", "run", "typecheck")
    run("lint", "npm", "run", "lint")
    run("test", "npm", "test", "--", "--run")
    run("build", "npm", "run", "build")
    run("preview-http", "node", "scripts/verify-services-preview.mjs")
    verify_contracts()
    print("LEAF_1_VERIFIED")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(130)
