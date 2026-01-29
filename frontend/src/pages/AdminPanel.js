import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheck, FiBarChart2, FiUpload } from 'react-icons/fi';
import { productService } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import './styles/AdminPanel.css';

// Utility function to convert relative image URLs to absolute URLs
const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const serverBase = apiBase.replace('/api', '');
  return `${serverBase}${url}`;
};

const AdminPanel = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics'); // analytics, manage, create
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Analytics state
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    avgRating: 0,
    categories: {},
  });

  // Create product state
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    discountedPrice: '',
    category: 'electronics',
    stock: '',
    images: [],
  });
  const [createProductImages, setCreateProductImages] = useState([]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      return;
    }
    fetchProducts();
    calculateAnalytics();
  }, [isAuthenticated, user]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts({ limit: 100 });
      setProducts(response.data.products);
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const calculateAnalytics = async () => {
    try {
      const response = await productService.getAllProducts({ limit: 100 });
      const products = response.data.products;

      let totalRevenue = 0;
      let totalRating = 0;
      const categoryMap = {};

      products.forEach((product) => {
        // Calculate revenue (estimating from price and discount)
        const price = product.price || 0;
        totalRevenue += price;

        // Calculate average rating
        totalRating += product.rating || 0;

        // Count categories
        const cat = product.category || 'uncategorized';
        categoryMap[cat] = (categoryMap[cat] || 0) + 1;
      });

      setAnalytics({
        totalProducts: products.length,
        totalRevenue: totalRevenue.toFixed(2),
        avgRating: (totalRating / products.length || 0).toFixed(2),
        categories: categoryMap,
      });
    } catch (err) {
      console.error('Failed to calculate analytics', err);
    }
  };

  const handleImageFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileArray = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      alt: '',
    }));
    setImageFiles([...imageFiles, ...fileArray]);
    // Reset input so same files can be selected again
    e.target.value = '';
  };

  const handleCreateProductImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileArray = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      alt: '',
    }));
    setCreateProductImages([...createProductImages, ...fileArray]);
    // Reset input so same files can be selected again
    e.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleCreateProductDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      setError('Please drop image files only');
      return;
    }

    const fileArray = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      alt: '',
    }));
    setCreateProductImages([...createProductImages, ...fileArray]);
    setError('');
  };

  const handleEditProductDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    
    const files = Array.from(e.dataTransfer.files);
    const droppedFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (droppedFiles.length === 0) {
      setError('Please drop image files only');
      return;
    }

    const fileArray = droppedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      alt: '',
    }));
    setImageFiles([...imageFiles, ...fileArray]);
    setError('');
  };

  const removeImageFile = (index) => {
    const updated = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updated);
  };

  const removeCreateProductImageFile = (index) => {
    const updated = createProductImages.filter((_, i) => i !== index);
    setCreateProductImages(updated);
  };

  const createNewProduct = async () => {
    try {
      if (!newProduct.name.trim()) {
        setError('Product name is required');
        return;
      }
      if (!newProduct.price || parseFloat(newProduct.price) <= 0) {
        setError('Valid price is required');
        return;
      }
      if (createProductImages.length === 0) {
        setError('At least one image is required');
        return;
      }

      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description || '');
      formData.append('price', parseFloat(newProduct.price));
      formData.append('discountedPrice', newProduct.discountedPrice ? parseFloat(newProduct.discountedPrice) : parseFloat(newProduct.price));
      formData.append('category', newProduct.category);
      formData.append('stock', parseInt(newProduct.stock) || 0);

      // Add images
      createProductImages.forEach((img) => {
        formData.append('images', img.file);
      });

      const response = await productService.createProduct(formData);
      
      console.log('Product created:', response.data);
      
      setSuccess('Product created successfully!');
      setNewProduct({
        name: '',
        description: '',
        price: '',
        discountedPrice: '',
        category: 'electronics',
        stock: '',
        images: [],
      });
      setCreateProductImages([]);
      
      // Add small delay to ensure server processed the files
      setTimeout(() => {
        fetchProducts();
        calculateAnalytics();
      }, 500);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
      console.error('Error creating product:', err);
    }
  }

  const startEditingProduct = (product) => {
    setEditingProduct(product);
    // Convert image URLs to absolute URLs for display
    const imagesWithAbsoluteUrls = (product.images || []).map(img => ({
      ...img,
      url: getImageUrl(img.url)
    }));
    setImages(imagesWithAbsoluteUrls);
    setImageFiles([]); // Reset new images when starting to edit
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const saveChanges = async () => {
    try {
      // Check if there's at least one new image to upload
      if (imageFiles.length === 0) {
        setError('Please upload at least one image');
        return;
      }

      const formData = new FormData();
      formData.append('name', editingProduct.name);
      formData.append('description', editingProduct.description || '');
      formData.append('price', parseFloat(editingProduct.price));
      formData.append('discountedPrice', editingProduct.discountedPrice ? parseFloat(editingProduct.discountedPrice) : parseFloat(editingProduct.price));
      formData.append('category', editingProduct.category);
      formData.append('stock', parseInt(editingProduct.stock) || 0);

      // Add new image files
      imageFiles.forEach((img) => {
        formData.append('images', img.file);
      });

      await productService.updateProduct(editingProduct._id, formData);
      setSuccess('Product updated successfully!');
      setEditingProduct(null);
      setImages([]);
      setImageFiles([]);
      fetchProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
    }
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setImages([]);
    setImageFiles([]);
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        setSuccess('Product deleted successfully!');
        fetchProducts();
        calculateAnalytics();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="admin-panel access-denied">
        <h2>Access Denied</h2>
        <p>Only administrators can access this page.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage products, analytics, and inventory</p>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <FiBarChart2 size={18} />
          Analytics
        </button>
        <button
          className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          <FiEdit2 size={18} />
          Manage Products
        </button>
        <button
          className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          <FiPlus size={18} />
          Add New Product
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="analytics-section">
          <h2>Product Analytics</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <div className="analytics-value">{analytics.totalProducts}</div>
              <div className="analytics-label">Total Products</div>
            </div>
            <div className="analytics-card">
              <div className="analytics-value">${analytics.totalRevenue}</div>
              <div className="analytics-label">Total Revenue (Est.)</div>
            </div>
            <div className="analytics-card">
              <div className="analytics-value">{analytics.avgRating}</div>
              <div className="analytics-label">Average Rating</div>
            </div>
            <div className="analytics-card">
              <div className="analytics-value">{Object.keys(analytics.categories).length}</div>
              <div className="analytics-label">Categories</div>
            </div>
          </div>

          <div className="categories-section">
            <h3>Products by Category</h3>
            <div className="categories-list">
              {Object.entries(analytics.categories).map(([category, count]) => (
                <div key={category} className="category-item">
                  <span className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  <span className="category-count">{count} products</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Product Tab */}
      {activeTab === 'create' && (
        <div className="create-product-section">
          <h2>Create New Product</h2>
          <div className="create-form">
            <div className="form-row">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="form-control"
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="beauty">Beauty</option>
                  <option value="home">Home & Garden</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Enter product description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="form-control"
                rows="4"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Original Price *</label>
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Discounted Price</label>
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={newProduct.discountedPrice}
                  onChange={(e) => setNewProduct({ ...newProduct, discountedPrice: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  placeholder="0"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Product Images *</label>
              <div 
                className="file-upload"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleCreateProductDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleCreateProductImageUpload}
                  id="create-images"
                  className="file-input"
                />
                <label htmlFor="create-images" className="file-label">
                  <FiUpload size={24} />
                  <span>Click to upload or drag & drop images</span>
                </label>
              </div>

              {createProductImages.length > 0 && (
                <div className="images-grid">
                  {createProductImages.map((img, idx) => (
                    <div key={idx} className="image-card">
                      <img src={img.preview} alt="preview" />
                      <div className="image-info">
                        <input
                          type="text"
                          placeholder="Alt text..."
                          value={img.alt}
                          onChange={(e) => {
                            const updated = [...createProductImages];
                            updated[idx].alt = e.target.value;
                            setCreateProductImages(updated);
                          }}
                          className="form-control small"
                        />
                        <button
                          className="btn-remove"
                          onClick={() => removeCreateProductImageFile(idx)}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" onClick={createNewProduct}>
                <FiPlus size={18} />
                Create Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Products Tab */}
      {activeTab === 'manage' && (
        editingProduct ? (
        <div className="edit-panel">
          <div className="edit-header">
            <h2>Edit Product: {editingProduct.name}</h2>
            <button className="btn-close" onClick={cancelEditing}>
              <FiX size={24} />
            </button>
          </div>

          {/* Edit Product Form */}
          <div className="edit-form">
            <div className="form-row">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="form-control"
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="beauty">Beauty</option>
                  <option value="home">Home & Garden</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="form-control"
                rows="4"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Original Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Discounted Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.discountedPrice || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, discountedPrice: parseFloat(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="images-editor">
            <h3>Product Images ({imageFiles.length})</h3>

            <div className="images-grid">
              {imageFiles.length > 0 && imageFiles.map((img, idx) => (
                <div key={`new-${idx}`} className="image-card">
                  <img src={img.preview} alt="preview" />
                  <div className="image-info">
                    <p className="image-alt">New image</p>
                    <button
                      className="btn-remove"
                      onClick={() => removeImageFile(idx)}
                      title="Remove image"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="file-upload"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleEditProductDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageFileUpload}
                id="edit-product-images"
                className="file-input"
              />
              <label htmlFor="edit-product-images" className="file-label">
                <FiUpload size={24} />
                <span>Click to upload or drag & drop images</span>
              </label>
            </div>
          </div>

          <div className="edit-actions">
            <button className="btn btn-primary" onClick={saveChanges}>
              <FiCheck size={18} />
              Save Changes
            </button>
            <button className="btn btn-secondary" onClick={cancelEditing}>
              Cancel
            </button>
          </div>
        </div>
        ) : (
        <div className="products-list">
          <h2>Products</h2>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : products.length === 0 ? (
            <p className="no-products">No products found</p>
          ) : (
            <div className="products-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Images</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <strong>{product.name}</strong>
                      </td>
                      <td>{product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>
                        <div className="image-thumbnails">
                          {product.images?.map((img, idx) => (
                            <img
                              key={idx}
                              src={getImageUrl(img.url)}
                              alt={img.alt}
                              className="thumb"
                              title={img.alt}
                            />
                          ))}
                        </div>
                      </td>
                      <td>{product.stock}</td>
                      <td>
                        <button
                          className="btn-action"
                          onClick={() => startEditingProduct(product)}
                          title="Edit product"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <br></br>
                        <button
                          className="btn-action btn-danger"
                          onClick={() => deleteProduct(product._id)}
                          title="Delete product"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        )
      )}
    </div>
  );
};

export default AdminPanel;
