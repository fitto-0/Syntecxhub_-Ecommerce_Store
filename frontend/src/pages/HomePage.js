import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiPackage, FiLock, FiRotateCw, FiHeadphones, FiArrowRight, FiTrendingUp, FiZap } from 'react-icons/fi';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import './styles/HomePage.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAllProducts({ limit: 12, sort: 'random' });
        setFeaturedProducts(response.data.products.slice(0, 6));
        setAllProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${searchQuery}`;
    }
  };

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    alert(`Thank you! We'll send updates to ${email}`);
    setEmail('');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hero-grid">
              <div className="hero-text">
                <p className="hero-eyebrow">Welcome to NOVA</p>

                <h1>
                  Give All You<br />Need
                </h1>

                <p className="hero-description">
                  Discover amazing products at unbeatable prices. Shop from thousands
                  of quality items with secure checkout.
                </p>

                <form onSubmit={handleSearch} className="hero-search">
                  <input
                    type="text"
                    placeholder="Search in NOVA"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit">
                    <FiSearch size={18} />
                  </button>
                </form>

                <div className="hero-cta">
                  <Link to="/products">Shop Now</Link>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BIG BACKGROUND TEXT */}
        <div className="shop-text-container">
          <div className="shop-text">NOVA</div>
        </div>
      </section>


      {/* Categories Section */}
      <section className="categories-section py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold mb-8 text-black">Category</h3>
          <div className="grid grid-cols-3 gap-3">
            {['All Products', 'Electronics', 'Clothing', 'Books', 'Home', 'Beauty'].map((cat, idx) => (
              <Link
                key={idx}
                to={cat === 'All Products' ? '/products' : `/products?category=${cat.toLowerCase()}`}
                className="p-3 bg-white rounded-lg text-center hover:shadow-md transition border border-gray-200 hover:border-black font-medium text-sm"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured/Main Products Grid */}
      <section className="featured-section py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-2">Featured</h2>

          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid gap-6 mb-12">
              {featuredProducts.slice(0, 6).map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  style={{ textDecoration: 'none' }}
                  className="group"
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-12">No products available</p>
          )}

          {/* Pagination */}
          
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-4">
            <div className="benefit-card">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <FiPackage size={26} className="text-black" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $100</p>
            </div>

            <div className="benefit-card p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <FiLock size={26} className="text-black" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">100% secure transactions</p>
            </div>

            <div className="benefit-card p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <FiRotateCw size={26} className="text-black" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </div>

            <div className="benefit-card p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <FiHeadphones size={26} className="text-black" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">We're here to help</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default HomePage;
