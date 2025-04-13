import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
  ArrowDownRight,
  Github,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Background } from '@/components/ui/background';

// Mock data for projects
const projects = [
  {
    id: 1,
    title: "Customer Segmentation Analysis",
    description: "Advanced customer segmentation using machine learning algorithms to identify distinct customer groups based on purchasing behavior and demographics.",
    status: "In Progress",
    team: ["Ogechi Daniel Koel", "Nobert Wafula"],
    category: "Data Analysis",
    technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    githubUrl: "https://github.com/example/project1",
    demoUrl: "https://demo.example.com/project1",
  },
  {
    id: 2,
    title: "Sales Forecasting Model",
    description: "Development of a predictive model to forecast future sales based on historical data, seasonal trends, and market conditions.",
    status: "Completed",
    team: ["Enock Bereka", "Timothy Achala"],
    category: "Predictive Analytics",
    technologies: ["R", "Time Series Analysis", "ARIMA", "Prophet"],
    githubUrl: "https://github.com/example/project2",
    demoUrl: "https://demo.example.com/project2",
  },
  {
    id: 3,
    title: "Market Basket Analysis",
    description: "Analysis of customer purchasing patterns to identify product associations and optimize product placement and marketing strategies.",
    status: "Planning",
    team: ["Ogechi Daniel Koel"],
    category: "Data Analysis",
    technologies: ["Python", "Association Rules", "Apriori Algorithm"],
    githubUrl: "https://github.com/example/project3",
    demoUrl: "https://demo.example.com/project3",
  },
  {
    id: 4,
    title: "Sentiment Analysis Dashboard",
    description: "Real-time sentiment analysis of customer feedback and social media mentions to track brand perception and customer satisfaction.",
    status: "In Progress",
    team: ["Nobert Wafula", "Timothy Achala"],
    category: "NLP",
    technologies: ["Python", "NLTK", "BERT", "React", "D3.js"],
    githubUrl: "https://github.com/example/project4",
    demoUrl: "https://demo.example.com/project4",
  },
  {
    id: 5,
    title: "Fraud Detection System",
    description: "Implementation of machine learning models to detect fraudulent transactions in real-time with high accuracy and low false positives.",
    status: "In Progress",
    team: ["Enock Bereka", "Ogechi Daniel Koel"],
    category: "Machine Learning",
    technologies: ["Python", "TensorFlow", "XGBoost", "AWS"],
    githubUrl: "https://github.com/example/project5",
    demoUrl: "https://demo.example.com/project5",
  },
  {
    id: 6,
    title: "Supply Chain Optimization",
    description: "Data-driven optimization of supply chain operations to reduce costs, improve delivery times, and enhance inventory management.",
    status: "Planning",
    team: ["Nobert Wafula", "Enock Bereka"],
    category: "Operations Research",
    technologies: ["Python", "Linear Programming", "Simulation", "Tableau"],
    githubUrl: "https://github.com/example/project6",
    demoUrl: "https://demo.example.com/project6",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter projects based on search term, category, and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || project.category === activeCategory;
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
    <Background 
      image="/images/image (7).jpg"
      overlayOpacity={0.8}
    >
      <Layout>
        <PageHeader 
          title="Our Projects" 
          subtitle="Explore our portfolio of data science and analytics projects"
          backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
        />
        
        <div className="container mx-auto py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-white">Projects</h1>
            
            <div className="flex gap-4 mb-8">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/90 backdrop-blur-sm"
                />
              </div>
              <Button variant="outline" className="bg-white/90 backdrop-blur-sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="mb-6 bg-white/90 backdrop-blur-sm">
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="Analytics">Analytics</TabsTrigger>
                <TabsTrigger value="Machine Learning">Machine Learning</TabsTrigger>
                <TabsTrigger value="Data Visualization">Data Visualization</TabsTrigger>
              </TabsList>

              <TabsContent value={activeCategory}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <Card key={project.id} className="bg-white/90 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">Status:</span> {project.status}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Team:</span> {project.team.join(', ')}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="outline" className="flex-1" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
                        <Button variant="outline" className="flex-1" asChild>
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    </Background>
  );
};

export default ProjectsPage; 