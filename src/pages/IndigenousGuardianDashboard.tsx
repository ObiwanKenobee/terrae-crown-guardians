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
  Gauge
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const IndigenousGuardianDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for Indigenous Guardian specific metrics
  const [ecosystemData, setEcosystemData] = useState({
    airQuality: { value: 87, status: "good", trend: "+2%" },
    soilMoisture: { value: 72, status: "optimal", trend: "+5%" },
    biodiversityIndex: { value: 94, status: "excellent", trend: "+8%" },
    waterQuality: { value: 91, status: "pristine", trend: "+3%" },
    forestCanopy: { value: 88, status: "healthy", trend: "+1%" }
  });

  const [territoryStats, setTerritoryStats] = useState({
    ancestralLands: 12500, // hectares
    sacredSites: 47,
    protectedSpecies: 234,
    activeStewards: 89,
    culturalArtifacts: 156,
    knowledgeRecords: 423
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "critical",
      title: "Illegal Logging Detected",
      location: "Sacred Grove Sector 7",
      time: "2 hours ago",
      action: "Drone surveillance activated"
    },
    {
      id: 2,
      type: "warning", 
      title: "Wildlife Migration Alert",
      location: "River Bend Corridor",
      time: "6 hours ago",
      action: "Community elders notified"
    },
    {
      id: 3,
      type: "info",
      title: "Seasonal Ceremony Reminder",
      location: "Council Grounds",
      time: "1 day ago",
      action: "Preparation in progress"
    }
  ]);

  const [knowledgeEntries, setKnowledgeEntries] = useState([
    {
      id: 1,
      title: "Traditional Fire Management Practices",
      contributor: "Elder Maria Santos",
      type: "video",
      duration: "18:32",
      views: 156,
      language: "Quechua",
      category: "Land Management"
    },
    {
      id: 2,
      title: "Sacred Plant Medicine Preparation",
      contributor: "Healer Joseph Crow Feather",
      type: "audio",
      duration: "25:47",
      views: 89,
      language: "Lakota",
      category: "Traditional Medicine"
    },
    {
      id: 3,
      title: "River Conservation Ceremonies",
      contributor: "Water Keeper Ana Pumari",
      type: "document",
      pages: 12,
      views: 203,
      language: "Aymara",
      category: "Water Protection"
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Amazon Rainforest Restoration",
      territory: "Achuar Territory",
      progress: 78,
      stewards: 34,
      target: "5,000 hectares",
      funding: "$850,000",
      timeline: "18 months",
      category: "Forest Restoration",
      culturalSignificance: "Sacred hunting grounds restoration"
    },
    {
      id: 2,
      name: "Sacred River Protection Initiative",
      territory: "Maasai Lands",
      progress: 65,
      stewards: 28,
      target: "3 river systems",
      funding: "$620,000",
      timeline: "24 months", 
      category: "Water Conservation",
      culturalSignificance: "Ancestral water source preservation"
    },
    {
      id: 3,
      name: "Endangered Species Recovery",
      territory: "Inuit Territory",
      progress: 43,
      stewards: 19,
      target: "500 polar bears",
      funding: "$1,200,000",
      timeline: "36 months",
      category: "Wildlife Conservation",
      culturalSignificance: "Traditional hunting balance restoration"
    }
  ]);

  const [rewards, setRewards] = useState({
    totalPoints: 15750,
    level: "Elder Guardian",
    badges: [
      { name: "Forest Protector", earned: true, rarity: "epic" },
      { name: "Water Guardian", earned: true, rarity: "rare" },
      { name: "Knowledge Keeper", earned: true, rarity: "legendary" },
      { name: "Sacred Site Defender", earned: false, progress: 87, rarity: "epic" },
      { name: "Species Protector", earned: false, progress: 72, rarity: "rare" }
    ],
    globalRank: 12,
    communityRank: 3
  });

  const [partnerships, setPartnerships] = useState([
    {
      id: 1,
      organization: "UNESCO World Heritage",
      type: "Cultural Preservation",
      status: "active",
      funding: "$500,000",
      duration: "3 years"
    },
    {
      id: 2,
      organization: "Amazon Conservation Association",
      type: "Forest Protection",
      status: "active", 
      funding: "$750,000",
      duration: "5 years"
    },
    {
      id: 3,
      organization: "Indigenous Rights Foundation",
      type: "Legal Support",
      status: "active",
      funding: "$300,000",
      duration: "2 years"
    }
  ]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Mountain className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Sacred Access Required</h2>
            <p className="text-muted-foreground mb-4">
              Please authenticate as an Indigenous Ecological Guardian to access this sacred dashboard
            </p>
            <Button>Authenticate</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full">
              <Mountain className="h-8 w-8 text-amber-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-emerald-800">Indigenous Guardian Portal</h1>
              <p className="text-emerald-600">
                Sacred stewardship of Mother Earth • Territory: {user?.profile?.territory || "Ancestral Lands"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
              Elder Guardian • Level {rewards.level}
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Sacred Alerts
            </Button>
          </div>
        </div>

        {/* Alert Banner */}
        {alerts.filter(alert => alert.type === 'critical').length > 0 && (
          <div className="mb-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-800">Critical Territory Alert</h4>
                    <p className="text-sm text-red-700">
                      {alerts.find(alert => alert.type === 'critical')?.title} - Immediate action required
                    </p>
                  </div>
                  <Button size="sm" className="bg-red-600 text-white hover:bg-red-700">
                    Respond Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Sacred Overview</TabsTrigger>
            <TabsTrigger value="ecosystem">Ecosystem Health</TabsTrigger>
            <TabsTrigger value="knowledge">Traditional Knowledge</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="projects">Restoration Projects</TabsTrigger>
            <TabsTrigger value="rewards">Recognition</TabsTrigger>
            <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
            <TabsTrigger value="legacy">Cultural Legacy</TabsTrigger>
          </TabsList>

          {/* Sacred Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Territory Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Ancestral Lands</p>
                      <p className="text-2xl font-bold text-green-800">{territoryStats.ancestralLands.toLocaleString()} ha</p>
                    </div>
                    <Mountain className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-amber-700">Sacred Sites</p>
                      <p className="text-2xl font-bold text-amber-800">{territoryStats.sacredSites}</p>
                    </div>
                    <Sparkles className="h-8 w-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Protected Species</p>
                      <p className="text-2xl font-bold text-blue-800">{territoryStats.protectedSpecies}</p>
                    </div>
                    <Bird className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Active Stewards</p>
                      <p className="text-2xl font-bold text-purple-800">{territoryStats.activeStewards}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-rose-50 to-pink-100 border-rose-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-rose-700">Cultural Artifacts</p>
                      <p className="text-2xl font-bold text-rose-800">{territoryStats.culturalArtifacts}</p>
                    </div>
                    <Archive className="h-8 w-8 text-rose-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-teal-700">Knowledge Records</p>
                      <p className="text-2xl font-bold text-teal-800">{territoryStats.knowledgeRecords}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-teal-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions and Recent Activity */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Sacred Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50">
                      <TreePine className="h-5 w-5 text-green-600 mt-1" />
                      <div className="flex-1">
                        <p className="font-medium text-green-800">Forest Restoration Ceremony Completed</p>
                        <p className="text-sm text-green-600">Sacred Grove Sector 12 • 500 native trees planted</p>
                        <p className="text-xs text-green-500">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                      <Droplets className="h-5 w-5 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <p className="font-medium text-blue-800">Water Blessing Ritual Documented</p>
                        <p className="text-sm text-blue-600">River Confluence • Elder Maria shared teachings</p>
                        <p className="text-xs text-blue-500">1 day ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50">
                      <Star className="h-5 w-5 text-amber-600 mt-1" />
                      <div className="flex-1">
                        <p className="font-medium text-amber-800">Knowledge Keeper Badge Earned</p>
                        <p className="text-sm text-amber-600">Traditional Medicine practices documented</p>
                        <p className="text-xs text-amber-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Sacred Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Document Knowledge
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Monitor Territory
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Call Council
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Report Threat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ecosystem Health Tab */}
          <TabsContent value="ecosystem" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600">Air Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">{ecosystemData.airQuality.value}</span>
                    <Wind className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {ecosystemData.airQuality.status}
                    </Badge>
                    <span className="text-xs text-green-600">{ecosystemData.airQuality.trend}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600">Soil Moisture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">{ecosystemData.soilMoisture.value}%</span>
                    <Leaf className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {ecosystemData.soilMoisture.status}
                    </Badge>
                    <span className="text-xs text-green-600">{ecosystemData.soilMoisture.trend}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600">Biodiversity Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">{ecosystemData.biodiversityIndex.value}</span>
                    <Flower2 className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                      {ecosystemData.biodiversityIndex.status}
                    </Badge>
                    <span className="text-xs text-green-600">{ecosystemData.biodiversityIndex.trend}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600">Water Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">{ecosystemData.waterQuality.value}</span>
                    <Waves className="h-5 w-5 text-cyan-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-cyan-100 text-cyan-800 text-xs">
                      {ecosystemData.waterQuality.status}
                    </Badge>
                    <span className="text-xs text-green-600">{ecosystemData.waterQuality.trend}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Territory Map and Alerts */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Sacred Territory Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-80 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center border-2 border-dashed border-green-300">
                    <div className="text-center">
                      <Compass className="mx-auto h-12 w-12 text-green-600 mb-4" />
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Interactive Territory Map</h3>
                      <p className="text-green-600 mb-4">Real-time ecosystem monitoring across ancestral lands</p>
                      <Button className="bg-green-600 text-white hover:bg-green-700">
                        Launch Full Screen Map
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Territory Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80">
                    <div className="space-y-3">
                      {alerts.map((alert) => (
                        <div 
                          key={alert.id} 
                          className={`p-3 rounded-lg border ${
                            alert.type === 'critical' ? 'bg-red-50 border-red-200' :
                            alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                            'bg-blue-50 border-blue-200'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className={`font-medium text-sm ${
                              alert.type === 'critical' ? 'text-red-800' :
                              alert.type === 'warning' ? 'text-yellow-800' :
                              'text-blue-800'
                            }`}>
                              {alert.title}
                            </h4>
                            <span className="text-xs text-gray-500">{alert.time}</span>
                          </div>
                          <p className={`text-xs mb-2 ${
                            alert.type === 'critical' ? 'text-red-600' :
                            alert.type === 'warning' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`}>
                            {alert.location}
                          </p>
                          <p className={`text-xs ${
                            alert.type === 'critical' ? 'text-red-500' :
                            alert.type === 'warning' ? 'text-yellow-500' :
                            'text-blue-500'
                          }`}>
                            Action: {alert.action}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Traditional Knowledge Tab */}
          <TabsContent value="knowledge" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-emerald-800">Traditional Ecological Knowledge Hub</h2>
                <p className="text-emerald-600">Sacred wisdom preserved for future generations</p>
              </div>
              <Button className="bg-amber-600 text-white hover:bg-amber-700">
                <Plus className="h-4 w-4 mr-2" />
                Share Knowledge
              </Button>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 mb-6">
              <Card className="text-center">
                <CardContent className="p-4">
                  <Video className="mx-auto h-8 w-8 text-red-600 mb-2" />
                  <div className="text-2xl font-bold text-red-700">47</div>
                  <div className="text-sm text-red-600">Video Teachings</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <Mic className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                  <div className="text-2xl font-bold text-blue-700">123</div>
                  <div className="text-sm text-blue-600">Audio Stories</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <BookOpen className="mx-auto h-8 w-8 text-green-600 mb-2" />
                  <div className="text-2xl font-bold text-green-700">89</div>
                  <div className="text-sm text-green-600">Written Records</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <Globe className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                  <div className="text-2xl font-bold text-purple-700">12</div>
                  <div className="text-sm text-purple-600">Languages</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Knowledge Repository</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {knowledgeEntries.map((entry) => (
                    <div key={entry.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {entry.type === 'video' && <Video className="h-5 w-5 text-red-600" />}
                            {entry.type === 'audio' && <Mic className="h-5 w-5 text-blue-600" />}
                            {entry.type === 'document' && <BookOpen className="h-5 w-5 text-green-600" />}
                            <h3 className="font-semibold">{entry.title}</h3>
                            <Badge variant="outline" className="text-xs">{entry.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Contributed by {entry.contributor}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Language: {entry.language}</span>
                            <span>{entry.type === 'document' ? `${entry.pages} pages` : entry.duration}</span>
                            <span>{entry.views} views</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Sacred Council Discussions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>ES</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Elder Sarah Windsong</h4>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">
                            The seasonal ceremony approaches. We must prepare the sacred grounds and gather the 
                            traditional medicines. The ancestors speak of a significant spiritual event this season.
                          </p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              17 Respect
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              8 Responses
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>JC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Joseph Crow Feather</h4>
                            <span className="text-sm text-gray-500">6 hours ago</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">
                            Drone surveillance detected unusual activity near the sacred grove. 
                            Recommend increasing patrols and notifying the protection spirits through ceremony.
                          </p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              23 Respect
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              12 Responses
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Community Elders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>ES</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">Elder Sarah Windsong</p>
                          <p className="text-xs text-gray-500">Spiritual Guide</p>
                        </div>
                        <Badge className="ml-auto bg-gold text-gold-foreground text-xs">Online</Badge>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>JC</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">Joseph Crow Feather</p>
                          <p className="text-xs text-gray-500">Medicine Keeper</p>
                        </div>
                        <Badge className="ml-auto bg-green-100 text-green-800 text-xs">Active</Badge>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>AP</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">Ana Pumari</p>
                          <p className="text-xs text-gray-500">Water Keeper</p>
                        </div>
                        <Badge className="ml-auto bg-gray-100 text-gray-800 text-xs">Away</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sacred Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="border rounded p-2">
                        <h5 className="font-medium">Spring Equinox Ceremony</h5>
                        <p className="text-xs text-gray-500">March 20, 2024 • Dawn</p>
                      </div>
                      
                      <div className="border rounded p-2">
                        <h5 className="font-medium">Council of Elders Meeting</h5>
                        <p className="text-xs text-gray-500">March 25, 2024 • Full Moon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Restoration Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-emerald-800">Sacred Restoration Projects</h2>
                <p className="text-emerald-600">Healing Mother Earth through ancestral wisdom</p>
              </div>
              <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Initiate Project
              </Button>
            </div>

            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-emerald-500">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-emerald-800">{project.name}</h3>
                            <p className="text-emerald-600 flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {project.territory}
                            </p>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-800">
                            {project.category}
                          </Badge>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                          <h4 className="font-medium text-amber-800 mb-1">Cultural Significance</h4>
                          <p className="text-sm text-amber-700">{project.culturalSignificance}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Target:</span>
                            <span className="font-medium ml-2">{project.target}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Timeline:</span>
                            <span className="font-medium ml-2">{project.timeline}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Funding:</span>
                            <span className="font-medium ml-2">{project.funding}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Stewards:</span>
                            <span className="font-medium ml-2">{project.stewards}</span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Sacred Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-3" />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                              Join Project
                            </Button>
                            <Button variant="outline">
                              View Details
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" size="sm">
                              <Camera className="h-4 w-4 mr-1" />
                              Document
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
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

          {/* Recognition Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Sacred Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rewards.badges.map((badge, index) => (
                      <Card key={index} className={`relative overflow-hidden ${
                        badge.earned ? 'border-gold bg-gold/5' : 'border-muted opacity-60'
                      }`}>
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                            badge.earned ? 'bg-gold text-gold-foreground' : 'bg-muted'
                          }`}>
                            <Award className="h-6 w-6" />
                          </div>
                          <h3 className="font-bold mb-1">{badge.name}</h3>
                          
                          {!badge.earned && badge.progress && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>{badge.progress}%</span>
                                <span>100%</span>
                              </div>
                              <Progress value={badge.progress} className="h-2" />
                            </div>
                          )}
                          
                          {badge.earned && (
                            <Badge className="bg-gold text-gold-foreground">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Earned
                            </Badge>
                          )}
                          
                          <Badge 
                            variant="outline" 
                            className={`absolute top-2 right-2 text-xs ${
                              badge.rarity === 'legendary' ? 'border-purple-500 text-purple-700' :
                              badge.rarity === 'epic' ? 'border-orange-500 text-orange-700' :
                              'border-blue-500 text-blue-700'
                            }`}
                          >
                            {badge.rarity}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sacred Standing</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-emerald-700 mb-2">#{rewards.globalRank}</div>
                    <p className="text-emerald-600 mb-4">Global Ranking</p>
                    <div className="text-xl font-bold text-amber-700 mb-2">#{rewards.communityRank}</div>
                    <p className="text-amber-600 mb-4">Community Ranking</p>
                    <Badge className="bg-emerald-100 text-emerald-800">
                      {rewards.level}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sacred Points</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-gold mb-2">{rewards.totalPoints.toLocaleString()}</div>
                    <p className="text-muted-foreground mb-4">Total Sacred Points</p>
                    <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                      View Ceremony History
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Partnerships Tab */}
          <TabsContent value="partnerships" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-emerald-800">Sacred Alliances</h2>
                <p className="text-emerald-600">Collaborative partnerships honoring Indigenous sovereignty</p>
              </div>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Request Partnership
              </Button>
            </div>

            <div className="grid gap-6">
              {partnerships.map((partnership) => (
                <Card key={partnership.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <Building2 className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{partnership.organization}</h3>
                            <p className="text-sm text-gray-600">{partnership.type}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <Badge className="ml-2 bg-green-100 text-green-800">
                              {partnership.status}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-gray-500">Funding:</span>
                            <span className="font-medium ml-2">{partnership.funding}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <span className="font-medium ml-2">{partnership.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Agreement
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cultural Legacy Tab */}
          <TabsContent value="legacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive className="h-5 w-5" />
                  Ancestral Knowledge Ledger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Archive className="mx-auto h-16 w-16 text-amber-600 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-800 mb-2">Sacred Archive System</h3>
                  <p className="text-amber-600 mb-6 max-w-2xl mx-auto">
                    Immutable blockchain ledger preserving traditional ecological knowledge, 
                    governance practices, and ancestral teachings for future generations.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    <Card className="border-amber-200">
                      <CardContent className="p-4 text-center">
                        <BookOpen className="mx-auto h-8 w-8 text-amber-600 mb-2" />
                        <h4 className="font-medium text-amber-800">Teachings Archive</h4>
                        <p className="text-sm text-amber-600">Preserved wisdom</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-amber-200">
                      <CardContent className="p-4 text-center">
                        <Shield className="mx-auto h-8 w-8 text-amber-600 mb-2" />
                        <h4 className="font-medium text-amber-800">Blockchain Security</h4>
                        <p className="text-sm text-amber-600">Immutable records</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-amber-200">
                      <CardContent className="p-4 text-center">
                        <Heart className="mx-auto h-8 w-8 text-amber-600 mb-2" />
                        <h4 className="font-medium text-amber-800">Cultural Legacy</h4>
                        <p className="text-sm text-amber-600">Future generations</p>
                      </CardContent>
                    </Card>
                  </div>
                  <Button className="mt-6 bg-amber-600 text-white hover:bg-amber-700">
                    Access Sacred Archive
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IndigenousGuardianDashboard;
