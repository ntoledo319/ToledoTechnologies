// Server endpoint: takes a URL, runs Google PageSpeed Insights on both mobile
// and desktop, returns a normalized JSON payload for the client to render.
// Lives at /api/speed-test (POST).
//
// Why a server endpoint instead of client-side PSI: keeps the API key out of
// the browser (referrer-restricted keys are leakable; server-side is cleaner)
// AND lets us cache / rate-limit per-IP if abuse shows up.
//
// PSI works without a key but with low quota. With $PAGESPEED_API_KEY set in
// the Vercel project env, quota goes to 25k req/day — plenty for a public tool.

import type { APIRoute } from 'astro';

export const prerender = false;

const PSI_BASE =
  'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

type PsiResult = {
  performance: number | null;
  accessibility: number | null;
  best_practices: number | null;
  seo: number | null;
  lcp_ms: number | null;
  fcp_ms: number | null;
  cls: number | null;
  tbt_ms: number | null;
  speed_index_ms: number | null;
  field_lcp_ms?: number | null;
  field_cls?: number | null;
  field_inp_ms?: number | null;
};

type PsiApiResponse = {
  lighthouseResult?: {
    categories?: Record<string, { score?: unknown }>;
    audits?: Record<string, { numericValue?: unknown }>;
  };
  loadingExperience?: {
    metrics?: Record<string, { percentile?: unknown }>;
  };
};

function normalizeUrl(input: string): string | null {
  const s = (input || '').trim();
  if (!s) return null;
  let url = s;
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  try {
    const parsed = new URL(url);
    return parsed.toString();
  } catch {
    return null;
  }
}

async function runPsi(
  url: string,
  strategy: 'mobile' | 'desktop'
): Promise<PsiResult | { error: string }> {
  const key = import.meta.env.PAGESPEED_API_KEY ?? process.env.PAGESPEED_API_KEY;
  // PSI API requires repeating ?category= for each one; URLSearchParams won't
  // collapse them — append manually.
  const u = `${PSI_BASE}?url=${encodeURIComponent(url)}&strategy=${strategy}` +
    `&category=performance&category=accessibility&category=seo&category=best-practices` +
    (key ? `&key=${key}` : '');

  let resp: Response;
  try {
    resp = await fetch(u, { headers: { Accept: 'application/json' } });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return { error: `network: ${message}` };
  }
  if (!resp.ok) {
    return { error: `psi http ${resp.status}` };
  }
  const data = (await resp.json()) as PsiApiResponse;
  const cats = data?.lighthouseResult?.categories || {};
  const audits = data?.lighthouseResult?.audits || {};
  const cwv = data?.loadingExperience?.metrics || {};

  const score = (k: string): number | null => {
    const v = cats?.[k]?.score;
    return typeof v === 'number' ? Math.round(v * 100) : null;
  };
  const numAudit = (id: string): number | null => {
    const v = audits?.[id]?.numericValue;
    return typeof v === 'number' ? Math.round(v) : null;
  };
  const numCls = (): number | null => {
    const v = audits?.['cumulative-layout-shift']?.numericValue;
    return typeof v === 'number' ? Math.round(v * 1000) / 1000 : null;
  };

  return {
    performance: score('performance'),
    accessibility: score('accessibility'),
    best_practices: score('best-practices'),
    seo: score('seo'),
    lcp_ms: numAudit('largest-contentful-paint'),
    fcp_ms: numAudit('first-contentful-paint'),
    cls: numCls(),
    tbt_ms: numAudit('total-blocking-time'),
    speed_index_ms: numAudit('speed-index'),
    field_lcp_ms: cwv?.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
    field_cls: cwv?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile ?? null,
    field_inp_ms: cwv?.INTERACTION_TO_NEXT_PAINT?.percentile ?? null
  };
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid JSON body' }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    });
  }

  const rawUrl =
    body && typeof body === 'object' && 'url' in body ? body.url : '';
  const url = normalizeUrl(typeof rawUrl === 'string' ? rawUrl : '');
  if (!url) {
    return new Response(JSON.stringify({ error: 'enter a valid URL' }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    });
  }

  // Run mobile + desktop in parallel
  const [mobile, desktop] = await Promise.all([
    runPsi(url, 'mobile'),
    runPsi(url, 'desktop')
  ]);

  return new Response(
    JSON.stringify({ url, mobile, desktop }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
};

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ error: 'POST { url: "..." } to this endpoint' }),
    { status: 405, headers: { 'content-type': 'application/json' } }
  );
};
