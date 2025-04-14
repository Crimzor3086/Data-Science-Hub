import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: string;
  description: string;
  points: number;
  submitted: boolean;
}

const mockAssignments: Assignment[] = [
  {
    id: 1,
    title: 'Data Analysis Project',
    course: 'Data Science Fundamentals',
    dueDate: '2024-04-15',
    status: 'Pending',
    description: 'Analyze a dataset and create visualizations using Python.',
    points: 100,
    submitted: false
  },
  {
    id: 2,
    title: 'Machine Learning Report',
    course: 'Machine Learning Basics',
    dueDate: '2024-04-20',
    status: 'In Progress',
    description: 'Write a report on a machine learning model implementation.',
    points: 150,
    submitted: false
  },
  {
    id: 3,
    title: 'Statistical Analysis',
    course: 'Statistics for Data Science',
    dueDate: '2024-04-25',
    status: 'Completed',
    description: 'Perform statistical analysis on a given dataset.',
    points: 200,
    submitted: true
  }
];

export const AssignmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || assignment.course === selectedCourse;
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Assignments</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="Data Science Fundamentals">Data Science Fundamentals</SelectItem>
                <SelectItem value="Machine Learning Basics">Machine Learning Basics</SelectItem>
                <SelectItem value="Statistics for Data Science">Statistics for Data Science</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>{assignment.title}</CardTitle>
                <CardDescription>{assignment.course}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Description</Label>
                    <p className="text-sm text-muted-foreground mt-1">{assignment.description}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="font-medium">{assignment.dueDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Points:</span>
                    <span className="font-medium">{assignment.points}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`font-medium ${
                      assignment.status === 'Completed' ? 'text-green-600' :
                      assignment.status === 'In Progress' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2">
                    {!assignment.submitted ? (
                      <>
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Submit</Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm">View Submission</Button>
                    )}
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