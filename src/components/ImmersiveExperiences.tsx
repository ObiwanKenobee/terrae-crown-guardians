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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { immersiveService } from '../services/immersiveService';
import type { VRExperience, ARExperience, ImmersiveLearningPath, VirtualFieldTrip } from '../types/immersive';
import { 
  Play, 
  Download, 
  Star, 
  Clock, 
  Users, 
  Globe, 
  Smartphone, 
  Headphones, 
  Camera, 
  MapPin, 
  Calendar,
  Trophy,
  Eye,
  Hand,
  Zap,
  BookOpen,
  Gamepad2,
  Video,
  Settings
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export function ImmersiveExperiences() {
  const [vrExperiences, setVRExperiences] = useState<VRExperience[]>([]);
  const [arExperiences, setARExperiences] = useState<ARExperience[]>([]);
  const [learningPaths, setLearningPaths] = useState<ImmersiveLearningPath[]>([]);
  const [fieldTrips, setFieldTrips] = useState<VirtualFieldTrip[]>([]);
  const [compatibility, setCompatibility] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState<VRExperience | ARExperience | null>(null);
  const [bookingTrip, setBookingTrip] = useState<VirtualFieldTrip | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [vrData, arData, pathsData, tripsData, compatData] = await Promise.all([
          immersiveService.getVRExperiences(),
          immersiveService.getARExperiences(),
          immersiveService.getLearningPaths(),
          immersiveService.getVirtualFieldTrips(),
          immersiveService.getDeviceCompatibility(navigator.userAgent)
        ]);
        setVRExperiences(vrData);
        setARExperiences(arData);
        setLearningPaths(pathsData);
        setFieldTrips(tripsData);
        setCompatibility(compatData);
      } catch (error) {
        toast({
          title: "Error loading experiences",
          description: "Failed to load immersive content",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'habitat_exploration': return <Globe className="h-4 w-4" />;
      case 'conservation_simulation': return <Settings className="h-4 w-4" />;
      case 'wildlife_encounter': return <Eye className="h-4 w-4" />;
      case 'species_identification': return <Camera className="h-4 w-4" />;
      case 'pollution_visualization': return <Zap className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const handleExperienceStart = async (experience: VRExperience | ARExperience, type: 'vr' | 'ar') => {
    try {
      const sessionId = await immersiveService.startExperienceSession('user-123', experience.id, type);
      toast({
        title: "Experience Started",
        description: `Loading ${experience.title}. Enjoy your immersive journey!`,
      });
      setSelectedExperience(experience);
    } catch (error) {
      toast({
        title: "Failed to start experience",
        description: "Please check your device compatibility and try again.",
        variant: "destructive"
      });
    }
  };

  const handleFieldTripBooking = async (trip: VirtualFieldTrip, participantInfo: any) => {
    try {
      const bookingId = await immersiveService.bookVirtualFieldTrip(trip.id, participantInfo);
      toast({
        title: "Field Trip Booked!",
        description: `Your booking ID is ${bookingId}. Check your email for details.`,
      });
      setBookingTrip(null);
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "Unable to complete booking. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
  };

  const formatFileSize = (mb: number) => {
    if (mb < 1024) return `${mb} MB`;
    return `${(mb / 1024).toFixed(1)} GB`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Immersive Conservation Experiences</h1>
          <p className="text-lg text-gray-600 mb-6">
            Step into nature with cutting-edge VR and AR technology. Experience ecosystems, learn conservation practices, and connect with wildlife like never before.
          </p>
          
          {compatibility && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Headphones className={`h-6 w-6 ${compatibility.vr_supported ? 'text-green-600' : 'text-gray-400'}`} />
                    <div className="ml-3">
                      <p className="text-sm font-medium">VR Compatible</p>
                      <p className="text-xs text-gray-600">
                        {compatibility.vr_supported ? 'Ready for VR experiences' : 'VR headset required'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Smartphone className={`h-6 w-6 ${compatibility.ar_supported ? 'text-green-600' : 'text-gray-400'}`} />
                    <div className="ml-3">
                      <p className="text-sm font-medium">AR Ready</p>
                      <p className="text-xs text-gray-600">
                        {compatibility.ar_supported ? 'AR experiences available' : 'Modern device required'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Download className="h-6 w-6 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium">Quick Setup</p>
                      <p className="text-xs text-gray-600">Apps available for all platforms</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <Tabs defaultValue="vr" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="vr">VR Experiences</TabsTrigger>
            <TabsTrigger value="ar">AR Experiences</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="trips">Virtual Field Trips</TabsTrigger>
            <TabsTrigger value="creator">Creator Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="vr" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Virtual Reality Experiences</h2>
              <Badge variant="outline">{vrExperiences.length} Available</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vrExperiences.map((experience) => (
                <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={experience.thumbnail_url} 
                      alt={experience.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={getDifficultyColor(experience.difficulty_level)}>
                        {experience.difficulty_level}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {getTypeIcon(experience.type)}
                        <span className="ml-1 capitalize">{experience.type.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{experience.title}</CardTitle>
                        <CardDescription className="mt-2">{experience.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{formatDuration(experience.duration_minutes)}</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{formatFileSize(experience.file_size_mb)}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{experience.user_ratings.average_rating}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Location: {experience.location_data.real_world_location}</p>
                      <div className="flex flex-wrap gap-1">
                        {experience.species_featured.slice(0, 3).map((species, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {species}
                          </Badge>
                        ))}
                        {experience.species_featured.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{experience.species_featured.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Downloads</span>
                        <span>{experience.usage_analytics.total_downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Completion Rate</span>
                        <span>{experience.usage_analytics.completion_rate}%</span>
                      </div>
                      <Progress value={experience.usage_analytics.completion_rate} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleExperienceStart(experience, 'vr')}
                        disabled={!compatibility?.vr_supported}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Experience
                      </Button>
                      <Button variant="outline" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>

                    {!compatibility?.vr_supported && (
                      <p className="text-xs text-orange-600">VR headset required for this experience</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ar" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Augmented Reality Experiences</h2>
              <Badge variant="outline">{arExperiences.length} Available</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {arExperiences.map((experience) => (
                <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          {getTypeIcon(experience.type)}
                          <span className="ml-2">{experience.title}</span>
                        </CardTitle>
                        <CardDescription className="mt-2">{experience.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {experience.target_environment}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Supported Devices</p>
                        <div className="flex gap-1 mt-1">
                          {experience.supported_devices.map((device, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {device}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Features</p>
                        <div className="flex gap-1 mt-1">
                          {experience.ar_features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature.feature_type.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Capabilities</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${experience.offline_capabilities ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          Offline Mode
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${experience.social_features.photo_sharing ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          Photo Sharing
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${experience.data_collection.citizen_science_integration ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          Citizen Science
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${experience.gamification_elements.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          Gamification
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleExperienceStart(experience, 'ar')}
                        disabled={!compatibility?.ar_supported}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Launch AR
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>

                    {!compatibility?.ar_supported && (
                      <p className="text-xs text-orange-600">Compatible mobile device required</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paths" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Learning Paths</h2>
              <Badge variant="outline">{learningPaths.length} Available</Badge>
            </div>
            <div className="space-y-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          <BookOpen className="h-5 w-5 mr-2" />
                          {path.title}
                        </CardTitle>
                        <CardDescription className="mt-2">{path.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {path.estimated_completion_hours}h total
                        </Badge>
                        {path.certification_offered && (
                          <Badge className="bg-purple-100 text-purple-800 block">
                            <Trophy className="h-3 w-3 mr-1" />
                            Certificate
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Target Audience</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {path.target_audience.map((audience, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {audience.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Enrollments</p>
                        <p className="font-semibold">{path.usage_stats.total_enrollments.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Completion Rate</p>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">{path.usage_stats.completion_rate}%</span>
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="ml-1">{path.usage_stats.average_rating}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Learning Objectives</h4>
                      <ul className="space-y-1">
                        {path.learning_objectives.map((objective, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Experience Sequence</h4>
                      <div className="space-y-2">
                        {path.experiences_sequence.map((exp, index) => (
                          <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                              {exp.order_position}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">Experience {exp.experience_id}</p>
                              <p className="text-xs text-gray-500 capitalize">{exp.experience_type} Experience</p>
                            </div>
                            {exp.is_required && (
                              <Badge variant="outline" className="text-xs">Required</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Start Learning Path
                      </Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trips" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Virtual Field Trips</h2>
              <Badge variant="outline">{fieldTrips.length} Available</Badge>
            </div>
            <div className="space-y-6">
              {fieldTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          <MapPin className="h-5 w-5 mr-2" />
                          {trip.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {trip.destination.name}, {trip.destination.real_world_location}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 mb-2">
                          ${trip.cost_per_participant}
                        </Badge>
                        <p className="text-sm text-gray-500">{trip.duration_hours}h duration</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Expert Guide</h4>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{trip.guide_info.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{trip.guide_info.name}</p>
                            <p className="text-xs text-gray-500">{trip.guide_info.credentials[0]}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Upcoming Dates</h4>
                        <div className="space-y-1">
                          {trip.scheduling.available_dates.slice(0, 2).map((date, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <Calendar className="h-3 w-3 mr-2 text-gray-500" />
                              {date.toLocaleDateString()}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Itinerary Highlights</h4>
                      <div className="space-y-2">
                        {trip.itinerary.map((stop, index) => (
                          <div key={index} className="flex items-start p-2 bg-gray-50 rounded-lg">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1">
                              {stop.stop_number}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{stop.location_name}</p>
                              <p className="text-xs text-gray-500">{stop.duration_minutes} minutes • {stop.activity_type.replace('_', ' ')}</p>
                              {stop.species_or_features_highlighted.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {stop.species_or_features_highlighted.slice(0, 2).map((feature, fIndex) => (
                                    <Badge key={fIndex} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Max Participants</p>
                        <p className="font-semibold">{trip.max_participants}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Group Discounts</p>
                        <p className="font-semibold">{trip.group_discounts[0]?.discount_percentage}% off (10+ people)</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Platform</p>
                        <p className="font-semibold">{trip.technical_setup.platform_used}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1" onClick={() => setBookingTrip(trip)}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Trip
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Book Virtual Field Trip</DialogTitle>
                            <DialogDescription>
                              Reserve your spot for {trip.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Preferred Date</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select date" />
                                </SelectTrigger>
                                <SelectContent>
                                  {trip.scheduling.available_dates.map((date, index) => (
                                    <SelectItem key={index} value={date.toISOString()}>
                                      {date.toLocaleDateString()}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Number of Participants</Label>
                              <Input type="number" min="1" max={trip.max_participants} defaultValue="1" />
                            </div>
                            <div>
                              <Label>Contact Email</Label>
                              <Input type="email" placeholder="your@email.com" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => handleFieldTripBooking(trip, {})}>
                              Confirm Booking
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creator" className="space-y-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Content Creation Tools</h2>
              <p className="text-lg text-gray-600 mb-8">
                Create your own immersive conservation experiences with our powerful, user-friendly tools.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Gamepad2 className="h-5 w-5 mr-2" />
                      EcoVR Builder
                    </CardTitle>
                    <CardDescription>Create immersive VR experiences without coding</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Ecosystem Templates</span>
                        <span className="text-sm font-semibold">25+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Species Models</span>
                        <span className="text-sm font-semibold">150+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Animation Presets</span>
                        <span className="text-sm font-semibold">80+</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      Start Creating
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Camera className="h-5 w-5 mr-2" />
                      AR Experience Studio
                    </CardTitle>
                    <CardDescription>Build augmented reality nature experiences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">AR Templates</span>
                        <span className="text-sm font-semibold">15+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">3D Assets</span>
                        <span className="text-sm font-semibold">200+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Interactive Elements</span>
                        <span className="text-sm font-semibold">40+</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      Launch Studio
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Community Showcase</h3>
                  <p className="text-gray-600 mb-6">
                    See amazing experiences created by educators, conservationists, and students worldwide.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold">Arctic Ice Melting VR</h4>
                      <p className="text-sm text-gray-600">Created by Climate Education Alliance</p>
                      <Badge className="mt-2">Featured</Badge>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold">Pollinator Garden AR</h4>
                      <p className="text-sm text-gray-600">Created by Green Schools Network</p>
                      <Badge variant="outline" className="mt-2">New</Badge>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold">Ocean Cleanup Simulation</h4>
                      <p className="text-sm text-gray-600">Created by Student Conservation Club</p>
                      <Badge variant="outline" className="mt-2">Popular</Badge>
                    </div>
                  </div>
                  <Button className="mt-6">
                    Browse Community
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
