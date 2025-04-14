import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  department: string;
  image: string;
  skills: string[];
  bio: string;
  availability: string;
  projects: string[];
}

const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Lead Data Scientist',
    email: 'john.doe@example.com',
    department: 'Data Science',
    image: '/images/team/john-doe.jpg',
    skills: ['Python', 'Machine Learning', 'Deep Learning'],
    bio: 'Experienced data scientist with a focus on machine learning and AI.',
    availability: 'Full-time',
    projects: ['Project A', 'Project B']
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Data Engineer',
    email: 'jane.smith@example.com',
    department: 'Engineering',
    image: '/images/team/jane-smith.jpg',
    skills: ['SQL', 'Python', 'AWS'],
    bio: 'Data engineer specializing in ETL pipelines and cloud infrastructure.',
    availability: 'Full-time',
    projects: ['Project C', 'Project D']
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'ML Engineer',
    email: 'mike.johnson@example.com',
    department: 'Engineering',
    image: '/images/team/mike-johnson.jpg',
    skills: ['TensorFlow', 'PyTorch', 'Computer Vision'],
    bio: 'ML engineer focused on computer vision and deep learning applications.',
    availability: 'Full-time',
    projects: ['Project E', 'Project F']
  },
  {
    id: 4,
    name: 'Sarah Williams',
    role: 'Data Analyst',
    email: 'sarah.williams@example.com',
    department: 'Analytics',
    image: '/images/team/sarah-williams.jpg',
    skills: ['SQL', 'Tableau', 'Statistics'],
    bio: 'Data analyst with expertise in business intelligence and visualization.',
    availability: 'Full-time',
    projects: ['Project G', 'Project H']
  }
];

export const TeamsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');

  const filteredTeamMembers = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    const matchesAvailability = selectedAvailability === 'all' || member.availability === selectedAvailability;
    return matchesSearch && matchesDepartment && matchesAvailability;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Team Management</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeamMembers.map((member) => (
            <Card key={member.id} className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                  <div>
                    <Label>Department</Label>
                    <p className="text-sm text-muted-foreground">{member.department}</p>
                  </div>
                  <div>
                    <Label>Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {member.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Projects</Label>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {member.projects.map((project, index) => (
                        <li key={index}>{project}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button size="sm">Contact</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}; 