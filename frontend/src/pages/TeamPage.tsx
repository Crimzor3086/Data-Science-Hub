import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Linkedin, Mail, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const experts = [
  {
    id: 1,
    name: "Ogechi Daniel Koel",
    role: "Biostatistician",
    bio: "I am an apt Biostatistician determined in applying various statistical methods to inform decisions in medicine, public health and science.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2376&auto=format&fit=crop",
    expertise: ["Biostatistics", "Statistical Methods", "Public Health"],
    education: "Biostatistics",
    linkedin: "https://www.linkedin.com/in/ogechi-koel-4b90b92ab",
    email: "ogechikoel@gmail.com",
    publications: 0
  },
  {
    id: 2,
    name: "Nobert Wafula",
    role: "Data Analyst",
    bio: "I'm a data analyst passionate about turning data into actionable insights and building predictive models that drive smart, impactful decisions.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
    expertise: ["Data Analysis", "Predictive Modeling", "Business Intelligence"],
    education: "Data Analysis",
    linkedin: "https://www.linkedin.com/in/nobert-wafula-b7b1782a2",
    email: "wakasalanobert5746@gmail.com",
    publications: 0
  },
  {
    id: 3,
    name: "Enock Bereka",
    role: "Data Scientist",
    bio: "I'm a passionate data scientist driven by curiosity and a commitment to lifelong learning. I thrive on exploring new tools and techniques to uncover insights and solve real-world problems. My goal is to turn data into impactful solutions that drive informed decision-making and meaningful change.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2574&auto=format&fit=crop",
    expertise: ["Data Science", "Machine Learning", "Problem Solving"],
    education: "Data Science",
    linkedin: "https://www.linkedin.com/in/enock-bereka",
    email: "enochosenwafulah@gmail.com",
    publications: 0
  },
  {
    id: 4,
    name: "Timothy Achala",
    role: "AI Enthusiast & Computer Scientist",
    bio: "I am an AI Enthusiast and computer scientist with a deep passion for data. My work lies at the intersection of theory and real-world application—leveraging mathematical rigor and computational power to extract meaningful insights from complex datasets. With a strong foundation in algorithms, statistics, and machine learning, I specialize in transforming raw data into actionable intelligence. I thrive on solving challenging problems, building intelligent systems, and continuously exploring new frontiers in data science and AI.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop",
    expertise: ["AI", "Machine Learning", "Computer Science", "Data Science"],
    education: "Computer Science",
    linkedin: "https://www.linkedin.com/in/timothy-a-1bb74127b",
    email: "timothyachala695@gmail.com",
    publications: 0
  }
];

const TeamPage = () => {
  return (
    <Layout>
      <PageHeader 
        title="Our Expert Team" 
        subtitle="Meet the data scientists, researchers, and educators behind Data Science Hub"
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Industry Leaders & Academic Experts</h2>
          <p className="text-gray-300">
            Our team combines decades of experience in data science research, education, and industry applications.
            Each member brings specialized knowledge to help you master the skills that matter most in today's data-driven world.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {experts.map((expert) => (
            <Card key={expert.id} className="bg-gray-900 border-gray-800 overflow-hidden h-full flex flex-col">
              <div className="h-64 overflow-hidden">
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <CardHeader className="pb-4">
                <h3 className="text-xl font-bold text-white">{expert.name}</h3>
                <p className="text-amber-500">{expert.role}</p>
              </CardHeader>
              <CardContent className="pb-4 flex-grow">
                <p className="text-gray-400 mb-4">{expert.bio}</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Areas of expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {expert.expertise.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  <span className="text-gray-500">Education:</span> {expert.education}
                </p>
                <div className="flex items-center mt-2 text-sm text-gray-400">
                  <BookOpen className="h-4 w-4 mr-1 text-amber-500" />
                  <span>{expert.publications} Publications</span>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4">
                <div className="flex space-x-4">
                  <a href={expert.linkedin} className="text-gray-400 hover:text-amber-500 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={`mailto:${expert.email}`} className="text-gray-400 hover:text-amber-500 transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto p-8 bg-gray-800 rounded-lg border border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Join Our Team</h3>
            <p className="text-gray-300">
              We're always looking for talented individuals passionate about data science and education
            </p>
          </div>
          <div className="flex justify-center">
            <a href="#" className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded">
              View Open Positions
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamPage;
