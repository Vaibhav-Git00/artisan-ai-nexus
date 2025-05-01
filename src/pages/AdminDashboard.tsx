import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Package, 
  ShoppingBag, 
  BarChart3,
  CheckCircle,
  AlertCircle,
  Settings,
  FileText,
  BookOpen
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    pendingApprovals: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Admin Dashboard | ArtisanLink';
    
    // Simulate loading data
    const loadData = async () => {
      setLoading(true);
      // In a real app, you would fetch stats from an API
      setTimeout(() => {
        setStats({
          users: 120,
          products: 450,
          orders: 78,
          pendingApprovals: 12
        });
        setLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {user?.name || 'Admin'}! Manage the ArtisanLink platform.
            </p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <h3 className="text-2xl font-bold mt-1">{loading ? '...' : stats.users}</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <h3 className="text-2xl font-bold mt-1">{loading ? '...' : stats.products}</h3>
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
                  <h3 className="text-2xl font-bold mt-1">{loading ? '...' : stats.orders}</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                  <h3 className="text-2xl font-bold mt-1">{loading ? '...' : stats.pendingApprovals}</h3>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage all users on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-grow">
                          <Skeleton className="h-4 w-1/3" />
                          <Skeleton className="h-3 w-1/4" />
                        </div>
                        <Skeleton className="h-8 w-20 rounded-md" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="mx-auto mb-4 text-muted-foreground" size={48} />
                    <h3 className="text-lg font-medium mb-2">User Management</h3>
                    <p className="text-muted-foreground mb-4">
                      This is a placeholder for the user management interface.
                    </p>
                    <Button variant="outline">View All Users</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>
                  Review and manage product listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <h3 className="text-lg font-medium mb-2">Product Management</h3>
                  <p className="text-muted-foreground mb-4">
                    This is a placeholder for the product management interface.
                  </p>
                  <Button variant="outline">View All Products</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>
                  Track and manage customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <h3 className="text-lg font-medium mb-2">Order Management</h3>
                  <p className="text-muted-foreground mb-4">
                    This is a placeholder for the order management interface.
                  </p>
                  <Button variant="outline">View All Orders</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Training Module Management</CardTitle>
                <CardDescription>
                  Create and manage training content for artisans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BookOpen className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <h3 className="text-lg font-medium mb-2">Training Management</h3>
                  <p className="text-muted-foreground mb-4">
                    This is a placeholder for the training module management interface.
                  </p>
                  <Button variant="outline">Manage Training Modules</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>
                  Configure global settings for the ArtisanLink platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <h3 className="text-lg font-medium mb-2">Platform Settings</h3>
                  <p className="text-muted-foreground mb-4">
                    This is a placeholder for the platform settings interface.
                  </p>
                  <Button variant="outline">Manage Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
