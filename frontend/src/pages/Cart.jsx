import React, { useState, useEffect } from "react";
import "../styles/Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
       }); 

  
  useEffect(() => {  // updating local storage whenever cart changes
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQuantity = (id) => {
    const updated = cartItems.map(item =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
  };

  const decreaseQuantity = (id) => {
    const updated = cartItems
      .map(item =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0); // remove if quantity becomes 0
    setCartItems(updated);
  };

  const handlePlaceOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(!user) return alert("Please login to place order")
    if (cartItems.length === 0) return alert("Cart is empty!");
    alert("Order placed successfully! (hook up backend next)");
    setCartItems([]);
    localStorage.removeItem("cart");
  };
  

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
        <div className="cart-grid">
          {cartItems.map(item => (
            <div className="cart-card" key={item._id}>
              <img
                src={`http://localhost:5167/uploads/${item.image}`}
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p>Cost per lb: ${item.costPerLb}</p>
              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item._id)}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total">
        <h3>Total: ${cartItems.reduce((sum, item) => sum + item.costPerLb * item.quantity, 0).toFixed(2)}</h3>
        <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>
      
      )}
    </div>
  );
}

export default Cart;
