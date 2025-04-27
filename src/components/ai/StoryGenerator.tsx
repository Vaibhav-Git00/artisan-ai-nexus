
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Loader2, Save } from 'lucide-react';

interface StoryPrompt {
  productName: string;
  materials: string;
  technique: string;
  region: string;
  cultural: string;
}

const StoryGenerator = () => {
  const [prompt, setPrompt] = useState<StoryPrompt>({
    productName: '',
    materials: '',
    technique: '',
    region: '',
    cultural: '',
  });
  
  const [generatedContent, setGeneratedContent] = useState({
    productDescription: '',
    artisanStory: '',
    culturalContext: '',
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('product');

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrompt(prev => ({ ...prev, [name]: value }));
  };

  // Mock AI story generator
  const generateStory = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call to AI service
      setTimeout(() => {
        // Sample generated content
        const productDescription = `This exquisite ${prompt.productName} is meticulously crafted using traditional techniques that have been passed down through generations. Made from premium ${prompt.materials}, each piece showcases the exceptional craftsmanship and attention to detail characteristic of artisans from ${prompt.region}. The intricate patterns and unique finish make this a one-of-a-kind treasure that brings both beauty and functionality to your space.`;
        
        const artisanStory = `As a master of ${prompt.technique}, our artisan has dedicated over 20 years to perfecting this traditional craft. Learning from village elders and adding personal creative touches, they've developed a distinctive style that honors heritage while embracing innovation. Each piece tells a story of dedication, skill, and cultural pride, embodying the spirit of ${prompt.region}'s artistic tradition.`;
        
        const culturalContext = `This craft holds deep cultural significance in ${prompt.region}, where it has been practiced for centuries. The patterns and designs reflect ${prompt.cultural} symbolism, often representing fertility, prosperity, or protection. During traditional celebrations, similar crafts play important ceremonial roles, connecting present-day communities with their ancestral roots. By owning this piece, you become part of a living cultural narrative that spans generations.`;
        
        setGeneratedContent({
          productDescription,
          artisanStory,
          culturalContext
        });
        
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating story:', error);
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    // In a real application, this would save to database
    console.log('Content saved:', generatedContent);
    // Here you would trigger a toast notification for success
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles size={18} className="text-artisan-yellow mr-2" />
          AI Story Generator
        </CardTitle>
        <CardDescription>
          Create engaging product descriptions and stories that highlight your craft and cultural heritage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                name="productName"
                value={prompt.productName}
                onChange={handlePromptChange}
                placeholder="Hand-woven Basket"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="materials">Materials Used</Label>
                <Input
                  id="materials"
                  name="materials"
                  value={prompt.materials}
                  onChange={handlePromptChange}
                  placeholder="Bamboo and natural dyes"
                />
              </div>
              <div>
                <Label htmlFor="technique">Craft Technique</Label>
                <Input
                  id="technique"
                  name="technique"
                  value={prompt.technique}
                  onChange={handlePromptChange}
                  placeholder="Traditional weaving"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="region">Region/Village</Label>
                <Input
                  id="region"
                  name="region"
                  value={prompt.region}
                  onChange={handlePromptChange}
                  placeholder="Coastal region of Ghana"
                />
              </div>
              <div>
                <Label htmlFor="cultural">Cultural Significance</Label>
                <Input
                  id="cultural"
                  name="cultural"
                  value={prompt.cultural}
                  onChange={handlePromptChange}
                  placeholder="Represents harvest and prosperity"
                />
              </div>
            </div>
            
            <Button 
              onClick={generateStory} 
              disabled={isGenerating || !prompt.productName}
              className="bg-artisan-indigo hover:bg-artisan-indigo/90"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} className="mr-2" />
                  Generate Story
                </>
              )}
            </Button>
          </div>

          {(generatedContent.productDescription || isGenerating) && (
            <div className="mt-6 border rounded-lg overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="product">Product</TabsTrigger>
                  <TabsTrigger value="artisan">Artisan</TabsTrigger>
                  <TabsTrigger value="cultural">Cultural</TabsTrigger>
                </TabsList>
                
                <div className="p-4 bg-muted/30 min-h-[200px]">
                  {isGenerating ? (
                    <div className="h-full flex items-center justify-center">
                      <Loader2 size={24} className="animate-spin text-artisan-indigo" />
                    </div>
                  ) : (
                    <>
                      <TabsContent value="product" className="mt-0">
                        {generatedContent.productDescription}
                      </TabsContent>
                      <TabsContent value="artisan" className="mt-0">
                        {generatedContent.artisanStory}
                      </TabsContent>
                      <TabsContent value="cultural" className="mt-0">
                        {generatedContent.culturalContext}
                      </TabsContent>
                    </>
                  )}
                </div>
              </Tabs>
            </div>
          )}
        </div>
      </CardContent>
      
      {generatedContent.productDescription && (
        <CardFooter className="flex justify-end">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleSave}
          >
            <Save size={16} />
            Save Content
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default StoryGenerator;
