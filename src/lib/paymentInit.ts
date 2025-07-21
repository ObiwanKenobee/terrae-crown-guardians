/**
 * Payment System Initialization
 * Validates and initializes payment providers based on environment configuration
 */

import { paymentConfigService, validatePaymentSetup } from '@/services/paymentConfigService';

export interface PaymentProviderStatus {
  provider: string;
  configured: boolean;
  publicKey?: string;
  environment: 'sandbox' | 'production' | 'test';
  supportedRegions: string[];
}

/**
 * Initialize payment system and validate configuration
 */
export const initializePaymentSystem = (): {
  success: boolean;
  providers: PaymentProviderStatus[];
  errors: string[];
} => {
  console.log('🔄 Initializing AEGIS Payment System...');
  
  const validation = validatePaymentSetup();
  const configuredProviders = paymentConfigService.getConfiguredProviders();
  const endpoints = paymentConfigService.getEndpoints();
  
  // Map providers to their status
  const providerStatuses: PaymentProviderStatus[] = [
    {
      provider: 'stripe',
      configured: paymentConfigService.isProviderConfigured('stripe'),
      publicKey: paymentConfigService.getProviderConfig('stripe')?.publicKey,
      environment: endpoints.isProduction ? 'production' : 'sandbox',
      supportedRegions: ['global', 'america', 'europe']
    },
    {
      provider: 'paypal',
      configured: paymentConfigService.isProviderConfigured('paypal'),
      publicKey: paymentConfigService.getProviderConfig('paypal')?.clientId,
      environment: endpoints.isProduction ? 'production' : 'sandbox',
      supportedRegions: ['global', 'america', 'europe']
    },
    {
      provider: 'flutterwave',
      configured: paymentConfigService.isProviderConfigured('flutterwave'),
      publicKey: paymentConfigService.getProviderConfig('flutterwave')?.publicKey,
      environment: endpoints.isProduction ? 'production' : 'test',
      supportedRegions: ['africa']
    },
    {
      provider: 'paystack',
      configured: paymentConfigService.isProviderConfigured('paystack'),
      publicKey: paymentConfigService.getProviderConfig('paystack')?.publicKey,
      environment: endpoints.isProduction ? 'production' : 'test',
      supportedRegions: ['africa']
    },
    {
      provider: 'mpesa',
      configured: paymentConfigService.isProviderConfigured('safaricom'),
      environment: endpoints.isProduction ? 'production' : 'sandbox',
      supportedRegions: ['africa']
    },
    {
      provider: 'mollie',
      configured: paymentConfigService.isProviderConfigured('mollie'),
      publicKey: paymentConfigService.getProviderConfig('mollie')?.profileId,
      environment: endpoints.isProduction ? 'production' : 'test',
      supportedRegions: ['europe']
    },
    {
      provider: 'plaid',
      configured: paymentConfigService.isProviderConfigured('plaid'),
      publicKey: paymentConfigService.getProviderConfig('plaid')?.publicKey,
      environment: paymentConfigService.getProviderConfig('plaid')?.environment || 'sandbox',
      supportedRegions: ['america']
    }
  ];

  // Log initialization results
  if (validation.isValid) {
    console.log('✅ Payment system initialized successfully');
    console.log(`📍 Environment: ${endpoints.isProduction ? 'Production' : 'Development'}`);
    console.log(`🔄 Simulation Mode: ${endpoints.isSimulation ? 'Enabled' : 'Disabled'}`);
    console.log('🔌 Configured Providers:', configuredProviders);
  } else {
    console.warn('��️ Payment system initialization issues:');
    validation.errors.forEach(error => console.warn(`  - ${error}`));
  }

  return {
    success: validation.isValid,
    providers: providerStatuses,
    errors: validation.errors
  };
};

/**
 * Get available payment methods based on user's region and configured providers
 */
export const getAvailablePaymentMethods = (userRegion?: string) => {
  const { providers } = initializePaymentSystem();
  const configuredProviders = providers.filter(p => p.configured);
  
  if (!userRegion) {
    return configuredProviders;
  }
  
  return configuredProviders.filter(provider => 
    provider.supportedRegions.includes('global') || 
    provider.supportedRegions.includes(userRegion.toLowerCase())
  );
};

/**
 * Check if a specific payment provider is ready for use
 */
export const isPaymentProviderReady = (providerName: string): boolean => {
  return paymentConfigService.isProviderConfigured(providerName);
};

/**
 * Get payment provider public configuration (safe for frontend)
 */
export const getPaymentProviderPublicConfig = (providerName: string) => {
  const config = paymentConfigService.getProviderConfig(providerName);
  const endpoints = paymentConfigService.getEndpoints();
  
  if (!config) return null;
  
  // Return only public/safe configuration values
  switch (providerName.toLowerCase()) {
    case 'stripe':
      return {
        publicKey: config.publicKey,
        environment: endpoints.isProduction ? 'production' : 'test'
      };
    case 'paypal':
      return {
        clientId: config.clientId,
        environment: endpoints.isProduction ? 'production' : 'sandbox'
      };
    case 'flutterwave':
      return {
        publicKey: config.publicKey,
        environment: endpoints.isProduction ? 'production' : 'test'
      };
    case 'paystack':
      return {
        publicKey: config.publicKey,
        environment: endpoints.isProduction ? 'production' : 'test'
      };
    case 'mollie':
      return {
        profileId: config.profileId,
        environment: endpoints.isProduction ? 'production' : 'test'
      };
    case 'plaid':
      return {
        publicKey: config.publicKey,
        environment: config.environment || 'sandbox'
      };
    default:
      return {
        configured: true,
        environment: endpoints.isProduction ? 'production' : 'test'
      };
  }
};

/**
 * Development helper to log all payment configuration (excluding secrets)
 */
export const debugPaymentConfiguration = () => {
  if (import.meta.env.VITE_APP_ENVIRONMENT !== 'development') {
    console.warn('Payment debug info only available in development mode');
    return;
  }
  
  console.group('🔍 Payment Configuration Debug');
  
  const validation = validatePaymentSetup();
  const endpoints = paymentConfigService.getEndpoints();
  const configuredProviders = paymentConfigService.getConfiguredProviders();
  
  console.log('Validation:', validation);
  console.log('Endpoints:', endpoints);
  console.log('Configured Providers:', configuredProviders);
  
  configuredProviders.forEach(provider => {
    const publicConfig = getPaymentProviderPublicConfig(provider);
    console.log(`${provider} Config:`, publicConfig);
  });
  
  console.groupEnd();
};
