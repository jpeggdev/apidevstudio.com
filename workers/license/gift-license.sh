#!/bin/bash

# Gift or revoke a license key
# Usage: ./gift-license.sh <insert|delete> <email> [name]
#
# Requires RESEND_API_KEY environment variable for insert

set -e

ACTION="$1"
EMAIL="$2"
NAME="${3:-Friend}"

if [ -z "$ACTION" ] || [ -z "$EMAIL" ]; then
    echo "Usage: ./gift-license.sh <insert|delete> <email> [name]"
    echo ""
    echo "Examples:"
    echo "  ./gift-license.sh insert john@example.com John"
    echo "  ./gift-license.sh delete john@example.com"
    exit 1
fi

if [ "$ACTION" != "insert" ] && [ "$ACTION" != "delete" ]; then
    echo "Error: Action must be 'insert' or 'delete'"
    exit 1
fi

# Handle delete action
if [ "$ACTION" = "delete" ]; then
    echo "Deleting license for: $EMAIL"
    echo ""

    # Delete child records first, then license
    echo "Removing activations..."
    npx wrangler d1 execute apidevstudio-licenses --remote --command \
        "DELETE FROM activations WHERE license_id IN (SELECT id FROM licenses WHERE email = '$EMAIL');"

    echo "Removing verification tokens..."
    npx wrangler d1 execute apidevstudio-licenses --remote --command \
        "DELETE FROM verification_tokens WHERE license_id IN (SELECT id FROM licenses WHERE email = '$EMAIL');"

    echo "Removing license..."
    npx wrangler d1 execute apidevstudio-licenses --remote --command \
        "DELETE FROM licenses WHERE email = '$EMAIL';"

    echo ""
    echo "Done! License for $EMAIL has been revoked."
    exit 0
fi

# Insert action requires RESEND_API_KEY
if [ -z "$RESEND_API_KEY" ]; then
    echo "Error: RESEND_API_KEY environment variable is not set"
    echo "Get your API key from https://resend.com and run:"
    echo "  export RESEND_API_KEY=re_xxxxxxxx"
    exit 1
fi

# Character set (same as keygen.ts - excludes ambiguous chars: 0, O, 1, I, L)
CHARSET="23456789ABCDEFGHJKMNPQRSTUVWXYZ"

# Generate a random 5-character segment
generate_segment() {
    local result=""
    for i in {1..5}; do
        local idx=$((RANDOM % ${#CHARSET}))
        result+="${CHARSET:$idx:1}"
    done
    echo "$result"
}

# Generate license key: ADEV-XXXXX-XXXXX-XXXXX-XXXXX
LICENSE_KEY="ADEV-$(generate_segment)-$(generate_segment)-$(generate_segment)-$(generate_segment)"

# Generate a unique ID for the license
LICENSE_ID="gift-$(date +%Y%m%d)-$(openssl rand -hex 4)"

echo "Generating license for: $EMAIL"
echo "License Key: $LICENSE_KEY"
echo "License ID: $LICENSE_ID"
echo ""

# Insert into D1 database
echo "Inserting into database..."
npx wrangler d1 execute apidevstudio-licenses --remote --command \
    "INSERT INTO licenses (id, key, email, created_at, updated_at) VALUES ('$LICENSE_ID', '$LICENSE_KEY', '$EMAIL', datetime('now'), datetime('now'));"

echo "Database insert successful!"
echo ""

# Send email via Resend
echo "Sending email..."

YEAR=$(date +%Y)

EMAIL_HTML=$(cat <<EOF
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; margin-bottom: 32px; }
    .logo { font-size: 24px; font-weight: bold; color: #0a0a0b; }
    .license-box { background: #f5f5f5; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0; }
    .license-key { font-family: 'Monaco', 'Consolas', monospace; font-size: 18px; font-weight: bold; color: #0a0a0b; letter-spacing: 1px; word-break: break-all; }
    .instructions { margin: 24px 0; }
    .instructions h3 { margin-bottom: 12px; }
    .instructions ol { margin: 0; padding-left: 20px; }
    .instructions li { margin-bottom: 8px; }
    .button { display: inline-block; background: #0a0a0b; color: #fff !important; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">API Dev Studio</div>
  </div>

  <p>Hey ${NAME}!</p>

  <p>You've been gifted a free license for <strong>API Dev Studio Pro</strong>!</p>

  <p>Here's your license key:</p>

  <div class="license-box">
    <div class="license-key">${LICENSE_KEY}</div>
  </div>

  <p style="text-align: center; margin: 24px 0;">
    <a href="https://apidevstudio.com/download" class="button">Download API Dev Studio</a>
  </p>

  <div class="instructions">
    <h3>How to activate:</h3>
    <ol>
      <li>Download and install API Dev Studio</li>
      <li>Open the app and go to <strong>Settings</strong> → <strong>License</strong></li>
      <li>Click <strong>Activate License</strong></li>
      <li>Paste your license key and click <strong>Activate</strong></li>
    </ol>
  </div>

  <p>Alternatively, you can activate by email - just enter <strong>${EMAIL}</strong> in the activation dialog and we'll automatically find your license.</p>

  <div class="footer">
    <p>If you have any questions, just reply to this email or visit <a href="https://apidevstudio.com">apidevstudio.com</a></p>
    <p>© ${YEAR} API Dev Studio</p>
  </div>
</body>
</html>
EOF
)

# Escape the HTML for JSON
EMAIL_JSON=$(jq -n \
    --arg from "API Dev Studio <noreply@licenses.apidevstudio.com>" \
    --arg to "$EMAIL" \
    --arg subject "You've been gifted API Dev Studio Pro!" \
    --arg html "$EMAIL_HTML" \
    '{from: $from, to: $to, subject: $subject, html: $html}')

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.resend.com/emails" \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$EMAIL_JSON")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
    echo "Email sent successfully!"
    echo ""
    echo "Done! License gifted to $EMAIL"
else
    echo "Failed to send email (HTTP $HTTP_CODE)"
    echo "$BODY"
    exit 1
fi
