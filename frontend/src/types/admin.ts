export type UserRole = 'admin' | 'client' | 'student' | 'instructor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastLogin: Date;
  profileImage?: string;
  phone?: string;
  notes?: string;
}

export interface AdminNote {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  createdBy: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: Date;
  ipAddress: string;
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
  userId: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  activeCourses: number;
  totalProjects: number;
  activeProjects: number;
  totalAssignments: number;
  completedAssignments: number;
  userGrowth: Array<{
    date: string;
    count: number;
  }>;
  courseEnrollments: Array<{
    date: string;
    count: number;
  }>;
  projectSubmissions: Array<{
    date: string;
    count: number;
  }>;
}

export interface SecuritySettings {
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    expiryDays: number;
  };
  twoFactorAuth: {
    enabled: boolean;
    methods: string[];
  };
  sessionSettings: {
    maxDuration: number;
    idleTimeout: number;
    maxConcurrentSessions: number;
  };
  ipRestrictions: {
    enabled: boolean;
    allowedIPs: string[];
    blockedIPs: string[];
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  lastModified: Date;
}

export interface IntegrationConfig {
  apiKey: string;
  settings: Record<string, any>;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
  config: IntegrationConfig;
  lastSync: Date;
} 