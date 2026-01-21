/**
 * Stripe webhook handler
 *
 * Handles checkout.session.completed events to generate licenses
 */

import type { Env, StripeEvent } from '../types';
import { verifyStripeSignature } from '../utils/crypto';
import { createLicense, getLicenseByStripeSession } from '../services/license';
import { sendLicenseEmail } from '../services/email';

export async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
  // Get the raw body and signature
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new Response(JSON.stringify({ error: 'Missing signature' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Verify the webhook signature
  const isValid = await verifyStripeSignature(payload, signature, env.STRIPE_WEBHOOK_SECRET);

  if (!isValid) {
    return new Response(JSON.stringify({ error: 'Invalid signature' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Parse the event
  let event: StripeEvent;
  try {
    event = JSON.parse(payload);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Check if we already processed this session (idempotency)
    const existingLicense = await getLicenseByStripeSession(env.apidevstudio_licenses, session.id);
    if (existingLicense) {
      console.log(`License already exists for session ${session.id}`);
      return new Response(JSON.stringify({ received: true, existing: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Extract customer email (check both fields)
    const email = session.customer_email || session.customer_details?.email;
    if (!email) {
      console.error('No customer email in checkout session');
      return new Response(JSON.stringify({ error: 'No customer email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create the license
    const license = await createLicense(
      env.apidevstudio_licenses,
      email,
      session.customer,
      session.payment_intent,
      session.id
    );

    console.log(`Created license ${license.key} for ${email}`);

    // Send the license email (optional - only if RESEND_API_KEY is configured)
    if (env.RESEND_API_KEY) {
      const sent = await sendLicenseEmail(env.RESEND_API_KEY, email, license.key);
      if (!sent) {
        console.error(`Failed to send license email to ${email}`);
      }
    }

    return new Response(JSON.stringify({ received: true, license_created: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Acknowledge other events
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
