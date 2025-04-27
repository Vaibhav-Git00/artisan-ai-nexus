
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-artisan-light border-b border-artisan-sand sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-artisan-terracotta rounded-full flex items-center justify-center">
            <span className="font-display text-xl text-white">A</span>
          </div>
          <span className="font-display text-2xl hidden sm:block">
            Artisan<span className="text-artisan-terracotta">Link</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/marketplace" className="text-artisan-dark hover:text-artisan-terracotta transition-colors">
            Marketplace
          </Link>
          <Link to="/stories" className="text-artisan-dark hover:text-artisan-terracotta transition-colors">
            Artisan Stories
          </Link>
          <Link to="/training" className="text-artisan-dark hover:text-artisan-terracotta transition-colors">
            Training Portal
          </Link>
          <Link to="/about" className="text-artisan-dark hover:text-artisan-terracotta transition-colors">
            About
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <User size={16} />
              <span>Login</span>
            </Button>
          </Link>
          <Link to="/cart">
            <Button size="icon" variant="ghost">
              <ShoppingBag size={20} />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden p-2"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-artisan-light border-b border-artisan-sand animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/marketplace" 
              className="p-2 hover:bg-artisan-sand/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              to="/stories" 
              className="p-2 hover:bg-artisan-sand/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Artisan Stories
            </Link>
            <Link 
              to="/training" 
              className="p-2 hover:bg-artisan-sand/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Training Portal
            </Link>
            <Link 
              to="/about" 
              className="p-2 hover:bg-artisan-sand/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-2 flex flex-col space-y-2 border-t border-artisan-sand">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <User size={16} className="mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingBag size={16} className="mr-2" />
                  Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
