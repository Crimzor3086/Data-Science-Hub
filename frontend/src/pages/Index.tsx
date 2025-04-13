import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-50 text-gray-800">
      <Navbar />
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-sky-500/90 opacity-90 z-10"></div>
        <div className="bg-[url('https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80')] bg-cover bg-center h-[600px]"></div>
        
        <div className="container mx-auto px-4 relative z-20 -mt-[500px]">
          <div className="max-w-2xl py-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Data Science Hub</h1>
            <p className="text-xl mb-8 text-white">Your gateway to mastering data science, machine learning, and AI through expert-led courses and professional services.</p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white font-bold">
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Why Choose Data Science Hub?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="text-blue-500 text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold mb-2 text-blue-700">Expert-Led Courses</h3>
                <p className="text-gray-600">Learn from industry professionals with years of experience in data science and AI.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-sky-50 to-blue-50 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="text-sky-500 text-4xl mb-4">💼</div>
                <h3 className="text-xl font-bold mb-2 text-sky-700">Professional Services</h3>
                <p className="text-gray-600">From data analysis to AI implementation, our team delivers tailor-made solutions.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="text-blue-500 text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-2 text-blue-700">Rich Resources</h3>
                <p className="text-gray-600">Access our extensive library of tutorials, blogs, and research papers.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Courses Preview */}
      <div className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600">Featured Courses</h2>
          <Button variant="link" className="text-blue-600 hover:text-blue-700">
            <Link to="/courses">View All Courses</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Introduction to Data Science",
              level: "Beginner",
              price: "$79",
              duration: "6 weeks",
              image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            {
              title: "Machine Learning Fundamentals",
              level: "Intermediate",
              price: "$129",
              duration: "8 weeks",
              image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            {
              title: "Advanced AI Engineering",
              level: "Advanced",
              price: "$199",
              duration: "10 weeks",
              image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
          ].map((course, index) => (
            <Card key={index} className="overflow-hidden bg-white border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded">{course.level}</span>
                  <span className="font-bold text-sky-600">{course.price}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
                <p className="text-gray-600 mb-4">Duration: {course.duration}</p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Preview */}
      <div className="bg-gradient-to-br from-blue-50 to-sky-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-blue-600">Meet Our Team</h2>
            <Button variant="link" className="text-blue-600 hover:text-blue-700">
              <Link to="/team">View All Experts</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                name: "Ogechi Daniel Koel",
                role: "Biostatistician",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2376&auto=format&fit=crop"
              },
              {
                name: "Nobert Wafula",
                role: "Data Analyst",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop"
              },
              {
                name: "Enock Bereka",
                role: "Data Scientist",
                image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2574&auto=format&fit=crop"
              },
              {
                name: "Timothy Achala",
                role: "AI Enthusiast & Computer Scientist",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop"
              }
            ].map((member, index) => (
              <Card key={index} className="bg-white border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                  <p className="text-blue-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Data Science Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Connect with our team to discuss your learning goals or business needs.</p>
          <Button className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-6">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-600">Data Science Hub</h3>
              <p className="text-gray-600">Empowering data professionals through education and expert services.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-800">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/courses" className="hover:text-blue-600">Courses</Link></li>
                <li><Link to="/services" className="hover:text-blue-600">Services</Link></li>
                <li><Link to="/blog" className="hover:text-blue-600">Blog</Link></li>
                <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-800">Contact</h4>
              <address className="text-gray-600 not-italic">
                <p>1234 Data Drive</p>
                <p>Tech City, TS 12345</p>
                <p className="mt-2">info@datasciencehub.com</p>
                <p>(555) 123-4567</p>
              </address>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-800">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>© {new Date().getFullYear()} Data Science Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
