import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, ShoppingBag } from 'lucide-react';
import ProductPreviewCard from '@/components/products/ProductPreviewCard';
import { getProductPreview } from '@/services/productService';

const ProductPreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Product Preview | ArtisanLink';

    const loadProduct = () => {
      try {
        // Get the latest product directly from localStorage
        const productsStr = localStorage.getItem('marketplace_products');
        console.log('Raw localStorage data:', productsStr);

        if (productsStr) {
          const products = JSON.parse(productsStr);
          console.log('Parsed products:', products);

          if (products.length > 0) {
            console.log('Setting product:', products[0]);
            setProduct(products[0]);
          } else {
            console.log('No products found in localStorage');
          }
        } else {
          console.log('No products found in localStorage');
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, []);

  const handleViewMarketplace = () => {
    navigate('/marketplace');
  };

  const handleEditProduct = () => {
    navigate('/product-upload');
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-artisan-terracotta mb-4"></div>
            <h3 className="text-xl font-medium mb-2">Loading product preview...</h3>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No product found</h3>
            <p className="text-muted-foreground mb-6">
              You haven't uploaded any products yet.
            </p>
            <Button
              className="bg-artisan-terracotta hover:bg-artisan-terracotta/90"
              onClick={() => navigate('/product-upload')}
            >
              Upload a Product
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="p-0 h-auto">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Product Preview</h1>
            <p className="text-muted-foreground">
              Your product has been successfully uploaded! Here's how it will appear in the marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-square rounded-lg overflow-hidden border">
              <img
                src={product.images[0] || 'https://via.placeholder.com/600x600?text=No+Image'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold mb-2">{product.name}</h2>
              <p className="text-muted-foreground mb-4">{product.storySnippet}</p>

              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleEditProduct}
                >
                  <Edit size={16} className="mr-2" />
                  Edit Product
                </Button>
                <Button
                  className="flex-1 bg-artisan-terracotta hover:bg-artisan-terracotta/90"
                  onClick={handleViewMarketplace}
                >
                  <ShoppingBag size={16} className="mr-2" />
                  View in Marketplace
                </Button>
              </div>

              <div className="border rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-2">Product Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{product.artisan.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Eco Score</p>
                    <p className="font-medium">{product.ecoScore.score.toFixed(1)}/10</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Preview Card</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This is how your product will appear in the marketplace listings:
                </p>
                <ProductPreviewCard
                  product={product}
                  onViewMarketplace={handleViewMarketplace}
                  onEditProduct={handleEditProduct}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPreviewPage;
