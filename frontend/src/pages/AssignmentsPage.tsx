import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  BookOpen, 
  Upload, 
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";

// Mock data for assignments
const assignments = [
  {
    id: 1,
    title: "Data Analysis Project",
    description: "Analyze a dataset using Python and create visualizations",
    course: "Data Science Fundamentals",
    dueDate: "2024-04-01",
    status: "Pending",
    progress: 0,
    points: 100,
    type: "Project"
  },
  {
    id: 2,
    title: "Machine Learning Quiz",
    description: "Test your knowledge of basic ML concepts",
    course: "Machine Learning Basics",
    dueDate: "2024-03-25",
    status: "Completed",
    progress: 100,
    points: 50,
    type: "Quiz"
  },
  {
    id: 3,
    title: "Python Programming Exercise",
    description: "Write functions to solve given problems",
    course: "Python for Data Science",
    dueDate: "2024-03-28",
    status: "In Progress",
    progress: 60,
    points: 75,
    type: "Exercise"
  },
  {
    id: 4,
    title: "Data Visualization Assignment",
    description: "Create visualizations using matplotlib and seaborn",
    course: "Data Visualization",
    dueDate: "2024-04-05",
    status: "Pending",
    progress: 0,
    points: 100,
    type: "Project"
  },
  {
    id: 5,
    title: "SQL Database Design",
    description: "Design and implement a database schema",
    course: "Database Management",
    dueDate: "2024-03-30",
    status: "In Progress",
    progress: 30,
    points: 150,
    type: "Project"
  },
  {
    id: 6,
    title: "Statistics Quiz",
    description: "Test your knowledge of statistical concepts",
    course: "Statistical Analysis",
    dueDate: "2024-03-27",
    status: "Pending",
    progress: 0,
    points: 50,
    type: "Quiz"
  }
];

const AssignmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Filter assignments based on search term, status, and type
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || assignment.status === selectedStatus;
    const matchesType = selectedType === "All" || assignment.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get unique statuses and types for filters
  const statuses = ["All", ...new Set(assignments.map(assignment => assignment.status))];
  const types = ["All", ...new Set(assignments.map(assignment => assignment.type))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Layout>
      <PageHeader 
        title="Assignments" 
        subtitle="View and submit your course assignments"
        backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="w-full md:w-auto">
            <h2 className="text-3xl font-bold text-primary">My Assignments</h2>
            <p className="text-muted-foreground mt-2">
              Track and manage your course assignments
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Upload className="h-4 w-4 mr-2" />
            Submit Assignment
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search assignments..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {statuses.map((status) => (
              <Button 
                key={status}
                variant={selectedStatus === status ? "default" : "outline"}
                className={selectedStatus === status ? "bg-primary text-primary-foreground" : "border-primary text-primary hover:bg-primary/10"}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {types.map((type) => (
              <Button 
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                className={selectedType === type ? "bg-primary text-primary-foreground" : "border-primary text-primary hover:bg-primary/10"}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="bg-card border-primary/20 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-primary">{assignment.title}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(assignment.status)} border`}
                  >
                    {assignment.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{assignment.course}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{assignment.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{assignment.progress}%</span>
                    </div>
                    <Progress value={assignment.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Due Date</p>
                      <p className="font-medium">{assignment.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Points</p>
                      <p className="font-medium">{assignment.points}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium">{assignment.type}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                      {assignment.status === "Completed" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          View Submission
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          {assignment.progress > 0 ? "Continue" : "Start"}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium text-primary mb-2">No assignments found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => {
                setSearchTerm("");
                setSelectedStatus("All");
                setSelectedType("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AssignmentsPage; 