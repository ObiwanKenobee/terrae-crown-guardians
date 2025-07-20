import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, Leaf, Users, TrendingUp } from "lucide-react";

interface RegionalAlert {
  id: string;
  region: string;
  country: string;
  coordinates: [number, number];
  urgencyLevel: "critical" | "high" | "medium" | "opportunity";
  category: "ecological" | "cultural" | "youth" | "wildlife";
  description: string;
  metrics: {
    biodiversityRisk: number;
    culturalEndangerment: number;
    youthVulnerability: number;
    regenerativePotential: number;
  };
  lastUpdated: string;
}

// Mock data representing regions identified by the crawler
const mockRegionalData: RegionalAlert[] = [
  {
    id: "1",
    region: "Maasai Mara Ecosystem",
    country: "Kenya",
    coordinates: [-1.5, 35.1],
    urgencyLevel: "critical",
    category: "ecological",
    description: "Severe habitat fragmentation threatening wildlife corridors and Maasai pastoral traditions",
    metrics: {
      biodiversityRisk: 85,
      culturalEndangerment: 70,
      youthVulnerability: 60,
      regenerativePotential: 90
    },
    lastUpdated: "2024-01-15"
  },
  {
    id: "2", 
    region: "Amazon Sacred Headwaters",
    country: "Ecuador/Peru",
    coordinates: [-2.0, -77.5],
    urgencyLevel: "critical",
    category: "cultural",
    description: "Indigenous territories under pressure from extractive industries, language extinction risk",
    metrics: {
      biodiversityRisk: 95,
      culturalEndangerment: 88,
      youthVulnerability: 75,
      regenerativePotential: 95
    },
    lastUpdated: "2024-01-14"
  },
  {
    id: "3",
    region: "Himalayas Corridor",
    country: "Nepal/Bhutan",
    coordinates: [28.0, 84.0],
    urgencyLevel: "high",
    category: "wildlife",
    description: "Climate change disrupting snow leopard habitat and traditional mountain communities",
    metrics: {
      biodiversityRisk: 78,
      culturalEndangerment: 65,
      youthVulnerability: 82,
      regenerativePotential: 85
    },
    lastUpdated: "2024-01-13"
  },
  {
    id: "4",
    region: "Great Bear Rainforest",
    country: "Canada",
    coordinates: [52.0, -127.0],
    urgencyLevel: "opportunity",
    category: "youth",
    description: "Successful Indigenous-led conservation model ready for youth leadership expansion",
    metrics: {
      biodiversityRisk: 35,
      culturalEndangerment: 40,
      youthVulnerability: 45,
      regenerativePotential: 95
    },
    lastUpdated: "2024-01-12"
  }
];

const getUrgencyColor = (level: string) => {
  switch (level) {
    case "critical": return "bg-destructive text-destructive-foreground";
    case "high": return "bg-orange-500 text-white";
    case "medium": return "bg-yellow-500 text-white";
    case "opportunity": return "bg-green-500 text-white";
    default: return "bg-muted text-muted-foreground";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "ecological": return <Leaf className="w-4 h-4" />;
    case "cultural": return <Users className="w-4 h-4" />;
    case "youth": return <TrendingUp className="w-4 h-4" />;
    case "wildlife": return <MapPin className="w-4 h-4" />;
    default: return <AlertTriangle className="w-4 h-4" />;
  }
};

export const RegionalTargeting = () => {
  const [alerts, setAlerts] = useState<RegionalAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate crawler data fetching
    const fetchRegionalData = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAlerts(mockRegionalData);
      setLoading(false);
    };

    fetchRegionalData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map(i => (
          <Card key={i} className="h-48 bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold bg-gradient-royal bg-clip-text text-transparent">
          Global Regenerative Intelligence
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time monitoring of bioregions requiring urgent regenerative intervention, 
          identified through ethical AI analysis of ecological and cultural indicators.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {alerts.map((alert) => (
          <Card key={alert.id} className="border-border/50 hover:shadow-royal transition-all duration-300">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(alert.category)}
                  <CardTitle className="text-lg">{alert.region}</CardTitle>
                </div>
                <Badge className={getUrgencyColor(alert.urgencyLevel)}>
                  {alert.urgencyLevel}
                </Badge>
              </div>
              <CardDescription className="flex items-center space-x-2 text-sm">
                <MapPin className="w-3 h-3" />
                <span>{alert.country}</span>
                <span className="text-xs text-muted-foreground">
                  Updated {alert.lastUpdated}
                </span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground/80">{alert.description}</p>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Biodiversity Risk</span>
                    <span className="font-medium">{alert.metrics.biodiversityRisk}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-red-500 h-1.5 rounded-full transition-all duration-300" 
                      style={{ width: `${alert.metrics.biodiversityRisk}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Cultural Risk</span>
                    <span className="font-medium">{alert.metrics.culturalEndangerment}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-orange-500 h-1.5 rounded-full transition-all duration-300" 
                      style={{ width: `${alert.metrics.culturalEndangerment}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Youth Vulnerability</span>
                    <span className="font-medium">{alert.metrics.youthVulnerability}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-yellow-500 h-1.5 rounded-full transition-all duration-300" 
                      style={{ width: `${alert.metrics.youthVulnerability}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Regen Potential</span>
                    <span className="font-medium text-green-600">{alert.metrics.regenerativePotential}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full transition-all duration-300" 
                      style={{ width: `${alert.metrics.regenerativePotential}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};