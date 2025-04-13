import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  BarChart2, 
  Database, 
  Brain, 
  Code, 
  Users, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for projects
const projects = [
  {
    id: 1,
    name: "Customer Segmentation Analysis",
    description: "Advanced customer segmentation using machine learning algorithms to identify distinct customer groups based on purchasing behavior and demographics.",
    status: "In Progress",
    progress: 65,
    deadline: "2023-12-15",
    team: ["Ogechi Daniel Koel", "Nobert Wafula"],
    category: "Data Analysis",
    technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    client: "Retail Corp",
    budget: "$15,000",
    startDate: "2023-10-01"
  },
  {
    id: 2,
    name: "Sales Forecasting Model",
    description: "Development of a predictive model to forecast future sales based on historical data, seasonal trends, and market conditions.",
    status: "Completed",
    progress: 100,
    deadline: "2023-11-30",
    team: ["Enock Bereka", "Timothy Achala"],
    category: "Predictive Analytics",
    technologies: ["R", "Time Series Analysis", "ARIMA", "Prophet"],
    client: "E-commerce Solutions",
    budget: "$12,000",
    startDate: "2023-09-15"
  },
  {
    id: 3,
    name: "Market Basket Analysis",
    description: "Analysis of customer purchasing patterns to identify product associations and optimize product placement and marketing strategies.",
    status: "Planning",
    progress: 25,
    deadline: "2024-01-20",
    team: ["Ogechi Daniel Koel"],
    category: "Data Analysis",
    technologies: ["Python", "Association Rules", "Apriori Algorithm"],
    client: "Supermarket Chain",
    budget: "$10,000",
    startDate: "2023-12-01"
  },
  {
    id: 4,
    name: "Sentiment Analysis Dashboard",
    description: "Real-time sentiment analysis of customer feedback and social media mentions to track brand perception and customer satisfaction.",
    status: "In Progress",
    progress: 40,
    deadline: "2024-02-10",
    team: ["Nobert Wafula", "Timothy Achala"],
    category: "NLP",
    technologies: ["Python", "NLTK", "BERT", "React", "D3.js"],
    client: "Tech Startup",
    budget: "$18,000",
    startDate: "2023-11-01"
  },
  {
    id: 5,
    name: "Fraud Detection System",
    description: "Implementation of machine learning models to detect fraudulent transactions in real-time with high accuracy and low false positives.",
    status: "In Progress",
    progress: 55,
    deadline: "2024-01-15",
    team: ["Enock Bereka", "Ogechi Daniel Koel"],
    category: "Machine Learning",
    technologies: ["Python", "TensorFlow", "XGBoost", "AWS"],
    client: "Financial Services",
    budget: "$25,000",
    startDate: "2023-10-15"
  },
  {
    id: 6,
    name: "Supply Chain Optimization",
    description: "Data-driven optimization of supply chain operations to reduce costs, improve delivery times, and enhance inventory management.",
    status: "Planning",
    progress: 15,
    deadline: "2024-03-01",
    team: ["Nobert Wafula", "Enock Bereka"],
    category: "Operations Research",
    technologies: ["Python", "Linear Programming", "Simulation", "Tableau"],
    client: "Manufacturing Co",
    budget: "$20,000",
    startDate: "2024-01-01"
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

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter projects based on search term, category, and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesStatus = statusFilter === "All" || project.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "In Progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      case "Planning":
        return "bg-amber-500/10 text-amber-500 border-amber-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  return (
    <Layout>
      <PageHeader 
        title="Our Projects" 
        subtitle="Explore our portfolio of data science and analytics projects"
        backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="w-full md:w-auto">
            <h2 className="text-3xl font-bold text-primary">Project Portfolio</h2>
            <p className="text-muted-foreground mt-2">
              Browse our completed and ongoing data science projects
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/new-project">Create New Project</Link>
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search projects..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-primary text-primary-foreground" : "border-primary text-primary hover:bg-primary/10"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={statusFilter === "All" ? "default" : "outline"}
              className={statusFilter === "All" ? "bg-primary text-primary-foreground" : "border-primary text-primary hover:bg-primary/10"}
              onClick={() => setStatusFilter("All")}
            >
              All Status
            </Button>
            <Button 
              variant={statusFilter === "Completed" ? "default" : "outline"}
              className={statusFilter === "Completed" ? "bg-green-500 text-white" : "border-green-500 text-green-500 hover:bg-green-500/10"}
              onClick={() => setStatusFilter("Completed")}
            >
              Completed
            </Button>
            <Button 
              variant={statusFilter === "In Progress" ? "default" : "outline"}
              className={statusFilter === "In Progress" ? "bg-blue-500 text-white" : "border-blue-500 text-blue-500 hover:bg-blue-500/10"}
              onClick={() => setStatusFilter("In Progress")}
            >
              In Progress
            </Button>
            <Button 
              variant={statusFilter === "Planning" ? "default" : "outline"}
              className={statusFilter === "Planning" ? "bg-amber-500 text-white" : "border-amber-500 text-amber-500 hover:bg-amber-500/10"}
              onClick={() => setStatusFilter("Planning")}
            >
              Planning
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-card border-primary/20 overflow-hidden h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-primary">{project.name}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{project.category}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Progress</p>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        project.status === "Completed" ? "bg-green-500" : 
                        project.status === "In Progress" ? "bg-blue-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{project.progress}% complete</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Team</p>
                  <div className="flex flex-wrap gap-2">
                    {project.team.map((member, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Client</p>
                    <p className="font-medium">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-medium">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-medium">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Deadline</p>
                    <p className="font-medium">{project.deadline}</p>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 pt-0 flex justify-between">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Link to={`/projects/${project.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Link to={`/projects/${project.id}/edit`}>Edit</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium text-primary mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setStatusFilter("All");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectsPage; 