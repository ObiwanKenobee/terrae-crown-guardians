import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { diplomacyService } from '../services/diplomacyService';
import type { ConflictSummary, WildlifeConflict, AIRecommendation, DiplomacyMetrics, WildlifeDiplomatAI } from '../types/diplomacy';
import { 
  AlertTriangle, 
  Users, 
  Globe, 
  Clock, 
  TrendingUp, 
  Brain, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Calendar,
  MapPin,
  Leaf,
  DollarSign,
  Scale,
  Heart,
  Shield,
  Lightbulb,
  Target,
  Award,
  Zap,
  FileText,
  Video,
  BookOpen
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export function WildlifeDiplomacy() {
  const [activeConflicts, setActiveConflicts] = useState<ConflictSummary[]>([]);
  const [selectedConflict, setSelectedConflict] = useState<WildlifeConflict | null>(null);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [metrics, setMetrics] = useState<DiplomacyMetrics | null>(null);
  const [mediators, setMediators] = useState<WildlifeDiplomatAI[]>([]);
  const [successStories, setSuccessStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [conflictDetailsOpen, setConflictDetailsOpen] = useState(false);
  const [newMediationOpen, setNewMediationOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [conflictsData, recommendationsData, metricsData, mediatorsData, storiesData] = await Promise.all([
          diplomacyService.getActiveConflicts(),
          diplomacyService.getAIRecommendations(),
          diplomacyService.getDiplomacyMetrics(),
          diplomacyService.getAvailableMediators('conflict-001'),
          diplomacyService.getSuccessStories()
        ]);
        setActiveConflicts(conflictsData);
        setRecommendations(recommendationsData);
        setMetrics(metricsData);
        setMediators(mediatorsData);
        setSuccessStories(storiesData);
      } catch (error) {
        toast({
          title: "Error loading diplomacy data",
          description: "Failed to load wildlife conflict information",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'mediation_in_progress': return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case 'escalated': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'investigating': return <Globe className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleConflictSelect = async (conflictId: string) => {
    try {
      const conflict = await diplomacyService.getConflictDetails(conflictId);
      setSelectedConflict(conflict);
      setConflictDetailsOpen(true);
    } catch (error) {
      toast({
        title: "Error loading conflict details",
        description: "Failed to load detailed conflict information",
        variant: "destructive"
      });
    }
  };

  const handleStartMediation = async (conflictId: string) => {
    try {
      const sessionId = await diplomacyService.startMediationSession(conflictId, {
        mediator_type: 'ai',
        participants: ['all_stakeholders']
      });
      toast({
        title: "Mediation Session Started",
        description: `Session ${sessionId} initiated with AI mediator`,
      });
      setNewMediationOpen(false);
    } catch (error) {
      toast({
        title: "Failed to start mediation",
        description: "Unable to initiate mediation session",
        variant: "destructive"
      });
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

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wildlife Diplomacy AI Center</h1>
          <p className="text-lg text-gray-600 mb-6">
            AI-powered mediation platform for resolving human-wildlife conflicts with cultural sensitivity and environmental wisdom.
          </p>
          
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Scale className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Conflicts</p>
                      <p className="text-2xl font-bold text-gray-900">{activeConflicts.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{formatPercentage(metrics.resolution_rate)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Heart className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Stakeholder Satisfaction</p>
                      <p className="text-2xl font-bold text-gray-900">{metrics.stakeholder_satisfaction_average}/5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Economic Benefits</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.economic_benefits_generated)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <Tabs defaultValue="conflicts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="conflicts">Active Conflicts</TabsTrigger>
            <TabsTrigger value="ai-mediators">AI Mediators</TabsTrigger>
            <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
            <TabsTrigger value="success-stories">Success Stories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="conflicts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Active Wildlife Conflicts</h2>
              <Badge variant="outline">{activeConflicts.length} Ongoing</Badge>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {activeConflicts.map((conflict) => (
                <Card key={conflict.conflict_id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {getStatusIcon(conflict.status)}
                          <CardTitle className="text-lg ml-2">{conflict.title}</CardTitle>
                        </div>
                        <CardDescription>
                          {conflict.days_active} days active • {conflict.stakeholders_count} stakeholders • {conflict.species_count} species affected
                        </CardDescription>
                      </div>
                      <Badge className={getPriorityColor(conflict.priority)}>
                        {conflict.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-semibold capitalize">{conflict.status.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last Activity</p>
                        <p className="font-semibold">{conflict.last_activity.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Next Milestone</p>
                        <p className="font-semibold">{conflict.next_milestone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{conflict.progress_percentage}%</span>
                      </div>
                      <Progress value={conflict.progress_percentage} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => handleConflictSelect(conflict.conflict_id)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Dialog open={newMediationOpen} onOpenChange={setNewMediationOpen}>
                        <DialogTrigger asChild>
                          <Button>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Start Mediation
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Initiate AI Mediation</DialogTitle>
                            <DialogDescription>
                              Start an AI-mediated session for {conflict.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>AI Mediator</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select mediator" />
                                </SelectTrigger>
                                <SelectContent>
                                  {mediators.map((mediator) => (
                                    <SelectItem key={mediator.id} value={mediator.id}>
                                      {mediator.name} (Success Rate: {formatPercentage(mediator.success_rate)})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Session Duration</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1h">1 hour</SelectItem>
                                  <SelectItem value="2h">2 hours</SelectItem>
                                  <SelectItem value="4h">4 hours</SelectItem>
                                  <SelectItem value="1d">Full day</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Additional Notes</Label>
                              <Textarea placeholder="Any special considerations or requirements..." />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => handleStartMediation(conflict.conflict_id)}>
                              Start Session
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai-mediators" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">AI Mediator Network</h2>
              <Badge variant="outline">{mediators.length} Available</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediators.map((mediator) => (
                <Card key={mediator.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center">
                      <Brain className="h-8 w-8 text-purple-600 mr-3" />
                      <div>
                        <CardTitle className="text-xl">{mediator.name}</CardTitle>
                        <CardDescription>Version {mediator.version} • {mediator.specialization.replace('_', ' ')}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Success Rate</p>
                        <p className="font-semibold text-green-600">{formatPercentage(mediator.success_rate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Cases Handled</p>
                        <p className="font-semibold">{mediator.cases_handled}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Languages</p>
                        <p className="font-semibold">{mediator.languages_supported.length}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Mediation Style</p>
                        <p className="font-semibold capitalize">{mediator.mediation_style}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Expertise Areas</h4>
                      <div className="flex flex-wrap gap-1">
                        {mediator.expertise_areas.slice(0, 4).map((area, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {area.replace('_', ' ')}
                          </Badge>
                        ))}
                        {mediator.expertise_areas.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{mediator.expertise_areas.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Cultural Knowledge</h4>
                      <div className="space-y-1">
                        {mediator.cultural_knowledge_base.map((culture, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Globe className="h-3 w-3 mr-2 text-gray-500" />
                            <span>{culture.culture_group} ({culture.region})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${mediator.continuous_learning_enabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className="text-sm">Continuous Learning</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${mediator.human_oversight_required ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className="text-sm">Human Oversight</span>
                      </div>
                    </div>

                    <Button className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Request Mediation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">AI-Generated Insights & Recommendations</h2>
              <Badge variant="outline">{recommendations.length} Active</Badge>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {recommendations.map((rec) => (
                <Card key={rec.recommendation_id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
                          <CardTitle className="text-lg">{rec.title}</CardTitle>
                        </div>
                        <CardDescription>{rec.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          Due: {rec.deadline.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Confidence Score</p>
                        <div className="flex items-center">
                          <Progress value={rec.confidence_score * 100} className="h-2 flex-1 mr-2" />
                          <span className="font-semibold">{formatPercentage(rec.confidence_score)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500">Implementation Effort</p>
                        <p className="font-semibold capitalize">{rec.implementation_effort}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-semibold capitalize">{rec.status}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">AI Rationale</h4>
                      <p className="text-sm text-gray-700">{rec.rationale}</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Potential Impact</h4>
                      <p className="text-sm text-blue-700">{rec.potential_impact}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Discuss
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="success-stories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Success Stories & Case Studies</h2>
              <Badge variant="outline">{successStories.length} Cases</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {successStories.map((story) => (
                <Card key={story.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center">
                      <Award className="h-6 w-6 text-gold-600 mr-3" />
                      <div>
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        <CardDescription>{story.location} • {story.species}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-semibold">{story.duration_months} months</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Stakeholders</p>
                        <p className="font-semibold">{story.stakeholders_involved}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Economic Benefits</p>
                        <p className="font-semibold">{formatCurrency(story.economic_benefits)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Replication</p>
                        <p className="font-semibold">Active</p>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Solution Implemented</h4>
                      <p className="text-sm text-green-700">{story.solution}</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Outcome Achieved</h4>
                      <p className="text-sm text-blue-700">{story.outcome}</p>
                    </div>

                    <div className="text-xs text-gray-600">
                      <p><strong>Replication Status:</strong> {story.replication_status}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Full Case Study
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4 mr-2" />
                        Video Story
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Diplomacy Analytics Dashboard</h2>
              <p className="text-gray-600 mb-6">
                Comprehensive insights into wildlife conflict resolution patterns, AI performance, and global impact metrics.
              </p>
            </div>
            
            {metrics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Resolution Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Overall Resolution Rate</span>
                        <span className="font-semibold">{formatPercentage(metrics.resolution_rate)}</span>
                      </div>
                      <Progress value={metrics.resolution_rate * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Species Recovery Rate</span>
                        <span className="font-semibold">{formatPercentage(metrics.species_recovery_success_rate)}</span>
                      </div>
                      <Progress value={metrics.species_recovery_success_rate * 100} className="h-2" />
                    </div>
                    <div className="text-center pt-2">
                      <p className="text-sm text-gray-600">Average Resolution Time</p>
                      <p className="text-2xl font-bold">{metrics.average_resolution_time_days} days</p>
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
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">AI Accuracy Rate</span>
                        <span className="font-semibold">{formatPercentage(metrics.ai_accuracy_rate)}</span>
                      </div>
                      <Progress value={metrics.ai_accuracy_rate * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Human-AI Collaboration</span>
                        <span className="font-semibold">{formatPercentage(metrics.human_ai_collaboration_effectiveness)}</span>
                      </div>
                      <Progress value={metrics.human_ai_collaboration_effectiveness * 100} className="h-2" />
                    </div>
                    <div className="text-center pt-2">
                      <p className="text-sm text-gray-600">Cultural Sensitivity Score</p>
                      <p className="text-2xl font-bold">{metrics.cultural_sensitivity_score}/5</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Global Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Conflicts Handled</p>
                      <p className="text-3xl font-bold text-blue-600">{metrics.total_conflicts_handled}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Economic Benefits Generated</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(metrics.economic_benefits_generated)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Stakeholder Satisfaction</p>
                      <p className="text-2xl font-bold text-purple-600">{metrics.stakeholder_satisfaction_average}/5</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Key Insights & Trends</CardTitle>
                <CardDescription>AI-generated analysis of conflict resolution patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Seasonal Patterns</h4>
                    <p className="text-sm text-blue-700">
                      Human-wildlife conflicts increase by 45% during dry seasons. AI recommends proactive water point management.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Cultural Integration Success</h4>
                    <p className="text-sm text-green-700">
                      Cases involving traditional knowledge integration show 23% higher success rates than conventional approaches.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Economic Incentive Impact</h4>
                    <p className="text-sm text-purple-700">
                      Revenue-sharing models demonstrate 89% stakeholder retention and 67% conflict reduction over 2+ years.
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">AI Mediation Effectiveness</h4>
                    <p className="text-sm text-orange-700">
                      AI-mediated sessions achieve consensus 34% faster than human-only mediation while maintaining satisfaction levels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Conflict Details Modal */}
        <Dialog open={conflictDetailsOpen} onOpenChange={setConflictDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedConflict?.title}</DialogTitle>
              <DialogDescription>
                Detailed conflict analysis and resolution tracking
              </DialogDescription>
            </DialogHeader>
            {selectedConflict && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Location</h4>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      {selectedConflict.location.address}
                    </div>
                    <p className="text-sm text-gray-600">{selectedConflict.location.bioregion}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Timeline</h4>
                    <div className="space-y-1 text-sm">
                      <p>First Reported: {selectedConflict.timeline.first_reported.toLocaleDateString()}</p>
                      <p>Last Updated: {selectedConflict.timeline.last_updated.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Affected Species</h4>
                  <div className="space-y-2">
                    {selectedConflict.affected_species.map((species, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{species.species_name}</p>
                            <p className="text-sm text-gray-600">{species.scientific_name}</p>
                          </div>
                          <Badge variant="outline">{species.conservation_status}</Badge>
                        </div>
                        <p className="text-sm mt-2">Population affected: {species.population_affected}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Stakeholders</h4>
                  <div className="space-y-2">
                    {selectedConflict.stakeholders.map((stakeholder, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{stakeholder.name}</p>
                            <p className="text-sm text-gray-600 capitalize">{stakeholder.type.replace('_', ' ')}</p>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {stakeholder.negotiation_position}
                          </Badge>
                        </div>
                        <p className="text-sm mt-2">Contact: {stakeholder.representative.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">AI Risk Assessment</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Escalation Probability</p>
                      <Progress value={selectedConflict.ai_analysis.risk_assessment.escalation_probability * 100} className="h-2" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Economic Loss Risk</p>
                      <Progress value={selectedConflict.ai_analysis.risk_assessment.economic_loss_risk * 100} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
