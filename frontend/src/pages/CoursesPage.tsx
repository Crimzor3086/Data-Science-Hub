
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award } from "lucide-react";

const courses = {
  beginner: [
    {
      id: 1,
      title: "Introduction to Data Science",
      description: "Learn the fundamentals of data science including data collection, cleaning, and basic analysis.",
      duration: "6 weeks",
      students: 1245,
      level: "Beginner",
      price: "$299",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Python for Data Analysis",
      description: "Master Python programming and essential libraries like Pandas and NumPy for data manipulation.",
      duration: "8 weeks",
      students: 987,
      level: "Beginner",
      price: "$349",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Data Visualization Basics",
      description: "Explore techniques for creating effective data visualizations using popular tools and libraries.",
      duration: "4 weeks",
      students: 756,
      level: "Beginner",
      price: "$199",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    }
  ],
  intermediate: [
    {
      id: 4,
      title: "Statistical Methods for Data Science",
      description: "Apply statistical concepts and methods to derive meaningful insights from complex datasets.",
      duration: "10 weeks",
      students: 683,
      level: "Intermediate",
      price: "$499",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Machine Learning Fundamentals",
      description: "Build a solid foundation in machine learning algorithms and implement them using scikit-learn.",
      duration: "12 weeks",
      students: 892,
      level: "Intermediate",
      price: "$599",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "SQL for Data Scientists",
      description: "Master SQL for efficient data querying, manipulation, and database management for data science projects.",
      duration: "6 weeks",
      students: 542,
      level: "Intermediate",
      price: "$399",
      image: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?q=80&w=2670&auto=format&fit=crop"
    }
  ],
  advanced: [
    {
      id: 7,
      title: "Deep Learning Specialization",
      description: "Dive into neural networks, CNNs, RNNs, and transformer models for advanced AI applications.",
      duration: "16 weeks",
      students: 476,
      level: "Advanced",
      price: "$799",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2665&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "Big Data Processing with Spark",
      description: "Learn distributed computing principles and implement big data solutions using Apache Spark.",
      duration: "14 weeks",
      students: 328,
      level: "Advanced",
      price: "$699",
      image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=2674&auto=format&fit=crop"
    },
    {
      id: 9,
      title: "MLOps & Model Deployment",
      description: "Master the practices and tools for deploying, scaling, and monitoring machine learning models in production.",
      duration: "12 weeks",
      students: 214,
      level: "Advanced",
      price: "$899",
      image: "https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?q=80&w=2670&auto=format&fit=crop"
    }
  ]
};

const CourseCard = ({ course }: { course: any }) => {
  return (
    <Card className="overflow-hidden bg-gray-900 border-gray-800 h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-white">{course.title}</CardTitle>
          <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
            {course.level}
          </Badge>
        </div>
        <CardDescription className="text-gray-400">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-gray-400 flex-grow">
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-amber-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-amber-500" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-gray-800 pt-4">
        <span className="text-xl font-bold text-amber-500">{course.price}</span>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black">Enroll Now</Button>
      </CardFooter>
    </Card>
  );
};

const CoursesPage = () => {
  return (
    <Layout>
      <PageHeader 
        title="Data Science Courses" 
        subtitle="Advance your career with our comprehensive courses taught by industry experts"
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Expand Your Data Science Skills</h2>
          <p className="text-gray-300">
            Our carefully designed curriculum provides a structured learning path from beginner to advanced levels. 
            Choose the courses that match your experience and career goals.
          </p>
        </div>
        
        <Tabs defaultValue="beginner" className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="beginner" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                Beginner
              </TabsTrigger>
              <TabsTrigger value="intermediate" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                Intermediate
              </TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                Advanced
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="beginner">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.beginner.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="intermediate">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.intermediate.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.advanced.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <section className="bg-amber-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Award className="h-16 w-16 mx-auto mb-6 text-gray-900" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Certified</h2>
            <p className="text-xl text-gray-900/80 mb-8">
              Earn industry-recognized certifications that validate your skills and boost your career prospects.
            </p>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              Browse Certification Programs
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CoursesPage;
