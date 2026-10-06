import { describe, expect, it } from 'vitest';
import { createUuidV4, isUuidV4, resolveBriefRouting } from '../utils/brief';

describe('service brief routing', () => {
  const defaults = {
    service: 'unsure' as const,
    source: '/brief/',
    context: ''
  };

  it('preserves allowlisted service, source, and context query values', () => {
    expect(
      resolveBriefRouting(
        '?service=care&source=agency-campaign&context=Existing%20client',
        defaults
      )
    ).toEqual({
      service: 'care',
      source: 'agency-campaign',
      context: 'Existing client'
    });
  });

  it('rejects unknown services and bounds routing metadata', () => {
    const result = resolveBriefRouting(
      `?service=anything&source=${'s'.repeat(100)}&context=${'c'.repeat(240)}`,
      defaults
    );
    expect(result.service).toBe('unsure');
    expect(result.source).toHaveLength(80);
    expect(result.context).toHaveLength(200);
  });

  it('creates a valid UUIDv4 without Math.random fallback', () => {
    let next = 0;
    const cryptoSource = {
      getRandomValues<T extends ArrayBufferView | null>(array: T): T {
        if (array instanceof Uint8Array) {
          array.forEach((_, index) => {
            array[index] = next++;
          });
        }
        return array;
      }
    };
    const id = createUuidV4(cryptoSource as Pick<Crypto, 'getRandomValues'>);
    expect(id).toBe('00010203-0405-4607-8809-0a0b0c0d0e0f');
    expect(isUuidV4(id)).toBe(true);
    expect(isUuidV4('tt-unsafe-fallback')).toBe(false);
  });
});
