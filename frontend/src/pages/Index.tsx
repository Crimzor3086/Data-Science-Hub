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
  Zap,
  Award,
  Star,
  BarChart2,
  Brain,
  Globe,
  GraduationCap,
  PieChart,
  Settings,
  Target,
  Lightbulb,
  Heart
} from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Comprehensive Courses",
    description: "Access a wide range of data science courses taught by industry experts."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Instructors",
    description: "Learn from experienced professionals in the field of data science."
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Certification",
    description: "Earn recognized certifications to boost your career prospects."
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Quality Education",
    description: "Get high-quality education with practical, hands-on experience."
  }
];

const testimonials = [
  {
    name: 'Research Scientist',
    role: 'Healthcare Industry',
    image: '/images/testimonials/testimonial1.jpg',
    quote: 'The courses at Data Science Hub transformed my research capabilities. The practical approach and industry-relevant projects gave me the skills I needed.'
  },
  {
    name: 'Data Analyst',
    role: 'Financial Services',
    image: '/images/testimonials/testimonial2.jpg',
    quote: 'The structured learning path and supportive community helped me transition into data science from a different field.'
  },
  {
    name: 'Project Manager',
    role: 'Technology Sector',
    image: '/images/testimonials/testimonial3.jpg',
    quote: 'The hands-on projects and real-world datasets made learning engaging and practical. Perfect for professionals looking to upskill.'
  }
];

const aboutUs = {
  description: `At Data Science Hub, we are dedicated to empowering businesses, organizations and individuals with the tools and knowledge needed to thrive in today's fast-paced, data-driven world. Our team of experts provides a diverse range of services designed to drive informed decision-making, foster growth, and accelerate innovation. From data collection and analysis to advanced AI development and professional training, we deliver tailored solutions that meet the unique needs of our clients.

We pride ourselves on offering high-quality, actionable insights and strategic support across various industries. Whether you're looking to optimize operational efficiency, enhance your digital presence, or develop cutting-edge artificial intelligence solutions, we've got you covered.

In addition to our service offerings, we are proud to provide a wide range of industry-leading courses. These courses are designed to equip individuals and teams with in-depth knowledge of data analysis, machine learning, AI, and more. Whether you're looking to master tools like SPSS, R, Python, or Power BI, or expand your expertise in specialized fields like spatial analysis or infectious disease modeling, our training programs offer the skills you need to stay ahead of the curve.

At Data Science Hub, we are more than just a service provider—we are your partner in success. Our commitment to excellence, innovation, and customer satisfaction drives everything we do. Let us help you unlock the potential of data, technology, and knowledge to propel your business or career forward.`,
  mission: 'Our mission is to empower businesses, organizations, and individuals by providing innovative tools, expert knowledge, and tailored solutions that foster growth, enhance decision-making, and drive success in a data-driven world. Through high-quality services, cutting-edge AI development, and comprehensive training programs, we enable our clients to optimize performance and stay ahead of industry trends.',
  vision: 'Our vision is to be a trusted partner in transforming the way businesses and individuals leverage data, technology, and knowledge. We strive to lead the way in innovation, providing strategic insights and expertise that fuel progress, drive operational excellence, and unlock new opportunities for success in an ever-evolving digital landscape.'
};

const Index = () => {
  return (
    <Background 
      image="/images/backgrounds/home-bg.jpg"
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
