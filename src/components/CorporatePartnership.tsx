import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { corporateService } from '../services/corporateService';
import type { CorporatePartner, CorporatePackage, PartnershipProposal, CorporateEvent } from '../types/corporate';
import { Building2, TrendingUp, Users, Leaf, Calendar, MapPin, Clock, Award, DollarSign, Target, Globe } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export function CorporatePartnership() {
  const [partners, setPartners] = useState<CorporatePartner[]>([]);
  const [packages, setPackages] = useState<CorporatePackage[]>([]);
  const [events, setEvents] = useState<CorporateEvent[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [proposalOpen, setProposalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [partnersData, packagesData, eventsData, statsData] = await Promise.all([
          corporateService.getPartners(),
          corporateService.getPackages(),
          corporateService.getUpcomingEvents(),
          corporateService.getPartnershipStats()
        ]);
        setPartners(partnersData);
        setPackages(packagesData);
        setEvents(eventsData);
        setStats(statsData);
      } catch (error) {
        toast({
          title: "Error loading data",
          description: "Failed to load corporate partnership data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const [proposalForm, setProposalForm] = useState({
    company_name: '',
    contact_email: '',
    company_size: '',
    industry: '',
    sustainability_goals: '',
    proposed_investment: '',
    preferred_partnership_type: '',
    timeline: '',
    additional_requirements: ''
  });

  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const proposal: Omit<PartnershipProposal, 'id' | 'status' | 'submitted_date'> = {
        ...proposalForm,
        proposed_investment: parseFloat(proposalForm.proposed_investment),
        sustainability_goals: proposalForm.sustainability_goals.split(',').map(g => g.trim()),
        company_size: proposalForm.company_size as any
      };

      await corporateService.submitProposal(proposal);
      toast({
        title: "Partnership Proposal Submitted",
        description: "We'll review your proposal and get back to you within 48 hours.",
      });
      setProposalOpen(false);
      setProposalForm({
        company_name: '',
        contact_email: '',
        company_size: '',
        industry: '',
        sustainability_goals: '',
        proposed_investment: '',
        preferred_partnership_type: '',
        timeline: '',
        additional_requirements: ''
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Failed to submit proposal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'diamond': return 'bg-purple-100 text-purple-800';
      case 'platinum': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-blue-100 text-blue-800';
      case 'bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Corporate Partnership Hub</h1>
          <p className="text-lg text-gray-600 mb-6">
            Partner with AEGIS: Regina Terrae to drive meaningful environmental impact while strengthening your brand and engaging stakeholders.
          </p>
          
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Building2 className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Partners</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total_partners}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Investment</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.total_investment)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Leaf className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">CO₂ Offset (tons)</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total_carbon_offset.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Target className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Initiatives</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.active_initiatives}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="join">Join Us</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2" />
                    Partnership Benefits
                  </CardTitle>
                  <CardDescription>Why companies choose AEGIS: Regina Terrae</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Brand Enhancement</h4>
                      <p className="text-sm text-gray-600">Increase brand value through authentic conservation partnerships</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Employee Engagement</h4>
                      <p className="text-sm text-gray-600">Boost team morale with meaningful environmental initiatives</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Global Impact</h4>
                      <p className="text-sm text-gray-600">Contribute to UN SDGs and measurable conservation outcomes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Target className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Risk Mitigation</h4>
                      <p className="text-sm text-gray-600">Reduce climate and biodiversity-related business risks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Partnership Types</CardTitle>
                  <CardDescription>Flexible models to suit your company's goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-700">Strategic Alliance</h4>
                    <p className="text-sm text-gray-600">Long-term partnerships with co-branded initiatives</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-700">Project Sponsorship</h4>
                    <p className="text-sm text-gray-600">Fund specific conservation projects with naming rights</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-700">Technology Partnership</h4>
                    <p className="text-sm text-gray-600">Contribute technology solutions for conservation challenges</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-orange-700">Supply Chain Integration</h4>
                    <p className="text-sm text-gray-600">Sustainable sourcing and biodiversity-positive practices</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Current Partners</h2>
              <Badge variant="outline">{partners.length} Active Partners</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partners.map((partner) => (
                <Card key={partner.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={partner.logo_url} alt={partner.name} />
                          <AvatarFallback>{partner.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{partner.name}</CardTitle>
                          <CardDescription>{partner.type.replace('_', ' ')}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getTierColor(partner.partnership_tier)}>
                        {partner.partnership_tier}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Total Investment</p>
                        <p className="font-semibold">{formatCurrency(partner.total_investment)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Carbon Offset</p>
                        <p className="font-semibold">{partner.impact_metrics.total_carbon_offset.toLocaleString()} tons</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Communities</p>
                        <p className="font-semibold">{partner.impact_metrics.communities_supported}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Jobs Created</p>
                        <p className="font-semibold">{partner.impact_metrics.jobs_created}</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Sustainability Score</p>
                      <Progress value={partner.sustainability_score * 10} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">{partner.sustainability_score}/10</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Active Projects</p>
                      <div className="flex flex-wrap gap-1">
                        {partner.biodiversity_projects.slice(0, 2).map((project, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {project}
                          </Badge>
                        ))}
                        {partner.biodiversity_projects.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{partner.biodiversity_projects.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Partnership Packages</h2>
              <p className="text-gray-600 mb-6">Choose the package that best fits your company's size and sustainability goals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className={`relative ${pkg.tier === 'enterprise' ? 'border-purple-200 shadow-lg' : ''}`}>
                  {pkg.tier === 'enterprise' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-600 text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <CardDescription className="capitalize">{pkg.tier} companies</CardDescription>
                    <div className="text-3xl font-bold text-green-600">
                      {formatCurrency(pkg.price_annual)}
                      <span className="text-sm font-normal text-gray-500">/year</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {pkg.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Max Initiatives</span>
                        <span>{pkg.max_initiatives === -1 ? 'Unlimited' : pkg.max_initiatives}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dedicated Support</span>
                        <span>{pkg.dedicated_support ? '✓' : '✗'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>API Access</span>
                        <span>{pkg.api_access ? '✓' : '✗'}</span>
                      </div>
                    </div>
                    <Button className="w-full" variant={pkg.tier === 'enterprise' ? 'default' : 'outline'}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
              <p className="text-gray-600 mb-6">Join our community events to network with other sustainability leaders and learn about latest conservation innovations.</p>
            </div>
            <div className="space-y-6">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription className="mt-2">{event.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {event.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{event.date.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{event.duration_hours} hours</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm capitalize">{event.location.type}</span>
                      </div>
                    </div>
                    {event.location.address && (
                      <p className="text-sm text-gray-600">{event.location.address}</p>
                    )}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Featured Speakers</h4>
                      <div className="flex flex-wrap gap-2">
                        {event.speakers.map((speaker, index) => (
                          <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={speaker.photo_url} alt={speaker.name} />
                              <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{speaker.name}</p>
                              <p className="text-xs text-gray-500">{speaker.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        {event.max_attendees - Math.floor(Math.random() * 100)} spots remaining
                      </div>
                      <Button>
                        {event.registration_required ? 'Register Now' : 'Join Event'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="join" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Join Our Partnership Network</h2>
                <p className="text-lg text-gray-600">
                  Ready to make a meaningful impact? Submit your partnership proposal and our team will get back to you within 48 hours.
                </p>
              </div>

              <Dialog open={proposalOpen} onOpenChange={setProposalOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full mb-8">
                    Submit Partnership Proposal
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Partnership Proposal</DialogTitle>
                    <DialogDescription>
                      Tell us about your company and sustainability goals. We'll create a custom partnership plan for you.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleProposalSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company_name">Company Name</Label>
                        <Input
                          id="company_name"
                          value={proposalForm.company_name}
                          onChange={(e) => setProposalForm({...proposalForm, company_name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact_email">Contact Email</Label>
                        <Input
                          id="contact_email"
                          type="email"
                          value={proposalForm.contact_email}
                          onChange={(e) => setProposalForm({...proposalForm, contact_email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company_size">Company Size</Label>
                        <Select value={proposalForm.company_size} onValueChange={(value) => setProposalForm({...proposalForm, company_size: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">Startup (1-50 employees)</SelectItem>
                            <SelectItem value="sme">SME (51-500 employees)</SelectItem>
                            <SelectItem value="large_corp">Large Corp (501-10,000 employees)</SelectItem>
                            <SelectItem value="multinational">Multinational (10,000+ employees)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="industry">Industry</Label>
                        <Input
                          id="industry"
                          value={proposalForm.industry}
                          onChange={(e) => setProposalForm({...proposalForm, industry: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="sustainability_goals">Sustainability Goals (comma-separated)</Label>
                      <Textarea
                        id="sustainability_goals"
                        value={proposalForm.sustainability_goals}
                        onChange={(e) => setProposalForm({...proposalForm, sustainability_goals: e.target.value})}
                        placeholder="e.g., Carbon neutrality by 2030, Biodiversity net positive, Zero waste to landfill"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="proposed_investment">Proposed Annual Investment (USD)</Label>
                        <Input
                          id="proposed_investment"
                          type="number"
                          value={proposalForm.proposed_investment}
                          onChange={(e) => setProposalForm({...proposalForm, proposed_investment: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="timeline">Timeline</Label>
                        <Input
                          id="timeline"
                          value={proposalForm.timeline}
                          onChange={(e) => setProposalForm({...proposalForm, timeline: e.target.value})}
                          placeholder="e.g., 12 months, 2-3 years"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="preferred_partnership_type">Preferred Partnership Type</Label>
                      <Input
                        id="preferred_partnership_type"
                        value={proposalForm.preferred_partnership_type}
                        onChange={(e) => setProposalForm({...proposalForm, preferred_partnership_type: e.target.value})}
                        placeholder="e.g., Strategic Alliance, Project Sponsorship, Technology Partnership"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="additional_requirements">Additional Requirements or Notes</Label>
                      <Textarea
                        id="additional_requirements"
                        value={proposalForm.additional_requirements}
                        onChange={(e) => setProposalForm({...proposalForm, additional_requirements: e.target.value})}
                        placeholder="Any specific requirements, preferences, or additional information"
                      />
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setProposalOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Submit Proposal</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Dedicated Support</h3>
                    <p className="text-sm text-gray-600">Get a dedicated account manager to guide your sustainability journey</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Measurable Impact</h3>
                    <p className="text-sm text-gray-600">Track and report on real conservation outcomes and business benefits</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Global Recognition</h3>
                    <p className="text-sm text-gray-600">Join a network of sustainability leaders making a difference worldwide</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
