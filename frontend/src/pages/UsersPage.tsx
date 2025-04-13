import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, Plus, MoreVertical, UserPlus, Filter, X, User } from "lucide-react";
import { useUsers } from "@/hooks/useApi";
import { UserRole } from "@/lib/roles";
import { Background } from "@/components/ui/background";
import { Mail, Building, Calendar, BookOpen, Code, Award } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'active' | 'inactive';
  lastLogin?: Date;
  company: string;
  joinDate: string;
  courses: number;
  projects: number;
  achievements: number;
  image: string;
}

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { data: users, loading, error, execute: refreshUsers } = useUsers();

  // Filter users based on search query and selected role
  const filteredUsers = users?.filter(
    (user: User) => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = !selectedRole || user.role === selectedRole;
      return matchesSearch && matchesRole;
    }
  ) || [];

  // Get badge variant based on user role
  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "destructive";
      case UserRole.CLIENT:
        return "default";
      case UserRole.STUDENT:
        return "secondary";
      default:
        return "outline";
    }
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'success' : 'destructive';
  };

  return (
    <Background 
      image="/images/image (5).jpg"
      overlayOpacity={0.85}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Users</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage and view all platform users
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or company..."
                className="pl-10 bg-white/95 backdrop-blur-sm border-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedRole === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRole(null)}
                className={selectedRole === null ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'border-primary/20 hover:border-primary/40'}
              >
                <Filter className="mr-2 h-4 w-4" />
                All Users
              </Button>
              <Button
                variant={selectedRole === 'Student' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRole('Student')}
                className={selectedRole === 'Student' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'border-primary/20 hover:border-primary/40'}
              >
                <User className="mr-2 h-4 w-4" />
                Students
              </Button>
              <Button
                variant={selectedRole === 'Instructor' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRole('Instructor')}
                className={selectedRole === 'Instructor' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'border-primary/20 hover:border-primary/40'}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Instructors
              </Button>
              {selectedRole && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRole(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Card key={user.id} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                        <img 
                          src={user.image} 
                          alt={user.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{user.name}</CardTitle>
                        <CardDescription className="capitalize">{user.role}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{user.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-primary/10">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm font-medium">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span>{user.courses}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Courses</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm font-medium">
                            <Code className="h-4 w-4 text-primary" />
                            <span>{user.projects}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Projects</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm font-medium">
                            <Award className="h-4 w-4 text-primary" />
                            <span>{user.achievements}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Achievements</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-primary/10 text-primary p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">No users found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRole(null);
                  }}
                  className="border-primary/20 hover:border-primary/40"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Background>
  );
};

export default UsersPage; 