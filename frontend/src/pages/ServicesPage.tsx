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
  FileBarChart,
  Calculator,
  File
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Data Collection',
    description: 'Comprehensive data collection services for research and analysis.',
    icon: <Database className="h-6 w-6" />,
    features: [
      'Survey design and implementation',
      'Data cleaning and preprocessing',
      'Quality assurance protocols',
      'Ethical considerations compliance'
    ],
    image: '/images/image (1).jpg'
  },
  {
    id: 2,
    title: 'Data Analysis',
    description: 'Advanced statistical analysis and interpretation of research data.',
    icon: <BarChart3 className="h-6 w-6" />,
    features: [
      'Descriptive and inferential statistics',
      'Multivariate analysis',
      'Time series analysis',
      'Predictive modeling'
    ],
    image: '/images/image (2).jpg'
  },
  {
    id: 3,
    title: 'Machine Learning',
    description: 'Implementation of machine learning algorithms for data insights.',
    icon: <Brain className="h-6 w-6" />,
    features: [
      'Supervised and unsupervised learning',
      'Deep learning models',
      'Natural language processing',
      'Computer vision applications'
    ],
    image: '/images/image (3).jpg'
  },
  {
    id: 4,
    title: 'Data Visualization',
    description: 'Creation of compelling visual representations of complex data.',
    icon: <PieChart className="h-6 w-6" />,
    features: [
      'Interactive dashboards',
      'Custom chart development',
      'Infographic design',
      'Data storytelling'
    ],
    image: '/images/image (4).jpg'
  },
  {
    id: 5,
    title: 'Statistical Consulting',
    description: 'Expert guidance on statistical methods and research design.',
    icon: <Calculator className="h-6 w-6" />,
    features: [
      'Research methodology design',
      'Statistical power analysis',
      'Hypothesis testing',
      'Results interpretation'
    ],
    image: '/images/image (5).jpg'
  },
  {
    id: 6,
    title: 'Research Writing',
    description: 'Professional assistance with research papers and publications.',
    icon: <FileText className="h-6 w-6" />,
    features: [
      'Academic writing',
      'Literature reviews',
      'Manuscript preparation',
      'Publication support'
    ],
    image: '/images/image (6).jpg'
  },
  {
    id: 7,
    title: 'Graphic Design',
    description: 'Visual design services for research presentations and publications.',
    icon: <Palette className="h-6 w-6" />,
    features: [
      'Presentation design',
      'Publication graphics',
      'Brand identity',
      'Visual communication'
    ],
    image: '/images/image (7).jpg'
  },
  {
    id: 8,
    title: 'Web Design',
    description: 'Development of research websites and online platforms.',
    icon: <Globe className="h-6 w-6" />,
    features: [
      'Research portfolio sites',
      'Data visualization platforms',
      'Interactive dashboards',
      'Content management systems'
    ],
    image: '/images/image (8).jpg'
  },
  {
    id: 9,
    title: 'Project Management',
    description: 'Comprehensive project management for research initiatives.',
    icon: <ClipboardList className="h-6 w-6" />,
    features: [
      'Timeline development',
      'Resource allocation',
      'Progress tracking',
      'Stakeholder communication'
    ],
    image: '/images/image (9).jpg'
  },
  {
    id: 10,
    title: 'Training',
    description: 'Workshops and training sessions on data science and research methods.',
    icon: <GraduationCap className="h-6 w-6" />,
    features: [
      'Statistical software training',
      'Research methodology workshops',
      'Data analysis bootcamps',
      'Custom training programs'
    ],
    image: '/images/image (10).jpg'
  },
  {
    id: 11,
    title: 'Consultation',
    description: 'One-on-one consulting for research projects and data analysis.',
    icon: <Users className="h-6 w-6" />,
    features: [
      'Research planning',
      'Methodology review',
      'Data analysis guidance',
      'Results interpretation'
    ],
    image: '/images/image (11).jpg'
  },
  {
    id: 12,
    title: 'Report Writing',
    description: 'Professional report writing for research findings and recommendations.',
    icon: <File className="h-6 w-6" />,
    features: [
      'Executive summaries',
      'Technical reports',
      'Research briefs',
      'Policy recommendations'
    ],
    image: '/images/image (12).jpg'
  }
];

const ServicesPage = () => {
  return (
    <Background 
      image="/images/image (7).jpg"
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
