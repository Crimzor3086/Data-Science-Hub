import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Users, 
  FileText, 
  Settings, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for the dashboard
const projects = [
  {
    id: 1,
    name: "Customer Segmentation Analysis",
    status: "In Progress",
    progress: 65,
    deadline: "2023-12-15",
    team: ["Ogechi Daniel Koel", "Nobert Wafula"]
  },
  {
    id: 2,
    name: "Sales Forecasting Model",
    status: "Completed",
    progress: 100,
    deadline: "2023-11-30",
    team: ["Enock Bereka", "Timothy Achala"]
  },
  {
    id: 3,
    name: "Market Basket Analysis",
    status: "Planning",
    progress: 25,
    deadline: "2024-01-20",
    team: ["Ogechi Daniel Koel"]
  }
];

const recentActivities = [
  {
    id: 1,
    type: "update",
    message: "Project 'Customer Segmentation Analysis' was updated",
    timestamp: "2 hours ago",
    user: "Ogechi Daniel Koel"
  },
  {
    id: 2,
    type: "complete",
    message: "Project 'Sales Forecasting Model' was completed",
    timestamp: "1 day ago",
    user: "Enock Bereka"
  },
  {
    id: 3,
    type: "create",
    message: "New project 'Market Basket Analysis' was created",
    timestamp: "3 days ago",
    user: "Timothy Achala"
  }
];

const ClientDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Client Dashboard</h1>
          <div className="flex gap-3">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link to="/projects">View All Projects</Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/new-project">New Project</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card border-primary/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Projects</p>
                      <h3 className="text-2xl font-bold text-primary mt-1">3</h3>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+1 from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-primary/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Team Members</p>
                      <h3 className="text-2xl font-bold text-primary mt-1">4</h3>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+1 from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-primary/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Reports Generated</p>
                      <h3 className="text-2xl font-bold text-primary mt-1">12</h3>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+3 from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-primary/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Upcoming Deadlines</p>
                      <h3 className="text-2xl font-bold text-primary mt-1">2</h3>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-red-500">-1 from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projects Overview */}
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Projects Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-card-foreground">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">Team: {project.team.join(", ")}</p>
                        </div>
                        <div className="flex items-center">
                          <span className={`text-sm mr-2 ${
                            project.status === "Completed" ? "text-green-500" : 
                            project.status === "In Progress" ? "text-blue-500" : "text-amber-500"
                          }`}>
                            {project.status}
                          </span>
                          <div className="bg-primary/10 px-2 py-1 rounded text-xs text-primary">
                            {project.deadline}
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            project.status === "Completed" ? "bg-green-500" : 
                            project.status === "In Progress" ? "bg-blue-500" : "bg-amber-500"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Progress: {project.progress}%</span>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90">
                          <Link to={`/projects/${project.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className={`p-2 rounded-full ${
                        activity.type === "update" ? "bg-blue-500/10" : 
                        activity.type === "complete" ? "bg-green-500/10" : "bg-amber-500/10"
                      }`}>
                        {activity.type === "update" ? (
                          <Clock className={`h-5 w-5 ${
                            activity.type === "update" ? "text-blue-500" : 
                            activity.type === "complete" ? "text-green-500" : "text-amber-500"
                          }`} />
                        ) : activity.type === "complete" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-card-foreground">{activity.message}</p>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">By {activity.user}</span>
                          <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">All Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-card-foreground">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">Team: {project.team.join(", ")}</p>
                        </div>
                        <div className="flex items-center">
                          <span className={`text-sm mr-2 ${
                            project.status === "Completed" ? "text-green-500" : 
                            project.status === "In Progress" ? "text-blue-500" : "text-amber-500"
                          }`}>
                            {project.status}
                          </span>
                          <div className="bg-primary/10 px-2 py-1 rounded text-xs text-primary">
                            {project.deadline}
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            project.status === "Completed" ? "bg-green-500" : 
                            project.status === "In Progress" ? "bg-blue-500" : "bg-amber-500"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Progress: {project.progress}%</span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90">
                            <Link to={`/projects/${project.id}`}>View Details</Link>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90">
                            <Link to={`/projects/${project.id}/edit`}>Edit</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-card border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">Customer Segmentation</p>
                          <h3 className="text-lg font-bold text-primary mt-1">Final Report</h3>
                        </div>
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                          <Link to="/reports/customer-segmentation">View Report</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">Sales Forecasting</p>
                          <h3 className="text-lg font-bold text-primary mt-1">Q3 Analysis</h3>
                        </div>
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                          <Link to="/reports/sales-forecasting">View Report</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">Market Analysis</p>
                          <h3 className="text-lg font-bold text-primary mt-1">Competitor Report</h3>
                        </div>
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                          <Link to="/reports/market-analysis">View Report</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-card-foreground">Profile Information</h3>
                      <p className="text-sm text-muted-foreground">Update your personal information</p>
                    </div>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      <Link to="/profile">Edit Profile</Link>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-card-foreground">Notification Preferences</h3>
                      <p className="text-sm text-muted-foreground">Manage your notification settings</p>
                    </div>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      <Link to="/settings/notifications">Manage</Link>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-card-foreground">Team Members</h3>
                      <p className="text-sm text-muted-foreground">Manage team access and permissions</p>
                    </div>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      <Link to="/settings/team">Manage</Link>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-card-foreground">API Access</h3>
                      <p className="text-sm text-muted-foreground">Manage API keys and access tokens</p>
                    </div>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      <Link to="/settings/api">Manage</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ClientDashboardPage; 