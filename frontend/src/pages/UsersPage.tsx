import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, Plus, MoreVertical, UserPlus } from "lucide-react";
import { useUsers } from "@/hooks/useApi";
import { UserRole } from "@/lib/roles";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'active' | 'inactive';
  lastLogin?: Date;
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: users, loading, error, execute: refreshUsers } = useUsers();

  // Filter users based on search query
  const filteredUsers = users?.filter(
    (user: User) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
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
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">User Management</h1>
        <Button asChild>
          <Link to="/admin/users/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage user accounts and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="text-center py-8">Loading users...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Error loading users: {error}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              {searchQuery ? "No users found matching your search." : "No users found."}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user: User) => (
                <Card key={user.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => refreshUsers()}>
            Refresh
          </Button>
          <Button asChild>
            <Link to="/admin/users/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New User
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 