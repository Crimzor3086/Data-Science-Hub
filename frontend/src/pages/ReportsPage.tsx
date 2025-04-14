import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Report {
  id: number;
  title: string;
  type: string;
  date: string;
  status: string;
  author: string;
  description: string;
  tags: string[];
}

const mockReports: Report[] = [
  {
    id: 1,
    title: 'Q1 2024 Analytics Report',
    type: 'Analytics',
    date: '2024-03-31',
    status: 'Completed',
    author: 'John Doe',
    description: 'Quarterly analytics report covering key metrics and insights.',
    tags: ['Analytics', 'Q1', '2024']
  },
  {
    id: 2,
    title: 'Customer Behavior Analysis',
    type: 'Research',
    date: '2024-03-15',
    status: 'In Progress',
    author: 'Jane Smith',
    description: 'Analysis of customer behavior patterns and trends.',
    tags: ['Research', 'Customer', 'Behavior']
  },
  {
    id: 3,
    title: 'Market Research Summary',
    type: 'Research',
    date: '2024-03-01',
    status: 'Completed',
    author: 'Mike Johnson',
    description: 'Summary of market research findings and recommendations.',
    tags: ['Research', 'Market', 'Summary']
  }
];

export const ReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Reports</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
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
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{report.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{report.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`font-medium ${
                      report.status === 'Completed' ? 'text-green-600' :
                      report.status === 'In Progress' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Author:</span>
                    <span className="font-medium">{report.author}</span>
                  </div>
                  <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {report.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button size="sm">Download</Button>
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