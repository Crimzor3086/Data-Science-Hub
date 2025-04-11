import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { User, Settings, Lock, Bell, BookOpen, Award, Link as LinkIcon, Upload, ThumbsUp, Clock, Sparkles, X } from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  role: string;
  joinDate: string;
  skills: string[];
  socialLinks: {
    platform: string;
    url: string;
  }[];
  courses: {
    id: number;
    title: string;
    progress: number;
  }[];
  achievements: {
    id: number;
    title: string;
    description: string;
    date: string;
  }[];
  endorsements: {
    skill: string;
    count: number;
  }[];
  activity: {
    id: number;
    type: string;
    description: string;
    date: string;
  }[];
  recommendations: {
    id: number;
    title: string;
    description: string;
    matchScore: number;
  }[];
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    bio: "",
    avatar: "",
    role: "",
    joinDate: "",
    skills: [],
    socialLinks: [],
    courses: [],
    achievements: [],
    endorsements: [],
    activity: [],
    recommendations: []
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // Use a default user ID for demo purposes
        const defaultUserId = "1";
        const response = await api.profile.get(defaultUserId);
        setProfileData(response as ProfileData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      // Use a default user ID for demo purposes
      const defaultUserId = "1";
      await api.profile.update(defaultUserId, profileData);
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // TODO: Implement image upload to storage service
      // const formData = new FormData();
      // formData.append("image", file);
      // const response = await api.profile.uploadImage(formData);
      // setProfileData({ ...profileData, avatar: response.url });
      
      // Temporary mock implementation
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    }
  };

  const handleAddSocialLink = () => {
    setProfileData({
      ...profileData,
      socialLinks: [...profileData.socialLinks, { platform: "", url: "" }]
    });
  };

  const handleRemoveSocialLink = (index: number) => {
    setProfileData({
      ...profileData,
      socialLinks: profileData.socialLinks.filter((_, i) => i !== index)
    });
  };

  const handleEndorseSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      endorsements: profileData.endorsements.map(endorsement =>
        endorsement.skill === skill
          ? { ...endorsement, count: endorsement.count + 1 }
          : endorsement
      )
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4 relative group">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                    <AvatarFallback className="bg-amber-500 text-black text-2xl">
                      {profileData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                  >
                    <Upload className="h-6 w-6 text-white" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <CardTitle className="text-xl text-white">{profileData.name}</CardTitle>
                <CardDescription className="text-gray-400">{profileData.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-400">Email</Label>
                    <p className="text-white">{profileData.email}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Member Since</Label>
                    <p className="text-white">{profileData.joinDate}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.skills.map((skill, index) => (
                        <div key={index} className="relative group">
                          <span className="px-3 py-1 bg-gray-800 text-amber-500 rounded-full text-sm">
                            {skill}
                          </span>
                          <button
                            onClick={() => handleEndorseSkill(skill)}
                            className="absolute -top-2 -right-2 bg-amber-500 text-black rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400">Social Links</Label>
                    <div className="space-y-2 mt-2">
                      {profileData.socialLinks.map((link, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={link.platform}
                            onChange={(e) => {
                              const newLinks = [...profileData.socialLinks];
                              newLinks[index].platform = e.target.value;
                              setProfileData({ ...profileData, socialLinks: newLinks });
                            }}
                            placeholder="Platform"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Input
                            value={link.url}
                            onChange={(e) => {
                              const newLinks = [...profileData.socialLinks];
                              newLinks[index].url = e.target.value;
                              setProfileData({ ...profileData, socialLinks: newLinks });
                            }}
                            placeholder="URL"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSocialLink(index)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={handleAddSocialLink}
                        className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                      >
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Add Social Link
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-gray-900 border-gray-800">
                <TabsTrigger value="profile" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="courses" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Courses
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                  <Award className="w-4 h-4 mr-2" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                  <Clock className="w-4 h-4 mr-2" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Recommendations
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Edit Profile</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills" className="text-gray-300">Skills</Label>
                      <Input
                        id="skills"
                        value={profileData.skills.join(", ")}
                        onChange={(e) => setProfileData({ ...profileData, skills: e.target.value.split(",").map(s => s.trim()) })}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Enter skills separated by commas"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">My Courses</CardTitle>
                    <CardDescription className="text-gray-400">
                      Track your learning progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profileData.courses.map((course) => (
                      <div key={course.id} className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-white font-medium">{course.title}</h3>
                          <span className="text-amber-500">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-amber-500 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Achievements</CardTitle>
                    <CardDescription className="text-gray-400">
                      Your learning milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profileData.achievements.map((achievement) => (
                      <div key={achievement.id} className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-white font-medium">{achievement.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{achievement.description}</p>
                        <p className="text-gray-500 text-xs mt-2">{achievement.date}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Activity Timeline</CardTitle>
                    <CardDescription className="text-gray-400">
                      Your recent activities and progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profileData.activity.map((item) => (
                      <div key={item.id} className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            {item.type === "course" && <BookOpen className="h-5 w-5 text-amber-500" />}
                            {item.type === "achievement" && <Award className="h-5 w-5 text-amber-500" />}
                            {item.type === "skill" && <ThumbsUp className="h-5 w-5 text-amber-500" />}
                          </div>
                          <div>
                            <p className="text-white">{item.description}</p>
                            <p className="text-gray-500 text-xs mt-1">{item.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Course Recommendations</CardTitle>
                    <CardDescription className="text-gray-400">
                      Personalized course suggestions based on your interests
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profileData.recommendations.map((course) => (
                      <div key={course.id} className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-white font-medium">{course.title}</h3>
                            <p className="text-gray-400 text-sm mt-1">{course.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-amber-500 text-sm">{course.matchScore}% match</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                            >
                              Enroll
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Account Settings</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-white font-medium flex items-center">
                        <Lock className="w-4 h-4 mr-2" />
                        Security
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-gray-300">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-gray-300">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-gray-300">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-white font-medium flex items-center">
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                      </h3>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Email Notifications</Label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="email-notifications"
                            className="rounded border-gray-700 text-amber-500 focus:ring-amber-500"
                          />
                          <label htmlFor="email-notifications" className="text-gray-400">
                            Receive email notifications about course updates and achievements
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 