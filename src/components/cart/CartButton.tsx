import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '@/store/useCartStore';

const CartButton: React.FC = () => {
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={toggleCart}
      aria-label="Open cart"
    >
      <ShoppingBag size={20} />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-artisan-terracotta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {totalItems}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default CartButton;
