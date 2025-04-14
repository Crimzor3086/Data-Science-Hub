import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Clock, 
  ArrowRight,
  FolderGit2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Background } from '@/components/ui/background';

// Mock data for projects
const projects = [
  {
    id: 1,
    title: "Customer Churn Prediction",
    description: "Build a machine learning model to predict customer churn for a telecom company.",
    status: "In Progress",
    progress: 65,
    dueDate: "2024-05-15",
    team: ["Sarah Johnson", "Michael Chen", "Emily Brown"],
    category: "Machine Learning",
    tags: ["Python", "Scikit-learn", "Pandas"],
    image: "/images/image (15).jpg"
  },
  {
    id: 2,
    title: "Sales Forecasting Dashboard",
    description: "Create an interactive dashboard for sales forecasting using historical data.",
    status: "Completed",
    progress: 100,
    dueDate: "2024-04-01",
    team: ["David Wilson", "Sarah Johnson"],
    category: "Data Visualization",
    tags: ["Tableau", "SQL", "Time Series"],
    image: "/images/image (16).jpg"
  },
  {
    id: 3,
    title: "Sentiment Analysis API",
    description: "Develop a REST API for sentiment analysis of customer reviews.",
    status: "In Progress",
    progress: 40,
    dueDate: "2024-06-01",
    team: ["Michael Chen", "Emily Brown", "David Wilson"],
    category: "NLP",
    tags: ["Python", "FastAPI", "BERT"],
    image: "/images/image (17).jpg"
  },
  {
    id: 4,
    title: "Data Pipeline Optimization",
    description: "Optimize existing data pipelines for better performance and reliability.",
    status: "Planning",
    progress: 20,
    dueDate: "2024-07-01",
    team: ["Sarah Johnson", "David Wilson"],
    category: "Data Engineering",
    tags: ["Airflow", "Python", "AWS"],
    image: "/images/image (1).jpg"
  }
];

// Categories for filtering
const categories = [
  "All",
  "Data Analysis",
  "Predictive Analytics",
  "Machine Learning",
  "NLP",
  "Operations Research"
];

export const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Filter projects based on search query and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Get unique statuses for filter
  const statuses = ["All", ...new Set(projects.map(project => project.status))];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title="Our Projects" 
          subtitle="Explore our portfolio of data science and analytics projects"
          backgroundImage="/images/image (3).jpg"
          overlayOpacity={0.85}
        />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="w-full md:w-auto">
              <h1 className="text-3xl font-bold text-primary">Projects</h1>
              <p className="text-muted-foreground mt-2">
                Manage and track your data science projects
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Create New Project
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search projects..." 
                className="pl-10 bg-white/95 backdrop-blur-sm border-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            <Button variant="outline" className="w-full md:w-auto border-primary text-primary hover:bg-primary/10">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge 
                      className={`absolute top-2 right-2 ${
                        project.status === "Completed" 
                          ? "bg-green-500/90 text-white" 
                          : project.status === "In Progress"
                          ? "bg-blue-500/90 text-white"
                          : "bg-yellow-500/90 text-white"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due {project.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.team.length} members</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-primary/5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90 hover:bg-primary/10">
                    <FolderGit2 className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90 hover:bg-primary/10">
                    Team <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium text-primary mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStatus("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage; 