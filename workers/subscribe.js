/**
 * Cloudflare Worker: Email subscription handler
 *
 * Proxies form submissions to Buttondown API, keeping the API key secret.
 *
 * Environment variables required:
 *   BUTTONDOWN_API_KEY - Your Buttondown API key
 *   ALLOWED_ORIGIN - Your site origin (e.g., https://apidevstudio.com)
 */

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(env.ALLOWED_ORIGIN),
      });
    }

    // Only accept POST
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, env.ALLOWED_ORIGIN);
    }

    try {
      const { email } = await request.json();

      // Basic validation
      if (!email || !isValidEmail(email)) {
        return jsonResponse({ error: 'Valid email required' }, 400, env.ALLOWED_ORIGIN);
      }

      // Call Buttondown API
      const response = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${env.BUTTONDOWN_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle duplicate subscriber gracefully
        if (response.status === 400 && data.email?.[0]?.includes('already')) {
          return jsonResponse({ success: true, message: "You're already on the list!" }, 200, env.ALLOWED_ORIGIN);
        }
        return jsonResponse({ error: data.detail || 'Subscription failed' }, response.status, env.ALLOWED_ORIGIN);
      }

      return jsonResponse({ success: true, message: "You're on the list!" }, 200, env.ALLOWED_ORIGIN);

    } catch (err) {
      return jsonResponse({ error: 'Something went wrong' }, 500, env.ALLOWED_ORIGIN);
    }
  },
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin),
    },
  });
}
