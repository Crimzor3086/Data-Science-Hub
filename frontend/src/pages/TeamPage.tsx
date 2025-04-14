import { Card, CardContent } from '@/components/ui/card';
import { Background } from '@/components/ui/background';
import { Layout } from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Mail, Linkedin } from 'lucide-react';

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

export const TeamPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Background 
          image="/images/image (4).jpg"
          overlayOpacity={0.85}
        >
          <PageHeader 
            title="Our Team" 
            subtitle="Meet the experts behind our data science solutions"
            backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
          />
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-primary mb-4">Our Team</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Meet the talented individuals who make our data science solutions possible
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.name} className="bg-white/95 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors group">
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
        </Background>
      </div>
    </Layout>
  );
};

export default TeamPage; 