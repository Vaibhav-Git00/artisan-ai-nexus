import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Import pages
// If these components don't exist yet, we'll create simple placeholders
const Marketplace = React.lazy(() => import("./pages/Marketplace"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Index = React.lazy(() => import("./pages/Index"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const ProductUpload = React.lazy(() => import("./pages/ProductUpload"));

// Simple Home component for the landing page
const Home = () => {
  return (
    <div
      style={{
        padding: "50px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px", color: "#E07A5F" }}>
        ArtisanLink
      </h1>
      <p style={{ fontSize: "18px", marginBottom: "30px", lineHeight: 1.6 }}>
        Connecting artisans with global buyers while promoting sustainability
        and cultural preservation.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/marketplace"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#E07A5F",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Browse Marketplace
        </Link>
        <Link
          to="/signup"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            border: "1px solid #333",
            color: "#333",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Join ArtisanLink
        </Link>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/index" element={<Index />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/product-upload" element={<ProductUpload />} />
          {/* Add more routes as needed */}
        </Routes>
      </React.Suspense>
    </Router>
  );
};

export default App;
