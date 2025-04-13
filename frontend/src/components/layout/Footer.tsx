import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-amber-500 mb-4">Data Science Hub</h3>
            <p className="mb-4">
              Empowering professionals with cutting-edge data science knowledge and skills.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/datasciencehub" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/datasciencehub" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/datasciencehub" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/datasciencehub" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/datasciencehub" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-amber-500 transition-colors">Courses</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-500 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-amber-500 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources/tutorials" className="hover:text-amber-500 transition-colors">Free Tutorials</Link>
              </li>
              <li>
                <Link to="/resources/webinars" className="hover:text-amber-500 transition-colors">Webinars</Link>
              </li>
              <li>
                <Link to="/resources/ebooks" className="hover:text-amber-500 transition-colors">E-books</Link>
              </li>
              <li>
                <Link to="/resources/case-studies" className="hover:text-amber-500 transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link to="/resources/faq" className="hover:text-amber-500 transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p>1234 Data Avenue</p>
              <p>Analytics City, AC 98765</p>
              <p className="mt-4 flex items-center">
                <Mail className="h-4 w-4 mr-2" /> contact@datasciencehub.com
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Data Science Hub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/legal/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
            <Link to="/legal/terms" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
            <Link to="/legal/cookies" className="hover:text-amber-500 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
