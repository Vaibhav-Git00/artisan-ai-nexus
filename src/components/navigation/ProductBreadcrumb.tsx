import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import useProductStore from '@/store/useProductStore';

interface ProductBreadcrumbProps {
  productId?: string;
  productName?: string;
  categoryName?: string;
  categoryHref?: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({
  productId,
  productName,
  categoryName,
  categoryHref,
}) => {
  const { currentProduct } = useProductStore();
  
  // Use provided values or get from current product
  const name = productName || currentProduct?.name || 'Product';
  const category = categoryName || currentProduct?.category || 'All Products';
  const categoryLink = categoryHref || `/marketplace?category=${encodeURIComponent(category)}`;

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home size={14} className="mr-1" />
              <span className="sr-only">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/marketplace">Marketplace</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={categoryLink}>{category}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbPage>{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ProductBreadcrumb;
