/**
 * License status routes
 *
 * GET /license/:key/status - Check license status
 * GET /license/lookup?email=... - Lookup license by email (returns masked key)
 */

import type { Env } from '../types';
import { jsonResponse } from '../utils/response';
import { isValidKeyFormat } from '../utils/keygen';
import { getLicenseByKey, getLicenseByEmail, getActivations } from '../services/license';

/**
 * Check license status by key
 * GET /license/:key/status
 */
export async function handleLicenseStatus(
  request: Request,
  env: Env,
  key: string
): Promise<Response> {
  // Validate key format
  if (!isValidKeyFormat(key)) {
    return jsonResponse(
      { valid: false, error: 'Invalid license key format' },
      400,
      env.ALLOWED_ORIGIN
    );
  }

  // Look up the license
  const license = await getLicenseByKey(env.apidevstudio_licenses, key);

  if (!license) {
    return jsonResponse({ valid: false }, 200, env.ALLOWED_ORIGIN);
  }

  // Get activations
  const activations = await getActivations(env.apidevstudio_licenses, license.id);

  return jsonResponse(
    {
      valid: true,
      email: license.email,
      created_at: license.created_at,
      activations: activations.length,
    },
    200,
    env.ALLOWED_ORIGIN
  );
}

/**
 * Lookup license by email (returns masked key for verification)
 * GET /license/lookup?email=...
 */
export async function handleLicenseLookup(
  request: Request,
  env: Env
): Promise<Response> {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return jsonResponse(
      { found: false, error: 'Email parameter required' },
      400,
      env.ALLOWED_ORIGIN
    );
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse(
      { found: false, error: 'Invalid email format' },
      400,
      env.ALLOWED_ORIGIN
    );
  }

  // Look up the license
  const license = await getLicenseByEmail(env.apidevstudio_licenses, email);

  if (!license) {
    return jsonResponse({ found: false }, 200, env.ALLOWED_ORIGIN);
  }

  // Return masked key (show first and last segments)
  // ADEV-XXXXX-XXXXX-XXXXX-XXXXX -> ADEV-*****-*****-*****-XXXXX
  const parts = license.key.split('-');
  const maskedKey = `${parts[0]}-*****-*****-*****-${parts[4]}`;

  return jsonResponse(
    {
      found: true,
      masked_key: maskedKey,
      created_at: license.created_at,
    },
    200,
    env.ALLOWED_ORIGIN
  );
}
