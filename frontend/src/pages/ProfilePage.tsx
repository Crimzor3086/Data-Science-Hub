import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth-context';
import { UserRole } from '../lib/roles';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, Camera, Star, Award, BookOpen, Briefcase, Edit, Save, Mail, Phone, MapPin, Calendar, Globe, X, Building, Linkedin, Twitter, Github, Code } from 'lucide-react';
import { Background } from '@/components/ui/background';
import { Progress } from '@/components/ui/progress';

interface ProfileData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  skills: string[];
  endorsements: { [key: string]: number };
  education?: {
    institution: string;
    degree: string;
    year: string;
  }[];
  experience?: {
    company: string;
    position: string;
    duration: string;
  }[];
  projects?: {
    title: string;
    description: string;
    technologies: string[];
  }[];
  coverImage: string;
  stats: {
    projects: number;
    courses: number;
    certifications: number;
    experience: string;
  };
  title: string;
  company: string;
  location: string;
  phone: string;
  website: string;
  joinDate: string;
  certifications: {
    name: string;
    issuer: string;
    year: string;
  }[];
  courses: {
    title: string;
    progress: number;
    lastAccessed: string;
  }[];
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<ProfileData>(user);

  useEffect(() => {
    // TODO: Fetch profile data from API
    const mockProfile: ProfileData = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: UserRole.STUDENT,
      bio: 'Passionate about data science and machine learning',
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
      endorsements: {
        'Python': 5,
        'Machine Learning': 3,
        'Data Analysis': 4,
        'SQL': 2
      },
      education: [
        {
          institution: 'University of Technology',
          degree: 'Bachelor of Computer Science',
          year: '2020-2024'
        }
      ],
      experience: [
        {
          company: 'Tech Corp',
          position: 'Data Science Intern',
          duration: '2023-Present'
        }
      ],
      projects: [
        {
          title: 'Customer Churn Prediction',
          description: 'Built a machine learning model to predict customer churn',
          technologies: ['Python', 'Scikit-learn', 'Pandas']
        }
      ],
      coverImage: '/images/image (15).jpg',
      stats: {
        projects: 12,
        courses: 8,
        certifications: 5,
        experience: '8 years'
      },
      title: 'Senior Data Scientist',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      phone: '+1 (555) 123-4567',
      website: 'www.johndoe.com',
      joinDate: '2020-05-15',
      certifications: [
        {
          name: 'AWS Certified Machine Learning Specialist',
          issuer: 'Amazon Web Services',
          year: '2022'
        },
        {
          name: 'Google Cloud Professional Data Engineer',
          issuer: 'Google Cloud',
          year: '2021'
        },
        {
          name: 'IBM Data Science Professional Certificate',
          issuer: 'IBM',
          year: '2020'
        }
      ],
      courses: [
        {
          title: 'Machine Learning Fundamentals',
          progress: 85,
          lastAccessed: '2023-07-15'
        },
        {
          title: 'Data Visualization with Python',
          progress: 75,
          lastAccessed: '2023-06-20'
        }
      ]
    };

    setProfile(mockProfile);
    setLoading(false);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement image upload logic
      console.log('Image upload:', file);
    }
  };

  const handleEndorseSkill = (skill: string) => {
    if (profile) {
      setProfile({
        ...profile,
        endorsements: {
          ...profile.endorsements,
          [skill]: (profile.endorsements[skill] || 0) + 1
        }
      });
    }
  };

  const handleSaveProfile = () => {
    // TODO: Implement profile update logic
    console.log('Saving profile:', profile);
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the user data
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(profile);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Profile not found</p>
      </div>
    );
  }

  return (
    <Background 
      image="/images/image (15).jpg"
      overlayOpacity={0.85}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Sidebar */}
            <div className="w-full md:w-1/3">
              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader className="text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-t-lg" />
                  <div className="relative mx-auto w-32 h-32 mb-4">
                    <Avatar className="w-full h-full border-4 border-primary/20">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="absolute bottom-0 right-0 rounded-full bg-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{profile.name}</CardTitle>
                  <CardDescription>{profile.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Joined {profile.joinDate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Profile Content */}
            <div className="w-full md:w-2/3">
              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-t-lg" />
                  <div className="relative">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">About</h3>
                        {isEditing ? (
                          <Input
                            value={editedData.bio}
                            onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                            className="mb-4"
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground">{editedData.bio}</p>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {editedData.skills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Certifications</h3>
                        <div className="space-y-4">
                          {editedData.certifications.map((cert) => (
                            <div key={cert.name} className="flex items-start gap-4">
                              <Award className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">{cert.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {cert.issuer} • {cert.year}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Current Courses</h3>
                        <div className="space-y-4">
                          {editedData.courses.map((course) => (
                            <div key={course.title}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{course.title}</span>
                                <span className="text-muted-foreground">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                              <p className="text-xs text-muted-foreground mt-1">
                                Last accessed {course.lastAccessed}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="education">
                    <div className="space-y-6">
                      {editedData.education?.map((edu) => (
                        <div key={edu.degree} className="flex items-start gap-4">
                          <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">
                              {edu.institution} • {edu.year}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="experience">
                    <div className="space-y-6">
                      {editedData.experience?.map((exp) => (
                        <div key={exp.position} className="flex items-start gap-4">
                          <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">{exp.position}</p>
                            <p className="text-sm text-muted-foreground">
                              {exp.company} • {exp.duration}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="projects">
                    <div className="space-y-6">
                      {editedData.projects?.map((project) => (
                        <div key={project.title} className="flex items-start gap-4">
                          <Code className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{project.title}</p>
                              <Badge variant="outline" className={
                                project.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-200' : 
                                'bg-blue-100 text-blue-800 border-blue-200'
                              }>
                                {project.status}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="bg-primary/5">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default ProfilePage; 