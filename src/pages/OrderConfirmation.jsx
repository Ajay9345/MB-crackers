import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No order found.</h2>
        <button onClick={() => navigate("/")} className="btn">
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="cart-header">
        <h1>Order Placed Successfully!</h1>
        <p>Order ID: {order.id}</p>
      </div>

      <div className="order-details">
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> {order.customer.firstName} {order.customer.lastName}</p>
        <p><strong>Email:</strong> {order.customer.email}</p>
        <p><strong>Phone:</strong> {order.customer.phone}</p>
        <p><strong>Address:</strong> {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
        <p><strong>Payment Method:</strong> {order.customer.paymentMethod}</p>
        {order.customer.notes && <p><strong>Notes:</strong> {order.customer.notes}</p>}

        <h3>Products</h3>
        <p>{order.products}</p>

        <h3>Total: ₹{order.total}</h3>

        <button onClick={() => navigate("/")} className="btn" style={{ marginTop: "20px" }}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
