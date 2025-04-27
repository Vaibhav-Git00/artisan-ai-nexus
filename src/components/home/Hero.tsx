
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-artisan-sand/30 to-artisan-light py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-artisan-yellow/10 rounded-full"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-artisan-terracotta/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-artisan-green/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Connecting <span className="text-artisan-terracotta">Artisans</span><br />
              to the Global Market
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Empowering craftspeople to preserve cultural heritage while
              building sustainable livelihoods through digital innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link to="/marketplace">
                <Button className="bg-artisan-terracotta hover:bg-artisan-terracotta/90 text-white px-6">
                  Explore Marketplace
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="border-artisan-terracotta text-artisan-terracotta hover:bg-artisan-terracotta/10">
                  Join as Artisan
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1590340634829-b59fbecdb1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Artisan at work" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="bg-artisan-green/90 text-white px-3 py-1 rounded-full text-sm inline-block w-fit mb-2">Featured Artisan</span>
                <h3 className="font-display text-xl text-white">Maya's Traditional Textile Workshop</h3>
                <p className="text-white/80">Preserving ancient weaving techniques from the Andes</p>
              </div>
            </div>
            
            {/* Floating stats cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-[160px]">
              <p className="font-display text-xl font-bold text-artisan-terracotta">1,200+</p>
              <p className="text-sm text-muted-foreground">Artisans Empowered</p>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-[160px]">
              <p className="font-display text-xl font-bold text-artisan-green">85%</p>
              <p className="text-sm text-muted-foreground">Income Increase</p>
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">Trusted By Organizations Worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70">
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">UNESCO</div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Fair Trade</div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">World Crafts</div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Artisan Guild</div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Craft Council</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
