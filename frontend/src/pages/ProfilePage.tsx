import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth-context';
import { UserRole } from '../lib/roles';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Loader2, Camera, Star, Award, BookOpen, Briefcase } from 'lucide-react';

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
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>{profile.name[0]}</AvatarFallback>
                </Avatar>
                <label className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full cursor-pointer">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <h2 className="mt-4 text-2xl font-bold">{profile.name}</h2>
              <p className="text-gray-500">{profile.email}</p>
              <Badge className="mt-2" variant="secondary">
                {profile.role}
              </Badge>
              <Textarea
                className="mt-4"
                placeholder="Write a short bio..."
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>
          </Card>

          <Card className="mt-6 p-6">
            <h3 className="text-lg font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge
                  key={skill}
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleEndorseSkill(skill)}
                >
                  {skill}
                  <Star className="w-3 h-3" />
                  <span>{profile.endorsements[skill] || 0}</span>
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Projects</h3>
                <div className="space-y-4">
                  {profile.projects?.map((project, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-gray-600 mt-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card className="p-6">
                <div className="space-y-4">
                  {profile.education?.map((edu, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                        <h4 className="font-medium">{edu.institution}</h4>
                      </div>
                      <p className="text-gray-600 mt-2">{edu.degree}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card className="p-6">
                <div className="space-y-4">
                  {profile.experience?.map((exp, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-500" />
                        <h4 className="font-medium">{exp.company}</h4>
                      </div>
                      <p className="text-gray-600 mt-2">{exp.position}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 