
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import CartDetail from './pages/CartDetail';
import Navbar from './components/commons/Navbar';
import Footer from './components/commons/Footer';
import FloatingUploadButton from './components/commons/FloatingUploadButton';

import { useState } from 'react';
import { productsData } from './assets/productsData';

export default function AppRouter() {
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  return (
    <BrowserRouter>
      <Navbar onSearchResults={setFilteredProducts} />
      <Routes>
        <Route path="/" element={<Home filteredProducts={filteredProducts} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart-detail" element={<CartDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <FloatingUploadButton />
    </BrowserRouter>
  );
}
