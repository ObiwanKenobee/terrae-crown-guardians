import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Award, TrendingUp, Users, Crown, Star, Medal } from "lucide-react";

interface Steward {
  id: string;
  name: string;
  location: string;
  type: 'individual' | 'organization' | 'community';
  contributions: {
    reforestation: number;
    species_protected: number;
    communities_supported: number;
    carbon_sequestered: number;
  };
  rank: number;
  points: number;
  badge_level: 'bronze' | 'silver' | 'gold' | 'platinum' | 'crown';
  recent_activities: string[];
}

const mockStewards: Steward[] = [
  {
    id: '1',
    name: 'Indigenous Youth Alliance',
    location: 'Amazon Basin',
    type: 'community',
    contributions: {
      reforestation: 12500,
      species_protected: 234,
      communities_supported: 47,
      carbon_sequestered: 8900
    },
    rank: 1,
    points: 45670,
    badge_level: 'crown',
    recent_activities: ['Protected 500 hectares of rainforest', 'Established wildlife corridor', 'Launched youth leadership program']
  },
  {
    id: '2',
    name: 'Dr. Wangari Muta Foundation',
    location: 'Kenya',
    type: 'organization',
    contributions: {
      reforestation: 8900,
      species_protected: 156,
      communities_supported: 23,
      carbon_sequestered: 6700
    },
    rank: 2,
    points: 38240,
    badge_level: 'platinum',
    recent_activities: ['Tree planting initiative', 'Community water project', 'Biodiversity monitoring']
  },
  {
    id: '3',
    name: 'Maria Santos',
    location: 'Brazil',
    type: 'individual',
    contributions: {
      reforestation: 3400,
      species_protected: 89,
      communities_supported: 12,
      carbon_sequestered: 2100
    },
    rank: 3,
    points: 28950,
    badge_level: 'gold',
    recent_activities: ['Seed bank development', 'Traditional knowledge documentation', 'Youth mentorship']
  }
];

const ServiceRankings = () => {
  const [stewards] = useState<Steward[]>(mockStewards);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'individual' | 'organization' | 'community'>('all');

  const getBadgeIcon = (level: string) => {
    switch (level) {
      case 'crown': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'platinum': return <Star className="h-4 w-4 text-purple-500" />;
      case 'gold': return <Trophy className="h-4 w-4 text-yellow-600" />;
      case 'silver': return <Medal className="h-4 w-4 text-gray-500" />;
      case 'bronze': return <Award className="h-4 w-4 text-orange-600" />;
      default: return <Award className="h-4 w-4 text-gray-400" />;
    }
  };

  const getBadgeColor = (level: string) => {
    switch (level) {
      case 'crown': return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white';
      case 'platinum': return 'bg-gradient-to-r from-purple-400 to-purple-600 text-white';
      case 'gold': return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
      case 'silver': return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      case 'bronze': return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'individual': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'organization': return 'bg-green-100 text-green-800 border-green-200';
      case 'community': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredStewards = selectedCategory === 'all' 
    ? stewards 
    : stewards.filter(s => s.type === selectedCategory);

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">Global Service Rankings</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Celebrating stewards making the greatest impact in regenerative conservation and bioregional protection.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 mb-6">
        {['all', 'individual', 'organization', 'community'].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category as any)}
            className="capitalize"
          >
            {category === 'all' ? 'All Stewards' : `${category}s`}
          </Button>
        ))}
      </div>

      {/* Rankings */}
      <div className="space-y-4">
        {filteredStewards.map((steward) => (
          <Card key={steward.id} className={`transition-all hover:shadow-lg ${
            steward.rank <= 3 ? 'border-primary/50 bg-gradient-to-r from-primary/5 to-primary/10' : ''
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Rank and Avatar */}
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-lg ${
                    steward.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                    steward.rank === 2 ? 'bg-gray-300 text-gray-800' :
                    steward.rank === 3 ? 'bg-orange-400 text-orange-900' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {steward.rank}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {steward.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{steward.name}</h3>
                      <p className="text-sm text-muted-foreground">{steward.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getBadgeColor(steward.badge_level)}>
                        {getBadgeIcon(steward.badge_level)}
                        {steward.badge_level}
                      </Badge>
                      <Badge className={getTypeColor(steward.type)}>
                        {steward.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Contributions Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-700">{steward.contributions.reforestation.toLocaleString()}</div>
                      <div className="text-xs text-green-600">Trees Planted</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-700">{steward.contributions.species_protected}</div>
                      <div className="text-xs text-blue-600">Species Protected</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-700">{steward.contributions.communities_supported}</div>
                      <div className="text-xs text-purple-600">Communities Supported</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded-lg">
                      <div className="text-lg font-bold text-orange-700">{steward.contributions.carbon_sequestered.toLocaleString()}</div>
                      <div className="text-xs text-orange-600">Tons CO₂ Sequestered</div>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-foreground mb-2">Recent Activities</div>
                    <ul className="space-y-1">
                      {steward.recent_activities.slice(0, 2).map((activity, index) => (
                        <li key={index} className="text-xs text-muted-foreground">• {activity}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Points and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      {steward.points.toLocaleString()} Impact Points
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Users className="mr-2 h-4 w-4" />
                        Connect
                      </Button>
                      <Button size="sm" className="bg-gradient-royal text-primary-foreground hover:opacity-90">
                        <Award className="mr-2 h-4 w-4" />
                        Support
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <Trophy className="mx-auto h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-bold text-primary mb-2">Join the Rankings</h3>
          <p className="text-muted-foreground mb-4">
            Start your journey as an AEGIS Steward and make a measurable impact on bioregional protection.
          </p>
          <Button className="bg-gradient-royal text-primary-foreground hover:opacity-90">
            Become a Steward
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceRankings;