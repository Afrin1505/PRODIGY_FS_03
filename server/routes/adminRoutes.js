import express from 'express';
import { getDashboardStats, seedSampleData } from '../controllers/adminController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect, isAdmin);
router.get('/stats', getDashboardStats);
router.post('/seed', seedSampleData);
export default router;
