import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import './styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About NOVA</h3>
            <p>Your modern e-commerce destination for quality products and exceptional service.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Help & Support</h3>
            <ul>
              <li><a href="#/">Contact Us</a></li>
              <li><a href="#/">FAQ</a></li>
              <li><a href="#/">Shipping Info</a></li>
              <li><a href="#/">Returns</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#/" aria-label="Facebook"><FiFacebook /></a>
              <a href="#/" aria-label="Twitter"><FiTwitter /></a>
              <a href="#/" aria-label="Instagram"><FiInstagram /></a>
              <a href="#/" aria-label="LinkedIn"><FiLinkedin /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} NOVA. All rights reserved.</p>
          <div className="footer-links">
            <a href="#/">Privacy Policy</a>
            <a href="#/">Terms of Service</a>
            <a href="#/">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
