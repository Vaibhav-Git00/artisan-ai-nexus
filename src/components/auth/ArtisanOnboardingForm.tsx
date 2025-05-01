import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  X, 
  Check, 
  ChevronRight, 
  Loader2, 
  MapPin, 
  Phone, 
  User, 
  Palette, 
  Globe 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define the form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  craftType: z.string().min(1, { message: 'Please select a craft type' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number' }),
  location: z.string().min(2, { message: 'Location must be at least 2 characters' }),
  language: z.string().min(1, { message: 'Please select a language' }),
  profilePhoto: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Craft type options
const craftTypes = [
  { value: 'painting', label: 'Painting' },
  { value: 'pottery', label: 'Pottery' },
  { value: 'textiles', label: 'Textiles' },
  { value: 'woodwork', label: 'Woodwork' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'basketry', label: 'Basketry' },
  { value: 'metalwork', label: 'Metalwork' },
  { value: 'leatherwork', label: 'Leatherwork' },
  { value: 'glasswork', label: 'Glasswork' },
  { value: 'other', label: 'Other' },
];

// Language options
const languages = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'हिंदी (Hindi)' },
  { value: 'tamil', label: 'தமிழ் (Tamil)' },
  { value: 'bengali', label: 'বাংলা (Bengali)' },
  { value: 'marathi', label: 'मराठी (Marathi)' },
  { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
  { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
  { value: 'telugu', label: 'తెలుగు (Telugu)' },
  { value: 'malayalam', label: 'മലയാളം (Malayalam)' },
];

// Form steps
enum FormStep {
  BasicInfo = 0,
  ProfilePhoto = 1,
  PhoneVerification = 2,
  VerificationCode = 3,
  Complete = 4,
}

const ArtisanOnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.BasicInfo);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      craftType: '',
      phoneNumber: '',
      location: '',
      language: 'english',
    },
  });
  
  // Handle file selection for profile photo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhotoUrl(e.target?.result as string);
        form.setValue('profilePhoto', file);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  // Remove profile photo
  const handleRemovePhoto = () => {
    setProfilePhotoUrl(null);
    form.setValue('profilePhoto', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle form submission for basic info
  const onSubmitBasicInfo = (data: FormValues) => {
    setFormData(data);
    setCurrentStep(FormStep.ProfilePhoto);
  };
  
  // Handle phone verification
  const handlePhoneVerification = () => {
    setIsVerifying(true);
    
    // Mock API call to send verification code
    setTimeout(() => {
      setIsVerifying(false);
      setCurrentStep(FormStep.VerificationCode);
      toast.success('Verification code sent to your phone');
    }, 1500);
  };
  
  // Handle verification code submission
  const handleVerifyCode = () => {
    setIsSubmitting(true);
    
    // Mock API call to verify code
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Check if code is correct (mock: any 6-digit code is valid)
      if (verificationCode.length === 6) {
        setCurrentStep(FormStep.Complete);
        toast.success('Phone number verified successfully');
      } else {
        toast.error('Invalid verification code. Please try again.');
      }
    }, 1500);
  };
  
  // Handle final submission
  const handleCompleteOnboarding = () => {
    setIsSubmitting(true);
    
    // Mock API call to complete onboarding
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Onboarding completed successfully!');
      navigate('/dashboard'); // Redirect to dashboard or appropriate page
    }, 1500);
  };
  
  // Render different form steps
  const renderFormStep = () => {
    switch (currentStep) {
      case FormStep.BasicInfo:
        return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitBasicInfo)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <User size={16} className="mr-2" />
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="craftType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Palette size={16} className="mr-2" />
                      Craft Type
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your craft type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {craftTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the primary craft you create
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your city, state, or village" {...field} />
                    </FormControl>
                    <FormDescription>
                      Where you create your craft
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Globe size={16} className="mr-2" />
                      Preferred Language
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language.value} value={language.value}>
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      We'll use this language for communications
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-artisan-terracotta hover:bg-artisan-terracotta/90">
                Continue
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </form>
          </Form>
        );
        
      case FormStep.ProfilePhoto:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium">Add a Profile Photo</h3>
              <p className="text-sm text-muted-foreground mt-1">
                This helps buyers connect with you and your craft
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {profilePhotoUrl ? (
                <div className="relative">
                  <img
                    src={profilePhotoUrl}
                    alt="Profile preview"
                    className="w-32 h-32 rounded-full object-cover border-2 border-artisan-terracotta"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    aria-label="Remove photo"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={handleUploadClick}
                  className="w-32 h-32 rounded-full bg-muted flex items-center justify-center cursor-pointer border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors"
                >
                  <Camera size={32} className="text-muted-foreground" />
                </div>
              )}
              
              <Button
                type="button"
                variant="outline"
                onClick={handleUploadClick}
                className="mt-4"
              >
                <Upload size={16} className="mr-2" />
                {profilePhotoUrl ? 'Change Photo' : 'Upload Photo'}
              </Button>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(FormStep.BasicInfo)}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setCurrentStep(FormStep.PhoneVerification)}
                className="bg-artisan-terracotta hover:bg-artisan-terracotta/90"
              >
                Continue
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        );
        
      case FormStep.PhoneVerification:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium">Verify Your Phone Number</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We'll send a verification code to your phone
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData?.phoneNumber || ''}
                  onChange={(e) => {
                    if (formData) {
                      setFormData({
                        ...formData,
                        phoneNumber: e.target.value,
                      });
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Include country code (e.g., +91 for India)
                </p>
              </div>
              
              <Button
                type="button"
                onClick={handlePhoneVerification}
                disabled={isVerifying || !formData?.phoneNumber}
                className="w-full bg-artisan-terracotta hover:bg-artisan-terracotta/90"
              >
                {isVerifying ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  <>
                    Send Verification Code
                    <ChevronRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
            
            <div className="flex justify-start pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(FormStep.ProfilePhoto)}
              >
                Back
              </Button>
            </div>
          </div>
        );
        
      case FormStep.VerificationCode:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium">Enter Verification Code</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We've sent a 6-digit code to {formData?.phoneNumber}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>
              
              <Button
                type="button"
                onClick={handleVerifyCode}
                disabled={isSubmitting || verificationCode.length !== 6}
                className="w-full bg-artisan-terracotta hover:bg-artisan-terracotta/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </Button>
              
              <p className="text-center text-sm">
                Didn't receive the code?{' '}
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-artisan-terracotta"
                  onClick={handlePhoneVerification}
                  disabled={isVerifying}
                >
                  Resend
                </Button>
              </p>
            </div>
            
            <div className="flex justify-start pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(FormStep.PhoneVerification)}
              >
                Back
              </Button>
            </div>
          </div>
        );
        
      case FormStep.Complete:
        return (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check size={32} className="text-green-600" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Verification Complete!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your phone number has been verified successfully
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Your Information</h4>
              <ul className="space-y-2 text-sm text-left">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{formData?.name}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Craft Type:</span>
                  <span>{craftTypes.find(t => t.value === formData?.craftType)?.label}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{formData?.location}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{formData?.phoneNumber}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span>{languages.find(l => l.value === formData?.language)?.label}</span>
                </li>
              </ul>
            </div>
            
            <Button
              type="button"
              onClick={handleCompleteOnboarding}
              disabled={isSubmitting}
              className="w-full bg-artisan-terracotta hover:bg-artisan-terracotta/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Completing...
                </>
              ) : (
                'Complete Onboarding'
              )}
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Artisan Onboarding</CardTitle>
        <CardDescription>
          Complete your profile to start selling your crafts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index < currentStep
                    ? 'bg-artisan-terracotta text-white'
                    : index === currentStep
                    ? 'bg-artisan-terracotta/20 text-artisan-terracotta border border-artisan-terracotta'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index < currentStep ? (
                  <Check size={16} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-artisan-terracotta transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {renderFormStep()}
      </CardContent>
    </Card>
  );
};

export default ArtisanOnboardingForm;
