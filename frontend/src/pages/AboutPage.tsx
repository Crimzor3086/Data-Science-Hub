import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Background } from '@/components/ui/background';
import { 
  Users, 
  Target, 
  Lightbulb, 
  Award, 
  ArrowRight,
  BookOpen,
  Globe,
  Heart
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
    bio: 'I\'m a passionate data scientist driven by curiosity and a commitment to lifelong learning. I thrive on exploring new tools and techniques to uncover insights and solve real-world problems.',
    image: '/images/team/enock.jpg',
    email: 'enochosenwafulah@gmail.com',
    linkedin: 'https://www.linkedin.com/in/enock-bereka'
  },
  {
    name: 'Timothy Achala',
    role: 'AI Enthusiast & Computer Scientist',
    bio: 'I am an AI Enthusiast and computer scientist with a deep passion for data. My work lies at the intersection of theory and real-world application—leveraging mathematical rigor and computational power to extract meaningful insights from complex datasets.',
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
      image="/images/image (13).jpg"
      overlayOpacity={0.85}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">About Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering the next generation of data scientists and AI innovators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  To make data science education accessible and practical for everyone
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Data Science Hub was founded with a simple mission: to democratize data science education 
                  and make it accessible to anyone with the curiosity and drive to learn. We believe that 
                  data literacy is a fundamental skill in today's digital world, and we're committed to 
                  providing high-quality, practical education that empowers individuals and organizations 
                  to harness the power of data.
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-medium">Growing Student Community</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">Global Reach</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">High Satisfaction Rate</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
                <CardDescription>
                  To be the leading platform for data science education and research
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We envision a world where data science is not just a specialized field, but a fundamental 
                  skill that everyone can access and apply. Our platform combines cutting-edge technology 
                  with expert instruction to create an immersive learning experience that prepares students 
                  for real-world challenges. Through our research initiatives and industry partnerships, 
                  we're constantly pushing the boundaries of what's possible in data science education.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <h3 className="font-medium text-primary mb-1">Research</h3>
                    <p className="text-sm text-muted-foreground">Pushing the boundaries of AI and ML</p>
            </div>
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <h3 className="font-medium text-primary mb-1">Innovation</h3>
                    <p className="text-sm text-muted-foreground">Developing new learning methods</p>
          </div>
        </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="bg-white/95 backdrop-blur-sm border-primary/20">
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
                <Card key={member.name} className="bg-white/95 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.bio}</p>
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
    </Background>
  );
};

export default AboutPage;
