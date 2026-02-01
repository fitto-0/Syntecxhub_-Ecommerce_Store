import React from 'react';
import { FiTruck, FiClock, FiPackage, FiShield } from 'react-icons/fi';
import './styles/ShippingPage.css';

const ShippingPage = () => {
  return (
    <div className="shipping-page">
      <div className="container">
        <div className="shipping-header">
          <div className="shipping-icon">
            <FiTruck size={48} />
          </div>
          <h1>Shipping Information</h1>
          <p>Everything you need to know about our shipping services and delivery options.</p>
        </div>

        <div className="shipping-content">
          <div className="shipping-options">
            <h2>Shipping Methods</h2>
            
            <div className="shipping-card">
              <div className="shipping-method">
                <div className="method-info">
                  <h3>Standard Shipping</h3>
                  <p className="delivery-time">5-7 business days</p>
                  <p className="price">$4.99</p>
                </div>
                <div className="method-details">
                  <ul>
                    <li>Available for all US addresses</li>
                    <li>Free on orders over $50</li>
                    <li>Tracking included</li>
                    <li>Delivered Monday-Friday</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="shipping-card featured">
              <div className="shipping-method">
                <div className="method-info">
                  <h3>Express Shipping</h3>
                  <p className="delivery-time">2-3 business days</p>
                  <p className="price">$12.99</p>
                </div>
                <div className="method-details">
                  <ul>
                    <li>Priority processing</li>
                    <li>Faster delivery</li>
                    <li>Real-time tracking</li>
                    <li>Available for all US addresses</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="shipping-card">
              <div className="shipping-method">
                <div className="method-info">
                  <h3>Overnight Shipping</h3>
                  <p className="delivery-time">1 business day</p>
                  <p className="price">$24.99</p>
                </div>
                <div className="method-details">
                  <ul>
                    <li>Next-day delivery</li>
                    <li>Order by 2 PM EST</li>
                    <li>Signature required</li>
                    <li>Limited to select areas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="shipping-features">
            <h2>Why Choose Our Shipping?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <FiPackage size={32} />
                </div>
                <h3>Secure Packaging</h3>
                <p>All items are carefully packaged to ensure they arrive in perfect condition.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FiClock size={32} />
                </div>
                <h3>Fast Processing</h3>
                <p>Orders are processed within 1-2 business days, excluding weekends and holidays.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FiTruck size={32} />
                </div>
                <h3>Real-Time Tracking</h3>
                <p>Track your package every step of the way with our advanced tracking system.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FiShield size={32} />
                </div>
                <h3>Delivery Guarantee</h3>
                <p>We guarantee safe delivery or we'll replace your order at no extra cost.</p>
              </div>
            </div>
          </div>

          <div className="international-shipping">
            <h2>International Shipping</h2>
            <div className="international-info">
              <div className="info-section">
                <h3>Delivery Times</h3>
                <ul>
                  <li><strong>Canada:</strong> 7-12 business days</li>
                  <li><strong>Europe:</strong> 10-15 business days</li>
                  <li><strong>Asia:</strong> 12-20 business days</li>
                  <li><strong>Australia:</strong> 10-18 business days</li>
                </ul>
              </div>

              <div className="info-section">
                <h3>International Rates</h3>
                <p>Shipping rates vary by destination and package weight. You'll see exact shipping costs at checkout before completing your order.</p>
              </div>

              <div className="info-section">
                <h3>Customs & Duties</h3>
                <p>International orders may be subject to customs fees and import duties. These charges are the responsibility of the recipient and are not included in our shipping rates.</p>
              </div>
            </div>
          </div>

          <div className="shipping-policies">
            <h2>Shipping Policies</h2>
            <div className="policies-grid">
              <div className="policy-item">
                <h3>Order Processing</h3>
                <p>Orders are processed Monday-Friday, excluding holidays. Orders placed after 2 PM EST will be processed the next business day.</p>
              </div>

              <div className="policy-item">
                <h3>Shipping Confirmation</h3>
                <p>You'll receive an email with tracking information once your order ships. You can also track your order in your account dashboard.</p>
              </div>

              <div className="policy-item">
                <h3>Delivery Address</h3>
                <p>We ship to PO boxes and APO/FPO addresses. Please ensure your shipping address is correct as we cannot change it once the order ships.</p>
              </div>

              <div className="policy-item">
                <h3>Lost Packages</h3>
                <p>If your package is lost in transit, we'll work with the carrier to locate it. If it cannot be found, we'll send a replacement or issue a full refund.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
