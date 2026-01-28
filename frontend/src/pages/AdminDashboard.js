import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { productService, orderService } from '../services/api';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageFile: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('category', newProduct.category);
      formData.append('stock', newProduct.stock);
      if (newProduct.imageFile) {
        formData.append('image', newProduct.imageFile);
      }

      await productService.createProduct(formData);
      setNewProduct({ name: '', description: '', price: '', category: '', stock: '', imageFile: null });
      setImagePreview(null);
      fetchProducts();
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await productService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Overview
          </button>
          <button className={`tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            Products
          </button>
          <button className={`tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            Orders
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Products</h3>
                <p className="stat-value">{products.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p className="stat-value">{orders.length}</p>
              </div>
              <div className="stat-card">
                <h3>Revenue</h3>
                <p className="stat-value">
                  ${orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-content">
            <div className="add-product-form">
              <h2>Add New Product</h2>
              <form onSubmit={handleAddProduct}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Books">Books</option>
                      <option value="Home">Home</option>
                      <option value="Beauty">Beauty</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Product preview" />
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock</label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </form>
            </div>

            <div className="products-list">
              <h2>Products ({products.length})</h2>
              {loading ? (
                <div className="spinner"></div>
              ) : (
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{product.stock}</td>
                        <td>
                          <button onClick={() => handleDeleteProduct(product._id)} className="btn-delete">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-content">
            <h2>Orders ({orders.length})</h2>
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.orderNumber}</td>
                      <td>{order.userId?.firstName} {order.userId?.lastName}</td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                      <td className={`status ${order.orderStatus}`}>{order.orderStatus}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
