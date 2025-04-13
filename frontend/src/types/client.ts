import { UserRole } from './admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  company?: string;
  bio?: string;
  logo?: string;
  profileImage?: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  deadline?: Date;
  teamMembers: string[];
  client: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  purpose: string;
  status: 'pending' | 'active' | 'archived';
  createdAt: Date;
  size: number;
  format: string;
  accessLevel: 'public' | 'private' | 'restricted';
  tags: string[];
  feedback: {
    id: string;
    comment: string;
    rating: number;
    createdAt: Date;
    createdBy: string;
  }[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  enrolledCourses: string[];
  assignedProjects: string[];
  progress: {
    [courseId: string]: number;
  };
  lastActive: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  modules: {
    id: string;
    title: string;
    duration: number;
    type: 'video' | 'reading' | 'quiz' | 'assignment';
  }[];
  enrolledStudents: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  subject: string;
  content: string;
  from: string;
  to: string;
  createdAt: Date;
  isRead: boolean;
  isNotification: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetAudience: UserRole[];
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  assignedTo?: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  type: 'analytics' | 'performance' | 'usage' | 'custom';
  format: 'pdf' | 'excel' | 'csv';
  date: Date;
  size: number;
  downloads: number;
  url?: string;
}

export interface BillingInfo {
  id: string;
  plan: 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended';
  paymentMethod: 'credit_card' | 'bank_transfer' | 'paypal';
  billingAddress: string;
  invoices: {
    id: string;
    date: Date;
    amount: number;
    status: 'paid' | 'pending' | 'failed';
  }[];
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: 'project' | 'dataset' | 'student' | 'course' | 'message' | 'ticket';
  entityId: string;
  userId: string;
  timestamp: Date;
  details: Record<string, string | number | boolean | null>;
} 