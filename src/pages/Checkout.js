import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems = [], products = [], onPlaceOrder }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Billing Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    state: 'TN',
    pincode: '',
    
    // Payment
    paymentMethod: 'cod',
    
    // Special Instructions
    notes: ''
  });

  const orderItems = cartItems
    .map((c) => {
      const p = products.find((x) => x.id === c.productId);
      return p ? { ...p, quantity: c.qty } : null;
    })
    .filter(Boolean);

  // Redirect if cart is empty
  if (orderItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="cart-header">
          <h1>Checkout</h1>
          <p>Your cart is empty</p>
          <button 
            className="btn"
            onClick={() => navigate('/quick-order')}
            style={{ marginTop: '20px' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getSubtotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getShipping = () => {
    return Math.round(getSubtotal() * 0.02); // 2% of subtotal
  };

  const getTax = () => {
    // No GST for Tamil Nadu
    if (formData.state === "TN") {
      return 0;
    }
    return Math.round(getSubtotal() * 0.18);
  };

  const getTotal = () => {
    return getSubtotal() + getShipping() + getTax();
  };

  // ✅ Check minimum order eligibility
  const isEligibleOrder = () => {
    const subtotal = getSubtotal();
    if (formData.state === "TN") {
      return subtotal >= 2000;
    }
    if (formData.state && formData.state !== "TN") {
      return subtotal >= 5000;
    }
    return false; // no state selected yet
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    const missing = required.filter(field => !formData[field]);

    if (missing.length > 0) {
      alert(`Please fill in: ${missing.join(', ')}`);
      return;
    }

    const subtotal = getSubtotal();
    if (formData.state === "TN" && subtotal < 2000) {
      alert("Minimum order value for Tamil Nadu is ₹2000.");
      return;
    }
    if (formData.state !== "TN" && subtotal < 5000) {
      alert("Minimum order value for other states is ₹5000.");
      return;
    }

    // 🔹 Merge items into one string
    const productsSummary = orderItems
      .map(item => `${item.name} (x${item.quantity})`)
      .join(", ");

    const order = {
      id: '#CR' + Date.now(),
      customer: formData,
      products: productsSummary,
      total: getTotal(),
      date: new Date().toISOString()
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbylNfWu3bG0M5F8RL6XXLDSMbqA9PN0OYb-XeKLD_3ntUUkj3fAiWdfFxI-RZXofG9V/exec",
        {
          method: "POST",
          body: new URLSearchParams({ order: JSON.stringify(order) }),
        }
      );

      const result = await response.json();

      if (result.result === "success") {
        alert("Order placed successfully! Order ID: " + order.id);
        navigate("/order-confirmation", { state: { order } });
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong while placing your order.");
    }
  };

  return (
    <div className="checkout-page">
      <div className="cart-header">
        <h1>Checkout</h1>
        <p>Complete your order</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="checkout-grid">
          <div className="checkout-form">
            
            {/* Billing Information */}
            <div className="form-section">
              <h3>Billing Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="form-section">
              <h3>Shipping Address</h3>
              <div className="form-group">
                <label>Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select State</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="KA">Karnataka</option>
                    <option value="AP">Andhra Pradesh</option>
                    <option value="KL">Kerala</option>
                    <option value="MH">Maharashtra</option>
                    <option value="GJ">Gujarat</option>
                    <option value="RJ">Rajasthan</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="WB">West Bengal</option>
                    <option value="DL">Delhi</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    pattern="[0-9]{6}"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <h3>Payment Method</h3>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleInputChange}
                  />
                  Online Payment
                </label>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="form-section">
              <h3>Special Instructions</h3>
              <div className="form-group">
                <label>Order Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Any special instructions for your order..."
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3 style={{ marginBottom: '20px', color: 'var(--brand)' }}>Order Summary</h3>
            
            {/* Order Items */}
            <div style={{ marginBottom: '20px' }}>
              {orderItems.map(item => (
                <div key={item.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '10px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid var(--border-light)'
                }}>
                  <div>
                    <div style={{ fontWeight: '600' }}>{item.name}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Qty: {item.quantity} × ₹{item.price}
                    </div>
                  </div>
                  <div style={{ fontWeight: '600' }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Price Breakdown */}
            <div className="summary-row">
              <span>Subtotal ({orderItems.length} items)</span>
              <span>₹{getSubtotal()}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping (2%)</span>
              <span>₹{getShipping()}</span>
            </div>

            <div className="summary-row">
              <span>
                {formData.state === "TN" ? "Tax (Exempt for Tamil Nadu)" : "Tax (18% GST)"}
              </span>
              <span>₹{getTax()}</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>₹{getTotal()}</span>
              
            </div>

            {/* ✅ Warning for minimum order */}
            {!isEligibleOrder() && formData.state && (
              <p style={{ color: "red", marginTop: "8px", fontSize: "0.9rem" }}>
                Minimum Order TN: ₹2,000<br/>
                Minimum Order Other States: ₹5,000<br/>
                Minimum order value is ₹{formData.state === "TN" ? "2000" : "5000"} for your state.
              </p>
            )}
            
            <button 
              type="submit" 
              className="place-order-btn"
              disabled={!isEligibleOrder()}
              style={{
                opacity: isEligibleOrder() ? 1 : 0.6,
                cursor: isEligibleOrder() ? "pointer" : "not-allowed"
              }}
            >
              Place Order
            </button>
            
            <button 
              type="button"
              className="btn"
              onClick={() => navigate('/cart')}
              style={{ 
                width: '100%', 
                marginTop: '15px',
                background: 'transparent',
                color: 'var(--brand)',
                border: '2px solid var(--brand)'
              }}
            >
              Back to Cart
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
