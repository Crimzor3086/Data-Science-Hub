import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Background } from '@/components/ui/background';
import { 
  BarChart2, 
  Database, 
  Brain, 
  Code, 
  ArrowRight,
  LineChart,
  PieChart,
  FileText,
  Users,
  Settings,
  BarChart3,
  Palette,
  Globe,
  ClipboardList,
  GraduationCap,
  FileBarChart
} from 'lucide-react';

const services = [
  {
    title: 'Data Collection',
    description: 'Accurate, reliable data is the foundation of informed decision-making. Our data collection services provide businesses with high-quality, actionable data that can drive strategy and improve performance.',
    icon: <Database className="h-6 w-6" />,
    features: [
      'Qualitative and quantitative data gathering',
      'Industry-leading methods and tools',
      'Timely and relevant data collection',
      'Customized data collection strategies'
    ],
    image: '/images/services/data-collection.jpg'
  },
  {
    title: 'Data Analysis',
    description: 'Comprehensive data analysis services to help you make informed decisions.',
    icon: <BarChart3 className="w-6 h-6" />,
    features: [
      'Advanced analytical techniques',
      'Trend identification and forecasting',
      'Operational efficiency analysis',
      'Customer behavior insights'
    ],
    image: '/images/services/data-analysis.jpg'
  },
  {
    title: 'Machine Learning',
    description: 'Custom machine learning solutions to automate and optimize your processes.',
    icon: <Brain className="w-6 h-6" />,
    features: [
      'Machine learning solutions',
      'Natural language processing',
      'Custom AI development',
      'Process optimization'
    ],
    image: '/images/services/machine-learning.jpg'
  },
  {
    title: 'Data Visualization',
    description: 'Beautiful and interactive data visualizations to communicate insights effectively.',
    icon: <PieChart className="w-6 h-6" />,
    features: [
      'Logo design',
      'Brochure creation',
      'Social media graphics',
      'Brand identity development'
    ],
    image: '/images/services/data-visualization.jpg'
  },
  {
    title: 'Statistical Consulting',
    description: 'Expert statistical consulting to validate and enhance your research.',
    icon: <LineChart className="w-6 h-6" />,
    features: [
      'Industry analysis reports',
      'Academic research papers',
      'Evidence-based documentation',
      'Strategic research support'
    ],
    image: '/images/services/statistical-consulting.jpg'
  },
  {
    title: 'Research Writing',
    description: 'We offer in-depth research writing services designed to support your business\'s strategic initiatives. From industry analysis to academic research, our experienced writers deliver meticulously sourced and structured content.',
    icon: <FileText className="h-6 w-6" />,
    features: [
      'Internal reports',
      'Client reports',
      'Stakeholder communications',
      'Performance analysis'
    ],
    image: '/images/services/research-writing.jpg'
  },
  {
    title: 'Graphic Design',
    description: 'Our graphic design services combine creativity and strategy to produce visually captivating content that aligns with your brand\'s identity. Whether it\'s logos, brochures, or social media graphics, we craft designs that are both aesthetically pleasing and functional.',
    icon: <Palette className="h-6 w-6" />,
    features: [
      'Logo design',
      'Brochure creation',
      'Social media graphics',
      'Brand identity development'
    ],
    image: '/images/services/graphic-design.jpg'
  },
  {
    title: 'Web Design',
    description: 'Stand out in the digital world with our custom web design services. We create responsive, user-friendly websites that not only look great but also offer seamless user experiences.',
    icon: <Globe className="h-6 w-6" />,
    features: [
      'Responsive design',
      'E-commerce solutions',
      'Corporate websites',
      'User experience optimization'
    ],
    image: '/images/services/web-design.jpg'
  },
  {
    title: 'Project Management',
    description: 'Effective project management is key to delivering results on time and within budget. Our certified project managers ensure that your projects are executed with precision and efficiency.',
    icon: <ClipboardList className="h-6 w-6" />,
    features: [
      'Project planning and coordination',
      'Budget management',
      'Timeline tracking',
      'Progress reporting'
    ],
    image: '/images/services/project-management.jpg'
  },
  {
    title: 'Training',
    description: 'Empower your team with our comprehensive training programs designed to enhance skills and foster professional growth. From technical training to leadership development, our programs are tailored to address specific needs.',
    icon: <GraduationCap className="h-6 w-6" />,
    features: [
      'Technical skills training',
      'Leadership development',
      'Custom training programs',
      'Performance improvement'
    ],
    image: '/images/services/training.jpg'
  },
  {
    title: 'Consultation',
    description: 'Our consultation services provide you with expert advice and strategic insights to help you navigate complex business challenges. We offer personalized guidance across various industries.',
    icon: <Users className="h-6 w-6" />,
    features: [
      'Business strategy consulting',
      'Technology solutions guidance',
      'Process improvement advice',
      'Industry-specific expertise'
    ],
    image: '/images/services/consultation.jpg'
  },
  {
    title: 'Writing Reports',
    description: 'Our expert team crafts comprehensive and insightful reports tailored to your specific needs. Whether it\'s for internal purposes, clients, or stakeholders, we ensure clear, concise, and well-researched content.',
    icon: <FileBarChart className="h-6 w-6" />,
    features: [
      'Internal reports',
      'Client reports',
      'Stakeholder communications',
      'Performance analysis'
    ],
    image: '/images/services/writing-reports.jpg'
  }
];

const ServicesPage = () => {
  return (
    <Background 
      image="/images/backgrounds/services-bg.jpg"
      overlayOpacity={0.85}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive data science solutions to help you make data-driven decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground p-2 rounded-lg">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-lg">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <div className="bg-primary/10 text-primary p-2 rounded-lg w-fit">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Expert Team</CardTitle>
                <CardDescription>
                  Our team of experienced data scientists and engineers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <div className="bg-primary/10 text-primary p-2 rounded-lg w-fit">
                  <Settings className="h-6 w-6" />
                </div>
                <CardTitle>Custom Solutions</CardTitle>
                <CardDescription>
                  Tailored approaches to meet your specific needs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <div className="bg-primary/10 text-primary p-2 rounded-lg w-fit">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>
                  Comprehensive documentation and support
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default ServicesPage;
