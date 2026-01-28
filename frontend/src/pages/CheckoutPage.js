import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { orderService } from '../services/api';
import './styles/CheckoutPage.css';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [shippingData, setShippingData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: user?.phone || '',
  });

  const [billingData, setBillingData] = useState(shippingData);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const shippingCost = totalPrice > 100 ? 0 : 10;
  const tax = totalPrice * 0.1;
  const totalAmount = totalPrice + shippingCost + tax;

  const handleShippingChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handleBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      setError('');
      setLoading(true);

      const orderData = {
        shippingAddress: shippingData,
        billingAddress: sameAsShipping ? shippingData : billingData,
        paymentMethod,
      };

      const response = await orderService.createOrder(orderData);
      await clearCart();
      navigate(`/orders`, { state: { newOrder: response.data.order } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="checkout-wrapper">
          <div className="checkout-form">
            <div className="steps">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <span>1</span>
                <p>Shipping</p>
              </div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <span>2</span>
                <p>Billing</p>
              </div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <span>3</span>
                <p>Payment</p>
              </div>
            </div>

            {step === 1 && (
              <div className="form-section">
                <h2>Shipping Address</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={shippingData.firstName} onChange={handleShippingChange} required />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={shippingData.lastName} onChange={handleShippingChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Street Address</label>
                  <input type="text" name="street" value={shippingData.street} onChange={handleShippingChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" value={shippingData.city} onChange={handleShippingChange} required />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input type="text" name="state" value={shippingData.state} onChange={handleShippingChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input type="text" name="zipCode" value={shippingData.zipCode} onChange={handleShippingChange} required />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input type="text" name="country" value={shippingData.country} onChange={handleShippingChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={shippingData.phone} onChange={handleShippingChange} required />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-section">
                <h2>Billing Address</h2>
                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    id="sameAsShipping"
                    checked={sameAsShipping}
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                  />
                  <label htmlFor="sameAsShipping">Same as shipping address</label>
                </div>

                {!sameAsShipping && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={billingData.firstName} onChange={handleBillingChange} required />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={billingData.lastName} onChange={handleBillingChange} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Street Address</label>
                      <input type="text" name="street" value={billingData.street} onChange={handleBillingChange} required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <input type="text" name="city" value={billingData.city} onChange={handleBillingChange} required />
                      </div>
                      <div className="form-group">
                        <label>State</label>
                        <input type="text" name="state" value={billingData.state} onChange={handleBillingChange} required />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="form-section">
                <h2>Payment Method</h2>
                <div className="payment-methods">
                  <label>
                    <input
                      type="radio"
                      value="credit_card"
                      checked={paymentMethod === 'credit_card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Credit Card
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="debit_card"
                      checked={paymentMethod === 'debit_card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Debit Card
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    PayPal
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Bank Transfer
                  </label>
                </div>
              </div>
            )}

            <div className="button-group">
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className="btn btn-outline">
                  Back
                </button>
              )}
              {step < 3 && (
                <button onClick={() => setStep(step + 1)} className="btn btn-primary">
                  Continue
                </button>
              )}
              {step === 3 && (
                <button onClick={handlePlaceOrder} className="btn btn-primary" disabled={loading}>
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              )}
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {items.map((item) => (
              <div key={item._id} className="summary-item">
                <span>{item.productId?.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="summary-divider"></div>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
