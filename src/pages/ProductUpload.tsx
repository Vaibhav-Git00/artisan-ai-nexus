import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import NewProductUploadForm from '@/components/products/NewProductUploadForm';

const ProductUploadPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Upload Product | ArtisanLink';
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="p-0 h-auto">
            <Link to="/marketplace" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft size={16} className="mr-2" />
              Back to Marketplace
            </Link>
          </Button>
        </div>

        <div className="max-w-3xl mx-auto">
          <NewProductUploadForm />
        </div>
      </div>
    </Layout>
  );
};

export default ProductUploadPage;
