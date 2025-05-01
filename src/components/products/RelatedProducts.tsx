import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import useProductStore from '@/store/useProductStore';

const RelatedProducts: React.FC = () => {
  const { relatedProducts } = useProductStore();

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-16"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">You May Also Like</h2>
        <Link 
          to="/marketplace" 
          className="text-artisan-terracotta hover:text-artisan-terracotta/80 flex items-center"
        >
          View All <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RelatedProducts;
