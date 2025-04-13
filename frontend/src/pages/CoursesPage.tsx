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
    title: 'Data Analysis with SPSS',
    description: 'This course introduces students to the fundamentals of data analysis using SPSS, a widely used software in research and statistical analysis. The course covers key concepts in statistics, data manipulation, and interpretation.',
    instructor: 'Ogechi Daniel Koel',
    duration: '8 weeks',
    level: 'Beginner',
    rating: 4.8,
    students: 120,
    progress: 0,
    image: '/images/courses/spss.jpg',
    category: 'Data Analysis',
    tags: ['SPSS', 'Statistics', 'Research']
    },
    {
      id: 2,
    title: 'Data Analysis With R',
    description: 'This course provides an introduction to data analysis using R, a powerful and widely used programming language for statistical computing and graphics. Students will gain hands-on experience in working with R to manipulate, analyze, and visualize data.',
    instructor: 'Nobert Wafula',
    duration: '10 weeks',
    level: 'Intermediate',
    rating: 4.7,
    students: 150,
    progress: 0,
    image: '/images/courses/r-analysis.jpg',
    category: 'Data Analysis',
    tags: ['R', 'Statistics', 'Visualization']
    },
    {
      id: 3,
    title: 'Machine Learning With R',
    description: 'This course introduces students to the core concepts and techniques of machine learning using R. The course focuses on building a solid foundation in both supervised and unsupervised learning.',
    instructor: 'Enock Bereka',
    duration: '12 weeks',
    level: 'Advanced',
    rating: 4.9,
    students: 180,
    progress: 0,
    image: '/images/courses/r-ml.jpg',
    category: 'Machine Learning',
    tags: ['R', 'Machine Learning', 'AI']
  },
    {
      id: 4,
    title: 'Spatial Analysis With R',
    description: 'This course provides an in-depth introduction to spatial data analysis using R. Spatial analysis is a crucial tool in many fields, including geography, environmental science, urban planning, and epidemiology.',
    instructor: 'Timothy Achala',
    duration: '10 weeks',
    level: 'Intermediate',
    rating: 4.6,
    students: 90,
    progress: 0,
    image: '/images/courses/spatial.jpg',
    category: 'Data Analysis',
    tags: ['R', 'Spatial Analysis', 'GIS']
    },
    {
      id: 5,
    title: 'Time Series and Forecasting With R',
    description: 'This course provides a comprehensive introduction to time series analysis using R, focusing on methods for analyzing temporal data to uncover underlying patterns and make accurate forecasts.',
    instructor: 'Ogechi Daniel Koel',
    duration: '8 weeks',
    level: 'Intermediate',
    rating: 4.7,
    students: 110,
    progress: 0,
    image: '/images/courses/time-series.jpg',
    category: 'Data Analysis',
    tags: ['R', 'Time Series', 'Forecasting']
    },
    {
      id: 6,
    title: 'Survival Analysis With R',
    description: 'This course provides a comprehensive introduction to survival analysis using R, focusing on methods for analyzing and interpreting time-to-event data.',
    instructor: 'Nobert Wafula',
    duration: '10 weeks',
    level: 'Advanced',
    rating: 4.8,
    students: 85,
    progress: 0,
    image: '/images/courses/survival.jpg',
    category: 'Statistics',
    tags: ['R', 'Survival Analysis', 'Biostatistics']
  },
    {
      id: 7,
    title: 'Data Collection With ODK, Commcare And KOBO',
    description: 'This course provides an in-depth overview of mobile data collection tools, focusing on three widely used platforms: Open Data Kit (ODK), CommCare, and KOBO.',
    instructor: 'Enock Bereka',
    duration: '6 weeks',
    level: 'Beginner',
    rating: 4.5,
    students: 130,
    progress: 0,
    image: '/images/courses/data-collection.jpg',
    category: 'Data Collection',
    tags: ['ODK', 'CommCare', 'KOBO']
    },
    {
      id: 8,
    title: 'Data Analysis with Python',
    description: 'This course provides a comprehensive introduction to data analysis using Python, one of the most popular programming languages for data science, machine learning, and statistical analysis.',
    instructor: 'Timothy Achala',
    duration: '12 weeks',
    level: 'Intermediate',
    rating: 4.8,
    students: 200,
    progress: 0,
    image: '/images/courses/python-analysis.jpg',
    category: 'Data Analysis',
    tags: ['Python', 'Pandas', 'NumPy']
    },
    {
      id: 9,
    title: 'Machine Learning with Python',
    description: 'This course provides a comprehensive introduction to machine learning using Python, one of the leading programming languages for data science and artificial intelligence.',
    instructor: 'Ogechi Daniel Koel',
    duration: '14 weeks',
    level: 'Advanced',
    rating: 4.9,
    students: 160,
    progress: 0,
    image: '/images/courses/python-ml.jpg',
    category: 'Machine Learning',
    tags: ['Python', 'Machine Learning', 'AI']
  },
  {
    id: 10,
    title: 'Deep Learning/AI In Python',
    description: 'This course provides an in-depth introduction to deep learning and artificial intelligence (AI) using Python, one of the most powerful languages for building AI and machine learning models.',
    instructor: 'Timothy Achala',
    duration: '16 weeks',
    level: 'Advanced',
    rating: 4.9,
    students: 140,
    progress: 0,
    image: '/images/courses/deep-learning.jpg',
    category: 'AI',
    tags: ['Python', 'Deep Learning', 'AI']
  },
  {
    id: 11,
    title: 'Data Analysis with Stata',
    description: 'This course provides an introduction to data analysis using Stata, a powerful statistical software widely used in social sciences, economics, public health, and other fields.',
    instructor: 'Nobert Wafula',
    duration: '8 weeks',
    level: 'Intermediate',
    rating: 4.7,
    students: 95,
    progress: 0,
    image: '/images/courses/stata.jpg',
    category: 'Data Analysis',
    tags: ['Stata', 'Statistics', 'Research']
  },
  {
    id: 12,
    title: 'Data Visualization with Power BI and Tableau',
    description: 'This course offers an introduction to data visualization using two of the leading tools in the industry—Power BI and Tableau.',
    instructor: 'Enock Bereka',
    duration: '10 weeks',
    level: 'Intermediate',
    rating: 4.8,
    students: 170,
    progress: 0,
    image: '/images/courses/visualization.jpg',
    category: 'Data Visualization',
    tags: ['Power BI', 'Tableau', 'Visualization']
  },
  {
    id: 13,
    title: 'Qualitative Analysis with Nvivo',
    description: 'This course provides an introduction to qualitative data analysis using NVivo, a powerful software tool designed to help researchers organize, analyze, and visualize qualitative data.',
    instructor: 'Ogechi Daniel Koel',
    duration: '8 weeks',
    level: 'Intermediate',
    rating: 4.6,
    students: 75,
    progress: 0,
    image: '/images/courses/nvivo.jpg',
    category: 'Qualitative Analysis',
    tags: ['NVivo', 'Qualitative Research', 'Analysis']
  },
  {
    id: 14,
    title: 'Qualitative Analysis with Dedoose',
    description: 'This course introduces students to qualitative data analysis using Dedoose, a web-based software designed for mixed-methods research.',
    instructor: 'Nobert Wafula',
    duration: '8 weeks',
    level: 'Intermediate',
    rating: 4.5,
    students: 65,
    progress: 0,
    image: '/images/courses/dedoose.jpg',
    category: 'Qualitative Analysis',
    tags: ['Dedoose', 'Qualitative Research', 'Analysis']
  },
  {
    id: 15,
    title: 'Graphic Design',
    description: 'This course offers a comprehensive introduction to the principles and practices of graphic design, focusing on the creative and technical aspects of designing visual content for various media.',
    instructor: 'Enock Bereka',
    duration: '12 weeks',
    level: 'Beginner',
    rating: 4.7,
    students: 120,
    progress: 0,
    image: '/images/courses/graphic-design.jpg',
    category: 'Design',
    tags: ['Graphic Design', 'Adobe', 'Visual Design']
  },
  {
    id: 16,
    title: 'Web Development',
    description: 'This course provides a comprehensive introduction to web development, covering both front-end and back-end development techniques.',
    instructor: 'Timothy Achala',
    duration: '14 weeks',
    level: 'Intermediate',
    rating: 4.8,
    students: 150,
    progress: 0,
    image: '/images/courses/web-dev.jpg',
    category: 'Web Development',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 17,
    title: 'Infectious Disease Modelling',
    description: 'This course provides an in-depth exploration of mathematical and computational models used to understand the dynamics of infectious diseases.',
    instructor: 'Ogechi Daniel Koel',
    duration: '10 weeks',
    level: 'Advanced',
    rating: 4.9,
    students: 85,
    progress: 0,
    image: '/images/courses/disease-modeling.jpg',
    category: 'Public Health',
    tags: ['Epidemiology', 'Modeling', 'Public Health']
  },
  {
    id: 18,
    title: 'Database Management with SQL',
    description: 'This course provides an introduction to the fundamentals of database management using SQL, the standard language for managing and manipulating relational databases.',
    instructor: 'Nobert Wafula',
    duration: '8 weeks',
    level: 'Intermediate',
    rating: 4.7,
    students: 130,
    progress: 0,
    image: '/images/courses/sql.jpg',
    category: 'Database',
    tags: ['SQL', 'Database', 'Data Management']
  }
];

const mappedCourses = courses.map(course => ({
  ...course,
  students: 0,
  progress: 0
}));

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedProgress, setSelectedProgress] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState(mappedCourses);

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
      image="/images/image (14).jpg"
      overlayOpacity={0.85}
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
                className="pl-10 bg-white/95 backdrop-blur-sm border-primary/20"
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
