import { Globe, TreePine, Mountain, Waves, Eye, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CrownBioregions = () => {
  const bioregions = [
    {
      name: "Himalayan Crown",
      location: "Nepal, Bhutan, India",
      icon: Mountain,
      description: "Sacred peaks where earth meets sky, home to ancient monasteries and snow leopards",
      status: "Protected",
      species: "250+ endemic species"
    },
    {
      name: "Amazon Heart",
      location: "Brazil, Peru, Colombia",
      icon: TreePine,
      description: "The lungs of Earth, protecting indigenous territories and biodiversity",
      status: "Critical",
      species: "40,000+ plant species"
    },
    {
      name: "Great Barrier Reef",
      location: "Australia",
      icon: Waves,
      description: "Ocean's crown jewel, indigenous sea country and marine sanctuary",
      status: "Restoration",
      species: "1,500+ fish species"
    },
    {
      name: "Maasai Mara",
      location: "Kenya, Tanzania",
      icon: Eye,
      description: "Where the great migration flows, ancestral lands of the Maasai people",
      status: "Stewarded",
      species: "95+ mammal species"
    }
  ];

  return (
    <section id="bioregions" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Globe className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            Crown Bioregions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Earth's most sacred ecological and cultural landscapes, digitally twinned and protected 
            through AI-monitored stewardship and indigenous wisdom
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {bioregions.map((region, index) => (
            <Card key={index} className="group hover:shadow-earth transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-royal rounded-full w-16 h-16 flex items-center justify-center">
                  <region.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="font-serif text-xl text-primary">{region.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{region.location}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/80">{region.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Status:</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      region.status === 'Protected' ? 'bg-green-100 text-green-800' :
                      region.status === 'Critical' ? 'bg-red-100 text-red-800' :
                      region.status === 'Restoration' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {region.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Biodiversity:</span>
                    <span className="text-xs text-muted-foreground">{region.species}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-forest text-primary-foreground hover:opacity-90 shadow-royal">
            <Shield className="mr-2 h-5 w-5" />
            Explore All 100 Bioregions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CrownBioregions;