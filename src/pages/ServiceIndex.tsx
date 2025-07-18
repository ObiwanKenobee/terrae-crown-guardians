import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Award, TrendingUp, Users, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface Innovation {
  id: string;
  title: string;
  description: string;
  stage: string;
  impact_potential: number;
  contributing_archetypes: string[];
  cross_archetype_bonus: number;
  initiated_by: string;
  participants: any;
  created_at: string;
  last_activity: string;
}

const ServiceIndex = () => {
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchInnovations();
  }, []);

  const fetchInnovations = async () => {
    try {
      const { data, error } = await supabase
        .from('emergent_innovations')
        .select('*')
        .order('impact_potential', { ascending: false });

      if (error) throw error;
      setInnovations(data || []);
    } catch (error) {
      console.error('Error fetching innovations:', error);
      toast({
        title: "Error",
        description: "Failed to load innovations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteInnovation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('emergent_innovations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setInnovations(innovations.filter(i => i.id !== id));
      toast({
        title: "Success",
        description: "Innovation deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting innovation:', error);
      toast({
        title: "Error",
        description: "Failed to delete innovation",
        variant: "destructive"
      });
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'seed': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'growth': return 'bg-green-100 text-green-800 border-green-200';
      case 'mature': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scaling': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">Service Index</h1>
              <p className="text-muted-foreground">Track and celebrate regenerative innovations</p>
            </div>
            <Button className="bg-gradient-royal text-primary-foreground hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Add Innovation
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {innovations.map((innovation) => (
              <Card key={innovation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{innovation.title}</CardTitle>
                    </div>
                    <Badge className={getStageColor(innovation.stage)}>
                      {innovation.stage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {innovation.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="font-medium">Impact: {innovation.impact_potential}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-medium">Bonus: {innovation.cross_archetype_bonus}</span>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">Initiated by: </span>
                    <span className="text-muted-foreground">{innovation.initiated_by}</span>
                  </div>

                  {innovation.contributing_archetypes && innovation.contributing_archetypes.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {innovation.contributing_archetypes.map((archetype, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {archetype}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Last activity: {new Date(innovation.last_activity).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteInnovation(innovation.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {innovations.length === 0 && (
            <div className="text-center py-12">
              <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No innovations found</h3>
              <p className="text-muted-foreground mb-4">Start tracking regenerative innovations</p>
              <Button className="bg-gradient-royal text-primary-foreground hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Add First Innovation
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceIndex;