import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useCartStore from '@/store/useCartStore';

const MiniCart: React.FC = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity,
    getTotalItems,
    getTotalPrice
  } = useCartStore();

  // Format the price with commas and currency symbol
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeCart}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b">
              <div className="flex items-center">
                <ShoppingBag size={20} className="mr-2 text-artisan-terracotta" />
                <h2 className="font-medium">Your Cart ({getTotalItems()})</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={closeCart}>
                <X size={20} />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-4">
                    Add items from the marketplace to get started.
                  </p>
                  <Button asChild onClick={closeCart}>
                    <Link to="/marketplace">Browse Marketplace</Link>
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <motion.li
                      key={item.product._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-3 border rounded-lg p-3"
                    >
                      {/* Product Image */}
                      <Link 
                        to={`/products/${item.product._id}`} 
                        className="flex-shrink-0"
                        onClick={closeCart}
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/products/${item.product._id}`}
                          className="font-medium line-clamp-1 hover:text-artisan-terracotta transition-colors"
                          onClick={closeCart}
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">
                          {formatPrice(item.product.price)} each
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus size={14} />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 ml-auto text-muted-foreground hover:text-red-500"
                            onClick={() => removeItem(item.product._id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">{formatPrice(getTotalPrice())}</span>
                  </div>

                  <Button className="w-full bg-artisan-terracotta hover:bg-artisan-terracotta/90">
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;
