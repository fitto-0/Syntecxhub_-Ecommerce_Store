const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, authorize('admin'), upload.array('images', 10), createProduct);
router.put('/:id', protect, authorize('admin'), upload.array('images', 10), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);
router.post('/:id/review', protect, addReview);

module.exports = router;
