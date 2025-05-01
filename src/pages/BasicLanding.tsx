import React from 'react';

const BasicLanding = () => {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
        Welcome to ArtisanLink
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Connecting artisans with global buyers while promoting sustainability and cultural preservation.
      </p>
      <div>
        <a 
          href="/marketplace" 
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#E07A5F',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            marginRight: '10px'
          }}
        >
          Browse Marketplace
        </a>
        <a 
          href="/signup" 
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            border: '1px solid #333',
            color: '#333',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Join ArtisanLink
        </a>
      </div>
    </div>
  );
};

export default BasicLanding;
