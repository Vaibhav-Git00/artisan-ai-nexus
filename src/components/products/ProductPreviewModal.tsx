import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ProductPreviewCard from './ProductPreviewCard';

interface ProductPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    images: string[];
    category: string;
    artisan: {
      name: string;
      location: string;
    };
    ecoScore: {
      score: number;
    };
  };
  onViewMarketplace: () => void;
  onEditProduct: () => void;
}

const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({
  isOpen,
  onClose,
  product,
  onViewMarketplace,
  onEditProduct,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Product Preview</DialogTitle>
        </DialogHeader>
        <ProductPreviewCard 
          product={product} 
          onViewMarketplace={onViewMarketplace}
          onEditProduct={onEditProduct}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductPreviewModal;
