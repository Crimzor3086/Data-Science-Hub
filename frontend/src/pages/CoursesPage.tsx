import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Mock data for courses
const courses = [
  {
    id: 1,
    title: 'Data Analysis with SPSS',
    description: 'This course introduces students to the fundamentals of data analysis using SPSS, a widely used software in research and statistical analysis. The course covers key concepts in statistics, data manipulation, and interpretation, providing a hands-on approach to analyzing data and drawing meaningful conclusions.',
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
    description: 'This course provides an introduction to data analysis using R, a powerful and widely used programming language for statistical computing and graphics. Students will gain hands-on experience in working with R to manipulate, analyze, and visualize data, preparing them to apply these skills to real-world datasets.',
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
    description: 'This course introduces students to the core concepts and techniques of machine learning using R, a popular programming language for statistical computing and data analysis. The course focuses on building a solid foundation in both supervised and unsupervised learning, enabling students to apply machine learning algorithms to solve real-world problems using R.',
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
    description: 'This course provides an in-depth introduction to spatial data analysis using R, a powerful language for statistical computing and geographic data analysis. Spatial analysis is a crucial tool in many fields, including geography, environmental science, urban planning, epidemiology, and social sciences, allowing practitioners to analyze and visualize spatial patterns and relationships in data.',
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
    description: 'This course provides a comprehensive introduction to time series analysis using R, focusing on methods for analyzing temporal data to uncover underlying patterns and make accurate forecasts. Time series analysis is widely used in fields such as economics, finance, weather forecasting, sales forecasting, and healthcare, where data is collected over time and is inherently sequential.',
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
    description: 'This course provides a comprehensive introduction to survival analysis using R, focusing on methods for analyzing and interpreting time-to-event data. Survival analysis is widely used in fields such as medicine, epidemiology, social sciences, engineering, and economics, where the goal is to understand the time until an event occurs, such as death, failure, relapse, or any other event of interest.',
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
    description: 'This course provides an in-depth overview of mobile data collection tools, focusing on three widely used platforms: Open Data Kit (ODK), CommCare, and KOBO. These platforms enable users to collect, manage, and analyze data in field settings, particularly in resource-limited environments or in areas where internet access may be intermittent. The course covers the core functionalities of each platform, including designing forms, configuring surveys, managing data, and analyzing results.',
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
    description: 'This course provides a comprehensive introduction to data analysis using Python, one of the most popular programming languages for data science, machine learning, and statistical analysis. Python\'s rich ecosystem of libraries such as Pandas, NumPy, Matplotlib, and Seaborn make it an excellent tool for performing data manipulation, statistical analysis, and data visualization.',
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
    description: 'This course provides a comprehensive introduction to machine learning using Python, one of the leading programming languages for data science and artificial intelligence. With the help of Python\'s powerful libraries such as Scikit-learn, TensorFlow, Keras, and XGBoost, students will learn to develop machine learning models to solve real-world problems across various domains, including business, healthcare, finance, and technology.',
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
    description: 'This course provides an in-depth introduction to deep learning and artificial intelligence (AI) using Python, one of the most powerful languages for building AI and machine learning models. With a focus on deep neural networks (DNNs), convolutional neural networks (CNNs), recurrent neural networks (RNNs), and generative models, students will explore cutting-edge techniques that power advanced applications in image recognition, natural language processing (NLP), recommendation systems, and autonomous systems.',
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
    description: 'This course provides an introduction to data analysis using Stata, a powerful statistical software widely used in social sciences, economics, public health, and other fields for managing, analyzing, and visualizing data. Students will learn how to efficiently navigate Stata\'s interface, import and manage data, perform statistical analysis, and generate reproducible reports.',
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
    description: 'This course offers an introduction to data visualization using two of the leading tools in the industry—Power BI and Tableau. Designed for professionals in data analytics, business intelligence, and decision-making, this course will teach students how to create interactive and compelling visualizations that enable data-driven insights. Both Power BI and Tableau are widely used for transforming complex data into easy-to-understand visual formats, helping stakeholders make informed decisions.',
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
    description: 'This course provides an introduction to qualitative data analysis using NVivo, a powerful software tool designed to help researchers organize, analyze, and visualize qualitative data such as interviews, focus groups, surveys, and open-ended responses. NVivo is widely used in fields such as social sciences, healthcare, education, and market research for handling complex, unstructured data.',
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
    description: 'This course introduces students to qualitative data analysis using Dedoose, a web-based software designed for mixed-methods research. Dedoose is particularly effective for handling qualitative and quantitative data, allowing researchers to analyze, organize, and visualize data in a user-friendly and collaborative environment. The tool is widely used in social sciences, education, healthcare, market research, and other fields that require qualitative analysis.',
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
    description: 'This course offers a comprehensive introduction to the principles and practices of graphic design, focusing on the creative and technical aspects of designing visual content for various media. Students will explore the fundamentals of design, including color theory, typography, layout, and composition, and learn how to apply these principles using industry-standard software such as Adobe Photoshop, Illustrator, and InDesign.',
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
    description: 'This course provides a comprehensive introduction to web development, covering both front-end and back-end development techniques. Students will learn the core technologies that power modern websites, including HTML, CSS, JavaScript, and server-side programming languages. The course will equip students with the skills needed to build responsive, interactive, and dynamic websites from the ground up.',
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
    description: 'This course provides an in-depth exploration of mathematical and computational models used to understand the dynamics of infectious diseases. The course covers the core concepts and methodologies for modeling the spread of diseases in populations, including the use of compartmental models (such as SIR, SEIR), stochastic models, and agent-based simulations. Students will learn how these models are used to predict disease spread, evaluate interventions, and inform public health policy decisions.',
    instructor: 'Ogechi Daniel Koel',
    duration: '12 weeks',
    level: 'Advanced',
    rating: 4.9,
    students: 85,
    progress: 0,
    image: '/images/courses/disease-modelling.jpg',
    category: 'Public Health',
    tags: ['Epidemiology', 'Modeling', 'Public Health']
  },
  {
    id: 18,
    title: 'Database Management with SQL',
    description: 'This course provides an introduction to the fundamentals of database management using SQL, the standard language for managing and manipulating relational databases. Students will learn how to design, implement, and maintain databases, as well as how to interact with databases using SQL to retrieve, update, and manage data efficiently.',
    instructor: 'Timothy Achala',
    duration: '10 weeks',
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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    const filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, selectedLevel]);

  const categories = ["all", ...new Set(courses.map(course => course.category))];
  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <Background 
      image="/images/image (8).jpg"
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
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(level => (
                      <SelectItem key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="mb-6 bg-white/90 backdrop-blur-sm">
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="Data Analysis">Data Analysis</TabsTrigger>
                <TabsTrigger value="Machine Learning">Machine Learning</TabsTrigger>
                <TabsTrigger value="Statistics">Statistics</TabsTrigger>
                <TabsTrigger value="Data Collection">Data Collection</TabsTrigger>
                <TabsTrigger value="Data Visualization">Data Visualization</TabsTrigger>
                <TabsTrigger value="AI">AI</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                      <CardHeader>
                        <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-2 py-1 rounded-lg text-sm">
                            {course.level}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{course.students} students</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {course.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Enroll Now <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="Data Analysis">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.filter(course => course.category === "Data Analysis").map((course) => (
                    <Card key={course.id} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                      <CardHeader>
                        <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-2 py-1 rounded-lg text-sm">
                            {course.level}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{course.students} students</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {course.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Enroll Now <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="Machine Learning">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.filter(course => course.category === "Machine Learning").map((course) => (
                    <Card key={course.id} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                      <CardHeader>
                        <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-2 py-1 rounded-lg text-sm">
                            {course.level}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{course.students} students</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {course.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Enroll Now <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="Statistics">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.filter(course => course.category === "Statistics").map((course) => (
                    <Card key={course.id} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                      <CardHeader>
                        <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-2 py-1 rounded-lg text-sm">
                            {course.level}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{course.students} students</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {course.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Enroll Now <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="Data Collection">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.filter(course => course.category === "Data Collection").map((course) => (
                    <Card key={course.id} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                      <CardHeader>
                        <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-2 py-1 rounded-lg text-sm">
                            {course.level}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{course.students} students</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {course.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Enroll Now <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="Data Visualization">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.filter(course => course.category === "Data Visualization").map((course) => (
                    <Card key={course.id} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                      <CardHeader>
                        <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-2 py-1 rounded-lg text-sm">
                            {course.level}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{course.students} students</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {course.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Enroll Now <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="AI">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.filter(course => course.category === "AI").map((course) => (
                    <Card key={course.id} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                      <CardHeader>
                        <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-2 py-1 rounded-lg text-sm">
                            {course.level}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{course.students} students</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {course.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Enroll Now <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
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
                    setSelectedLevel("all");
                    setSelectedCategory("all");
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
