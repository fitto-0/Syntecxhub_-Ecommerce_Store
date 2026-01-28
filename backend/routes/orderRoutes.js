const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrder,
  getAllOrders,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/admin/all', protect, authorize('admin'), getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id', protect, authorize('admin'), updateOrder);

module.exports = router;
