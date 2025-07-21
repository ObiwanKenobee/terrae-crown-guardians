import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, AlertCircle, Eye, Edit, Trash2, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import InteractiveBioregionMap from "@/components/InteractiveBioregionMap";

interface BiodiversityReport {
  id: string;
  title: string;
  report_type: string;
  risk_level: string;
  species_affected: number;
  impact_score: number;
  status: string;
  generated_at: string;
  data: any;
}

const CrownBioregions = () => {
  const [reports, setReports] = useState<BiodiversityReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('biodiversity_reports')
        .select('*')
        .order('generated_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error",
        description: "Failed to load biodiversity reports",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (id: string) => {
    try {
      const { error } = await supabase
        .from('biodiversity_reports')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setReports(reports.filter(r => r.id !== id));
      toast({
        title: "Success",
        description: "Report deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting report:', error);
      toast({
        title: "Error",
        description: "Failed to delete report",
        variant: "destructive"
      });
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
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
              <h1 className="text-4xl font-bold text-primary mb-2">Crown Bioregions</h1>
              <p className="text-muted-foreground">Monitor and protect Earth's most sacred ecological zones</p>
            </div>
            <Button className="bg-gradient-royal text-primary-foreground hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              New Report
            </Button>
          </div>

          {/* Interactive Map Section */}
          <div className="mb-12">
            <InteractiveBioregionMap />
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bioregions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRisk} onValueChange={setFilterRisk}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="forest">Forest</SelectItem>
                <SelectItem value="marine">Marine</SelectItem>
                <SelectItem value="wetland">Wetland</SelectItem>
                <SelectItem value="grassland">Grassland</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports
              .filter(report => {
                const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesRisk = filterRisk === "all" || report.risk_level === filterRisk;
                const matchesType = filterType === "all" || report.report_type === filterType;
                return matchesSearch && matchesRisk && matchesType;
              })
              .map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                    </div>
                    <Badge className={getRiskLevelColor(report.risk_level)}>
                      {report.risk_level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Type: {report.report_type}</span>
                    <span>Status: {report.status}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Species Affected:</span>
                      <p className="text-lg font-bold text-primary">{report.species_affected}</p>
                    </div>
                    <div>
                      <span className="font-medium">Impact Score:</span>
                      <p className="text-lg font-bold text-primary">{report.impact_score}</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Generated: {new Date(report.generated_at).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 bg-gradient-royal text-primary-foreground hover:opacity-90"
                      onClick={() => window.location.href = '/join-pact'}
                    >
                      Protect
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteReport(report.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {reports.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No reports found</h3>
              <p className="text-muted-foreground mb-4">Start monitoring bioregions by creating your first report</p>
              <Button className="bg-gradient-royal text-primary-foreground hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Create First Report
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrownBioregions;