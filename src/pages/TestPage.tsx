import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TestPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Load products from localStorage
    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem('marketplace_products');
        if (storedProducts) {
          const parsedProducts = JSON.parse(storedProducts);
          setProducts(parsedProducts);
          setMessage(`Found ${parsedProducts.length} products in localStorage`);
        } else {
          setMessage('No products found in localStorage');
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setMessage('Error loading products from localStorage');
      }
    };

    loadProducts();
  }, []);

  const addTestProduct = () => {
    try {
      // Create a test product
      const testProduct = {
        _id: `test-product-${Date.now()}`,
        name: 'Test Product',
        price: 1200,
        images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32'],
        category: 'Woodwork',
        artisan: {
          _id: 'current-user',
          name: 'Current User',
          location: 'Your Location'
        },
        ecoScore: {
          score: 8.5
        },
        storySnippet: 'This is a test product to ensure localStorage is working correctly...'
      };

      // Get existing products
      const existingProductsStr = localStorage.getItem('marketplace_products');
      const existingProducts = existingProductsStr ? JSON.parse(existingProductsStr) : [];
      
      // Add the new product
      existingProducts.unshift(testProduct);
      
      // Save back to localStorage
      localStorage.setItem('marketplace_products', JSON.stringify(existingProducts));
      
      // Update state
      setProducts(existingProducts);
      setMessage(`Added test product. Total products: ${existingProducts.length}`);
    } catch (error) {
      console.error('Error adding test product:', error);
      setMessage('Error adding test product');
    }
  };

  const clearProducts = () => {
    try {
      localStorage.removeItem('marketplace_products');
      setProducts([]);
      setMessage('Cleared all products from localStorage');
    } catch (error) {
      console.error('Error clearing products:', error);
      setMessage('Error clearing products');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>LocalStorage Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-lg font-medium">{message}</p>
            </div>
            <div className="flex gap-4">
              <Button onClick={addTestProduct}>Add Test Product</Button>
              <Button variant="destructive" onClick={clearProducts}>Clear All Products</Button>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">Products in LocalStorage</h2>
        
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.images[0] || 'https://via.placeholder.com/300x300?text=No+Image'} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.storySnippet}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Eco Score: {product.ecoScore.score}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TestPage;
