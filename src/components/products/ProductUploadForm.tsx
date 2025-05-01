import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct, calculateEcoScore as calculateEcoScoreService } from '@/services/productService';
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
  Loader2
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

import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define the form validation schema
const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  price: z.coerce.number().min(1, { message: 'Price must be at least 1' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  materials: z.array(z.string()).min(1, { message: 'Please select at least one material' }),
  images: z.array(z.any()).min(1, { message: 'Please upload at least one image' }),
});

type FormValues = z.infer<typeof formSchema>;

// Craft categories
const craftCategories = [
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

// Material types with eco scores
const materialTypes = [
  { value: 'recycled', label: 'Recycled Materials', ecoScore: 9 },
  { value: 'natural', label: 'Natural Materials', ecoScore: 7 },
  { value: 'synthetic', label: 'Synthetic Materials', ecoScore: 3 },
  { value: 'upcycled', label: 'Upcycled Materials', ecoScore: 8 },
  { value: 'organic', label: 'Organic Materials', ecoScore: 8 },
  { value: 'biodegradable', label: 'Biodegradable Materials', ecoScore: 8 },
];

const ProductUploadForm: React.FC = () => {
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [ecoScore, setEcoScore] = useState<number>(0);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      price: 0,
      category: '',
      description: '',
      materials: [],
      images: [],
    },
  });

  // Calculate eco score based on selected materials
  const calculateEcoScore = (materials: string[]) => {
    return calculateEcoScoreService(materials);
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
    form.setValue('materials', updatedMaterials);

    // Calculate and update eco score
    const newEcoScore = calculateEcoScore(updatedMaterials);
    setEcoScore(newEcoScore);
  };

  // Handle file selection for product images
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    const updatedFiles = [...imageFiles, ...newFiles];
    setImageFiles(updatedFiles);
    form.setValue('images', updatedFiles);

    // Generate preview URLs
    const newUrls = newFiles.map(file => URL.createObjectURL(file));
    setImageUrls([...imageUrls, ...newUrls]);

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
  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...imageFiles];
    const updatedUrls = [...imageUrls];

    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(updatedUrls[index]);

    updatedFiles.splice(index, 1);
    updatedUrls.splice(index, 1);

    setImageFiles(updatedFiles);
    setImageUrls(updatedUrls);
    form.setValue('images', updatedFiles);
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Prepare product data
      const productData = {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        materials: data.materials,
        images: data.images,
        ecoScore: {
          score: ecoScore,
          materialsSustainability: ecoScore,
          productionProcess: Math.min(ecoScore + 1, 10), // Slightly higher than overall score
          packaging: Math.max(ecoScore - 1, 0), // Slightly lower than overall score
          transportFootprint: Math.max(ecoScore - 0.5, 0) // Slightly lower than overall score
        },
      };

      // Call the service to create the product
      const response = await createProduct(productData);

      console.log('Product created:', response);

      // Show success message and redirect
      toast.success('Product uploaded successfully!');
      navigate('/marketplace'); // Redirect to marketplace
    } catch (error) {
      console.error('Error uploading product:', error);
      toast.error('Failed to upload product. Please try again.');
    } finally {
      setIsSubmitting(false);
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Your Product</CardTitle>
        <CardDescription>
          Share your craft with the world. Fill in the details below to list your product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Product Images */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Camera size={16} className="mr-2" />
                    Product Images
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {imageUrls.map((url, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                            <img
                              src={url}
                              alt={`Product preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                              aria-label="Remove image"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}

                        {/* Add image button */}
                        <div
                          onClick={handleUploadClick}
                          className="aspect-square rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 flex flex-col items-center justify-center cursor-pointer transition-colors"
                        >
                          <Plus size={24} className="text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground text-center">
                            Add Image
                          </span>
                        </div>
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        multiple
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
                        Upload Images
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload clear images of your product from different angles. First image will be the main image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Tag size={16} className="mr-2" />
                    Product Title
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a descriptive title for your product" {...field} />
                  </FormControl>
                  <FormDescription>
                    A clear, descriptive title helps buyers find your product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <DollarSign size={16} className="mr-2" />
                    Price (₹)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Enter price in INR"
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Set a fair price for your product. Community feedback will help adjust if needed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Package size={16} className="mr-2" />
                    Craft Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {craftCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the category that best describes your craft.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Materials */}
            <FormField
              control={form.control}
              name="materials"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Recycle size={16} className="mr-2" />
                    Materials Used
                  </FormLabel>
                  <FormControl>
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
                  </FormControl>
                  <FormDescription>
                    Select all materials used in your product. This helps calculate the eco score.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your product in detail. Include information about the crafting process, dimensions, care instructions, etc."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A detailed description helps buyers understand your product better.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductUploadForm;
