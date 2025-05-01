import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, Filter, Leaf, Plus, Grid3X3, List } from 'lucide-react';
import { getProductsByArtisan } from '@/services/productService';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Sample product data
const sampleProducts = [
  {
    _id: '1',
    name: 'Madhubani Painting - Tree of Life',
    price: 2500,
    images: ['https://images.unsplash.com/photo-1584283367830-7875dd4543a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'],
    category: 'Painting',
    artisan: {
      _id: 'a1',
      name: 'Lakshmi Devi',
      location: 'Bihar, India'
    },
    ecoScore: {
      score: 8.5
    },
    storySnippet: 'This traditional Madhubani painting depicts the Tree of Life, a symbol of harmony between nature and humanity. Created using natural pigments on handmade paper.',
    storyVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    storyVideoType: 'upload'
  },
  {
    _id: '2',
    name: 'Handwoven Bamboo Basket',
    price: 1200,
    images: ['https://images.unsplash.com/photo-1595397551849-e31e17f64ea7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'],
    category: 'Basketry',
    artisan: {
      _id: 'a2',
      name: 'Rajesh Kumar',
      location: 'Assam, India'
    },
    ecoScore: {
      score: 9.2
    },
    storySnippet: 'Meticulously crafted using traditional weaving techniques passed down through generations. Each basket takes 3-4 days to complete.',
    storyVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    storyVideoType: 'youtube'
  },
  {
    _id: '3',
    name: 'Terracotta Decorative Pot',
    price: 800,
    images: ['https://images.unsplash.com/photo-1605365070248-299a182a2ca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'],
    category: 'Pottery',
    artisan: {
      _id: 'a3',
      name: 'Anita Mehra',
      location: 'Rajasthan, India'
    },
    ecoScore: {
      score: 7.8
    },
    storySnippet: 'Hand-shaped and fired using traditional methods. The intricate patterns are inspired by ancient Rajasthani motifs.',
    storyVideo: 'https://vimeo.com/76979871',
    storyVideoType: 'vimeo'
  },
  {
    _id: '4',
    name: 'Handloom Cotton Saree',
    price: 3500,
    images: ['https://images.unsplash.com/photo-1610189020382-9a4a4a5fdfc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'],
    category: 'Textiles',
    artisan: {
      _id: 'a4',
      name: 'Pradeep Singh',
      location: 'Tamil Nadu, India'
    },
    ecoScore: {
      score: 8.9
    },
    storySnippet: 'Woven on a traditional handloom using organic cotton. The natural dyes are derived from plants and minerals found locally.'
  },
  {
    _id: '5',
    name: 'Dhokra Brass Figurine',
    price: 1800,
    images: ['https://images.unsplash.com/photo-1629389861081-43cc4f172b0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'],
    category: 'Metal Craft',
    artisan: {
      _id: 'a5',
      name: 'Sanjay Mahato',
      location: 'West Bengal, India'
    },
    ecoScore: {
      score: 7.5
    },
    storySnippet: 'Created using the ancient lost-wax casting technique that dates back over 4,000 years. Each piece is unique and tells a story from tribal folklore.'
  },
  {
    _id: '6',
    name: 'Pashmina Wool Shawl',
    price: 4500,
    images: ['https://images.unsplash.com/photo-1601379327928-bedfaf9da2d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'],
    category: 'Textiles',
    artisan: {
      _id: 'a6',
      name: 'Farooq Ahmad',
      location: 'Kashmir, India'
    },
    ecoScore: {
      score: 8.2
    },
    storySnippet: 'Hand-spun and woven from the finest Pashmina wool. The intricate embroidery takes months to complete and represents traditional Kashmiri motifs.'
  }
];

