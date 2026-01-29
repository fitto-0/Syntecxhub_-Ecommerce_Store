# NOVA - Full-Stack E-Commerce Application (MERN)

A modern, fully-featured e-commerce web application built with MongoDB, Express.js, React, and Node.js (MERN stack).

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Features Overview](#-features-overview)

## ✨ Features

### User Side
- **Product Browsing**: Modern grid layouts with product cards
- **Search & Filtering**: Search, filter by category, and sort by price/rating
- **Product Details**: Detailed product pages with image galleries
- **Shopping Cart**: Add/remove products, update quantities
- **Checkout Process**: Multi-step checkout with order summary
- **User Authentication**: Secure JWT-based login/registration
- **Profile Management**: View/edit user profile and address information
- **Order History**: Track and view all past orders
- **Order Status Tracking**: Real-time order status updates

### Admin Dashboard
- **Product Management**: Add, edit, and delete products
- **Order Management**: View all orders and update order status
- **Analytics Overview**: Dashboard with key metrics
- **Inventory Management**: Monitor product stock levels

### Technical Features
- **Responsive Design**: Fully responsive across all devices
- **Modern UI/UX**: Clean, minimalist design with smooth animations
- **Secure Authentication**: JWT-based authentication with password hashing
- **Role-Based Access Control**: Customer and admin roles
- **Persistent Cart**: Local storage + database integration
- **Payment Integration Ready**: Support for multiple payment methods
- **Error Handling**: Comprehensive error management
- **Performance Optimized**: Lazy loading, efficient queries

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling with custom properties

## 📁 Project Structure

```
ecommerce-website/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Footer.js
    │   │   ├── ProductCard.js
    │   │   └── styles/
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── ProductListPage.js
    │   │   ├── ProductDetailPage.js
    │   │   ├── CartPage.js
    │   │   ├── CheckoutPage.js
    │   │   ├── LoginPage.js
    │   │   ├── RegisterPage.js
    │   │   ├── ProfilePage.js
    │   │   ├── OrderHistoryPage.js
    │   │   ├── AdminDashboard.js
    │   │   ├── NotFoundPage.js
    │   │   └── styles/
    │   ├── context/
    │   │   ├── AuthContext.js
    │   │   └── CartContext.js
    │   ├── services/
    │   │   └── api.js
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   └── useCart.js
    │   ├── styles/
    │   │   └── global.css
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Server will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm start
```

Application will open on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Product Endpoints

- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `POST /api/products/:id/review` - Add review (protected)

### Cart Endpoints

- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart/add` - Add to cart (protected)
- `PUT /api/cart/item/:itemId` - Update cart item (protected)
- `DELETE /api/cart/item/:itemId` - Remove from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Order Endpoints

- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `GET /api/orders/admin/all` - Get all orders (admin only)
- `PUT /api/orders/:id` - Update order status (admin only)

## 🗄 Database Schema

### User Model
- firstName, lastName, email (unique), password (hashed)
- phone, address (street, city, state, zipCode, country)
- role (customer/admin), isActive
- Timestamps (createdAt, updatedAt)

### Product Model
- name, description, price, discountedPrice
- category, stock, images array
- rating, numberOfReviews, reviews array
- tags, isActive
- Timestamps

### Cart Model
- userId (unique), items array (productId, quantity, price)
- totalPrice, timestamps

### Order Model
- orderNumber (unique), userId, items array
- shippingAddress, billingAddress
- subtotal, shippingCost, tax, totalAmount
- paymentMethod, paymentStatus, orderStatus
- trackingNumber, timestamps

## 🎨 Features Overview

### Home Page
- Hero section with call-to-action
- Featured products showcase
- Benefits section
- Responsive design

### Product Listing
- Grid layout with product cards
- Search functionality
- Category filtering
- Sorting options (price, rating, newest)
- Pagination ready

### Product Detail
- Full product information
- Image gallery
- Rating and reviews
- Stock status
- Add to cart with quantity selector

### Shopping Cart
- Product list with images
- Quantity adjustment
- Remove items
- Cart summary with totals
- Checkout button

### Checkout
- Multi-step checkout process
- Shipping address
- Billing address option
- Payment method selection
- Order summary

### User Profile
- Personal information editing
- Address management
- Recent orders view
- Order history navigation

### Admin Dashboard
- Dashboard overview with stats
- Product management (add/edit/delete)
- Order management
- Order status tracking
- Analytics

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with middleware
- Role-based authorization
- CORS enabled
- Environment variables for sensitive data
- Secure password validation

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Optimized images and layouts
- Responsive navigation

## 🚢 Deployment Ready

The application is production-ready with:
- Environment variable configuration
- Error handling and logging
- Optimized build process
- Security best practices
- API error responses
- Database connection pooling

## 📝 Notes

- Use MongoDB Atlas for cloud database
- Update JWT_SECRET in production
- Configure CORS for production domain
- Use environment-specific configurations
- Implement payment gateway for production
- Add email notifications for orders
- Set up SSL/HTTPS for production

## 🤝 Contributing

This is a learning project. Feel free to fork, modify, and improve!

## 📄 License

MIT License - feel free to use this project for learning and development.

---

**Happy Shopping! 🛍️**
