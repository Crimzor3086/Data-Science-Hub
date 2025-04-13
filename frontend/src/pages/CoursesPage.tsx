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
  Clock,
  Users,
  Star,
  ChevronRight,
  PlayCircle,
  Bookmark,
  Share2
} from "lucide-react";

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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
  }
];

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedProgress, setSelectedProgress] = useState("All");

  // Filter courses based on search term, level, and progress
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    const matchesProgress = selectedProgress === "All" || 
                          (selectedProgress === "In Progress" && course.progress > 0 && course.progress < 100) ||
                          (selectedProgress === "Completed" && course.progress === 100) ||
                          (selectedProgress === "Not Started" && course.progress === 0);
    return matchesSearch && matchesLevel && matchesProgress;
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="bg-card border-primary/20 overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white">
                    <Bookmark className="h-4 w-4 text-primary" />
                  </Button>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-primary">{course.title}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={course.level === "Beginner" ? "bg-green-100 text-green-800 border-green-200" : 
                             course.level === "Intermediate" ? "bg-blue-100 text-blue-800 border-blue-200" : 
                             "bg-purple-100 text-purple-800 border-purple-200"}
                  >
                    {course.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">by {course.instructor}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                
                <div className="space-y-4">
                  {course.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-primary mr-1" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                      {course.progress === 100 ? (
                        <>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Review Course
                        </>
                      ) : course.progress > 0 ? (
                        <>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Start Learning
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary/10">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
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
                setSearchTerm("");
                setSelectedLevel("All");
                setSelectedProgress("All");
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

export default CoursesPage;
