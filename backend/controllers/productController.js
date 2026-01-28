const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, sort } = req.query;
    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let products = Product.find(query);

    if (sort === 'price_asc') {
      products = products.sort({ price: 1 });
    } else if (sort === 'price_desc') {
      products = products.sort({ price: -1 });
    } else if (sort === 'newest') {
      products = products.sort({ createdAt: -1 });
    } else if (sort === 'rating') {
      products = products.sort({ rating: -1 });
    }

    const data = await products;

    res.status(200).json({
      success: true,
      count: data.length,
      products: data,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.userId', 'firstName lastName');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Handle image upload
    if (req.file) {
      const imageUrl = `/uploads/${req.file.filename}`;
      productData.images = [{
        url: imageUrl,
        alt: req.body.name || 'Product image'
      }];
    }

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Add review to product
// @route   POST /api/products/:id/review
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const review = {
      userId: req.user.id,
      rating,
      comment,
    };

    product.reviews.push(review);

    // Update product rating
    const avgRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;
    product.rating = avgRating;
    product.numberOfReviews = product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
