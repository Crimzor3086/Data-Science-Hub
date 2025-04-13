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
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Ogechi Daniel Koel",
    role: "Biostatistician",
    bio: "Expert in biostatistics with extensive experience in healthcare data analysis and research methodology.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2376&auto=format&fit=crop"
  },
  {
    name: "Nobert Wafula",
    role: "Data Analyst",
    bio: "Specialized in data analysis and visualization, with a focus on transforming complex data into actionable insights.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop"
  },
  {
    name: "Enock Bereka",
    role: "Data Scientist",
    bio: "Experienced in machine learning and predictive modeling, with a track record of developing innovative data science solutions.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2574&auto=format&fit=crop"
  },
  {
    name: "Timothy Achala",
    role: "AI Enthusiast & Computer Scientist",
    bio: "Passionate about artificial intelligence and computer science, with expertise in deep learning and neural networks.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop"
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
          <h2 className="text-3xl font-bold text-primary mb-6">Our Expert Team</h2>
          <p className="text-muted-foreground">
            Our diverse team brings together expertise from various fields of data science, 
            creating an exceptional learning experience for our students.
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
                    {member.social && (
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
                    )}
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