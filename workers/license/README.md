# API Dev Studio License Server

Cloudflare Worker for managing API Dev Studio Pro licenses.

## Setup

### 1. Install dependencies

```bash
cd workers/license
npm install
```

### 2. Create D1 Database

```bash
# Create the database
npx wrangler d1 create apidevstudio-licenses

# Copy the database_id from the output and update wrangler.toml
```

### 3. Update wrangler.toml

Replace `YOUR_D1_DATABASE_ID` with the actual database ID from step 2.

### 4. Initialize the database schema

```bash
# For local development
npx wrangler d1 execute apidevstudio-licenses --local --file=schema.sql

# For production
npx wrangler d1 execute apidevstudio-licenses --file=schema.sql
```

### 5. Set secrets

```bash
# Stripe secret key
npx wrangler secret put STRIPE_SECRET_KEY
# Enter: sk_live_xxxxx (or sk_test_xxxxx for testing)

# Stripe webhook secret
npx wrangler secret put STRIPE_WEBHOOK_SECRET
# Enter: whsec_xxxxx

# Resend API key (for sending emails)
npx wrangler secret put RESEND_API_KEY
# Enter: re_xxxxx
```

### 6. Deploy

```bash
npx wrangler deploy
```

## Local Development

```bash
# Start local dev server
npx wrangler dev

# Initialize local database
npx wrangler d1 execute apidevstudio-licenses --local --file=schema.sql
```

## API Endpoints

### Stripe Webhook

```
POST /webhook/stripe
```

Handles `checkout.session.completed` events from Stripe. Generates license key and sends email.

### Activate by Key

```
POST /activate/key
Content-Type: application/json

{
  "key": "ADEV-XXXXX-XXXXX-XXXXX-XXXXX",
  "machine_id": "unique-machine-id",
  "machine_name": "My MacBook",
  "app_version": "1.0.0",
  "os": "macos"
}
```

Response:
```json
{
  "success": true,
  "license": {
    "key": "ADEV-XXXXX-XXXXX-XXXXX-XXXXX",
    "email": "user@example.com",
    "activated_at": "2026-01-20T12:00:00Z"
  }
}
```

### Activate by Email

```
POST /activate/email
Content-Type: application/json

{
  "email": "user@example.com",
  "machine_id": "unique-machine-id",
  "machine_name": "My MacBook"
}
```

Sends a verification email with activation link.

### Verify Token (Browser)

```
GET /verify/:token?machine_id=xxx
```

Returns HTML success/error page. Used when user clicks email link.

### Verify Token Status (API)

```
GET /verify/:token/status
```

Returns JSON status - used by app to poll for completion.

### License Status

```
GET /license/ADEV-XXXXX-XXXXX-XXXXX-XXXXX/status
```

Response:
```json
{
  "valid": true,
  "email": "user@example.com",
  "created_at": "2026-01-20T12:00:00Z",
  "activations": 2
}
```

### License Lookup

```
GET /license/lookup?email=user@example.com
```

Response:
```json
{
  "found": true,
  "masked_key": "ADEV-*****-*****-*****-XXXXX",
  "created_at": "2026-01-20T12:00:00Z"
}
```

### Health Check

```
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-01-20T12:00:00Z"
}
```

## Testing

### Test with Stripe CLI

```bash
# Forward webhooks to local worker
stripe listen --forward-to http://localhost:8787/webhook/stripe

# Trigger test event
stripe trigger checkout.session.completed
```

### Test activation

```bash
# Activate by key
curl -X POST http://localhost:8787/activate/key \
  -H "Content-Type: application/json" \
  -d '{"key":"ADEV-TEST1-TEST2-TEST3-TEST4","machine_id":"test-machine"}'
```

## Custom Domain

To use `license.apidevstudio.com`:

1. Go to Cloudflare Dashboard → Workers & Pages → your worker
2. Click "Custom Domains"
3. Add `license.apidevstudio.com`
4. Update DNS if needed

## Email Setup (Resend)

1. Create account at [resend.com](https://resend.com)
2. Add and verify domain `apidevstudio.com`
3. Create API key
4. Add as secret: `wrangler secret put RESEND_API_KEY`
