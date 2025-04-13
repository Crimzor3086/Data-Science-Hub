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

// Get user activity by role (admin only)
router.get('/activity-by-role', adminMiddleware, async (req, res) => {
  try {
    const roleActivity = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
          activeUsers: {
            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] }
          },
          lastLoginAvg: { $avg: "$lastLogin" }
        }
      },
      {
        $project: {
          role: "$_id",
          count: 1,
          activeUsers: 1,
          lastLoginAvg: 1,
          _id: 0
        }
      }
    ]);

    res.json(roleActivity);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching role activity data' });
  }
});

// Get user registration trends (admin only)
router.get('/registration-trends', adminMiddleware, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    let dateFormat = "%Y-%m-%d";
    let daysAgo = 30;
    
    if (period === 'week') {
      dateFormat = "%Y-%m-%d";
      daysAgo = 7;
    } else if (period === 'year') {
      dateFormat = "%Y-%m";
      daysAgo = 365;
    }
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    
    const registrationTrends = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: "$createdAt" } },
          count: { $sum: 1 },
          byRole: {
            $push: {
              role: "$role",
              name: "$name"
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.json(registrationTrends);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching registration trends' });
  }
});

// Get system performance metrics (admin only)
router.get('/performance', adminMiddleware, async (req, res) => {
  try {
    // In a real application, you would collect these metrics from your system
    // For now, we'll return mock data
    const performanceMetrics = {
      responseTime: {
        average: 120, // ms
        p95: 250,
        p99: 500
      },
      cpuUsage: {
        average: 45, // percentage
        peak: 78
      },
      memoryUsage: {
        used: 1024, // MB
        total: 2048,
        percentage: 50
      },
      databaseMetrics: {
        connections: 25,
        queryTime: {
          average: 15, // ms
          slow: 3 // count of slow queries
        }
      },
      uptime: 99.98 // percentage
    };
    
    res.json(performanceMetrics);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching performance metrics' });
  }
});

// Get error logs (admin only)
router.get('/errors', adminMiddleware, async (req, res) => {
  try {
    // In a real application, you would collect these from your error logging system
    // For now, we'll return mock data
    const errorLogs = [
      {
        id: 1,
        timestamp: new Date(Date.now() - 3600000),
        level: 'error',
        message: 'Database connection timeout',
        stack: 'Error: Connection timed out at Database.connect...',
        user: 'system'
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 7200000),
        level: 'warning',
        message: 'High memory usage detected',
        stack: 'Warning: Memory usage above 80% at SystemMonitor.check...',
        user: 'system'
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 86400000),
        level: 'error',
        message: 'API endpoint failed',
        stack: 'Error: 500 Internal Server Error at /api/users...',
        user: 'admin'
      }
    ];
    
    res.json(errorLogs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching error logs' });
  }
});

export const analyticsRoutes = router; 