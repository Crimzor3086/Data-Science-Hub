import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  category: 'data' | 'design' | 'development' | 'management' | 'training';
  icon: string;
}

const services: Service[] = [
  {
    id: 'data-collection',
    title: 'Data Collection',
    description: "Accurate, reliable data is the foundation of informed decision-making. Our data collection services provide businesses with high-quality, actionable data that can drive strategy and improve performance. We specialize in gathering data from diverse sources, ensuring it's relevant, timely, and tailored to your specific needs. Whether it's qualitative or quantitative data, we employ industry-leading methods and tools to deliver precise insights that support your business objectives.",
    category: 'data',
    icon: '📊'
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    description: "Transform your data into valuable insights with our expert data analysis services. We use advanced analytical techniques to interpret complex data sets, uncover trends, and provide actionable recommendations that drive informed business decisions. Whether you need to improve operational efficiency, understand customer behavior, or forecast future trends, our data analysis services turn raw data into clear, strategic guidance that propels your business forward.",
    category: 'data',
    icon: '📈'
  },
  {
    id: 'research-writing',
    title: 'Research Writing',
    description: "We offer in-depth research writing services designed to support your business's strategic initiatives. From industry analysis to academic research, our experienced writers deliver meticulously sourced and structured content that provides actionable insights. We specialize in creating high-quality, evidence-based documents that inform decisions and foster growth.",
    category: 'management',
    icon: '📝'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: "Our graphic design services combine creativity and strategy to produce visually captivating content that aligns with your brand's identity. Whether it's logos, brochures, or social media graphics, we craft designs that are both aesthetically pleasing and functional. Let us help you communicate your message with visual clarity and impact.",
    category: 'design',
    icon: '🎨'
  },
  {
    id: 'web-design',
    title: 'Web Design',
    description: "Stand out in the digital world with our custom web design services. We create responsive, user-friendly websites that not only look great but also offer seamless user experiences. From e-commerce sites to corporate landing pages, our designs are tailored to meet the unique needs of your business, ensuring that your online presence leaves a lasting impression.",
    category: 'design',
    icon: '🌐'
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: "Effective project management is key to delivering results on time and within budget. Our certified project managers ensure that your projects are executed with precision and efficiency. We handle the planning, coordination, and execution of all project phases, keeping you informed every step of the way. Trust us to keep your projects on track and aligned with your business goals.",
    category: 'management',
    icon: '📋'
  },
  {
    id: 'ai-development',
    title: 'AI Development',
    description: "Embrace the future with our advanced AI development services. Our team specializes in building intelligent systems that optimize processes, enhance decision-making, and provide valuable insights. Whether you're looking for machine learning, natural language processing, or custom AI solutions, we deliver cutting-edge technology to accelerate your business success.",
    category: 'development',
    icon: '🤖'
  },
  {
    id: 'training',
    title: 'Training',
    description: "Empower your team with our comprehensive training programs designed to enhance skills and foster professional growth. From technical training to leadership development, our programs are tailored to address specific needs, ensuring measurable improvements in performance. With our expert trainers, your team will gain the knowledge and confidence to drive success.",
    category: 'training',
    icon: '👥'
  },
  {
    id: 'consultation',
    title: 'Consultation',
    description: "Our consultation services provide you with expert advice and strategic insights to help you navigate complex business challenges. We offer personalized guidance across various industries, helping you identify opportunities, optimize operations, and make informed decisions. Whether you're looking for business strategy, technology solutions, or process improvement, our consultants are here to support your goals.",
    category: 'management',
    icon: '💡'
  },
  {
    id: 'writing-reports',
    title: 'Writing Reports',
    description: "Our expert team crafts comprehensive and insightful reports tailored to your specific needs. Whether it's for internal purposes, clients, or stakeholders, we ensure clear, concise, and well-researched content that drives decisions and actions. With a focus on accuracy and presentation, we provide detailed reports that enhance your business's credibility and performance.",
    category: 'management',
    icon: '📑'
  }
];

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <PageHeader
        title="Our Services"
        subtitle="Explore our comprehensive data science services and solutions"
      />
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </Button>
            <Button
              variant={selectedCategory === 'data' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('data')}
            >
              Data
            </Button>
            <Button
              variant={selectedCategory === 'design' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('design')}
            >
              Design
            </Button>
            <Button
              variant={selectedCategory === 'development' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('development')}
            >
              Development
            </Button>
            <Button
              variant={selectedCategory === 'management' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('management')}
            >
              Management
            </Button>
            <Button
              variant={selectedCategory === 'training' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('training')}
            >
              Training
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{service.icon}</span>
                  <CardTitle>{service.title}</CardTitle>
                </div>
                <CardDescription>
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ServicesPage;
