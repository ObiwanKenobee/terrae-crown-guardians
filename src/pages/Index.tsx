import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  Shield, 
  Globe, 
  TreePine, 
  Users, 
  TrendingUp, 
  Eye, 
  Heart, 
  Award, 
  Zap, 
  MapPin, 
  Activity,
  Play,
  ChevronRight,
  CheckCircle,
  Target,
  Gamepad2,
  Building2,
  Camera,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
// Removed old navigation and hero - now handled by EnterpriseLayout
import { useAuth } from "@/contexts/AuthContext";
import { blockchainService } from "@/services/blockchainService";
import { gamificationService } from "@/services/gamificationService";
import { TransparencyLedger, GlobalTransparencyMetrics } from "@/types/blockchain";
import { UserProgress, Challenge } from "@/types/gamification";

const Index = () => {
  const [transparencyData, setTransparencyData] = useState<TransparencyLedger | null>(null);
  const [globalMetrics, setGlobalMetrics] = useState<GlobalTransparencyMetrics | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user, isAuthenticated, hasCompletedOnboarding } = useAuth();

  useEffect(() => {
    loadDashboardData();
  }, [isAuthenticated, user]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      const [transparencyResult, metricsResult] = await Promise.all([
        blockchainService.getTransparencyLedger(),
        blockchainService.getGlobalMetrics()
      ]);

      setTransparencyData(transparencyResult);
      setGlobalMetrics(metricsResult);

      // Load user-specific data if authenticated
      if (isAuthenticated && user) {
        const [progressResult, challengesResult] = await Promise.all([
          gamificationService.getUserProgress(user.id),
          gamificationService.getActiveChallenges(user.id)
        ]);

        setUserProgress(progressResult);
        setActiveChallenges(challengesResult);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content - Hero is now handled by EnterpriseHeader */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* User Dashboard Section (if authenticated) */}
          {isAuthenticated && user && !isLoading && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    Welcome back, {user.full_name}! 👋
                  </h2>
                  <p className="text-muted-foreground">
                    Continue your regenerative journey and make an impact today
                  </p>
                </div>
                {userProgress && (
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Your Level</div>
                    <div className="text-3xl font-bold text-primary">{userProgress.level}</div>
                    <div className="text-xs text-muted-foreground">
                      {userProgress.points_to_next_level} XP to next level
                    </div>
                  </div>
                )}
              </div>

              {/* Personal Impact Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-700">Your Trees</p>
                        <p className="text-2xl font-bold text-green-800">
                          {formatNumber(user.profile.contribution_stats.trees_planted)}
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
                        <p className="text-sm font-medium text-blue-700">Impact Score</p>
                        <p className="text-2xl font-bold text-blue-800">
                          {formatNumber(user.profile.contribution_stats.impact_score)}
                        </p>
                      </div>
                      <Award className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-700">Hectares</p>
                        <p className="text-2xl font-bold text-purple-800">
                          {formatNumber(user.profile.contribution_stats.hectares_restored)}
                        </p>
                      </div>
                      <MapPin className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-700">Communities</p>
                        <p className="text-2xl font-bold text-orange-800">
                          {formatNumber(user.profile.contribution_stats.communities_supported)}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress and Challenges */}
              {userProgress && (
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Your Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Level {userProgress.level}</span>
                          <span>{userProgress.experience_points} / {userProgress.experience_points + userProgress.points_to_next_level} XP</span>
                        </div>
                        <Progress 
                          value={(userProgress.experience_points / (userProgress.experience_points + userProgress.points_to_next_level)) * 100} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Global Rank</span>
                        <Badge className="bg-gold text-gold-foreground">
                          #{formatNumber(userProgress.leaderboard_position)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span>Achievements</span>
                        <span className="font-medium">{userProgress.achievements_unlocked.length}</span>
                      </div>

                      {userProgress.active_streaks.length > 0 && (
                        <div className="border-t pt-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Zap className="h-4 w-4 text-orange-500" />
                            <span>Daily streak: {userProgress.active_streaks[0].current_count} days</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Gamepad2 className="h-5 w-5" />
                        Active Challenges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {activeChallenges.length > 0 ? (
                        <div className="space-y-3">
                          {activeChallenges.slice(0, 2).map((challenge) => (
                            <div key={challenge.id} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-sm">{challenge.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {challenge.category}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                {challenge.description}
                              </p>
                              <div className="flex items-center justify-between text-xs">
                                <span>{formatNumber(challenge.participant_count)} participants</span>
                                <span>Ends {new Date(challenge.end_date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" className="w-full">
                            View All Challenges
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <Gamepad2 className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">No active challenges</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Browse Challenges
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {!hasCompletedOnboarding && (
                <Card className="border-orange-200 bg-orange-50 mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-100 rounded-full">
                        <Sparkles className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-orange-800">Complete Your Steward Setup</h3>
                        <p className="text-sm text-orange-700">
                          Finish setting up your profile to unlock all features and start earning achievements.
                        </p>
                      </div>
                      <Button className="bg-orange-600 text-white hover:bg-orange-700">
                        Complete Setup
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Global Impact Metrics */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Global Regenerative Impact</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real-time transparency powered by blockchain technology. Every action is verified and tracked.
              </p>
            </div>

            {!isLoading && globalMetrics && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <TreePine className="mx-auto h-12 w-12 text-green-600 mb-4" />
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      {formatNumber(globalMetrics.impact_metrics.total_trees_planted)}
                    </div>
                    <div className="text-sm text-muted-foreground">Trees Planted</div>
                    <div className="text-xs text-green-600 mt-1">+12% this month</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <MapPin className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                    <div className="text-3xl font-bold text-blue-700 mb-2">
                      {formatNumber(globalMetrics.impact_metrics.total_hectares_restored)}
                    </div>
                    <div className="text-sm text-muted-foreground">Hectares Restored</div>
                    <div className="text-xs text-blue-600 mt-1">+8% this month</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <Users className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                    <div className="text-3xl font-bold text-purple-700 mb-2">
                      {formatNumber(globalMetrics.impact_metrics.total_communities_supported)}
                    </div>
                    <div className="text-sm text-muted-foreground">Communities Supported</div>
                    <div className="text-xs text-purple-600 mt-1">+15% this month</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <Shield className="mx-auto h-12 w-12 text-orange-600 mb-4" />
                    <div className="text-3xl font-bold text-orange-700 mb-2">
                      {formatCurrency(globalMetrics.platform_stats.total_funding_usd)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Funding</div>
                    <div className="text-xs text-orange-600 mt-1">100% transparent</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Blockchain Transparency Badge */}
            {transparencyData && (
              <div className="text-center">
                <Badge className="bg-green-100 text-green-800 border-green-200 text-lg px-6 py-2">
                  <Shield className="mr-2 h-5 w-5" />
                  {transparencyData.transparency_score}% Blockchain Verified
                </Badge>
              </div>
            )}
          </div>

          {/* Innovation Showcase */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Revolutionary Features</h2>
              <p className="text-xl text-muted-foreground">
                Experience the future of environmental conservation with cutting-edge technology
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Blockchain Transparency */}
              <Card className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-green-100 rounded-full w-fit">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Blockchain Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Every donation, tree planted, and conservation action is permanently recorded 
                    on blockchain for complete transparency and trust.
                  </p>
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Real-time transaction verification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Immutable impact records
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Public fund utilization tracking
                    </li>
                  </ul>
                  <Link to="/pricing">
                    <Button className="w-full bg-gradient-royal">
                      Explore Transparency Hub
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* AI-Powered Mapping */}
              <Card className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-blue-100 rounded-full w-fit">
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">AI-Powered Crowdsourcing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Global community contributes real-time environmental data. AI analyzes 
                    patterns to predict threats and optimize conservation efforts.
                  </p>
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      Crowd-sourced biodiversity monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      AI threat detection and prediction
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      Real-time ecosystem insights
                    </li>
                  </ul>
                  <Link to="/crown-bioregions">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      Explore Live Map
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Gamified Impact */}
              <Card className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-purple-100 rounded-full w-fit">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Gamified Conservation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Earn achievements, climb leaderboards, and compete in global challenges 
                    while making real environmental impact.
                  </p>
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      Achievement system with NFT rewards
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      Global conservation challenges
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      Team competitions with real prizes
                    </li>
                  </ul>
                  <Link to="/service-index">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Join Competition
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Wildlife Diplomacy AI */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-emerald-100 rounded-full">
                        <Zap className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-emerald-800">AI Wildlife Diplomacy</h3>
                        <p className="text-emerald-600">Breakthrough in conservation technology</p>
                      </div>
                    </div>
                    <p className="text-emerald-700 mb-6">
                      Our AI automatically detects wildlife migration patterns and facilitates 
                      international cooperation for cross-border species protection. Real-time 
                      diplomatic recommendations help countries work together seamlessly.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                        <span className="text-emerald-700">Automated diplomatic protocols</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                        <span className="text-emerald-700">Cross-border funding coordination</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                        <span className="text-emerald-700">Real-time species migration tracking</span>
                      </div>
                    </div>
                    <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                      Learn More About AI Diplomacy
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/50 backdrop-blur rounded-lg p-6 border border-emerald-200">
                      <h4 className="font-semibold text-emerald-800 mb-4">Active Diplomatic Cases</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span>Elephant Migration (Kenya-Tanzania)</span>
                          <Badge className="bg-emerald-100 text-emerald-800">In Progress</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Monarch Butterfly (Mexico-US-Canada)</span>
                          <Badge className="bg-blue-100 text-blue-800">Agreed</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Arctic Fox (Russia-Norway)</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Negotiating</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Immersive VR/AR Experiences */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/50 backdrop-blur rounded-lg p-6 border border-indigo-200">
                      <h4 className="font-semibold text-indigo-800 mb-4">Available VR Experiences</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Play className="h-8 w-8 text-indigo-600 bg-indigo-100 rounded-full p-2" />
                          <div>
                            <div className="font-medium text-indigo-800">Amazon Rainforest Tour</div>
                            <div className="text-sm text-indigo-600">360° immersive journey</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Camera className="h-8 w-8 text-purple-600 bg-purple-100 rounded-full p-2" />
                          <div>
                            <div className="font-medium text-purple-800">Wildlife AR Experience</div>
                            <div className="text-sm text-purple-600">See endangered species in your space</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Eye className="h-8 w-8 text-pink-600 bg-pink-100 rounded-full p-2" />
                          <div>
                            <div className="font-medium text-pink-800">Restoration Timeline</div>
                            <div className="text-sm text-pink-600">Watch forests grow over time</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-indigo-100 rounded-full">
                        <Eye className="h-8 w-8 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-indigo-800">Immersive Storytelling</h3>
                        <p className="text-indigo-600">Experience conservation like never before</p>
                      </div>
                    </div>
                    <p className="text-indigo-700 mb-6">
                      Step into the bioregions you're protecting with cutting-edge VR and AR 
                      experiences. Feel the impact of conservation efforts and witness the 
                      beauty we're working together to preserve.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                        <span className="text-indigo-700">Virtual bioregion tours</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                        <span className="text-indigo-700">AR species visualization</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                        <span className="text-indigo-700">Time-lapse restoration videos</span>
                      </div>
                    </div>
                    <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                      Start VR Experience
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Corporate Partnership Showcase */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Strategic Partnerships</h2>
              <p className="text-xl text-muted-foreground">
                Leading organizations trust AEGIS for their sustainability initiatives
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-8 w-8 text-blue-600" />
                      <div>
                        <CardTitle>Corporate Partnerships</CardTitle>
                        <p className="text-sm text-muted-foreground">Scale your impact through collaboration</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Partner with AEGIS to integrate your CSR programs directly into our 
                    regenerative ecosystem. Track your environmental impact with complete transparency.
                  </p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span>Active Corporate Partners</span>
                      <span className="font-medium">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Combined Investment</span>
                      <span className="font-medium">$12.3M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projects Funded</span>
                      <span className="font-medium">89</span>
                    </div>
                  </div>
                  <Link to="/pricing">
                    <Button className="w-full">
                      Explore Partnership Options
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="h-8 w-8 text-red-600" />
                      <div>
                        <CardTitle>Brand Integration</CardTitle>
                        <p className="text-sm text-muted-foreground">Authentic sustainability marketing</p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Featured</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Showcase your environmental commitment through branded conservation 
                    projects. Customers can track the real-world impact of their purchases.
                  </p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span>Brand Campaigns</span>
                      <span className="font-medium">34</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer Engagement</span>
                      <span className="font-medium">2.4M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impact Visibility</span>
                      <span className="font-medium">100%</span>
                    </div>
                  </div>
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700">
                    Launch Brand Campaign
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-royal text-primary-foreground">
              <CardContent className="p-12">
                <Crown className="mx-auto h-16 w-16 mb-6" />
                <h2 className="text-3xl font-bold mb-4">
                  Join the Regenerative Revolution
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Become a guardian of Earth's crown bioregions. Start your stewardship 
                  journey today and make a measurable impact on our planet's future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {!isAuthenticated ? (
                    <>
                      <Link to="/join-pact">
                        <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                          Join the Pact
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      <Link to="/pricing">
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                          View Pricing
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/crown-bioregions">
                        <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                          Explore Bioregions
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      <Link to="/service-index">
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                          Join Challenge
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
