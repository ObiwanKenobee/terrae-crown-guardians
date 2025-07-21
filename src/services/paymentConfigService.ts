/**
 * Payment Configuration Service
 * Manages environment variables and configuration for all payment providers
 */

export interface PaymentConfig {
  // Stripe Configuration
  stripe: {
    publicKey: string;
    secretKey?: string;
    webhookSecret?: string;
  };

  // PayPal Configuration
  paypal: {
    clientId: string;
    clientSecret?: string;
    webhookId?: string;
  };

  // African Payment Providers
  mpesa: {
    consumerKey?: string;
    consumerSecret?: string;
    shortcode?: string;
    passkey?: string;
    callbackUrl?: string;
  };

  flutterwave: {
    publicKey: string;
    secretKey?: string;
    hash?: string;
  };

  paystack: {
    publicKey: string;
    secretKey?: string;
  };

  // European Payment Providers
  mollie: {
    profileId: string;
    apiKey?: string;
  };

  klarna: {
    username?: string;
    password?: string;
    playgroundUrl?: string;
  };

  // American Payment Providers
  plaid: {
    publicKey: string;
    secretKey?: string;
    clientId?: string;
    environment?: string;
  };

  // Australian Payment Providers
  bpay: {
    billerCode?: string;
    referencePrefix?: string;
  };

  poli: {
    merchantCode?: string;
    authenticationCode?: string;
  };

  afterpay: {
    merchantId?: string;
    secretKey?: string;
  };

  // General Settings
  general: {
    apiBaseUrl: string;
    webhookBaseUrl: string;
    successRedirect: string;
    cancelRedirect: string;
    enableSimulation: boolean;
    simulationSuccessRate: number;
    simulationDelay: number;
  };
}

class PaymentConfigService {
  private config: PaymentConfig;

  constructor() {
    this.config = this.loadConfiguration();
  }

  private loadConfiguration(): PaymentConfig {
    return {
      stripe: {
        publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
        secretKey: import.meta.env.STRIPE_SECRET_KEY,
        webhookSecret: import.meta.env.STRIPE_WEBHOOK_SECRET,
      },

      paypal: {
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
        clientSecret: import.meta.env.PAYPAL_CLIENT_SECRET,
        webhookId: import.meta.env.PAYPAL_WEBHOOK_ID,
      },

      mpesa: {
        consumerKey: import.meta.env.MPESA_CONSUMER_KEY,
        consumerSecret: import.meta.env.MPESA_CONSUMER_SECRET,
        shortcode: import.meta.env.MPESA_SHORTCODE,
        passkey: import.meta.env.MPESA_PASSKEY,
        callbackUrl: import.meta.env.MPESA_CALLBACK_URL,
      },

      flutterwave: {
        publicKey: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || '',
        secretKey: import.meta.env.FLUTTERWAVE_SECRET_KEY,
        hash: import.meta.env.FLUTTERWAVE_HASH,
      },

      paystack: {
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
        secretKey: import.meta.env.PAYSTACK_SECRET_KEY,
      },

      mollie: {
        profileId: import.meta.env.VITE_MOLLIE_PROFILE_ID || '',
        apiKey: import.meta.env.MOLLIE_API_KEY,
      },

      klarna: {
        username: import.meta.env.KLARNA_USERNAME,
        password: import.meta.env.KLARNA_PASSWORD,
        playgroundUrl: import.meta.env.KLARNA_PLAYGROUND_URL,
      },

      plaid: {
        publicKey: import.meta.env.VITE_PLAID_PUBLIC_KEY || '',
        secretKey: import.meta.env.PLAID_SECRET_KEY,
        clientId: import.meta.env.PLAID_CLIENT_ID,
        environment: import.meta.env.PLAID_ENVIRONMENT || 'sandbox',
      },

      bpay: {
        billerCode: import.meta.env.BPAY_BILLER_CODE,
        referencePrefix: import.meta.env.BPAY_REFERENCE_PREFIX || 'AEGIS',
      },

      poli: {
        merchantCode: import.meta.env.POLI_MERCHANT_CODE,
        authenticationCode: import.meta.env.POLI_AUTHENTICATION_CODE,
      },

      afterpay: {
        merchantId: import.meta.env.AFTERPAY_MERCHANT_ID,
        secretKey: import.meta.env.AFTERPAY_SECRET_KEY,
      },

      general: {
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
        webhookBaseUrl: import.meta.env.WEBHOOK_BASE_URL || 'http://localhost:3001/webhooks',
        successRedirect: import.meta.env.PAYMENT_SUCCESS_REDIRECT || '/payment/success',
        cancelRedirect: import.meta.env.PAYMENT_CANCEL_REDIRECT || '/payment/cancel',
        enableSimulation: import.meta.env.ENABLE_PAYMENT_SIMULATION === 'true',
        simulationSuccessRate: parseFloat(import.meta.env.PAYMENT_SUCCESS_RATE || '0.95'),
        simulationDelay: parseInt(import.meta.env.PAYMENT_DELAY_MS || '2000'),
      },
    };
  }

