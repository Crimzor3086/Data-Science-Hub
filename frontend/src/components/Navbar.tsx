import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { searchAPI } from "@/lib/api";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
}

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { to: "/courses", label: "Courses" },
    { to: "/team", label: "Team" },
    { to: "/services", label: "Services" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const userLinks = user ? [
    { to: "/profile", label: "Profile" },
    { to: user.role === "admin" ? "/admin" : "/client-dashboard", label: "Dashboard" },
  ] : [
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Sign Up" },
  ];

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await searchAPI.search(debouncedSearchQuery);
        setSearchResults(response.data.results || []);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
                Data Science Hub
              </Link>
            </div>
            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors",
                    isActive(link.to)
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-900 hover:text-gray-500"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Search and User Menu - Desktop */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-50">
                  <form onSubmit={handleSearchSubmit} className="px-4">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      {isSearching && (
                        <Loader2 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 animate-spin" />
                      )}
                    </div>
                  </form>
                  
                  {searchResults.length > 0 && (
                    <div className="mt-2 max-h-96 overflow-y-auto">
                      {searchResults.map((result) => (
                        <Link
                          key={result.id}
                          to={result.url}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          <div className="font-medium">{result.title}</div>
                          <div className="text-xs text-gray-500">{result.description}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {searchQuery && !isSearching && searchResults.length === 0 && (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-900 hover:text-gray-500">
                  <span>{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                  {userLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={cn(
                        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                        isActive(link.to) && "bg-gray-100"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {userLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive(link.to)
                        ? "text-blue-600"
                        : "text-gray-900 hover:text-gray-500"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("sm:hidden", isMobileMenuOpen ? "block" : "hidden")}>
        {/* Mobile Search */}
        <div className="px-4 pt-2 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {isSearching && (
              <Loader2 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 animate-spin" />
            )}
          </form>
          
          {searchResults.length > 0 && (
            <div className="mt-2 max-h-48 overflow-y-auto">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  to={result.url}
                  className="block py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md px-2"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <div className="font-medium">{result.title}</div>
                  <div className="text-xs text-gray-500">{result.description}</div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "block pl-3 pr-4 py-2 text-base font-medium transition-colors",
                isActive(link.to)
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-900 hover:text-gray-500 hover:bg-gray-50"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <>
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {userLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "block px-4 py-2 text-base font-medium transition-colors",
                      isActive(link.to)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-900 hover:text-gray-500 hover:bg-gray-50"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-900 hover:text-gray-500 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="mt-3 space-y-1">
              {userLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "block px-4 py-2 text-base font-medium transition-colors",
                    isActive(link.to)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-900 hover:text-gray-500 hover:bg-gray-50"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 