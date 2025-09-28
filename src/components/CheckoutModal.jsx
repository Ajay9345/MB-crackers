// src/components/CheckoutModal.jsx
import React, { useState } from "react";

export default function CheckoutModal({ visible, onClose, cartItems = [], products = [], onPlaceOrder }) {
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });

  if (!visible) return null;

  const items = cartItems
    .map((c) => {
      const p = products.find((x) => x.id === c.productId);
      return p ? { ...p, qty: c.qty } : null;
    })
    .filter(Boolean);

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = subtotal + tax;

  function handlePlace() {
    if (!customer.name || !customer.phone) {
      alert("Please enter name and phone");
      return;
    }
    const order = { id: `ORD-${Date.now()}`, customer, items, total, date: new Date().toISOString() };
    onPlaceOrder(order);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h3>Checkout</h3>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="checkout-grid">
            <div>
              <label>Name</label>
              <input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />

              <label>Phone</label>
              <input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />

              <label>Address</label>
              <textarea value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />

              <div className="mt-3">
                <button className="btn-primary" onClick={handlePlace}>Place Order • ₹{total}</button>
              </div>
            </div>

            <div>
              <h4>Order summary</h4>
              {items.map((it) => (
                <div key={it.id} className="summary-row">
                  <span>{it.name} × {it.qty}</span>
                  <span>₹{it.price * it.qty}</span>
                </div>
              ))}

              <div className="summary-total">
                <div>Subtotal: ₹{subtotal}</div>
                <div>GST (5%): ₹{tax}</div>
                <div className="total">Total: ₹{total}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
