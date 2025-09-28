// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ cartCount, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-actions">
          <Link to="/cart" className="cart-btn" style={{ textDecoration: 'none' }}>
            Cart ({cartCount})
          </Link>
        </div>
        
        <div className="brand">
          <Link to="/">MB Crackers</Link>
        </div>

        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/quick-order">Quick Order</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <a href="/MBtradersPricelist.pdf" target="_blank" rel="noreferrer">Download Pricelist</a>
        </nav>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>
      
      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        <Link to="/quick-order" onClick={closeMobileMenu}>Quick Order</Link>
        <Link to="/about" onClick={closeMobileMenu}>About</Link>
        <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
        



      </nav>
    </header>
  );
}
