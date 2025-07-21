import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  TreePine, 
  Droplets, 
  Fish, 
  Shield, 
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PAYMENT_METHODS, CURRENCY_SYMBOLS, PaymentMethod, BillingInfo } from "@/types/payment";
import { paymentService } from "@/services/paymentService";

interface DonationProject {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  impact_per_dollar: string;
  target_amount: number;
  current_amount: number;
  region: string;
}

const donationProjects: DonationProject[] = [
  {
    id: 'amazon-reforestation',
    name: 'Amazon Sacred Headwaters',
    description: 'Restore critical rainforest corridors and protect indigenous lands',
    icon: <TreePine className="h-6 w-6" />,
    impact_per_dollar: '0.5 trees planted',
    target_amount: 50000,
    current_amount: 32500,
    region: 'South America'
  },
  {
    id: 'maasai-water',
    name: 'Maasai Water Systems',
    description: 'Build sustainable water infrastructure for communities and wildlife',
    icon: <Droplets className="h-6 w-6" />,
    impact_per_dollar: '2 liters of clean water',
    target_amount: 25000,
    current_amount: 18750,
    region: 'East Africa'
  },
  {
    id: 'coral-restoration',
    name: 'Great Barrier Reef Restoration',
    description: 'Protect and regenerate coral ecosystems through innovative techniques',
    icon: <Fish className="h-6 w-6" />,
    impact_per_dollar: '0.1 m² coral restored',
    target_amount: 75000,
    current_amount: 45000,
    region: 'Australia'
  },
  {
    id: 'himalayan-protection',
    name: 'Himalayan Biodiversity',
    description: 'Safeguard high-altitude ecosystems and endangered species',
    icon: <Shield className="h-6 w-6" />,
    impact_per_dollar: '5 m² habitat protected',
    target_amount: 40000,
    current_amount: 28000,
    region: 'Asia'
  }
];

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonationSuccess: (transactionId: string, amount: number, project: string) => void;
}

