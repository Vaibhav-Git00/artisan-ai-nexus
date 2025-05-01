import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Clock,
  Package,
  MapPin,
  Search,
  AlertCircle
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [favoriteArtisans, setFavoriteArtisans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Buyer Dashboard | ArtisanLink';
    
    // Simulate loading data
    const loadData = async () => {
      setLoading(true);
      // In a real app, you would fetch orders and favorites from an API
      setTimeout(() => {
        setOrders([]);
        setFavoriteArtisans([]);
        setLoading(false);
      }, 1000);
    };
    
    loadData();
  }, [user]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Buyer Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name || 'Buyer'}! Track your orders and favorite artisans.
            </p>
          </div>
          
          <Button className="bg-artisan-terracotta hover:bg-artisan-terracotta/90" asChild>
            <Link to="/marketplace">
              <Search size={16} className="mr-2" />
              Browse Marketplace
            </Link>
          </Button>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold mt-1">{loading ? '...' : orders.length}</h3>
                </div>
                <div className="h-12 w-12 bg-artisan-terracotta/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="text-artisan-terracotta" />
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
                  <p className="text-sm text-muted-foreground">Delivered Orders</p>
                  <h3 className="text-2xl font-bold mt-1">0</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Favorite Artisans</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loading ? '...' : favoriteArtisans.length}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Heart className="text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="favorites">Favorite Artisans</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />
                        <div className="flex-grow space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                        <div className="flex-shrink-0 w-32">
                          <Skeleton className="h-8 w-full rounded-md" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order._id}>
                    <CardContent className="p-6">
                      {/* Order content would go here */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertCircle className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <h3 className="text-lg font-medium mb-2">No Orders Found</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't placed any orders yet. Start by exploring our marketplace.
                  </p>
                  <Button className="bg-artisan-terracotta hover:bg-artisan-terracotta/90" asChild>
                    <Link to="/marketplace">
                      <Search size={16} className="mr-2" />
                      Browse Marketplace
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="favorites">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
                        <div className="flex-grow space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : favoriteArtisans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteArtisans.map((artisan) => (
                  <Card key={artisan._id}>
                    <CardContent className="p-6">
                      {/* Artisan content would go here */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <h3 className="text-lg font-medium mb-2">No Favorite Artisans</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't added any artisans to your favorites yet. Explore the marketplace to discover talented artisans.
                  </p>
                  <Button className="bg-artisan-terracotta hover:bg-artisan-terracotta/90" asChild>
                    <Link to="/marketplace">
                      <Search size={16} className="mr-2" />
                      Discover Artisans
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Buyer Profile</CardTitle>
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
                      <h3 className="text-sm font-medium text-muted-foreground">Shipping Address</h3>
                      <p className="text-lg">Not provided</p>
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

export default BuyerDashboard;
