import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Background } from '@/components/ui/background';
import { 
  Search, 
  Users, 
  BookOpen, 
  Code, 
  Award, 
  Star, 
  Filter,
  X,
  MoreVertical,
  Plus,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye,
  Building,
  MapPin
} from 'lucide-react';

const searchResults = {
  courses: [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      description: 'Learn the basics of machine learning algorithms and applications',
      instructor: 'John Doe',
      duration: '8 weeks',
      level: 'Intermediate',
      rating: 4.8,
      students: 250,
      image: '/images/image (20).jpg'
    },
    {
      id: 2,
      title: 'Data Visualization with Python',
      description: 'Create beautiful and informative data visualizations using Python',
      instructor: 'Jane Smith',
      duration: '6 weeks',
      level: 'Beginner',
      rating: 4.7,
      students: 180,
      image: '/images/image (21).jpg'
    }
  ],
  projects: [
    {
      id: 1,
      title: 'Customer Churn Prediction',
      description: 'Build a machine learning model to predict customer churn',
      team: 'Data Science Team',
      progress: 75,
      status: 'In Progress',
      image: '/images/image (22).jpg'
    },
    {
      id: 2,
      title: 'Sales Forecasting',
      description: 'Develop time series models for sales forecasting',
      team: 'Analytics Team',
      progress: 100,
      status: 'Completed',
      image: '/images/image (23).jpg'
    }
  ],
  users: [
    {
      id: 1,
      name: 'John Doe',
      role: 'Data Scientist',
      department: 'Data Science',
      location: 'San Francisco, CA',
      avatar: '/images/avatar.jpg'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Data Analyst',
      department: 'Analytics',
      location: 'New York, NY',
      avatar: '/images/avatar.jpg'
    }
  ]
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'users', label: 'Users', icon: Users }
  ];

  const filteredResults = {
    courses: searchResults.courses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    projects: searchResults.projects.filter(project =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.team.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    users: searchResults.users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  return (
    <Background 
      image="/images/image (2).jpg"
      overlayOpacity={0.85}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Search</h1>
              <p className="text-muted-foreground">Find courses, projects, and users</p>
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/95 backdrop-blur-sm border-primary/20"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                  className={selectedCategory === category.id ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'border-primary/20 hover:border-primary/40'}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {category.label}
                </Button>
              );
            })}
            {selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {(selectedCategory === 'all' || selectedCategory === 'courses') && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResults.courses.map(course => (
                    <Card key={course.id} className="bg-white/95 backdrop-blur-sm border-primary/20">
                      <CardHeader className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-t-lg" />
                        <div className="relative">
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription>{course.instructor}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Star className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{course.rating} Rating</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{course.students} Students</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{course.level}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{course.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {(selectedCategory === 'all' || selectedCategory === 'projects') && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResults.projects.map(project => (
                    <Card key={project.id} className="bg-white/95 backdrop-blur-sm border-primary/20">
                      <CardHeader className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-t-lg" />
                        <div className="relative">
                          <CardTitle>{project.title}</CardTitle>
                          <CardDescription>{project.team}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-muted-foreground">{project.progress}%</span>
                          </div>
                          <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <div className="flex justify-end">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              project.status === 'Completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {(selectedCategory === 'all' || selectedCategory === 'users') && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResults.users.map(user => (
                    <Card key={user.id} className="bg-white/95 backdrop-blur-sm border-primary/20">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.role}</p>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{user.department}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{user.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Background>
  );
};

export default SearchPage; 