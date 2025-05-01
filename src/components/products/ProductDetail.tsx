import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Leaf,
  ShoppingCart,
  ThumbsUp,
  ThumbsDown,
  Play,
  User,
  MapPin,
  Package,
  Recycle,
  Truck,
  Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import MeetTheMaker from './MeetTheMaker';
import ArtisanStoryVideo from './ArtisanStoryVideo';
import useCartStore from '@/store/useCartStore';

interface ProductDetailProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    tags: string[];
    stock: number;
    artisan: {
      _id: string;
      name: string;
      location: string;
      bio: string;
      profileImage: string;
    };
    ecoScore: {
      score: number;
      materialsSustainability: number;
      productionProcess: number;
      packaging: number;
      transportFootprint: number;
    };
    fairPriceData: {
      suggestedPrice: number;
      communityRatings: Array<{
        rating: number;
        comment: string;
      }>;
    };
    stories: Array<{
      _id: string;
      title: string;
      content: string;
      mediaType: string;
      mediaUrls: string[];
    }>;
    storyVideo?: string;
    storyVideoType?: 'youtube' | 'vimeo' | 'upload' | null;
  };
  isOwner?: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, isOwner = false }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fairPriceVote, setFairPriceVote] = useState<'fair' | 'low' | 'high' | null>(null);

  // Format the price with commas and currency symbol
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    // Add to cart using the cart store
    addItem(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleFairPriceVote = (vote: 'fair' | 'low' | 'high') => {
    setFairPriceVote(vote);
    // API call to submit vote would go here
    toast.success('Thank you for your feedback on fair pricing!');
  };

  // Get the main story (first one or null)
  const mainStory = product.stories && product.stories.length > 0 ? product.stories[0] : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="rounded-lg overflow-hidden mb-4 border">
            <img
              src={product.images[activeImageIndex] || 'https://via.placeholder.com/600x600?text=No+Image'}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden border ${index === activeImageIndex ? 'ring-2 ring-artisan-terracotta' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <Badge variant="outline" className="mb-2">
            {product.category}
          </Badge>

          <h1 className="text-3xl font-display font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <Badge className="bg-green-100 text-green-800 flex items-center gap-1 mr-2">
              <Leaf size={12} />
              Eco Score: {product.ecoScore.score.toFixed(1)}/10
            </Badge>

            {product.fairPriceData?.suggestedPrice && (
              <Badge className="bg-yellow-100 text-yellow-800">
                Community Fair Price
              </Badge>
            )}
          </div>

          <div className="flex items-baseline mb-6">
            <span className="text-3xl font-semibold mr-3">{formatPrice(product.price)}</span>
            {product.fairPriceData?.suggestedPrice && product.fairPriceData.suggestedPrice !== product.price && (
              <span className="text-muted-foreground">
                Community suggests: {formatPrice(product.fairPriceData.suggestedPrice)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="flex items-center mb-6">
            <div className="flex-shrink-0 mr-3">
              <img
                src={product.artisan.profileImage || 'https://via.placeholder.com/50x50?text=A'}
                alt={product.artisan.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">
                By <Link to={`/artisans/${product.artisan._id}`} className="text-artisan-terracotta hover:underline">
                  {product.artisan.name}
                </Link>
              </p>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin size={14} className="mr-1" /> {product.artisan.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </Button>
            </div>

            <Button
              className="flex-1 bg-artisan-terracotta hover:bg-artisan-terracotta/90"
              onClick={handleAddToCart}
              disabled={product.stock < 1}
            >
              <ShoppingCart size={16} className="mr-2" />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>

          {/* Fair Price Voting */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Is this price fair to the artisan?</CardTitle>
              <CardDescription>
                Help ensure artisans receive fair compensation for their craft
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant={fairPriceVote === 'low' ? 'default' : 'outline'}
                  className={fairPriceVote === 'low' ? 'bg-blue-600' : ''}
                  onClick={() => handleFairPriceVote('low')}
                >
                  <ThumbsDown size={16} className="mr-2" /> Too Low
                </Button>
                <Button
                  variant={fairPriceVote === 'fair' ? 'default' : 'outline'}
                  className={fairPriceVote === 'fair' ? 'bg-green-600' : ''}
                  onClick={() => handleFairPriceVote('fair')}
                >
                  <ThumbsUp size={16} className="mr-2" /> Fair
                </Button>
                <Button
                  variant={fairPriceVote === 'high' ? 'default' : 'outline'}
                  className={fairPriceVote === 'high' ? 'bg-orange-600' : ''}
                  onClick={() => handleFairPriceVote('high')}
                >
                  <ThumbsUp size={16} className="mr-2" /> Too High
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs for Story, Eco Score, etc. */}
      <div className="mt-12">
        <Tabs defaultValue="story">
          <TabsList className="w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="story">Meet the Maker</TabsTrigger>
            <TabsTrigger value="eco-score">Sustainability</TabsTrigger>
            <TabsTrigger value="details">Product Details</TabsTrigger>
          </TabsList>

          {/* Meet the Maker Story */}
          <TabsContent value="story" className="mt-0">
            {mainStory ? (
              <div className="bg-artisan-light rounded-lg p-6 border border-artisan-sand">
                <h2 className="text-2xl font-display font-semibold mb-4">{mainStory.title}</h2>

                {mainStory.mediaType !== 'text' && mainStory.mediaUrls && mainStory.mediaUrls.length > 0 && (
                  <div className="mb-6">
                    {mainStory.mediaType === 'audio' && (
                      <div className="bg-white rounded-lg p-4 flex items-center gap-3 mb-4">
                        <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
                          <Play size={18} />
                        </Button>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-artisan-terracotta rounded-full w-1/3"></div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">3:24</span>
                      </div>
                    )}

                    {mainStory.mediaType === 'video' && (
                      <div className="relative rounded-lg overflow-hidden mb-4 aspect-video">
                        <img
                          src={mainStory.mediaUrls[0] || 'https://via.placeholder.com/800x450?text=Video+Thumbnail'}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button size="icon" className="rounded-full h-16 w-16 bg-artisan-terracotta/90 hover:bg-artisan-terracotta">
                            <Play size={32} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="prose max-w-none">
                  {mainStory.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/20 rounded-lg">
                <User size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No story available yet</h3>
                <p className="text-muted-foreground">
                  The artisan hasn't shared their story for this product yet.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Eco Score */}
          <TabsContent value="eco-score" className="mt-0">
            <div className="bg-artisan-light rounded-lg p-6 border border-artisan-sand">
              <h2 className="text-2xl font-display font-semibold mb-4">Sustainability Score</h2>

              <div className="flex items-center mb-6">
                <div className="bg-white rounded-full p-4 mr-4">
                  <Leaf size={32} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">Overall Eco Score: {product.ecoScore.score.toFixed(1)}/10</h3>
                  <p className="text-muted-foreground">
                    This product has been evaluated for its environmental impact across multiple factors.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <Recycle size={18} className="mr-2 text-green-600" />
                      <span className="font-medium">Materials Sustainability</span>
                    </div>
                    <span className="font-semibold">{product.ecoScore.materialsSustainability.toFixed(1)}/10</span>
                  </div>
                  <Progress value={product.ecoScore.materialsSustainability * 10} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Evaluation of raw materials, sourcing practices, and use of natural/recycled components.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <Package size={18} className="mr-2 text-green-600" />
                      <span className="font-medium">Production Process</span>
                    </div>
                    <span className="font-semibold">{product.ecoScore.productionProcess.toFixed(1)}/10</span>
                  </div>
                  <Progress value={product.ecoScore.productionProcess * 10} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Assessment of energy usage, waste generation, and traditional vs. mechanical methods.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <Package size={18} className="mr-2 text-green-600" />
                      <span className="font-medium">Packaging</span>
                    </div>
                    <span className="font-semibold">{product.ecoScore.packaging.toFixed(1)}/10</span>
                  </div>
                  <Progress value={product.ecoScore.packaging * 10} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Evaluation of packaging materials, recyclability, and waste reduction.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <Truck size={18} className="mr-2 text-green-600" />
                      <span className="font-medium">Transport Footprint</span>
                    </div>
                    <span className="font-semibold">{product.ecoScore.transportFootprint.toFixed(1)}/10</span>
                  </div>
                  <Progress value={product.ecoScore.transportFootprint * 10} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Assessment of shipping distance, transportation methods, and carbon offset options.
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-medium text-green-800 mb-2">Sustainability Commitment</h3>
                <p className="text-sm text-green-700">
                  By purchasing this product, you're supporting sustainable crafting practices and helping preserve
                  traditional techniques that have minimal environmental impact.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Product Details */}
          <TabsContent value="details" className="mt-0">
            <div className="bg-artisan-light rounded-lg p-6 border border-artisan-sand">
              <h2 className="text-2xl font-display font-semibold mb-4">Product Specifications</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Product Information</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">{product.category}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Craft Type</span>
                      <span className="font-medium">{product.tags[0] || 'Traditional'}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Region</span>
                      <span className="font-medium">{product.artisan.location}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Availability</span>
                      <span className="font-medium">{product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Shipping & Returns</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Shipping Time</span>
                      <span className="font-medium">5-7 business days</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Return Policy</span>
                      <span className="font-medium">14 days</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Handmade</span>
                      <span className="font-medium">Yes</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Care Instructions</span>
                      <span className="font-medium">Provided with product</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Meet the Maker Section */}
        <div className="mt-12">
          <MeetTheMaker
            artisan={product.artisan}
            story={product.stories && product.stories.length > 0 ? product.stories[0] : null}
            productId={product._id}
            isOwner={isOwner}
          />
        </div>

        {/* Artisan's Story Video Section */}
        {product.storyVideo && product.storyVideoType && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ArtisanStoryVideo
              videoUrl={product.storyVideo}
              videoType={product.storyVideoType}
              artisanName={product.artisan.name}
              autoplay={true}
              muted={true}
              className="shadow-lg"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
