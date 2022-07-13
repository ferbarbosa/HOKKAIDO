import React from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import ProductPage from './pages/ProductPage';
import Catalog from './pages/Catalog';
import HeaderNav from './components/HeaderNav';
import Footer from './components/Footer';
import Auth from './pages/Auth';

function App() {
  return (
    <div className="App">
      <HeaderNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="catalog/:type" element={<Catalog />} />
        <Route path="auth/:type" element={<Auth />} />
        {/* 
        <Route path="catalog/female" element={<Catalog type="female" />} />
        <Route path="catalog/t-shirt" element={<Catalog type="t-shirt" />} />
        <Route path="catalog/shoes" element={<Catalog type="shoes" />} />
        <Route path="catalog/dress" element={<Catalog type="dress" />} />
        <Route path="catalog/white" element={<Catalog type="white" />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}


export default App;



