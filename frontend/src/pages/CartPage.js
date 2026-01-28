import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import './styles/CartPage.css';

const CartPage = () => {
  const { items, totalPrice, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some amazing products to get started!</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        <div className="cart-wrapper">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.productId?.images?.[0]?.url || 'https://via.placeholder.com/120'}
                  alt={item.productId?.name}
                  className="item-image"
                />
                <div className="item-details">
                  <h3>{item.productId?.name}</h3>
                  <p className="price">${item.price.toFixed(2)}</p>
                </div>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="remove-btn"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{totalPrice > 100 ? 'Free' : '$10.00'}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>${(totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(totalPrice + (totalPrice > 100 ? 0 : 10) + totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <button className="btn btn-primary" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <Link to="/products" className="btn btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
