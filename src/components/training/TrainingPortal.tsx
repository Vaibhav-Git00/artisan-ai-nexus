import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Camera, Package, ShoppingCart, DollarSign, Truck, Globe, Download, Play, BookOpen } from 'lucide-react';

// Helper function to get category color
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'photography':
      return 'bg-blue-100 text-blue-800';
    case 'pricing':
      return 'bg-green-100 text-green-800';
    case 'packaging':
      return 'bg-purple-100 text-purple-800';
    case 'marketing':
      return 'bg-indigo-100 text-indigo-800';
    case 'orders':
      return 'bg-orange-100 text-orange-800';
    case 'shipping':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to get level color
const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'bg-green-100 text-green-800';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Define the training module interface
interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: 'photography' | 'pricing' | 'packaging' | 'marketing' | 'orders' | 'shipping';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  thumbnail: string;
  videoUrl?: string;
  completed?: boolean;
  progress?: number;
  language?: string;
}

// Sample training modules data
const trainingModules: TrainingModule[] = [
  {
    id: 'photo-1',
    title: 'Product Photography Basics',
    description: 'Learn how to take professional photos of your products using just your smartphone.',
    category: 'photography',
    level: 'beginner',
    duration: 15,
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    progress: 100,
    completed: true,
    language: 'english',
    videoUrl: 'https://player.vimeo.com/video/517031489'
  },
  {
    id: 'photo-2',
    title: 'Lighting Techniques for Handcrafts',
    description: 'Master the art of lighting to showcase the details and textures of your handcrafted products.',
    category: 'photography',
    level: 'intermediate',
    duration: 20,
    thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    progress: 45,
    language: 'english',
    videoUrl: 'https://player.vimeo.com/video/517031489'
  },
  {
    id: 'price-1',
    title: 'Setting Fair Prices for Your Craft',
    description: 'Learn how to calculate the true value of your work and set prices that are fair to both you and your customers.',
    category: 'pricing',
    level: 'beginner',
    duration: 25,
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    progress: 75,
    language: 'english',
    videoUrl: 'https://player.vimeo.com/video/517031489'
  },
  {
    id: 'pack-1',
    title: 'Eco-Friendly Packaging Solutions',
    description: 'Discover sustainable packaging options that protect your products while minimizing environmental impact.',
    category: 'packaging',
    level: 'beginner',
    duration: 18,
    thumbnail: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    language: 'english',
    videoUrl: 'https://player.vimeo.com/video/517031489'
  },
  // Hindi modules
  {
    id: 'photo-1-hi',
    title: 'उत्पाद फोटोग्राफी की मूल बातें',
    description: 'अपने स्मार्टफोन का उपयोग करके अपने उत्पादों की पेशेवर तस्वीरें कैसे लें, यह सीखें।',
    category: 'photography',
    level: 'beginner',
    duration: 15,
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    progress: 100,
    completed: true,
    language: 'hindi',
    videoUrl: 'https://player.vimeo.com/video/517031489'
  },
  {
    id: 'price-1-hi',
    title: 'अपने शिल्प के लिए उचित मूल्य निर्धारित करना',
    description: 'अपने काम के वास्तविक मूल्य की गणना करना और ऐसे मूल्य निर्धारित करना सीखें जो आपके और आपके ग्राहकों दोनों के लिए उचित हों।',
    category: 'pricing',
    level: 'beginner',
    duration: 25,
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    progress: 75,
    language: 'hindi',
    videoUrl: 'https://player.vimeo.com/video/517031489'
  },
  {
    id: 'pack-1-hi',
    title: 'पर्यावरण के अनुकूल पैकेजिंग समाधान',
    description: 'टिकाऊ पैकेजिंग विकल्पों की खोज करें जो पर्यावरण प्रभाव को कम करते हुए आपके उत्पादों की रक्षा करते हैं।',
    category: 'packaging',
    level: 'beginner',
    duration: 18,
    thumbnail: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    language: 'hindi',
    videoUrl: 'https://player.vimeo.com/video/517031489'
  }
];

