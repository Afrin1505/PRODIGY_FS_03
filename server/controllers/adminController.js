import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

import { seedData } from '../config/sampleData.js';

export const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, revenue: { $sum: '$total' } } }
    ]);

    res.json({
      users: userCount,
      products: productCount,
      orders: orderCount,
      revenue: totalRevenue[0]?.revenue || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const seedSampleData = async (req, res) => {
  try {
    await seedData();
    res.json({ message: 'Sample data seeded' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
