import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Button className="bg-sky-500 hover:bg-sky-600 text-white">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
