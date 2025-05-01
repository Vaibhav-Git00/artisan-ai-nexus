import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import StorySubmissionForm from '@/components/stories/StorySubmissionForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const StorySubmissionPage: React.FC = () => {
  const { productId } = useParams<{ productId?: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Share Your Story | ArtisanLink';
  }, []);
  
  const handleSuccess = (storyId: string) => {
    if (productId) {
      navigate(`/products/${productId}`);
    } else {
      navigate('/marketplace');
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="p-0 h-auto">
            <Link to={productId ? `/products/${productId}` : '/marketplace'} className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft size={16} className="mr-2" />
              {productId ? 'Back to Product' : 'Back to Marketplace'}
            </Link>
          </Button>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <StorySubmissionForm 
            productId={productId} 
            onSuccess={handleSuccess} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default StorySubmissionPage;
