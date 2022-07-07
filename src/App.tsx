import React from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import ProductPage from './pages/ProductPage';
import Catalog from './pages/Catalog';
import HeaderNav from './components/HeaderNav';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <HeaderNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="catalog/male" element={<Catalog type="male" />} />
        <Route path="catalog/female" element={<Catalog type="female" />} />
      </Routes>
      <Footer />
    </div>
  );
}


export default App;



