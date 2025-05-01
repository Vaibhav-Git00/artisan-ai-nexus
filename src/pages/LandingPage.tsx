import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Leaf,
  ShoppingBag,
  Video,
  BookOpen,
  Heart,
  ArrowRight,
  Palette,
  Globe,
  DollarSign,
  Users,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';

const LandingPage = () => {
  const { isLoggedIn, isArtisan, isBuyer } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-artisan-terracotta/10 to-transparent">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Connecting <span className="text-artisan-terracotta">Artisans</span> with Global Buyers
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                Discover unique handcrafted products while supporting traditional artisans and sustainable practices.
              </p>
              <div className="flex flex-wrap gap-4">
                {isLoggedIn ? (
                  <>
                    {isArtisan && (
                      <Button size="lg" className="bg-artisan-terracotta hover:bg-artisan-terracotta/90" asChild>
                        <Link to="/artisan-dashboard">
                          <Palette size={18} className="mr-2" />
                          Go to Dashboard
                        </Link>
                      </Button>
                    )}
                    {isBuyer && (
                      <Button size="lg" className="bg-artisan-terracotta hover:bg-artisan-terracotta/90" asChild>
                        <Link to="/marketplace">
                          <ShoppingBag size={18} className="mr-2" />
                          Browse Marketplace
                        </Link>
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button size="lg" className="bg-artisan-terracotta hover:bg-artisan-terracotta/90" asChild>
                      <Link to="/marketplace">
                        <ShoppingBag size={18} className="mr-2" />
                        Browse Marketplace
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/signup">
                        Join ArtisanLink
                        <ChevronRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1606509036992-4399d5c5afe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Artisan crafting a product"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <Leaf className="text-green-600 mr-2" size={16} />
                    <span className="text-sm font-medium">Eco Score: 9.2/10</span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-artisan-terracotta/20 flex items-center justify-center flex-shrink-0">
                    <Video size={20} className="text-artisan-terracotta" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Artisan Stories</h3>
                    <p className="text-xs text-muted-foreground">
                      Watch the journey behind each handcrafted product
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-bold mb-4"
            >
              Why Choose ArtisanLink?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Our platform offers unique features designed to connect artisans with buyers while promoting sustainability and cultural preservation.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Leaf className="text-green-600" size={24} />
                  </div>
                  <CardTitle>Eco-Score System</CardTitle>
                  <CardDescription>
                    Every product is rated based on sustainability metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our proprietary Eco-Score system evaluates products based on materials, production process, and environmental impact, helping you make sustainable choices.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto" asChild>
                    <Link to="/about-eco-score" className="flex items-center text-artisan-terracotta">
                      Learn more <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Video className="text-blue-600" size={24} />
                  </div>
                  <CardTitle>Artisan Storytelling</CardTitle>
                  <CardDescription>
                    Connect with the makers through immersive stories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Watch videos and read stories directly from artisans about their craft, traditions, and the cultural significance behind each product.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto" asChild>
                    <Link to="/artisan-stories" className="flex items-center text-artisan-terracotta">
                      Watch stories <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                    <DollarSign className="text-yellow-600" size={24} />
                  </div>
                  <CardTitle>Fair Pricing System</CardTitle>
                  <CardDescription>
                    Ensuring artisans receive fair compensation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our transparent pricing model ensures artisans receive fair compensation for their work while providing buyers with authentic handcrafted products at reasonable prices.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto" asChild>
                    <Link to="/fair-pricing" className="flex items-center text-artisan-terracotta">
                      How it works <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <BookOpen className="text-purple-600" size={24} />
                  </div>
                  <CardTitle>Training Portal</CardTitle>
                  <CardDescription>
                    Empowering artisans with business skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Artisans gain access to training modules on product photography, pricing strategies, packaging, and digital marketing to help grow their business.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto" asChild>
                    <Link to="/training" className="flex items-center text-artisan-terracotta">
                      Explore training <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                    <Heart className="text-pink-600" size={24} />
                  </div>
                  <CardTitle>Cultural Preservation</CardTitle>
                  <CardDescription>
                    Protecting traditional crafts and techniques
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We document and preserve traditional crafting techniques, creating a digital archive of cultural heritage that might otherwise be lost to time.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto" asChild>
                    <Link to="/cultural-archive" className="flex items-center text-artisan-terracotta">
                      View archive <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                    <Globe className="text-orange-600" size={24} />
                  </div>
                  <CardTitle>Global Marketplace</CardTitle>
                  <CardDescription>
                    Connecting artisans to worldwide customers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our platform breaks down geographical barriers, allowing artisans from remote regions to reach customers around the world.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto" asChild>
                    <Link to="/marketplace" className="flex items-center text-artisan-terracotta">
                      Browse marketplace <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-artisan-terracotta/10 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Join Our Growing Community
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Whether you're an artisan looking to showcase your craft or a buyer seeking unique handmade products, ArtisanLink is the platform for you.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-artisan-terracotta hover:bg-artisan-terracotta/90" asChild>
                    <Link to="/signup?role=artisan">
                      <Palette size={18} className="mr-2" />
                      Join as Artisan
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/signup?role=buyer">
                      <ShoppingBag size={18} className="mr-2" />
                      Join as Buyer
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Users size={20} className="text-artisan-terracotta" />
                      <span className="font-medium">5,000+</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Artisans Worldwide</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={20} className="text-artisan-terracotta" />
                      <span className="font-medium">25,000+</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Unique Products</p>
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Globe size={20} className="text-artisan-terracotta" />
                      <span className="font-medium">50+</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Countries Represented</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Heart size={20} className="text-artisan-terracotta" />
                      <span className="font-medium">100,000+</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-display font-bold">Featured Products</h2>
              <p className="text-muted-foreground">Discover handcrafted treasures from around the world</p>
            </div>
            <Button asChild>
              <Link to="/marketplace" className="flex items-center">
                View All Products
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would be a component that fetches and displays featured products */}
            {/* For now, we'll use placeholder cards */}
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={`https://images.unsplash.com/photo-158${i}283367830-7875dd4543a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80`}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                      <Leaf size={12} />
                      <span className="text-xs font-medium">8.{i}/10</span>
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">Handcrafted Product {i}</h3>
                  <p className="text-sm text-muted-foreground mb-2">₹{i * 1000}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>Rajasthan, India</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
