import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TestLandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to ArtisanLink</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
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
  );
};

export default TestLandingPage;
