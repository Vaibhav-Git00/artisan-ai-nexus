import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// Import our custom styles
import "./styles/new-home-page.css";
import "./styles/global-reset.css";
import "./styles/layout.css";
import "./styles/animations.css";
import "./styles/footer.css";

// Import theme provider
import { ThemeProvider } from "./theme/ThemeContext";

// Import pages
// If these components don't exist yet, we'll create simple placeholders
const HomePage = React.lazy(() => import("./pages/NewHomePage"));
const Marketplace = React.lazy(() => import("./pages/Marketplace"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Index = React.lazy(() => import("./pages/Index"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const ProductUpload = React.lazy(() => import("./pages/ProductUpload"));

// Import the new header component
import AntHeader from "./components/layout/NewAntHeader";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/index" element={<Index />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/product-upload" element={<ProductUpload />} />
            {/* Add more routes as needed */}
          </Routes>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
