import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Palette, ShoppingBag, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { register, error, loading, clearError, isLoggedIn, isArtisan, isBuyer } = useAuth();
  
  // Get the role from the query parameter or default to 'buyer'
  const queryParams = new URLSearchParams(location.search);
  const defaultRole = queryParams.get('role') === 'artisan' ? 'artisan' : 'buyer';
  
  const [activeTab, setActiveTab] = useState<string>(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    bio: '',
    role: defaultRole,
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      if (isArtisan) {
        navigate('/artisan-dashboard');
      } else if (isBuyer) {
        navigate('/buyer-dashboard');
      }
    }
  }, [isLoggedIn, isArtisan, isBuyer, navigate]);

  useEffect(() => {
    // Update the document title
    document.title = `Sign Up as ${activeTab === 'artisan' ? 'Artisan' : 'Buyer'} | ArtisanLink`;
    
    // Clear any previous errors when switching tabs
    clearError();
    
    // Update the role in the form data
    setFormData(prev => ({ ...prev, role: activeTab }));
  }, [activeTab, clearError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear the specific error when user types
    if (name in formErrors) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      valid = false;
    }
    
    // Validate password
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registrationData } = formData;
      
      await register(registrationData);
      
      toast({
        title: "Registration successful",
        description: `Your ${activeTab} account has been created successfully.`,
      });
      
      // The redirect will happen automatically due to the useEffect above
    } catch (err) {
      // Error is already handled by the auth context
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-display font-bold text-artisan-terracotta">ArtisanLink</h1>
          </Link>
          <p className="text-muted-foreground mt-2">Connect with artisans worldwide</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="buyer" className="flex items-center gap-2">
              <ShoppingBag size={16} />
              <span>Buyer</span>
            </TabsTrigger>
            <TabsTrigger value="artisan" className="flex items-center gap-2">
              <Palette size={16} />
              <span>Artisan</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="buyer">
            <Card>
              <CardHeader>
                <CardTitle>Create Buyer Account</CardTitle>
                <CardDescription>
                  Sign up as a buyer to discover and purchase unique artisan products.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="buyer-name">Full Name</Label>
                    <Input
                      id="buyer-name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="buyer-email">Email</Label>
                    <Input
                      id="buyer-email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="buyer-location">Location (Optional)</Label>
                    <Input
                      id="buyer-location"
                      name="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="buyer-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="buyer-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {formErrors.password && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="buyer-confirm-password">Confirm Password</Label>
                    <Input
                      id="buyer-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-artisan-terracotta hover:bg-artisan-terracotta/90"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Buyer Account'
                    )}
                  </Button>
                  
                  <div className="text-center text-sm">
                    Already have an account?{' '}
                    <Link to="/login?role=buyer" className="text-artisan-terracotta hover:underline">
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="artisan">
            <Card>
              <CardHeader>
                <CardTitle>Create Artisan Account</CardTitle>
                <CardDescription>
                  Sign up as an artisan to showcase and sell your handcrafted products.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="artisan-name">Full Name / Business Name</Label>
                    <Input
                      id="artisan-name"
                      name="name"
                      placeholder="Your Name or Business Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="artisan-email">Email</Label>
                    <Input
                      id="artisan-email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="artisan-location">Location</Label>
                    <Input
                      id="artisan-location"
                      name="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="artisan-bio">Bio / About Your Craft</Label>
                    <Textarea
                      id="artisan-bio"
                      name="bio"
                      placeholder="Tell us about yourself and your craft..."
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="artisan-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="artisan-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {formErrors.password && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="artisan-confirm-password">Confirm Password</Label>
                    <Input
                      id="artisan-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-artisan-terracotta hover:bg-artisan-terracotta/90"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Artisan Account'
                    )}
                  </Button>
                  
                  <div className="text-center text-sm">
                    Already have an account?{' '}
                    <Link to="/login?role=artisan" className="text-artisan-terracotta hover:underline">
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
