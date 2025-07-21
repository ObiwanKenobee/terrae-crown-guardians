import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown,
  Heart,
  Globe,
  Users,
  Leaf,
  TreePine,
  Fish,
  Mountain,
  Droplets,
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Camera,
  Upload,
  Phone,
  Mail,
  MapPin,
  Award,
  Target,
  Calendar,
  DollarSign,
  Bell,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  OnboardingData, 
  ECOLOGICAL_INTERESTS, 
  BIOREGIONS, 
  EXPERTISE_AREAS,
  USER_TYPE_LABELS,
  UserType 
} from "@/types/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const OnboardingFlow = ({ isOpen, onClose, onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    ecological_interests: [],
    preferred_bioregions: [],
    expertise: [],
    personal_goals: [],
    contribution_preferences: {
      donation_frequency: 'monthly',
      preferred_amount: 50,
      causes: []
    },
    communication_preferences: {
      email_updates: true,
      sms_updates: false,
      push_notifications: true,
      newsletter: true
    }
  });

  // Indigenous verification specific data
  const [indigenousData, setIndigenousData] = useState({
    community_name: '',
    elder_contact: '',
    traditional_knowledge_areas: [] as string[],
    language_spoken: '',
    verification_documents: [] as File[]
  });

  const { user, completeOnboarding, requestVerification } = useAuth();
  const { toast } = useToast();

  const totalSteps = user?.user_type === 'indigenous_guardian' ? 5 : 4;
  const progress = (currentStep / totalSteps) * 100;

  const isIndigenousUser = user?.user_type === 'indigenous_guardian';
  const isYouthUser = user?.user_type === 'youth_steward';
  const isCorporateUser = user?.user_type === 'corporate_partner';

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setOnboardingData(prev => ({
      ...prev,
      ecological_interests: prev.ecological_interests.includes(interest)
        ? prev.ecological_interests.filter(i => i !== interest)
        : [...prev.ecological_interests, interest]
    }));
  };

  const handleBioregionToggle = (bioregion: string) => {
    setOnboardingData(prev => ({
      ...prev,
      preferred_bioregions: prev.preferred_bioregions.includes(bioregion)
        ? prev.preferred_bioregions.filter(b => b !== bioregion)
        : [...prev.preferred_bioregions, bioregion]
    }));
  };

  const handleExpertiseToggle = (expertise: string) => {
    setOnboardingData(prev => ({
      ...prev,
      expertise: prev.expertise.includes(expertise)
        ? prev.expertise.filter(e => e !== expertise)
        : [...prev.expertise, expertise]
    }));
  };

  const handleGoalAdd = (goal: string) => {
    if (goal.trim() && !onboardingData.personal_goals.includes(goal)) {
      setOnboardingData(prev => ({
        ...prev,
        personal_goals: [...prev.personal_goals, goal]
      }));
    }
  };

  const handleGoalRemove = (goal: string) => {
    setOnboardingData(prev => ({
      ...prev,
      personal_goals: prev.personal_goals.filter(g => g !== goal)
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setIndigenousData(prev => ({
        ...prev,
        verification_documents: [...prev.verification_documents, ...fileArray]
      }));
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return onboardingData.ecological_interests.length > 0;
      case 2:
        return onboardingData.preferred_bioregions.length > 0;
      case 3:
        return onboardingData.expertise.length > 0 || onboardingData.personal_goals.length > 0;
      case 4:
        return true; // Preferences are optional
      case 5:
        if (isIndigenousUser) {
          return indigenousData.community_name.trim() !== '' && indigenousData.elder_contact.trim() !== '';
        }
        return true;
      default:
        return true;
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    setIsSubmitting(true);
    
    try {
      // Complete general onboarding
      const response = await completeOnboarding(onboardingData);
      
      if (response.success) {
        // If indigenous user, also submit verification request
        if (isIndigenousUser && indigenousData.community_name) {
          const verificationResponse = await requestVerification({
            user_id: user.id,
            verification_type: 'indigenous',
            elder_council_contact: indigenousData.elder_contact,
            traditional_knowledge_proof: indigenousData.traditional_knowledge_areas.join(', '),
            documents: indigenousData.verification_documents
          });

          if (verificationResponse.success) {
            toast({
              title: "Onboarding Complete!",
              description: "Your verification request has been submitted. You'll be contacted within 24-48 hours."
            });
          }
        } else {
          toast({
            title: "Welcome to AEGIS!",
            description: "Your profile has been set up successfully. Start your regenerative journey!"
          });
        }

        onComplete();
        onClose();
      } else {
        toast({
          title: "Error",
          description: response.error_message || "Failed to complete onboarding",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <Heart className="h-5 w-5" />;
      case 2: return <Globe className="h-5 w-5" />;
      case 3: return <Award className="h-5 w-5" />;
      case 4: return <Bell className="h-5 w-5" />;
      case 5: return <Shield className="h-5 w-5" />;
      default: return <Crown className="h-5 w-5" />;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Your Interests";
      case 2: return "Focus Areas";
      case 3: return "Expertise & Goals";
      case 4: return "Preferences";
      case 5: return "Verification";
      default: return "Setup";
    }
  };

  const predefinedGoals = [
    "Plant 1,000 trees this year",
    "Support 5 indigenous communities",
    "Offset 10 tons of CO₂",
    "Restore 2 hectares of forest",
    "Protect endangered species habitat",
    "Build sustainable water systems",
    "Mentor youth activists",
    "Advocate for policy change"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Crown className="h-6 w-6 text-primary" />
            Welcome to AEGIS, {user?.full_name}!
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">{USER_TYPE_LABELS[user?.user_type || 'individual_steward']}</Badge>
            <span>•</span>
            <span>Step {currentStep} of {totalSteps}</span>
          </div>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Getting started</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        {/* Step 1: Ecological Interests */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">What ecological causes inspire you?</h3>
              <p className="text-muted-foreground">
                Select the environmental areas you care most about. This helps us personalize your experience.
              </p>
            </div>

            <div className="grid gap-3">
              {ECOLOGICAL_INTERESTS.map((interest) => (
                <Card 
                  key={interest}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    onboardingData.ecological_interests.includes(interest) 
                      ? 'border-primary bg-primary/5' 
                      : ''
                  }`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Leaf className="h-5 w-5 text-primary" />
                        <span className="font-medium">{interest}</span>
                      </div>
                      {onboardingData.ecological_interests.includes(interest) && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Selected: {onboardingData.ecological_interests.length} interests
            </div>
          </div>
        )}

        {/* Step 2: Bioregions */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <Globe className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Which bioregions would you like to support?</h3>
              <p className="text-muted-foreground">
                Choose the crown bioregions where you'd like to focus your conservation efforts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {BIOREGIONS.map((bioregion) => (
                <Card 
                  key={bioregion}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    onboardingData.preferred_bioregions.includes(bioregion) 
                      ? 'border-primary bg-primary/5' 
                      : ''
                  }`}
                  onClick={() => handleBioregionToggle(bioregion)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mountain className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{bioregion}</div>
                        </div>
                      </div>
                      {onboardingData.preferred_bioregions.includes(bioregion) && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Selected: {onboardingData.preferred_bioregions.length} bioregions
            </div>
          </div>
        )}

        {/* Step 3: Expertise & Goals */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <Award className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your Expertise & Goals</h3>
              <p className="text-muted-foreground">
                Share your skills and set conservation goals to connect with like-minded stewards.
              </p>
            </div>

            <Tabs defaultValue="expertise" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="expertise">My Expertise</TabsTrigger>
                <TabsTrigger value="goals">Personal Goals</TabsTrigger>
              </TabsList>

              <TabsContent value="expertise" className="space-y-4">
                <div className="grid gap-2">
                  {EXPERTISE_AREAS.map((expertise) => (
                    <Card 
                      key={expertise}
                      className={`cursor-pointer transition-all hover:shadow-sm ${
                        onboardingData.expertise.includes(expertise) 
                          ? 'border-primary bg-primary/5' 
                          : ''
                      }`}
                      onClick={() => handleExpertiseToggle(expertise)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{expertise}</span>
                          {onboardingData.expertise.includes(expertise) && (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="goals" className="space-y-4">
                <div>
                  <Label>Select from common goals:</Label>
                  <div className="grid gap-2 mt-2">
                    {predefinedGoals.map((goal) => (
                      <Card 
                        key={goal}
                        className={`cursor-pointer transition-all hover:shadow-sm ${
                          onboardingData.personal_goals.includes(goal) 
                            ? 'border-primary bg-primary/5' 
                            : ''
                        }`}
                        onClick={() => 
                          onboardingData.personal_goals.includes(goal) 
                            ? handleGoalRemove(goal)
                            : handleGoalAdd(goal)
                        }
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">{goal}</span>
                            </div>
                            {onboardingData.personal_goals.includes(goal) && (
                              <CheckCircle className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {onboardingData.personal_goals.length > 0 && (
                  <div>
                    <Label>Your Goals:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {onboardingData.personal_goals.map((goal) => (
                        <Badge 
                          key={goal} 
                          variant="secondary" 
                          className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleGoalRemove(goal)}
                        >
                          {goal} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Step 4: Preferences */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <Bell className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Communication & Contribution Preferences</h3>
              <p className="text-muted-foreground">
                Customize how you'd like to engage with AEGIS and contribute to conservation efforts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Contribution Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Contribution Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="donation_frequency">Preferred Donation Frequency</Label>
                    <Select 
                      value={onboardingData.contribution_preferences.donation_frequency} 
                      onValueChange={(value: 'one_time' | 'monthly' | 'quarterly' | 'annually') => 
                        setOnboardingData(prev => ({
                          ...prev,
                          contribution_preferences: {
                            ...prev.contribution_preferences,
                            donation_frequency: value
                          }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one_time">One-time</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="preferred_amount">Preferred Amount (USD)</Label>
                    <Input
                      id="preferred_amount"
                      type="number"
                      value={onboardingData.contribution_preferences.preferred_amount}
                      onChange={(e) => 
                        setOnboardingData(prev => ({
                          ...prev,
                          contribution_preferences: {
                            ...prev.contribution_preferences,
                            preferred_amount: parseInt(e.target.value) || 0
                          }
                        }))
                      }
                      min="1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Communication Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Communication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email_updates"
                        checked={onboardingData.communication_preferences.email_updates}
                        onCheckedChange={(checked) => 
                          setOnboardingData(prev => ({
                            ...prev,
                            communication_preferences: {
                              ...prev.communication_preferences,
                              email_updates: checked as boolean
                            }
                          }))
                        }
                      />
                      <Label htmlFor="email_updates">Email updates</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="push_notifications"
                        checked={onboardingData.communication_preferences.push_notifications}
                        onCheckedChange={(checked) => 
                          setOnboardingData(prev => ({
                            ...prev,
                            communication_preferences: {
                              ...prev.communication_preferences,
                              push_notifications: checked as boolean
                            }
                          }))
                        }
                      />
                      <Label htmlFor="push_notifications">Push notifications</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={onboardingData.communication_preferences.newsletter}
                        onCheckedChange={(checked) => 
                          setOnboardingData(prev => ({
                            ...prev,
                            communication_preferences: {
                              ...prev.communication_preferences,
                              newsletter: checked as boolean
                            }
                          }))
                        }
                      />
                      <Label htmlFor="newsletter">Monthly newsletter</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sms_updates"
                        checked={onboardingData.communication_preferences.sms_updates}
                        onCheckedChange={(checked) => 
                          setOnboardingData(prev => ({
                            ...prev,
                            communication_preferences: {
                              ...prev.communication_preferences,
                              sms_updates: checked as boolean
                            }
                          }))
                        }
                      />
                      <Label htmlFor="sms_updates">SMS updates</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 5: Indigenous Verification (only for indigenous users) */}
        {currentStep === 5 && isIndigenousUser && (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Indigenous Community Verification</h3>
              <p className="text-muted-foreground">
                Help us verify your connection to indigenous knowledge and community leadership.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="community_name">Community/Nation Name *</Label>
                <Input
                  id="community_name"
                  value={indigenousData.community_name}
                  onChange={(e) => setIndigenousData(prev => ({ ...prev, community_name: e.target.value }))}
                  placeholder="e.g., Maasai Community, Amazon Achuar Nation"
                />
              </div>

              <div>
                <Label htmlFor="elder_contact">Elder or Community Leader Contact *</Label>
                <Input
                  id="elder_contact"
                  value={indigenousData.elder_contact}
                  onChange={(e) => setIndigenousData(prev => ({ ...prev, elder_contact: e.target.value }))}
                  placeholder="Email or phone number of community elder/leader"
                />
              </div>

              <div>
                <Label htmlFor="language_spoken">Traditional Language(s) Spoken</Label>
                <Input
                  id="language_spoken"
                  value={indigenousData.language_spoken}
                  onChange={(e) => setIndigenousData(prev => ({ ...prev, language_spoken: e.target.value }))}
                  placeholder="e.g., Kiswahili, Quechua, Inuktitut"
                />
              </div>

              <div>
                <Label>Areas of Traditional Knowledge</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    'Medicinal Plants',
                    'Sustainable Agriculture',
                    'Wildlife Management',
                    'Water Conservation',
                    'Forest Stewardship',
                    'Climate Patterns',
                    'Sacred Site Protection',
                    'Community Governance'
                  ].map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={indigenousData.traditional_knowledge_areas.includes(area)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIndigenousData(prev => ({
                              ...prev,
                              traditional_knowledge_areas: [...prev.traditional_knowledge_areas, area]
                            }));
                          } else {
                            setIndigenousData(prev => ({
                              ...prev,
                              traditional_knowledge_areas: prev.traditional_knowledge_areas.filter(a => a !== area)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={area} className="text-sm">{area}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="verification_docs">Supporting Documents (Optional)</Label>
                <div className="mt-2 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file_upload"
                  />
                  <label htmlFor="file_upload" className="cursor-pointer">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload community documents, certifications, or photos
                      </p>
                    </div>
                  </label>
                </div>
                {indigenousData.verification_documents.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Uploaded files:</p>
                    <ul className="text-xs text-muted-foreground">
                      {indigenousData.verification_documents.map((file, index) => (
                        <li key={index}>• {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Verification Process</h4>
                <p className="text-blue-700 text-sm">
                  Our team will respectfully verify your indigenous community connection within 24-48 hours. 
                  We may contact the elder/leader you've provided for confirmation. Your traditional knowledge 
                  and cultural autonomy will be fully protected throughout this process.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!validateCurrentStep()}
              className="bg-gradient-royal text-primary-foreground hover:opacity-90"
            >
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!validateCurrentStep() || isSubmitting}
              className="bg-gradient-royal text-primary-foreground hover:opacity-90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Completing...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Complete Setup
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingFlow;
