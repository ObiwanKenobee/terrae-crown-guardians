import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Server, 
  Database, 
  Cpu, 
  HardDrive, 
  Zap, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  Globe, 
  Shield, 
  TrendingUp, 
  TrendingDown,
  MemoryStick,
  Wifi,
  FileText,
  Code,
  Bug,
  Settings,
  Monitor,
  Download,
  Upload,
  PlayCircle,
  StopCircle,
  RefreshCw,
  Terminal
} from 'lucide-react';

export function BackendDashboard() {
  const [serverStatus, setServerStatus] = useState({
    mainServer: 'healthy',
    apiGateway: 'healthy',
    loadBalancer: 'healthy',
    database: 'warning',
    cache: 'healthy',
    queue: 'healthy'
  });

  const systemMetrics = {
    cpu: { usage: 34, cores: 8, temperature: 45 },
    memory: { used: 12.4, total: 32, available: 19.6 },
    disk: { used: 234, total: 512, available: 278 },
    network: { inbound: 45.2, outbound: 23.7, connections: 1247 }
  };

  const apiMetrics = {
    totalRequests: 245678,
    requestsPerMinute: 847,
    averageResponseTime: 234,
    errorRate: 0.7,
    throughput: 156.8,
    activeConnections: 892,
    endpoints: [
      { path: '/api/blockchain/transactions', requests: 45234, avgTime: 189, errors: 3 },
      { path: '/api/partnerships/stats', requests: 34567, avgTime: 156, errors: 1 },
      { path: '/api/auth/verify', requests: 28934, avgTime: 78, errors: 12 },
      { path: '/api/immersive/experiences', requests: 23456, avgTime: 445, errors: 8 },
      { path: '/api/diplomacy/conflicts', requests: 18723, avgTime: 334, errors: 5 }
    ]
  };

  const databaseMetrics = {
    connections: { active: 23, max: 100, idle: 45 },
    queries: { totalToday: 1456789, avgExecutionTime: 89, slowQueries: 12 },
    storage: { used: 145.6, total: 500, indexes: 23.4 },
    replication: { status: 'healthy', lag: 0.3, lastSync: '2 minutes ago' },
    slowQueries: [
      { query: 'SELECT * FROM blockchain_transactions WHERE...', time: 1234, frequency: 45 },
      { query: 'JOIN partnerships p ON corporate_data...', time: 892, frequency: 23 },
      { query: 'UPDATE user_metrics SET impact_score...', time: 567, frequency: 67 }
    ]
  };

  const serviceHealth = [
    { service: 'Auth Service', status: 'healthy', uptime: '99.9%', lastCheck: '30s ago', cpu: 23, memory: 234 },
    { service: 'Blockchain API', status: 'healthy', uptime: '99.7%', lastCheck: '1m ago', cpu: 45, memory: 567 },
    { service: 'Payment Gateway', status: 'warning', uptime: '98.2%', lastCheck: '2m ago', cpu: 67, memory: 890 },
    { service: 'AI Diplomacy', status: 'healthy', uptime: '99.5%', lastCheck: '45s ago', cpu: 34, memory: 445 },
    { service: 'Immersive Engine', status: 'healthy', uptime: '99.1%', lastCheck: '1m ago', cpu: 56, memory: 678 },
    { service: 'Corporate Portal', status: 'healthy', uptime: '99.8%', lastCheck: '30s ago', cpu: 29, memory: 334 }
  ];

  const recentLogs = [
    { timestamp: '2024-12-15 14:32:15', level: 'ERROR', service: 'PaymentGateway', message: 'Connection timeout to payment processor', count: 3 },
    { timestamp: '2024-12-15 14:30:42', level: 'WARN', service: 'Database', message: 'Slow query detected: execution time 1.2s', count: 1 },
    { timestamp: '2024-12-15 14:28:33', level: 'INFO', service: 'AuthService', message: 'Rate limit exceeded for IP 192.168.1.100', count: 5 },
    { timestamp: '2024-12-15 14:25:18', level: 'ERROR', service: 'BlockchainAPI', message: 'Failed to verify transaction signature', count: 2 },
    { timestamp: '2024-12-15 14:22:07', level: 'WARN', service: 'LoadBalancer', message: 'High CPU usage detected on server-03', count: 1 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-600';
      case 'WARN': return 'text-yellow-600';
      case 'INFO': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const formatBytes = (gb: number) => `${gb} GB`;
  const formatMbps = (mbps: number) => `${mbps} MB/s`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Backend Dashboard</h1>
          <p className="text-gray-600">Server infrastructure and API performance monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800">
            <Activity className="h-3 w-3 mr-1" />
            All Systems Operational
          </Badge>
          <Button variant="outline" size="sm">
            <Terminal className="h-4 w-4 mr-2" />
            SSH Console
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CPU Usage</p>
                <p className="text-2xl font-bold text-blue-600">{systemMetrics.cpu.usage}%</p>
                <p className="text-xs text-gray-500">{systemMetrics.cpu.cores} cores • {systemMetrics.cpu.temperature}°C</p>
              </div>
              <Cpu className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Memory</p>
                <p className="text-2xl font-bold text-green-600">{formatBytes(systemMetrics.memory.used)}</p>
                <p className="text-xs text-gray-500">of {formatBytes(systemMetrics.memory.total)} • {formatBytes(systemMetrics.memory.available)} free</p>
              </div>
              <MemoryStick className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Disk Space</p>
                <p className="text-2xl font-bold text-purple-600">{formatBytes(systemMetrics.disk.used)}</p>
                <p className="text-xs text-gray-500">of {formatBytes(systemMetrics.disk.total)} • {formatBytes(systemMetrics.disk.available)} free</p>
              </div>
              <HardDrive className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Network I/O</p>
                <p className="text-2xl font-bold text-orange-600">{formatMbps(systemMetrics.network.inbound)}</p>
                <p className="text-xs text-gray-500">↓ {formatMbps(systemMetrics.network.inbound)} ↑ {formatMbps(systemMetrics.network.outbound)}</p>
              </div>
              <Wifi className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="api">API Performance</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  Service Health
                </CardTitle>
                <CardDescription>Status of all microservices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {serviceHealth.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${service.status === 'healthy' ? 'bg-green-500' : service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      <div>
                        <p className="font-medium text-sm">{service.service}</p>
                        <p className="text-xs text-gray-600">Uptime: {service.uptime} • Last check: {service.lastCheck}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusBadge(service.status)}>
                        {service.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">CPU: {service.cpu}% • RAM: {service.memory}MB</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  System Resources
                </CardTitle>
                <CardDescription>Real-time resource utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm font-bold">{systemMetrics.cpu.usage}%</span>
                  </div>
                  <Progress value={systemMetrics.cpu.usage} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm font-bold">{Math.round((systemMetrics.memory.used / systemMetrics.memory.total) * 100)}%</span>
                  </div>
                  <Progress value={(systemMetrics.memory.used / systemMetrics.memory.total) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Disk Usage</span>
                    <span className="text-sm font-bold">{Math.round((systemMetrics.disk.used / systemMetrics.disk.total) * 100)}%</span>
                  </div>
                  <Progress value={(systemMetrics.disk.used / systemMetrics.disk.total) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Network Connections</span>
                    <span className="text-sm font-bold">{systemMetrics.network.connections}</span>
                  </div>
                  <Progress value={(systemMetrics.network.connections / 2000) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Service Controls
              </CardTitle>
              <CardDescription>Start, stop, and restart services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {serviceHealth.slice(0, 6).map((service, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-sm">{service.service}</h4>
                      <Badge className={getStatusBadge(service.status)}>
                        {service.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <PlayCircle className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <StopCircle className="h-3 w-3 mr-1" />
                        Stop
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Restart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Performance Tab */}
        <TabsContent value="api" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Requests</p>
                    <p className="text-2xl font-bold text-blue-600">{apiMetrics.totalRequests.toLocaleString()}</p>
                  </div>
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Requests/Min</p>
                    <p className="text-2xl font-bold text-green-600">{apiMetrics.requestsPerMinute}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Response</p>
                    <p className="text-2xl font-bold text-purple-600">{apiMetrics.averageResponseTime}ms</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Error Rate</p>
                    <p className="text-2xl font-bold text-red-600">{apiMetrics.errorRate}%</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* API Endpoints */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                API Endpoints Performance
              </CardTitle>
              <CardDescription>Most frequently used endpoints and their metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {apiMetrics.endpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-mono text-sm">{endpoint.path}</p>
                      <p className="text-xs text-gray-600">{endpoint.requests.toLocaleString()} requests</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <p className="font-bold">{endpoint.avgTime}ms</p>
                        <p className="text-xs text-gray-600">Avg Time</p>
                      </div>
                      <div className="text-center">
                        <p className={`font-bold ${endpoint.errors > 10 ? 'text-red-600' : endpoint.errors > 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {endpoint.errors}
                        </p>
                        <p className="text-xs text-gray-600">Errors</p>
                      </div>
                      <Badge variant={endpoint.errors > 10 ? "destructive" : endpoint.errors > 5 ? "secondary" : "default"}>
                        {endpoint.errors > 10 ? 'High Error' : endpoint.errors > 5 ? 'Some Errors' : 'Healthy'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database Tab */}
        <TabsContent value="database" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Connections</p>
                    <p className="text-2xl font-bold text-blue-600">{databaseMetrics.connections.active}</p>
                    <p className="text-xs text-gray-500">of {databaseMetrics.connections.max} max</p>
                  </div>
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Queries Today</p>
                    <p className="text-2xl font-bold text-green-600">{databaseMetrics.queries.totalToday.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{databaseMetrics.queries.avgExecutionTime}ms avg</p>
                  </div>
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Storage Used</p>
                    <p className="text-2xl font-bold text-purple-600">{formatBytes(databaseMetrics.storage.used)}</p>
                    <p className="text-xs text-gray-500">of {formatBytes(databaseMetrics.storage.total)}</p>
                  </div>
                  <HardDrive className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Slow Queries</p>
                    <p className="text-2xl font-bold text-red-600">{databaseMetrics.queries.slowQueries}</p>
                    <p className="text-xs text-gray-500">requiring attention</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Database Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Database Health
                </CardTitle>
                <CardDescription>Connection and replication status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Connection Pool</span>
                    <span className="text-sm font-bold">{Math.round((databaseMetrics.connections.active / databaseMetrics.connections.max) * 100)}%</span>
                  </div>
                  <Progress value={(databaseMetrics.connections.active / databaseMetrics.connections.max) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {databaseMetrics.connections.active} active, {databaseMetrics.connections.idle} idle
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Storage Usage</span>
                    <span className="text-sm font-bold">{Math.round((databaseMetrics.storage.used / databaseMetrics.storage.total) * 100)}%</span>
                  </div>
                  <Progress value={(databaseMetrics.storage.used / databaseMetrics.storage.total) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    Indexes: {formatBytes(databaseMetrics.storage.indexes)}
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Replication Status</p>
                    <p className="text-xs text-gray-600">Lag: {databaseMetrics.replication.lag}s • Last sync: {databaseMetrics.replication.lastSync}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {databaseMetrics.replication.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Slow Queries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bug className="h-5 w-5 mr-2 text-red-600" />
                  Slow Queries
                </CardTitle>
                <CardDescription>Queries requiring optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {databaseMetrics.slowQueries.map((query, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-mono text-xs text-gray-800 flex-1 mr-4">
                        {query.query.length > 60 ? `${query.query.substring(0, 60)}...` : query.query}
                      </p>
                      <Badge variant="destructive">
                        {query.time}ms
                      </Badge>
                    </div>
                    <p className="text-xs text-red-600">
                      Executed {query.frequency} times • Needs optimization
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Health Checks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(serverStatus).map(([service, status]) => (
                    <div key={service} className="flex justify-between items-center">
                      <span className="text-sm capitalize">{service.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <Badge className={getStatusBadge(status)}>
                        {status === 'healthy' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {status === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Response Time</span>
                    <div className="flex items-center">
                      <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">-12ms</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Error Rate</span>
                    <div className="flex items-center">
                      <TrendingUp className="h-3 w-3 text-red-600 mr-1" />
                      <span className="text-sm text-red-600">+0.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Throughput</span>
                    <div className="flex items-center">
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">+15.3%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <div className="flex items-center">
                      <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">-5.7%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">SSL Certificates</span>
                    <Badge className="bg-green-100 text-green-800">Valid</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Firewall Status</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Failed Login Attempts</span>
                    <span className="text-sm font-bold">23 (last 24h)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">DDoS Protection</span>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Recent System Logs
              </CardTitle>
              <CardDescription>Latest system events and errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentLogs.map((log, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg font-mono text-xs">
                    <span className="text-gray-500 whitespace-nowrap">{log.timestamp}</span>
                    <Badge 
                      variant={log.level === 'ERROR' ? 'destructive' : log.level === 'WARN' ? 'secondary' : 'default'}
                      className="text-xs"
                    >
                      {log.level}
                    </Badge>
                    <span className="text-blue-600 whitespace-nowrap">{log.service}</span>
                    <span className="text-gray-800 flex-1">{log.message}</span>
                    {log.count > 1 && (
                      <Badge variant="outline" className="text-xs">
                        {log.count}x
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
