import express from 'express';
import { User } from '../models/User';
import { adminMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Get platform statistics (admin only)
router.get('/stats', adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const students = await User.countDocuments({ role: 'STUDENT' });
    const clients = await User.countDocuments({ role: 'CLIENT' });
    const admins = await User.countDocuments({ role: 'ADMIN' });

    res.json({
      totalUsers,
      activeUsers,
      students,
      clients,
      admins
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching platform statistics' });
  }
});

// Get recent user activity (admin only)
router.get('/activity', adminMiddleware, async (req, res) => {
  try {
    const recentUsers = await User.find()
      .sort({ lastLogin: -1 })
      .limit(10)
      .select('-password');

    res.json(recentUsers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recent activity' });
  }
});

// Get user growth over time (admin only)
router.get('/growth', adminMiddleware, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newUsers = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json(newUsers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user growth data' });
  }
});

export const analyticsRoutes = router; 