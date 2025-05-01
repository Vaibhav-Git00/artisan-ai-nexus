
import React from 'react';

const App = () => {
  return (
    <div style={{
      padding: '50px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#E07A5F' }}>
        ArtisanLink
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '30px', lineHeight: 1.6 }}>
        Connecting artisans with global buyers while promoting sustainability and cultural preservation.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <a
          href="/marketplace"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#E07A5F',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
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
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Join ArtisanLink
        </a>
      </div>
    </div>
  );
};

export default App;
