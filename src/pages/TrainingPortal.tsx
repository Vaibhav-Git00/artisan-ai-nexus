import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import TrainingPortalComponent from '@/components/training/TrainingPortal';

const TrainingPortalPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Training Portal | ArtisanLink';
  }, []);
  
  return (
    <Layout>
      <TrainingPortalComponent />
    </Layout>
  );
};

export default TrainingPortalPage;
