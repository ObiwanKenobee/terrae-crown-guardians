import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Zap, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  MousePointer,
  Download,
  Upload,
  Wifi,
  Battery,
  Globe,
  Code,
  Layers,
  Activity,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

const FrontendDashboard: React.FC = () => {
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 1247,
    pageViews: 18432,
    bounceRate: 23.4,
    avgSessionTime: '4:32',
    loadTime: 1.2,
    errorRate: 0.3
  });

  const performanceMetrics = {
    coreWebVitals: {
      lcp: { value: 1.8, status: 'good', threshold: 2.5 }, // Largest Contentful Paint
      fid: { value: 45, status: 'good', threshold: 100 }, // First Input Delay
      cls: { value: 0.08, status: 'good', threshold: 0.1 } // Cumulative Layout Shift
    },
    lighthouse: {
      performance: 94,
      accessibility: 98,
      bestPractices: 92,
      seo: 96
    },
    bundleAnalysis: {
      totalSize: 847, // KB
      jsSize: 234,
      cssSize: 67,
      imageSize: 523,
      compressionRatio: 68
    }
  };

  const userBehavior = {
    deviceBreakdown: [
      { device: 'Desktop', percentage: 45, users: 561, icon: Monitor },
      { device: 'Mobile', percentage: 42, users: 524, icon: Smartphone },
      { device: 'Tablet', percentage: 13, users: 162, icon: Tablet }
    ],
    topPages: [
      { page: '/dashboard', views: 3420, bounceRate: 15.2, avgTime: '6:45' },
      { page: '/crown-bioregions', views: 2890, bounceRate: 22.1, avgTime: '5:12' },
      { page: '/partnerships', views: 2156, bounceRate: 18.7, avgTime: '4:33' },
      { page: '/immersive', views: 1876, bounceRate: 28.9, avgTime: '3:21' },
      { page: '/about', views: 1543, bounceRate: 31.2, avgTime: '2:54' }
    ],
    userFlow: [
      { step: 'Landing', users: 1000, conversionRate: 100 },
      { step: 'Navigation', users: 847, conversionRate: 84.7 },
      { step: 'Engagement', users: 623, conversionRate: 62.3 },
      { step: 'Action', users: 387, conversionRate: 38.7 },
      { step: 'Conversion', users: 156, conversionRate: 15.6 }
    ]
  };

  const componentMetrics = {
    mostUsed: [
      { component: 'EnterpriseHeader', usage: 98.7, renders: 45234 },
      { component: 'CorporatePartnership', usage: 67.3, renders: 12847 },
      { component: 'ImmersiveExperiences', usage: 54.2, renders: 9876 },
      { component: 'StartupDashboard', usage: 43.1, renders: 7234 },
      { component: 'WildlifeDiplomacy', usage: 38.9, renders: 6123 }
    ],
    errorProne: [
      { component: 'AuthModal', errors: 23, errorRate: 0.8 },
      { component: 'PaymentModal', errors: 18, errorRate: 1.2 },
      { component: 'MobileOptimized', errors: 12, errorRate: 0.4 },
      { component: 'BlockchainDashboard', errors: 8, errorRate: 0.3 }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatBytes = (bytes: number) => {
    return `${bytes} KB`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Frontend Dashboard</h1>
          <p className="text-gray-600">Real-time frontend performance and user experience metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800">
            <Activity className="h-3 w-3 mr-1" />
            Live
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-blue-600">{realTimeData.activeUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Page Views</p>
                <p className="text-2xl font-bold text-green-600">{realTimeData.pageViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-bold text-yellow-600">{realTimeData.bounceRate}%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Session</p>
                <p className="text-2xl font-bold text-purple-600">{realTimeData.avgSessionTime}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Load Time</p>
                <p className="text-2xl font-bold text-green-600">{realTimeData.loadTime}s</p>
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
                <p className="text-2xl font-bold text-red-600">{realTimeData.errorRate}%</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">User Behavior</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Core Web Vitals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Core Web Vitals
                </CardTitle>
                <CardDescription>Google's user experience metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Largest Contentful Paint</span>
                      <span className={`text-sm font-bold ${getStatusColor(performanceMetrics.coreWebVitals.lcp.status)}`}>
                        {performanceMetrics.coreWebVitals.lcp.value}s
                      </span>
                    </div>
                    <Progress 
                      value={(performanceMetrics.coreWebVitals.lcp.value / performanceMetrics.coreWebVitals.lcp.threshold) * 100} 
                      className="h-2"
                    />
                    <p className="text-xs text-gray-500">Good: &lt; {performanceMetrics.coreWebVitals.lcp.threshold}s</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">First Input Delay</span>
                      <span className={`text-sm font-bold ${getStatusColor(performanceMetrics.coreWebVitals.fid.status)}`}>
                        {performanceMetrics.coreWebVitals.fid.value}ms
                      </span>
                    </div>
                    <Progress 
                      value={100 - (performanceMetrics.coreWebVitals.fid.value / performanceMetrics.coreWebVitals.fid.threshold) * 100} 
                      className="h-2"
                    />
                    <p className="text-xs text-gray-500">Good: &lt; {performanceMetrics.coreWebVitals.fid.threshold}ms</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Cumulative Layout Shift</span>
                      <span className={`text-sm font-bold ${getStatusColor(performanceMetrics.coreWebVitals.cls.status)}`}>
                        {performanceMetrics.coreWebVitals.cls.value}
                      </span>
                    </div>
                    <Progress 
                      value={100 - (performanceMetrics.coreWebVitals.cls.value / performanceMetrics.coreWebVitals.cls.threshold) * 100} 
                      className="h-2"
                    />
                    <p className="text-xs text-gray-500">Good: &lt; {performanceMetrics.coreWebVitals.cls.threshold}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lighthouse Scores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Lighthouse Audit
                </CardTitle>
                <CardDescription>Overall site quality metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {performanceMetrics.lighthouse.performance}
                    </div>
                    <p className="text-sm text-gray-600">Performance</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {performanceMetrics.lighthouse.accessibility}
                    </div>
                    <p className="text-sm text-gray-600">Accessibility</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {performanceMetrics.lighthouse.bestPractices}
                    </div>
                    <p className="text-sm text-gray-600">Best Practices</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {performanceMetrics.lighthouse.seo}
                    </div>
                    <p className="text-sm text-gray-600">SEO</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bundle Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="h-5 w-5 mr-2" />
                Bundle Analysis
              </CardTitle>
              <CardDescription>Application bundle size and composition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {formatBytes(performanceMetrics.bundleAnalysis.totalSize)}
                  </div>
                  <p className="text-sm text-gray-600">Total Size</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">
                    {formatBytes(performanceMetrics.bundleAnalysis.jsSize)}
                  </div>
                  <p className="text-sm text-gray-600">JavaScript</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatBytes(performanceMetrics.bundleAnalysis.cssSize)}
                  </div>
                  <p className="text-sm text-gray-600">CSS</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatBytes(performanceMetrics.bundleAnalysis.imageSize)}
                  </div>
                  <p className="text-sm text-gray-600">Images</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {performanceMetrics.bundleAnalysis.compressionRatio}%
                  </div>
                  <p className="text-sm text-gray-600">Compressed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Behavior Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>User distribution across devices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userBehavior.deviceBreakdown.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <device.icon className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">{device.device}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24">
                        <Progress value={device.percentage} className="h-2" />
                      </div>
                      <span className="text-sm font-bold w-12">{device.percentage}%</span>
                      <span className="text-sm text-gray-600">({device.users})</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages and their metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userBehavior.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{page.page}</p>
                        <p className="text-xs text-gray-600">{page.views} views • {page.avgTime} avg time</p>
                      </div>
                      <Badge variant={page.bounceRate < 25 ? "default" : page.bounceRate < 35 ? "secondary" : "destructive"}>
                        {page.bounceRate}% bounce
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Flow */}
          <Card>
            <CardHeader>
              <CardTitle>User Conversion Flow</CardTitle>
              <CardDescription>User journey through the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between space-x-4">
                {userBehavior.userFlow.map((step, index) => (
                  <div key={index} className="flex-1 text-center">
                    <div className="relative">
                      <div className="w-full h-20 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{step.users}</p>
                          <p className="text-xs text-blue-600">{step.conversionRate}%</p>
                        </div>
                      </div>
                      {index < userBehavior.userFlow.length - 1 && (
                        <div className="absolute top-10 -right-2 w-4 h-4 bg-white border-2 border-blue-300 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium">{step.step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Components Tab */}
        <TabsContent value="components" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Most Used Components */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Most Used Components
                </CardTitle>
                <CardDescription>Component usage and render statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {componentMetrics.mostUsed.map((component, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{component.component}</p>
                      <p className="text-xs text-gray-600">{component.renders.toLocaleString()} renders</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20">
                        <Progress value={component.usage} className="h-2" />
                      </div>
                      <span className="text-sm font-bold">{component.usage}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Error-Prone Components */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                  Error-Prone Components
                </CardTitle>
                <CardDescription>Components with highest error rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {componentMetrics.errorProne.map((component, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{component.component}</p>
                      <p className="text-xs text-red-600">{component.errors} errors this week</p>
                    </div>
                    <Badge variant="destructive">
                      {component.errorRate}% error rate
                    </Badge>
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
                  <Wifi className="h-5 w-5 mr-2" />
                  Network Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">CDN Health</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">API Response</span>
                    <span className="text-sm font-bold">234ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cache Hit Rate</span>
                    <span className="text-sm font-bold">94.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Battery className="h-5 w-5 mr-2" />
                  Resource Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Bandwidth</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Performance Score</span>
                    <div className="flex items-center">
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">+2.3%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Error Rate</span>
                    <div className="flex items-center">
                      <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">-15.7%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Load Time</span>
                    <div className="flex items-center">
                      <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">-0.3s</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FrontendDashboard;
