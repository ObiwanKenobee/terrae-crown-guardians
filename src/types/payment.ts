export interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
  region: 'africa' | 'europe' | 'america' | 'australia' | 'global';
  supported_currencies: string[];
  processor: string;
}

export interface PaymentData {
  amount: number;
  currency: string;
  tier_id: string;
  tier_name: string;
  billing_period: 'monthly' | 'yearly';
  user_type: 'individual' | 'community' | 'corporate' | 'government';
}

export interface BillingInfo {
  full_name: string;
  email: string;
  phone?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  organization?: string;
  tax_id?: string;
}

export interface PaymentResponse {
  success: boolean;
  transaction_id?: string;
  error_message?: string;
  redirect_url?: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  // Global/International
  {
    id: 'stripe',
    name: 'Credit/Debit Card',
    logo: '/api/placeholder/40/40',
    region: 'global',
    supported_currencies: ['USD', 'EUR', 'GBP', 'AUD', 'CAD'],
    processor: 'stripe'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    logo: '/api/placeholder/40/40',
    region: 'global',
    supported_currencies: ['USD', 'EUR', 'GBP', 'AUD', 'CAD'],
    processor: 'paypal'
  },
  
  // African Payment Systems
  {
    id: 'mpesa',
    name: 'M-Pesa',
    logo: '/api/placeholder/40/40',
    region: 'africa',
    supported_currencies: ['KES', 'TZS', 'UGX'],
    processor: 'safaricom'
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    logo: '/api/placeholder/40/40',
    region: 'africa',
    supported_currencies: ['NGN', 'GHS', 'ZAR', 'KES', 'USD'],
    processor: 'flutterwave'
  },
  {
    id: 'paystack',
    name: 'Paystack',
    logo: '/api/placeholder/40/40',
    region: 'africa',
    supported_currencies: ['NGN', 'GHS', 'ZAR', 'USD'],
    processor: 'paystack'
  },
  
  // European Payment Systems
  {
    id: 'sepa',
    name: 'SEPA Direct Debit',
    logo: '/api/placeholder/40/40',
    region: 'europe',
    supported_currencies: ['EUR'],
    processor: 'sepa'
  },
  {
    id: 'ideal',
    name: 'iDEAL',
    logo: '/api/placeholder/40/40',
    region: 'europe',
    supported_currencies: ['EUR'],
    processor: 'mollie'
  },
  {
    id: 'klarna',
    name: 'Klarna',
    logo: '/api/placeholder/40/40',
    region: 'europe',
    supported_currencies: ['EUR', 'SEK', 'NOK', 'DKK'],
    processor: 'klarna'
  },
  
  // American Payment Systems
  {
    id: 'ach',
    name: 'ACH Bank Transfer',
    logo: '/api/placeholder/40/40',
    region: 'america',
    supported_currencies: ['USD'],
    processor: 'plaid'
  },
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    logo: '/api/placeholder/40/40',
    region: 'america',
    supported_currencies: ['USD', 'CAD'],
    processor: 'stripe'
  },
  {
    id: 'google_pay',
    name: 'Google Pay',
    logo: '/api/placeholder/40/40',
    region: 'america',
    supported_currencies: ['USD', 'CAD'],
    processor: 'stripe'
  },
  
  // Australian Payment Systems
  {
    id: 'bpay',
    name: 'BPAY',
    logo: '/api/placeholder/40/40',
    region: 'australia',
    supported_currencies: ['AUD'],
    processor: 'bpay'
  },
  {
    id: 'poli',
    name: 'POLi Payments',
    logo: '/api/placeholder/40/40',
    region: 'australia',
    supported_currencies: ['AUD', 'NZD'],
    processor: 'poli'
  },
  {
    id: 'afterpay',
    name: 'Afterpay',
    logo: '/api/placeholder/40/40',
    region: 'australia',
    supported_currencies: ['AUD'],
    processor: 'afterpay'
  }
];

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
  CAD: 'C$',
  NGN: '₦',
  KES: 'KSh',
  ZAR: 'R',
  GHS: '₵',
  TZS: 'TSh',
  UGX: 'USh',
  SEK: 'kr',
  NOK: 'kr',
  DKK: 'kr',
  NZD: 'NZ$'
};
