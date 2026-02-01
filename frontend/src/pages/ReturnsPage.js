import React from 'react';
import { FiRefreshCw, FiPackage, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './styles/ReturnsPage.css';

const ReturnsPage = () => {
  return (
    <div className="returns-page">
      <div className="container">
        <div className="returns-header">
          <div className="returns-icon">
            <FiRefreshCw size={48} />
          </div>
          <h1>Returns & Refunds</h1>
          <p>Our hassle-free return policy ensures you can shop with confidence.</p>
        </div>

        <div className="returns-content">
          <div className="return-policy">
            <h2>30-Day Return Policy</h2>
            <div className="policy-card">
              <div className="policy-content">
                <h3>Easy Returns</h3>
                <p>We want you to love your purchase! If you're not completely satisfied, you can return items within 30 days of delivery for a full refund or exchange.</p>
                
                <h3>Return Conditions</h3>
                <ul>
                  <li>Items must be unused and in original condition</li>
                  <li>Original tags and packaging must be intact</li>
                  <li>Include original receipt or proof of purchase</li>
                  <li>Some items may have specific return requirements</li>
                </ul>

                <h3>Non-Returnable Items</h3>
                <ul>
                  <li>Personalized or customized items</li>
                  <li>Perishable goods (food, flowers, etc.)</li>
                  <li>Intimate apparel and swimwear</li>
                  <li>Digital downloads and software</li>
                  <li>Gift cards and vouchers</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="return-process">
            <h2>How to Return an Item</h2>
            <div className="process-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Initiate Return</h3>
                  <p>Log into your account and go to "Order History". Select the order and item you want to return, then click "Start Return".</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Print Return Label</h3>
                  <p>We'll provide a prepaid return shipping label. Print it and attach it to your package.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Package Item</h3>
                  <p>Safely pack the item in its original packaging with all tags and accessories included.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Ship to Us</h3>
                  <p>Drop off the package at any authorized shipping location. We'll notify you when we receive it.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Get Refund</h3>
                  <p>Once approved, your refund will be processed within 5-7 business days to your original payment method.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="refund-options">
            <h2>Refund Options</h2>
            <div className="options-grid">
              <div className="option-card">
                <div className="option-icon">
                  <FiCheckCircle size={32} />
                </div>
                <h3>Original Payment Method</h3>
                <p>Refund to your original payment method (credit card, PayPal, etc.). This is our standard refund option.</p>
                <p className="timeline">5-7 business days</p>
              </div>

              <div className="option-card">
                <div className="option-icon">
                  <FiPackage size={32} />
                </div>
                <h3>Store Credit</h3>
                <p>Receive store credit immediately for future purchases. Store credit never expires and can be used on any item.</p>
                <p className="timeline">Instant</p>
              </div>

              <div className="option-card">
                <div className="option-icon">
                  <FiRefreshCw size={32} />
                </div>
                <h3>Exchange</h3>
                <p>Exchange for a different size, color, or product. Pay only the difference if the new item costs more.</p>
                <p className="timeline">3-5 business days</p>
              </div>
            </div>
          </div>

          <div className="special-cases">
            <h2>Special Cases</h2>
            <div className="cases-grid">
              <div className="case-card">
                <div className="case-icon">
                  <FiAlertCircle size={24} />
                </div>
                <h3>Wrong or Damaged Items</h3>
                <p>If you received the wrong item or it arrived damaged, contact us immediately. We'll send a replacement and arrange return shipping at no cost to you.</p>
              </div>

              <div className="case-card">
                <div className="case-icon">
                  <FiPackage size={24} />
                </div>
                <h3>Missing Items</h3>
                <p>If your order is missing items, check your packing slip and contact us within 48 hours. We'll investigate and resolve the issue quickly.</p>
              </div>

              <div className="case-card">
                <div className="case-icon">
                  <FiRefreshCw size={24} />
                </div>
                <h3>Late Returns</h3>
                <p>Returns after 30 days may be accepted on a case-by-case basis. Contact our customer service team to discuss your situation.</p>
              </div>
            </div>
          </div>

          <div className="return-tips">
            <h2>Return Tips</h2>
            <div className="tips-grid">
              <div className="tip-item">
                <h3>Keep Packaging</h3>
                <p>Keep original packaging until you're sure you want to keep the item. This makes returns much easier.</p>
              </div>

              <div className="tip-item">
                <h3>Check Fit</h3>
                <p>Try on clothing with care. Keep tags attached and avoid wearing perfumes or deodorants that might leave marks.</p>
              </div>

              <div className="tip-item">
                <h3>Document Condition</h3>
                <p>Take photos of items before returning, especially if you think there might be any issues.</p>
              </div>

              <div className="tip-item">
                <h3>Track Returns</h3>
                <p>Keep your return tracking number until you receive confirmation that your return has been processed.</p>
              </div>
            </div>
          </div>

          <div className="contact-support">
            <div className="support-card">
              <h3>Need Help with Returns?</h3>
              <p>Our customer service team is here to assist you with any questions or concerns about returns and refunds.</p>
              <div className="support-actions">
                <a href="/contact" className="btn btn-primary">Contact Support</a>
                <a href="/faq" className="btn btn-outline">View FAQ</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
