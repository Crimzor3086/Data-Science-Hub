import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Background } from "@/components/ui/background";
import { Layout } from "@/components/layout/Layout";
import api from "@/lib/api";
import { 
  Users, 
  Activity, 
  Database, 
  BarChart3, 
  LineChart, 
  PieChart,
  Clock,
  AlertTriangle,
  Loader2
} from "lucide-react";

interface AnalyticsData {
  totalUsers: number;
  activeSessions: number;
  storageUsed: number;
  apiRequests: number;
  performance: {
    averageResponseTime: number;
    cpuUsage: number;
    memoryUsage: number;
    networkTraffic: number;
  };
  errors: Array<{
    id: string;
    level: "error" | "warning";
    message: string;
    timestamp: string;
  }>;
}

export const AnalyticsPage = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await api.get("/analytics");
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Background 
        image="/images/image (3).jpg"
        overlayOpacity={0.85}
      >
        <Layout>
          <div className="container mx-auto py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">Loading Analytics...</h1>
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            </div>
          </div>
        </Layout>
      </Background>
    );
  }

  if (error) {
    return (
      <Background 
        image="/images/image (3).jpg"
        overlayOpacity={0.85}
      >
        <Layout>
          <div className="container mx-auto py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">Error Loading Analytics</h1>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        </Layout>
      </Background>
    );
  }

  return (
    <Background 
      image="/images/image (3).jpg"
      overlayOpacity={0.85}
    >
      <Layout>
        <div className="container mx-auto py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-primary mb-4">Platform Analytics</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive overview of platform performance and user engagement
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.totalUsers?.toLocaleString() || '0'}</div>
                  <p className="text-xs text-muted-foreground">
                    Active platform users
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.activeSessions?.toLocaleString() || '0'}</div>
                  <p className="text-xs text-muted-foreground">
                    Current active sessions
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.storageUsed ? `${(data.storageUsed / 1024).toFixed(2)} TB` : '0 TB'}</div>
                  <p className="text-xs text-muted-foreground">
                    Total storage utilization
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.apiRequests ? `${(data.apiRequests / 1000).toFixed(1)}K` : '0'}</div>
                  <p className="text-xs text-muted-foreground">
                    Requests per day
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Response Time</span>
                      <span className="text-sm text-muted-foreground">{data?.performance?.averageResponseTime || 0}ms</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/20 rounded-full"
                        style={{ width: `${Math.min(100, ((data?.performance?.averageResponseTime || 0) / 500) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm text-muted-foreground">{data?.performance?.cpuUsage || 0}%</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/20 rounded-full"
                        style={{ width: `${data?.performance?.cpuUsage || 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm text-muted-foreground">{data?.performance?.memoryUsage || 0}%</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/20 rounded-full"
                        style={{ width: `${data?.performance?.memoryUsage || 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Network Traffic</span>
                      <span className="text-sm text-muted-foreground">{data?.performance?.networkTraffic || 0} MB/s</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/20 rounded-full"
                        style={{ width: `${Math.min(100, ((data?.performance?.networkTraffic || 0) / 200) * 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle>Recent Errors</CardTitle>
                  <CardDescription>System errors and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data?.errors && data.errors.length > 0 ? (
                      data.errors.map((error) => (
                        <div key={error.id} className="flex items-start space-x-4">
                          <div className={`mt-1 ${error.level === 'error' ? 'text-red-500' : 'text-yellow-500'}`}>
                            {error.level === 'error' ? <AlertTriangle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{error.message}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(error.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No errors reported</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  );
}; 