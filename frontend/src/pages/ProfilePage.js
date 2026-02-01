import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authService, orderService } from '../services/api';
import { FiCamera, FiUser } from 'react-icons/fi';
import './styles/ProfilePage.css';
import '../components/styles/ProfileImage.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const response = await orderService.getUserOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image size should be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await authService.uploadProfileImage(formData);
      
      // Update user data with new profile image
      updateUser({ ...user, profileImage: response.data.profileImage });
      setFormData({ ...formData, profileImage: response.data.profileImage });
      
      setMessage('Profile image updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to upload profile image');
      console.error('Upload error:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await authService.updateProfile(formData);
      updateUser(formData);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>

        {message && <div className="message">{message}</div>}

        <div className="profile-wrapper">
          <div className="profile-card">
            <h2>Personal Information</h2>
            
            {/* Profile Image Section */}
            <div className="profile-image-section">
              <div className="profile-image-container">
                {formData.profileImage ? (
                  <img 
                    src={formData.profileImage.startsWith('http') ? formData.profileImage : `http://localhost:5000${formData.profileImage}`} 
                    alt="Profile" 
                    className="profile-avatar"
                  />
                ) : (
                  <div className="profile-avatar-placeholder">
                    <FiUser size={48} />
                  </div>
                )}
                <button 
                  className="upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  title={uploadingImage ? 'Uploading...' : 'Change Profile Photo'}
                >
                  <FiCamera size={18} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
            {isEditing ? (
              <div className="form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={formData.email || ''} disabled />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} />
                </div>
                <div className="button-group">
                  <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={() => setIsEditing(false)} className="btn btn-outline">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-info">
                <p>
                  <strong>Name:</strong> {formData.firstName} {formData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone || 'Not provided'}
                </p>
                <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <div className="orders-card">
            <h2>Recent Orders</h2>
            {orders.length > 0 ? (
              <div className="orders-list">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="order-item">
                    <div>
                      <p className="order-number">{order.orderNumber}</p>
                      <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="order-amount">${order.totalAmount.toFixed(2)}</p>
                      <p className={`order-status ${order.orderStatus}`}>{order.orderStatus}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-orders">No orders yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
