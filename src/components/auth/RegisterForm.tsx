
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    try {
      console.log('Registration with:', formData);
      // In real implementation, this would be an API call
      setTimeout(() => {
        setLoading(false);
        // Redirect or update state would happen here
      }, 1000);
    } catch (error) {
      console.error('Registration error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-semibold">Create Account</h2>
        <p className="text-muted-foreground mt-2">Join ArtisanLink today</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
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
          <p className="text-xs text-muted-foreground mt-1">
            Password must be at least 8 characters
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>I am registering as</Label>
          <RadioGroup 
            value={formData.role} 
            onValueChange={handleRadioChange}
            className="flex flex-col space-y-2 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="artisan" id="role-artisan" />
              <Label htmlFor="role-artisan" className="cursor-pointer">Artisan (I want to sell products)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="buyer" id="role-buyer" />
              <Label htmlFor="role-buyer" className="cursor-pointer">Buyer (I want to purchase products)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-4 pt-2">
          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-artisan-terracotta hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-artisan-terracotta hover:underline">
              Privacy Policy
            </Link>
          </p>
          
          <Button 
            type="submit" 
            className="w-full bg-artisan-terracotta hover:bg-artisan-terracotta/90" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-artisan-terracotta hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
