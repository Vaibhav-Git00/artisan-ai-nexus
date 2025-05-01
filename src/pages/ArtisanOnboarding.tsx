import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import ArtisanOnboardingForm from '@/components/auth/ArtisanOnboardingForm';

const ArtisanOnboarding: React.FC = () => {
  useEffect(() => {
    document.title = 'Artisan Onboarding | ArtisanLink';
  }, []);
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold">Join Our Artisan Community</h1>
            <p className="text-muted-foreground mt-2">
              Complete your profile to start showcasing and selling your crafts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="hidden md:block">
              <div className="space-y-6">
                <div className="bg-artisan-light rounded-lg p-6 border border-artisan-sand">
                  <h2 className="text-xl font-semibold mb-4">Why Join ArtisanLink?</h2>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-artisan-terracotta/20 text-artisan-terracotta flex items-center justify-center mr-3 mt-0.5">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium">Global Reach</h3>
                        <p className="text-sm text-muted-foreground">
                          Connect with customers worldwide who value authentic handcrafted products
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-artisan-terracotta/20 text-artisan-terracotta flex items-center justify-center mr-3 mt-0.5">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium">Fair Pricing</h3>
                        <p className="text-sm text-muted-foreground">
                          Our community-based pricing system ensures you receive fair compensation
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-artisan-terracotta/20 text-artisan-terracotta flex items-center justify-center mr-3 mt-0.5">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium">Tell Your Story</h3>
                        <p className="text-sm text-muted-foreground">
                          Share the story behind your craft and connect emotionally with buyers
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-artisan-terracotta/20 text-artisan-terracotta flex items-center justify-center mr-3 mt-0.5">
                        4
                      </div>
                      <div>
                        <h3 className="font-medium">Free Training</h3>
                        <p className="text-sm text-muted-foreground">
                          Access our training portal to learn digital skills and grow your business
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                    alt="Artisan crafting" 
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <p className="font-medium">
                        "ArtisanLink has helped me reach customers I never thought possible and preserve our traditional craft."
                      </p>
                      <p className="text-sm mt-2">— Lakshmi Devi, Madhubani Artist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <ArtisanOnboardingForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArtisanOnboarding;
