import { Button } from '@/components/ui/button';
import { Background } from '@/components/ui/background';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <Background 
      image="/images/image (15).jpg"
      overlayOpacity={0.85}
    >
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-4xl font-bold text-primary mb-4">Page Not Found</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.history.back()}
                className="border-primary/20 hover:border-primary/40"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default NotFound;
