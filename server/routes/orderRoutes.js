import express from 'express';
import { createOrder, getOrders, getAllOrders } from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/admin/all', isAdmin, getAllOrders);
export default router;
