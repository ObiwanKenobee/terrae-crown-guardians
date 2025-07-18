import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, AlertTriangle, Calendar, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface Case {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  category: string;
  incident_date: string;
  evidence_links: string[];
  created_at: string;
}

const JoinPact = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCases(data || []);
    } catch (error) {
      console.error('Error fetching cases:', error);
      toast({
        title: "Error",
        description: "Failed to load cases",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCase = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cases')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setCases(cases.filter(c => c.id !== id));
      toast({
        title: "Success",
        description: "Case deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting case:', error);
      toast({
        title: "Error",
        description: "Failed to delete case",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'wildlife': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'environmental': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'community': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'legal': return 'bg-orange-100 text-orange-800 border-orange-200';
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
              <h1 className="text-4xl font-bold text-primary mb-2">Join the Pact</h1>
              <p className="text-muted-foreground">Report and track conservation cases</p>
            </div>
            <Button className="bg-gradient-royal text-primary-foreground hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Report Case
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((case_item) => (
              <Card key={case_item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{case_item.title}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(case_item.status)}>
                      {case_item.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {case_item.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Location: </span>
                    <span className="text-muted-foreground">{case_item.location}</span>
                  </div>

                  {case_item.category && (
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(case_item.category)}>
                        {case_item.category}
                      </Badge>
                    </div>
                  )}

                  {case_item.incident_date && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>
                        Incident: {new Date(case_item.incident_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {case_item.evidence_links && case_item.evidence_links.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">Evidence: </span>
                      <span className="text-muted-foreground">
                        {case_item.evidence_links.length} file(s)
                      </span>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Reported: {new Date(case_item.created_at).toLocaleDateString()}
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
                      onClick={() => deleteCase(case_item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {cases.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No cases reported</h3>
              <p className="text-muted-foreground mb-4">Start protecting by reporting your first case</p>
              <Button className="bg-gradient-royal text-primary-foreground hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Report First Case
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinPact;