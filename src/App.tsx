import React from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import ProductPage from './pages/ProductPage'
import HeaderNav from './components/HeaderNav';

function App() {
  return (
    <div className="App">
      <HeaderNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="product" element={<ProductPage />} />
      </Routes>
    </div>
  );
}


export default App;



