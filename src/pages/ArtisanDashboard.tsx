import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  PlusCircle, 
  BookOpen, 
  User, 
  BarChart3, 
  ShoppingBag,
  Clock,
  AlertCircle
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { getProductsByArtisan } from '@/services/productService';

const ArtisanDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Artisan Dashboard | ArtisanLink';
    
    const loadProducts = async () => {
      try {
        setLoading(true);
        if (user?._id) {
          const response = await getProductsByArtisan(user._id);
          if (response.success && response.data.products) {
            setProducts(response.data.products);
          }
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [user]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Artisan Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name || 'Artisan'}! Manage your products and stories.
            </p>
          </div>
          
          <Button className="bg-artisan-terracotta hover:bg-artisan-terracotta/90" asChild>
            <Link to="/product-upload">
              <PlusCircle size={16} className="mr-2" />
              Upload New Product
            </Link>
          </Button>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <h3 className="text-2xl font-bold mt-1">{loading ? '...' : products.length}</h3>
                </div>
                <div className="h-12 w-12 bg-artisan-terracotta/10 rounded-full flex items-center justify-center">
                  <Package className="text-artisan-terracotta" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold mt-1">0</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                  <h3 className="text-2xl font-bold mt-1">0</h3>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Eco Score</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loading ? '...' : products.length > 0 
                      ? (products.reduce((sum, p) => sum + (p.ecoScore?.score || 0), 0) / products.length).toFixed(1)
                      : 'N/A'
                    }
                  </h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader className="p-0">
                      <Skeleton className="h-48 w-full rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product._id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <img 
                        src={product.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'} 
                        alt={product.name}
                        className="h-48 w-full object-cover"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">₹{product.price}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                          Eco Score: {product.ecoScore?.score.toFixed(1) || 'N/A'}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/products/${product._id}`}>View</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/product-upload?edit=${product._id}`}>Edit</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertCircle className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <h3 className="text-lg font-medium mb-2">No Products Found</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't uploaded any products yet. Start by creating your first product listing.
                  </p>
                  <Button className="bg-artisan-terracotta hover:bg-artisan-terracotta/90" asChild>
                    <Link to="/product-upload">
                      <PlusCircle size={16} className="mr-2" />
                      Upload New Product
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  Manage your customer orders and track shipments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
                  <p className="text-muted-foreground">
                    When customers place orders for your products, they will appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Training Portal</CardTitle>
                <CardDescription>
                  Access training materials to improve your craft and business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Mobile Photography</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Learn how to take professional product photos using just your smartphone.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/training">View Course</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pricing Strategies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Discover how to price your products for maximum profit and sales.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/training">View Course</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Packaging Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Learn eco-friendly packaging methods that protect your products during shipping.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/training">View Course</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/training">
                    <BookOpen size={16} className="mr-2" />
                    View All Training Modules
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Artisan Profile</CardTitle>
                <CardDescription>
                  Manage your profile information and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {user?.profileImage ? (
                        <img 
                          src={user.profileImage} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={48} className="text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                      <p className="text-lg">{user?.name || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                      <p className="text-lg">{user?.email || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                      <p className="text-lg">{user?.location || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                      <p className="text-lg">{user?.bio || 'No bio provided'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <User size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ArtisanDashboard;
