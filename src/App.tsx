import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import CustomsPage from "./pages/CustomsPage";
import CustomsProductPage from "./pages/CustomsProductPage";
import ProductsPage from "./pages/ProductsPage";
import CustomerPage from "./pages/CustomerPage";
import ProductPage from "./pages/ProductPage";
import TrainingPage from "./pages/TrainingPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"             element={<LandingPage />} />
        <Route path="/about"        element={<AboutPage />} />
        <Route path="/customs"      element={<CustomsPage />} />
        <Route path="/customs/arms" element={<CustomsProductPage productId="arms" />} />
        <Route path="/customs/dat"  element={<CustomsProductPage productId="dat"  />} />
        <Route path="/customs/cdns" element={<CustomsProductPage productId="cdns" />} />
        <Route path="/products"               element={<ProductsPage />} />
        <Route path="/customers/:clientId"   element={<CustomerPage />} />
        <Route path="/products/:productId"   element={<ProductPage />} />
        <Route path="/training"              element={<TrainingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
