import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Mountain, 
  TreePine, 
  Users, 
  Shield, 
  BookOpen,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Upload,
  Mic,
  Video
} from "lucide-react";

interface IndigenousGuardianSignupProps {
  onComplete?: (userData: any) => void;
  onBack?: () => void;
}

const IndigenousGuardianSignup = ({ onComplete, onBack }: IndigenousGuardianSignupProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    
    // Indigenous Community Information
    communityName: "",
    traditionalTerritory: "",
    language: "",
    elderContact: "",
    
    // Knowledge & Expertise
    traditionalKnowledgeAreas: [] as string[],
    stewardshipExperience: "",
    conservationGoals: [] as string[],
    
    // Verification
    verificationDocuments: [] as File[],
    elderRecommendation: "",
    
    // Agreements
    termsAccepted: false,
    culturalProtocolsAccepted: false,
    knowledgeSharingConsent: false
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const traditionalKnowledgeOptions = [
    "Forest Management & Fire Practices",
    "Water Conservation & Sacred Springs",
    "Traditional Medicine & Plant Knowledge",
    "Wildlife Tracking & Protection",
    "Seasonal Ceremonies & Timing",
    "Soil Health & Agricultural Practices",
    "Weather Prediction & Climate",
    "Sacred Site Maintenance",
    "Storytelling & Oral History",
    "Traditional Governance Systems"
  ];

  const conservationGoalOptions = [
    "Protect Sacred Sites",
    "Preserve Traditional Languages",
    "Document Elder Knowledge",
    "Train Younger Generations",
    "Restore Ancestral Practices",
    "Monitor Ecosystem Health",
    "Defend Land Rights",
    "Share Sustainable Practices",
    "Build Community Resilience",
    "Foster Cultural Revival"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack?.();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Mountain className="mx-auto h-12 w-12 text-amber-600 mb-4" />
              <h2 className="text-2xl font-bold text-amber-800">Sacred Registration</h2>
              <p className="text-amber-600">Begin your journey as an Indigenous Ecological Guardian</p>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <Input 
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email Address *</label>
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password *</label>
                <Input 
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a secure password"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password *</label>
                <Input 
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Users className="mx-auto h-12 w-12 text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-emerald-800">Community Connection</h2>
              <p className="text-emerald-600">Tell us about your Indigenous community and territory</p>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium">Community/Nation Name *</label>
                <Input 
                  value={formData.communityName}
                  onChange={(e) => handleInputChange('communityName', e.target.value)}
                  placeholder="e.g., Ojibwe Nation, Quechua Community"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Traditional Territory *</label>
                <Input 
                  value={formData.traditionalTerritory}
                  onChange={(e) => handleInputChange('traditionalTerritory', e.target.value)}
                  placeholder="e.g., Amazon Sacred Headwaters, Great Lakes Region"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Primary Indigenous Language</label>
                <Input 
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  placeholder="e.g., Quechua, Lakota, Inuktitut"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Elder/Community Leader Contact</label>
                <Input 
                  value={formData.elderContact}
                  onChange={(e) => handleInputChange('elderContact', e.target.value)}
                  placeholder="Name and contact of community elder for verification"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This helps us verify your community connection and ensures respectful engagement
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <BookOpen className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold text-purple-800">Traditional Knowledge & Goals</h2>
              <p className="text-purple-600">Share your areas of expertise and conservation aspirations</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Traditional Knowledge Areas</label>
                <div className="grid grid-cols-2 gap-2">
                  {traditionalKnowledgeOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox 
                        checked={formData.traditionalKnowledgeAreas.includes(option)}
                        onCheckedChange={() => handleArrayToggle('traditionalKnowledgeAreas', option)}
                      />
                      <label className="text-sm">{option}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Stewardship Experience</label>
                <Textarea 
                  value={formData.stewardshipExperience}
                  onChange={(e) => handleInputChange('stewardshipExperience', e.target.value)}
                  placeholder="Describe your experience in land stewardship, conservation, or traditional practices..."
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Conservation Goals</label>
                <div className="grid grid-cols-2 gap-2">
                  {conservationGoalOptions.map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox 
                        checked={formData.conservationGoals.includes(goal)}
                        onCheckedChange={() => handleArrayToggle('conservationGoals', goal)}
                      />
                      <label className="text-sm">{goal}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Shield className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-blue-800">Verification & Sacred Agreements</h2>
              <p className="text-blue-600">Final steps to protect cultural integrity and knowledge</p>
            </div>

            <div className="space-y-6">
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="text-lg text-amber-800">Community Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Elder Recommendation Letter</label>
                      <Textarea 
                        value={formData.elderRecommendation}
                        onChange={(e) => handleInputChange('elderRecommendation', e.target.value)}
                        placeholder="Letter or message from community elder confirming your role as a guardian..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Documents
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Record Video
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mic className="h-4 w-4 mr-2" />
                        Audio Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    checked={formData.culturalProtocolsAccepted}
                    onCheckedChange={(checked) => handleInputChange('culturalProtocolsAccepted', checked)}
                  />
                  <div>
                    <label className="text-sm font-medium">Cultural Protocols Agreement *</label>
                    <p className="text-xs text-muted-foreground">
                      I understand and agree to respect Indigenous cultural protocols, including appropriate 
                      sharing of traditional knowledge and sacred site information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    checked={formData.knowledgeSharingConsent}
                    onCheckedChange={(checked) => handleInputChange('knowledgeSharingConsent', checked)}
                  />
                  <div>
                    <label className="text-sm font-medium">Knowledge Sharing Consent *</label>
                    <p className="text-xs text-muted-foreground">
                      I consent to sharing appropriate traditional ecological knowledge through the platform, 
                      while maintaining control over sacred or sensitive information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)}
                  />
                  <div>
                    <label className="text-sm font-medium">Terms & Conditions *</label>
                    <p className="text-xs text-muted-foreground">
                      I accept the AEGIS Terms of Service and Indigenous Rights Protection Policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-amber-200">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-amber-800">Indigenous Ecological Guardian</CardTitle>
              <p className="text-sm text-amber-600">Step {currentStep} of {totalSteps}</p>
            </div>
            <Badge className="bg-amber-100 text-amber-800">Sacred Registration</Badge>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>

        <CardContent className="p-8">
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button 
              onClick={handleNext}
              className={currentStep === totalSteps ? "bg-green-600 text-white hover:bg-green-700" : ""}
            >
              {currentStep === totalSteps ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Sacred Registration
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {currentStep === totalSteps && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <p className="text-sm font-medium">
                  Ready to join the Indigenous Guardian community. Your registration will be reviewed 
                  by community elders to ensure cultural integrity and appropriate access.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IndigenousGuardianSignup;
