// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.desc}</p>
        <div className="product-foot">
          <div className="price">₹{product.price}</div>
          <div>
            <button 
              className="btn add-to-cart-btn" 
              onClick={onAdd}
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 8px 20px rgba(220, 38, 38, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
