import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Globe, 
  Zap, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Code, 
  Book, 
  Key, 
  Shield, 
  Activity, 
  BarChart3, 
  FileText, 
  Settings, 
  Download, 
  Copy, 
  Play, 
  Pause, 
  RefreshCw, 
  Search,
  Filter,
  ExternalLink,
  Database,
  Server,
  Cpu,
  HardDrive
} from 'lucide-react';

export function APIDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  
  const apiMetrics = {
    totalEndpoints: 47,
    activeEndpoints: 45,
    totalRequests: 1456789,
    requestsPerSecond: 234,
    averageLatency: 189,
    errorRate: 0.8,
    uptime: 99.97,
    dataTransferred: 245.6 // GB
  };

  const endpointPerformance = [
    { 
      endpoint: '/api/v1/blockchain/transactions', 
      method: 'GET', 
      requests: 156789, 
      avgLatency: 145, 
      errorRate: 0.2, 
      status: 'healthy',
      lastUsed: '2 minutes ago'
    },
    { 
      endpoint: '/api/v1/partnerships/proposals', 
      method: 'POST', 
      requests: 98432, 
      avgLatency: 234, 
      errorRate: 1.2, 
      status: 'warning',
      lastUsed: '5 minutes ago'
    },
    { 
      endpoint: '/api/v1/auth/verify', 
      method: 'POST', 
      requests: 234567, 
      avgLatency: 67, 
      errorRate: 0.1, 
      status: 'healthy',
      lastUsed: '1 minute ago'
    },
    { 
      endpoint: '/api/v1/immersive/experiences', 
      method: 'GET', 
      requests: 45678, 
      avgLatency: 445, 
      errorRate: 2.1, 
      status: 'error',
      lastUsed: '10 minutes ago'
    },
    { 
      endpoint: '/api/v1/diplomacy/conflicts', 
      method: 'GET', 
      requests: 23456, 
      avgLatency: 178, 
      errorRate: 0.5, 
      status: 'healthy',
      lastUsed: '3 minutes ago'
    }
  ];

  const apiClients = [
    { 
      name: 'Frontend Web App', 
      apiKey: 'web_***45612', 
      requests: 456789, 
      quota: 1000000, 
      lastActive: '2 minutes ago',
      version: 'v1',
      status: 'active'
    },
    { 
      name: 'Mobile App', 
      apiKey: 'mobile_***78901', 
      requests: 234567, 
      quota: 500000, 
      lastActive: '5 minutes ago',
      version: 'v1',
      status: 'active'
    },
    { 
      name: 'Corporate Dashboard', 
      apiKey: 'corp_***23456', 
      requests: 123456, 
      quota: 750000, 
      lastActive: '1 hour ago',
      version: 'v1',
      status: 'active'
    },
    { 
      name: 'Third-party Integration', 
      apiKey: 'ext_***34567', 
      requests: 45678, 
      quota: 100000, 
      lastActive: '30 minutes ago',
      version: 'v1',
      status: 'limited'
    }
  ];

  const errorAnalysis = {
    topErrors: [
      { code: 500, message: 'Internal Server Error', count: 234, percentage: 45.2 },
      { code: 429, message: 'Too Many Requests', count: 156, percentage: 30.1 },
      { code: 404, message: 'Not Found', count: 89, percentage: 17.2 },
      { code: 403, message: 'Forbidden', count: 34, percentage: 6.6 },
      { code: 400, message: 'Bad Request', count: 5, percentage: 0.9 }
    ],
    errorTrends: {
      last24h: 518,
      previous24h: 623,
      weeklyAverage: 445
    }
  };

  const securityMetrics = {
    authenticationAttempts: 45678,
    failedLogins: 234,
    rateLimitHits: 567,
    suspiciousActivity: 12,
    blockedIPs: ['192.168.1.100', '10.0.0.45', '172.16.0.23'],
    apiKeyRotations: 8
  };

  const documentation = {
    endpoints: 47,
    examples: 156,
    lastUpdated: '2 hours ago',
    coverage: 94.3,
    versions: ['v1', 'v2-beta'],
    languages: ['JavaScript', 'Python', 'PHP', 'Java', 'Go']
  };

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
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'limited': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Dashboard</h1>
          <p className="text-gray-600">Monitor API performance, usage, and developer experience</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-blue-100 text-blue-800">
            <Globe className="h-3 w-3 mr-1" />
            API v1.2.3
          </Badge>
          <Button variant="outline" size="sm">
            <Book className="h-4 w-4 mr-2" />
            Documentation
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Metrics
          </Button>
        </div>
      </div>

      {/* API Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-blue-600">{apiMetrics.totalRequests.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{apiMetrics.requestsPerSecond} req/sec</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Latency</p>
                <p className="text-2xl font-bold text-green-600">{apiMetrics.averageLatency}ms</p>
                <p className="text-xs text-gray-500">Response time</p>
              </div>
              <Zap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Error Rate</p>
                <p className="text-2xl font-bold text-yellow-600">{apiMetrics.errorRate}%</p>
                <p className="text-xs text-gray-500">Last 24 hours</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-purple-600">{apiMetrics.uptime}%</p>
                <p className="text-xs text-gray-500">99.97% SLA</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="endpoints" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="clients">API Clients</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        {/* Endpoints Tab */}
        <TabsContent value="endpoints" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold">Endpoint Performance</h3>
              <Badge variant="outline">{apiMetrics.activeEndpoints} of {apiMetrics.totalEndpoints} active</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {endpointPerformance.map((endpoint, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                      <div>
                        <p className="font-mono text-sm font-medium">{endpoint.endpoint}</p>
                        <p className="text-xs text-gray-600">
                          {endpoint.requests.toLocaleString()} requests • Last used: {endpoint.lastUsed}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm font-bold">{endpoint.avgLatency}ms</p>
                        <p className="text-xs text-gray-600">Latency</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-sm font-bold ${endpoint.errorRate > 1 ? 'text-red-600' : 'text-green-600'}`}>
                          {endpoint.errorRate}%
                        </p>
                        <p className="text-xs text-gray-600">Error Rate</p>
                      </div>
                      <Badge className={getStatusBadge(endpoint.status)}>
                        {endpoint.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Test
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Most Popular Endpoint</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm">/api/v1/auth/verify</p>
                <p className="text-xs text-gray-600">234,567 requests (24h)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Slowest Endpoint</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm">/api/v1/immersive/experiences</p>
                <p className="text-xs text-gray-600">445ms average latency</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Data Transferred</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{apiMetrics.dataTransferred} GB</p>
                <p className="text-xs text-gray-600">Last 24 hours</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* API Clients Tab */}
        <TabsContent value="clients" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">API Clients & Usage</h3>
            <Button>
              <Key className="h-4 w-4 mr-2" />
              Generate API Key
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {apiClients.map((client, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <Badge className={getStatusBadge(client.status)}>
                      {client.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    API Key: {client.apiKey} • Version: {client.version}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Request Quota</span>
                      <span>{client.requests.toLocaleString()} / {client.quota.toLocaleString()}</span>
                    </div>
                    <Progress value={(client.requests / client.quota) * 100} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Last Active</span>
                    <span className="font-medium">{client.lastActive}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Analytics
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Usage Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Distribution</CardTitle>
              <CardDescription>Request volume by client type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{client.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32">
                        <Progress 
                          value={(client.requests / Math.max(...apiClients.map(c => c.requests))) * 100} 
                          className="h-2" 
                        />
                      </div>
                      <span className="text-sm font-bold w-20 text-right">
                        {((client.requests / apiClients.reduce((sum, c) => sum + c.requests, 0)) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Error Analysis Tab */}
        <TabsContent value="errors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Error Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                  Error Distribution
                </CardTitle>
                <CardDescription>Most common error types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {errorAnalysis.topErrors.map((error, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="destructive">{error.code}</Badge>
                      <span className="text-sm">{error.message}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-20">
                        <Progress value={error.percentage} className="h-2" />
                      </div>
                      <span className="text-sm font-bold w-12">{error.count}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Error Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2 text-green-600" />
                  Error Trends
                </CardTitle>
                <CardDescription>Error volume over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-red-600">{errorAnalysis.errorTrends.last24h}</p>
                    <p className="text-xs text-gray-600">Last 24h</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">{errorAnalysis.errorTrends.previous24h}</p>
                    <p className="text-xs text-gray-600">Previous 24h</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{errorAnalysis.errorTrends.weeklyAverage}</p>
                    <p className="text-xs text-gray-600">Weekly Avg</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
                  <TrendingDown className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm text-green-700">
                    16.8% decrease from previous period
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Errors */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Error Details</CardTitle>
              <CardDescription>Latest API errors requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { timestamp: '2024-12-15 14:32:15', endpoint: '/api/v1/immersive/experiences', error: '500 Internal Server Error', client: 'mobile_app' },
                  { timestamp: '2024-12-15 14:30:42', endpoint: '/api/v1/partnerships/proposals', error: '429 Too Many Requests', client: 'web_app' },
                  { timestamp: '2024-12-15 14:28:33', endpoint: '/api/v1/auth/verify', error: '403 Forbidden', client: 'third_party' },
                  { timestamp: '2024-12-15 14:25:18', endpoint: '/api/v1/blockchain/transactions', error: '404 Not Found', client: 'corp_dashboard' }
                ].map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-xs text-gray-600">{error.timestamp}</span>
                      <span className="font-mono text-sm">{error.endpoint}</span>
                      <Badge variant="destructive">{error.error}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600">{error.client}</span>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Auth Attempts</p>
                    <p className="text-2xl font-bold text-blue-600">{securityMetrics.authenticationAttempts.toLocaleString()}</p>
                  </div>
                  <Key className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Failed Logins</p>
                    <p className="text-2xl font-bold text-red-600">{securityMetrics.failedLogins}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Rate Limit Hits</p>
                    <p className="text-2xl font-bold text-yellow-600">{securityMetrics.rateLimitHits}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Blocked IPs</p>
                    <p className="text-2xl font-bold text-purple-600">{securityMetrics.blockedIPs.length}</p>
                  </div>
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Events
                </CardTitle>
                <CardDescription>Recent security-related activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Suspicious Activity Detected</p>
                    <p className="text-xs text-gray-600">Multiple failed attempts from 192.168.1.100</p>
                  </div>
                  <Badge variant="destructive">High</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Rate Limit Exceeded</p>
                    <p className="text-xs text-gray-600">Client exceeded 1000 req/min limit</p>
                  </div>
                  <Badge variant="secondary">Medium</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">API Key Rotated</p>
                    <p className="text-xs text-gray-600">Corporate client updated security credentials</p>
                  </div>
                  <Badge variant="default">Info</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Blocked IPs */}
            <Card>
              <CardHeader>
                <CardTitle>Blocked IP Addresses</CardTitle>
                <CardDescription>Currently blocked suspicious IPs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {securityMetrics.blockedIPs.map((ip, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono text-sm">{ip}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Unblock
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="docs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Endpoints</p>
                    <p className="text-2xl font-bold text-blue-600">{documentation.endpoints}</p>
                  </div>
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Code Examples</p>
                    <p className="text-2xl font-bold text-green-600">{documentation.examples}</p>
                  </div>
                  <Code className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Coverage</p>
                    <p className="text-2xl font-bold text-purple-600">{documentation.coverage}%</p>
                  </div>
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Languages</p>
                    <p className="text-2xl font-bold text-orange-600">{documentation.languages.length}</p>
                  </div>
                  <Book className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Documentation Status */}
            <Card>
              <CardHeader>
                <CardTitle>Documentation Status</CardTitle>
                <CardDescription>API documentation completeness</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Coverage</span>
                    <span className="text-sm font-bold">{documentation.coverage}%</span>
                  </div>
                  <Progress value={documentation.coverage} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Last Updated</span>
                    <span className="text-sm font-medium">{documentation.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Active Versions</span>
                    <div className="flex space-x-1">
                      {documentation.versions.map((version, index) => (
                        <Badge key={index} variant="outline">{version}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language SDKs */}
            <Card>
              <CardHeader>
                <CardTitle>SDK Languages</CardTitle>
                <CardDescription>Available client libraries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {documentation.languages.map((language, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-sm">{language}</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        SDK
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Testing Tab */}
        <TabsContent value="testing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Testing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  API Testing Console
                </CardTitle>
                <CardDescription>Test endpoints directly from the dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Endpoint</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>GET /api/v1/blockchain/transactions</option>
                    <option>POST /api/v1/partnerships/proposals</option>
                    <option>GET /api/v1/auth/verify</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Headers</label>
                  <textarea 
                    className="w-full p-2 border rounded-lg font-mono text-sm"
                    rows={3}
                    placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Request Body</label>
                  <textarea 
                    className="w-full p-2 border rounded-lg font-mono text-sm"
                    rows={4}
                    placeholder='{"key": "value"}'
                  />
                </div>
                
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Send Request
                </Button>
              </CardContent>
            </Card>

            {/* Test Results */}
            <Card>
              <CardHeader>
                <CardTitle>Response</CardTitle>
                <CardDescription>Test result and response details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Status: 200 OK</span>
                    <span className="text-sm text-gray-600">Response time: 145ms</span>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Response Headers</label>
                    <pre className="mt-1 p-3 bg-gray-50 rounded-lg text-xs font-mono overflow-x-auto">
{`Content-Type: application/json
Cache-Control: max-age=300
X-RateLimit-Remaining: 999`}
                    </pre>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Response Body</label>
                    <pre className="mt-1 p-3 bg-gray-50 rounded-lg text-xs font-mono overflow-x-auto">
{`{
  "data": {
    "transactions": [...],
    "total": 1234,
    "page": 1
  },
  "success": true
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Tests</CardTitle>
              <CardDescription>History of API endpoint tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { endpoint: 'GET /api/v1/blockchain/transactions', status: 200, time: '145ms', timestamp: '14:32:15' },
                  { endpoint: 'POST /api/v1/partnerships/proposals', status: 422, time: '234ms', timestamp: '14:30:42' },
                  { endpoint: 'GET /api/v1/auth/verify', status: 200, time: '67ms', timestamp: '14:28:33' },
                  { endpoint: 'GET /api/v1/immersive/experiences', status: 500, time: '2145ms', timestamp: '14:25:18' }
                ].map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-xs">{test.timestamp}</span>
                      <span className="font-mono text-sm">{test.endpoint}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={test.status === 200 ? "default" : "destructive"}>
                        {test.status}
                      </Badge>
                      <span className="text-sm">{test.time}</span>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
