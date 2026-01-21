export interface Env {
  apidevstudio_licenses: D1Database;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  RESEND_API_KEY?: string; // Optional - if not set, emails won't be sent
  ALLOWED_ORIGIN: string;
  APP_URL: string;
}

export interface License {
  id: string;
  key: string;
  email: string;
  stripe_customer_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_session_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Activation {
  id: string;
  license_id: string;
  machine_id: string;
  machine_name: string | null;
  app_version: string | null;
  os: string | null;
  activated_at: string;
  last_seen_at: string;
}

export interface VerificationToken {
  token: string;
  license_id: string;
  machine_id: string;
  expires_at: string;
  used: number;
  created_at: string;
}

// API Request/Response types
export interface ActivateByKeyRequest {
  key: string;
  machine_id: string;
  machine_name?: string;
  app_version?: string;
  os?: string;
}

export interface ActivateByEmailRequest {
  email: string;
  machine_id: string;
  machine_name?: string;
  app_version?: string;
  os?: string;
}

export interface LicenseResponse {
  success: boolean;
  license?: {
    key: string;
    email: string;
    activated_at: string;
  };
  error?: string;
  message?: string;
}

export interface StripeCheckoutSession {
  id: string;
  customer: string;
  customer_email: string | null;
  customer_details?: {
    email: string;
    name?: string;
  };
  payment_intent: string;
  payment_status: string;
  status: string;
}

export interface StripeEvent {
  id: string;
  type: string;
  data: {
    object: StripeCheckoutSession;
  };
}