const DonationModal = ({ isOpen, onClose, onDonationSuccess }: DonationModalProps) => {
  const [selectedProject, setSelectedProject] = useState<DonationProject>(donationProjects[0]);
  const [donationAmount, setDonationAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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
    }
  });

  const { toast } = useToast();

  const presetAmounts = [5, 10, 25, 50, 100, 250];

  const getProjectProgress = (project: DonationProject): number => {
    return (project.current_amount / project.target_amount) * 100;
  };

  const getImpactDescription = (): string => {
    const amount = customAmount ? parseFloat(customAmount) : donationAmount;
    const impact = selectedProject.impact_per_dollar;
    const multiplier = parseFloat(impact.split(' ')[0]);
    const unit = impact.split(' ').slice(1).join(' ');
    const totalImpact = amount * multiplier;
    
    return `${totalImpact.toFixed(1)} ${unit}`;
  };

  const getAvailablePaymentMethods = (): PaymentMethod[] => {
    return PAYMENT_METHODS.filter(method => 
      method.region === 'global' || method.supported_currencies.includes(selectedCurrency)
    );
  };

  const processDonation = async () => {
    if (!selectedPaymentMethod) return;

    setIsProcessing(true);
    
    try {
      const amount = customAmount ? parseFloat(customAmount) : donationAmount;
      
      const result = await paymentService.processDonation(
        amount,
        selectedCurrency,
        selectedProject.name,
        selectedPaymentMethod,
        billingInfo
      );

      if (result.success) {
        setPaymentResult({
          success: true,
          message: "Donation processed successfully!",
          transactionId: result.transaction_id
        });
        setCurrentStep(3);
        onDonationSuccess(result.transaction_id || '', amount, selectedProject.name);
        
        toast({
          title: "Donation Successful",
          description: `Thank you for supporting ${selectedProject.name}!`
        });
      } else {
        setPaymentResult({
          success: false,
          message: result.error_message || "Donation failed. Please try again."
        });
        
        toast({
          title: "Donation Failed",
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-6 w-6 text-red-500" />
            Make a Regenerative Donation
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Project Selection and Amount */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Choose a Project to Support</h3>
              <p className="text-muted-foreground">
                Your donation directly funds regenerative conservation efforts
              </p>
            </div>

            {/* Project Selection */}
            <div className="grid gap-4">
              {donationProjects.map((project) => (
                <Card 
                  key={project.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedProject.id === project.id 
                      ? 'border-primary bg-primary/5' 
                      : ''
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {project.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {project.region}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{CURRENCY_SYMBOLS[selectedCurrency]}{project.current_amount.toLocaleString()} / {CURRENCY_SYMBOLS[selectedCurrency]}{project.target_amount.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${getProjectProgress(project)}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Impact: {project.impact_per_dollar} per dollar
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Donation Amount */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Choose Donation Amount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Currency Selection */}
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'KES', 'NGN', 'ZAR'].map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {CURRENCY_SYMBOLS[currency]} {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Preset Amounts */}
                <div>
                  <Label>Quick Select</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {presetAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={donationAmount === amount && !customAmount ? "default" : "outline"}
                        onClick={() => {
                          setDonationAmount(amount);
                          setCustomAmount('');
                        }}
                        className="text-sm"
                      >
                        {CURRENCY_SYMBOLS[selectedCurrency]}{amount}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <Label htmlFor="custom_amount">Custom Amount</Label>
                  <Input
                    id="custom_amount"
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setDonationAmount(0);
                    }}
                    placeholder={`Enter amount in ${selectedCurrency}`}
                    min="1"
                  />
                </div>

                {/* Impact Preview */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Your Impact</h4>
                  <p className="text-green-700">
                    {CURRENCY_SYMBOLS[selectedCurrency]}{customAmount || donationAmount} will provide{' '}
                    <span className="font-semibold">{getImpactDescription()}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Payment Method and Billing */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Complete Your Donation</h3>
              <p className="text-muted-foreground">
                Enter your details and select a payment method
              </p>
            </div>

            {/* Donation Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {selectedProject.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{selectedProject.name}</div>
                      <div className="text-sm text-muted-foreground">{getImpactDescription()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {CURRENCY_SYMBOLS[selectedCurrency]}{customAmount || donationAmount}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Information */}
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="donor_name">Full Name *</Label>
                  <Input
                    id="donor_name"
                    value={billingInfo.full_name}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="donor_email">Email Address *</Label>
                  <Input
                    id="donor_email"
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <Label>Payment Method</Label>
              <div className="grid gap-2 mt-2">
                {getAvailablePaymentMethods().slice(0, 4).map((method) => (
                  <Card 
                    key={method.id}
                    className={`cursor-pointer transition-all hover:shadow-sm ${
                      selectedPaymentMethod?.id === method.id 
                        ? 'border-primary bg-primary/5' 
                        : ''
                    }`}
                    onClick={() => setSelectedPaymentMethod(method)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                          <Heart className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{method.name}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {method.region}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Success/Failure */}
        {currentStep === 3 && paymentResult && (
          <div className="text-center space-y-6">
            {paymentResult.success ? (
              <>
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h3 className="text-xl font-semibold text-green-700">Donation Successful!</h3>
                <p className="text-muted-foreground">
                  Thank you for supporting {selectedProject.name}! Your contribution will make a real difference.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Your Impact</h4>
                  <p className="text-green-700">{getImpactDescription()}</p>
                </div>
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
                <h3 className="text-xl font-semibold text-red-700">Donation Failed</h3>
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
            onClick={currentStep === 3 ? onClose : () => setCurrentStep(prev => Math.max(prev - 1, 1))}
            disabled={currentStep === 1 || isProcessing}
          >
            {currentStep === 3 ? 'Close' : 'Previous'}
          </Button>
          
          {currentStep === 1 && (
            <Button
              onClick={() => setCurrentStep(2)}
              disabled={!selectedProject || (!donationAmount && !customAmount)}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
            >
              Continue
            </Button>
          )}
          
          {currentStep === 2 && (
            <Button
              onClick={processDonation}
              disabled={isProcessing || !billingInfo.full_name || !billingInfo.email || !selectedPaymentMethod}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-4 w-4" />
                  Complete Donation
                </>
              )}
            </Button>
          )}
          
          {currentStep === 3 && !paymentResult?.success && (
            <Button
              onClick={() => setCurrentStep(1)}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
            >
              Try Again
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
