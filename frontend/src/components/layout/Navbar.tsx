import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { UserRole } from "@/lib/roles";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const getRoleSpecificLinks = () => {
    if (!user) return [];

    switch (user.role) {
      case UserRole.ADMIN:
        return [
          { to: "/admin", label: "Admin Dashboard" },
          { to: "/users", label: "Manage Users" },
          { to: "/analytics", label: "Analytics" }
        ];
      case UserRole.CLIENT:
        return [
          { to: "/client-dashboard", label: "Client Dashboard" },
          { to: "/projects", label: "Projects" },
          { to: "/reports", label: "Reports" }
        ];
      case UserRole.STUDENT:
        return [
          { to: "/courses", label: "My Courses" },
          { to: "/assignments", label: "Assignments" },
          { to: "/progress", label: "Progress" }
        ];
      default:
        return [];
    }
  };

  return (
    <header className="bg-white text-gray-800 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Data Science Hub
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          {isAuthenticated && getRoleSpecificLinks().map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/about" className="hover:text-blue-600 transition-colors">
            About Us
          </Link>
          <Link to="/team" className="hover:text-blue-600 transition-colors">
            Our Team
          </Link>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
            <Search className="h-5 w-5" />
          </Button>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  <User className="h-4 w-4 mr-2" />
                  {user?.name || "Profile"}
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-gray-600 hover:text-blue-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-600 hover:text-blue-600">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-3 py-3">
              <Link to="/" className="py-2 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                Home
              </Link>
              {isAuthenticated && getRoleSpecificLinks().map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="py-2 hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/about" className="py-2 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                About Us
              </Link>
              <Link to="/team" className="py-2 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                Our Team
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="py-2 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-2 text-left hover:text-blue-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="py-2 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
