import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Leaf, Edit, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    artisan: {
      _id: string;
      name: string;
      location: string;
    };
    ecoScore: {
      score: number;
    };
    storySnippet?: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  // Format the price with commas and currency symbol
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Get eco-score color based on the score value
  const getEcoScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-orange-100 text-orange-800 border-orange-200';
  };

  // Get eco-score label
  const getEcoScoreLabel = (score: number) => {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.5) return 'Very Good';
    if (score >= 6.5) return 'Good';
    if (score >= 5) return 'Average';
    return 'Fair';
  };

  // Handle edit product
  const handleEditProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Store the current product in localStorage for editing
    localStorage.setItem('product_to_edit', JSON.stringify(product));

    // Navigate to the product upload page
    navigate('/product-upload');
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg relative group">
      <div className="relative h-64 overflow-hidden">
        <Link to={`/products/${product._id}`} className="block h-full">
          <img
            src={product.images[0] || 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Category Badge */}
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-normal"
          >
            {product.category}
          </Badge>

          {/* Eco Score Badge */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  className={cn(
                    "absolute top-2 right-2 border flex items-center gap-1 px-2 py-1",
                    getEcoScoreColor(product.ecoScore.score)
                  )}
                >
                  <Leaf size={12} className="shrink-0" />
                  <span className="text-xs font-medium">{product.ecoScore.score.toFixed(1)}</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="left">
                <div className="text-sm">
                  <p className="font-medium">{getEcoScoreLabel(product.ecoScore.score)} Eco Score</p>
                  <p className="text-xs text-muted-foreground">
                    This product has a {product.ecoScore.score.toFixed(1)}/10 sustainability rating
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Quick View Overlay - appears on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white hover:bg-white/90 text-foreground"
            >
              Quick View
            </Button>
          </div>
        </Link>

        {/* Edit button */}
        <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={handleEditProduct}
          >
            <Edit size={16} />
          </Button>
        </div>
      </div>

      <CardContent className="pt-4">
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <MapPin size={12} className="mr-1" />
          <span>{product.artisan.location}</span>
        </div>

        <Link to={`/products/${product._id}`} className="block">
          <h3 className="font-medium text-lg leading-tight mb-1 hover:text-artisan-terracotta transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mb-2">
          By <Link to={`/artisans/${product.artisan._id}`} className="hover:text-artisan-terracotta transition-colors font-medium">
            {product.artisan.name}
          </Link>
        </p>

        {product.storySnippet && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.storySnippet}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-0 flex justify-between items-center">
        <span className="font-semibold text-lg">{formatPrice(product.price)}</span>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add to cart functionality would go here
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
