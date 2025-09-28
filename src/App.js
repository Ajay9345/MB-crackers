import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import QuickOrder from "./pages/QuickOrder.js";
import Blog from "./pages/Blog";
import Checkout from "./pages/Checkout";
import Cart from "./components/Cart.jsx";
import CheckoutModal from "./components/CheckoutModal";
import OrderConfirmation from "./pages/OrderConfirmation";
import { fetchProducts } from "./api/products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cracker_cart")) || [];
    } catch (e) {
      return [];
    }
  });
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  useEffect(() => {
    console.log('Cart state changed:', cart);
    console.log('Cart count:', cart.reduce((s, c) => s + c.qty, 0));
    localStorage.setItem("cracker_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId, qty = 1) => {
    console.log(`Adding to cart: productId=${productId}, qty=${qty}`);
    console.log('Current cart before update:', cart);
    
    setCart((prev) => {
      console.log('Previous cart state:', prev);
      const found = prev.find((c) => c.productId === productId);
      console.log('Found existing item:', found);
      
      let newCart;
      if (found) {
        newCart = prev.map((c) =>
          c.productId === productId ? { ...c, qty: c.qty + qty } : c
        );
        console.log('Updated existing item, new cart:', newCart);
      } else {
        newCart = [...prev, { productId, qty }];
        console.log('Added new item, new cart:', newCart);
      }
      
      return newCart;
    });
  };

  const updateQty = (productId, qty) => {
    setCart((prev) =>
      prev
        .map((c) => (c.productId === productId ? { ...c, qty } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
  };

  const handlePlaceOrder = (order) => {
    localStorage.setItem("last_order", JSON.stringify(order));
    setCart([]);
    setCheckoutOpen(false);
    alert(`Order placed: ${order.id}`);
  };

  const handleQuickAdd = (productId, qty) => {
    const exists = products.find((p) => p.id === productId);
    if (!exists) return alert("Product ID not found");
    addToCart(productId, qty);
    alert("Added to cart");
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen((s) => !s)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        
        <Route
          path="/quick-order"
          element={<QuickOrder products={products} onAddDirect={handleQuickAdd} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cart}
              products={products}
              onUpdateQty={updateQty}
              onRemove={removeFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cart}
              products={products}
              onPlaceOrder={handlePlaceOrder}
            />
          }
        />
        <Route path="/blog" element={<Blog />} />
      </Routes>

      <CheckoutModal
        visible={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cart}
        products={products}
        onPlaceOrder={handlePlaceOrder}
      />
    </BrowserRouter>
  );
}
