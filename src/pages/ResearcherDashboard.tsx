import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Upload, Download, Play, Pause } from "lucide-react";
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
  Target,
  Gamepad2,
  Building2,
  Camera,
  Sparkles,
  Calendar,
  MessageSquare,
  Trophy,
  Leaf,
  Droplets,
  Star,
  Share2,
  ThumbsUp,
  MessageCircle,
  Filter,
  Search,
  Bell,
  Settings,
  ChevronRight,
  Plus,
  BarChart3,
  Clock,
  CheckCircle,
  Map,
  Send,
  Image,
  Video,
  Mic,
  BookOpen,
  Archive,
  Compass,
  Mountain,
  Fish,
  Bird,
  Flower2,
  Sun,
  Moon,
  Wind,
  CloudRain,
  Thermometer,
  Waves,
  Gauge,
  Microscope,
  FlaskConical,
  Database,
  LineChart,
  PieChart,
  FileText,
  GitBranch,
  Beaker,
  Cpu,
  Brain,
  Satellite,
  Radar,
  Calculator,
  TrendingDown,
  AlertOctagon,
  ExternalLink,
  FileDown,
  FileSpreadsheet,
  Code2,
  Layers,
  Network,
  Workflow,
  Monitor,
  Server
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ResearcherDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for Researcher specific metrics
  const [researchStats, setResearchStats] = useState({
    activeProjects: 12,
    publishedPapers: 47,
    datasetsContributed: 156,
    collaborations: 89,
    citationCount: 2847,
    h_index: 34,
    impactScore: 8.7,
    globalRank: 142
  });

  const [realTimeData, setRealTimeData] = useState({
    temperature: { value: 23.4, trend: "+0.3°C", status: "normal" },
    humidity: { value: 67.2, trend: "-2.1%", status: "optimal" },
    biodiversityIndex: { value: 0.847, trend: "+0.023", status: "excellent" },
    carbonSequestration: { value: 145.7, trend: "+12.3 kg/ha", status: "increasing" },
    soilPH: { value: 6.8, trend: "+0.1", status: "balanced" },
    waterQuality: { value: 94.2, trend: "+1.8%", status: "pristine" }
  });

  const [researchProjects, setResearchProjects] = useState([
    {
      id: 1,
      title: "Amazon Rainforest Carbon Sequestration Analysis",
      status: "active",
      progress: 78,
      collaborators: 23,
      lead: "Dr. Maria Silva",
      institution: "Brazilian Institute of Environmental Research",
      budget: "$850,000",
      timeline: "24 months",
      bioregion: "Amazon Sacred Headwaters",
      dataPoints: 45678,
      lastUpdate: "2 hours ago",
      keyFindings: "Increased sequestration rates in restored areas",
      publications: 3
    },
    {
      id: 2,
      title: "Coral Reef Resilience in Climate Change",
      status: "recruiting",
      progress: 34,
      collaborators: 15,
      lead: "Dr. James Chen",
      institution: "Marine Biology Institute",
      budget: "$620,000",
      timeline: "36 months",
      bioregion: "Great Barrier Reef",
      dataPoints: 23456,
      lastUpdate: "1 day ago",
      keyFindings: "Novel adaptation mechanisms discovered",
      publications: 1
    },
    {
      id: 3,
      title: "Biodiversity Recovery in Restored Wetlands",
      status: "analysis",
      progress: 92,
      collaborators: 31,
      lead: "Dr. Sarah Williams",
      institution: "Wetland Conservation Society",
      budget: "$450,000",
      timeline: "18 months",
      bioregion: "Everglades Ecosystem",
      dataPoints: 67890,
      lastUpdate: "6 hours ago",
      keyFindings: "Species recovery exceeds projections",
      publications: 5
    }
  ]);

  const [publications, setPublications] = useState([
    {
      id: 1,
      title: "Machine Learning Approaches to Predicting Forest Regeneration Success",
      authors: ["Dr. Sarah Chen", "Prof. Michael Torres", "Dr. Lisa Kim"],
      journal: "Nature Ecology & Evolution",
      year: 2024,
      citations: 156,
      impactFactor: 11.2,
      openAccess: true,
      tags: ["Machine Learning", "Forest Restoration", "Predictive Modeling"],
      abstract: "We present a novel ML framework for predicting forest regeneration success using satellite imagery and environmental data...",
      downloads: 2847
    },
    {
      id: 2,
      title: "Indigenous Knowledge Integration in Biodiversity Conservation",
      authors: ["Dr. James Clearwater", "Elder Maria Santos", "Dr. Ana Rodriguez"],
      journal: "Conservation Biology",
      year: 2024,
      citations: 89,
      impactFactor: 5.4,
      openAccess: true,
      tags: ["Traditional Knowledge", "Biodiversity", "Community Conservation"],
      abstract: "This study demonstrates the critical importance of integrating Indigenous traditional ecological knowledge...",
      downloads: 1245
    }
  ]);

  const [aiInsights, setAiInsights] = useState([
    {
      id: 1,
      type: "prediction",
      title: "Species Migration Alert",
      description: "AI models predict 15% shift in butterfly migration patterns due to temperature changes",
      confidence: 87,
      impact: "high",
      actionable: true,
      timeframe: "Next 3 months"
    },
    {
      id: 2,
      type: "opportunity",
      title: "Research Collaboration Suggestion",
      description: "Dr. Elena Vasquez (Marine Institute) researching similar coral reef adaptation mechanisms",
      confidence: 94,
      impact: "medium",
      actionable: true,
      timeframe: "Immediate"
    },
    {
      id: 3,
      type: "trend",
      title: "Ecosystem Recovery Acceleration",
      description: "Restoration sites showing 23% faster recovery than historical averages",
      confidence: 91,
      impact: "medium",
      actionable: false,
      timeframe: "Ongoing"
    }
  ]);

  const [collaborativeNetwork, setCollaborativeNetwork] = useState([
    {
      id: 1,
      name: "Dr. Elena Vasquez",
      institution: "Marine Biology Institute",
      expertise: ["Coral Reef Biology", "Climate Adaptation", "Marine Genomics"],
      currentProjects: 3,
      sharedProjects: 1,
      location: "Australia",
      status: "online",
      compatibility: 94
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      institution: "Forest Research Center",
      expertise: ["Forest Ecology", "Remote Sensing", "Carbon Dynamics"],
      currentProjects: 5,
      sharedProjects: 2,
      location: "Canada",
      status: "active",
      compatibility: 87
    },
    {
      id: 3,
      name: "Dr. Amara Okafor",
      institution: "African Wildlife Foundation",
      expertise: ["Savanna Ecology", "Large Mammal Conservation", "Community Ecology"],
      currentProjects: 4,
      sharedProjects: 0,
      location: "Kenya",
      status: "away",
      compatibility: 82
    }
  ]);

  const [dataStreams, setDataStreams] = useState([
    {
      id: 1,
      name: "Satellite Imagery Feed",
      source: "Landsat 8/9",
      updateFrequency: "Daily",
      dataPoints: 15000,
      quality: "High",
      format: "GeoTIFF",
      access: "API"
    },
    {
      id: 2,
      name: "Weather Station Network",
      source: "Global Climate Network",
      updateFrequency: "Hourly",
      dataPoints: 450000,
      quality: "High",
      format: "JSON",
      access: "Real-time"
    },
    {
      id: 3,
      name: "Biodiversity Monitoring",
      source: "eBird/iNaturalist",
      updateFrequency: "Continuous",
      dataPoints: 2300000,
      quality: "Variable",
      format: "CSV/JSON",
      access: "Batch/API"
    }
  ]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Microscope className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Research Access Required</h2>
            <p className="text-muted-foreground mb-4">
              Please authenticate as a researcher to access the scientific dashboard
            </p>
            <Button>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
              <Microscope className="h-8 w-8 text-blue-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-800">Research Portal</h1>
              <p className="text-blue-600">
                Environmental Science & Ecological Research Hub
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              Researcher • H-Index: {researchStats.h_index}
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Research Alerts
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="data">Data Access</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Research Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Active Projects</p>
                      <p className="text-2xl font-bold text-blue-800">{researchStats.activeProjects}</p>
                    </div>
                    <FlaskConical className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Publications</p>
                      <p className="text-2xl font-bold text-purple-800">{researchStats.publishedPapers}</p>
                    </div>
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Citations</p>
                      <p className="text-2xl font-bold text-green-800">{researchStats.citationCount.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Impact Score</p>
                      <p className="text-2xl font-bold text-orange-800">{researchStats.impactScore}</p>
                    </div>
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions and AI Insights */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Research Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiInsights.map((insight) => (
                      <div key={insight.id} className={`p-4 rounded-lg border ${
                        insight.impact === 'high' ? 'bg-red-50 border-red-200' :
                        insight.impact === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {insight.type === 'prediction' && <Radar className="h-5 w-5 text-red-600" />}
                            {insight.type === 'opportunity' && <Target className="h-5 w-5 text-yellow-600" />}
                            {insight.type === 'trend' && <TrendingUp className="h-5 w-5 text-blue-600" />}
                            <h4 className="font-semibold">{insight.title}</h4>
                          </div>
                          <Badge className="text-xs">
                            {insight.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Timeline: {insight.timeframe}</span>
                          {insight.actionable && (
                            <Button size="sm" variant="outline">
                              Take Action
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Research Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Start New Project
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    Access Data Feeds
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Find Collaborators
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Submit Publication
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Environmental Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Satellite className="h-5 w-5" />
                  Real-time Environmental Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(realTimeData).map(([key, data]) => (
                    <div key={key} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                        <Badge className={`text-xs ${
                          data.status === 'excellent' || data.status === 'pristine' ? 'bg-green-100 text-green-800' :
                          data.status === 'optimal' || data.status === 'balanced' ? 'bg-blue-100 text-blue-800' :
                          data.status === 'normal' || data.status === 'increasing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {data.status}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold">{data.value}</div>
                      <div className="text-sm text-gray-500">{data.trend}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Access Tab */}
          <TabsContent value="data" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-800">Research Data Access</h2>
                <p className="text-blue-600">Real-time environmental data feeds and downloadable datasets</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Data
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Bulk Download
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {dataStreams.map((stream) => (
                <Card key={stream.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-blue-800">{stream.name}</h3>
                            <p className="text-blue-600">Source: {stream.source}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            {stream.access}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Update Frequency:</span>
                            <span className="font-medium ml-2">{stream.updateFrequency}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Data Points:</span>
                            <span className="font-medium ml-2">{stream.dataPoints.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Quality:</span>
                            <span className="font-medium ml-2">{stream.quality}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Format:</span>
                            <span className="font-medium ml-2">{stream.format}</span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <Button className="bg-blue-600 text-white hover:bg-blue-700">
                              <Eye className="h-4 w-4 mr-2" />
                              View Data
                            </Button>
                            <Button variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" size="sm">
                              <Code2 className="h-4 w-4 mr-1" />
                              API Docs
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileSpreadsheet className="h-4 w-4 mr-1" />
                              Metadata
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Data Visualization Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Data Visualization Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <LineChart className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                    <h4 className="font-medium">Time Series Analysis</h4>
                    <p className="text-sm text-gray-500">Interactive temporal visualizations</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Map className="mx-auto h-8 w-8 text-green-600 mb-2" />
                    <h4 className="font-medium">Geospatial Mapping</h4>
                    <p className="text-sm text-gray-500">Advanced GIS and spatial analysis</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Brain className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                    <h4 className="font-medium">AI Model Visualization</h4>
                    <p className="text-sm text-gray-500">ML model outputs and predictions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-800">Collaborative Research Projects</h2>
                <p className="text-blue-600">Multi-disciplinary research initiatives with global impact</p>
              </div>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </div>

            <div className="grid gap-6">
              {researchProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-blue-800">{project.title}</h3>
                            <p className="text-blue-600">{project.lead} • {project.institution}</p>
                          </div>
                          <Badge className={
                            project.status === 'active' ? 'bg-green-100 text-green-800' :
                            project.status === 'recruiting' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }>
                            {project.status}
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Key Findings: {project.keyFindings}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>📍 {project.bioregion}</span>
                            <span>👥 {project.collaborators} collaborators</span>
                            <span>📊 {project.dataPoints.toLocaleString()} data points</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Budget:</span>
                            <span className="font-medium ml-2">{project.budget}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Timeline:</span>
                            <span className="font-medium ml-2">{project.timeline}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Publications:</span>
                            <span className="font-medium ml-2">{project.publications}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Last Update:</span>
                            <span className="font-medium ml-2">{project.lastUpdate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Project Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-3" />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <Button className="bg-blue-600 text-white hover:bg-blue-700">
                              Join Project
                            </Button>
                            <Button variant="outline">
                              View Details
                            </Button>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <Button variant="outline" size="sm">
                              <Database className="h-4 w-4 mr-1" />
                              Data
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              Papers
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Discuss
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-800">Ecosystem Health Monitoring</h2>
                <p className="text-blue-600">AI-powered environmental monitoring and predictive analytics</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Monitor className="h-4 w-4 mr-2" />
                  Live Feed
                </Button>
                <Button variant="outline" size="sm">
                  <AlertOctagon className="h-4 w-4 mr-2" />
                  Alerts
                </Button>
              </div>
            </div>

            {/* Monitoring Overview */}
            <div className="grid lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600">Ecosystem Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">94.2</span>
                    <Gauge className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800 text-xs">Excellent</Badge>
                    <span className="text-xs text-green-600">+2.1%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600">Species Diversity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">0.847</span>
                    <Bird className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-purple-100 text-purple-800 text-xs">High</Badge>
                    <span className="text-xs text-green-600">+0.023</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600">Carbon Flux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">145.7</span>
                    <Leaf className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800 text-xs">Positive</Badge>
                    <span className="text-xs text-green-600">+12.3</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600">Water Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">94.2</span>
                    <Droplets className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">Pristine</Badge>
                    <span className="text-xs text-green-600">+1.8%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Map and Models */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Bioregion Health Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-green-200 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
                    <div className="text-center">
                      <Satellite className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Interactive Monitoring Map</h3>
                      <p className="text-blue-600 mb-4">Real-time ecosystem health data visualization</p>
                      <Button className="bg-blue-600 text-white hover:bg-blue-700">
                        Launch Full Screen Map
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Models
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80">
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium text-sm">Species Migration Predictor</h4>
                        <p className="text-xs text-gray-500 mb-2">Confidence: 94%</p>
                        <Progress value={94} className="h-2" />
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium text-sm">Forest Recovery Model</h4>
                        <p className="text-xs text-gray-500 mb-2">Confidence: 87%</p>
                        <Progress value={87} className="h-2" />
                      </div>

                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium text-sm">Climate Adaptation Index</h4>
                        <p className="text-xs text-gray-500 mb-2">Confidence: 91%</p>
                        <Progress value={91} className="h-2" />
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Publications Tab */}
          <TabsContent value="publications" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-800">Publications & Data Sharing</h2>
                <p className="text-blue-600">Research publications and open-access datasets</p>
              </div>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Submit Publication
              </Button>
            </div>

            <div className="grid gap-6">
              {publications.map((publication) => (
                <Card key={publication.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-blue-800 mb-2">{publication.title}</h3>
                        <p className="text-blue-600 mb-2">
                          {publication.authors.join(", ")} • {publication.journal} ({publication.year})
                        </p>
                        <p className="text-sm text-gray-600 mb-3">{publication.abstract}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {publication.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Citations:</span>
                            <span className="font-medium ml-2">{publication.citations}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Impact Factor:</span>
                            <span className="font-medium ml-2">{publication.impactFactor}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Downloads:</span>
                            <span className="font-medium ml-2">{publication.downloads.toLocaleString()}</span>
                          </div>
                          <div>
                            {publication.openAccess && (
                              <Badge className="bg-green-100 text-green-800">Open Access</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-800">Research Analytics & Impact</h2>
                <p className="text-blue-600">Comprehensive analysis of your research contributions</p>
              </div>
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Research Impact Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{researchStats.citationCount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Citations</div>
                      <div className="text-xs text-green-600">+12% this year</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{researchStats.h_index}</div>
                      <div className="text-sm text-gray-600">H-Index</div>
                      <div className="text-xs text-green-600">Top 5% in field</div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{researchStats.impactScore}</div>
                      <div className="text-sm text-gray-600">Impact Score</div>
                      <div className="text-xs text-green-600">Above average</div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">#{researchStats.globalRank}</div>
                      <div className="text-sm text-gray-600">Global Rank</div>
                      <div className="text-xs text-green-600">Moving up</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Field Contribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Ecological Restoration</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Biodiversity Research</span>
                        <span>72%</span>
                      </div>
                      <Progress value={72} />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Climate Science</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Conservation Biology</span>
                        <span>58%</span>
                      </div>
                      <Progress value={58} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Network Tab */}
          <TabsContent value="network" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-800">Research Network</h2>
                <p className="text-blue-600">Connect and collaborate with researchers worldwide</p>
              </div>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Find Collaborators
              </Button>
            </div>

            <div className="grid gap-6">
              {collaborativeNetwork.map((researcher) => (
                <Card key={researcher.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>{researcher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{researcher.name}</h3>
                            <Badge className={
                              researcher.status === 'online' ? 'bg-green-100 text-green-800' :
                              researcher.status === 'active' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {researcher.status}
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-800">
                              {researcher.compatibility}% match
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-2">{researcher.institution} • {researcher.location}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {researcher.expertise.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Active Projects:</span>
                              <span className="font-medium ml-2">{researcher.currentProjects}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Shared Projects:</span>
                              <span className="font-medium ml-2">{researcher.sharedProjects}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Compatibility:</span>
                              <span className="font-medium ml-2">{researcher.compatibility}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Connect
                        </Button>
                        <Button size="sm" variant="outline">
                          <Users className="h-4 w-4 mr-1" />
                          Collaborate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Research Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-xl">{user?.full_name?.split(' ').map(n => n[0]).join('') || 'R'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{user?.full_name}</h3>
                      <p className="text-muted-foreground">{user?.email}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge className="bg-blue-100 text-blue-800">Environmental Scientist</Badge>
                        <Badge className="bg-purple-100 text-purple-800">H-Index: {researchStats.h_index}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm font-medium">Research Interests</label>
                      <Textarea placeholder="Describe your primary research interests and expertise areas..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Institution</label>
                      <Input placeholder="Your current institution or affiliation" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">ORCID ID</label>
                      <Input placeholder="0000-0000-0000-0000" />
                    </div>
                  </div>

                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Research Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{researchStats.publishedPapers}</div>
                      <div className="text-sm text-gray-600">Publications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{researchStats.citationCount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Citations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{researchStats.collaborations}</div>
                      <div className="text-sm text-gray-600">Collaborations</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Project Updates</label>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">New Publications</label>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Collaboration Requests</label>
                      <input type="checkbox" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">AI Insights</label>
                      <input type="checkbox" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResearcherDashboard;
