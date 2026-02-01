import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { orderService } from '../services/api';
import './styles/OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetchOrders();
    
    // Check if there's a new order from checkout
    if (location.state?.newOrder) {
      setSuccessMessage('Order placed successfully!');
      // Clear the state after showing the message
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getUserOrders();
      setOrders(response.data.orders);
      
      // Select the newest order if there's a new order from checkout
      if (location.state?.newOrder) {
        const newOrder = location.state.newOrder;
        setSelectedOrder(newOrder);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-history-page">
      <div className="container">
        <h1>Order History</h1>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {loading ? (
          <div className="spinner"></div>
        ) : orders.length > 0 ? (
          <div className="orders-container">
            <div className="orders-list">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className={`order-card ${selectedOrder?._id === order._id ? 'active' : ''}`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="order-header">
                    <div>
                      <p className="order-number">{order.orderNumber}</p>
                      <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="order-amount">${order.totalAmount.toFixed(2)}</div>
                  </div>
                  <div className="order-footer">
                    <span className={`status ${order.orderStatus}`}>{order.orderStatus}</span>
                    <span className="items-count">{order.items.length} items</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedOrder && (
              <div className="order-details">
                <h2>{selectedOrder.orderNumber}</h2>
                <div className="details-section">
                  <h3>Order Status</h3>
                  <p className={`status-large ${selectedOrder.orderStatus}`}>{selectedOrder.orderStatus}</p>
                  <p className="tracking">
                    {selectedOrder.trackingNumber && `Tracking: ${selectedOrder.trackingNumber}`}
                  </p>
                </div>

                <div className="details-section">
                  <h3>Items</h3>
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="item">
                      <p className="item-name">{item.productName}</p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                      <p className="item-price">${item.price.toFixed(2)} each</p>
                      <p className="item-subtotal">Subtotal: ${item.subtotal.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="details-section">
                  <h3>Shipping Address</h3>
                  <p>
                    {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                  </p>
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{' '}
                    {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                  <p>{selectedOrder.shippingAddress.phone}</p>
                </div>

                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>${selectedOrder.shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax:</span>
                    <span>${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
