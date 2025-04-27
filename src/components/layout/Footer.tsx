
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-artisan-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-artisan-terracotta rounded-full flex items-center justify-center">
                <span className="font-display text-xl text-white">A</span>
              </div>
              <span className="font-display text-2xl">
                Artisan<span className="text-artisan-terracotta">Link</span>
              </span>
            </Link>
            <p className="text-sm text-gray-300">
              Connecting artisans with global markets, while preserving cultural heritage and promoting sustainable craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-artisan-terracotta transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-artisan-terracotta transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-artisan-terracotta transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-artisan-terracotta transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link to="/stories" className="hover:text-white transition-colors">Artisan Stories</Link></li>
              <li><Link to="/training" className="hover:text-white transition-colors">Training Portal</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Help & Information */}
          <div>
            <h3 className="font-display text-lg mb-4">Help & Information</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-display text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: hello@artisanlink.org</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Craft Street, Artisan Valley</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ArtisanLink. All rights reserved.</p>
          <p className="mt-2">Supporting artisans and preserving cultural heritage worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
