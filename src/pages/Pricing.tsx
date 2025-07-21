import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Check, 
  Crown, 
  Users, 
  Building2, 
  Globe, 
  Heart, 
  Leaf, 
  Shield, 
  Star,
  Gift,
  ArrowRight,
  Zap,
  CreditCard
} from "lucide-react";
import Navigation from "@/components/Navigation";
import PaymentModal from "@/components/PaymentModal";
import DonationModal from "@/components/DonationModal";
import { useToast } from "@/hooks/use-toast";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  icon: React.ReactNode;
  category: 'individual' | 'community' | 'corporate' | 'government';
}

const pricingTiers: PricingTier[] = [
  // Individual Stewards
  {
    id: 'free',
    name: 'Free Access',
    price: '$0',
    period: 'forever',
    description: 'Basic access to explore Crown Bioregions and learn about regenerative efforts',
    features: [
      'Crown Bioregions Map access',
      'Service Index browsing',
      'Basic educational content',
      'Community forums',
      'Micro-donation opportunities'
    ],
    icon: <Heart className="h-6 w-6" />,
    category: 'individual'
  },
  {
    id: 'steward-basic',
    name: 'Steward Basic',
    price: '$10',
    period: 'month',
    description: 'Perfect for eco-enthusiasts and youth activists starting their regenerative journey',
    features: [
      'All Free features',
      'Personal dashboard',
      'Bioregion updates',
      'Basic impact tracking',
      'Digital stewardship badge',
      'Monthly webinars'
    ],
    icon: <Leaf className="h-6 w-6" />,
    category: 'individual'
  },
  {
    id: 'steward-pro',
    name: 'Steward Pro',
    price: '$50',
    period: 'month',
    description: 'Advanced tools for dedicated environmental advocates and regenerative practitioners',
    features: [
      'All Steward Basic features',
      'AI-driven regeneration insights',
      'Personalized alerts',
      'Royal Legacy Ledger access',
      'Project collaboration tools',
      'Priority support'
    ],
    icon: <Star className="h-6 w-6" />,
    category: 'individual',
    highlighted: true,
    badge: 'Most Popular'
  },
  {
    id: 'sovereign-steward',
    name: 'Sovereign Steward',
    price: '$100',
    period: 'month',
    description: 'Complete access for leaders driving regenerative transformation',
    features: [
      'All Steward Pro features',
      'Interactive map full access',
      'Project co-creation opportunities',
      'Exclusive expert events',
      'Leadership recognition',
      'Custom impact reports'
    ],
    icon: <Crown className="h-6 w-6" />,
    category: 'individual'
  },
  // Community Tiers
  {
    id: 'community-basic',
    name: 'Community Stewardship',
    price: '$500',
    period: 'year',
    description: 'Essential tools for indigenous communities and local governance councils',
    features: [
      'Free basic tools for indigenous groups',
      'Bioregion mapping tools',
      'Royal Legacy Ledger access',
      'Basic governance training',
      'Community collaboration features',
      'Cultural autonomy protection'
    ],
    icon: <Users className="h-6 w-6" />,
    category: 'community'
  },
  {
    id: 'community-advanced',
    name: 'Advanced Community',
    price: '$1,000',
    period: 'year',
    description: 'Comprehensive governance and regeneration tools for community organizations',
    features: [
      'All Community Stewardship features',
      'AI ethics agents assistance',
      'Data analytics access',
      'Custom reports generation',
      'Advanced technical tools',
      'Dedicated support system'
    ],
    icon: <Shield className="h-6 w-6" />,
    category: 'community',
    highlighted: true,
    badge: 'Best Value'
  },
  // Corporate Tiers
  {
    id: 'corporate-basic',
    name: 'Corporate Sponsor',
    price: '$5,000',
    period: 'year',
    description: 'Basic corporate engagement with environmental stewardship recognition',
    features: [
      'Logo display on platform',
      'Corporate steward recognition',
      'Basic sustainability reporting',
      'Brand alignment opportunities',
      'Access to impact metrics',
      'Annual impact certificate'
    ],
    icon: <Building2 className="h-6 w-6" />,
    category: 'corporate'
  },
  {
    id: 'corporate-stewardship',
    name: 'Corporate Stewardship',
    price: '$50,000',
    period: 'year',
    description: 'Deep engagement with co-branded regeneration projects and partnerships',
    features: [
      'All Corporate Sponsor features',
      'Co-branded regeneration projects',
      'Sovereign Steward Node integration',
      'Wildlife corridor restoration',
      'Enhanced brand visibility',
      'Executive advisory access'
    ],
    icon: <Zap className="h-6 w-6" />,
    category: 'corporate',
    highlighted: true,
    badge: 'Partnership'
  },
  {
    id: 'corporate-global',
    name: 'Global Partnership',
    price: '$200,000',
    period: 'year',
    description: 'Global-scale recognition with comprehensive regenerative project integration',
    features: [
      'All Corporate Stewardship features',
      'Global media recognition',
      'Educational content partnership',
      'Corporate governance tools',
      'Real-time regeneration analytics',
      'Event sponsorship opportunities'
    ],
    icon: <Globe className="h-6 w-6" />,
    category: 'corporate'
  },
  // Government Tiers
  {
    id: 'government-pilot',
    name: 'Government Pilot',
    price: 'Free',
    period: 'pilot phase',
    description: 'Free access for post-colonial and high-priority regions to test governance tools',
    features: [
      'Pilot project access',
      'Basic governance tools',
      'AI-based regenerative models',
      'Community collaboration',
      'Training materials',
      'Technical support'
    ],
    icon: <Gift className="h-6 w-6" />,
    category: 'government'
  },
  {
    id: 'government-national',
    name: 'National Implementation',
    price: '$500,000',
    period: 'year',
    description: 'Full-scale national implementation with advanced policy and ecological tools',
    features: [
      'All Pilot features',
      'Advanced policy insights',
      'Government collaboration tools',
      'Ecological modeling',
      'Cross-border coordination',
      'Official training programs'
    ],
    icon: <Shield className="h-6 w-6" />,
    category: 'government'
  },
  {
    id: 'government-alliance',
    name: 'Global Ecological Alliance',
    price: '$1M+',
    period: 'year',
    description: 'Join the global alliance for ecological pacts and cross-border biodiversity projects',
    features: [
      'All National Implementation features',
      'Global alliance membership',
      'Cross-border biodiversity projects',
      'Shared AI-regeneration goals',
      'International collaboration',
      'Strategic decision-making tools'
    ],
    icon: <Globe className="h-6 w-6" />,
    category: 'government',
    highlighted: true,
    badge: 'Alliance'
  }
];

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'community' | 'corporate' | 'government'>('individual');
  const [isAnnual, setIsAnnual] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);

  const { toast } = useToast();

  const filteredTiers = pricingTiers.filter(tier => tier.category === activeTab);

  const categoryDescriptions = {
    individual: {
      title: "Individual Stewards",
      description: "Perfect for youth activists, eco-enthusiasts, and concerned citizens ready to make a difference"
    },
    community: {
      title: "Communities & NGOs", 
      description: "Empowering indigenous communities, local governance councils, and community-based organizations"
    },
    corporate: {
      title: "Corporate Partners",
      description: "Align your brand with environmental protection and strengthen your sustainability profile"
    },
    government: {
      title: "Governments & Agencies",
      description: "Strategic tools for nations and international bodies to meet environmental commitments"
    }
  };

  const handleSubscribe = (tier: PricingTier) => {
    if (tier.price === '$0' || tier.price === 'Free') {
      toast({
        title: "Free Access Granted!",
        description: `Welcome to ${tier.name}. You can now access all free features.`
      });
      return;
    }

    setSelectedTier(tier);
    setPaymentModalOpen(true);
  };

  const handleDonate = () => {
    setDonationModalOpen(true);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    setPaymentModalOpen(false);
    toast({
      title: "Subscription Activated!",
      description: `Your ${selectedTier?.name} subscription is now active. Transaction ID: ${transactionId.substring(0, 10)}...`
    });
  };

  const handleDonationSuccess = (transactionId: string, amount: number, project: string) => {
    setDonationModalOpen(false);
    toast({
      title: "Donation Successful!",
      description: `Thank you for your $${amount} donation to ${project}!`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Regenerative Pricing for Earth's Guardians
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Choose your path as a Steward. Our intelligent pricing strategy ensures accessibility 
              while funding the regeneration of Earth's crown bioregions.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                onClick={handleDonate}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
              >
                <Heart className="mr-2 h-5 w-5" />
                Make a Donation
              </Button>
              <Button size="lg" variant="outline">
                <CreditCard className="mr-2 h-5 w-5" />
                Compare Payment Methods
              </Button>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className={`text-sm ${!isAnnual ? 'font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch 
              checked={isAnnual} 
              onCheckedChange={setIsAnnual}
            />
            <span className={`text-sm ${isAnnual ? 'font-medium' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-green-100 text-green-800 border-green-200 ml-2">
                Save 20%
              </Badge>
            )}
          </div>

          {/* Category Tabs */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 max-w-2xl mx-auto">
              <TabsTrigger value="individual" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Individual
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Community
              </TabsTrigger>
              <TabsTrigger value="corporate" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Corporate
              </TabsTrigger>
              <TabsTrigger value="government" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Government
              </TabsTrigger>
            </TabsList>

            {/* Category Description */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">
                {categoryDescriptions[activeTab].title}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {categoryDescriptions[activeTab].description}
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredTiers.map((tier) => (
                <Card 
                  key={tier.id} 
                  className={`relative transition-all hover:shadow-xl ${
                    tier.highlighted 
                      ? 'border-primary shadow-lg scale-105 bg-gradient-to-br from-primary/5 to-primary/10' 
                      : ''
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-royal text-primary-foreground px-3 py-1">
                        {tier.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      {tier.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{tier.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-primary">
                        {tier.price}
                      </span>
                      {tier.period !== 'forever' && tier.period !== 'pilot phase' && (
                        <span className="text-muted-foreground">/{tier.period}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {tier.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${
                        tier.highlighted 
                          ? 'bg-gradient-royal text-primary-foreground hover:opacity-90' 
                          : ''
                      }`}
                      variant={tier.highlighted ? 'default' : 'outline'}
                      onClick={() => handleSubscribe(tier)}
                    >
                      {tier.price === 'Free' || tier.price === '$0' 
                        ? 'Get Started Free' 
                        : 'Choose Plan'
                      }
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs>

          {/* Payment Methods Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Global Payment Methods</h3>
              <p className="text-muted-foreground">
                We support payment systems from Africa, Europe, Americas, and Australia
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">🌍 Africa</h4>
                <p className="text-sm text-muted-foreground">M-Pesa, Flutterwave, Paystack</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🇪🇺 Europe</h4>
                <p className="text-sm text-muted-foreground">SEPA, iDEAL, Klarna</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🌎 Americas</h4>
                <p className="text-sm text-muted-foreground">ACH, Apple Pay, Google Pay</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🇦🇺 Australia</h4>
                <p className="text-sm text-muted-foreground">BPAY, POLi, Afterpay</p>
              </div>
            </div>
          </div>

          {/* Incentives Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Special Incentives & Benefits</h3>
              <p className="text-muted-foreground">
                We believe in rewarding commitment to regenerative action
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Gift className="mx-auto h-8 w-8 text-primary mb-4" />
                  <h4 className="font-semibold mb-2">Volume Discounts</h4>
                  <p className="text-sm text-muted-foreground">
                    Support multiple bioregions and unlock progressive savings up to 30%
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="mx-auto h-8 w-8 text-primary mb-4" />
                  <h4 className="font-semibold mb-2">Matching Funds</h4>
                  <p className="text-sm text-muted-foreground">
                    We match donations for youth stewards and indigenous groups to amplify impact
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="mx-auto h-8 w-8 text-primary mb-4" />
                  <h4 className="font-semibold mb-2">Impact Bonuses</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn credits and discounts by tracking your regeneration impact over time
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Become a Guardian of Earth's Crown Bioregions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of stewards worldwide in the regeneration movement. 
              Every contribution, no matter the size, helps protect our planet's most sacred ecological zones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleDonate}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
              >
                <Heart className="mr-2 h-5 w-5" />
                Make a Donation
              </Button>
              <Button size="lg" variant="outline">
                Learn More About AEGIS
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedTier && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          tierData={selectedTier}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Donation Modal */}
      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        onDonationSuccess={handleDonationSuccess}
      />
    </div>
  );
};

export default Pricing;
