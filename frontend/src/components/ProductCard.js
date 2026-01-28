import React from 'react';
import { FiStar } from 'react-icons/fi';
import './styles/ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        <img
          src={product.images?.[0]?.url || 'https://via.placeholder.com/300x300'}
          alt={product.name}
          loading="lazy"
        />
        {product.discountedPrice && (
          <div className="discount-badge">
            -
            {Math.round(
              ((product.price - product.discountedPrice) / product.price) * 100
            )}
            %
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <div className="rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <FiStar
              key={i}
              size={16}
              fill={i < Math.round(product.rating) ? '#fbbf24' : 'none'}
              color={i < Math.round(product.rating) ? '#fbbf24' : '#cbd5e1'}
            />
          ))}
          <span className="review-count">({product.numberOfReviews})</span>
        </div>
        <div className="price">
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
        <p className="stock-status">
          {product.stock > 0 ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
