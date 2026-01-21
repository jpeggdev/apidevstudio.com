/**
 * Cryptographic utilities for Stripe webhook verification
 */

/**
 * Verify Stripe webhook signature
 * Based on Stripe's signature verification algorithm
 */
export async function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    // Parse the signature header
    const elements = signature.split(',');
    const signatureMap: Record<string, string> = {};

    for (const element of elements) {
      const [key, value] = element.split('=');
      if (key && value) {
        signatureMap[key] = value;
      }
    }

    const timestamp = signatureMap['t'];
    const expectedSig = signatureMap['v1'];

    if (!timestamp || !expectedSig) {
      return false;
    }

    // Check timestamp (reject if older than 5 minutes)
    const timestampAge = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
    if (timestampAge > 300) {
      return false;
    }

    // Compute expected signature
    const signedPayload = `${timestamp}.${payload}`;
    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(signedPayload)
    );

    // Convert to hex
    const computedSig = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Constant-time comparison
    return timingSafeEqual(computedSig, expectedSig);
  } catch {
    return false;
  }
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}
