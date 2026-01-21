/**
 * License activation routes
 *
 * POST /activate/key - Activate by license key
 * POST /activate/email - Request email verification
 */

import type { Env, ActivateByKeyRequest, ActivateByEmailRequest, LicenseResponse } from '../types';
import { jsonResponse } from '../utils/response';
import { isValidKeyFormat } from '../utils/keygen';
import { getLicenseByKey, getLicenseByEmail, activateLicense } from '../services/license';
import { createVerificationToken } from '../services/verification';
import { sendVerificationEmail } from '../services/email';

/**
 * Activate license by key
 * POST /activate/key
 * Body: { key: string, machine_id: string, machine_name?: string, app_version?: string, os?: string }
 */
export async function handleActivateByKey(request: Request, env: Env): Promise<Response> {
  let body: ActivateByKeyRequest;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, error: 'Invalid JSON body' }, 400, env.ALLOWED_ORIGIN);
  }

  const { key, machine_id, machine_name, app_version, os } = body;

  // Validate required fields
  if (!key || !machine_id) {
    return jsonResponse(
      { success: false, error: 'Missing required fields: key, machine_id' },
      400,
      env.ALLOWED_ORIGIN
    );
  }

  // Validate key format
  if (!isValidKeyFormat(key)) {
    return jsonResponse(
      { success: false, error: 'Invalid license key format' },
      400,
      env.ALLOWED_ORIGIN
    );
  }

  // Look up the license
  const license = await getLicenseByKey(env.apidevstudio_licenses, key);

  if (!license) {
    return jsonResponse(
      { success: false, error: 'License key not found' },
      404,
      env.ALLOWED_ORIGIN
    );
  }

  // Create/update activation
  const activation = await activateLicense(
    env.apidevstudio_licenses,
    license.id,
    machine_id,
    machine_name,
    app_version,
    os
  );

  const response: LicenseResponse = {
    success: true,
    license: {
      key: license.key,
      email: license.email,
      activated_at: activation.activated_at,
    },
  };

  return jsonResponse(response, 200, env.ALLOWED_ORIGIN);
}

/**
 * Request email verification for activation
 * POST /activate/email
 * Body: { email: string, machine_id: string, machine_name?: string, app_version?: string, os?: string }
 */
export async function handleActivateByEmail(request: Request, env: Env): Promise<Response> {
  let body: ActivateByEmailRequest;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, error: 'Invalid JSON body' }, 400, env.ALLOWED_ORIGIN);
  }

  const { email, machine_id, machine_name, app_version, os } = body;

  // Validate required fields
  if (!email || !machine_id) {
    return jsonResponse(
      { success: false, error: 'Missing required fields: email, machine_id' },
      400,
      env.ALLOWED_ORIGIN
    );
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse(
      { success: false, error: 'Invalid email format' },
      400,
      env.ALLOWED_ORIGIN
    );
  }

  // Look up the license
  const license = await getLicenseByEmail(env.apidevstudio_licenses, email);

  if (!license) {
    // Don't reveal if email exists or not (security)
    return jsonResponse(
      {
        success: true,
        message: 'If a license exists for this email, you will receive a verification link shortly.',
      },
      200,
      env.ALLOWED_ORIGIN
    );
  }

  // Create verification token
  const token = await createVerificationToken(env.apidevstudio_licenses, license.id, machine_id);

  // Build verification URL
  // The app will use a custom protocol handler or redirect
  const verificationUrl = `${env.APP_URL}/verify/${token}?machine_id=${encodeURIComponent(machine_id)}&machine_name=${encodeURIComponent(machine_name || '')}&app_version=${encodeURIComponent(app_version || '')}&os=${encodeURIComponent(os || '')}`;

  // Send verification email
  if (env.RESEND_API_KEY) {
    const sent = await sendVerificationEmail(env.RESEND_API_KEY, email, verificationUrl);
    if (!sent) {
      console.error(`Failed to send verification email to ${email}`);
    }
  } else {
    console.warn('RESEND_API_KEY not configured, skipping email');
  }

  return jsonResponse(
    {
      success: true,
      message: 'If a license exists for this email, you will receive a verification link shortly.',
    },
    200,
    env.ALLOWED_ORIGIN
  );
}
