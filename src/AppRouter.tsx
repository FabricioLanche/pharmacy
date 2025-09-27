
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import CartDetail from './pages/CartDetail';
import UserDetails from './pages/UserDetails';
import Navbar from './components/commons/Navbar';
import Footer from './components/commons/Footer';
import FloatingUploadButton from './components/commons/FloatingUploadButton';

import { useState } from 'react';
import type { Producto } from './types/ProductoBackend';

interface SearchResult {
  productos: Producto[];
  total: number;
  page: number;
  pagesize: number;
  totalPages: number;
  isSearch: boolean;
  searchQuery?: string;
  tipoFilter?: string;
}

export default function AppRouter() {
  const [searchResults, setSearchResults] = useState<SearchResult | undefined>(undefined);
  const [searchPageChangeCallback, setSearchPageChangeCallback] = useState<((page: number) => Promise<void>) | null>(null);
  
  const handleSearchResults = (results: SearchResult | undefined) => {
    setSearchResults(results);
  };

  const handlePageChangeRequest = (callback: (page: number) => Promise<void>) => {
    setSearchPageChangeCallback(() => callback);
  };
  return (
    <BrowserRouter>
      <Navbar onSearchResults={handleSearchResults} onPageChangeRequest={handlePageChangeRequest} />
      <Routes>
        <Route path="/" element={<Home searchResults={searchResults} onSearchPageChange={searchPageChangeCallback} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/cart-detail" element={<CartDetail />} />
  <Route path="/user-details" element={<UserDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <FloatingUploadButton />
    </BrowserRouter>
  );
}
