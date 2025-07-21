import { PaymentData, BillingInfo, PaymentResponse, PaymentMethod } from '@/types/payment';
import { paymentConfigService } from './paymentConfigService';

class PaymentService {
  private baseURL: string;

  constructor() {
    const config = paymentConfigService.getGeneralConfig();
    this.baseURL = `${config.apiBaseUrl}/payment`;
  }

  // Process payment with environment-aware configuration
  async processPayment(
    paymentMethod: PaymentMethod,
    paymentData: PaymentData,
    billingInfo: BillingInfo
  ): Promise<PaymentResponse> {
    try {
      const config = paymentConfigService.getGeneralConfig();
      const providerConfig = paymentConfigService.getProviderConfig(paymentMethod.processor);

      // Check if provider is configured
      if (!paymentConfigService.isProviderConfigured(paymentMethod.processor)) {
        console.warn(`Payment provider ${paymentMethod.processor} is not configured`);
        return {
          success: false,
          error_message: 'Payment method is temporarily unavailable.'
        };
      }

      // Use simulation delay from environment or default
      await new Promise(resolve => setTimeout(resolve, config.simulationDelay));

      const payload = {
        payment_method: paymentMethod,
        payment_data: paymentData,
        billing_info: billingInfo,
        timestamp: new Date().toISOString(),
        provider_config: providerConfig ? { ...providerConfig, secretKey: undefined } : null // Remove sensitive data from logs
      };

      console.log('Processing payment:', payload);

      // Use real API or simulation based on configuration
      if (config.enableSimulation) {
        return this.simulatePaymentProcessor(paymentMethod, paymentData);
      } else {
        return this.processRealPayment(paymentMethod, paymentData, billingInfo, providerConfig);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error_message: 'Payment processing failed. Please try again.'
      };
    }
  }

  // Process actual payment with real APIs
  private async processRealPayment(
    paymentMethod: PaymentMethod,
    paymentData: PaymentData,
    billingInfo: BillingInfo,
    providerConfig: any
  ): Promise<PaymentResponse> {
    const endpoints = paymentConfigService.getEndpoints();

    try {
      const response = await fetch(`${this.baseURL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method: paymentMethod,
          payment_data: paymentData,
          billing_info: billingInfo,
          provider_config: providerConfig,
          success_url: endpoints.success,
          cancel_url: endpoints.cancel,
        })
      });

      if (!response.ok) {
        throw new Error(`Payment API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Real payment processing error:', error);
      return {
        success: false,
        error_message: 'Payment processing failed. Please try again.'
      };
    }
  }

  private simulatePaymentProcessor(
    paymentMethod: PaymentMethod,
    paymentData: PaymentData
  ): PaymentResponse {
    const config = paymentConfigService.getGeneralConfig();
    const endpoints = paymentConfigService.getEndpoints();

    // Use configurable success rate
    const isSuccess = Math.random() < config.simulationSuccessRate;

    if (!isSuccess) {
      return {
        success: false,
        error_message: this.getRandomErrorMessage()
      };
    }

    const transactionId = this.generateTransactionId(paymentMethod.processor);

    // Handle different payment flow types
    switch (paymentMethod.processor) {
      case 'safaricom': // M-Pesa
        return {
          success: true,
          transaction_id: transactionId,
          redirect_url: `${endpoints.success}?provider=mpesa&tx=${transactionId}`
        };

      case 'flutterwave':
      case 'paystack':
        return {
          success: true,
          transaction_id: transactionId,
          redirect_url: `${endpoints.success}?provider=${paymentMethod.processor}&tx=${transactionId}`
        };

      case 'sepa':
        return {
          success: true,
          transaction_id: transactionId,
          redirect_url: `${endpoints.success}?provider=sepa&tx=${transactionId}`
        };

      case 'bpay':
        return {
          success: true,
          transaction_id: transactionId,
          redirect_url: `${endpoints.success}?provider=bpay&tx=${transactionId}`
        };
      
      default:
        return {
          success: true,
          transaction_id: transactionId
        };
    }
  }

  private generateTransactionId(processor: string): string {
    const prefix = processor.toUpperCase().substring(0, 3);
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}_${timestamp}_${random}`;
  }

  private getRandomErrorMessage(): string {
    const errors = [
      'Insufficient funds',
      'Card declined',
      'Network timeout',
      'Invalid payment details',
      'Payment method not supported',
      'Transaction limit exceeded'
    ];
    return errors[Math.floor(Math.random() * errors.length)];
  }

  // Get user's location to suggest appropriate payment methods
  async getUserLocation(): Promise<string> {
    try {
      // Simulate geolocation or IP-based detection
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.continent_code || 'NA';
    } catch {
      return 'NA'; // Default to North America
    }
  }

  // Convert amount to local currency (simulation)
  convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
    const exchangeRates: Record<string, number> = {
      'USD_EUR': 0.85,
      'USD_GBP': 0.73,
      'USD_AUD': 1.35,
      'USD_CAD': 1.25,
      'USD_NGN': 411,
      'USD_KES': 108,
      'USD_ZAR': 15.2,
      'USD_GHS': 5.8,
      'EUR_USD': 1.18,
      'GBP_USD': 1.37,
      'AUD_USD': 0.74,
      'CAD_USD': 0.80
    };

    if (fromCurrency === toCurrency) return amount;
    
    const rateKey = `${fromCurrency}_${toCurrency}`;
    const rate = exchangeRates[rateKey] || 1;
    
    return Math.round(amount * rate * 100) / 100;
  }

  // Create subscription
  async createSubscription(
    paymentData: PaymentData,
    billingInfo: BillingInfo
  ): Promise<PaymentResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const subscriptionId = `SUB_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      
      return {
        success: true,
        transaction_id: subscriptionId
      };
    } catch (error) {
      return {
        success: false,
        error_message: 'Failed to create subscription'
      };
    }
  }

  // Process one-time donation
  async processDonation(
    amount: number,
    currency: string,
    project: string,
    paymentMethod: PaymentMethod,
    billingInfo: BillingInfo
  ): Promise<PaymentResponse> {
    const paymentData: PaymentData = {
      amount,
      currency,
      tier_id: 'donation',
      tier_name: `Donation to ${project}`,
      billing_period: 'monthly',
      user_type: 'individual'
    };

    return this.processPayment(paymentMethod, paymentData, billingInfo);
  }
}

export const paymentService = new PaymentService();
