import proof from '../../../data/workflowProof.json';

export const prerender = true;

export function GET(): Response {
  return new Response(`${JSON.stringify(proof, null, 2)}\n`, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=300'
    }
  });
}
