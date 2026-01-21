-- API Dev Studio License Database Schema
-- Run with: wrangler d1 execute apidevstudio-licenses --file=schema.sql

-- Licenses table
CREATE TABLE IF NOT EXISTS licenses (
    id TEXT PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    stripe_customer_id TEXT,
    stripe_payment_intent_id TEXT,
    stripe_session_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_licenses_email ON licenses(email);
CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(key);
CREATE INDEX IF NOT EXISTS idx_licenses_stripe_session ON licenses(stripe_session_id);

-- Machine activations (track where license is used)
CREATE TABLE IF NOT EXISTS activations (
    id TEXT PRIMARY KEY,
    license_id TEXT NOT NULL,
    machine_id TEXT NOT NULL,
    machine_name TEXT,
    app_version TEXT,
    os TEXT,
    activated_at TEXT NOT NULL,
    last_seen_at TEXT NOT NULL,
    FOREIGN KEY (license_id) REFERENCES licenses(id),
    UNIQUE(license_id, machine_id)
);

CREATE INDEX IF NOT EXISTS idx_activations_license ON activations(license_id);
CREATE INDEX IF NOT EXISTS idx_activations_machine ON activations(machine_id);

-- Email verification tokens (for "activate by email" flow)
CREATE TABLE IF NOT EXISTS verification_tokens (
    token TEXT PRIMARY KEY,
    license_id TEXT NOT NULL,
    machine_id TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    used INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    FOREIGN KEY (license_id) REFERENCES licenses(id)
);

CREATE INDEX IF NOT EXISTS idx_verification_license ON verification_tokens(license_id);
