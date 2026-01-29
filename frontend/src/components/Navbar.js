import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import './styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const cartCount = items.length;

  const handleLogout = async () => {
    await clearCart();
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
         <Link to="/" className="logo">
            <img src="/logo.png" alt="NOVA logo" className="logo-img" />
         </Link>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
            </li>
          </ul>

          <div className="nav-actions">
            <Link to="/cart" className="cart-icon">
              <FiShoppingCart size={24} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>

            {isAuthenticated ? (
              <div className="user-menu">
                <button className="user-btn">
                  <FiUser size={24} />
                </button>
                <div className="dropdown">
                  <p className="user-name">{user?.firstName} {user?.lastName}</p>
                  {user?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/orders" onClick={() => setIsMenuOpen(false)}>
                    Orders
                  </Link>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="btn btn-primary btn-small">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline btn-small">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
