/**
 * API Dev Studio License Server
 *
 * Cloudflare Worker for license management:
 * - Stripe webhook handling
 * - License key activation
 * - Email-based activation
 * - License status checking
 */

import type { Env } from './types';
import { corsHeaders, jsonResponse } from './utils/response';
import { handleStripeWebhook } from './routes/stripe';
import { handleActivateByKey, handleActivateByEmail } from './routes/activate';
import { handleVerify, handleVerifyStatus } from './routes/verify';
import { handleLicenseStatus, handleLicenseLookup } from './routes/license';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(env.ALLOWED_ORIGIN),
      });
    }

    try {
      // Route: POST /webhook/stripe
      if (method === 'POST' && path === '/webhook/stripe') {
        return handleStripeWebhook(request, env);
      }

      // Route: POST /activate/key
      if (method === 'POST' && path === '/activate/key') {
        return handleActivateByKey(request, env);
      }

      // Route: POST /activate/email
      if (method === 'POST' && path === '/activate/email') {
        return handleActivateByEmail(request, env);
      }

      // Route: GET /verify/:token
      const verifyMatch = path.match(/^\/verify\/([^/]+)$/);
      if (method === 'GET' && verifyMatch) {
        return handleVerify(request, env, verifyMatch[1]);
      }

      // Route: GET /verify/:token/status
      const verifyStatusMatch = path.match(/^\/verify\/([^/]+)\/status$/);
      if (method === 'GET' && verifyStatusMatch) {
        return handleVerifyStatus(request, env, verifyStatusMatch[1]);
      }

      // Route: GET /license/:key/status
      const licenseStatusMatch = path.match(/^\/license\/([^/]+)\/status$/);
      if (method === 'GET' && licenseStatusMatch) {
        return handleLicenseStatus(request, env, licenseStatusMatch[1]);
      }

      // Route: GET /license/lookup?email=...
      if (method === 'GET' && path === '/license/lookup') {
        return handleLicenseLookup(request, env);
      }

      // Route: GET /health
      if (method === 'GET' && path === '/health') {
        return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() }, 200, env.ALLOWED_ORIGIN);
      }

      // 404 Not Found
      return jsonResponse({ error: 'Not found' }, 404, env.ALLOWED_ORIGIN);

    } catch (error) {
      console.error('Worker error:', error);
      return jsonResponse(
        { error: 'Internal server error' },
        500,
        env.ALLOWED_ORIGIN
      );
    }
  },
};
