import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Background } from '@/components/ui/background';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
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
  Heart,
  Menu,
  X,
  Home,
  Info,
  Mail,
  Facebook,
  Twitter,
  Linkedin
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
    name: 'Dan Barasa',
    role: 'Data Science Consultant',
    image: '/images/testimonials/dan-barasa.jpg',
    quote: 'Data Science Hub has been instrumental in transforming our data analytics capabilities. Their expertise and guidance have helped us make data-driven decisions that have significantly improved our business outcomes.'
  },
  {
    name: 'Martha Kioko',
    role: 'Business Intelligence Manager',
    image: '/images/testimonials/martha-kioko.jpg',
    quote: 'Working with Data Science Hub has been a game-changer for our organization. Their comprehensive approach to data analysis and visualization has enabled us to uncover valuable insights and drive strategic initiatives.'
  },
  {
    name: 'Joy Consolate',
    role: 'Data Strategy Director',
    image: '/images/testimonials/joy-consolate.jpg',
    quote: 'The team at Data Science Hub brings exceptional expertise and professionalism to every project. Their ability to translate complex data into actionable insights has been crucial to our success.'
  }
];

const teamMembers = [
  {
    name: 'Ogechi Daniel Koel',
    role: 'Biostatistician',
    image: '/images/team/ogechi-daniel.jpg',
    expertise: ['Biostatistics', 'Statistical Analysis', 'Public Health'],
    bio: 'I am an apt Biostatistician determined in applying various statistical methods to inform decisions in medicine, public health and science.'
  },
  {
    name: 'Nobert Wafula',
    role: 'Data Analyst',
    image: '/images/team/nobert-wafula.jpg',
    expertise: ['Data Analysis', 'Predictive Modeling', 'Business Intelligence'],
    bio: 'I\'m a data analyst passionate about turning data into actionable insights and building predictive models that drive smart, impactful decisions.'
  },
  {
    name: 'Enock Bereka',
    role: 'Data Scientist',
    image: '/images/team/enock-bereka.jpg',
    expertise: ['Machine Learning', 'Data Analysis', 'Statistical Modeling'],
    bio: 'I\'m a passionate data scientist driven by curiosity and a commitment to lifelong learning. I thrive on exploring new tools and techniques to uncover insights and solve real-world problems. My goal is to turn data into impactful solutions that drive informed decision-making and meaningful change.'
  },
  {
    name: 'Timothy Achala',
    role: 'AI Enthusiast & Computer Scientist',
    image: '/images/team/timothy-achala.jpg',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Computer Science'],
    bio: 'I am an AI Enthusiast and computer scientist with a deep passion for data. My work lies at the intersection of theory and real-world application—leveraging mathematical rigor and computational power to extract meaningful insights from complex datasets. With a strong foundation in algorithms, statistics, and machine learning, I specialize in transforming raw data into actionable intelligence.'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => {
      const newState = !prevState;
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      return newState;
    });
  }, []); // No dependencies needed since we're using functional updates

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        toggleMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, toggleMenu]);

  return (
    <div>
      <Background 
        image="/images/image (14).jpg"
        overlayOpacity={0.85}
      >
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <div className="text-center mb-8">
              <h1 className="text-6xl font-extrabold text-primary mb-2">
                Data Science Hub
              </h1>
              <div className="h-1 w-32 bg-primary mx-auto rounded-full"></div>
            </div>
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-primary mb-6">
                Master Data Science with Expert Guidance
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Join thousands of learners worldwide in mastering data science, machine learning, and AI through our comprehensive courses and hands-on projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to="/courses">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  <Link to="/contact">Contact Us</Link>
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
              <h2 className="text-3xl font-bold text-primary text-center mb-8">What Our Clients Say</h2>
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

            {/* Team Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary text-center mb-8">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="bg-white/95 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-center">{member.name}</CardTitle>
                      <CardDescription className="text-center">{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {member.expertise.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-muted-foreground text-center text-sm">{member.bio}</p>
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
      
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50 menu-button">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMenu} 
          className="text-gray-600 hover:text-blue-600 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-40 mobile-menu ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className={`fixed right-0 top-0 h-full w-72 bg-white transform transition-transform duration-300 ease-in-out mobile-menu ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-primary">Menu</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu}
                className="text-gray-600 hover:text-blue-600"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="flex-1 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Main</h3>
                <Link 
                  to="/" 
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition-colors" 
                  onClick={toggleMenu}
                >
                  <Home className="h-5 w-5 mr-3" />
                  Home
                </Link>
                <Link 
                  to="/courses" 
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition-colors" 
                  onClick={toggleMenu}
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  Courses
                </Link>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">About</h3>
                <Link 
                  to="/about" 
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition-colors" 
                  onClick={toggleMenu}
                >
                  <Info className="h-5 w-5 mr-3" />
                  About Us
                </Link>
                <Link 
                  to="/team" 
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition-colors" 
                  onClick={toggleMenu}
                >
                  <Users className="h-5 w-5 mr-3" />
                  Our Team
                </Link>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact</h3>
                <Link 
                  to="/contact" 
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition-colors" 
                  onClick={toggleMenu}
                >
                  <Mail className="h-5 w-5 mr-3" />
                  Contact Us
                </Link>
              </div>
            </nav>
            
            <div className="mt-auto pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
