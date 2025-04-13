import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  Info,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Search,
  User,
  LogOut
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50 menu-button">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="text-gray-600 hover:text-blue-600 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-40 mobile-menu ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className={`fixed right-0 top-0 h-full w-72 bg-white transform transition-transform duration-300 ease-in-out mobile-menu ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-primary">Menu</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="text-gray-600 hover:text-blue-600"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="flex-1 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Main</h3>
                <Link 
                  to="/" 
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition-colors" 
                  onClick={onClose}
                >
                  <Home className="h-5 w-5 mr-3" />
                  Home
                </Link>
                <Link 
                  to="/courses" 
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition-colors" 
                  onClick={onClose}
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  Courses
                </Link>
                <Link 
                  to="/search" 
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition-colors" 
                  onClick={onClose}
                >
                  <Search className="h-5 w-5 mr-3" />
                  Search
                </Link>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">About</h3>
                <Link 
                  to="/about" 
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition-colors" 
                  onClick={onClose}
                >
                  <Info className="h-5 w-5 mr-3" />
                  About Us
                </Link>
                <Link 
                  to="/team" 
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition-colors" 
                  onClick={onClose}
                >
                  <Users className="h-5 w-5 mr-3" />
                  Our Team
                </Link>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Account</h3>
                <Link 
                  to="/login" 
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition-colors" 
                  onClick={onClose}
                >
                  <User className="h-5 w-5 mr-3" />
                  Login
                </Link>
                <Link 
                  to="/contact" 
                  className="flex items-center py-2 text-gray-700 hover:text-blue-600 transition-colors" 
                  onClick={onClose}
                >
                  <Mail className="h-5 w-5 mr-3" />
                  Contact Us
                </Link>
              </div>
            </nav>
            
            <div className="mt-auto pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 