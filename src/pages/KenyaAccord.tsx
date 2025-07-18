import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Calendar, MapPin, Eye, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface Collaboration {
  id: string;
  project_name: string;
  description: string;
  domain: string;
  status: string;
  partner_org: string;
  start_date: string;
  end_date: string;
  goals: any;
  created_at: string;
}

const KenyaAccord = () => {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCollaborations();
  }, []);

  const fetchCollaborations = async () => {
    try {
      const { data, error } = await supabase
        .from('community_collaborations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCollaborations(data || []);
    } catch (error) {
      console.error('Error fetching collaborations:', error);
      toast({
        title: "Error",
        description: "Failed to load collaborations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCollaboration = async (id: string) => {
    try {
      const { error } = await supabase
        .from('community_collaborations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setCollaborations(collaborations.filter(c => c.id !== id));
      toast({
        title: "Success",
        description: "Collaboration deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting collaboration:', error);
      toast({
        title: "Error",
        description: "Failed to delete collaboration",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'proposed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
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
              <h1 className="text-4xl font-bold text-primary mb-2">Kenya Accord</h1>
              <p className="text-muted-foreground">Community collaborations for biodiversity protection</p>
            </div>
            <Button className="bg-gradient-royal text-primary-foreground hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              New Collaboration
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collaborations.map((collaboration) => (
              <Card key={collaboration.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{collaboration.project_name}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(collaboration.status)}>
                      {collaboration.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {collaboration.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Domain: {collaboration.domain}</span>
                  </div>
                  
                  {collaboration.partner_org && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">Partner: {collaboration.partner_org}</span>
                    </div>
                  )}

                  {collaboration.start_date && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>
                        Start: {new Date(collaboration.start_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Created: {new Date(collaboration.created_at).toLocaleDateString()}
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
                      onClick={() => deleteCollaboration(collaboration.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {collaborations.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No collaborations found</h3>
              <p className="text-muted-foreground mb-4">Start building partnerships for conservation</p>
              <Button className="bg-gradient-royal text-primary-foreground hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Create First Collaboration
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KenyaAccord;