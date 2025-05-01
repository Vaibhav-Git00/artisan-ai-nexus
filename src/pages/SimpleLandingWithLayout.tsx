import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const SimpleLandingWithLayout = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Welcome to <span className="text-artisan-terracotta">ArtisanLink</span>
          </h1>
          <p className="text-xl mb-8">
            Connecting artisans with global buyers while promoting sustainability and cultural preservation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-artisan-terracotta hover:bg-artisan-terracotta/90">
              <Link to="/marketplace">Browse Marketplace</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/signup">Join ArtisanLink</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimpleLandingWithLayout;
