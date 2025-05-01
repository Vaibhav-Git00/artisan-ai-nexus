import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BasicProductForm: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!title || !price || !description || !imageUrl) {
      alert('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Create a new product object
    const newProduct = {
      _id: `product-${Date.now()}`,
      name: title,
      price: parseFloat(price),
      images: [imageUrl],
      category: 'Handcraft',
      artisan: {
        _id: 'current-user',
        name: 'Current User',
        location: 'Your Location'
      },
      ecoScore: {
        score: 8.5
      },
      storySnippet: description.substring(0, 100) + '...'
    };

    // Get existing products from localStorage or use an empty array
    const existingProducts = JSON.parse(localStorage.getItem('marketplace_products') || '[]');
    
    // Add the new product to the beginning of the array
    const updatedProducts = [newProduct, ...existingProducts];
    
    // Save the updated products to localStorage
    localStorage.setItem('marketplace_products', JSON.stringify(updatedProducts));
    
    console.log('Product saved:', newProduct);
    alert('Product uploaded successfully!');
    
    // Redirect to marketplace page
    navigate('/marketplace');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Your Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              required
            />
            <p className="text-xs text-gray-500">
              For testing, use an image URL like: https://images.unsplash.com/photo-1516035069371-29a1b244cc32
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-artisan-terracotta hover:bg-artisan-terracotta/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Uploading...' : 'Upload Product'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BasicProductForm;
