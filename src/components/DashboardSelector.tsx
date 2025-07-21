import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mountain, 
  TreePine, 
  Users, 
  Building2, 
  GraduationCap, 
  User,
  Gamepad2,
  Landmark
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserType } from "@/types/auth";

const DashboardSelector = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const dashboardConfigs = {
    individual_steward: {
      route: "/steward-dashboard",
      icon: TreePine,
      title: "Steward Dashboard",
      description: "Track your personal environmental impact and join global conservation efforts",
      color: "emerald"
    },
    indigenous_guardian: {
      route: "/indigenous-guardian-dashboard", 
      icon: Mountain,
      title: "Indigenous Guardian Portal",
      description: "Sacred stewardship tools for protecting ancestral lands and traditional knowledge",
      color: "amber"
    },
    researcher: {
      route: "/researcher-dashboard",
      icon: GraduationCap,
      title: "Research Portal",
      description: "Scientific tools for biodiversity research and conservation data analysis",
      color: "blue"
    },
    ngo_partner: {
      route: "/ngo-dashboard",
      icon: Users,
      title: "NGO Partnership Hub",
      description: "Collaborative platform for conservation organizations and partnerships",
      color: "purple"
    },
    youth_steward: {
      route: "/youth-dashboard",
      icon: Gamepad2,
      title: "Youth Climate Hub",
      description: "Gamified learning and action platform for young environmental leaders",
      color: "pink"
    },
    corporate_partner: {
      route: "/corporate-dashboard",
      icon: Building2,
      title: "Corporate Sustainability",
      description: "Enterprise tools for environmental impact and CSR management",
      color: "slate"
    },
    government_official: {
      route: "/government-dashboard",
      icon: Landmark,
      title: "Policy & Governance",
      description: "Government tools for environmental policy and conservation oversight",
      color: "indigo"
    }
  };

  useEffect(() => {
    // Auto-navigate if user is authenticated and has a specific user type
    if (isAuthenticated && user?.user_type) {
      const config = dashboardConfigs[user.user_type];
      if (config && config.route) {
        navigate(config.route);
      }
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-4">
              Please sign in to access your personalized dashboard
            </p>
            <Button>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userDashboard = dashboardConfigs[user.user_type];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Welcome to AEGIS</h1>
          <p className="text-xl text-muted-foreground">
            Choose your dashboard to start your regenerative journey
          </p>
        </div>

        {/* Primary Dashboard for User Type */}
        {userDashboard && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Your Dashboard</h2>
            <Card className="hover:shadow-lg transition-shadow border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-6">
                  <div className={`p-4 bg-${userDashboard.color}-100 rounded-full`}>
                    <userDashboard.icon className={`h-12 w-12 text-${userDashboard.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">{userDashboard.title}</h3>
                      <Badge className={`bg-${userDashboard.color}-100 text-${userDashboard.color}-800`}>
                        Recommended
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{userDashboard.description}</p>
                    <Button 
                      onClick={() => navigate(userDashboard.route)}
                      className={`bg-${userDashboard.color}-600 text-white hover:bg-${userDashboard.color}-700`}
                    >
                      Enter Dashboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Alternative Dashboards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Explore Other Dashboards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(dashboardConfigs)
              .filter(([type]) => type !== user.user_type)
              .map(([type, config]) => {
                const IconComponent = config.icon;
                return (
                  <Card key={type} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className={`p-3 bg-${config.color}-100 rounded-full w-fit mx-auto mb-3`}>
                          <IconComponent className={`h-8 w-8 text-${config.color}-600`} />
                        </div>
                        <h3 className="font-semibold mb-2">{config.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{config.description}</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(config.route)}
                          className="w-full"
                        >
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>

        {/* Quick Access Card */}
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-emerald-600 mb-6">
              Our AI-powered recommendation system can help you find the perfect dashboard
              based on your conservation goals and expertise.
            </p>
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
              Get Personalized Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSelector;
