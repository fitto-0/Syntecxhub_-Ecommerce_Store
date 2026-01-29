import React, { useState } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './styles/ProductCard.css';

const getImageUrl = (url) => {
  if (!url) return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23f5f5f5" width="300" height="300"/%3E%3C/svg%3E';
  if (url.startsWith('data:')) return url;
  if (url.startsWith('http')) return url;
  return `http://localhost:5000${url}`;
};

const ProductCard = ({ product, onClick }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => (prev === 0 ? (product.images?.length || 1) - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => (prev === (product.images?.length || 1) - 1 ? 0 : prev + 1));
  };

  const currentImage = getImageUrl(product.images?.[imageIndex]?.url);
  const hasMultipleImages = product.images && product.images.length > 1;

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image-container">
        <div className="product-image">
          <img
            src={currentImage}
            alt={product.images?.[imageIndex]?.alt || product.name}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23f5f5f5" width="300" height="300"/%3E%3C/svg%3E';
            }}
          />
          
          {/* Image Navigation */}
          {hasMultipleImages && (
            <>
              <button className="image-nav prev" onClick={handlePrevImage}>
                <FiChevronLeft size={20} />
              </button>
              <button className="image-nav next" onClick={handleNextImage}>
                <FiChevronRight size={20} />
              </button>
              
              {/* Image Indicators */}
              <div className="image-indicators">
                {product.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`indicator ${idx === imageIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {product.discountedPrice && (
          <div className="discount-badge">
            -
            {Math.round(
              ((product.price - product.discountedPrice) / product.price) * 100
            )}
            %
          </div>
        )}

        <div className="product-badge">
          {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
        </div>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>

        <div className="rating">
          <div className="stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar
                key={i}
                size={14}
                fill={i < Math.round(product.rating) ? '#C9A24D' : 'none'}
                color={i < Math.round(product.rating) ? '#C9A24D' : '#cbd5e1'}
              />
            ))}
          </div>
          <span className="review-count">({product.numberOfReviews})</span>
        </div>

        <div className="price-section">
          {product.discountedPrice ? (
            <>
              <span className="current-price">
                ${product.discountedPrice.toFixed(2)}
              </span>
              <span className="original-price">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="current-price">${product.price.toFixed(2)}</span>
          )}
        </div>

        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
