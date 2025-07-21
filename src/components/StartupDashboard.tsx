import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { blockchainService } from '../services/blockchainService';
import { gamificationService } from '../services/gamificationService';
import { corporateService } from '../services/corporateService';
import { immersiveService } from '../services/immersiveService';
import { diplomacyService } from '../services/diplomacyService';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  DollarSign, 
  Award, 
  Zap, 
  Building2, 
  Scale, 
  Headphones, 
  Leaf, 
  Target, 
  Calendar,
  BarChart3,
  Activity,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Heart,
  Shield,
  Rocket,
  Star,
  MapPin
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Link } from 'react-router-dom';

export function StartupDashboard() {
  const [dashboardData, setDashboardData] = useState<any>({
    blockchain: null,
    gamification: null,
    corporate: null,
    immersive: null,
    diplomacy: null,
    overview: null
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [blockchainData, gamificationData, corporateData, diplomacyData] = await Promise.all([
          blockchainService.getGlobalMetrics(),
          gamificationService.getUserAchievements('user-123'),
          corporateService.getPartnershipStats(),
          diplomacyService.getDiplomacyMetrics()
        ]);

        // Calculate overview metrics
        const overview = {
          total_users: 15670 + 12340 + 2340 + 247, // Sum from various services
          active_projects: 156,
          global_impact_score: 8.7,
          revenue_current_month: 485000,
          revenue_growth: 23.5,
          user_growth: 18.2,
          engagement_rate: 84.3,
          satisfaction_score: 4.6
        };

        setDashboardData({
          blockchain: blockchainData,
          gamification: gamificationData,
          corporate: corporateData,
          diplomacy: diplomacyData,
          overview
        });
      } catch (error) {
        toast({
          title: "Error loading dashboard",
          description: "Failed to load startup metrics",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [toast]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">AEGIS: Regina Terrae</h1>
              <p className="text-lg text-gray-600">Startup Performance Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                <Activity className="h-4 w-4 mr-2" />
                System Status: Operational
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                <Rocket className="h-4 w-4 mr-2" />
                Startup Phase: Growth
              </Badge>
            </div>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(dashboardData.overview?.revenue_current_month || 0)}
                  </p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      +{formatPercentage(dashboardData.overview?.revenue_growth || 0)}
                    </span>
                  </div>
                </div>
                <DollarSign className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatNumber(dashboardData.overview?.total_users || 0)}
                  </p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">
                      +{formatPercentage(dashboardData.overview?.user_growth || 0)}
                    </span>
                  </div>
                </div>
                <Users className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Global Impact Score</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardData.overview?.global_impact_score || 0}/10
                  </p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-600 font-medium">Excellent</span>
                  </div>
                </div>
                <Globe className="h-12 w-12 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatPercentage(dashboardData.overview?.engagement_rate || 0)}
                  </p>
                  <div className="flex items-center mt-2">
                    <Heart className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-600 font-medium">High</span>
                  </div>
                </div>
                <TrendingUp className="h-12 w-12 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
            <TabsTrigger value="immersive">Immersive Tech</TabsTrigger>
            <TabsTrigger value="diplomacy">AI Diplomacy</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Platform Metrics
                  </CardTitle>
                  <CardDescription>Key performance indicators across all services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Blockchain Transparency</span>
                        <span>
                          {dashboardData.blockchain?.total_transactions || 0} transactions
                        </span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Corporate Partnerships</span>
                        <span>{dashboardData.corporate?.total_partners || 0} partners</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Conflict Resolution</span>
                        <span>
                          {formatPercentage(dashboardData.diplomacy?.resolution_rate || 0)} success
                        </span>
                      </div>
                      <Progress value={(dashboardData.diplomacy?.resolution_rate || 0) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>User Satisfaction</span>
                        <span>{dashboardData.overview?.satisfaction_score || 0}/5</span>
                      </div>
                      <Progress value={(dashboardData.overview?.satisfaction_score || 0) * 20} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Platform Services
                  </CardTitle>
                  <CardDescription>Quick access to all AEGIS services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/crown-bioregions">
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="h-4 w-4 mr-2" />
                        Bioregions
                      </Button>
                    </Link>
                    <Link to="/partnerships">
                      <Button variant="outline" className="w-full justify-start">
                        <Building2 className="h-4 w-4 mr-2" />
                        Partnerships
                      </Button>
                    </Link>
                    <Link to="/immersive">
                      <Button variant="outline" className="w-full justify-start">
                        <Headphones className="h-4 w-4 mr-2" />
                        VR/AR
                      </Button>
                    </Link>
                    <Link to="/diplomacy">
                      <Button variant="outline" className="w-full justify-start">
                        <Scale className="h-4 w-4 mr-2" />
                        AI Diplomacy
                      </Button>
                    </Link>
                    <Link to="/pricing">
                      <Button variant="outline" className="w-full justify-start">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Pricing
                      </Button>
                    </Link>
                    <Link to="/join-pact">
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Join Pact
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Security & Trust
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Blockchain Verified</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Encryption</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">GDPR Compliant</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ISO 27001</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    AI Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Accuracy Rate</span>
                      <span className="font-semibold">
                        {formatPercentage(dashboardData.diplomacy?.ai_accuracy_rate || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cultural Sensitivity</span>
                      <span className="font-semibold">
                        {dashboardData.diplomacy?.cultural_sensitivity_score || 0}/5
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Response Time</span>
                      <span className="font-semibold">0.3s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Uptime</span>
                      <span className="font-semibold">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="h-5 w-5 mr-2" />
                    Conservation Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">CO₂ Offset</span>
                      <span className="font-semibold">132K tons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Species Protected</span>
                      <span className="font-semibold">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Habitat Restored</span>
                      <span className="font-semibold">2.4K hectares</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Communities Impacted</span>
                      <span className="font-semibold">23</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {formatNumber(dashboardData.blockchain?.total_transactions || 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Transactions</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Carbon Credits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {formatNumber(dashboardData.blockchain?.total_carbon_credits || 0)}
                    </p>
                    <p className="text-sm text-gray-600">Credits Issued</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Verification Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">
                      {formatPercentage(dashboardData.blockchain?.verification_rate || 0)}
                    </p>
                    <p className="text-sm text-gray-600">Verified Impact</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="partnerships" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {dashboardData.corporate?.total_partners || 0}
                    </p>
                    <p className="text-sm text-gray-600">Companies</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(dashboardData.corporate?.total_investment || 0)}
                    </p>
                    <p className="text-sm text-gray-600">Committed</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Initiatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">
                      {dashboardData.corporate?.active_initiatives || 0}
                    </p>
                    <p className="text-sm text-gray-600">Projects</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Proposals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">
                      {dashboardData.corporate?.pending_proposals || 0}
                    </p>
                    <p className="text-sm text-gray-600">Under Review</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="immersive" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>VR Experiences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">28K</p>
                    <p className="text-sm text-gray-600">Total Downloads</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AR Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">156K</p>
                    <p className="text-sm text-gray-600">Active Sessions</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">89%</p>
                    <p className="text-sm text-gray-600">User Completion</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="diplomacy" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conflicts Resolved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {dashboardData.diplomacy?.total_conflicts_handled || 0}
                    </p>
                    <p className="text-sm text-gray-600">Cases Handled</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {formatPercentage(dashboardData.diplomacy?.resolution_rate || 0)}
                    </p>
                    <p className="text-sm text-gray-600">Resolution Rate</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">
                      {dashboardData.diplomacy?.average_resolution_time_days || 0}
                    </p>
                    <p className="text-sm text-gray-600">Days to Resolve</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Economic Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(dashboardData.diplomacy?.economic_benefits_generated || 0)}
                    </p>
                    <p className="text-sm text-gray-600">Value Created</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Startup Growth Analytics</CardTitle>
                <CardDescription>
                  Comprehensive metrics showing our growth trajectory and market impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4">Market Position</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Market Share</span>
                        <span className="font-semibold">12.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Competitive Advantage</span>
                        <span className="font-semibold">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Brand Recognition</span>
                        <span className="font-semibold">Growing</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4">Financial Health</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monthly Recurring Revenue</span>
                        <span className="font-semibold">{formatCurrency(485000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Customer Acquisition Cost</span>
                        <span className="font-semibold">$127</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lifetime Value</span>
                        <span className="font-semibold">$2,340</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4">Innovation Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>R&D Investment</span>
                        <span className="font-semibold">28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Patents Filed</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AI Model Accuracy</span>
                        <span className="font-semibold">94.2%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="text-center">
                  <h4 className="font-semibold text-xl mb-4">Startup Readiness Score</h4>
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-green-600">A+</span>
                      </div>
                      <p className="text-sm text-gray-600">Overall Grade</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-blue-600">9.2</span>
                      </div>
                      <p className="text-sm text-gray-600">Investor Score</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-purple-600">97%</span>
                      </div>
                      <p className="text-sm text-gray-600">Market Ready</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
