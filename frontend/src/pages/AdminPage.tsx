import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, Shield, Settings, Activity, AlertTriangle, Clock, Search, Filter, X, MoreVertical, Plus, RefreshCw, Download, Upload, Trash2, Eye, Database, Edit } from "lucide-react";
import { useAnalytics } from "@/hooks/useApi";
import { Background } from "@/components/ui/background";
import { Input } from "@/components/ui/input";

const adminData = {
  overview: {
    totalUsers: 12500,
    activeUsers: 8900,
    totalCourses: 150,
    totalProjects: 75,
    storageUsed: '2.5 TB',
    apiRequests: '1.2M/day'
  },
  recentActivity: [
    {
      id: 1,
      user: 'John Doe',
      action: 'Created a new course',
      target: 'Machine Learning Fundamentals',
      timestamp: '2023-07-15T10:30:00',
      type: 'course'
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Updated project settings',
      target: 'Data Visualization Dashboard',
      timestamp: '2023-07-15T09:45:00',
      type: 'project'
    },
    {
      id: 3,
      user: 'Michael Johnson',
      action: 'Added new user',
      target: 'Sarah Williams',
      timestamp: '2023-07-14T16:20:00',
      type: 'user'
    },
    {
      id: 4,
      user: 'Emily Davis',
      action: 'Published new content',
      target: 'Python for Data Science',
      timestamp: '2023-07-14T14:15:00',
      type: 'content'
    },
    {
      id: 5,
      user: 'David Brown',
      action: 'Modified system settings',
      target: 'Email Configuration',
      timestamp: '2023-07-14T11:30:00',
      type: 'system'
    }
  ],
  systemMetrics: {
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 78,
    networkTraffic: 125
  }
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: stats, loading, error } = useAnalytics();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredActivity = adminData.recentActivity.filter(activity => {
    const matchesSearch = 
      activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || activity.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <Background 
      image="/images/image (40).jpg"
      overlayOpacity={0.85}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Admin Dashboard</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage your platform and monitor system performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminData.overview.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {adminData.overview.activeUsers.toLocaleString()} active users
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminData.overview.storageUsed}</div>
                <p className="text-xs text-muted-foreground">
                  Of 5 TB total capacity
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminData.overview.apiRequests}</div>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">Operational</div>
                <p className="text-xs text-muted-foreground">
                  All systems running normally
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/95 backdrop-blur-sm border-primary/20 lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions across the platform</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search activities..."
                      className="pl-9 bg-white/95 backdrop-blur-sm border-primary/20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedType === null ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType(null)}
                      className={selectedType === null ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'border-primary/20 hover:border-primary/40'}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      All
                    </Button>
                    <Button
                      variant={selectedType === 'user' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType('user')}
                      className={selectedType === 'user' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'border-primary/20 hover:border-primary/40'}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Users
                    </Button>
                    <Button
                      variant={selectedType === 'course' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType('course')}
                      className={selectedType === 'course' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'border-primary/20 hover:border-primary/40'}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Courses
                    </Button>
                    <Button
                      variant={selectedType === 'project' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType('project')}
                      className={selectedType === 'project' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'border-primary/20 hover:border-primary/40'}
                    >
                      <Database className="mr-2 h-4 w-4" />
                      Projects
                    </Button>
                    {selectedType && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedType(null)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredActivity.length > 0 ? (
                    filteredActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                        <div className="bg-primary/10 text-primary p-2 rounded-lg">
                          {activity.type === 'user' && <Users className="h-4 w-4" />}
                          {activity.type === 'course' && <Settings className="h-4 w-4" />}
                          {activity.type === 'project' && <Database className="h-4 w-4" />}
                          {activity.type === 'content' && <Activity className="h-4 w-4" />}
                          {activity.type === 'system' && <Shield className="h-4 w-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className="font-medium truncate">{activity.user}</p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(activity.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {activity.action}: <span className="font-medium">{activity.target}</span>
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-primary/10 text-primary p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        <Search className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No activities found</h3>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filter
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>System Metrics</CardTitle>
                <CardDescription>Current system performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm text-muted-foreground">{adminData.systemMetrics.cpuUsage}%</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/20 rounded-full"
                        style={{ width: `${adminData.systemMetrics.cpuUsage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm text-muted-foreground">{adminData.systemMetrics.memoryUsage}%</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/20 rounded-full"
                        style={{ width: `${adminData.systemMetrics.memoryUsage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Disk Usage</span>
                      <span className="text-sm text-muted-foreground">{adminData.systemMetrics.diskUsage}%</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/20 rounded-full"
                        style={{ width: `${adminData.systemMetrics.diskUsage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Network Traffic</span>
                      <span className="text-sm text-muted-foreground">{adminData.systemMetrics.networkTraffic} MB/s</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/20 rounded-full"
                        style={{ width: `${Math.min(100, (adminData.systemMetrics.networkTraffic / 200) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-primary/10">
                  <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40">
                      <Plus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                    <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Content
                    </Button>
                    <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary/40">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Cleanup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" className="border-primary/20 hover:border-primary/40">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default AdminPage; 