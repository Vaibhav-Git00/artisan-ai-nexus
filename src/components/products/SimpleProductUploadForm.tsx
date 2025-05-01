import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Upload, Plus, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { createProduct, calculateEcoScore as calculateEcoScoreService } from '@/services/productService';

const SimpleProductUploadForm: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [ecoScore, setEcoScore] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Material types with eco scores
  const materialTypes = [
    { value: 'recycled', label: 'Recycled Materials', ecoScore: 9 },
    { value: 'natural', label: 'Natural Materials', ecoScore: 7 },
    { value: 'synthetic', label: 'Synthetic Materials', ecoScore: 3 },
  ];

  // Craft categories
  const craftCategories = [
    { value: 'painting', label: 'Painting' },
    { value: 'pottery', label: 'Pottery' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'woodwork', label: 'Woodwork' },
    { value: 'jewelry', label: 'Jewelry' },
  ];

  // Handle material selection
  const handleMaterialToggle = (material: string) => {
    let updatedMaterials: string[];

    if (selectedMaterials.includes(material)) {
      updatedMaterials = selectedMaterials.filter(m => m !== material);
    } else {
      updatedMaterials = [...selectedMaterials, material];
    }

    setSelectedMaterials(updatedMaterials);

    // Calculate and update eco score
    const newEcoScore = calculateEcoScore(updatedMaterials);
    setEcoScore(newEcoScore);
  };

  // Calculate eco score based on selected materials
  const calculateEcoScore = (materials: string[]) => {
    if (materials.length === 0) return 0;

    const totalScore = materials.reduce((score, material) => {
      const materialType = materialTypes.find(type => type.value === material);
      return score + (materialType?.ecoScore || 0);
    }, 0);

    return Math.round((totalScore / materials.length) * 10) / 10;
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get eco score color
  const getEcoScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800';
    if (score >= 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Get eco score label
  const getEcoScoreLabel = (score: number) => {
    if (score >= 8) return 'High';
    if (score >= 5) return 'Medium';
    return 'Low';
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!title || !price || !category || !description || selectedMaterials.length === 0 || !imagePreview || !imageFile) {
      toast.error('Please fill in all fields and upload an image');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create product data
      const productData = {
        title,
        price: parseFloat(price),
        category,
        description,
        materials: selectedMaterials,
        images: [imageFile], // Pass the actual file for upload
        ecoScore: {
          score: ecoScore,
          materialsSustainability: ecoScore,
          productionProcess: Math.min(ecoScore + 1, 10),
          packaging: Math.max(ecoScore - 1, 0),
          transportFootprint: Math.max(ecoScore - 0.5, 0)
        }
      };

      console.log('Submitting product data:', productData);

      // Call the service to create the product
      const response = await createProduct(productData);

      console.log('Product created:', response);

      // Show success message
      toast.success('Product uploaded successfully!');

      // Store the new product in localStorage for demo purposes
      // This will allow us to display it on the marketplace page
      const newProduct = {
        _id: response.data?.product?._id || `product-${Date.now()}`,
        name: title,
        price: parseFloat(price),
        images: [imagePreview], // Use the preview URL for demo
        category,
        artisan: {
          _id: 'current-user',
          name: 'Current User',
          location: 'Your Location'
        },
        ecoScore: {
          score: ecoScore
        },
        storySnippet: description.substring(0, 100) + '...'
      };

      // Get existing products from localStorage or use an empty array
      const existingProducts = JSON.parse(localStorage.getItem('marketplace_products') || '[]');

      // Add the new product to the beginning of the array
      const updatedProducts = [newProduct, ...existingProducts];

      // Save the updated products to localStorage
      localStorage.setItem('marketplace_products', JSON.stringify(updatedProducts));

      // Redirect to marketplace page
      setTimeout(() => {
        navigate('/marketplace');
      }, 1000);
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to upload product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Your Product</CardTitle>
        <CardDescription>
          Share your craft with the world. Fill in the details below to list your product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Image */}
          <div className="space-y-2">
            <Label>Product Image</Label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative w-32 h-32 rounded-md overflow-hidden border">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                  <Plus size={24} className="text-gray-400 mb-2" />
                  <span className="text-xs text-gray-400 text-center">Add Image</span>
                </div>
              )}
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="max-w-xs"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a clear image of your product
                </p>
              </div>
            </div>
          </div>

          {/* Product Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title for your product"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price in INR"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Craft Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {craftCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Materials */}
          <div className="space-y-2">
            <Label>Materials Used</Label>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {materialTypes.map((material) => (
                  <Badge
                    key={material.value}
                    variant={selectedMaterials.includes(material.value) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedMaterials.includes(material.value)
                        ? "bg-artisan-terracotta hover:bg-artisan-terracotta/90"
                        : ""
                    }`}
                    onClick={() => handleMaterialToggle(material.value)}
                  >
                    {material.label} ({material.ecoScore}/10)
                  </Badge>
                ))}
              </div>

              {/* Eco Score Display */}
              {ecoScore > 0 && (
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Leaf size={16} className="mr-2 text-green-600" />
                      <span className="font-medium">Eco Score</span>
                    </div>
                    <Badge className={getEcoScoreColor(ecoScore)}>
                      {getEcoScoreLabel(ecoScore)}
                    </Badge>
                  </div>
                  <Progress value={ecoScore * 10} className="h-2" />
                  <p className="text-xs text-gray-500 mt-2">
                    Score: {ecoScore}/10 - Based on the materials you selected
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product in detail. Include information about the crafting process, dimensions, care instructions, etc."
              className="min-h-32"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-artisan-terracotta hover:bg-artisan-terracotta/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Uploading Product...
              </>
            ) : (
              'Upload Product'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SimpleProductUploadForm;
