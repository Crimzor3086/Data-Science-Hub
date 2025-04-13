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
  Settings
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Data Analysis & Visualization',
    description: 'Transform your raw data into actionable insights with our comprehensive data analysis and visualization services.',
    icon: <BarChart2 className="h-6 w-6" />,
    features: [
      'Exploratory Data Analysis',
      'Statistical Analysis',
      'Interactive Dashboards',
      'Custom Visualizations'
    ],
    image: '/images/image (3).jpg'
  },
  {
    id: 2,
    title: 'Machine Learning Solutions',
    description: 'Leverage the power of machine learning to automate processes and predict future trends.',
    icon: <Brain className="h-6 w-6" />,
    features: [
      'Predictive Modeling',
      'Natural Language Processing',
      'Computer Vision',
      'Recommendation Systems'
    ],
    image: '/images/image (4).jpg'
  },
  {
    id: 3,
    title: 'Data Engineering',
    description: 'Build robust and scalable data pipelines to handle your growing data needs.',
    icon: <Database className="h-6 w-6" />,
    features: [
      'ETL Pipeline Development',
      'Data Warehouse Design',
      'Big Data Processing',
      'Data Quality Assurance'
    ],
    image: '/images/image (5).jpg'
  },
  {
    id: 4,
    title: 'Custom Software Development',
    description: 'Develop tailored software solutions to meet your specific business requirements.',
    icon: <Code className="h-6 w-6" />,
    features: [
      'Web Applications',
      'API Development',
      'Cloud Solutions',
      'Integration Services'
    ],
    image: '/images/image (6).jpg'
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
