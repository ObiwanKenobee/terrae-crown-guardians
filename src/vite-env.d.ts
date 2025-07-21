/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Application Settings
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_ENVIRONMENT: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_API_BASE_URL: string

  // Supabase Configuration
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string

  // Payment Provider Public Keys
  readonly VITE_STRIPE_PUBLIC_KEY: string
  readonly VITE_PAYPAL_CLIENT_ID: string
  readonly VITE_FLUTTERWAVE_PUBLIC_KEY: string
  readonly VITE_PAYSTACK_PUBLIC_KEY: string
  readonly VITE_MOLLIE_PROFILE_ID: string
  readonly VITE_PLAID_PUBLIC_KEY: string

  // Payment Configuration
  readonly WEBHOOK_BASE_URL: string
  readonly PAYMENT_SUCCESS_REDIRECT: string
  readonly PAYMENT_CANCEL_REDIRECT: string
  readonly ENABLE_PAYMENT_SIMULATION: string
  readonly PAYMENT_SUCCESS_RATE: string
  readonly PAYMENT_DELAY_MS: string

  // Server-side only (not accessible in frontend)
  readonly STRIPE_SECRET_KEY: string
  readonly PAYPAL_CLIENT_SECRET: string
  readonly FLUTTERWAVE_SECRET_KEY: string
  readonly PAYSTACK_SECRET_KEY: string
  readonly MPESA_CONSUMER_KEY: string
  readonly MPESA_CONSUMER_SECRET: string
  readonly MPESA_SHORTCODE: string
  readonly MPESA_PASSKEY: string
  readonly MOLLIE_API_KEY: string
  readonly PLAID_SECRET_KEY: string
  readonly PLAID_CLIENT_ID: string
  readonly PLAID_ENVIRONMENT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
