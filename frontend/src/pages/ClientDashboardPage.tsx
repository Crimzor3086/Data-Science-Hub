import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout';
import { PageHeader } from '@/components/layout';
import { Card, Button, Tabs, TabsContent, TabsList, TabsTrigger, Badge, Progress, Avatar, AvatarImage, AvatarFallback, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Alert, AlertDescription, AlertTitle, AlertCircle, CheckCircle, Clock, Download, FileText, MessageSquare, Users, BarChart, Settings, HelpCircle, Bell } from '@/components/ui';
import { ChevronRight, Plus, Upload, Send, Filter, RefreshCw, MoreVertical, Calendar, DollarSign, CreditCard, FileUp, Check, X } from 'lucide-react';
import clientService from '@/services/clientService';
import { Project, Dataset, Student, Course, Message, Announcement, SupportTicket, Report, BillingInfo, ActivityLog } from '@/types/client';
import { Search, Book, Star, Archive, Trash } from 'lucide-react';

const ClientDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [dashboardData, setDashboardData] = useState<{
    ongoingProjects: Project[];
    assignedStudents: Student[];
    recentActivity: ActivityLog[];
    notifications: Message[];
  }>({
    ongoingProjects: [],
    assignedStudents: [],
    recentActivity: [],
    notifications: []
  });
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await clientService.getDashboardData();
        setDashboardData(data);
        
        const datasetsData = await clientService.getDatasets();
        setDatasets(datasetsData);
        
        const studentsData = await clientService.getAssignedStudents();
        setStudents(studentsData);
        
        const coursesData = await clientService.getClientCourses();
        setCourses(coursesData);
        
        const messagesData = await clientService.getMessages();
        setMessages(messagesData);
        
        const announcementsData = await clientService.getAnnouncements();
        setAnnouncements(announcementsData);
        
        const ticketsData = await clientService.getSupportTickets();
        setTickets(ticketsData);
        
        const reportsData = await clientService.getReports();
        setReports(reportsData);
        
        const billingData = await clientService.getBillingInfo();
        setBillingInfo(billingData);
        
        const activityData = await clientService.getActivityLogs();
        setActivityLogs(activityData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleRequestDataset = async () => {
    // This would typically open a modal or navigate to a form
    console.log('Request dataset clicked');
  };

  const handleUploadDataset = async () => {
    // This would typically open a file upload dialog
    console.log('Upload dataset clicked');
  };

  const handleSendMessage = async () => {
    // This would typically open a message composition form
    console.log('Send message clicked');
  };

  const handleCreateTicket = async () => {
    // This would typically open a ticket creation form
    console.log('Create ticket clicked');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
      case 'resolved':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
      case 'pending':
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'on-hold':
      case 'suspended':
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'open':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title="Client Dashboard"
        subtitle="Manage your projects, datasets, students, and more"
      />

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            className="w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ongoing Projects</p>
                  <h3 className="text-2xl font-bold mt-1">{dashboardData.ongoingProjects.length}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <Button variant="ghost" className="w-full justify-between">
                  View all projects
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assigned Students</p>
                  <h3 className="text-2xl font-bold mt-1">{dashboardData.assignedStudents.length}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <Button variant="ghost" className="w-full justify-between">
                  View all students
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Datasets</p>
                  <h3 className="text-2xl font-bold mt-1">{datasets.length}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <Button variant="ghost" className="w-full justify-between">
                  View all datasets
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unread Messages</p>
                  <h3 className="text-2xl font-bold mt-1">{dashboardData.notifications.length}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <Button variant="ghost" className="w-full justify-between">
                  View all messages
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {dashboardData.recentActivity.length > 0 ? (
                  dashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {activity.entityType === 'project' && <FileText className="h-4 w-4 text-primary" />}
                        {activity.entityType === 'dataset' && <BarChart className="h-4 w-4 text-primary" />}
                        {activity.entityType === 'student' && <Users className="h-4 w-4 text-primary" />}
                        {activity.entityType === 'course' && <Book className="h-4 w-4 text-primary" />}
                        {activity.entityType === 'message' && <MessageSquare className="h-4 w-4 text-primary" />}
                        {activity.entityType === 'ticket' && <HelpCircle className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Announcements</h3>
              <div className="space-y-4">
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <Alert key={announcement.id} className={announcement.type === 'info' ? 'bg-blue-50' : 
                      announcement.type === 'warning' ? 'bg-yellow-50' : 
                      announcement.type === 'success' ? 'bg-green-50' : 'bg-red-50'}>
                      <AlertTitle className="text-sm font-medium">{announcement.title}</AlertTitle>
                      <AlertDescription className="text-xs mt-1">{announcement.content}</AlertDescription>
                      <p className="text-xs text-muted-foreground mt-2">{formatDate(announcement.createdAt)}</p>
                    </Alert>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No announcements</p>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Projects</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          <Card>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search projects..."
                    className="w-full md:w-64"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Team Members</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardData.ongoingProjects.length > 0 ? (
                    dashboardData.ongoingProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={project.progress} className="w-[60px]" />
                            <span className="text-xs">{project.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex -space-x-2">
                            {project.teamMembers.slice(0, 3).map((member, index) => (
                              <Avatar key={index} className="border-2 border-background h-6 w-6">
                                <AvatarFallback>{member.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                            {project.teamMembers.length > 3 && (
                              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs">
                                +{project.teamMembers.length - 3}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {project.deadline ? formatDate(project.deadline) : 'No deadline'}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No projects found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Datasets Tab */}
        <TabsContent value="datasets" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Datasets</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRequestDataset}>
                <Plus className="h-4 w-4 mr-2" />
                Request Dataset
              </Button>
              <Button onClick={handleUploadDataset}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Dataset
              </Button>
            </div>
          </div>

          <Card>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search datasets..."
                    className="w-full md:w-64"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {datasets.length > 0 ? (
                  datasets.map((dataset) => (
                    <Card key={dataset.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold">{dataset.name}</h3>
                            <p className="text-sm text-muted-foreground">{dataset.description}</p>
                          </div>
                          <Badge className={getStatusColor(dataset.status)}>
                            {dataset.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Size:</span>
                            <span>{dataset.size} MB</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Format:</span>
                            <span>{dataset.format}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Created:</span>
                            <span>{formatDate(dataset.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Feedback
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No datasets found</p>
                    <Button className="mt-4" onClick={handleRequestDataset}>
                      <Plus className="h-4 w-4 mr-2" />
                      Request Dataset
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Students</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Assign Student
            </Button>
          </div>

          <Card>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search students..."
                    className="w-full md:w-64"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enrolled Courses</TableHead>
                    <TableHead>Assigned Projects</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.length > 0 ? (
                    students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(student.status)}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{student.enrolledCourses.length}</TableCell>
                        <TableCell>{student.assignedProjects.length}</TableCell>
                        <TableCell>{formatDate(student.lastActive)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <BarChart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No students found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Courses</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Request Course
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? (
              courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {course.level}
                      </Badge>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Instructor:</span>
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{course.duration} hours</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Modules:</span>
                        <span>{course.modules.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Enrolled:</span>
                        <span>{course.enrolledStudents} students</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(course.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1">{course.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <BarChart className="h-4 w-4 mr-2" />
                        Insights
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        Students
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No courses found</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Request Course
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Messages</h2>
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Conversations</h3>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                        !message.isRead ? 'bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{message.from.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="font-medium truncate">{message.from}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(message.createdAt)}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {message.subject}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No messages
                  </p>
                )}
              </div>
            </Card>

            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Message</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">Admin User</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(new Date())}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">admin@example.com</p>
                    <div className="mt-2 p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        Welcome to the Data Science Hub! We're excited to have you on board.
                        This is a sample message to demonstrate the messaging functionality.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Textarea
                    placeholder="Type your message..."
                    className="mb-2"
                    rows={4}
                  />
                  <div className="flex justify-end">
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Reports</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Request Report
            </Button>
          </div>

          <Card>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search reports..."
                    className="w-full md:w-64"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="usage">Usage</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.length > 0 ? (
                    reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.title}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.format.toUpperCase()}</TableCell>
                        <TableCell>{formatDate(report.date)}</TableCell>
                        <TableCell>{report.size} MB</TableCell>
                        <TableCell>{report.downloads}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No reports found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Billing & Subscription</h2>
            <Button>
              <CreditCard className="h-4 w-4 mr-2" />
              Update Payment Method
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
              {billingInfo ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Plan</p>
                      <p className="font-medium">{billingInfo.plan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className={getStatusColor(billingInfo.status)}>
                        {billingInfo.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <p className="font-medium">{billingInfo.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Billing Address</p>
                      <p className="font-medium">{billingInfo.billingAddress || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Subscription
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No billing information available</p>
                  <Button>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Set Up Billing
                  </Button>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Invoices</h3>
              <div className="space-y-4">
                {billingInfo?.invoices && billingInfo.invoices.length > 0 ? (
                  billingInfo.invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                      <div>
                        <p className="font-medium">Invoice #{invoice.id}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(invoice.date)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">${invoice.amount}</span>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No invoices found
                  </p>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Support & Help</h2>
            <Button onClick={handleCreateTicket}>
              <Plus className="h-4 w-4 mr-2" />
              Create Ticket
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-lg font-semibold mb-4">Support Tickets</h3>
              <div className="space-y-4">
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <Card key={ticket.id} className="overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{ticket.subject}</h4>
                            <p className="text-sm text-muted-foreground">{ticket.description}</p>
                          </div>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(ticket.priority)}>
                              {ticket.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(ticket.createdAt)}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No support tickets found</p>
                    <Button onClick={handleCreateTicket}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Ticket
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Help Resources</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">FAQs</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Find answers to commonly asked questions about our platform.
                  </p>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    View FAQs
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Documentation</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access detailed documentation and guides for using our platform.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Book className="h-4 w-4 mr-2" />
                    View Documentation
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Contact Support</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Need additional help? Our support team is here to assist you.
                  </p>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ClientDashboardPage; 