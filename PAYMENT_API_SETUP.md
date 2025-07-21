# Payment API Setup Guide

This guide explains how to configure payment APIs for the AEGIS: Regina Terrae platform.

## Quick Start

1. Copy `.env.example` to `.env.local`
2. Configure your payment provider API keys
3. Restart the development server
4. Payment providers will be automatically initialized

## Environment Files

### `.env.local` (Development)
- Used for local development
- Contains sandbox/test API keys
- Safe to commit test keys (but don't commit real keys)

### `.env.production` (Production)
- Contains live/production API keys
- **NEVER commit this file to version control**
- Use your hosting platform's environment variable settings

## Supported Payment Providers

### Global Providers

#### Stripe (Recommended)
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

**Setup Steps:**
1. Sign up at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Set up webhooks pointing to your server
4. Add the webhook secret to your environment

#### PayPal
```env
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_WEBHOOK_ID=your_paypal_webhook_id
```

**Setup Steps:**
1. Create a PayPal Developer account
2. Create a new app in the PayPal Developer Console
3. Get your Client ID and Secret
4. Configure webhooks for payment events

### African Payment Providers

#### M-Pesa (Kenya, Tanzania, Uganda)
```env
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=your_business_shortcode
MPESA_PASSKEY=your_lipa_na_mpesa_passkey
MPESA_CALLBACK_URL=https://your-api.com/webhooks/mpesa
```

#### Flutterwave (Multiple African Countries)
```env
VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-your_public_key
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-your_secret_key
FLUTTERWAVE_HASH=your_webhook_hash
```

#### Paystack (Nigeria, Ghana, South Africa)
```env
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
```

### European Payment Providers

#### Mollie (Netherlands, Europe)
```env
VITE_MOLLIE_PROFILE_ID=your_mollie_profile_id
MOLLIE_API_KEY=test_your_mollie_api_key
```

#### Klarna (Nordic Countries)
```env
KLARNA_USERNAME=your_klarna_username
KLARNA_PASSWORD=your_klarna_password
KLARNA_PLAYGROUND_URL=https://api.playground.klarna.com
```

### American Payment Providers

#### Plaid (ACH Bank Transfers)
```env
VITE_PLAID_PUBLIC_KEY=your_plaid_public_key
PLAID_SECRET_KEY=your_plaid_secret_key
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_ENVIRONMENT=sandbox
```

### Australian Payment Providers

#### BPAY
```env
BPAY_BILLER_CODE=your_bpay_biller_code
BPAY_REFERENCE_PREFIX=AEGIS
```

#### Afterpay
```env
AFTERPAY_MERCHANT_ID=your_afterpay_merchant_id
AFTERPAY_SECRET_KEY=your_afterpay_secret_key
```

## Configuration Validation

The system automatically validates your payment configuration on startup. Check the browser console for:

- ✅ Payment system initialized successfully
- ⚠️ Payment configuration issues
- 📍 Environment and simulation mode status
- 🔌 List of configured providers

## Testing Payment Integration

### Using Simulation Mode (Default)
```env
ENABLE_PAYMENT_SIMULATION=true
PAYMENT_SUCCESS_RATE=0.95
PAYMENT_DELAY_MS=2000
```

### Using Real APIs (Sandbox)
```env
ENABLE_PAYMENT_SIMULATION=false
```

## Webhook Configuration

Set up webhooks for each provider to handle payment status updates:

```env
WEBHOOK_BASE_URL=https://your-api.com/webhooks
PAYMENT_SUCCESS_REDIRECT=https://your-app.com/payment/success
PAYMENT_CANCEL_REDIRECT=https://your-app.com/payment/cancel
```

## Security Best Practices

1. **Never commit real API keys** to version control
2. **Use environment variables** for all sensitive configuration
3. **Enable webhooks** to verify payment status server-side
4. **Validate webhook signatures** to ensure authenticity
5. **Use HTTPS** for all payment-related endpoints
6. **Implement proper error handling** for failed payments

## Development vs Production

### Development Environment
- Uses sandbox/test API keys
- Enables payment simulation for faster testing
- Logs detailed debug information
- Uses local webhook endpoints

### Production Environment
- Uses live API keys
- Disables payment simulation
- Minimal logging for security
- Uses production webhook endpoints

## Troubleshooting

### Common Issues

1. **"No payment providers configured"**
   - Check that at least one provider has valid API keys
   - Ensure you've copied `.env.example` to `.env.local`

2. **"Payment method temporarily unavailable"**
   - The selected payment provider is not properly configured
   - Check API keys and ensure they're for the correct environment

3. **Webhook signature verification failed**
   - Verify webhook secret matches your provider's configuration
   - Ensure webhook URL is accessible from the internet

### Debug Commands

Enable debug mode in development:
```env
VITE_APP_ENVIRONMENT=development
```

Check browser console for payment configuration details.

## API Integration Examples

### Frontend Usage
```typescript
import { getPaymentProviderPublicConfig } from '@/lib/paymentInit';
import { paymentService } from '@/services/paymentService';

// Get public configuration for Stripe
const stripeConfig = getPaymentProviderPublicConfig('stripe');

// Process a payment
const result = await paymentService.processPayment(
  paymentMethod,
  paymentData,
  billingInfo
);
```

### Backend Integration

Your backend should handle:
1. Processing payments with provider SDKs
2. Handling webhook events
3. Updating payment status in database
4. Sending confirmation emails

## Regional Payment Method Selection

The system automatically shows relevant payment methods based on user location:

- **Global**: Stripe, PayPal
- **Africa**: M-Pesa, Flutterwave, Paystack
- **Europe**: Mollie, Klarna, SEPA
- **America**: Stripe, PayPal, Plaid (ACH)
- **Australia**: BPAY, Afterpay

## Support

For payment integration support:
- Check the browser console for configuration issues
- Review provider documentation for API setup
- Test with sandbox/test modes before going live
- Implement proper error handling and user feedback

## Contributing

When adding new payment providers:
1. Add configuration to `paymentConfigService.ts`
2. Update `paymentInit.ts` with provider validation
3. Add environment variables to `.env.example`
4. Document setup steps in this README
