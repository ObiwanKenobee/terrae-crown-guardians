import { PaymentData, BillingInfo, PaymentResponse, PaymentMethod } from '@/types/payment';

class PaymentService {
  private baseURL = '/api/payment';

  // Simulate payment processing for different regions
  async processPayment(
    paymentMethod: PaymentMethod,
    paymentData: PaymentData,
    billingInfo: BillingInfo
  ): Promise<PaymentResponse> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const payload = {
        payment_method: paymentMethod,
        payment_data: paymentData,
        billing_info: billingInfo,
        timestamp: new Date().toISOString()
      };

      console.log('Processing payment:', payload);

      // Simulate different payment processors
      return this.simulatePaymentProcessor(paymentMethod, paymentData);
    } catch (error) {
      console.error('Payment processing error:', error);
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
    // Simulate 95% success rate
    const isSuccess = Math.random() > 0.05;

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
          redirect_url: '/payment/mpesa-confirmation'
        };
      
      case 'flutterwave':
      case 'paystack':
        return {
          success: true,
          transaction_id: transactionId,
          redirect_url: '/payment/bank-redirect'
        };
      
      case 'sepa':
        return {
          success: true,
          transaction_id: transactionId,
          redirect_url: '/payment/sepa-mandate'
        };
      
      case 'bpay':
        return {
          success: true,
          transaction_id: transactionId,
          redirect_url: '/payment/bpay-reference'
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
