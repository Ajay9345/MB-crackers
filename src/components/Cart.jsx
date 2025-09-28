import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cartItems = [], products = [], onUpdateQty, onRemove }) {
  const navigate = useNavigate();

  const items = cartItems
    .map((c) => {
      const p = products.find((x) => x.id === c.productId);
      return p ? { ...p, qty: c.qty } : null;
    })
    .filter(Boolean);

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = Math.round(subtotal * 0.02);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping ;

  const MIN_ORDER = 2000;
  const isBelowMinimum = subtotal < MIN_ORDER;

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h1>Your Cart</h1>
          <p>Your cart is empty</p>
          <button className="btn" onClick={() => navigate("/quick-order")} style={{ marginTop: "20px" }}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>{items.length} items in your cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          <h3 style={{ marginBottom: "20px", color: "var(--brand)" }}>Cart Items</h3>

          <div className="cart-table-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="cart-item-row">
                    <td>
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                    </td>
                    <td className="cart-item-name">
                      <strong>{item.name}</strong>
                    </td>
                    <td className="cart-item-desc">
                      {item.description || "Premium quality crackers"}
                    </td>
                    <td className="cart-item-unit-price">
                      ₹{item.price}
                    </td>
                    <td>
                      <div className="quantity-controls">
                        <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty - 1)}>-</button>
                        <input
                          type="number"
                          className="qty-input"
                          value={item.qty}
                          onChange={(e) => onUpdateQty(item.id, parseInt(e.target.value) || 0)}
                          min="0"
                        />
                        <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                    </td>
                    <td className="cart-item-total">
                      ₹{item.price * item.qty}
                    </td>
                    <td>
                      <button className="remove-btn" onClick={() => onRemove(item.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="cart-summary">
          <h3 style={{ marginBottom: "20px", color: "var(--brand)" }}>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal ({items.length} items)</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
          </div>

          {/*<div className="summary-row">
            <span>Tax (18% GST)</span>
            <span>₹{tax}</span>
          </div>*/}

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {isBelowMinimum ? (
  <p style={{ color: "red", marginTop: "10px" }}>
    Minimum order amount is ₹{MIN_ORDER}. Please add more items.
  </p>
) : (
  <button className="checkout-btn" onClick={() => navigate("/checkout")}>
    Proceed to Checkout
  </button>
)}


          <button
            className="btn"
            onClick={() => navigate("/quick-order")}
            style={{
              width: "100%",
              marginTop: "15px",
              background: "transparent",
              color: "var(--brand)",
              border: "2px solid var(--brand)",
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
