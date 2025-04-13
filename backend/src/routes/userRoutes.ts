import express from 'express';
import { User, UserRole } from '../models/User';
import { adminMiddleware } from '../middleware/authMiddleware';

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

export const userRoutes = router; 