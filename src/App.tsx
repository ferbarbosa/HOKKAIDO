import React from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import ProductPage from './pages/ProductPage'
import HeaderNav from './components/HeaderNav';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <HeaderNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="product" element={<ProductPage name="p" cover="p" price={10} size="a" color="a"  />} />
      </Routes>
      <Footer />
    </div>
  );
}


export default App;



