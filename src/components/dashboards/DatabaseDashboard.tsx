import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Database, 
  Server, 
  HardDrive, 
  Zap, 
  Users, 
  Clock, 
  Shield, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Settings,
  Search,
  FileText,
  Lock,
  Unlock,
  Activity
} from 'lucide-react';

interface DatabaseStats {
  totalConnections: number;
  activeConnections: number;
  totalQueries: number;
  avgQueryTime: number;
  slowQueries: number;
  storage: {
    total: string;
    used: string;
    percentage: number;
  };
  performance: {
    cpu: number;
    memory: number;
    disk: number;
  };
}

interface TableInfo {
  name: string;
  rows: number;
  size: string;
  lastUpdated: string;
  status: 'healthy' | 'warning' | 'error';
}

interface QueryMetrics {
  query: string;
  duration: number;
  frequency: number;
  table: string;
  type: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
}

const DatabaseDashboard: React.FC = () => {
  const [stats, setStats] = useState<DatabaseStats>({
    totalConnections: 150,
    activeConnections: 42,
    totalQueries: 15420,
    avgQueryTime: 125,
    slowQueries: 8,
    storage: {
      total: '2.5TB',
      used: '1.8TB',
      percentage: 72
    },
    performance: {
      cpu: 45,
      memory: 68,
      disk: 23
    }
  });

  const [tables, setTables] = useState<TableInfo[]>([
    {
      name: 'users',
      rows: 125430,
      size: '450MB',
      lastUpdated: '2 mins ago',
      status: 'healthy'
    },
    {
      name: 'bioregions',
      rows: 8921,
      size: '125MB',
      lastUpdated: '5 mins ago',
      status: 'healthy'
    },
    {
      name: 'corporate_partnerships',
      rows: 456,
      size: '15MB',
      lastUpdated: '1 hour ago',
      status: 'warning'
    },
    {
      name: 'blockchain_transactions',
      rows: 892341,
      size: '2.1GB',
      lastUpdated: '30 secs ago',
      status: 'healthy'
    },
    {
      name: 'ai_diplomacy_sessions',
      rows: 12043,
      size: '89MB',
      lastUpdated: '15 mins ago',
      status: 'error'
    }
  ]);

  const [slowQueries, setSlowQueries] = useState<QueryMetrics[]>([
    {
      query: 'SELECT * FROM bioregions br JOIN users u ON...',
      duration: 2350,
      frequency: 45,
      table: 'bioregions',
      type: 'SELECT'
    },
    {
      query: 'UPDATE corporate_partnerships SET status...',
      duration: 1890,
      frequency: 12,
      table: 'corporate_partnerships',
      type: 'UPDATE'
    },
    {
      query: 'SELECT COUNT(*) FROM blockchain_transactions...',
      duration: 1456,
      frequency: 89,
      table: 'blockchain_transactions',
      type: 'SELECT'
    }
  ]);

  const [realtimeMetrics, setRealtimeMetrics] = useState({
    qps: 245,
    latency: 125,
    errorRate: 0.03,
    cacheHitRate: 85.4
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeMetrics(prev => ({
        qps: prev.qps + Math.floor(Math.random() * 20 - 10),
        latency: prev.latency + Math.floor(Math.random() * 20 - 10),
        errorRate: Math.max(0, prev.errorRate + (Math.random() * 0.02 - 0.01)),
        cacheHitRate: Math.min(100, Math.max(0, prev.cacheHitRate + (Math.random() * 2 - 1)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Database className="h-8 w-8 text-blue-600" />
              Database Administration Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Monitor and manage your database infrastructure</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Queries/sec</p>
                  <p className="text-2xl font-bold text-blue-600">{realtimeMetrics.qps}</p>
                </div>
                <Zap className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Latency</p>
                  <p className="text-2xl font-bold text-green-600">{realtimeMetrics.latency}ms</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Error Rate</p>
                  <p className="text-2xl font-bold text-red-600">{realtimeMetrics.errorRate.toFixed(2)}%</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cache Hit Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{realtimeMetrics.cacheHitRate.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-6 lg:w-1/2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="queries">Queries</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Connection Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Database Connections
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Connections</span>
                    <Badge variant="secondary">{stats.activeConnections}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Connections</span>
                    <Badge variant="outline">{stats.totalConnections}</Badge>
                  </div>
                  <Progress value={(stats.activeConnections / stats.totalConnections) * 100} className="h-2" />
                  <p className="text-xs text-gray-500">
                    {((stats.activeConnections / stats.totalConnections) * 100).toFixed(1)}% of max connections used
                  </p>
                </CardContent>
              </Card>

              {/* Storage Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5" />
                    Storage Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Used Space</span>
                    <Badge variant="secondary">{stats.storage.used}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Space</span>
                    <Badge variant="outline">{stats.storage.total}</Badge>
                  </div>
                  <Progress value={stats.storage.percentage} className="h-2" />
                  <p className="text-xs text-gray-500">
                    {stats.storage.percentage}% of total storage used
                  </p>
                </CardContent>
              </Card>

              {/* Query Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Query Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Queries</span>
                    <Badge variant="secondary">{stats.totalQueries.toLocaleString()}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Query Time</span>
                    <Badge variant="outline">{stats.avgQueryTime}ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Slow Queries</span>
                    <Badge variant="destructive">{stats.slowQueries}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm text-gray-600">{stats.performance.cpu}%</span>
                    </div>
                    <Progress value={stats.performance.cpu} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm text-gray-600">{stats.performance.memory}%</span>
                    </div>
                    <Progress value={stats.performance.memory} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Disk I/O</span>
                      <span className="text-sm text-gray-600">{stats.performance.disk}%</span>
                    </div>
                    <Progress value={stats.performance.disk} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                      <p>Performance chart visualization</p>
                      <p className="text-sm">(Integration with chart library)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Slow Queries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Slow Queries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {slowQueries.map((query, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant={query.type === 'SELECT' ? 'secondary' : 'outline'}>
                            {query.type}
                          </Badge>
                          <span className="text-sm text-gray-600">{query.duration}ms</span>
                        </div>
                        <p className="text-sm font-mono text-gray-700 mb-1">
                          {query.query}
                        </p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Table: {query.table}</span>
                          <span>Frequency: {query.frequency} calls</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tables" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Table Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Table Name</th>
                        <th className="text-left p-2">Rows</th>
                        <th className="text-left p-2">Size</th>
                        <th className="text-left p-2">Last Updated</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tables.map((table, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{table.name}</td>
                          <td className="p-2">{table.rows.toLocaleString()}</td>
                          <td className="p-2">{table.size}</td>
                          <td className="p-2">{table.lastUpdated}</td>
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(table.status)}
                              <Badge variant={table.status === 'healthy' ? 'secondary' : 'destructive'}>
                                {table.status}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Search className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Settings className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Query Console</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <textarea
                    className="w-full h-32 p-3 border rounded-lg font-mono text-sm"
                    placeholder="Enter your SQL query here..."
                  />
                  <div className="flex gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Execute Query
                    </Button>
                    <Button variant="outline">
                      Explain Plan
                    </Button>
                    <Button variant="outline">
                      Save Query
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-600" />
                      <span className="text-sm">SSL Encryption</span>
                    </div>
                    <Badge className="bg-green-600">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Firewall Rules</span>
                    </div>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Unlock className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Failed Login Attempts</span>
                    </div>
                    <Badge className="bg-yellow-600">3 Today</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Access Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Admin Users</span>
                      <Badge variant="secondary">3 Active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Read-Only Users</span>
                      <Badge variant="secondary">12 Active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Application Users</span>
                      <Badge variant="secondary">5 Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Backup Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">Last Full Backup</span>
                    <Badge className="bg-green-600">2 hours ago</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm">Incremental Backup</span>
                    <Badge className="bg-blue-600">15 mins ago</Badge>
                  </div>
                  <Button className="w-full">
                    Run Manual Backup
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update Statistics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Optimize Tables
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <HardDrive className="h-4 w-4 mr-2" />
                    Rebuild Indexes
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Next scheduled maintenance window: Sunday 2:00 AM - 4:00 AM EST
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DatabaseDashboard;
