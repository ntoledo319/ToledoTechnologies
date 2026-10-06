import { isBriefService, type BriefService } from '../data/serviceOffers';

export interface BriefRoutingDefaults {
  service: BriefService;
  source: string;
  context: string;
}

export function resolveBriefRouting(
  search: string,
  defaults: BriefRoutingDefaults
): BriefRoutingDefaults {
  const params = new URLSearchParams(search);
  const requestedService = params.get('service');
  return {
    service: isBriefService(requestedService)
      ? requestedService
      : defaults.service,
    source: (params.get('source') || defaults.source).slice(0, 80),
    context: (params.get('context') || defaults.context).slice(0, 200)
  };
}

export function createUuidV4(
  cryptoSource: Pick<Crypto, 'getRandomValues'>
): string {
  const bytes = cryptoSource.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'));
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
}

export function isUuidV4(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}
