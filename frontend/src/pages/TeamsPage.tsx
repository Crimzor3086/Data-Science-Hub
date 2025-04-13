import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Background } from '@/components/ui/background';
import { 
  Search, 
  Users, 
  Plus, 
  Filter, 
  X,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Star,
  Award,
  Briefcase,
  BookOpen,
  Code
} from 'lucide-react';

const teams = [
  {
    id: 1,
    name: 'Data Science Team',
    description: 'Working on machine learning and data analysis projects',
    members: [
      {
        id: 1,
        name: 'John Doe',
        role: 'Team Lead',
        avatar: '/images/avatar.jpg',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        joinDate: '2020-05-15',
        skills: ['Python', 'Machine Learning', 'Data Analysis'],
        projects: 12,
        courses: 8,
        certifications: 5
      },
      {
        id: 2,
        name: 'Jane Smith',
        role: 'Data Scientist',
        avatar: '/images/avatar.jpg',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 234-5678',
        location: 'New York, NY',
        joinDate: '2021-03-10',
        skills: ['R', 'Statistical Analysis', 'Data Visualization'],
        projects: 8,
        courses: 6,
        certifications: 3
      }
    ],
    projects: [
      {
        title: 'Customer Churn Prediction',
        description: 'Building a machine learning model to predict customer churn',
        status: 'In Progress',
        progress: 75
      },
      {
        title: 'Sales Forecasting',
        description: 'Developing time series models for sales forecasting',
        status: 'Completed',
        progress: 100
      }
    ],
    image: '/images/image (16).jpg'
  },
  {
    id: 2,
    name: 'AI Research Team',
    description: 'Exploring cutting-edge AI technologies and applications',
    members: [
      {
        id: 3,
        name: 'Mike Johnson',
        role: 'Team Lead',
        avatar: '/images/avatar.jpg',
        email: 'mike.johnson@example.com',
        phone: '+1 (555) 345-6789',
        location: 'Boston, MA',
        joinDate: '2019-08-20',
        skills: ['Deep Learning', 'NLP', 'Computer Vision'],
        projects: 15,
        courses: 10,
        certifications: 7
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        role: 'AI Researcher',
        avatar: '/images/avatar.jpg',
        email: 'sarah.wilson@example.com',
        phone: '+1 (555) 456-7890',
        location: 'Seattle, WA',
        joinDate: '2022-01-15',
        skills: ['TensorFlow', 'PyTorch', 'Reinforcement Learning'],
        projects: 6,
        courses: 4,
        certifications: 2
      }
    ],
    projects: [
      {
        title: 'Natural Language Processing Pipeline',
        description: 'Developing an advanced NLP pipeline for text analysis',
        status: 'In Progress',
        progress: 60
      },
      {
        title: 'Computer Vision System',
        description: 'Building a real-time object detection system',
        status: 'Planning',
        progress: 25
      }
    ],
    image: '/images/image (17).jpg'
  }
];

const TeamsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<typeof teams[0] | null>(null);

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.members.some(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Background 
      image="/images/image (16).jpg"
      overlayOpacity={0.85}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Teams</h1>
              <p className="text-muted-foreground">Manage and collaborate with your team members</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teams or members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/95 backdrop-blur-sm border-primary/20"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTeams.map(team => (
              <Card 
                key={team.id}
                className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                onClick={() => setSelectedTeam(team)}
              >
                <CardHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-t-lg" />
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{team.name}</CardTitle>
                        <CardDescription>{team.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex -space-x-2">
                      {team.members.map(member => (
                        <div
                          key={member.id}
                          className="w-8 h-8 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-xs font-medium text-primary"
                        >
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Active Projects</h3>
                      <div className="space-y-2">
                        {team.projects.map((project, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{project.title}</span>
                            <span className="text-xs text-muted-foreground">{project.progress}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{team.members.length} members</span>
                      <span className="text-muted-foreground">{team.projects.length} projects</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedTeam && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
              <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-t-lg" />
                  <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <CardTitle className="text-2xl">{selectedTeam.name}</CardTitle>
                        <CardDescription>{selectedTeam.description}</CardDescription>
                      </div>
                      <Button variant="outline" size="icon" onClick={() => setSelectedTeam(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex -space-x-2">
                      {selectedTeam.members.map(member => (
                        <div
                          key={member.id}
                          className="w-10 h-10 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-sm font-medium text-primary"
                        >
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Team Members</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedTeam.members.map(member => (
                          <Card key={member.id} className="bg-white/95 backdrop-blur-sm border-primary/20">
                            <CardContent className="pt-6">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Users className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{member.name}</h4>
                                  <p className="text-sm text-muted-foreground">{member.role}</p>
                                  <div className="mt-2 space-y-1">
                                    <div className="flex items-center gap-2 text-sm">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-muted-foreground">{member.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Phone className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-muted-foreground">{member.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-muted-foreground">{member.location}</span>
                                    </div>
                                  </div>
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {member.skills.map(skill => (
                                      <span
                                        key={skill}
                                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Projects</h3>
                      <div className="space-y-4">
                        {selectedTeam.projects.map((project, index) => (
                          <Card key={index} className="bg-white/95 backdrop-blur-sm border-primary/20">
                            <CardContent className="pt-6">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Code className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{project.title}</h4>
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                      project.status === 'Completed' 
                                        ? 'bg-green-100 text-green-800' 
                                        : project.status === 'In Progress'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {project.status}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                                  <div className="mt-3">
                                    <div className="flex justify-between text-sm mb-1">
                                      <span className="text-muted-foreground">Progress</span>
                                      <span className="text-muted-foreground">{project.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-primary rounded-full transition-all duration-300"
                                        style={{ width: `${project.progress}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Background>
  );
};

export default TeamsPage; 