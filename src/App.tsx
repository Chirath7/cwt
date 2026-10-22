import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CustomsProductPage from "./pages/CustomsProductPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customs/arms" element={<CustomsProductPage productId="arms" />} />
        <Route path="/customs/dat"  element={<CustomsProductPage productId="dat"  />} />
        <Route path="/customs/cdns" element={<CustomsProductPage productId="cdns" />} />
      </Routes>
    </BrowserRouter>
  );
}
