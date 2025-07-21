import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  TrendingUp, 
  Globe, 
  Users,
  TreePine,
  Droplets,
  Fish,
  Heart,
  ExternalLink,
  Search,
  Filter,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  DollarSign,
  BarChart3,
  Activity,
  Layers,
  Map
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { blockchainService } from "@/services/blockchainService";
import { 
  TransparencyLedger, 
  BlockchainTransaction, 
  VerifiedProject, 
  GlobalTransparencyMetrics,
  RealTimeAlert
} from "@/types/blockchain";

interface BlockchainDashboardProps {
  className?: string;
}

const BlockchainDashboard = ({ className }: BlockchainDashboardProps) => {
  const [ledger, setLedger] = useState<TransparencyLedger | null>(null);
  const [globalMetrics, setGlobalMetrics] = useState<GlobalTransparencyMetrics | null>(null);
  const [alerts, setAlerts] = useState<RealTimeAlert[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<BlockchainTransaction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
    
    // Subscribe to real-time updates
    const unsubscribe = blockchainService.subscribeToUpdates((update) => {
      toast({
        title: "Blockchain Update",
        description: `New ${update.type} recorded on blockchain`,
      });
      // Refresh data on updates
      loadDashboardData();
    });

    return unsubscribe;
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [ledgerData, metricsData, alertsData] = await Promise.all([
        blockchainService.getTransparencyLedger(),
        blockchainService.getGlobalMetrics(),
        blockchainService.getRealTimeAlerts()
      ]);

      setLedger(ledgerData);
      setGlobalMetrics(metricsData);
      setAlerts(alertsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load blockchain data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransactionClick = async (hash: string) => {
    try {
      const transaction = await blockchainService.getTransaction(hash);
      setSelectedTransaction(transaction);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load transaction details",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'success': return 'bg-green-500';
      default: return 'bg-blue-500';
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Blockchain Transparency Hub
          </h2>
          <p className="text-muted-foreground">
            Real-time verification and impact tracking powered by blockchain technology
          </p>
        </div>
        <Badge className="bg-green-100 text-green-800 border-green-200 text-lg px-4 py-2">
          <CheckCircle className="mr-2 h-5 w-5" />
          {ledger?.transparency_score}% Verified
        </Badge>
      </div>

      {/* Real-time Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Live Updates
          </h3>
          <div className="grid gap-2">
            {alerts.slice(0, 3).map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full ${getAlertSeverityColor(alert.severity)} mt-2`} />
                      <div>
                        <h4 className="font-semibold text-sm">{alert.title}</h4>
                        <p className="text-xs text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {alert.blockchain_verified && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        <Shield className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Impact
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Global Impact Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">Trees Planted</p>
                    <p className="text-2xl font-bold text-green-800">
                      {formatNumber(globalMetrics?.impact_metrics.total_trees_planted || 0)}
                    </p>
                  </div>
                  <TreePine className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">Hectares Restored</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {formatNumber(globalMetrics?.impact_metrics.total_hectares_restored || 0)}
                    </p>
                  </div>
                  <Map className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">CO₂ Offset</p>
                    <p className="text-2xl font-bold text-purple-800">
                      {formatNumber(globalMetrics?.impact_metrics.total_co2_offset || 0)} tons
                    </p>
                  </div>
                  <Droplets className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700">Total Funding</p>
                    <p className="text-2xl font-bold text-orange-800">
                      {formatCurrency(globalMetrics?.platform_stats.total_funding_usd || 0)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transparency Indicators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Transparency Indicators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fund Utilization</span>
                      <span>{globalMetrics?.transparency_indicators.fund_utilization_percentage}%</span>
                    </div>
                    <Progress value={globalMetrics?.transparency_indicators.fund_utilization_percentage} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Project Completion Rate</span>
                      <span>{globalMetrics?.transparency_indicators.project_completion_rate}%</span>
                    </div>
                    <Progress value={globalMetrics?.transparency_indicators.project_completion_rate} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Verification Accuracy</span>
                      <span>{globalMetrics?.transparency_indicators.verification_accuracy}%</span>
                    </div>
                    <Progress value={globalMetrics?.transparency_indicators.verification_accuracy} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Stakeholder Trust Index</span>
                      <span>{globalMetrics?.transparency_indicators.stakeholder_trust_index}%</span>
                    </div>
                    <Progress value={globalMetrics?.transparency_indicators.stakeholder_trust_index} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regional Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Regional Impact Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {globalMetrics?.regional_breakdown.map((region, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{region.bioregion}</h4>
                        <p className="text-sm text-muted-foreground">{region.region}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={`${
                            region.urgency_level === 'critical' ? 'bg-red-100 text-red-800' :
                            region.urgency_level === 'high' ? 'bg-orange-100 text-orange-800' :
                            region.urgency_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}
                        >
                          {region.urgency_level} urgency
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Projects</p>
                        <p className="font-semibold">{region.projects_count}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Funding</p>
                        <p className="font-semibold">{formatCurrency(region.funding_amount)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Trees</p>
                        <p className="font-semibold">{formatNumber(region.impact_metrics.trees_planted)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Hectares</p>
                        <p className="font-semibold">{formatNumber(region.impact_metrics.hectares_restored)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions by hash, project, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="space-y-4">
            {ledger?.recent_transactions
              .filter(tx => 
                tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tx.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tx.from_address.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((transaction) => (
              <Card key={transaction.id} className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleTransactionClick(transaction.hash)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(transaction.verification_status)}>
                          {transaction.verification_status}
                        </Badge>
                        <Badge variant="outline">
                          {transaction.transaction_type.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline">
                          {transaction.network}
                        </Badge>
                      </div>
                      
                      <h4 className="font-semibold mb-1">{transaction.project_name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {formatCurrency(transaction.amount)} • {new Date(transaction.timestamp).toLocaleString()}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Hash: {transaction.hash.substring(0, 12)}...</span>
                        <span>Block: #{transaction.block_number}</span>
                        <span>Gas: ${transaction.gas_fee.toFixed(2)}</span>
                      </div>
                      
                      {transaction.impact_data && (
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          {transaction.impact_data.trees_planted && (
                            <span className="flex items-center gap-1 text-green-700">
                              <TreePine className="h-3 w-3" />
                              {transaction.impact_data.trees_planted} trees
                            </span>
                          )}
                          {transaction.impact_data.hectares_restored && (
                            <span className="flex items-center gap-1 text-blue-700">
                              <Map className="h-3 w-3" />
                              {transaction.impact_data.hectares_restored} hectares
                            </span>
                          )}
                          {transaction.impact_data.co2_offset && (
                            <span className="flex items-center gap-1 text-purple-700">
                              <Droplets className="h-3 w-3" />
                              {transaction.impact_data.co2_offset} tons CO₂
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-6">
            {ledger?.verified_projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.location.region}, {project.location.country}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      {project.blockchain_verification.verified && (
                        <Badge className="bg-green-100 text-green-800">
                          <Shield className="mr-1 h-3 w-3" />
                          Verified {project.blockchain_verification.verification_score}%
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Funding Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Funding Progress</span>
                      <span>{formatCurrency(project.funding_raised)} / {formatCurrency(project.funding_goal)}</span>
                    </div>
                    <Progress value={(project.funding_raised / project.funding_goal) * 100} />
                  </div>

                  {/* Impact Progress */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {project.impact_targets.trees_to_plant && (
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <TreePine className="mx-auto h-6 w-6 text-green-600 mb-1" />
                        <div className="text-sm font-medium text-green-800">
                          {formatNumber(project.current_impact.trees_planted || 0)} / {formatNumber(project.impact_targets.trees_to_plant)}
                        </div>
                        <div className="text-xs text-green-600">Trees Planted</div>
                      </div>
                    )}
                    
                    {project.impact_targets.hectares_to_restore && (
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Map className="mx-auto h-6 w-6 text-blue-600 mb-1" />
                        <div className="text-sm font-medium text-blue-800">
                          {formatNumber(project.current_impact.hectares_restored || 0)} / {formatNumber(project.impact_targets.hectares_to_restore)}
                        </div>
                        <div className="text-xs text-blue-600">Hectares Restored</div>
                      </div>
                    )}
                    
                    {project.impact_targets.species_to_protect && (
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <Fish className="mx-auto h-6 w-6 text-purple-600 mb-1" />
                        <div className="text-sm font-medium text-purple-800">
                          {formatNumber(project.current_impact.species_protected || 0)} / {formatNumber(project.impact_targets.species_to_protect)}
                        </div>
                        <div className="text-xs text-purple-600">Species Protected</div>
                      </div>
                    )}
                    
                    {project.impact_targets.communities_to_support && (
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <Users className="mx-auto h-6 w-6 text-orange-600 mb-1" />
                        <div className="text-sm font-medium text-orange-800">
                          {formatNumber(project.current_impact.communities_supported || 0)} / {formatNumber(project.impact_targets.communities_to_support)}
                        </div>
                        <div className="text-xs text-orange-600">Communities Supported</div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Led by: {project.project_lead}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button size="sm" className="bg-gradient-royal text-primary-foreground">
                        <Heart className="mr-2 h-4 w-4" />
                        Support Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Impact Tab */}
        <TabsContent value="impact" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Real-Time Impact Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatNumber(ledger?.total_impact.trees_planted || 0)}
                  </div>
                  <p className="text-muted-foreground">Trees planted this month</p>
                  <div className="text-sm text-green-600 mt-1">+23% from last month</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Daily Goal Progress</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <Progress value={67} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Impact Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Project Success Rate</span>
                      <span>87.5%</span>
                    </div>
                    <Progress value={87.5} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Ecosystem Recovery</span>
                      <span>23.4% increase predicted</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Community Engagement</span>
                      <span>92.1%</span>
                    </div>
                    <Progress value={92.1} />
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Based on satellite data, weather patterns, and historical project performance
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Carbon Credit Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">2,547</div>
                  <div className="text-sm text-muted-foreground">Credits Available</div>
                  <div className="text-xs text-green-600 mt-1">$45.50/credit avg.</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">1,834</div>
                  <div className="text-sm text-muted-foreground">Credits Retired</div>
                  <div className="text-xs text-blue-600 mt-1">84,320 tons CO₂</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-sm text-muted-foreground">Active Traders</div>
                  <div className="text-xs text-purple-600 mt-1">23 countries</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlockchainDashboard;
