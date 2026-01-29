const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');
const connectDB = require('../config/db');

// Load .env from backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

connectDB();

async function seedDatabase() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('✓ Cleared all products from database');
    console.log('✓ Database is now empty - use the Admin Panel to add products');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
