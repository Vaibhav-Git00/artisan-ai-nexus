
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import StoryGenerator from '@/components/ai/StoryGenerator';

const Index = () => {
  useEffect(() => {
    document.title = 'ArtisanLink - Connecting Artisans to the Global Market';
  }, []);
  
  return (
    <Layout>
      <Hero />
      <Features />
      
      {/* AI Tools Preview Section */}
      <section className="py-16 md:py-24 bg-artisan-light">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              AI-Powered Tools for Artisans
            </h2>
            <p className="text-lg text-muted-foreground">
              Our AI tools help artisans create compelling product stories, get fair pricing 
              recommendations, and assess the sustainability of their crafts.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <StoryGenerator />
          </div>
        </div>
      </section>
      
      {/* Featured Products Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold">Featured Products</h2>
            <a href="/marketplace" className="text-artisan-terracotta hover:underline font-medium">View All</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="rounded-lg overflow-hidden mb-3 relative">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors"></div>
                  <img 
                    src={`https://images.unsplash.com/photo-158423${1460 + item * 10}0-aedcb3a41aca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80`}
                    alt={`Product ${item}`} 
                    className="w-full h-64 object-cover"
                  />
                  {item % 2 === 0 && (
                    <span className="absolute top-2 right-2 bg-artisan-green/90 text-white text-xs px-2 py-1 rounded-full">
                      Eco-Friendly
                    </span>
                  )}
                </div>
                <h3 className="font-medium mb-1">Handcrafted Product {item}</h3>
                <p className="text-muted-foreground text-sm">Traditional Artisan</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-semibold">${(25 + item * 5).toFixed(2)}</span>
                  <div className="flex items-center">
                    <span className="bg-artisan-yellow/20 text-artisan-brown text-xs px-2 py-1 rounded-full">
                      Fair Price
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-artisan-terracotta text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Join the Movement
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
            Whether you're an artisan looking to expand your reach or a consumer seeking authentic handcrafted products, 
            ArtisanLink is your platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="bg-white text-artisan-terracotta font-medium py-3 px-8 rounded-md hover:bg-white/90 transition-colors">
              Create Account
            </a>
            <a href="/about" className="bg-transparent border border-white text-white font-medium py-3 px-8 rounded-md hover:bg-white/10 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
