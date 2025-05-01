import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the Product type
export interface Product {
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
  fairPriceData?: {
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
  createdAt?: string;
  updatedAt?: string;
}

// Define the store state
interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  relatedProducts: Product[];
  recentlyViewed: Product[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  addToRecentlyViewed: (product: Product) => void;
  findRelatedProducts: (product: Product) => void;
  clearError: () => void;
}

// Create the store
const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      currentProduct: null,
      relatedProducts: [],
      recentlyViewed: [],
      isLoading: false,
      error: null,
      
      // Fetch all products
      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          // First check localStorage for products
          const storedProductsStr = localStorage.getItem('marketplace_products');
          let storedProducts: Product[] = [];
          
          if (storedProductsStr) {
            storedProducts = JSON.parse(storedProductsStr);
          }
          
          // Combine with sample products for demo purposes
          // In a real app, you would fetch from API
          const sampleProductsStr = localStorage.getItem('sample_products');
          let sampleProducts: Product[] = [];
          
          if (sampleProductsStr) {
            sampleProducts = JSON.parse(sampleProductsStr);
          }
          
          const allProducts = [...storedProducts, ...sampleProducts];
          
          set({ products: allProducts, isLoading: false });
        } catch (error) {
          console.error('Error fetching products:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch products', 
            isLoading: false 
          });
        }
      },
      
      // Fetch a product by ID
      fetchProductById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          // First check if the product is already in the store
          const { products } = get();
          let product = products.find(p => p._id === id);
          
          if (!product) {
            // If not in store, check localStorage
            const storedProductsStr = localStorage.getItem('marketplace_products');
            let storedProducts: Product[] = [];
            
            if (storedProductsStr) {
              storedProducts = JSON.parse(storedProductsStr);
              product = storedProducts.find(p => p._id === id);
            }
            
            // If still not found, check sample products
            if (!product) {
              const sampleProductsStr = localStorage.getItem('sample_products');
              let sampleProducts: Product[] = [];
              
              if (sampleProductsStr) {
                sampleProducts = JSON.parse(sampleProductsStr);
                product = sampleProducts.find(p => p._id === id);
              }
            }
          }
          
          if (product) {
            set({ currentProduct: product, isLoading: false });
            get().addToRecentlyViewed(product);
            get().findRelatedProducts(product);
            return product;
          } else {
            set({ 
              error: `Product with ID ${id} not found`, 
              isLoading: false,
              currentProduct: null 
            });
            return null;
          }
        } catch (error) {
          console.error('Error fetching product:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch product', 
            isLoading: false,
            currentProduct: null
          });
          return null;
        }
      },
      
      // Add a product to recently viewed
      addToRecentlyViewed: (product: Product) => {
        const { recentlyViewed } = get();
        
        // Remove the product if it's already in the list
        const filteredList = recentlyViewed.filter(p => p._id !== product._id);
        
        // Add the product to the beginning of the list
        const updatedList = [product, ...filteredList].slice(0, 5); // Keep only the 5 most recent
        
        set({ recentlyViewed: updatedList });
      },
      
      // Find related products based on category and tags
      findRelatedProducts: (product: Product) => {
        const { products } = get();
        
        // Filter products by same category or matching tags
        const related = products.filter(p => 
          p._id !== product._id && (
            p.category === product.category ||
            p.tags.some(tag => product.tags.includes(tag)) ||
            p.artisan._id === product.artisan._id
          )
        );
        
        // Sort by relevance (number of matching tags)
        const sortedRelated = related.sort((a, b) => {
          const aMatchingTags = a.tags.filter(tag => product.tags.includes(tag)).length;
          const bMatchingTags = b.tags.filter(tag => product.tags.includes(tag)).length;
          
          if (a.category === product.category && b.category !== product.category) return -1;
          if (a.category !== product.category && b.category === product.category) return 1;
          
          return bMatchingTags - aMatchingTags;
        });
        
        set({ relatedProducts: sortedRelated.slice(0, 4) }); // Show up to 4 related products
      },
      
      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'product-store', // Name for localStorage
      partialize: (state) => ({ 
        recentlyViewed: state.recentlyViewed 
      }), // Only persist recentlyViewed
    }
  )
);

export default useProductStore;
