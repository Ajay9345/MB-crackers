import React, { useState, useEffect } from 'react';

const QuickOrder = ({ products = [], onAddDirect }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [localCart, setLocalCart] = useState({});
  
  // Get unique categories + add "All"
  const categories = [
    { id: 'all', name: 'All' },
    ...[...new Set(products.map(p => p.category))].map(cat => ({
      id: cat.toLowerCase().replace(/\s+/g, '-'),
      name: cat
    }))
  ];
  
  // Set "All" as default
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory('all');
    }
  }, [categories, selectedCategory]);
  
  // Filter products
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => 
        p.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
      );

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      const newCart = { ...localCart };
      delete newCart[productId];
      setLocalCart(newCart);
    } else {
      setLocalCart({ ...localCart, [productId]: quantity });
    }
  };
  
  const addToMainCart = (productId) => {
    const quantity = localCart[productId] || 0;
    if (quantity > 0 && onAddDirect) {
      onAddDirect(productId, quantity);
      const newCart = { ...localCart };
      delete newCart[productId];
      setLocalCart(newCart);
    }
  };

  const getTotalItems = () => {
    return Object.values(localCart).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.entries(localCart).forEach(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    });
    return total;
  };

  return (
    <div className="quick-order-container">
      <div className="quick-order-header">
        <h1>Quick Order</h1>
        <p>Select products quickly and add to cart</p>
        <br/>
        <h5>Minimum Order TN: ₹2,000<br/>
Minimum Order Other States: ₹5,000 + 18% GST</h5>
        {getTotalItems() > 0 && (
          <div style={{ 
            background: 'linear-gradient(135deg, #dc2626, #f97316)', 
            color: 'white', 
            padding: '12px 20px', 
            borderRadius: '12px', 
            display: 'inline-block',
            marginTop: '15px',
            fontWeight: '700',
            fontSize: window.innerWidth <= 768 ? '0.9rem' : '1rem',
            textAlign: 'center',
            maxWidth: '100%',
            wordBreak: 'break-word'
          }}>
            Cart: {getTotalItems()} items | ₹{getTotalPrice()}
          </div>
        )}
      </div>

      <div className="quick-order-grid">
        <div className="category-sidebar">
          <h3>Categories</h3>
          <ul className="category-list">
            {categories.map(category => (
              <li 
                key={category.id}
                className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="products-section">
          <h2 className="section-title">
            {categories.find(c => c.id === selectedCategory)?.name || 'Products'}
          </h2>
          
          <div className="product-table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="product-row">
                    <td>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-image-small"
                      />
                    </td>
                    <td className="product-name">
                      <strong>{product.name}</strong>
                    </td>
                    <td className="product-desc">
                      {product.desc}
                    </td>
                    <td className="product-price">
                      ₹{product.price}
                    </td>
                    <td>
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(product.id, (localCart[product.id] || 0) - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          className="qty-input"
                          value={localCart[product.id] || 0}
                          onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 0)}
                          min="0"
                          aria-label="Quantity"
                        />
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(product.id, (localCart[product.id] || 0) + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => addToMainCart(product.id)}
                        disabled={!localCart[product.id]}
                        style={{
                          opacity: localCart[product.id] ? 1 : 0.5,
                          cursor: localCart[product.id] ? 'pointer' : 'not-allowed'
                        }}
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProducts.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px',
                color: 'var(--text-muted)'
              }}>
                No products in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickOrder;
