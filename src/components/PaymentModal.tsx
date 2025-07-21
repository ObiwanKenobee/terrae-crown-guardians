import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Globe, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  MapPin,
  Building,
  Phone,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PAYMENT_METHODS, CURRENCY_SYMBOLS, PaymentMethod, PaymentData, BillingInfo } from "@/types/payment";
import { paymentService } from "@/services/paymentService";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierData: {
    id: string;
    name: string;
    price: string;
    period: string;
    category: 'individual' | 'community' | 'corporate' | 'government';
  };
  onPaymentSuccess: (transactionId: string) => void;
}

const PaymentModal = ({ isOpen, onClose, tierData, onPaymentSuccess }: PaymentModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [userRegion, setUserRegion] = useState<string>('global');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{ success: boolean; message: string; transactionId?: string } | null>(null);
  
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    full_name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: ''
    },
    organization: '',
    tax_id: ''
  });

  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      detectUserRegion();
      setCurrentStep(1);
      setPaymentResult(null);
    }
  }, [isOpen]);

  const detectUserRegion = async () => {
    try {
      const location = await paymentService.getUserLocation();
      const regionMap: Record<string, string> = {
        'AF': 'africa',
        'EU': 'europe', 
        'NA': 'america',
        'SA': 'america',
        'OC': 'australia',
        'AS': 'global'
      };
      setUserRegion(regionMap[location] || 'global');
    } catch {
      setUserRegion('global');
    }
  };

  const getAvailablePaymentMethods = (): PaymentMethod[] => {
    return PAYMENT_METHODS.filter(method => 
      method.region === userRegion || method.region === 'global'
    );
  };

  const getAvailableCurrencies = (): string[] => {
    if (!selectedPaymentMethod) return ['USD'];
    return selectedPaymentMethod.supported_currencies;
  };

  const calculateAmount = (): number => {
    const baseAmount = parseFloat(tierData.price.replace(/[^0-9.]/g, '')) || 0;
    if (tierData.price.includes('Free') || tierData.price === '$0') return 0;
    
    // Apply yearly discount
    const amount = billingPeriod === 'yearly' ? baseAmount * 12 * 0.8 : baseAmount;
    
    // Convert currency if needed
    return paymentService.convertCurrency(amount, 'USD', selectedCurrency);
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    if (!method.supported_currencies.includes(selectedCurrency)) {
      setSelectedCurrency(method.supported_currencies[0]);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedPaymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const processPayment = async () => {
    if (!selectedPaymentMethod) return;

    setIsProcessing(true);
    
    try {
      const paymentData: PaymentData = {
        amount: calculateAmount(),
        currency: selectedCurrency,
        tier_id: tierData.id,
        tier_name: tierData.name,
        billing_period: billingPeriod,
        user_type: tierData.category
      };

      const result = await paymentService.processPayment(
        selectedPaymentMethod,
        paymentData,
        billingInfo
      );

      if (result.success) {
        setPaymentResult({
          success: true,
          message: "Payment processed successfully!",
          transactionId: result.transaction_id
        });
        setCurrentStep(4);
        onPaymentSuccess(result.transaction_id || '');
        
        toast({
          title: "Payment Successful",
          description: `Welcome to ${tierData.name}! Your subscription is now active.`
        });
      } else {
        setPaymentResult({
          success: false,
          message: result.error_message || "Payment failed. Please try again."
        });
        
        toast({
          title: "Payment Failed",
          description: result.error_message,
          variant: "destructive"
        });
      }
    } catch (error) {
      setPaymentResult({
        success: false,
        message: "An unexpected error occurred. Please try again."
      });
      
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getRegionDisplayName = (region: string): string => {
    const names: Record<string, string> = {
      'africa': 'Africa',
      'europe': 'Europe',
      'america': 'Americas',
      'australia': 'Australia & Oceania',
      'global': 'Global'
    };
    return names[region] || 'Global';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-6 w-6 text-primary" />
            Subscribe to {tierData.name}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step === 4 && paymentResult?.success ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Payment Method Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Choose Your Payment Method</h3>
              <p className="text-muted-foreground">
                Select from {getRegionDisplayName(userRegion)} payment options
              </p>
            </div>

            <Tabs value={userRegion} onValueChange={setUserRegion}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="africa">Africa</TabsTrigger>
                <TabsTrigger value="europe">Europe</TabsTrigger>
                <TabsTrigger value="america">Americas</TabsTrigger>
                <TabsTrigger value="australia">Oceania</TabsTrigger>
              </TabsList>

              <div className="mt-4 grid gap-3">
                {getAvailablePaymentMethods().map((method) => (
                  <Card 
                    key={method.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedPaymentMethod?.id === method.id 
                        ? 'border-primary bg-primary/5' 
                        : ''
                    }`}
                    onClick={() => handlePaymentMethodSelect(method)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {method.supported_currencies.slice(0, 3).join(', ')}
                              {method.supported_currencies.length > 3 && '...'}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getRegionDisplayName(method.region)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Billing Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Billing Information</h3>
              <p className="text-muted-foreground">
                Enter your billing details for {selectedPaymentMethod?.name}
              </p>
            </div>

            <div className="grid gap-4">
              {/* Currency and Billing Period */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableCurrencies().map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {CURRENCY_SYMBOLS[currency]} {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="billing_period">Billing Period</Label>
                  <Select value={billingPeriod} onValueChange={(value: 'monthly' | 'yearly') => setBillingPeriod(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly (20% off)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={billingInfo.full_name}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={billingInfo.phone}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Organization Details (for non-individual tiers) */}
              {tierData.category !== 'individual' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organization">Organization Name *</Label>
                    <Input
                      id="organization"
                      value={billingInfo.organization}
                      onChange={(e) => setBillingInfo(prev => ({ ...prev, organization: e.target.value }))}
                      placeholder="AEGIS Conservation Inc."
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="tax_id">Tax ID / VAT Number</Label>
                    <Input
                      id="tax_id"
                      value={billingInfo.tax_id}
                      onChange={(e) => setBillingInfo(prev => ({ ...prev, tax_id: e.target.value }))}
                      placeholder="123-45-6789"
                    />
                  </div>
                </div>
              )}

              {/* Address */}
              <div className="space-y-4">
                <Separator />
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Billing Address
                </h4>
                
                <div>
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    value={billingInfo.address.street}
                    onChange={(e) => setBillingInfo(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, street: e.target.value }
                    }))}
                    placeholder="123 Conservation Way"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={billingInfo.address.city}
                      onChange={(e) => setBillingInfo(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, city: e.target.value }
                      }))}
                      placeholder="Nairobi"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      value={billingInfo.address.state}
                      onChange={(e) => setBillingInfo(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, state: e.target.value }
                      }))}
                      placeholder="Nairobi County"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postal_code">Postal Code *</Label>
                    <Input
                      id="postal_code"
                      value={billingInfo.address.postal_code}
                      onChange={(e) => setBillingInfo(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, postal_code: e.target.value }
                      }))}
                      placeholder="00100"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={billingInfo.address.country}
                      onChange={(e) => setBillingInfo(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, country: e.target.value }
                      }))}
                      placeholder="Kenya"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Confirm Your Payment</h3>
              <p className="text-muted-foreground">
                Review your subscription details before processing
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Plan</span>
                  <span className="font-medium">{tierData.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Billing Period</span>
                  <span className="font-medium capitalize">{billingPeriod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Payment Method</span>
                  <span className="font-medium">{selectedPaymentMethod?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Currency</span>
                  <span className="font-medium">{selectedCurrency}</span>
                </div>
                {billingPeriod === 'yearly' && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Yearly Discount (20%)</span>
                    <span className="font-medium">-{CURRENCY_SYMBOLS[selectedCurrency]}{(calculateAmount() * 0.25).toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>{CURRENCY_SYMBOLS[selectedCurrency]}{calculateAmount().toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{billingInfo.email}</span>
                </div>
                {billingInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{billingInfo.phone}</span>
                  </div>
                )}
                {billingInfo.organization && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>{billingInfo.organization}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {billingInfo.address.street}, {billingInfo.address.city}, {billingInfo.address.country}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Payment Result */}
        {currentStep === 4 && paymentResult && (
          <div className="text-center space-y-6">
            {paymentResult.success ? (
              <>
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h3 className="text-xl font-semibold text-green-700">Payment Successful!</h3>
                <p className="text-muted-foreground">
                  Your subscription to {tierData.name} is now active.
                </p>
                {paymentResult.transactionId && (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium">Transaction ID:</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {paymentResult.transactionId}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
                <h3 className="text-xl font-semibold text-red-700">Payment Failed</h3>
                <p className="text-muted-foreground">
                  {paymentResult.message}
                </p>
              </>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={currentStep === 4 ? onClose : handlePreviousStep}
            disabled={currentStep === 1 || isProcessing}
          >
            {currentStep === 4 ? 'Close' : 'Previous'}
          </Button>
          
          {currentStep < 3 && (
            <Button
              onClick={handleNextStep}
              disabled={isProcessing}
              className="bg-gradient-royal text-primary-foreground hover:opacity-90"
            >
              Next Step
            </Button>
          )}
          
          {currentStep === 3 && (
            <Button
              onClick={processPayment}
              disabled={isProcessing}
              className="bg-gradient-royal text-primary-foreground hover:opacity-90"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Complete Payment
                </>
              )}
            </Button>
          )}
          
          {currentStep === 4 && !paymentResult?.success && (
            <Button
              onClick={() => setCurrentStep(1)}
              className="bg-gradient-royal text-primary-foreground hover:opacity-90"
            >
              Try Again
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;