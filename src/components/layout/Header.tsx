
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  ShoppingBag,
  Palette,
  LogOut,
  Package,
  BookOpen,
  Heart,
  Settings,
  BarChart3,
  Clock,
  Users,
  Video,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartButton from '@/components/cart/CartButton';
import useCartStore from '@/store/useCartStore';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, isArtisan, isBuyer, isAdmin, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

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

          {isLoggedIn && isArtisan && (
            <>
              <Link to="/artisan-dashboard" className="text-artisan-dark hover:text-artisan-terracotta transition-colors">
                Dashboard
              </Link>
              <Link to="/product-upload" className="text-artisan-dark hover:text-artisan-terracotta transition-colors">
                Upload Product
              </Link>
              <Link to="/training" className="text-artisan-dark hover:text-artisan-terracotta transition-colors">
                Training
              </Link>
            </>
          )}

          {isLoggedIn && isBuyer && (
            <>
              <Link to="/buyer-dashboard" className="text-artisan-dark hover:text-artisan-terracotta transition-colors">
                Dashboard
              </Link>
              <Link to="/favorites" className="text-artisan-dark hover:text-artisan-terracotta transition-colors">
                Favorites
              </Link>
            </>
          )}

          {isLoggedIn && isAdmin && (
            <Link to="/admin-dashboard" className="text-artisan-dark hover:text-artisan-terracotta transition-colors">
              Admin
            </Link>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/stories" className="text-artisan-dark hover:text-artisan-terracotta transition-colors">
                Artisan Stories
              </Link>
              <Link to="/about" className="text-artisan-dark hover:text-artisan-terracotta transition-colors">
                About
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User size={16} />
                  )}
                  <span className="max-w-[100px] truncate">{user?.name || 'User'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  {isArtisan && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/artisan-dashboard')}>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/product-upload')}>
                        <Package className="mr-2 h-4 w-4" />
                        <span>Upload Product</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/training')}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>Training Portal</span>
                      </DropdownMenuItem>
                    </>
                  )}

                  {isBuyer && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/buyer-dashboard')}>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/orders')}>
                        <Clock className="mr-2 h-4 w-4" />
                        <span>My Orders</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/favorites')}>
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favorite Artisans</span>
                      </DropdownMenuItem>
                    </>
                  )}

                  {isAdmin && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/admin-dashboard')}>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/admin/users')}>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Manage Users</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/admin/products')}>
                        <Package className="mr-2 h-4 w-4" />
                        <span>Manage Products</span>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/signup?role=artisan">
                <Button variant="outline" size="sm" className="flex items-center space-x-1 border-artisan-terracotta text-artisan-terracotta hover:bg-artisan-terracotta/10">
                  <Palette size={16} />
                  <span>Join as Artisan</span>
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <User size={16} />
                  <span>Login</span>
                </Button>
              </Link>
            </>
          )}
          <CartButton />
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
              <ShoppingBag size={16} className="inline-block mr-2" />
              Marketplace
            </Link>

            {isLoggedIn && isArtisan && (
              <>
                <Link
                  to="/artisan-dashboard"
                  className="p-2 hover:bg-artisan-sand/20 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart3 size={16} className="inline-block mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/product-upload"
                  className="p-2 hover:bg-artisan-sand/20 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package size={16} className="inline-block mr-2" />
                  Upload Product
                </Link>
                <Link
                  to="/training"
                  className="p-2 hover:bg-artisan-sand/20 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen size={16} className="inline-block mr-2" />
                  Training Portal
                </Link>
              </>
            )}

            {isLoggedIn && isBuyer && (
              <>
                <Link
                  to="/buyer-dashboard"
                  className="p-2 hover:bg-artisan-sand/20 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart3 size={16} className="inline-block mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/orders"
                  className="p-2 hover:bg-artisan-sand/20 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Clock size={16} className="inline-block mr-2" />
                  My Orders
                </Link>
                <Link
                  to="/favorites"
                  className="p-2 hover:bg-artisan-sand/20 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={16} className="inline-block mr-2" />
                  Favorite Artisans
                </Link>
              </>
            )}

            {isLoggedIn && isAdmin && (
              <Link
                to="/admin-dashboard"
                className="p-2 hover:bg-artisan-sand/20 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings size={16} className="inline-block mr-2" />
                Admin Dashboard
              </Link>
            )}

            {!isLoggedIn && (
              <>
                <Link
                  to="/stories"
                  className="p-2 hover:bg-artisan-sand/20 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Video size={16} className="inline-block mr-2" />
                  Artisan Stories
                </Link>
                <Link
                  to="/about"
                  className="p-2 hover:bg-artisan-sand/20 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info size={16} className="inline-block mr-2" />
                  About
                </Link>
              </>
            )}

            <div className="pt-2 flex flex-col space-y-2 border-t border-artisan-sand">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User size={16} className="mr-2" />
                      My Profile
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signup?role=artisan" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start border-artisan-terracotta text-artisan-terracotta">
                      <Palette size={16} className="mr-2" />
                      Join as Artisan
                    </Button>
                  </Link>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User size={16} className="mr-2" />
                      Login
                    </Button>
                  </Link>
                </>
              )}
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setIsMenuOpen(false);
                  // Use the cart store to open the cart
                  useCartStore.getState().openCart();
                }}
              >
                <ShoppingBag size={16} className="mr-2" />
                Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
