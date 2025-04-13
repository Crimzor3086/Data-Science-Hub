import express from 'express';
import { adminMiddleware } from '../middleware/authMiddleware';
import { User, UserRole } from '../models/User';
import { z } from 'zod';

const router = express.Router();

// Apply admin middleware to all routes
router.use(adminMiddleware);

// System settings schema
const systemSettingsSchema = z.object({
  maintenanceMode: z.boolean().optional(),
  allowNewRegistrations: z.boolean().optional(),
  maxUsersPerRole: z.record(z.number()).optional(),
  emailNotifications: z.boolean().optional(),
  sessionTimeout: z.number().optional(),
  passwordPolicy: z.object({
    minLength: z.number().optional(),
    requireSpecialChars: z.boolean().optional(),
    requireNumbers: z.boolean().optional(),
    expiryDays: z.number().optional()
  }).optional()
});

// Mock system settings (in a real app, this would be stored in a database)
let systemSettings = {
  maintenanceMode: false,
  allowNewRegistrations: true,
  maxUsersPerRole: {
    [UserRole.ADMIN]: 5,
    [UserRole.CLIENT]: 100,
    [UserRole.STUDENT]: 1000
  },
  emailNotifications: true,
  sessionTimeout: 3600, // 1 hour in seconds
  passwordPolicy: {
    minLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    expiryDays: 90
  }
};

// Get system settings
router.get('/settings', (req, res) => {
  res.json(systemSettings);
});

// Update system settings
router.patch('/settings', (req, res) => {
  try {
    const updates = systemSettingsSchema.parse(req.body);
    systemSettings = { ...systemSettings, ...updates };
    res.json(systemSettings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid settings format', details: error.errors });
    }
    res.status(500).json({ error: 'Error updating system settings' });
  }
});

// Bulk user operations
router.post('/users/bulk', async (req, res) => {
  try {
    const { operation, userIds, data } = req.body;
    
    if (!operation || !userIds || !Array.isArray(userIds)) {
      return res.status(400).json({ error: 'Invalid request format' });
    }
    
    let result;
    
    switch (operation) {
      case 'activate':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { $set: { status: 'active' } }
        );
        break;
      case 'deactivate':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { $set: { status: 'inactive' } }
        );
        break;
      case 'changeRole':
        if (!data || !data.role) {
          return res.status(400).json({ error: 'Role is required for changeRole operation' });
        }
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { $set: { role: data.role } }
        );
        break;
      default:
        return res.status(400).json({ error: 'Invalid operation' });
    }
    
    res.json({ 
      message: `Bulk operation '${operation}' completed successfully`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Error performing bulk operation' });
  }
});

// User search with advanced filters
router.get('/users/search', async (req, res) => {
  try {
    const { 
      query, 
      role, 
      status, 
      createdAfter, 
      createdBefore,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;
    
    const filter: any = {};
    
    // Text search
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ];
    }
    
    // Role filter
    if (role) {
      filter.role = role;
    }
    
    // Status filter
    if (status) {
      filter.status = status;
    }
    
    // Date range filters
    if (createdAfter || createdBefore) {
      filter.createdAt = {};
      if (createdAfter) filter.createdAt.$gte = new Date(createdAfter as string);
      if (createdBefore) filter.createdAt.$lte = new Date(createdBefore as string);
    }
    
    // Sorting
    const sortOptions: any = {};
    sortOptions[sortBy as string] = sortOrder === 'asc' ? 1 : -1;
    
    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    const users = await User.find(filter)
      .select('-password')
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));
    
    const total = await User.countDocuments(filter);
    
    res.json({
      users,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error searching users' });
  }
});

// Export user data
router.get('/users/export', async (req, res) => {
  try {
    const { format = 'json' } = req.query;
    
    const users = await User.find({}, '-password');
    
    if (format === 'csv') {
      // In a real app, you would use a CSV library to convert the data
      // For now, we'll just return JSON
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
      return res.send(JSON.stringify(users));
    }
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error exporting user data' });
  }
});

// System logs (mock data)
router.get('/logs', (req, res) => {
  try {
    const { type = 'all', limit = 50 } = req.query;
    
    // In a real app, you would fetch logs from a logging system
    // For now, we'll return mock data
    const logs = [
      {
        id: 1,
        timestamp: new Date(Date.now() - 3600000),
        level: 'info',
        message: 'User admin logged in',
        user: 'admin',
        ip: '192.168.1.1'
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 7200000),
        level: 'info',
        message: 'User john.doe created',
        user: 'admin',
        ip: '192.168.1.1'
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 86400000),
        level: 'warning',
        message: 'Failed login attempt',
        user: 'unknown',
        ip: '192.168.1.100'
      }
    ];
    
    // Filter by type if specified
    const filteredLogs = type === 'all' 
      ? logs 
      : logs.filter(log => log.level === type);
    
    res.json(filteredLogs.slice(0, Number(limit)));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching system logs' });
  }
});

export const adminRoutes = router; 