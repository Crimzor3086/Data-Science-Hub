import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Activity, Database, AlertTriangle } from "lucide-react";
import { useAnalytics } from "@/hooks/useApi";

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  storageUsed: string;
  apiRequests: number;
  performance: {
    responseTime: number;
    cpuUsage: number;
    memoryUsage: number;
    networkTraffic: number;
  };
  errors: Array<{
    id: string;
    timestamp: string;
    level: 'error' | 'warning';
    message: string;
  }>;
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("usage");
  const { data: analytics, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading analytics data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">
          Error loading analytics: {error}
        </div>
      </div>
    );
  }

  const data = analytics as AnalyticsData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Analytics Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {data.activeUsers} active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              Current active sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.storageUsed}</div>
            <p className="text-xs text-muted-foreground">
              Of total storage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.apiRequests}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>
                Platform usage over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                Usage Chart Placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>
                Current system metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Average Response Time</div>
                  <div className="text-2xl font-bold">{data.performance.responseTime}ms</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">CPU Usage</div>
                  <div className="text-2xl font-bold">{data.performance.cpuUsage}%</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Memory Usage</div>
                  <div className="text-2xl font-bold">{data.performance.memoryUsage}%</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Network Traffic</div>
                  <div className="text-2xl font-bold">{data.performance.networkTraffic} MB/s</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Errors</CardTitle>
              <CardDescription>
                Recent system errors and warnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.errors.map((error) => (
                  <div
                    key={error.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border"
                  >
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        error.level === "error" ? "text-red-500" : "text-yellow-500"
                      }`}
                    />
                    <div>
                      <div className="font-medium">{error.message}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(error.timestamp).toLocaleString()}
                      </div>
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