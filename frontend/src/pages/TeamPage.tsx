
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Linkedin, Twitter, Mail, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const experts = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Lead Data Scientist",
    bio: "Dr. Johnson specializes in machine learning algorithms with 15+ years of experience in both academia and industry applications.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2376&auto=format&fit=crop",
    expertise: ["Machine Learning", "AI Ethics", "Statistical Analysis"],
    education: "Ph.D. in Computer Science, Stanford University",
    linkedin: "#",
    twitter: "#",
    email: "sarah@datasciencehub.com",
    publications: 23
  },
  {
    id: 2,
    name: "James Rodriguez",
    role: "AI Research Director",
    bio: "James leads our research initiatives in deep learning and reinforcement learning, with a focus on practical business applications.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
    expertise: ["Deep Learning", "NLP", "Computer Vision"],
    education: "Ph.D. in Artificial Intelligence, MIT",
    linkedin: "#",
    twitter: "#",
    email: "james@datasciencehub.com",
    publications: 31
  },
  {
    id: 3,
    name: "Dr. Aisha Patel",
    role: "Director of Data Engineering",
    bio: "Aisha specializes in big data architecture and cloud-based analytics platforms, helping organizations scale their data capabilities.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2574&auto=format&fit=crop",
    expertise: ["Big Data", "Cloud Computing", "ETL Pipelines"],
    education: "Ph.D. in Computer Engineering, Berkeley",
    linkedin: "#",
    twitter: "#",
    email: "aisha@datasciencehub.com",
    publications: 18
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Chief Analytics Officer",
    bio: "Michael brings over 20 years of experience in translating business problems into data-driven solutions across multiple industries.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop",
    expertise: ["Business Analytics", "Predictive Modeling", "Risk Assessment"],
    education: "MBA & MS in Data Science, Harvard University",
    linkedin: "#",
    twitter: "#",
    email: "michael@datasciencehub.com",
    publications: 15
  },
  {
    id: 5,
    name: "Dr. Elena Gonzalez",
    role: "Senior ML Engineer",
    bio: "Elena specializes in developing and deploying scalable machine learning models to solve complex business challenges.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2522&auto=format&fit=crop",
    expertise: ["MLOps", "AutoML", "Time Series Analysis"],
    education: "Ph.D. in Statistics, University of Cambridge",
    linkedin: "#",
    twitter: "#",
    email: "elena@datasciencehub.com",
    publications: 27
  },
  {
    id: 6,
    name: "Robert Kim",
    role: "Data Visualization Expert",
    bio: "Robert specializes in transforming complex data into compelling visual narratives that drive decision-making and insights.",
    image: "https://images.unsplash.com/photo-1542178243-bc20204b769f?q=80&w=2580&auto=format&fit=crop",
    expertise: ["Data Visualization", "UX/UI Design", "Storytelling"],
    education: "MS in Information Design, Rhode Island School of Design",
    linkedin: "#",
    twitter: "#",
    email: "robert@datasciencehub.com",
    publications: 9
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
                  <a href={expert.twitter} className="text-gray-400 hover:text-amber-500 transition-colors">
                    <Twitter className="h-5 w-5" />
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
