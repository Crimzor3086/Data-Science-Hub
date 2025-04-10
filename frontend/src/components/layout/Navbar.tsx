
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-amber-500">
            Data Science Hub
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-amber-500 transition-colors">
            Home
          </Link>
          <Link to="/team" className="hover:text-amber-500 transition-colors">
            Team
          </Link>
          <Link to="/services" className="hover:text-amber-500 transition-colors">
            Services
          </Link>
          <Link to="/courses" className="hover:text-amber-500 transition-colors">
            Courses
          </Link>
          <Link to="/blog" className="hover:text-amber-500 transition-colors">
            Blog
          </Link>
          <Link to="/about" className="hover:text-amber-500 transition-colors">
            About Us
          </Link>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-amber-500">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/contact">
            <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black">
              Contact
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button variant="ghost" className="hover:text-amber-500">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-3 py-3">
              <Link to="/" className="py-2 hover:text-amber-500 transition-colors" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/team" className="py-2 hover:text-amber-500 transition-colors" onClick={toggleMenu}>
                Team
              </Link>
              <Link to="/services" className="py-2 hover:text-amber-500 transition-colors" onClick={toggleMenu}>
                Services
              </Link>
              <Link to="/courses" className="py-2 hover:text-amber-500 transition-colors" onClick={toggleMenu}>
                Courses
              </Link>
              <Link to="/blog" className="py-2 hover:text-amber-500 transition-colors" onClick={toggleMenu}>
                Blog
              </Link>
              <Link to="/about" className="py-2 hover:text-amber-500 transition-colors" onClick={toggleMenu}>
                About Us
              </Link>
              <Link to="/contact" className="py-2 hover:text-amber-500 transition-colors" onClick={toggleMenu}>
                Contact
              </Link>
              <div className="flex items-center space-x-4 pt-2">
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="ghost" className="hover:text-amber-500">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
