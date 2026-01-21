/**
 * Email verification token service
 */

import type { VerificationToken } from '../types';
import { generateVerificationToken, generateId } from '../utils/keygen';

/**
 * Create a verification token for email-based activation
 * Token expires in 15 minutes
 */
export async function createVerificationToken(
  db: D1Database,
  licenseId: string,
  machineId: string
): Promise<string> {
  const token = generateVerificationToken();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes

  await db
    .prepare(
      `INSERT INTO verification_tokens (token, license_id, machine_id, expires_at, used, created_at)
       VALUES (?, ?, ?, ?, 0, ?)`
    )
    .bind(token, licenseId, machineId, expiresAt.toISOString(), now.toISOString())
    .run();

  return token;
}

/**
 * Get and validate a verification token
 * Returns null if token is invalid, expired, or already used
 */
export async function getValidToken(db: D1Database, token: string): Promise<VerificationToken | null> {
  const result = await db
    .prepare('SELECT * FROM verification_tokens WHERE token = ?')
    .bind(token)
    .first<VerificationToken>();

  if (!result) {
    return null;
  }

  // Check if expired
  if (new Date(result.expires_at) < new Date()) {
    return null;
  }

  // Check if already used
  if (result.used) {
    return null;
  }

  return result;
}

/**
 * Mark a token as used
 */
export async function markTokenUsed(db: D1Database, token: string): Promise<void> {
  await db
    .prepare('UPDATE verification_tokens SET used = 1 WHERE token = ?')
    .bind(token)
    .run();
}

/**
 * Clean up expired tokens (call periodically)
 */
export async function cleanupExpiredTokens(db: D1Database): Promise<void> {
  await db
    .prepare('DELETE FROM verification_tokens WHERE expires_at < ? OR used = 1')
    .bind(new Date().toISOString())
    .run();
}
