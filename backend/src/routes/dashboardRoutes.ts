import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get dashboard statistics
router.get('/stats', auth, async (req, res) => {
  try {
    // TODO: Replace with actual database queries
    const stats = {
      totalProjects: 12,
      activeProjects: 8,
      completedProjects: 4,
      totalTeamMembers: 24,
      pendingTasks: 15,
      completedTasks: 45,
      upcomingDeadlines: 3,
      recentActivity: [
        {
          id: "1",
          type: "project_update",
          title: "Project Alpha Update",
          description: "New milestone completed",
          timestamp: new Date().toISOString()
        },
        {
          id: "2",
          type: "team_update",
          title: "New Team Member",
          description: "Sarah Johnson joined Project Beta",
          timestamp: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: "3",
          type: "task_update",
          title: "Task Completed",
          description: "Data analysis phase completed",
          timestamp: new Date(Date.now() - 172800000).toISOString()
        }
      ]
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
});

export default router; 