
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { CheckCircle2, Award, BarChart, Users, GraduationCap, Globe } from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      <PageHeader 
        title="About Data Science Hub" 
        subtitle="Leading the way in data science education and innovation since 2015"
        backgroundImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              At Data Science Hub, we're dedicated to democratizing data science education and empowering 
              individuals and organizations with the knowledge and skills needed to thrive in today's 
              data-driven world. We believe that quality data science education should be accessible to all, 
              regardless of background or previous experience.
            </p>
            <p className="text-gray-300">
              Our comprehensive approach combines rigorous academic foundations with practical, industry-relevant 
              skills, delivered through cutting-edge learning formats. We bridge the gap between theory and 
              practice, ensuring our students can immediately apply their knowledge to real-world challenges.
            </p>
          </div>
          <div className="lg:pl-8">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" 
              alt="Data Science Hub team meeting" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="bg-amber-500/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Excellence</h3>
              <p className="text-gray-400">
                We maintain the highest standards in our educational content, consulting services, and research.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="bg-amber-500/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Inclusion</h3>
              <p className="text-gray-400">
                We believe in making data science accessible to individuals from all backgrounds and skill levels.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="bg-amber-500/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
              <p className="text-gray-400">
                We continuously evolve our teaching methodologies and content to reflect advances in the field.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1655721530791-59f5d84e6e90?q=80&w=2574&auto=format&fit=crop" 
              alt="Data visualization on screen" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-300 mb-6">
              Founded in 2015 by a team of data scientists and educators from leading tech companies and 
              research institutions, Data Science Hub began with a clear vision: to create a center of 
              excellence for data science education that would prepare professionals for the challenges 
              of tomorrow's data landscape.
            </p>
            <p className="text-gray-300">
              What started as a small team offering workshops to local companies has grown into a 
              global education platform with a community of over 100,000 learners across 130 countries. 
              Throughout our growth, we've maintained our commitment to quality, accessibility, and 
              innovation, consistently evolving our curriculum to reflect the latest developments in 
              the rapidly changing field of data science.
            </p>
          </div>
        </div>
        
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              We measure our success by the achievements of our students and clients. Here's the impact 
              we've made over the years:
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <p className="text-4xl font-bold text-amber-500 mb-2">100K+</p>
              <p className="text-gray-300">Students Trained</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <p className="text-4xl font-bold text-amber-500 mb-2">130+</p>
              <p className="text-gray-300">Countries Reached</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <p className="text-4xl font-bold text-amber-500 mb-2">500+</p>
              <p className="text-gray-300">Enterprise Clients</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <p className="text-4xl font-bold text-amber-500 mb-2">92%</p>
              <p className="text-gray-300">Career Advancement</p>
            </div>
          </div>
        </div>
        
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Recognition & Partnerships</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Our commitment to excellence has been recognized by industry leaders and educational institutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex items-start">
                <div className="bg-amber-500/10 p-2 rounded-lg mr-4">
                  <Award className="h-8 w-8 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Awards & Recognition</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Best Data Science Education Platform - Tech Education Awards 2023</li>
                    <li>• Innovation in EdTech - Global Learning Summit 2022</li>
                    <li>• Top 10 Online Learning Platforms - Industry Today Magazine</li>
                    <li>• Excellence in Corporate Training - Enterprise Learning Conference</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex items-start">
                <div className="bg-amber-500/10 p-2 rounded-lg mr-4">
                  <Globe className="h-8 w-8 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Strategic Partnerships</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Cloud computing partnerships with leading providers</li>
                    <li>• Academic collaborations with top universities</li>
                    <li>• Industry affiliations with major tech companies</li>
                    <li>• Research initiatives with governmental organizations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Journey</h2>
          <p className="text-gray-300 mb-8">
            Whether you're looking to advance your career, transform your organization with data-driven 
            decision making, or simply explore the fascinating world of data science, we invite you to 
            join our community of learners and innovators.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/courses" className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded">
              Explore Courses
            </a>
            <a href="/contact" className="inline-flex items-center px-6 py-3 bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-medium rounded">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
