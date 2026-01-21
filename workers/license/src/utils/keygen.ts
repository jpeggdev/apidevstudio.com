/**
 * License key generation utilities
 *
 * Format: ADEV-XXXXX-XXXXX-XXXXX-XXXXX
 * Uses a restricted character set to avoid ambiguous characters (0/O, 1/I/L)
 */

// Character set excluding ambiguous characters: 0, O, 1, I, L
const CHARSET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

/**
 * Generate a random license key
 * Format: ADEV-XXXXX-XXXXX-XXXXX-XXXXX
 */
export function generateLicenseKey(): string {
  const segments: string[] = ['ADEV'];

  for (let i = 0; i < 4; i++) {
    segments.push(generateSegment(5));
  }

  return segments.join('-');
}

/**
 * Generate a random segment of specified length
 */
function generateSegment(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARSET[array[i] % CHARSET.length];
  }

  return result;
}

/**
 * Generate a random verification token (URL-safe)
 */
export function generateVerificationToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);

  // Convert to base64url
  const base64 = btoa(String.fromCharCode(...array));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Generate a unique ID (UUID v4)
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Validate license key format
 */
export function isValidKeyFormat(key: string): boolean {
  const pattern = /^ADEV-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{5}-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{5}-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{5}-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{5}$/;
  return pattern.test(key.toUpperCase());
}
