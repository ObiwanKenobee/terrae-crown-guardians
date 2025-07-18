import { Award, TreePine, Users, Droplets, Heart, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServiceIndex = () => {
  const topStewards = [
    {
      rank: 1,
      name: "Wangari Maathai Youth Forest",
      location: "Kenya",
      type: "Reforestation",
      impact: "50M trees planted",
      score: 9850,
      icon: TreePine
    },
    {
      rank: 2,
      name: "Māori River Guardians",
      location: "New Zealand",
      type: "Water Protection",
      impact: "3 rivers restored",
      score: 9720,
      icon: Droplets
    },
    {
      rank: 3,
      name: "Sami Reindeer Corridor",
      location: "Norway",
      type: "Wildlife Protection",
      impact: "Migration route secured",
      score: 9680,
      icon: Heart
    },
    {
      rank: 4,
      name: "Aboriginal Fire Knowledge",
      location: "Australia",
      type: "Cultural Preservation",
      impact: "Ancient practices revived",
      score: 9590,
      icon: Star
    }
  ];

  const categories = [
    { name: "Reforestation", icon: TreePine, count: 1247 },
    { name: "Water Stewardship", icon: Droplets, count: 892 },
    { name: "Wildlife Protection", icon: Heart, count: 654 },
    { name: "Cultural Preservation", icon: Star, count: 445 }
  ];

  return (
    <section id="service" className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Award className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            Service Index
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A global regenerative ranking honoring contributions to planetary healing—celebrating 
            youth innovators, elders, and communities working to restore Earth's crown jewels.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <Card key={index} className="text-center hover:shadow-earth transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="mx-auto mb-2 p-3 bg-gradient-royal rounded-full w-12 h-12 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg font-semibold text-primary">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gold">{category.count}</div>
                <div className="text-sm text-muted-foreground">Active Stewards</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border mb-12">
          <h3 className="font-serif text-2xl font-bold text-primary mb-6 text-center">
            Top Planetary Stewards
          </h3>
          
          <div className="space-y-4">
            {topStewards.map((steward, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    steward.rank === 1 ? 'bg-gold text-gold-foreground' :
                    steward.rank === 2 ? 'bg-gray-300 text-gray-800' :
                    steward.rank === 3 ? 'bg-amber-600 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {steward.rank}
                  </div>
                  
                  <div className="p-2 bg-gradient-forest rounded-lg">
                    <steward.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  
                  <div>
                    <div className="font-semibold text-primary">{steward.name}</div>
                    <div className="text-sm text-muted-foreground">{steward.location} • {steward.type}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-gold">{steward.score.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{steward.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-earth text-foreground hover:opacity-90 shadow-earth">
            <Users className="mr-2 h-5 w-5" />
            Join the Steward Network
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceIndex;