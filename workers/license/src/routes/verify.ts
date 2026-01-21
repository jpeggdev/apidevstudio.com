/**
 * Email verification route
 *
 * GET /verify/:token - Verify email and activate license
 */

import type { Env } from '../types';
import { htmlResponse, jsonResponse } from '../utils/response';
import { getValidToken, markTokenUsed } from '../services/verification';
import { getLicenseByKey, activateLicense } from '../services/license';

/**
 * Verify email token and activate license
 * GET /verify/:token
 * Query params: machine_id, machine_name, app_version, os
 */
export async function handleVerify(
  request: Request,
  env: Env,
  token: string
): Promise<Response> {
  const url = new URL(request.url);
  const machineId = url.searchParams.get('machine_id');
  const machineName = url.searchParams.get('machine_name');
  const appVersion = url.searchParams.get('app_version');
  const os = url.searchParams.get('os');

  // Validate token
  const verificationToken = await getValidToken(env.apidevstudio_licenses, token);

  if (!verificationToken) {
    return htmlResponse(errorPage('Invalid or Expired Link', 'This verification link is invalid or has expired. Please request a new one from the app.'), 400);
  }

  // Verify machine_id matches (if provided)
  if (machineId && verificationToken.machine_id !== machineId) {
    return htmlResponse(errorPage('Machine Mismatch', 'This verification link was generated for a different device. Please request a new one from the app.'), 400);
  }

  // Get the license
  const result = await env.apidevstudio_licenses
    .prepare('SELECT * FROM licenses WHERE id = ?')
    .bind(verificationToken.license_id)
    .first();

  if (!result) {
    return htmlResponse(errorPage('License Not Found', 'The license associated with this link no longer exists.'), 404);
  }

  // Mark token as used
  await markTokenUsed(env.apidevstudio_licenses, token);

  // Create activation
  const activation = await activateLicense(
    env.apidevstudio_licenses,
    verificationToken.license_id,
    verificationToken.machine_id,
    machineName || undefined,
    appVersion || undefined,
    os || undefined
  );

  // Return success page with the license key
  // The page will attempt to open the app via custom protocol
  return htmlResponse(successPage(result.key as string, result.email as string));
}

/**
 * API endpoint to verify token (for app to poll)
 * GET /verify/:token/status
 */
export async function handleVerifyStatus(
  request: Request,
  env: Env,
  token: string
): Promise<Response> {
  const verificationToken = await getValidToken(env.apidevstudio_licenses, token);

  if (!verificationToken) {
    return jsonResponse({ valid: false }, 200, env.ALLOWED_ORIGIN);
  }

  // Check if it's been used (meaning activation succeeded)
  const result = await env.apidevstudio_licenses
    .prepare('SELECT used FROM verification_tokens WHERE token = ?')
    .bind(token)
    .first();

  if (result?.used) {
    // Get the license info
    const license = await env.apidevstudio_licenses
      .prepare('SELECT * FROM licenses WHERE id = ?')
      .bind(verificationToken.license_id)
      .first();

    return jsonResponse(
      {
        valid: true,
        activated: true,
        license: license ? { key: license.key, email: license.email } : null,
      },
      200,
      env.ALLOWED_ORIGIN
    );
  }

  return jsonResponse({ valid: true, activated: false }, 200, env.ALLOWED_ORIGIN);
}

function successPage(licenseKey: string, email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>License Activated - API Dev Studio</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0b;
      color: #fafafa;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: #18181c;
      border: 1px solid #2a2a30;
      border-radius: 16px;
      padding: 48px;
      max-width: 480px;
      text-align: center;
    }
    .icon {
      width: 64px;
      height: 64px;
      background: #c8ff00;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 32px;
    }
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .subtitle {
      color: #8a8a94;
      margin-bottom: 32px;
    }
    .license-box {
      background: #0a0a0b;
      border: 1px solid #2a2a30;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .license-label {
      font-size: 12px;
      color: #5a5a64;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 8px;
    }
    .license-key {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 14px;
      color: #c8ff00;
      word-break: break-all;
    }
    .email {
      font-size: 14px;
      color: #8a8a94;
      margin-top: 8px;
    }
    .instructions {
      font-size: 14px;
      color: #8a8a94;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      background: #c8ff00;
      color: #0a0a0b;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      margin-top: 24px;
      transition: background 0.2s;
    }
    .button:hover {
      background: #d4ff33;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✓</div>
    <h1>License Activated!</h1>
    <p class="subtitle">API Dev Studio Pro is now active on this device.</p>

    <div class="license-box">
      <div class="license-label">Your License Key</div>
      <div class="license-key">${licenseKey}</div>
      <div class="email">${email}</div>
    </div>

    <p class="instructions">
      You can close this page and return to the app.<br>
      Your Pro features are now unlocked.
    </p>

    <a href="apidevstudio://activate?success=true" class="button">Open API Dev Studio</a>
  </div>

  <script>
    // Try to open the app automatically
    setTimeout(() => {
      window.location.href = 'apidevstudio://activate?success=true&key=${encodeURIComponent(licenseKey)}';
    }, 1000);
  </script>
</body>
</html>
  `.trim();
}

function errorPage(title: string, message: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} - API Dev Studio</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0b;
      color: #fafafa;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: #18181c;
      border: 1px solid #2a2a30;
      border-radius: 16px;
      padding: 48px;
      max-width: 480px;
      text-align: center;
    }
    .icon {
      width: 64px;
      height: 64px;
      background: #ef4444;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 32px;
    }
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .message {
      color: #8a8a94;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✕</div>
    <h1>${title}</h1>
    <p class="message">${message}</p>
  </div>
</body>
</html>
  `.trim();
}
