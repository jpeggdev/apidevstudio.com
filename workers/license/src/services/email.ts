/**
 * Email service using Resend
 */

const RESEND_API_URL = 'https://api.resend.com/emails';
const FROM_EMAIL = 'API Dev Studio <noreply@licenses.apidevstudio.com>';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send an email via Resend API
 */
async function sendEmail(apiKey: string, options: SendEmailOptions): Promise<boolean> {
  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });

    return response.ok;
  } catch {
    console.error('Failed to send email');
    return false;
  }
}

/**
 * Send license key email after purchase
 */
export async function sendLicenseEmail(
  apiKey: string,
  to: string,
  licenseKey: string
): Promise<boolean> {
  const html = `
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
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">API Dev Studio</div>
  </div>

  <p>Thank you for purchasing API Dev Studio Pro!</p>

  <p>Here's your license key:</p>

  <div class="license-box">
    <div class="license-key">${licenseKey}</div>
  </div>

  <div class="instructions">
    <h3>How to activate:</h3>
    <ol>
      <li>Open API Dev Studio</li>
      <li>Go to <strong>Settings</strong> → <strong>License</strong></li>
      <li>Click <strong>Activate License</strong></li>
      <li>Paste your license key and click <strong>Activate</strong></li>
    </ol>
  </div>

  <p>Alternatively, you can activate by email - just enter <strong>${to}</strong> in the activation dialog and we'll automatically find your license.</p>

  <div class="footer">
    <p>If you have any questions, reply to this email or visit <a href="https://apidevstudio.com">apidevstudio.com</a></p>
    <p>© ${new Date().getFullYear()} API Dev Studio</p>
  </div>
</body>
</html>
  `.trim();

  return sendEmail(apiKey, {
    to,
    subject: 'Your API Dev Studio Pro License Key',
    html,
  });
}

/**
 * Send verification email for "activate by email" flow
 */
export async function sendVerificationEmail(
  apiKey: string,
  to: string,
  verificationUrl: string
): Promise<boolean> {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; margin-bottom: 32px; }
    .logo { font-size: 24px; font-weight: bold; color: #0a0a0b; }
    .button { display: inline-block; background: #0a0a0b; color: #fff !important; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; margin: 24px 0; }
    .button:hover { background: #333; }
    .note { font-size: 14px; color: #666; margin-top: 24px; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">API Dev Studio</div>
  </div>

  <p>Click the button below to activate API Dev Studio Pro on your device:</p>

  <p style="text-align: center;">
    <a href="${verificationUrl}" class="button">Activate License</a>
  </p>

  <p class="note">This link expires in 15 minutes. If you didn't request this activation, you can safely ignore this email.</p>

  <div class="footer">
    <p>© ${new Date().getFullYear()} API Dev Studio</p>
  </div>
</body>
</html>
  `.trim();

  return sendEmail(apiKey, {
    to,
    subject: 'Activate API Dev Studio Pro',
    html,
  });
}
