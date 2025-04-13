import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "Former Data Science Lead at Google, with 15+ years of experience in machine learning and AI.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen"
    }
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Education",
    bio: "PhD in Computer Science, specializing in educational technology and curriculum development.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
    social: {
      github: "https://github.com/michaelrodriguez",
      linkedin: "https://linkedin.com/in/michaelrodriguez"
    }
  },
  {
    name: "Priya Patel",
    role: "Lead Data Scientist",
    bio: "Expert in natural language processing and computer vision, with multiple research publications.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2574&auto=format&fit=crop",
    social: {
      github: "https://github.com/priyapatel",
      linkedin: "https://linkedin.com/in/priyapatel"
    }
  },
  {
    name: "James Wilson",
    role: "Technical Lead",
    bio: "Full-stack developer with expertise in scalable architecture and cloud technologies.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop",
    social: {
      github: "https://github.com/jameswilson",
      linkedin: "https://linkedin.com/in/jameswilson"
    }
  }
];

const TeamsPage = () => {
  return (
    <Layout>
      <PageHeader 
        title="Our Team" 
        subtitle="Meet the passionate individuals behind Data Science Hub"
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Leadership Team</h2>
          <p className="text-muted-foreground">
            Our diverse team brings together expertise from academia, industry, and technology to create 
            an exceptional learning experience for our students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-card border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-32 h-32 flex-shrink-0">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                    <p className="text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex gap-3">
                      {member.social.github && (
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" 
                           className="text-muted-foreground hover:text-primary">
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                           className="text-muted-foreground hover:text-primary">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"
                           className="text-muted-foreground hover:text-primary">
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Join Our Team</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            We're always looking for talented individuals who are passionate about data science and education. 
            If you're interested in joining our team, check out our current openings.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/careers">View Open Positions</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default TeamsPage; 