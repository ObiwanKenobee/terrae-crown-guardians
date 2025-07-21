import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, Heart, Globe, Leaf, Shield, Crown } from "lucide-react";

interface ApplicationData {
  applicant_type: string;
  organization_name: string;
  contact_name: string;
  email: string;
  location: string;
  bio_region_focus: string;
  contribution_type: string[];
  experience_level: string;
  resources_available: string;
  specific_interests: string[];
  commitment_level: string;
  indigenous_partnership: boolean;
  youth_leadership: boolean;
  additional_info: string;
}

const PactApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationData>({
    applicant_type: '',
    organization_name: '',
    contact_name: '',
    email: '',
    location: '',
    bio_region_focus: '',
    contribution_type: [],
    experience_level: '',
    resources_available: '',
    specific_interests: [],
    commitment_level: '',
    indigenous_partnership: false,
    youth_leadership: false,
    additional_info: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const bioregions = [
    'Amazon Sacred Headwaters',
    'Congo Basin',
    'Himalayan Transboundary',
    'Great Barrier Reef',
    'Maasai Mara Ecosystem',
    'Arctic Tundra',
    'Patagonian Grasslands',
    'Boreal Forest',
    'Mediterranean Basin',
    'Sahara-Sahel Transition'
  ];

  const contributionTypes = [
    'Financial Support',
    'Technical Expertise',
    'Community Organizing',
    'Scientific Research',
    'Traditional Knowledge',
    'Youth Education',
    'Policy Advocacy',
    'Cultural Preservation',
    'Restoration Projects',
    'Technology Development'
  ];

  const specificInterests = [
    'Wildlife Protection',
    'Forest Conservation',
    'Marine Ecosystems',
    'Indigenous Rights',
    'Climate Action',
    'Biodiversity Research',
    'Sustainable Agriculture',
    'Renewable Energy',
    'Water Conservation',
    'Community Development',
    'Cultural Heritage',
    'Youth Empowerment'
  ];

  const handleContributionTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        contribution_type: [...prev.contribution_type, type]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        contribution_type: prev.contribution_type.filter(t => t !== type)
      }));
    }
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        specific_interests: [...prev.specific_interests, interest]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        specific_interests: prev.specific_interests.filter(i => i !== interest)
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for joining the AEGIS Pact. We'll review your application and contact you soon."
      });

      // Reset form
      setCurrentStep(1);
      setFormData({
        applicant_type: '',
        organization_name: '',
        contact_name: '',
        email: '',
        location: '',
        bio_region_focus: '',
        contribution_type: [],
        experience_level: '',
        resources_available: '',
        specific_interests: [],
        commitment_level: '',
        indigenous_partnership: false,
        youth_leadership: false,
        additional_info: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.applicant_type && formData.contact_name && formData.email && formData.location;
      case 2:
        return formData.bio_region_focus && formData.contribution_type.length > 0;
      case 3:
        return formData.experience_level && formData.commitment_level;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <Crown className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-bold text-primary mb-4">Join the AEGIS Pact</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Become a Sovereign Steward and join our global community of regenerative guardians protecting Earth's crown bioregions.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {currentStep === 1 && <Users className="h-5 w-5" />}
            {currentStep === 2 && <Globe className="h-5 w-5" />}
            {currentStep === 3 && <Heart className="h-5 w-5" />}
            {currentStep === 4 && <Shield className="h-5 w-5" />}
            Step {currentStep} of 4: {
              currentStep === 1 ? 'Personal Information' :
              currentStep === 2 ? 'Bioregion Focus & Contributions' :
              currentStep === 3 ? 'Experience & Commitment' :
              'Partnership & Additional Information'
            }
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicant_type">Applicant Type</Label>
                  <Select value={formData.applicant_type} onValueChange={(value) => setFormData(prev => ({ ...prev, applicant_type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Steward</SelectItem>
                      <SelectItem value="organization">Organization</SelectItem>
                      <SelectItem value="community">Community Group</SelectItem>
                      <SelectItem value="indigenous">Indigenous Community</SelectItem>
                      <SelectItem value="youth">Youth Organization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(formData.applicant_type === 'organization' || formData.applicant_type === 'community') && (
                  <div>
                    <Label htmlFor="organization_name">Organization Name</Label>
                    <Input
                      id="organization_name"
                      value={formData.organization_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, organization_name: e.target.value }))}
                      placeholder="Enter organization name"
                    />
                  </div>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_name">Contact Name *</Label>
                  <Input
                    id="contact_name"
                    value={formData.contact_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact_name: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, Country / Bioregion"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Bioregion Focus & Contributions */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="bio_region_focus">Primary Bioregion Focus *</Label>
                <Select value={formData.bio_region_focus} onValueChange={(value) => setFormData(prev => ({ ...prev, bio_region_focus: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bioregion" />
                  </SelectTrigger>
                  <SelectContent>
                    {bioregions.map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>How would you like to contribute? (Select all that apply) *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {contributionTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={formData.contribution_type.includes(type)}
                        onCheckedChange={(checked) => handleContributionTypeChange(type, checked as boolean)}
                      />
                      <Label htmlFor={type} className="text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
                {formData.contribution_type.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.contribution_type.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="resources_available">Resources Available</Label>
                <Textarea
                  id="resources_available"
                  value={formData.resources_available}
                  onChange={(e) => setFormData(prev => ({ ...prev, resources_available: e.target.value }))}
                  placeholder="Describe any resources, skills, or assets you can contribute..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 3: Experience & Commitment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label>Experience Level in Conservation/Regeneration *</Label>
                <RadioGroup
                  value={formData.experience_level}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, experience_level: value }))}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner - New to conservation work</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate - Some experience in environmental projects</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced - Significant experience in conservation/regeneration</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expert" id="expert" />
                    <Label htmlFor="expert">Expert - Professional or lifelong dedication to this work</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Commitment Level *</Label>
                <RadioGroup
                  value={formData.commitment_level}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, commitment_level: value }))}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="supporter" id="supporter" />
                    <Label htmlFor="supporter">Supporter - Occasional participation and donations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active">Active Steward - Regular participation in projects</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dedicated" id="dedicated" />
                    <Label htmlFor="dedicated">Dedicated Guardian - Significant time and resources</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sovereign" id="sovereign" />
                    <Label htmlFor="sovereign">Sovereign Steward - Leadership role in governance</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Specific Areas of Interest (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {specificInterests.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.specific_interests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      />
                      <Label htmlFor={interest} className="text-sm">{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Partnership & Additional Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="indigenous_partnership"
                    checked={formData.indigenous_partnership}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, indigenous_partnership: checked as boolean }))}
                  />
                  <Label htmlFor="indigenous_partnership">
                    I am interested in working with indigenous communities and respecting traditional knowledge systems
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="youth_leadership"
                    checked={formData.youth_leadership}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, youth_leadership: checked as boolean }))}
                  />
                  <Label htmlFor="youth_leadership">
                    I am interested in supporting youth leadership and intergenerational collaboration
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="additional_info">Additional Information</Label>
                <Textarea
                  id="additional_info"
                  value={formData.additional_info}
                  onChange={(e) => setFormData(prev => ({ ...prev, additional_info: e.target.value }))}
                  placeholder="Share anything else about your vision, experience, or questions about joining the AEGIS Pact..."
                  rows={4}
                />
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Pact Commitment
                </h4>
                <p className="text-sm text-muted-foreground">
                  By joining the AEGIS Pact, you commit to respecting indigenous sovereignty, supporting youth leadership, 
                  practicing regenerative principles, and collaborating transparently with our global community of stewards. 
                  Together, we protect Earth's crown bioregions with wisdom, integrity, and love.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="bg-gradient-royal text-primary-foreground hover:opacity-90"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-royal text-primary-foreground hover:opacity-90"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PactApplicationForm;