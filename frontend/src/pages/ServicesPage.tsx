import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Background } from '@/components/ui/background';
import { Layout } from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
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
  File,
  MessageSquare,
  Wrench
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Data Collection',
    description: 'Accurate, reliable data is the foundation of informed decision-making. Our data collection services provide businesses with high-quality, actionable data that can drive strategy and improve performance.',
    icon: <Database className="h-6 w-6" />,
    features: [
      'Qualitative and quantitative data collection',
      'Industry-leading methods and tools',
      'Timely and relevant data',
      'Tailored to specific needs'
    ],
    image: '/images/image (1).jpg'
  },
  {
    id: 2,
    title: 'Data Analysis',
    description: 'Transform your data into valuable insights with our expert data analysis services. We use advanced analytical techniques to interpret complex data sets, uncover trends, and provide actionable recommendations.',
    icon: <BarChart3 className="h-6 w-6" />,
    features: [
      'Advanced analytical techniques',
      'Complex data interpretation',
      'Trend identification',
      'Actionable recommendations'
    ],
    image: '/images/image (2).jpg'
  },
  {
    id: 3,
    title: 'Research Writing',
    description: 'We offer in-depth research writing services designed to support your business\'s strategic initiatives. From industry analysis to academic research, our experienced writers deliver meticulously sourced and structured content.',
    icon: <FileText className="h-6 w-6" />,
    features: [
      'Industry analysis',
      'Academic research',
      'Evidence-based content',
      'Strategic insights'
    ],
    image: '/images/image (3).jpg'
  },
  {
    id: 4,
    title: 'Graphic Design',
    description: 'Our graphic design services combine creativity and strategy to produce visually captivating content that aligns with your brand\'s identity. Whether it\'s logos, brochures, or social media graphics, we craft designs that are both aesthetically pleasing and functional.',
    icon: <Palette className="h-6 w-6" />,
    features: [
      'Logo design',
      'Brochure creation',
      'Social media graphics',
      'Brand identity development'
    ],
    image: '/images/image (4).jpg'
  },
  {
    id: 5,
    title: 'Web Design',
    description: 'Stand out in the digital world with our custom web design services. We create responsive, user-friendly websites that not only look great but also offer seamless user experiences.',
    icon: <Globe className="h-6 w-6" />,
    features: [
      'Responsive design',
      'User-friendly interfaces',
      'E-commerce solutions',
      'Corporate websites'
    ],
    image: '/images/image (5).jpg'
  },
  {
    id: 6,
    title: 'Project Management',
    description: 'Effective project management is key to delivering results on time and within budget. Our certified project managers ensure that your projects are executed with precision and efficiency.',
    icon: <ClipboardList className="h-6 w-6" />,
    features: [
      'Timeline development',
      'Resource allocation',
      'Progress tracking',
      'Stakeholder communication'
    ],
    image: '/images/image (6).jpg'
  },
  {
    id: 7,
    title: 'AI Development',
    description: 'Embrace the future with our advanced AI development services. Our team specializes in building intelligent systems that optimize processes, enhance decision-making, and provide valuable insights.',
    icon: <Brain className="h-6 w-6" />,
    features: [
      'Machine learning solutions',
      'Natural language processing',
      'Custom AI development',
      'Process optimization'
    ],
    image: '/images/image (7).jpg'
  },
  {
    id: 8,
    title: 'Training',
    description: 'Empower your team with our comprehensive training programs designed to enhance skills and foster professional growth. From technical training to leadership development, our programs are tailored to address specific needs.',
    icon: <GraduationCap className="h-6 w-6" />,
    features: [
      'Technical training',
      'Leadership development',
      'Custom programs',
      'Skill enhancement'
    ],
    image: '/images/image (8).jpg'
  },
  {
    id: 9,
    title: 'Consultation',
    description: 'Our consultation services provide you with expert advice and strategic insights to help you navigate complex business challenges. We offer personalized guidance across various industries.',
    icon: <MessageSquare className="h-6 w-6" />,
    features: [
      'Business strategy',
      'Technology solutions',
      'Process improvement',
      'Strategic guidance'
    ],
    image: '/images/image (9).jpg'
  },
  {
    id: 10,
    title: 'Report Writing',
    description: 'Our expert team crafts comprehensive and insightful reports tailored to your specific needs. Whether it\'s for internal purposes, clients, or stakeholders, we ensure clear, concise, and well-researched content.',
    icon: <File className="h-6 w-6" />,
    features: [
      'Internal reports',
      'Client reports',
      'Stakeholder communications',
      'Research findings'
    ],
    image: '/images/image (10).jpg'
  }
];

const ServicesPage = () => {
  return (
    <Background 
      image="/images/image (14).jpg"
      overlayOpacity={0.85}
    >
      <Layout>
        <PageHeader 
          title="Our Services" 
          subtitle="Comprehensive data science and analytics solutions for your business needs"
          backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
        />
        
        <div className="container mx-auto py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
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
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
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
          </div>
        </div>
      </Layout>
    </Background>
  );
};

export default ServicesPage;
