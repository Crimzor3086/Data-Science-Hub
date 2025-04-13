import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Background } from '@/components/ui/background';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Code, 
  Database, 
  FileText, 
  LineChart, 
  Users, 
  Zap
} from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Comprehensive Courses',
    description: 'Learn from industry experts with our structured curriculum'
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: 'Hands-on Projects',
    description: 'Apply your knowledge with real-world data science projects'
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: 'Data Resources',
    description: 'Access to premium datasets and computing resources'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Expert Community',
    description: 'Connect with fellow data scientists and mentors'
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: 'Career Support',
    description: 'Get guidance on job search and career advancement'
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Certification',
    description: 'Earn recognized certifications in data science'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Data Scientist at Google',
    image: '/images/image (16).jpg',
    quote: 'The courses at Data Science Hub transformed my career. The practical approach and industry-relevant projects gave me the confidence to land my dream job.'
  },
  {
    name: 'Michael Chen',
    role: 'ML Engineer at Amazon',
    image: '/images/image (17).jpg',
    quote: 'I was a complete beginner when I started. The structured learning path and supportive community helped me become proficient in data science.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Data Analyst at Microsoft',
    image: '/images/image (18).jpg',
    quote: 'The hands-on projects and real-world datasets made learning engaging and practical. I highly recommend Data Science Hub to anyone interested in data science.'
  }
];

const Index = () => {
  return (
    <Background 
      image="/images/image (19).jpg"
      overlayOpacity={0.85}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-primary mb-6">
              Master Data Science with Expert Guidance
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join thousands of learners worldwide in mastering data science, machine learning, and AI through our comprehensive courses and hands-on projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/courses">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/20 hover:border-primary/40">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary text-center mb-8">Why Choose Data Science Hub</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <div className="bg-primary/10 text-primary p-2 rounded-lg w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary text-center mb-8">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-white/95 backdrop-blur-sm border-primary/20 max-w-3xl mx-auto">
              <CardHeader>
                <div className="bg-primary/10 text-primary p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">Ready to Start Your Data Science Journey?</CardTitle>
                <CardDescription className="text-lg">
                  Join our community of learners and take the first step towards a rewarding career in data science.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/signup">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Index;
