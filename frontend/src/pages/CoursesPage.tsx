import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  BookOpen, 
  Clock,
  Users,
  Star,
  ChevronRight,
  PlayCircle,
  Bookmark,
  Share2,
  Filter
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Background } from '@/components/ui/background';

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Data Science Fundamentals",
    description: "Learn the basics of data science, including data analysis, visualization, and statistical methods.",
    instructor: "Dr. Sarah Johnson",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.8,
    students: 1234,
    progress: 0,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    category: "Data Science"
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms, model training, and evaluation techniques.",
    instructor: "Prof. Michael Chen",
    duration: "10 weeks",
    level: "Intermediate",
    rating: 4.9,
    students: 856,
    progress: 75,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    category: "Machine Learning"
  },
  {
    id: 3,
    title: "Python for Data Science",
    description: "Master Python programming for data analysis, including pandas, numpy, and scikit-learn.",
    instructor: "Dr. Emily Brown",
    duration: "6 weeks",
    level: "Beginner",
    rating: 4.7,
    students: 2156,
    progress: 100,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop",
    category: "Data Science"
  },
  {
    id: 4,
    title: "Advanced Data Visualization",
    description: "Create compelling data visualizations using modern tools and techniques.",
    instructor: "Alex Thompson",
    duration: "4 weeks",
    level: "Advanced",
    rating: 4.6,
    students: 543,
    progress: 0,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    category: "Data Science"
  },
  {
    id: 5,
    title: "Deep Learning Fundamentals",
    description: "Explore neural networks, deep learning architectures, and their applications.",
    instructor: "Dr. James Wilson",
    duration: "12 weeks",
    level: "Advanced",
    rating: 4.9,
    students: 678,
    progress: 30,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    category: "Machine Learning"
  },
  {
    id: 6,
    title: "Data Engineering",
    description: "Learn data pipeline development, ETL processes, and big data technologies.",
    instructor: "Maria Garcia",
    duration: "8 weeks",
    level: "Intermediate",
    rating: 4.7,
    students: 892,
    progress: 0,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    category: "Data Science"
  }
];

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedProgress, setSelectedProgress] = useState("All");

  // Filter courses based on search term, level, and progress
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    const matchesProgress = selectedProgress === "All" || 
                          (selectedProgress === "In Progress" && course.progress > 0 && course.progress < 100) ||
                          (selectedProgress === "Completed" && course.progress === 100) ||
                          (selectedProgress === "Not Started" && course.progress === 0);
    const matchesCategory = activeCategory === "all" || course.category === activeCategory;
    return matchesSearch && matchesLevel && matchesProgress && matchesCategory;
  });

  // Get unique levels for filter
  const levels = ["All", ...new Set(courses.map(course => course.level))];
  const progressOptions = ["All", "Not Started", "In Progress", "Completed"];

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress > 0) return "bg-blue-500";
    return "bg-gray-200";
  };

  return (
    <Background 
      image="/images/image (4).jpg"
      overlayOpacity={0.8}
    >
      <Layout>
        <PageHeader 
          title="Courses" 
          subtitle="Explore our comprehensive data science courses"
          backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"
        />
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="w-full md:w-auto">
              <h2 className="text-3xl font-bold text-primary">Available Courses</h2>
              <p className="text-muted-foreground mt-2">
                Browse and enroll in our data science courses
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <BookOpen className="h-4 w-4 mr-2" />
              My Courses
            </Button>
          </div>

          {/* Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search courses..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {levels.map((level) => (
                <Button 
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  className={selectedLevel === level ? "bg-primary text-primary-foreground" : "border-primary text-primary hover:bg-primary/10"}
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </Button>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {progressOptions.map((option) => (
                <Button 
                  key={option}
                  variant={selectedProgress === option ? "default" : "outline"}
                  className={selectedProgress === option ? "bg-primary text-primary-foreground" : "border-primary text-primary hover:bg-primary/10"}
                  onClick={() => setSelectedProgress(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-6 bg-white/90 backdrop-blur-sm">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="Data Science">Data Science</TabsTrigger>
              <TabsTrigger value="Machine Learning">Machine Learning</TabsTrigger>
              <TabsTrigger value="Statistics">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Level:</span> {course.level}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Duration:</span> {course.duration}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Instructor:</span> {course.instructor}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Rating:</span>
                          <span className="text-sm">{course.rating}/5</span>
                          <span className="text-sm">({course.students} students)</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium text-primary mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLevel("All");
                  setSelectedProgress("All");
                  setActiveCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </Layout>
    </Background>
  );
};

export default CoursesPage;
