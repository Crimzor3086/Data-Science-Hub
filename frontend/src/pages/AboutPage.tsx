import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Background } from '@/components/ui/background';
import { Layout } from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Users, 
  Target, 
  Lightbulb, 
  Award, 
  ArrowRight,
  BookOpen,
  Globe,
  Heart,
  Mail,
  Linkedin
} from 'lucide-react';

const teamMembers = [
  {
    name: 'Ogechi Daniel Koel',
    role: 'Biostatistician',
    bio: 'I am an apt Biostatistician determined in applying various statistical methods to inform decisions in medicine, public health and science.',
    image: '/images/team/ogechi.jpg',
    email: 'ogechikoel@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ogechi-koel-4b90b92ab'
  },
  {
    name: 'Nobert Wafula',
    role: 'Data Analyst',
    bio: 'I\'m a data analyst passionate about turning data into actionable insights and building predictive models that drive smart, impactful decisions.',
    image: '/images/team/nobert.jpg',
    email: 'wakasalanobert5746@gmail.com',
    linkedin: 'https://www.linkedin.com/in/nobert-wafula-b7b1782a2'
  },
  {
    name: 'Enock Bereka',
    role: 'Data Scientist',
    bio: 'I\'m a passionate data scientist driven by curiosity and a commitment to lifelong learning. I thrive on exploring new tools and techniques to uncover insights and solve real-world problems. My goal is to turn data into impactful solutions that drive informed decision-making and meaningful change.',
    image: '/images/team/enock.jpg',
    email: 'enochosenwafulah@gmail.com',
    linkedin: 'https://www.linkedin.com/in/enock-bereka'
  },
  {
    name: 'Timothy Achala',
    role: 'AI Enthusiast & Computer Scientist',
    bio: 'I am an AI Enthusiast and computer scientist with a deep passion for data. My work lies at the intersection of theory and real-world application—leveraging mathematical rigor and computational power to extract meaningful insights from complex datasets. With a strong foundation in algorithms, statistics, and machine learning, I specialize in transforming raw data into actionable intelligence.',
    image: '/images/team/timothy.jpg',
    email: 'timothyachala695@gmail.com',
    linkedin: 'https://www.linkedin.com/in/timothy-a-1bb74127b'
  }
];

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from education to research.'
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Innovation',
    description: 'We embrace new ideas and technologies to push the boundaries of what\'s possible.'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Collaboration',
    description: 'We believe in the power of working together to achieve greater results.'
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Integrity',
    description: 'We maintain the highest standards of integrity in our work and relationships.'
  }
];

const AboutPage = () => {
  return (
    <Background 
      image="/images/image (2).jpg"
      overlayOpacity={0.85}
    >
      <Layout>
        <PageHeader 
          title="About Us" 
          subtitle="Empowering businesses, organizations and individuals with tools and knowledge for the data-driven world"
          backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
        />
        
        <div className="container mx-auto py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                  <CardDescription>
                    Empowering through innovation and expertise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Our mission is to empower businesses, organizations, and individuals by providing innovative tools,
                    expert knowledge, and tailored solutions that foster growth, enhance decision-making, and drive
                    success in a data-driven world. Through high-quality services, cutting-edge AI development, and
                    comprehensive training programs, we enable our clients to optimize performance and stay ahead of
                    industry trends.
                  </p>
                  <div className="flex items-center gap-2 text-primary">
                    <BookOpen className="h-5 w-5" />
                    <span className="font-medium">Comprehensive Training</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Globe className="h-5 w-5" />
                    <span className="font-medium">Global Expertise</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Heart className="h-5 w-5" />
                    <span className="font-medium">Client Success</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle>Our Vision</CardTitle>
                  <CardDescription>
                    Leading the way in data-driven transformation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Our vision is to be a trusted partner in transforming the way businesses and individuals leverage data,
                    technology, and knowledge. We strive to lead the way in innovation, providing strategic insights and
                    expertise that fuel progress, drive operational excellence, and unlock new opportunities for success in
                    an ever-evolving digital landscape.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-medium text-primary mb-1">Innovation</h3>
                      <p className="text-sm text-muted-foreground">Leading digital transformation</p>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-medium text-primary mb-1">Excellence</h3>
                      <p className="text-sm text-muted-foreground">Delivering superior results</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary text-center mb-8">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                    <CardHeader>
                      <div className="bg-primary/10 text-primary p-2 rounded-lg w-fit">
                        {value.icon}
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
              
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary text-center mb-8">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.name} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors group">
                    <CardHeader className="p-0">
                      <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white">{member.name}</h3>
                          <p className="text-white/90">{member.role}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground mb-4">{member.bio}</p>
                      <div className="flex gap-4">
                        <a 
                          href={`mailto:${member.email}`} 
                          className="text-primary hover:text-primary/80 transition-colors"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:text-primary/80 transition-colors"
                          aria-label={`${member.name}'s LinkedIn profile`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          
            <div className="text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Join Our Team <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  );
};

export default AboutPage;
