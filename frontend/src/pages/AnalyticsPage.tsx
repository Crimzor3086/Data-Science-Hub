import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Background } from '@/components/ui/background';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Code, 
  Award, 
  Star, 
  TrendingUp, 
  Calendar, 
  Download,
  Filter,
  X,
  MoreVertical,
  RefreshCw
} from 'lucide-react';

const analyticsData = {
  overview: {
    totalUsers: 1250,
    activeUsers: 890,
    totalCourses: 45,
    totalProjects: 78,
    completionRate: 85,
    satisfactionRate: 92
  },
  trends: {
    users: [
      { month: 'Jan', value: 100 },
      { month: 'Feb', value: 120 },
      { month: 'Mar', value: 150 },
      { month: 'Apr', value: 180 },
      { month: 'May', value: 200 },
      { month: 'Jun', value: 220 }
    ],
    courses: [
      { month: 'Jan', value: 30 },
      { month: 'Feb', value: 35 },
      { month: 'Mar', value: 40 },
      { month: 'Apr', value: 42 },
      { month: 'May', value: 45 },
      { month: 'Jun', value: 48 }
    ],
    projects: [
      { month: 'Jan', value: 50 },
      { month: 'Feb', value: 55 },
      { month: 'Mar', value: 60 },
      { month: 'Apr', value: 65 },
      { month: 'May', value: 70 },
      { month: 'Jun', value: 78 }
    ]
  },
  topCourses: [
    {
      title: 'Machine Learning Fundamentals',
      students: 250,
      rating: 4.8,
      completion: 85
    },
    {
      title: 'Data Visualization with Python',
      students: 180,
      rating: 4.7,
      completion: 80
    },
    {
      title: 'Deep Learning Basics',
      students: 150,
      rating: 4.9,
      completion: 75
    }
  ],
  topProjects: [
    {
      title: 'Customer Churn Prediction',
      team: 'Data Science Team',
      progress: 75,
      status: 'In Progress'
    },
    {
      title: 'Sales Forecasting',
      team: 'Analytics Team',
      progress: 100,
      status: 'Completed'
    },
    {
      title: 'Natural Language Processing Pipeline',
      team: 'AI Research Team',
      progress: 60,
      status: 'In Progress'
    }
  ]
};

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <Background 
      image="/images/image (19).jpg"
      overlayOpacity={0.85}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Analytics</h1>
              <p className="text-muted-foreground">Track and analyze platform performance</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <h3 className="text-2xl font-bold text-primary">{analyticsData.overview.totalUsers}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <h3 className="text-2xl font-bold text-primary">{analyticsData.overview.activeUsers}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+8% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                    <h3 className="text-2xl font-bold text-primary">{analyticsData.overview.completionRate}%</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+5% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Top Courses</CardTitle>
                <CardDescription>Most popular courses by enrollment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.students} students</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{course.rating}</div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{course.completion}%</div>
                          <div className="text-xs text-muted-foreground">Completion</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Top Projects</CardTitle>
                <CardDescription>Most active projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-muted-foreground">{project.team}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{project.progress}%</div>
                          <div className="text-xs text-muted-foreground">Progress</div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            project.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default AnalyticsPage; 