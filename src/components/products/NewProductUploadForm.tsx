import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductPreviewModal from './ProductPreviewModal';
import { createProduct, updateProduct } from '@/services/productService';
import {
  Camera,
  Upload,
  X,
  Plus,
  Leaf,
  Tag,
  DollarSign,
  Package,
  Recycle,
  Loader2,
  Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import VideoInput from '@/components/ui/video-input';

// Material types with eco scores
const materialTypes = [
  { value: 'recycled', label: 'Recycled Materials', ecoScore: 9 },
  { value: 'natural', label: 'Natural Materials', ecoScore: 7 },
  { value: 'synthetic', label: 'Synthetic Materials', ecoScore: 3 },
  { value: 'upcycled', label: 'Upcycled Materials', ecoScore: 8 },
  { value: 'organic', label: 'Organic Materials', ecoScore: 8 },
  { value: 'biodegradable', label: 'Biodegradable Materials', ecoScore: 8 },
];

// Craft categories
const craftCategories = [
  { value: 'Painting', label: 'Painting' },
  { value: 'Pottery', label: 'Pottery' },
  { value: 'Textiles', label: 'Textiles' },
  { value: 'Woodwork', label: 'Woodwork' },
  { value: 'Jewelry', label: 'Jewelry' },
  { value: 'Basketry', label: 'Basketry' },
  { value: 'Metal Craft', label: 'Metal Craft' },
  { value: 'Leatherwork', label: 'Leatherwork' },
  { value: 'Glasswork', label: 'Glasswork' },
  { value: 'Other', label: 'Other' },
];

const NewProductUploadForm: React.FC = () => {
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
  const [showPreview, setShowPreview] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productToEdit, setProductToEdit] = useState<any>(null);
  const [storyVideo, setStoryVideo] = useState<{ url: string; type: 'youtube' | 'vimeo' | 'upload' | null }>({
    url: '',
    type: null
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if there's a product to edit in localStorage
  useEffect(() => {
    const productData = localStorage.getItem('product_to_edit');
    if (productData) {
      try {
        const product = JSON.parse(productData);
        setProductToEdit(product);
        setIsEditMode(true);

        // Pre-fill the form with product data
        setTitle(product.name);
        setPrice(product.price.toString());
        setCategory(product.category);
        setDescription(product.storySnippet?.replace('...', '') || '');
        setImagePreview(product.images[0]);

        // Extract materials from eco score
        if (product.ecoScore && product.ecoScore.score) {
          // For demo purposes, we'll select some materials based on the eco score
          const score = product.ecoScore.score;
          let materialsToSelect: string[] = [];

          if (score >= 8) {
            materialsToSelect = ['recycled', 'organic'];
          } else if (score >= 6) {
            materialsToSelect = ['natural'];
          } else {
            materialsToSelect = ['synthetic'];
          }

          setSelectedMaterials(materialsToSelect);
          setEcoScore(score);
        }

        // Load story video if available
        if (product.storyVideo && product.storyVideoType) {
          setStoryVideo({
            url: product.storyVideo,
            type: product.storyVideoType as 'youtube' | 'vimeo' | 'upload' | null
          });
        }

        // Clear the product from localStorage
        localStorage.removeItem('product_to_edit');
      } catch (error) {
        console.error('Error parsing product data:', error);
        localStorage.removeItem('product_to_edit');
      }
    }
  }, []);

  // Calculate eco score based on selected materials
  const calculateEcoScore = (materials: string[]) => {
    if (materials.length === 0) return 0;

    const totalScore = materials.reduce((score, material) => {
      const materialType = materialTypes.find(type => type.value === material);
      return score + (materialType?.ecoScore || 0);
    }, 0);

    return Math.round((totalScore / materials.length) * 10) / 10;
  };

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

  // Handle file selection for product images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setImageFile(file);

    // Generate preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Remove image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
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
    if (!title || !price || !category || !description || selectedMaterials.length === 0 || !imagePreview) {
      alert('Please fill in all fields and upload an image');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create product object
      let productData;

      if (isEditMode && productToEdit) {
        // Update existing product
        console.log('Updating product:', productToEdit._id);

        productData = {
          ...productToEdit,
          name: title,
          price: parseFloat(price),
          images: [imagePreview], // Use the preview URL
          category: category,
          ecoScore: {
            score: ecoScore || 7.5 // Default to 7.5 if no materials selected
          },
          storySnippet: description.substring(0, 100) + '...',
          storyVideo: storyVideo.url || null,
          storyVideoType: storyVideo.type || null,
          updatedAt: new Date().toISOString()
        };
      } else {
        // Create a new product
        console.log('Creating new product');

        productData = {
          _id: `product-${Date.now()}`,
          name: title,
          price: parseFloat(price),
          images: [imagePreview], // Use the preview URL
          category: category,
          artisan: {
            _id: 'current-user',
            name: 'Current User',
            location: 'Your Location'
          },
          ecoScore: {
            score: ecoScore || 7.5 // Default to 7.5 if no materials selected
          },
          storySnippet: description.substring(0, 100) + '...',
          storyVideo: storyVideo.url || null,
          storyVideoType: storyVideo.type || null,
          createdAt: new Date().toISOString()
        };
      }

      // Save to localStorage
      try {
        // Get existing products
        const existingProductsStr = localStorage.getItem('marketplace_products');
        const existingProducts = existingProductsStr ? JSON.parse(existingProductsStr) : [];

        if (isEditMode && productToEdit) {
          // Find and update the product
          const index = existingProducts.findIndex((p: any) => p._id === productToEdit._id);
          if (index >= 0) {
            existingProducts[index] = productData;
          } else {
            existingProducts.unshift(productData);
          }
        } else {
          // Add new product to the beginning
          existingProducts.unshift(productData);
        }

        // Save back to localStorage
        localStorage.setItem('marketplace_products', JSON.stringify(existingProducts));
        console.log('Saved to localStorage:', productData);

        // Set the preview product and show the preview modal
        setPreviewProduct(productData);
        setShowPreview(true);

        // After a short delay, navigate to the marketplace page
        setTimeout(() => {
          navigate('/marketplace');
        }, 2000);
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError);
        alert('Failed to save product. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to upload product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle view in marketplace
  const handleViewMarketplace = () => {
    setShowPreview(false);
    navigate('/marketplace');
  };

  // Handle edit product
  const handleEditProduct = () => {
    setShowPreview(false);
    // Stay on the current page to continue editing
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    if (isEditMode) {
      // Navigate back to marketplace
      navigate('/marketplace');
    } else {
      // Just clear the form
      setTitle('');
      setPrice('');
      setCategory('');
      setDescription('');
      setSelectedMaterials([]);
      setEcoScore(0);
      setImagePreview(null);
      setImageFile(null);
    }
  };

  return (
    <Card className="w-full">
      {/* Product Preview Modal */}
      {previewProduct && (
        <ProductPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          product={previewProduct}
          onViewMarketplace={handleViewMarketplace}
          onEditProduct={handleEditProduct}
        />
      )}

      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit Your Product' : 'Upload Your Product'}</CardTitle>
        <CardDescription>
          {isEditMode
            ? 'Update your product details below.'
            : 'Share your craft with the world. Fill in the details below to list your product.'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Images */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <Camera size={16} className="mr-2" />
              Product Image
            </Label>
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {imagePreview && (
                  <div className="relative aspect-square rounded-md overflow-hidden border">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      aria-label="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {!imagePreview && (
                  <div
                    onClick={handleUploadClick}
                    className="aspect-square rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 flex flex-col items-center justify-center cursor-pointer transition-colors"
                  >
                    <Plus size={24} className="text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground text-center">
                      Add Image
                    </span>
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <Button
                type="button"
                variant="outline"
                onClick={handleUploadClick}
                className="w-full"
              >
                <Upload size={16} className="mr-2" />
                Upload Image
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload a clear image of your product. Maximum file size: 5MB.
            </p>
          </div>

          {/* Product Title */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <Tag size={16} className="mr-2" />
              Product Title
            </Label>
            <Input
              placeholder="Enter a descriptive title for your product"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              A clear, descriptive title helps buyers find your product.
            </p>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <DollarSign size={16} className="mr-2" />
              Price (₹)
            </Label>
            <Input
              type="number"
              min={1}
              placeholder="Enter price in INR"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              Set a fair price for your product. Community feedback will help adjust if needed.
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <Package size={16} className="mr-2" />
              Craft Category
            </Label>
            <Select
              onValueChange={setCategory}
              value={category}
            >
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
            <p className="text-sm text-muted-foreground">
              Choose the category that best describes your craft.
            </p>
          </div>

          {/* Materials */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <Recycle size={16} className="mr-2" />
              Materials Used
            </Label>
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
                <div className="bg-muted p-4 rounded-md">
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
                  <p className="text-xs text-muted-foreground mt-2">
                    Score: {ecoScore}/10 - Based on the materials you selected
                  </p>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Select all materials used in your product. This helps calculate the eco score.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Product Description</Label>
            <Textarea
              placeholder="Describe your product in detail. Include information about the crafting process, dimensions, care instructions, etc."
              className="min-h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              A detailed description helps buyers understand your product better.
            </p>
          </div>

          {/* Story Video */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <Video size={16} className="mr-2" />
              Artisan's Story Video (Optional)
            </Label>
            <VideoInput
              value={storyVideo}
              onChange={setStoryVideo}
              disabled={isSubmitting}
            />
            <p className="text-sm text-muted-foreground">
              Share a video about your craft or the story behind this product.
            </p>
          </div>

          <div className="flex gap-4">
            {/* Cancel button */}
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>

            {/* Submit button */}
            <Button
              type="submit"
              className="flex-1 bg-artisan-terracotta hover:bg-artisan-terracotta/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  {isEditMode ? 'Updating Product...' : 'Uploading Product...'}
                </>
              ) : (
                isEditMode ? 'Update Product' : 'Upload Product'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewProductUploadForm;
