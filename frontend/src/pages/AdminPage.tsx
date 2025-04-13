import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, Shield, Settings, Activity, AlertTriangle, Clock } from "lucide-react";
import { useAnalytics } from "@/hooks/useApi";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: stats, loading, error } = useAnalytics();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link to="/admin/users">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? "Loading..." : `${stats?.activeUsers || 0} active users`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats?.students || 0}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? "Loading..." : "Total registered students"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Shield className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats?.clients || 0}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? "Loading..." : "Total registered clients"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Settings className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats?.admins || 0}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? "Loading..." : "Total system administrators"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
              <CardDescription>
                Quick summary of the Data Science Hub platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">User Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Students</span>
                      <span className="font-medium">{loading ? "..." : stats?.students || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clients</span>
                      <span className="font-medium">{loading ? "..." : stats?.clients || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Admins</span>
                      <span className="font-medium">{loading ? "..." : stats?.admins || 0}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/admin/users">
                        <Users className="mr-2 h-4 w-4" />
                        Manage Users
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/admin/analytics">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Analytics
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/admin/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        System Settings
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions performed by users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-2 mr-4">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">User Registration</p>
                    <p className="text-sm text-muted-foreground">New student registered: John Doe</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-green-100 p-2 mr-4">
                    <Activity className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Course Completion</p>
                    <p className="text-sm text-muted-foreground">Sarah completed Python for Data Science</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-purple-100 p-2 mr-4">
                    <Shield className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Client Onboarding</p>
                    <p className="text-sm text-muted-foreground">New client account created: Acme Corp</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Important notifications and warnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="rounded-full bg-red-100 p-2 mr-4">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Security Alert</p>
                    <p className="text-sm text-muted-foreground">Multiple failed login attempts detected</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-yellow-100 p-2 mr-4">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">System Warning</p>
                    <p className="text-sm text-muted-foreground">High server load detected</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-2 mr-4">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Update Available</p>
                    <p className="text-sm text-muted-foreground">New platform version available: v2.1.0</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Alerts</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 