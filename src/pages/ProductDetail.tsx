import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductDetailComponent from '@/components/products/ProductDetail';
import { Button } from '@/components/ui/button';
import ProductBreadcrumb from '@/components/navigation/ProductBreadcrumb';
import RelatedProducts from '@/components/products/RelatedProducts';
import MiniCart from '@/components/cart/MiniCart';
import useProductStore from '@/store/useProductStore';
import useCartStore from '@/store/useCartStore';

// Sample product data (expanded with more details)
const sampleProducts = [
  {
    _id: '1',
    name: 'Madhubani Painting - Tree of Life',
    description: 'This exquisite Madhubani painting depicts the Tree of Life, a powerful symbol in Indian mythology representing the harmony between nature and humanity. Each intricate detail is meticulously hand-painted using traditional techniques that have been passed down through generations.',
    price: 2500,
    images: [
      'https://images.unsplash.com/photo-1584283367830-7875dd4543a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1569091791842-7cfb64e04797?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Painting',
    tags: ['Madhubani', 'Folk Art', 'Traditional', 'Wall Decor'],
    stock: 5,
    artisan: {
      _id: 'a1',
      name: 'Lakshmi Devi',
      location: 'Bihar, India',
      bio: 'Lakshmi has been practicing Madhubani art for over 25 years, learning the craft from her mother and grandmother. She specializes in mythological themes and nature-inspired designs.',
      profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    ecoScore: {
      score: 8.5,
      materialsSustainability: 9.0,
      productionProcess: 8.5,
      packaging: 7.0,
      transportFootprint: 9.0
    },
    fairPriceData: {
      suggestedPrice: 2800,
      communityRatings: [
        { rating: -1, comment: 'The intricate work deserves a higher price.' },
        { rating: -1, comment: 'This is skilled work that takes days to complete.' },
        { rating: 0, comment: 'Good balance of affordability and fair compensation.' },
        { rating: 0, comment: 'Seems reasonable for handmade art.' },
        { rating: 1, comment: 'A bit expensive compared to similar works.' }
      ]
    },
    stories: [
      {
        _id: 's1',
        title: 'The Art of Madhubani',
        content: 'I learned Madhubani painting from my grandmother when I was just 8 years old. Our family has practiced this art form for five generations, and each painting tells a story from our cultural heritage.\n\nMadhubani art originated in the Mithila region of Bihar during ancient times. Traditionally, these paintings were created on freshly plastered mud walls of homes, but now we use handmade paper and canvas to preserve the art longer and reach a wider audience.\n\nThis particular piece took me 15 days to complete. I use only natural pigments derived from plants, minerals, and even cow dung. The brushes are made from bamboo twigs with cotton wrapped around one end.\n\nThe Tree of Life represents the connection between earth and heaven, between our roots and our aspirations. Each bird, flower, and fish in the painting has a symbolic meaning in our tradition.',
        mediaType: 'video',
        mediaUrls: ['https://images.unsplash.com/photo-1584283367830-7875dd4543a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80']
      }
    ],
    storyVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    storyVideoType: 'upload'
  },
  {
    _id: '2',
    name: 'Handwoven Bamboo Basket',
    description: 'This meticulously crafted bamboo basket showcases the exceptional skill of traditional Assamese weaving. Perfect for storage or as a decorative piece, each basket is uniquely handwoven using sustainable bamboo harvested from local forests.',
    price: 1200,
    images: [
      'https://images.unsplash.com/photo-1595397551849-e31e17f64ea7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595366200377-c473fe3c8842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Basketry',
    tags: ['Bamboo', 'Weaving', 'Storage', 'Eco-friendly'],
    stock: 8,
    artisan: {
      _id: 'a2',
      name: 'Rajesh Kumar',
      location: 'Assam, India',
      bio: 'Rajesh comes from a family of traditional bamboo craftsmen in Assam. He has been weaving baskets since he was 12 years old and is dedicated to preserving this ancient craft.',
      profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    ecoScore: {
      score: 9.2,
      materialsSustainability: 9.5,
      productionProcess: 9.8,
      packaging: 8.0,
      transportFootprint: 8.5
    },
    fairPriceData: {
      suggestedPrice: 1500,
      communityRatings: [
        { rating: -1, comment: 'The craftsmanship deserves a higher price.' },
        { rating: -1, comment: 'Each basket takes days to make by hand.' },
        { rating: -1, comment: 'Sustainable materials and traditional techniques should be valued more.' },
        { rating: 0, comment: 'Fair price for the quality.' }
      ]
    },
    stories: [
      {
        _id: 's2',
        title: 'Weaving Traditions of Assam',
        content: 'I learned the art of bamboo weaving from my father and grandfather. In our village in Assam, bamboo craft is not just a livelihood but a way of life that connects us to our ancestors.\n\nEach basket begins with the careful selection of bamboo. I harvest only mature bamboo during specific seasons to ensure sustainability. The bamboo is then split into precise strips using traditional tools that my grandfather made.\n\nThe weaving pattern in this basket is called "Jaali" and requires intricate cross-weaving techniques. It takes me 3-4 days to complete a single basket of this size and complexity.\n\nBamboo craft is facing challenges as younger generations move to cities, but I am teaching this art to my children and several apprentices from my village to keep our heritage alive.',
        mediaType: 'audio',
        mediaUrls: ['https://example.com/audio/bamboo-weaving-story.mp3']
      }
    ],
    storyVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    storyVideoType: 'youtube'
  }
];

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(false);

  // Get product store functions
  const {
    currentProduct,
    isLoading,
    error,
    fetchProductById,
    relatedProducts
  } = useProductStore();

  // Get cart store functions
  const { addItem } = useCartStore();

  // Fetch product on mount
  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      // Store sample products in localStorage for demo purposes
      if (!localStorage.getItem('sample_products')) {
        localStorage.setItem('sample_products', JSON.stringify(sampleProducts));
      }

      // Fetch the product
      const product = await fetchProductById(id);

      // Check if current user is the owner
      try {
        const currentUser = localStorage.getItem('currentUser');

        if (currentUser && product?.artisan) {
          const user = JSON.parse(currentUser);
          setIsOwner(user.id === product.artisan._id);
        } else {
          // For demo purposes, set isOwner to true
          setIsOwner(true);
        }
      } catch (error) {
        console.error('Error checking ownership:', error);
        // Default to true for demo
        setIsOwner(true);
      }
    };

    loadProduct();
  }, [id, fetchProductById]);

  // Update document title
  useEffect(() => {
    if (currentProduct) {
      document.title = `${currentProduct.name} | ArtisanLink`;
    } else {
      document.title = 'Product | ArtisanLink';
    }
  }, [currentProduct]);

  // Handle add to cart
  const handleAddToCart = () => {
    if (currentProduct) {
      addItem(currentProduct);
    }
  };

  // Handle back to marketplace
  const handleBackToMarketplace = () => {
    navigate('/marketplace');
  };

  // Page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <Layout>
      <MiniCart />

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Back to Marketplace Button */}
        <div className="mb-4">
          <Button
            variant="ghost"
            className="flex items-center text-muted-foreground hover:text-foreground"
            onClick={handleBackToMarketplace}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Marketplace
          </Button>
        </div>

        {isLoading ? (
          <div className="py-16">
            <motion.div
              className="animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/4 mx-auto"></div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-96 bg-muted rounded"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-32 bg-muted rounded"></div>
                  <div className="h-10 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : error ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              {error}
            </p>
            <Button asChild>
              <Link to="/marketplace">Browse Marketplace</Link>
            </Button>
          </motion.div>
        ) : currentProduct ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <ProductBreadcrumb />

            {/* Product Detail */}
            <ProductDetailComponent product={currentProduct} isOwner={isOwner} />

            {/* Related Products */}
            {relatedProducts.length > 0 && <RelatedProducts />}
          </motion.div>
        ) : null}
      </motion.div>
    </Layout>
  );
};

export default ProductDetailPage;
