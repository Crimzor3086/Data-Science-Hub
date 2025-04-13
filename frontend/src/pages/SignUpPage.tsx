import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Background } from '@/components/ui/background';
import { Mail, Lock, User, Eye, EyeOff, Building } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { toast } from '@/hooks/use-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    role: 'client' // Default role
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: ''
    };
    
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role as 'client' | 'student',
        company: formData.company
      });
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Background 
      image="/images/image (6).jpg"
      overlayOpacity={0.85}
    >
      <div className="container relative h-screen flex items-center justify-center py-8">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-primary/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Enter your information to get started
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className={`pl-10 bg-white/50 ${errors.name ? 'border-red-500' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`pl-10 bg-white/50 ${errors.email ? 'border-red-500' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="company"
                    placeholder="Company/Organization"
                    className="pl-10 bg-white/50"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={`pl-10 bg-white/50 ${errors.password ? 'border-red-500' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                By signing up, you agree to our{' '}
                <Link to="/legal/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/legal/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
              <div className="text-sm text-center text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Background>
  );
};

export default SignUpPage; 