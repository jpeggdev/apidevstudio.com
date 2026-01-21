/**
 * License service - CRUD operations for licenses and activations
 */

import type { Env, License, Activation } from '../types';
import { generateLicenseKey, generateId } from '../utils/keygen';

/**
 * Create a new license
 */
export async function createLicense(
  db: D1Database,
  email: string,
  stripeCustomerId?: string,
  stripePaymentIntentId?: string,
  stripeSessionId?: string
): Promise<License> {
  const id = generateId();
  const key = generateLicenseKey();
  const now = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO licenses (id, key, email, stripe_customer_id, stripe_payment_intent_id, stripe_session_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(id, key, email.toLowerCase(), stripeCustomerId || null, stripePaymentIntentId || null, stripeSessionId || null, now, now)
    .run();

  return {
    id,
    key,
    email: email.toLowerCase(),
    stripe_customer_id: stripeCustomerId || null,
    stripe_payment_intent_id: stripePaymentIntentId || null,
    stripe_session_id: stripeSessionId || null,
    created_at: now,
    updated_at: now,
  };
}

/**
 * Get license by key
 */
export async function getLicenseByKey(db: D1Database, key: string): Promise<License | null> {
  const result = await db
    .prepare('SELECT * FROM licenses WHERE key = ?')
    .bind(key.toUpperCase())
    .first<License>();

  return result || null;
}

/**
 * Get license by email
 */
export async function getLicenseByEmail(db: D1Database, email: string): Promise<License | null> {
  const result = await db
    .prepare('SELECT * FROM licenses WHERE email = ?')
    .bind(email.toLowerCase())
    .first<License>();

  return result || null;
}

/**
 * Get license by Stripe session ID
 */
export async function getLicenseByStripeSession(db: D1Database, sessionId: string): Promise<License | null> {
  const result = await db
    .prepare('SELECT * FROM licenses WHERE stripe_session_id = ?')
    .bind(sessionId)
    .first<License>();

  return result || null;
}

/**
 * Get all licenses for an email (in case of multiple purchases)
 */
export async function getLicensesByEmail(db: D1Database, email: string): Promise<License[]> {
  const result = await db
    .prepare('SELECT * FROM licenses WHERE email = ? ORDER BY created_at DESC')
    .bind(email.toLowerCase())
    .all<License>();

  return result.results || [];
}

/**
 * Create or update an activation
 */
export async function activateLicense(
  db: D1Database,
  licenseId: string,
  machineId: string,
  machineName?: string,
  appVersion?: string,
  os?: string
): Promise<Activation> {
  const now = new Date().toISOString();

  // Check if activation already exists
  const existing = await db
    .prepare('SELECT * FROM activations WHERE license_id = ? AND machine_id = ?')
    .bind(licenseId, machineId)
    .first<Activation>();

  if (existing) {
    // Update last_seen_at
    await db
      .prepare(
        `UPDATE activations SET last_seen_at = ?, machine_name = COALESCE(?, machine_name), app_version = COALESCE(?, app_version), os = COALESCE(?, os) WHERE id = ?`
      )
      .bind(now, machineName || null, appVersion || null, os || null, existing.id)
      .run();

    return {
      ...existing,
      last_seen_at: now,
      machine_name: machineName || existing.machine_name,
      app_version: appVersion || existing.app_version,
      os: os || existing.os,
    };
  }

  // Create new activation
  const id = generateId();

  await db
    .prepare(
      `INSERT INTO activations (id, license_id, machine_id, machine_name, app_version, os, activated_at, last_seen_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(id, licenseId, machineId, machineName || null, appVersion || null, os || null, now, now)
    .run();

  return {
    id,
    license_id: licenseId,
    machine_id: machineId,
    machine_name: machineName || null,
    app_version: appVersion || null,
    os: os || null,
    activated_at: now,
    last_seen_at: now,
  };
}

/**
 * Get activations for a license
 */
export async function getActivations(db: D1Database, licenseId: string): Promise<Activation[]> {
  const result = await db
    .prepare('SELECT * FROM activations WHERE license_id = ? ORDER BY activated_at DESC')
    .bind(licenseId)
    .all<Activation>();

  return result.results || [];
}
