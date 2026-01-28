import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { productService } from '../services/api';
import { useCart } from '../hooks/useCart';
import './styles/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getProductById(id);
        setProduct(response.data.product);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addToCart(product._id, quantity);
      setSuccess(`${product.name} added to cart!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (error) return <div className="error-container"><p>{error}</p></div>;
  if (!product) return <div className="error-container"><p>Product not found</p></div>;

  return (
    <div className="product-detail-page">
      <div className="container">
        <Link to="/products" className="back-link">← Back to Products</Link>

        <div className="product-detail-wrapper">
          <div className="product-images">
            <div className="main-image">
              <img
                src={product.images?.[0]?.url || 'https://via.placeholder.com/500x500'}
                alt={product.name}
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnails">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={`${product.name} ${idx}`}
                    className="thumbnail"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-details">
            <div className="badge">{product.category}</div>
            <h1>{product.name}</h1>

            <div className="rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar
                  key={i}
                  size={18}
                  fill={i < Math.round(product.rating) ? '#fbbf24' : 'none'}
                  color={i < Math.round(product.rating) ? '#fbbf24' : '#cbd5e1'}
                />
              ))}
              <span className="review-count">({product.numberOfReviews} reviews)</span>
            </div>

            <div className="price-section">
              {product.discountedPrice ? (
                <>
                  <span className="current-price">${product.discountedPrice.toFixed(2)}</span>
                  <span className="original-price">${product.price.toFixed(2)}</span>
                  <span className="discount-label">
                    Save {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                  </span>
                </>
              ) : (
                <span className="current-price">${product.price.toFixed(2)}</span>
              )}
            </div>

            <p className="description">{product.description}</p>

            <div className="product-meta">
              <div className="meta-item">
                <span className="label">Stock:</span>
                <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </div>
            </div>

            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}

            <div className="add-to-cart-section">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="number" min="1" max={product.stock} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
              </div>
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || addingToCart}
              >
                <FiShoppingCart size={20} />
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
