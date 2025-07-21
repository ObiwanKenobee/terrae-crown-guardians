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
  Video
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { blockchainService } from "@/services/blockchainService";
import { gamificationService } from "@/services/gamificationService";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [impactData, setImpactData] = useState({
    treesPlanted: 2847,
    hectaresRestored: 156,
    waterRestored: 45000,
    communitiesSupported: 12,
    carbonOffset: 89.5
  });
  const [userLevel, setUserLevel] = useState({
    level: 12,
    experience: 8950,
    nextLevelExp: 10000,
    rank: 234
  });
  const [timelineEvents, setTimelineEvents] = useState([
    {
      id: 1,
      date: "2024-01-15",
      type: "tree_planting",
      title: "Planted 50 trees in Kenya",
      description: "Contributed to the Rift Valley reforestation project",
      impact: "+50 trees, +2.5 hectares",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      date: "2024-01-10",
      type: "water_restoration",
      title: "Water system restored",
      description: "Helped restore water access for Maasai community",
      impact: "+5,000L water/day",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      date: "2024-01-05",
      title: "Achievement unlocked",
      type: "achievement",
      description: "Earned 'Forest Guardian' badge",
      impact: "Level 12 reached",
      badge: "forest_guardian"
    }
  ]);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Rift Valley Reforestation",
      location: "Kenya",
      progress: 78,
      participants: 1247,
      target: "10,000 trees",
      category: "Reforestation",
      urgency: "high",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Amazon BioCells Initiative",
      location: "Brazil",
      progress: 45,
      participants: 892,
      target: "500 hectares",
      category: "Water Restoration",
      urgency: "medium",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Coral Reef Protection",
      location: "Australia",
      progress: 92,
      participants: 2156,
      target: "50 km² reef",
      category: "Marine Protection",
      urgency: "critical",
      image: "/placeholder.svg"
    }
  ]);
  const [feedPosts, setFeedPosts] = useState([
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "/placeholder.svg",
      time: "2 hours ago",
      content: "Just completed my 100th tree planting! The forest is really starting to take shape. Check out these before/after photos from the Kenyan site.",
      image: "/placeholder.svg",
      likes: 42,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      author: "Miguel Rodriguez",
      avatar: "/placeholder.svg",
      time: "5 hours ago",
      content: "Amazing water restoration results in our Brazil project! The community now has access to clean water for the first time in years. 💧🌱",
      likes: 67,
      comments: 12,
      shares: 7
    }
  ]);
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      name: "Forest Guardian",
      description: "Plant 1,000 trees",
      progress: 2847,
      target: 1000,
      completed: true,
      icon: "TreePine",
      rarity: "epic"
    },
    {
      id: 2,
      name: "Water Protector",
      description: "Restore 50,000L of water access",
      progress: 45000,
      target: 50000,
      completed: false,
      icon: "Droplets",
      rarity: "rare"
    },
    {
      id: 3,
      name: "Community Builder",
      description: "Support 10 communities",
      progress: 12,
      target: 10,
      completed: true,
      icon: "Users",
      rarity: "uncommon"
    }
  ]);
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: "Emma Thompson", score: 15420, badge: "Global Champion" },
    { rank: 2, name: "David Park", score: 12890, badge: "Eco Warrior" },
    { rank: 3, name: "Lisa Garcia", score: 11750, badge: "Nature Guardian" },
    { rank: 4, name: "You", score: 8950, badge: "Forest Guardian" },
    { rank: 5, name: "John Smith", score: 8200, badge: "Tree Planter" }
  ]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground mb-4">
              Please log in to access your Steward Dashboard
            </p>
            <Button>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Steward Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.full_name}! Continue your regenerative journey.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="impact">My Impact</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Trees Planted</p>
                      <p className="text-2xl font-bold text-green-800">{impactData.treesPlanted.toLocaleString()}</p>
                    </div>
                    <TreePine className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Hectares Restored</p>
                      <p className="text-2xl font-bold text-blue-800">{impactData.hectaresRestored}</p>
                    </div>
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-cyan-700">Water Restored</p>
                      <p className="text-2xl font-bold text-cyan-800">{(impactData.waterRestored / 1000).toFixed(1)}k L</p>
                    </div>
                    <Droplets className="h-8 w-8 text-cyan-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Communities</p>
                      <p className="text-2xl font-bold text-purple-800">{impactData.communitiesSupported}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Carbon Offset</p>
                      <p className="text-2xl font-bold text-orange-800">{impactData.carbonOffset}t</p>
                    </div>
                    <Leaf className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Level Progress and Quick Actions */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Level {userLevel.level} - Forest Guardian</h3>
                      <p className="text-muted-foreground">Global Rank #{userLevel.rank}</p>
                    </div>
                    <Badge className="bg-gold text-gold-foreground">
                      {userLevel.experience} XP
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to Level {userLevel.level + 1}</span>
                      <span>{userLevel.experience} / {userLevel.nextLevelExp} XP</span>
                    </div>
                    <Progress value={(userLevel.experience / userLevel.nextLevelExp) * 100} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Join Project
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Progress
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48">
                    <div className="space-y-3">
                      {timelineEvents.slice(0, 3).map((event) => (
                        <div key={event.id} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground">{event.impact}</p>
                            <p className="text-xs text-muted-foreground">{event.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Impact Tab */}
          <TabsContent value="impact" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Impact Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96">
                      <div className="space-y-6">
                        {timelineEvents.map((event, index) => (
                          <div key={event.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-3 h-3 bg-primary rounded-full" />
                              {index < timelineEvents.length - 1 && (
                                <div className="w-px h-16 bg-border mt-2" />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold">{event.title}</h4>
                                  <p className="text-sm text-muted-foreground">{event.description}</p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {event.date}
                                </Badge>
                              </div>
                              {event.image && (
                                <div className="w-full h-32 bg-muted rounded-lg mb-2 flex items-center justify-center">
                                  <Camera className="h-8 w-8 text-muted-foreground" />
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Badge className="bg-green-100 text-green-800">
                                  {event.impact}
                                </Badge>
                                {event.badge && (
                                  <Badge className="bg-gold text-gold-foreground">
                                    Badge Earned
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Impact Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Projects</span>
                        <span className="font-medium">7</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Active Projects</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Completed Goals</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Days Active</span>
                        <span className="font-medium">89</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Plant 3,000 trees</span>
                          <span>95%</span>
                        </div>
                        <Progress value={95} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Reach Level 15</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Support 15 communities</span>
                          <span>80%</span>
                        </div>
                        <Progress value={80} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Ecological Projects</h2>
                <p className="text-muted-foreground">Discover and join regenerative projects worldwide</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Map className="h-4 w-4 mr-2" />
                  Map View
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-1">
                        <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                          <Camera className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{project.name}</h3>
                            <p className="text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {project.location}
                            </p>
                          </div>
                          <Badge 
                            className={
                              project.urgency === 'critical' ? 'bg-red-100 text-red-800' :
                              project.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                              'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {project.urgency}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Target: {project.target} • Category: {project.category}
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} />
                          <p className="text-xs text-muted-foreground">
                            {project.participants.toLocaleString()} stewards participating
                          </p>
                        </div>
                      </div>
                      <div className="lg:col-span-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <Badge variant="outline" className="w-fit">
                            {project.category}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <Button className="w-full">
                            Join Project
                          </Button>
                          <Button variant="outline" className="w-full">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Global Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboard.map((entry, index) => (
                        <div 
                          key={entry.rank} 
                          className={`flex items-center gap-4 p-3 rounded-lg ${
                            entry.name === 'You' ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                            entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                            entry.rank === 2 ? 'bg-gray-100 text-gray-800' :
                            entry.rank === 3 ? 'bg-orange-100 text-orange-800' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {entry.rank}
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>{entry.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{entry.name}</p>
                                <Badge variant="outline" className="text-xs">
                                  {entry.badge}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{entry.score.toLocaleString()} XP</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Rank</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">#{userLevel.rank}</div>
                    <p className="text-muted-foreground mb-4">Global Position</p>
                    <Badge className="bg-gold text-gold-foreground">
                      Forest Guardian
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Challenge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <h4 className="font-semibold">Plant 100 Trees</h4>
                      <p className="text-sm text-muted-foreground">Ends in 3 days</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>47/100</span>
                      </div>
                      <Progress value={47} />
                    </div>
                    <Button className="w-full mt-4">
                      Participate
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Community Feed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Create Post */}
                    <div className="border rounded-lg p-4 mb-6">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>{user?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea placeholder="Share your regenerative journey..." className="mb-3" />
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Image className="h-4 w-4 mr-2" />
                                Photo
                              </Button>
                              <Button variant="outline" size="sm">
                                <Video className="h-4 w-4 mr-2" />
                                Video
                              </Button>
                            </div>
                            <Button size="sm">
                              <Send className="h-4 w-4 mr-2" />
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feed Posts */}
                    <div className="space-y-6">
                      {feedPosts.map((post) => (
                        <div key={post.id} className="border rounded-lg p-4">
                          <div className="flex gap-3 mb-3">
                            <Avatar>
                              <AvatarImage src={post.avatar} />
                              <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{post.author}</h4>
                                <span className="text-sm text-muted-foreground">{post.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{post.content}</p>
                            </div>
                          </div>
                          
                          {post.image && (
                            <div className="w-full h-48 bg-muted rounded-lg mb-3 flex items-center justify-center">
                              <Camera className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between pt-3 border-t">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-2" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4 mr-2" />
                              {post.shares}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-3">
                        <h5 className="font-semibold text-sm">Global Tree Planting Day</h5>
                        <p className="text-xs text-muted-foreground">March 21, 2024</p>
                        <Badge variant="outline" className="text-xs mt-1">Virtual Event</Badge>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h5 className="font-semibold text-sm">Kenya Site Visit</h5>
                        <p className="text-xs text-muted-foreground">April 15, 2024</p>
                        <Badge variant="outline" className="text-xs mt-1">In-Person</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Active Discussions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <h5 className="font-medium">Best practices for reforestation</h5>
                        <p className="text-muted-foreground text-xs">24 replies</p>
                      </div>
                      <div className="text-sm">
                        <h5 className="font-medium">Water conservation techniques</h5>
                        <p className="text-muted-foreground text-xs">18 replies</p>
                      </div>
                      <div className="text-sm">
                        <h5 className="font-medium">Community engagement strategies</h5>
                        <p className="text-muted-foreground text-xs">31 replies</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`relative overflow-hidden ${
                  achievement.completed ? 'border-gold bg-gold/5' : 'border-muted'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      achievement.completed ? 'bg-gold text-gold-foreground' : 'bg-muted'
                    }`}>
                      {achievement.icon === 'TreePine' && <TreePine className="h-8 w-8" />}
                      {achievement.icon === 'Droplets' && <Droplets className="h-8 w-8" />}
                      {achievement.icon === 'Users' && <Users className="h-8 w-8" />}
                    </div>
                    <h3 className="font-bold mb-2">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    
                    {!achievement.completed && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>{achievement.progress.toLocaleString()}</span>
                          <span>{achievement.target.toLocaleString()}</span>
                        </div>
                        <Progress value={(achievement.progress / achievement.target) * 100} />
                      </div>
                    )}
                    
                    {achievement.completed && (
                      <Badge className="bg-gold text-gold-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    
                    <Badge 
                      variant="outline" 
                      className={`absolute top-2 right-2 text-xs ${
                        achievement.rarity === 'epic' ? 'border-purple-500 text-purple-700' :
                        achievement.rarity === 'rare' ? 'border-blue-500 text-blue-700' :
                        'border-green-500 text-green-700'
                      }`}
                    >
                      {achievement.rarity}
                    </Badge>
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
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-xl">{user?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{user?.full_name}</h3>
                      <p className="text-muted-foreground">{user?.email}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Change Avatar
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm font-medium">Display Name</label>
                      <Input defaultValue={user?.full_name} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Bio</label>
                      <Textarea placeholder="Tell the community about your regenerative journey..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <Input placeholder="Your location" />
                    </div>
                  </div>

                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
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
                      <label className="text-sm">Achievement Unlocked</label>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Community Messages</label>
                      <input type="checkbox" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Weekly Reports</label>
                      <input type="checkbox" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Privacy Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Public Profile</label>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Show Impact Stats</label>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Allow Messages</label>
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

export default Dashboard;
