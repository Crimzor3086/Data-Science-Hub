import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white text-gray-800 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-purple-600">
            Data Science Hub
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-purple-600 transition-colors">
            Home
          </Link>
          <Link to="/team" className="hover:text-purple-600 transition-colors">
            Team
          </Link>
          <Link to="/services" className="hover:text-purple-600 transition-colors">
            Services
          </Link>
          <Link to="/courses" className="hover:text-purple-600 transition-colors">
            Courses
          </Link>
          <Link to="/blog" className="hover:text-purple-600 transition-colors">
            Blog
          </Link>
          <Link to="/about" className="hover:text-purple-600 transition-colors">
            About Us
          </Link>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/contact">
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
              Contact
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <Link to="/profile">
                <Button variant="ghost" className="hover:text-purple-600 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {user?.name || "Profile"}
                </Button>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-600 hover:text-purple-600">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-3 py-3">
              <Link to="/" className="py-2 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/team" className="py-2 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
                Team
              </Link>
              <Link to="/services" className="py-2 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
                Services
              </Link>
              <Link to="/courses" className="py-2 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
                Courses
              </Link>
              <Link to="/blog" className="py-2 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
                Blog
              </Link>
              <Link to="/about" className="py-2 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
                About Us
              </Link>
              <Link to="/contact" className="py-2 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
                Contact
              </Link>
              <div className="flex items-center space-x-4 pt-2">
                {isAuthenticated && (
                  <Link to="/profile" onClick={toggleMenu} className="w-full">
                    <Button variant="ghost" className="hover:text-purple-600 w-full flex items-center justify-center">
                      <User className="h-4 w-4 mr-2" />
                      {user?.name || "Profile"}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
