import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Award, 
  BookOpen, 
  Clock,
  Calendar,
  Star,
  Target,
  CheckCircle2,
  BarChart2,
  LineChart,
  PieChart
} from "lucide-react";
import { Background } from "@/components/ui/background";

// Mock data for courses progress
const coursesProgress = [
  {
    id: 1,
    title: "Data Science Fundamentals",
    progress: 75,
    totalModules: 12,
    completedModules: 9,
    lastAccessed: "2024-03-20",
    nextModule: "Machine Learning Basics",
    estimatedCompletion: "2024-04-15"
  },
  {
    id: 2,
    title: "Python for Data Science",
    progress: 100,
    totalModules: 8,
    completedModules: 8,
    lastAccessed: "2024-03-18",
    nextModule: "None - Course Completed",
    estimatedCompletion: "2024-03-18"
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    progress: 45,
    totalModules: 10,
    completedModules: 4,
    lastAccessed: "2024-03-19",
    nextModule: "Neural Networks",
    estimatedCompletion: "2024-05-01"
  },
  {
    id: 4,
    title: "Data Visualization",
    progress: 30,
    totalModules: 6,
    completedModules: 2,
    lastAccessed: "2024-03-17",
    nextModule: "Advanced Charts",
    estimatedCompletion: "2024-05-10"
  }
];

// Mock data for achievements
const achievements = [
  {
    id: 1,
    title: "Quick Learner",
    description: "Completed 5 modules in a single day",
    date: "2024-03-15",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    category: "Learning"
  },
  {
    id: 2,
    title: "Perfect Score",
    description: "Achieved 100% on a quiz",
    date: "2024-03-10",
    icon: <Trophy className="h-6 w-6 text-blue-500" />,
    category: "Performance"
  },
  {
    id: 3,
    title: "Early Bird",
    description: "Completed an assignment before the deadline",
    date: "2024-03-05",
    icon: <Clock className="h-6 w-6 text-green-500" />,
    category: "Time Management"
  },
  {
    id: 4,
    title: "Team Player",
    description: "Participated in 3 group projects",
    date: "2024-02-28",
    icon: <Award className="h-6 w-6 text-purple-500" />,
    category: "Collaboration"
  }
];

// Mock data for learning stats
const learningStats = {
  totalHoursLearned: 120,
  averageScore: 92,
  completedAssignments: 24,
  currentStreak: 7,
  certificatesEarned: 2,
  skillsAcquired: 15
};

const ProgressPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Layout>
      <Background
        image="/images/image (12).jpg"
        overlayOpacity={0.85}
      >
        <PageHeader 
          title="Learning Progress" 
          subtitle="Track your learning journey and achievements"
        />
      </Background>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="w-full md:w-auto">
            <h2 className="text-3xl font-bold text-primary">My Progress</h2>
            <p className="text-muted-foreground mt-2">
              Track your learning journey and achievements
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Target className="h-4 w-4 mr-2" />
            Set Learning Goals
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-primary/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-primary">Overall Progress</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart2 className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Courses Completed</span>
                  <span className="font-medium">1/4</span>
                </div>
                <Progress value={25} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  {coursesProgress.filter(course => course.progress === 100).length} of {coursesProgress.length} courses completed
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-primary">Learning Time</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{learningStats.totalHoursLearned}</div>
                <p className="text-sm text-muted-foreground">Total hours spent learning</p>
                <div className="flex items-center mt-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Current Streak</p>
                    <p className="text-sm text-muted-foreground">{learningStats.currentStreak} days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-primary">Achievements</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{achievements.length}</div>
                <p className="text-sm text-muted-foreground">Achievements unlocked</p>
                <div className="flex items-center mt-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Skills Acquired</p>
                    <p className="text-sm text-muted-foreground">{learningStats.skillsAcquired} skills</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Learning Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Performance</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-primary/5 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Average Score</p>
                          <p className="text-2xl font-bold text-primary">{learningStats.averageScore}%</p>
                        </div>
                        <div className="bg-primary/5 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Assignments Completed</p>
                          <p className="text-2xl font-bold text-primary">{learningStats.completedAssignments}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Certificates</h3>
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Certificates Earned</p>
                        <p className="text-2xl font-bold text-primary">{learningStats.certificatesEarned}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
                    <div className="space-y-3">
                      {coursesProgress
                        .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
                        .slice(0, 3)
                        .map(course => (
                          <div key={course.id} className="flex items-start">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                              <BookOpen className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{course.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Last accessed: {course.lastAccessed}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coursesProgress.map(course => (
                <Card key={course.id} className="bg-card border-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold text-primary">{course.title}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={course.progress === 100 ? "bg-green-100 text-green-800 border-green-200" : "bg-blue-100 text-blue-800 border-blue-200"}
                      >
                        {course.progress === 100 ? "Completed" : `${course.progress}%`}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.completedModules}/{course.totalModules} modules</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Last Accessed</p>
                          <p className="font-medium">{course.lastAccessed}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Module</p>
                          <p className="font-medium">{course.nextModule}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Estimated Completion</p>
                          <p className="font-medium">{course.estimatedCompletion}</p>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        {course.progress === 100 ? "Review Course" : "Continue Learning"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map(achievement => (
                <Card key={achievement.id} className="bg-card border-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        {achievement.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-primary">{achievement.title}</CardTitle>
                        <Badge variant="outline" className="mt-1 bg-primary/5 text-primary border-primary/20">
                          {achievement.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{achievement.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Earned on {achievement.date}</p>
                      <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProgressPage; 