const TrainingPortal: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [language, setLanguage] = useState<string>('english');
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Filter modules based on active category and language
  const filteredModules = trainingModules.filter(module => 
    (activeCategory === 'all' || module.category === activeCategory) && 
    (module.language === language)
  );

  // Get featured module
  const featuredModule = filteredModules.find(module => module.category === 'photography');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">
            {language === 'hindi' ? 'प्रशिक्षण पोर्टल' : 'Training Portal'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'hindi' 
              ? 'अपने कारीगर व्यवसाय को बढ़ाने के लिए आवश्यक कौशल सीखें' 
              : 'Learn essential skills to grow your artisan business'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {selectedModule ? (
        <div className="space-y-6">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedModule(null);
              setVideoPlaying(false);
            }}
            className="mb-4"
          >
            {language === 'hindi' ? 'सभी मॉड्यूल पर वापस जाएं' : 'Back to All Modules'}
          </Button>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {videoPlaying ? (
              <div className="relative aspect-video">
                <iframe
                  src={`${selectedModule.videoUrl}?autoplay=1`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={selectedModule.title}
                ></iframe>
              </div>
            ) : (
              <div className="relative aspect-video">
                <img
                  src={selectedModule.thumbnail}
                  alt={selectedModule.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Button 
                    size="lg" 
                    className="rounded-full h-16 w-16 bg-artisan-terracotta hover:bg-artisan-terracotta/90"
                    onClick={() => setVideoPlaying(true)}
                  >
                    <Play size={32} />
                  </Button>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getCategoryColor(selectedModule.category)}>
                  {selectedModule.category.charAt(0).toUpperCase() + selectedModule.category.slice(1)}
                </Badge>
                <Badge className={getLevelColor(selectedModule.level)}>
                  {selectedModule.level.charAt(0).toUpperCase() + selectedModule.level.slice(1)}
                </Badge>
                <Badge variant="outline">
                  {selectedModule.duration} {language === 'hindi' ? 'मिनट' : 'minutes'}
                </Badge>
              </div>
              
              <h2 className="text-2xl font-display font-bold mb-2">{selectedModule.title}</h2>
              <p className="text-muted-foreground mb-6">{selectedModule.description}</p>
              
              {selectedModule.progress !== undefined && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{language === 'hindi' ? 'प्रगति' : 'Progress'}</span>
                    <span>{selectedModule.progress}%</span>
                  </div>
                  <Progress value={selectedModule.progress} className="h-2" />
                </div>
              )}
              
              <div className="flex flex-wrap gap-3">
                {videoPlaying ? (
                  <Button 
                    className="bg-artisan-terracotta hover:bg-artisan-terracotta/90"
                  >
                    {language === 'hindi' ? 'पूर्ण के रूप में चिह्नित करें' : 'Mark as Completed'}
                  </Button>
                ) : (
                  <Button 
                    className="bg-artisan-terracotta hover:bg-artisan-terracotta/90"
                    onClick={() => setVideoPlaying(true)}
                  >
                    {selectedModule.progress && selectedModule.progress > 0 
                      ? (language === 'hindi' ? 'सीखना जारी रखें' : 'Continue Learning') 
                      : (language === 'hindi' ? 'सीखना शुरू करें' : 'Start Learning')}
                  </Button>
                )}
                
                <Button variant="outline">
                  <Download size={16} className="mr-2" />
                  {language === 'hindi' ? 'सामग्री डाउनलोड करें' : 'Download Materials'}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'hindi' ? 'आप क्या सीखेंगे' : 'What You\'ll Learn'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>
                      {language === 'hindi' 
                        ? `${selectedModule.category} सफलता के लिए आवश्यक तकनीकें` 
                        : `Essential techniques for ${selectedModule.category} success`}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>
                      {language === 'hindi' 
                        ? 'व्यावहारिक टिप्स जिन्हें आप तुरंत लागू कर सकते हैं' 
                        : 'Practical tips you can implement immediately'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>
                      {language === 'hindi' 
                        ? 'सफल कारीगरों के वास्तविक उदाहरण' 
                        : 'Real examples from successful artisans'}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{language === 'hindi' ? 'संसाधन' : 'Resources'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <Button variant="link" className="p-0 h-auto text-artisan-terracotta">
                      <Download size={14} className="mr-2" />
                      {language === 'hindi' ? 'प्रिंट करने योग्य गाइड (PDF)' : 'Printable Guide (PDF)'}
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto text-artisan-terracotta">
                      <Download size={14} className="mr-2" />
                      {language === 'hindi' ? 'वर्कशीट टेम्पलेट्स' : 'Worksheet Templates'}
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto text-artisan-terracotta">
                      <Download size={14} className="mr-2" />
                      {language === 'hindi' ? 'संसाधन लिंक' : 'Resource Links'}
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{language === 'hindi' ? 'मदद चाहिए?' : 'Need Help?'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {language === 'hindi' 
                    ? 'इस मॉड्यूल के साथ परेशानी हो रही है? हमारी टीम से सहायता प्राप्त करें या अन्य कारीगरों से जुड़ें।' 
                    : 'Having trouble with this module? Get support from our team or connect with other artisans.'}
                </p>
                <Button className="w-full">
                  {language === 'hindi' ? 'सहायता से संपर्क करें' : 'Contact Support'}
                </Button>
                <Button variant="outline" className="w-full">
                  {language === 'hindi' ? 'समुदाय चर्चा में शामिल हों' : 'Join Community Discussion'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <>
          {/* Category Tabs */}
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-8 flex flex-wrap h-auto">
              <TabsTrigger value="all" className="data-[state=active]:bg-muted">
                {language === 'hindi' ? 'सभी' : 'All'}
              </TabsTrigger>
              <TabsTrigger value="photography" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                <Camera size={16} className="mr-2" /> 
                {language === 'hindi' ? 'फोटोग्राफी' : 'Photography'}
              </TabsTrigger>
              <TabsTrigger value="pricing" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
                <DollarSign size={16} className="mr-2" /> 
                {language === 'hindi' ? 'मूल्य निर्धारण' : 'Pricing'}
              </TabsTrigger>
              <TabsTrigger value="packaging" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">
                <Package size={16} className="mr-2" /> 
                {language === 'hindi' ? 'पैकेजिंग' : 'Packaging'}
              </TabsTrigger>
            </TabsList>
            
            {/* Featured Module */}
            {featuredModule && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  {language === 'hindi' ? 'विशेष मॉड्यूल' : 'Featured Module'}
                </h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 relative">
                      <img
                        src={featuredModule.thumbnail}
                        alt={featuredModule.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className={`absolute top-2 right-2 ${getCategoryColor(featuredModule.category)}`}>
                        {featuredModule.category.charAt(0).toUpperCase() + featuredModule.category.slice(1)}
                      </Badge>
                    </div>
                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl font-semibold mb-2">{featuredModule.title}</h3>
                      <p className="text-muted-foreground mb-4">{featuredModule.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={getLevelColor(featuredModule.level)}>
                          {featuredModule.level.charAt(0).toUpperCase() + featuredModule.level.slice(1)}
                        </Badge>
                        <Badge variant="outline">
                          {featuredModule.duration} {language === 'hindi' ? 'मिनट' : 'minutes'}
                        </Badge>
                      </div>
                      <Button
                        className="bg-artisan-terracotta hover:bg-artisan-terracotta/90"
                        onClick={() => setSelectedModule(featuredModule)}
                      >
                        {featuredModule.completed 
                          ? (language === 'hindi' ? 'मॉड्यूल समीक्षा करें' : 'Review Module') 
                          : (language === 'hindi' ? 'सीखना शुरू करें' : 'Start Learning')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Module Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules
                .filter(module => !featuredModule || module.id !== featuredModule.id)
                .map((module) => (
                <Card
                  key={module.id}
                  className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                  onClick={() => setSelectedModule(module)}
                >
                  <div className="relative h-48">
                    <img
                      src={module.thumbnail}
                      alt={module.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${getCategoryColor(module.category)}`}>
                      {module.category.charAt(0).toUpperCase() + module.category.slice(1)}
                    </Badge>
                    {module.progress !== undefined && module.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-3 py-1">
                        <div className="flex justify-between text-xs text-white mb-1">
                          <span>{language === 'hindi' ? 'प्रगति' : 'Progress'}</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getLevelColor(module.level)}>
                        {module.level.charAt(0).toUpperCase() + module.level.slice(1)}
                      </Badge>
                      <Badge variant="outline">
                        {module.duration} {language === 'hindi' ? 'मिनट' : 'minutes'}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-lg mb-2">{module.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{module.description}</p>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <Button
                      variant="link"
                      className="p-0 h-auto text-artisan-terracotta"
                    >
                      {module.progress && module.progress > 0 
                        ? (language === 'hindi' ? 'सीखना जारी रखें' : 'Continue Learning') 
                        : (language === 'hindi' ? 'सीखना शुरू करें' : 'Start Learning')} →
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredModules.length === 0 && (
                <div className="col-span-3 py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    {language === 'hindi' 
                      ? 'इस श्रेणी के लिए कोई प्रशिक्षण मॉड्यूल नहीं मिला।' 
                      : 'No training modules found for this category.'}
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveCategory('all')}
                  >
                    {language === 'hindi' ? 'सभी मॉड्यूल देखें' : 'View All Modules'}
                  </Button>
                </div>
              )}
            </div>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default TrainingPortal;
