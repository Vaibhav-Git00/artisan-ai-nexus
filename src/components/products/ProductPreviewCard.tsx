import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductPreviewCardProps {
  product: {
    name: string;
    price: number;
    images: string[];
    category: string;
    artisan: {
      name: string;
      location: string;
    };
    ecoScore: {
      score: number;
    };
  };
  onViewMarketplace: () => void;
  onEditProduct: () => void;
}

const ProductPreviewCard: React.FC<ProductPreviewCardProps> = ({ 
  product, 
  onViewMarketplace,
  onEditProduct
}) => {
  // Format the price with commas and currency symbol
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Get eco-score color based on the score value
  const getEcoScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  // Get eco-score label based on the score value
  const getEcoScoreLabel = (score: number) => {
    if (score >= 8) return 'High';
    if (score >= 6) return 'Medium';
    return 'Low';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-bold">Product Preview</h2>
        <p className="text-muted-foreground">
          Your product has been successfully uploaded! Here's how it will appear in the marketplace.
        </p>
      </div>
      
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.images[0] || 'https://via.placeholder.com/300x300?text=No+Image'} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <Badge 
            className={`absolute top-2 right-2 ${getEcoScoreColor(product.ecoScore.score)} flex items-center gap-1`}
          >
            <Leaf size={12} />
            <span>{product.ecoScore.score.toFixed(1)}/10</span>
          </Badge>
          <Badge 
            className="absolute top-2 left-2 bg-white/80 text-foreground backdrop-blur-sm"
          >
            {product.category}
          </Badge>
        </div>
        
        <CardContent className="pt-4">
          <h3 className="font-medium text-lg mb-1">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-2 flex items-center">
            <MapPin size={14} className="mr-1" />
            {product.artisan.location}
          </p>
          
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Eco Score</p>
              <Badge className={getEcoScoreColor(product.ecoScore.score)}>
                {getEcoScoreLabel(product.ecoScore.score)}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Price</p>
              <span className="font-semibold text-lg">{formatPrice(product.price)}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex gap-2 pt-0">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onEditProduct}
          >
            Edit Product
          </Button>
          <Button 
            className="flex-1 bg-artisan-terracotta hover:bg-artisan-terracotta/90"
            onClick={onViewMarketplace}
          >
            View in Marketplace
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductPreviewCard;
