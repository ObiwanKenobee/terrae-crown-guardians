import { Users, Shield, Globe, Heart, ArrowRight, Mail, MapPin, Crown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const JoinPact = () => {
  const pactRoles = [
    {
      icon: Shield,
      title: "Ecological Steward",
      description: "Lead local restoration projects and biodiversity protection",
      commitment: "6 months minimum",
      impact: "Direct ecosystem healing"
    },
    {
      icon: Globe,
      title: "Cultural Ambassador",
      description: "Bridge indigenous wisdom with modern conservation",
      commitment: "Ongoing basis",
      impact: "Knowledge preservation"
    },
    {
      icon: Heart,
      title: "Youth Fellow",
      description: "Next-generation leadership in regenerative governance",
      commitment: "1 year program",
      impact: "Future stewardship"
    },
    {
      icon: Crown,
      title: "Wisdom Keeper",
      description: "Elder guidance for community decision-making",
      commitment: "Advisory role",
      impact: "Generational knowledge"
    }
  ];

  return (
    <section id="join" className="py-20 bg-gradient-to-b from-background to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Users className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            Join the Pact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Become part of a global movement of stewards, partners, and youth fellows 
            working to protect Earth's crown jewels and restore our relationship with the living world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Roles */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl font-bold text-primary mb-8">Choose Your Path</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pactRoles.map((role, index) => (
                <Card key={index} className="group hover:shadow-earth transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-royal rounded-lg">
                        <role.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-primary">{role.title}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {role.commitment}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 mb-4">{role.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gold">{role.impact}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-earth">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-primary">Apply Now</CardTitle>
                <CardDescription>
                  Join thousands of stewards already protecting Earth's crown jewels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <Input placeholder="Your full name" className="mt-1" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input type="email" placeholder="your@email.com" className="mt-1" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Your bioregion" className="mt-1 pl-10" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground">Why join AEGIS?</label>
                    <Textarea 
                      placeholder="Share your vision for planetary regeneration..." 
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-royal text-primary-foreground hover:opacity-90 shadow-royal"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Submit Application
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  By applying, you commit to the principles of ecological dignity, 
                  cultural respect, and regenerative stewardship.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinPact;