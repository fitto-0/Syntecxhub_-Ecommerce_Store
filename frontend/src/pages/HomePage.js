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
        const response = await productService.getAllProducts({ limit: 12 });
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
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-96">
                <div className="hero-text">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
                    Welcome to NOVA
                  </p>
                  <h1 className="text-6xl sm:text-7xl font-black text-black mb-6 leading-tight">
                    Give All You<br />Need
                  </h1>
                  <p className="text-base text-gray-600 mb-8 max-w-md font-light">
                    Discover amazing products at unbeatable prices. Shop from thousands of quality items with secure checkout.
                  </p>
                  
                  {/* Search Bar */}
                  <form onSubmit={handleSearch} className="relative mb-8 max-w-sm">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search in Stuffus"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-5 py-3 pl-5 pr-14 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 bg-white text-sm"
                      />
                      <button
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                      >
                        <FiSearch size={18} />
                      </button>
                    </div>
                  </form>

                  <div className="flex gap-4">
                    <Link 
                      to="/products" 
                      className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3 rounded-md hover:bg-gray-900 transition font-semibold text-sm"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Large "Shop" Text with Image */}
        <div className="shop-text-container">
          <div className="shop-text">
            Shop
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold mb-8 text-black">Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {['All Products', 'Electronics', 'Clothing', 'Books', 'Home', 'Beauty'].map((cat, idx) => (
              <Link
                key={idx}
                to={cat === 'All Products' ? '/products' : `/products?category=${cat}`}
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
          <p className="text-gray-600 text-sm mb-12 font-light">Premium selection of our best products</p>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="benefit-card p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <FiPackage size={32} className="text-black" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $100</p>
            </div>

            <div className="benefit-card p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <FiLock size={32} className="text-black" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">100% secure transactions</p>
            </div>

            <div className="benefit-card p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <FiRotateCw size={32} className="text-black" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </div>

            <div className="benefit-card p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <FiHeadphones size={32} className="text-black" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">We're here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="recommendations py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-black text-black">Explore our recommendations</h2>
              <p className="text-gray-600 text-sm mt-1">Products customers love</p>
            </div>
            <Link 
              to="/products"
              className="hidden sm:flex items-center gap-2 text-black hover:text-gray-700 transition font-semibold text-sm"
            >
              <FiArrowRight size={18} /> ↗
            </Link>
          </div>

          {allProducts.length > 0 ? (
            <div className="grid gap-6">
              {allProducts.slice(0, 6).map((product) => (
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
          ) : null}
        </div>
      </section>

      
    </div>
  );
};

export default HomePage;
