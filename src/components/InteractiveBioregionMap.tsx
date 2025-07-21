import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle, TrendingDown, Users, Shield, Leaf } from "lucide-react";

interface Bioregion {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  risk_level: 'critical' | 'high' | 'medium' | 'low';
  species_affected: number;
  impact_score: number;
  indigenous_communities: string[];
  threats: string[];
  opportunities: string[];
  health_score: number;
}

const mockBioregions: Bioregion[] = [
  {
    id: '1',
    name: 'Amazon Sacred Headwaters',
    location: { lat: -1.5, lng: -77.5 },
    risk_level: 'critical',
    species_affected: 847,
    impact_score: 9.2,
    indigenous_communities: ['Achuar', 'Shuar', 'Kichwa'],
    threats: ['Illegal mining', 'Deforestation', 'Oil extraction'],
    opportunities: ['Indigenous governance', 'Carbon markets', 'Biodiversity corridors'],
    health_score: 34
  },
  {
    id: '2',
    name: 'Maasai Mara Ecosystem',
    location: { lat: -1.5, lng: 35.0 },
    risk_level: 'high',
    species_affected: 423,
    impact_score: 8.1,
    indigenous_communities: ['Maasai', 'Kikuyu'],
    threats: ['Human-wildlife conflict', 'Land fragmentation', 'Climate change'],
    opportunities: ['Community conservancies', 'Ecotourism', 'Traditional grazing systems'],
    health_score: 67
  },
  {
    id: '3',
    name: 'Himalayan Transboundary',
    location: { lat: 28.0, lng: 84.0 },
    risk_level: 'critical',
    species_affected: 612,
    impact_score: 9.8,
    indigenous_communities: ['Sherpa', 'Tamang', 'Gurung'],
    threats: ['Glacier retreat', 'Infrastructure development', 'Tourism pressure'],
    opportunities: ['Sacred site protection', 'Climate adaptation', 'Traditional knowledge'],
    health_score: 41
  }
];

const InteractiveBioregionMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<Bioregion | null>(null);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">Interactive Crown Bioregions Map</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the world's most critical bioregions in need of protection. Click on any region to learn more and take action.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="h-96 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
            <CardContent className="p-6 h-full">
              <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
                {/* Simplified world map background */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    <path d="M50,50 Q150,30 250,50 Q350,70 380,50 L380,150 Q300,130 200,150 Q100,170 50,150 Z" 
                          fill="currentColor" className="text-primary" />
                  </svg>
                </div>
                
                {/* Bioregion markers */}
                {mockBioregions.map((region) => (
                  <button
                    key={region.id}
                    className={`absolute w-4 h-4 rounded-full ${getRiskColor(region.risk_level)} 
                              border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform
                              animate-pulse`}
                    style={{
                      left: `${((region.location.lng + 180) / 360) * 100}%`,
                      top: `${((90 - region.location.lat) / 180) * 100}%`
                    }}
                    onClick={() => setSelectedRegion(region)}
                  >
                    <span className="sr-only">{region.name}</span>
                  </button>
                ))}
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="text-sm font-medium mb-2">Risk Levels</div>
                  <div className="space-y-1">
                    {['critical', 'high', 'medium', 'low'].map((level) => (
                      <div key={level} className="flex items-center gap-2 text-xs">
                        <div className={`w-3 h-3 rounded-full ${getRiskColor(level)}`} />
                        <span className="capitalize">{level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Region Details */}
        <div className="space-y-4">
          {selectedRegion ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      {selectedRegion.name}
                    </CardTitle>
                  </div>
                  <Badge className={getRiskBadgeColor(selectedRegion.risk_level)}>
                    {selectedRegion.risk_level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TrendingDown className="h-4 w-4" />
                      Species Affected
                    </div>
                    <div className="text-2xl font-bold text-primary">{selectedRegion.species_affected}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      Health Score
                    </div>
                    <div className="text-2xl font-bold text-primary">{selectedRegion.health_score}%</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-sm font-medium mb-2">
                    <Users className="h-4 w-4" />
                    Indigenous Communities
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedRegion.indigenous_communities.map((community, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {community}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2 text-red-600">Primary Threats</div>
                  <ul className="text-xs space-y-1">
                    {selectedRegion.threats.map((threat, index) => (
                      <li key={index} className="text-muted-foreground">• {threat}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2 text-green-600">Opportunities</div>
                  <ul className="text-xs space-y-1">
                    {selectedRegion.opportunities.map((opportunity, index) => (
                      <li key={index} className="text-muted-foreground">• {opportunity}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-4">
                  <Button className="w-full bg-gradient-royal text-primary-foreground">
                    <Shield className="mr-2 h-4 w-4" />
                    Protect This Region
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Leaf className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Bioregion</h3>
                <p className="text-muted-foreground text-sm">
                  Click on any marker on the map to explore detailed information about that bioregion
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Global Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Critical Regions</span>
                <span className="font-medium text-red-600">23</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Protected Areas</span>
                <span className="font-medium text-green-600">47</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Indigenous Territories</span>
                <span className="font-medium text-blue-600">156</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Active Stewards</span>
                <span className="font-medium text-purple-600">2,847</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveBioregionMap;