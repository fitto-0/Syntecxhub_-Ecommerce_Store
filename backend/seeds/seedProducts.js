const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
    price: 99.99,
    discountedPrice: 79.99,
    category: 'Electronics',
    stock: 15,
    images: [
      {
        url: 'https://via.placeholder.com/400x400?text=Wireless+Headphones',
        alt: 'Wireless Headphones',
      },
    ],
    rating: 4.5,
    numberOfReviews: 12,
    tags: ['electronics', 'audio', 'wireless'],
    isActive: true,
  },
  {
    name: 'USB-C Cable',
    description: 'Durable USB-C charging cable with fast data transfer speeds up to 480Mbps',
    price: 19.99,
    discountedPrice: 14.99,
    category: 'Electronics',
    stock: 50,
    images: [
      {
        url: 'https://via.placeholder.com/400x400?text=USB-C+Cable',
        alt: 'USB-C Cable',
      },
    ],
    rating: 4.2,
    numberOfReviews: 23,
    tags: ['electronics', 'cable', 'charging'],
    isActive: true,
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt available in multiple colors and sizes',
    price: 34.99,
    category: 'Clothing',
    stock: 100,
    images: [
      {
        url: 'https://via.placeholder.com/400x400?text=Cotton+T-Shirt',
        alt: 'Cotton T-Shirt',
      },
    ],
    rating: 4.0,
    numberOfReviews: 8,
    tags: ['clothing', 'casual', 'cotton'],
    isActive: true,
  },
  {
    name: 'JavaScript Bible',
    description: 'Complete guide to modern JavaScript programming with ES6+ and best practices',
    price: 59.99,
    discountedPrice: 49.99,
    category: 'Books',
    stock: 30,
    images: [
      {
        url: 'https://via.placeholder.com/400x400?text=JavaScript+Bible',
        alt: 'JavaScript Bible',
      },
    ],
    rating: 4.7,
    numberOfReviews: 34,
    tags: ['books', 'programming', 'javascript'],
    isActive: true,
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature for your workspace',
    price: 49.99,
    discountedPrice: 39.99,
    category: 'Home',
    stock: 25,
    images: [
      {
        url: 'https://via.placeholder.com/400x400?text=Desk+Lamp',
        alt: 'Desk Lamp',
      },
    ],
    rating: 4.4,
    numberOfReviews: 16,
    tags: ['home', 'lighting', 'office'],
    isActive: true,
  },
  {
    name: 'Face Moisturizer',
    description: 'Hydrating face moisturizer with natural ingredients for all skin types',
    price: 44.99,
    discountedPrice: 34.99,
    category: 'Beauty',
    stock: 40,
    images: [
      {
        url: 'https://via.placeholder.com/400x400?text=Face+Moisturizer',
        alt: 'Face Moisturizer',
      },
    ],
    rating: 4.6,
    numberOfReviews: 28,
    tags: ['beauty', 'skincare', 'moisturizer'],
    isActive: true,
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with carrying strap perfect for yoga and fitness training',
    price: 39.99,
    category: 'Sports',
    stock: 35,
    images: [
      {
        url: 'https://via.placeholder.com/400x400?text=Yoga+Mat',
        alt: 'Yoga Mat',
      },
    ],
    rating: 4.3,
    numberOfReviews: 19,
    tags: ['sports', 'fitness', 'yoga'],
    isActive: true,
  },
  {
    name: 'Portable Speaker',
    description: 'Waterproof Bluetooth speaker with powerful 360-degree sound quality',
    price: 79.99,
    discountedPrice: 59.99,
    category: 'Electronics',
    stock: 20,
    images: [
      {
        url: 'https://via.placeholder.com/400x400?text=Portable+Speaker',
        alt: 'Portable Speaker',
      },
    ],
    rating: 4.5,
    numberOfReviews: 31,
    tags: ['electronics', 'audio', 'speaker'],
    isActive: true,
  },
];

async function seedDatabase() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${createdProducts.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