const Marketplace: React.FC = () => {
  const [allProducts, setAllProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [displayedProducts, setDisplayedProducts] = useState(sampleProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 5000],
    minEcoScore: 0,
    region: 'all',
    sortBy: 'default'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    document.title = 'Marketplace | ArtisanLink';
  }, []);

  // Load products from localStorage
  useEffect(() => {
    const loadProducts = () => {
      try {
        setLoading(true);
        console.log('Loading products...');

        // Create a test product if none exist
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
          storySnippet: 'This is a test product to ensure localStorage is working correctly...',
          storyVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          storyVideoType: 'upload'
        };

        // Get products directly from localStorage
        let storedProducts = [];
        try {
          const storedProductsStr = localStorage.getItem('marketplace_products');
          console.log('Raw localStorage data:', storedProductsStr);

          if (storedProductsStr) {
            storedProducts = JSON.parse(storedProductsStr);
            console.log('Parsed localStorage products:', storedProducts);
          }
        } catch (parseError) {
          console.error('Error parsing localStorage data:', parseError);
        }

        // If no products in localStorage, add the test product
        if (!storedProducts || storedProducts.length === 0) {
          console.log('No products found, creating a test product');
          localStorage.setItem('marketplace_products', JSON.stringify([testProduct]));
          storedProducts = [testProduct];
        }

        // Combine with sample products for demo purposes
        const combinedProducts = [...storedProducts, ...sampleProducts];
        console.log('Combined products:', combinedProducts);

        // Set the products in state
        setAllProducts(combinedProducts);
        setFilteredProducts(combinedProducts);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products');
        setAllProducts(sampleProducts);
        setFilteredProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter and sort products based on search query and filters
  useEffect(() => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.artisan.name.toLowerCase().includes(query) ||
        product.artisan.location.toLowerCase().includes(query) ||
        (product.storySnippet && product.storySnippet.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product =>
        product.category === filters.category
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply eco-score filter
    if (filters.minEcoScore > 0) {
      filtered = filtered.filter(product =>
        product.ecoScore.score >= filters.minEcoScore
      );
    }

    // Apply region filter
    if (filters.region !== 'all') {
      filtered = filtered.filter(product =>
        product.artisan.location.includes(filters.region)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'eco_score':
        filtered.sort((a, b) => b.ecoScore.score - a.ecoScore.score);
        break;
      case 'newest':
        // Sort by ID as a proxy for creation date in our demo
        filtered.sort((a, b) => {
          // Extract timestamp from ID if possible, otherwise use string comparison
          const aId = a._id.includes('-') ? parseInt(a._id.split('-')[1]) : a._id;
          const bId = b._id.includes('-') ? parseInt(b._id.split('-')[1]) : b._id;

          if (typeof aId === 'number' && typeof bId === 'number') {
            return bId - aId; // Descending order for newest first
          }
          return String(bId).localeCompare(String(aId));
        });
        break;
      default:
        // Default sorting (featured/relevance)
        break;
    }

    // Update filtered products and reset to first page when filters change
    setFilteredProducts(filtered);
    setCurrentPage(1);

    // Calculate total pages
    setTotalPages(Math.ceil(filtered.length / productsPerPage));
  }, [searchQuery, filters, allProducts, productsPerPage]);

  // Handle pagination - update displayed products based on current page
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage, productsPerPage]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    window.scrollTo({
      top: document.getElementById('products-grid')?.offsetTop - 100 || 0,
      behavior: 'smooth'
    });
  };

  // Toggle view between grid and list (for future implementation)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Artisan Marketplace</h1>
            <p className="text-muted-foreground">Discover unique handcrafted products from artisans across India</p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, artisans..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-muted' : ''}
            >
              <Filter size={18} />
            </Button>
            <Button
              className="bg-artisan-terracotta hover:bg-artisan-terracotta/90 hidden md:flex"
              asChild
            >
              <Link to="/product-upload">
                <Plus size={16} className="mr-2" />
                List Product
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-muted/30 rounded-lg p-4 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <Label className="mb-2 block">Category</Label>
              <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Painting">Painting</SelectItem>
                  <SelectItem value="Pottery">Pottery</SelectItem>
                  <SelectItem value="Textiles">Textiles</SelectItem>
                  <SelectItem value="Woodwork">Woodwork</SelectItem>
                  <SelectItem value="Jewelry">Jewelry</SelectItem>
                  <SelectItem value="Basketry">Basketry</SelectItem>
                  <SelectItem value="Metal Craft">Metal Craft</SelectItem>
                  <SelectItem value="Leatherwork">Leatherwork</SelectItem>
                  <SelectItem value="Glasswork">Glasswork</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Price Range</Label>
              <div className="pt-4 px-2">
                <Slider
                  value={filters.priceRange}
                  min={0}
                  max={5000}
                  step={100}
                  onValueChange={(value) => handleFilterChange('priceRange', value)}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>₹{filters.priceRange[0]}</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Minimum Eco-Score</Label>
                <span className="text-sm font-medium">{filters.minEcoScore}/10</span>
              </div>
              <div className="pt-4 px-2">
                <Slider
                  value={[filters.minEcoScore]}
                  min={0}
                  max={10}
                  step={0.5}
                  onValueChange={(value) => handleFilterChange('minEcoScore', value[0])}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>0</span>
                  <span className="flex items-center">
                    <Leaf size={12} className="mr-1" /> 10
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Region</Label>
              <Select
                value={filters.region}
                onValueChange={(value) => handleFilterChange('region', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Bihar">Bihar</SelectItem>
                  <SelectItem value="Assam">Assam</SelectItem>
                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="West Bengal">West Bengal</SelectItem>
                  <SelectItem value="Kashmir">Kashmir</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Sort By</Label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange('sortBy', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Featured</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="eco_score">Eco-Score</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Products Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            {!loading && !error && (
              <p className="text-muted-foreground">
                Showing {filteredProducts.length > 0 ? (currentPage - 1) * productsPerPage + 1 : 0}-
                {Math.min(currentPage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className={`rounded-r-none ${viewMode === 'grid' ? 'bg-artisan-terracotta hover:bg-artisan-terracotta/90' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                className={`rounded-l-none ${viewMode === 'list' ? 'bg-artisan-terracotta hover:bg-artisan-terracotta/90' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </Button>
            </div>

            <Select
              value={productsPerPage.toString()}
              onValueChange={(value) => setProductsPerPage(parseInt(value))}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Products per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4 per page</SelectItem>
                <SelectItem value="8">8 per page</SelectItem>
                <SelectItem value="12">12 per page</SelectItem>
                <SelectItem value="16">16 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div id="products-grid">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-artisan-terracotta mb-4"></div>
              <h3 className="text-xl font-medium mb-2">Loading products...</h3>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Error loading products</h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className={viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
              }>
                {displayedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                          }}
                        />
                      </PaginationItem>
                    )}

                    {/* First page */}
                    {currentPage > 3 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                          }}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Ellipsis */}
                    {currentPage > 4 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Calculate the page number to display
                      let pageNum;
                      if (currentPage <= 3) {
                        // If we're at the beginning, show pages 1-5
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        // If we're at the end, show the last 5 pages
                        pageNum = totalPages - 4 + i;
                      } else {
                        // Otherwise, show 2 pages before and 2 pages after current
                        pageNum = currentPage - 2 + i;
                      }

                      // Only show if the page number is valid
                      if (pageNum > 0 && pageNum <= totalPages) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href="#"
                              isActive={pageNum === currentPage}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(pageNum);
                              }}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}

                    {/* Ellipsis */}
                    {currentPage < totalPages - 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Last page */}
                    {currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                          }}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                          }}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Mobile Add Product Button */}
        <div className="md:hidden fixed bottom-6 right-6">
          <Button
            className="bg-artisan-terracotta hover:bg-artisan-terracotta/90 rounded-full h-14 w-14 shadow-lg"
            size="icon"
            asChild
          >
            <Link to="/product-upload">
              <Plus size={24} />
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Marketplace;
