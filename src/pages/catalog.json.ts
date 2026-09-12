/**
 * /catalog.json — machine-readable offer catalogue.
 *
 * A static file, built at the same time as the rest of the site, from the same
 * source as /listing/. Anything that wants the priced catalogue without
 * scraping HTML reads this: an aggregator, a directory importer, a crawler for
 * an answer engine, or a buyer's own script.
 *
 * It is schema.org JSON-LD, so it is valid structured data rather than a
 * private format nobody else implements.
 */
import type { APIRoute } from 'astro';
import { offerCatalogSchema } from '../data/listing';

export const GET: APIRoute = () =>
  new Response(JSON.stringify(offerCatalogSchema(), null, 2) + '\n', {
    // In a static build these headers are not what the browser sees: Astro
    // writes dist/catalog.json and Caddy decides the response headers. They are
    // kept because they are the correct ones, and because they become live if
    // this route is ever served rather than prerendered. If the cross-origin
    // header actually matters to a consumer, set it in the Caddy site config.
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
