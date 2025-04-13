import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  MessageSquare, 
  FileCheck, 
  Users, 
  Briefcase 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    inquiry: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        inquiry: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <Layout>
      <PageHeader 
        title="Contact Us" 
        subtitle="Reach out for questions, collaborations, or to learn more about our services"
        backgroundImage="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-gray-300 mb-8">
              Whether you're interested in our courses, need consulting services, or want to explore partnership 
              opportunities, our team is here to help. Fill out the form and we'll get back to you as soon as possible.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-amber-500/10 p-2 rounded-lg mr-4">
                      <MapPin className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Location</h3>
                      <p className="text-gray-400">1234 Data Avenue</p>
                      <p className="text-gray-400">Analytics City, AC 98765</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-amber-500/10 p-2 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Email</h3>
                      <p className="text-gray-400">info@datasciencehub.com</p>
                      <p className="text-gray-400">support@datasciencehub.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-amber-500/10 p-2 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Phone</h3>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                      <p className="text-gray-400">Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-amber-500/10 p-2 rounded-lg mr-4">
                      <Clock className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Hours</h3>
                      <p className="text-gray-400">Monday - Friday</p>
                      <p className="text-gray-400">9:00 AM - 5:00 PM EST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Need Immediate Assistance?</h3>
              <p className="text-gray-300 mb-4">
                Our support team is available for urgent inquiries.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </Button>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      className="bg-gray-800 border-gray-700 text-white"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-gray-800 border-gray-700 text-white"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this regarding?"
                      className="bg-gray-800 border-gray-700 text-white"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="inquiry" className="block text-sm font-medium text-gray-300 mb-1">
                      Type of Inquiry
                    </label>
                    <Select
                      value={formData.inquiry}
                      onValueChange={(value) => handleSelectChange("inquiry", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="course">Course Information</SelectItem>
                        <SelectItem value="consulting">Consulting Services</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us more about your inquiry..."
                      className="bg-gray-800 border-gray-700 text-white"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How Can We Help You?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800 hover:border-amber-500 transition-colors">
              <CardContent className="p-6">
                <div className="bg-amber-500/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Course Enrollment</h3>
                <p className="text-gray-400 mb-4">
                  Need help with course selection, enrollment, or have questions about our curriculum?
                </p>
                <a href="#" className="text-amber-500 hover:underline inline-flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800 hover:border-amber-500 transition-colors">
              <CardContent className="p-6">
                <div className="bg-amber-500/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Consulting Services</h3>
                <p className="text-gray-400 mb-4">
                  Explore how our data science expertise can help solve your business challenges.
                </p>
                <a href="#" className="text-amber-500 hover:underline inline-flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800 hover:border-amber-500 transition-colors">
              <CardContent className="p-6">
                <div className="bg-amber-500/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Partnerships</h3>
                <p className="text-gray-400 mb-4">
                  Interested in collaborating with Data Science Hub on research or education initiatives?
                </p>
                <a href="#" className="text-amber-500 hover:underline inline-flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-12">Find Us</h2>
          <div className="rounded-lg overflow-hidden h-96 mb-8">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3060133674!2d-74.25987368715491!3d40.69767006766623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1621543201941!5m2!1sen!2sca" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              loading="lazy"
              title="Data Science Hub Location">
            </iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;

import { ChevronRight } from "lucide-react";
