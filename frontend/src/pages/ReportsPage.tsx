import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  FileText, 
  Download, 
  Calendar,
  BarChart2,
  PieChart,
  LineChart,
  Table
} from "lucide-react";

// Mock data for reports
const reports = [
  {
    id: 1,
    title: "Monthly Analytics Summary",
    description: "Comprehensive analysis of platform usage and performance metrics",
    type: "Analytics",
    format: "PDF",
    date: "2024-03-15",
    size: "2.4 MB",
    downloads: 45
  },
  {
    id: 2,
    title: "User Engagement Report",
    description: "Detailed breakdown of user interactions and engagement patterns",
    type: "User Analytics",
    format: "Excel",
    date: "2024-03-14",
    size: "1.8 MB",
    downloads: 32
  },
  {
    id: 3,
    title: "System Performance Metrics",
    description: "Technical performance and resource utilization statistics",
    type: "Technical",
    format: "PDF",
    date: "2024-03-13",
    size: "3.1 MB",
    downloads: 28
  },
  {
    id: 4,
    title: "Project Status Overview",
    description: "Current status and progress of all ongoing projects",
    type: "Project Management",
    format: "Excel",
    date: "2024-03-12",
    size: "1.5 MB",
    downloads: 56
  },
  {
    id: 5,
    title: "Resource Allocation Report",
    description: "Analysis of resource distribution and utilization",
    type: "Resource Management",
    format: "PDF",
    date: "2024-03-11",
    size: "2.9 MB",
    downloads: 19
  },
  {
    id: 6,
    title: "Client Satisfaction Survey",
    description: "Results from the latest client feedback survey",
    type: "Client Feedback",
    format: "PDF",
    date: "2024-03-10",
    size: "1.2 MB",
    downloads: 67
  }
];

export const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // Filter reports based on search term and type
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || report.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Get unique report types for filter
  const reportTypes = ["All", ...new Set(reports.map(report => report.type))];

  return (
    <Layout>
      <PageHeader 
        title="Reports & Analytics" 
        subtitle="Access and download various reports and analytics documents"
        backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="w-full md:w-auto">
            <h2 className="text-3xl font-bold text-primary">Reports Library</h2>
            <p className="text-muted-foreground mt-2">
              Browse and download our collection of reports and analytics
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Generate New Report
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search reports..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {reportTypes.map((type) => (
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

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="bg-card border-primary/20 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-primary">{report.title}</CardTitle>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {report.format}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{report.type}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{report.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{report.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Size</p>
                    <p className="font-medium">{report.size}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Downloads</p>
                    <p className="font-medium">{report.downloads}</p>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium text-primary mb-2">No reports found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => {
                setSearchTerm("");
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

export default ReportsPage; 