  /**
   * Get configuration for a specific payment provider
   */
  getProviderConfig(provider: string): any {
    switch (provider.toLowerCase()) {
      case 'stripe':
        return this.config.stripe;
      case 'paypal':
        return this.config.paypal;
      case 'safaricom':
      case 'mpesa':
        return this.config.mpesa;
      case 'flutterwave':
        return this.config.flutterwave;
      case 'paystack':
        return this.config.paystack;
      case 'mollie':
      case 'ideal':
      case 'sepa':
        return this.config.mollie;
      case 'klarna':
        return this.config.klarna;
      case 'plaid':
      case 'ach':
        return this.config.plaid;
      case 'bpay':
        return this.config.bpay;
      case 'poli':
        return this.config.poli;
      case 'afterpay':
        return this.config.afterpay;
      default:
        return null;
    }
  }

  /**
   * Check if a payment provider is properly configured
   */
  isProviderConfigured(provider: string): boolean {
    const config = this.getProviderConfig(provider);
    if (!config) return false;

    // Check if essential keys are present
    switch (provider.toLowerCase()) {
      case 'stripe':
        return !!config.publicKey;
      case 'paypal':
        return !!config.clientId;
      case 'flutterwave':
        return !!config.publicKey;
      case 'paystack':
        return !!config.publicKey;
      case 'mollie':
        return !!config.profileId;
      case 'plaid':
        return !!config.publicKey && !!config.clientId;
      case 'safaricom':
      case 'mpesa':
        return !!config.consumerKey && !!config.shortcode;
      default:
        return Object.values(config).some(value => !!value);
    }
  }

  /**
   * Get list of configured payment providers
   */
  getConfiguredProviders(): string[] {
    const providers = [
      'stripe', 'paypal', 'flutterwave', 'paystack', 
      'mollie', 'plaid', 'safaricom', 'klarna',
      'bpay', 'poli', 'afterpay'
    ];

    return providers.filter(provider => this.isProviderConfigured(provider));
  }

  /**
   * Get general configuration
   */
  getGeneralConfig() {
    return this.config.general;
  }

  /**
   * Get complete configuration (for debugging)
   */
  getFullConfig(): PaymentConfig {
    return { ...this.config };
  }

  /**
   * Validate environment setup
   */
  validateEnvironment(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const configuredProviders = this.getConfiguredProviders();

    if (configuredProviders.length === 0) {
      errors.push('No payment providers are properly configured');
    }

    if (!this.config.general.apiBaseUrl) {
      errors.push('API base URL is not configured');
    }

    // Check for at least one global provider
    const globalProviders = ['stripe', 'paypal'];
    const hasGlobalProvider = globalProviders.some(provider => 
      this.isProviderConfigured(provider)
    );

    if (!hasGlobalProvider) {
      errors.push('No global payment provider (Stripe/PayPal) is configured');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get environment-specific endpoints
   */
  getEndpoints() {
    const isProduction = import.meta.env.VITE_APP_ENVIRONMENT === 'production';
    
    return {
      api: this.config.general.apiBaseUrl,
      webhooks: this.config.general.webhookBaseUrl,
      success: this.config.general.successRedirect,
      cancel: this.config.general.cancelRedirect,
      isProduction,
      isSimulation: this.config.general.enableSimulation,
    };
  }
}

// Export singleton instance
export const paymentConfigService = new PaymentConfigService();

// Export configuration validation utility
export const validatePaymentSetup = () => {
  const validation = paymentConfigService.validateEnvironment();
  
  if (!validation.isValid) {
    console.warn('Payment configuration issues:', validation.errors);
  } else {
    console.log('Payment configuration is valid');
    console.log('Configured providers:', paymentConfigService.getConfiguredProviders());
  }
  
  return validation;
};
