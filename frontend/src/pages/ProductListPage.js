import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import './styles/ProductListPage.css';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('random');

  useEffect(() => {
    fetchProducts();
  }, [category, search, sort]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts({
        category,
        search,
        sort,
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-list-page">
      <div className="container">
        <h1>Our Products</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter-select">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="home">Home</option>
            <option value="beauty">Beauty</option>
            <option value="sports">Sports</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="filter-select">
            <option value="random">Random (Diverse)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
