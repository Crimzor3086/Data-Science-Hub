import express from 'express';
import { User, UserRole } from '../models/User';
import { adminMiddleware } from '../middleware/authMiddleware';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get all users (admin only)
router.get('/', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Get user by ID (admin only)
router.get('/:id', adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Create new user (admin only)
router.post('/', adminMiddleware, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({
      name,
      email,
      password,
      role: role || UserRole.STUDENT
    });
    await user.save();
    res.status(201).json({ ...user.toJSON(), password: undefined });
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
});

// Update user (admin only)
router.patch('/:id', adminMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'role', 'status'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    updates.forEach(update => {
      user[update] = req.body[update];
    });

    await user.save();
    res.json({ ...user.toJSON(), password: undefined });
  } catch (error) {
    res.status(400).json({ error: 'Error updating user' });
  }
});

// Delete user (admin only)
router.delete('/:id', adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Get all users
router.get('/all', auth, async (req, res) => {
  try {
    // TODO: Replace with actual database queries
    const users = [
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "admin",
        status: "Active",
        lastLogin: new Date().toISOString(),
        createdAt: new Date(Date.now() - 180000000).toISOString()
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "client",
        status: "Active",
        lastLogin: new Date(Date.now() - 86400000).toISOString(),
        createdAt: new Date(Date.now() - 360000000).toISOString()
      },
      {
        id: "3",
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        role: "student",
        status: "Active",
        lastLogin: new Date(Date.now() - 172800000).toISOString(),
        createdAt: new Date(Date.now() - 720000000).toISOString()
      },
      {
        id: "4",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        role: "student",
        status: "Inactive",
        lastLogin: new Date(Date.now() - 259200000).toISOString(),
        createdAt: new Date(Date.now() - 1080000000).toISOString()
      },
      {
        id: "5",
        name: "David Brown",
        email: "david.brown@example.com",
        role: "client",
        status: "Active",
        lastLogin: new Date(Date.now() - 345600000).toISOString(),
        createdAt: new Date(Date.now() - 1440000000).toISOString()
      }
    ];

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Create a new user
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    
    // TODO: Add validation
    // TODO: Replace with actual database operation
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
      status,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Update a user
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status } = req.body;
    
    // TODO: Add validation
    // TODO: Replace with actual database operation
    
    const updatedUser = {
      id,
      name,
      email,
      role,
      status,
      lastLogin: new Date().toISOString(),
      createdAt: new Date(Date.now() - 180000000).toISOString()
    };

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete a user
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Replace with actual database operation
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

export default router; 