import { MapPin, Users, Camera, Droplets, Brain, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const KenyaAccord = () => {
  const accordComponents = [
    {
      icon: Users,
      title: "Community Sovereignty",
      description: "Empowering Maasai & Kikuyu communities as biodiversity stewards",
      progress: 85
    },
    {
      icon: Camera,
      title: "AI Wildlife Monitoring",
      description: "Sensor networks tracking elephants, lions, and migratory patterns",
      progress: 72
    },
    {
      icon: Droplets,
      title: "Water System Restoration",
      description: "AEGIS BioCells regenerating Rift Valley watersheds",
      progress: 60
    },
    {
      icon: Brain,
      title: "Oral History Archive",
      description: "Preserving elder knowledge in the Royal Legacy Ledger",
      progress: 90
    },
    {
      icon: Heart,
      title: "Youth Leadership",
      description: "Digital governance training for future land stewards",
      progress: 78
    }
  ];

  return (
    <section id="kenya" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="mb-8">
              <MapPin className="w-12 h-12 text-gold mb-4" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
                The Kenya Accord
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                A flagship reconciliation ecology project in the Rift Valley, where Queen Elizabeth became monarch. 
                Now transforming imperial history into regenerative stewardship.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border mb-8">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Sacred Geography</h3>
              <p className="text-foreground/80 mb-4">
                "If Queen Elizabeth stood before the people of Earth today, how would she guide us to care for one another, and for the wild?"
              </p>
              <blockquote className="italic text-accent font-medium border-l-4 border-gold pl-4">
                "Through grace and service—not greed or conquest—we must build a future where the forest and the child, the lion and the leader, live as kin."
              </blockquote>
            </div>

            <Button size="lg" className="bg-gradient-earth text-foreground hover:opacity-90 shadow-earth">
              <MapPin className="mr-2 h-5 w-5" />
              View Live Dashboard
            </Button>
          </div>

          {/* Progress Cards */}
          <div className="space-y-6">
            {accordComponents.map((component, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm border border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-royal rounded-lg">
                        <component.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-primary">
                          {component.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {component.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gold">{component.progress}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-royal h-2 rounded-full transition-all duration-500"
                      style={{ width: `${component.progress}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KenyaAccord;