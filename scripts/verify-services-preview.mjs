import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { dev } from 'astro';

const projectRoot = resolve(import.meta.dirname, '..');
const workspaceRoot = resolve(projectRoot, '..');
const dbPath = join(tmpdir(), `toledo-services-preview-${process.pid}.sqlite3`);

async function freePort() {
  const server = createServer();
  await new Promise((resolveReady, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolveReady);
  });
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  await new Promise((resolveClosed) => server.close(resolveClosed));
  return port;
}

async function waitForHealth(origin) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`${origin}/healthz`);
      if (response.ok) return;
    } catch {
      // The actual local server is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error('services preview backend did not become ready');
}

const backendPort = await freePort();
const sitePort = await freePort();
const backendOrigin = `http://127.0.0.1:${backendPort}`;
const siteOrigin = `http://127.0.0.1:${sitePort}`;
const backend = spawn(
  'python3',
  [
    '-m',
    'ops.server',
    '--db',
    dbPath,
    '--host',
    '127.0.0.1',
    '--port',
    String(backendPort)
  ],
  {
    cwd: workspaceRoot,
    env: { ...process.env, SERVICE_ALLOWED_ORIGINS: siteOrigin },
    stdio: ['ignore', 'ignore', 'pipe']
  }
);

let astro;
try {
  await waitForHealth(backendOrigin);
  process.env.SERVICES_API_ORIGIN = backendOrigin;
  astro = await dev({
    root: projectRoot,
    logLevel: 'silent',
    server: { host: '127.0.0.1', port: sitePort }
  });

  const submission = {
    submission_id: '44444444-4444-4444-8444-444444444444',
    name: 'Preview Contract Test',
    email: 'preview-contract@example.test',
    website: 'https://example.test',
    problem: 'Owned synthetic request for the exact slashless preview proxy.',
    systems: 'Astro preview and local services intake',
    service: 'setup',
    source: 'verify-services-preview',
    context: 'automated synthetic verification',
    company: ''
  };
  const post = () =>
    fetch(`${siteOrigin}/api/services/brief`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        origin: siteOrigin
      },
      body: JSON.stringify(submission)
    });

  const created = await post();
  const createdBody = await created.json();
  if (
    created.status !== 201 ||
    createdBody.ok !== true ||
    createdBody.duplicate !== false ||
    typeof createdBody.reference !== 'string'
  ) {
    throw new Error(`preview create contract failed: ${created.status}`);
  }

  const retried = await post();
  const retriedBody = await retried.json();
  if (
    retried.status !== 200 ||
    retriedBody.duplicate !== true ||
    retriedBody.reference !== createdBody.reference
  ) {
    throw new Error(`preview retry contract failed: ${retried.status}`);
  }
  console.log('SERVICES_PREVIEW_HTTP_VERIFIED');
} finally {
  if (astro) await astro.stop();
  backend.kill('SIGTERM');
  await new Promise((resolveExit) => {
    if (backend.exitCode !== null) resolveExit();
    else backend.once('exit', resolveExit);
  });
  await rm(dbPath, { force: true });
  await rm(`${dbPath}-shm`, { force: true });
  await rm(`${dbPath}-wal`, { force: true });
}
