import {
  User,
  UserRole,
  AdminNote,
  AuditLog,
  Announcement,
  SupportTicket,
  PlatformStats,
  SecuritySettings,
  EmailTemplate,
  Integration,
  IntegrationConfig
} from '../types/admin';

class AdminService {
  private static instance: AdminService;
  private users: User[] = [];
  private notes: AdminNote[] = [];
  private logs: AuditLog[] = [];
  private announcements: Announcement[] = [];
  private tickets: SupportTicket[] = [];
  private stats: PlatformStats;
  private securitySettings: SecuritySettings;
  private emailTemplates: EmailTemplate[] = [];
  private integrations: Integration[] = [];

  private constructor() {
    // Initialize mock data
    this.users = [];

    this.securitySettings = {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expiryDays: 90
      },
      twoFactorAuth: {
        enabled: true,
        methods: ['email', 'authenticator']
      },
      sessionSettings: {
        maxDuration: 120,
        idleTimeout: 30,
        maxConcurrentSessions: 3
      },
      ipRestrictions: {
        enabled: false,
        allowedIPs: [],
        blockedIPs: []
      }
    };

    this.stats = {
      totalUsers: 0,
      activeUsers: 0,
      totalCourses: 0,
      activeCourses: 0,
      totalProjects: 0,
      activeProjects: 0,
      totalAssignments: 0,
      completedAssignments: 0,
      userGrowth: [],
      courseEnrollments: [],
      projectSubmissions: []
    };

    this.emailTemplates = [
      {
        id: '1',
        name: 'Welcome Email',
        subject: 'Welcome to Data Science Hub',
        body: 'Welcome {{name}}! We\'re excited to have you on board.',
        variables: ['name'],
        lastModified: new Date()
      }
    ];

    this.integrations = [
      {
        id: '1',
        name: 'Payment Gateway',
        type: 'payment',
        status: 'active',
        config: {
          apiKey: 'mock_api_key',
          settings: {
            environment: 'sandbox',
            currency: 'USD'
          }
        },
        lastSync: new Date()
      }
    ];
  }

  public static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  // User Management
  public async getUsers(): Promise<User[]> {
    return this.users;
  }

  public async getUserById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async createUser(user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      lastLogin: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  public async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return undefined;
    
    this.users[index] = { ...this.users[index], ...updates };
    return this.users[index];
  }

  public async deleteUser(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    return this.users.length !== initialLength;
  }

  // Admin Notes
  public async getNotes(userId: string): Promise<AdminNote[]> {
    return this.notes.filter(note => note.userId === userId);
  }

  public async addNote(note: Omit<AdminNote, 'id' | 'createdAt'>): Promise<AdminNote> {
    const newNote: AdminNote = {
      ...note,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    this.notes.push(newNote);
    return newNote;
  }

  // Audit Logs
  public async getLogs(): Promise<AuditLog[]> {
    return this.logs;
  }

  public async addLog(log: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    const newLog: AuditLog = {
      ...log,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    this.logs.push(newLog);
    return newLog;
  }

  // Announcements
  public async getAnnouncements(): Promise<Announcement[]> {
    return this.announcements;
  }

  public async createAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt'>): Promise<Announcement> {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    this.announcements.push(newAnnouncement);
    return newAnnouncement;
  }

  // Support Tickets
  public async getTickets(): Promise<SupportTicket[]> {
    return this.tickets;
  }

  public async createTicket(ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt'>): Promise<SupportTicket> {
    const newTicket: SupportTicket = {
      ...ticket,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.tickets.push(newTicket);
    return newTicket;
  }

  public async updateTicket(id: string, updates: Partial<SupportTicket>): Promise<SupportTicket | undefined> {
    const index = this.tickets.findIndex(ticket => ticket.id === id);
    if (index === -1) return undefined;
    
    this.tickets[index] = { 
      ...this.tickets[index], 
      ...updates,
      updatedAt: new Date()
    };
    return this.tickets[index];
  }

  // Platform Stats
  public async getStats(): Promise<PlatformStats> {
    return this.stats;
  }

  // Security Settings
  public async getSecuritySettings(): Promise<SecuritySettings> {
    return this.securitySettings;
  }

  public async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
    this.securitySettings = { ...this.securitySettings, ...settings };
    return this.securitySettings;
  }

  // Email Templates
  public async getEmailTemplates(): Promise<EmailTemplate[]> {
    return this.emailTemplates;
  }

  public async updateEmailTemplate(id: string, template: Partial<EmailTemplate>): Promise<EmailTemplate | undefined> {
    const index = this.emailTemplates.findIndex(t => t.id === id);
    if (index === -1) return undefined;
    
    this.emailTemplates[index] = { 
      ...this.emailTemplates[index], 
      ...template,
      lastModified: new Date()
    };
    return this.emailTemplates[index];
  }

  // Integrations
  public async getIntegrations(): Promise<Integration[]> {
    return this.integrations;
  }

  public async updateIntegration(id: string, config: IntegrationConfig): Promise<Integration | undefined> {
    const index = this.integrations.findIndex(i => i.id === id);
    if (index === -1) return undefined;
    
    this.integrations[index] = { 
      ...this.integrations[index], 
      config,
      lastSync: new Date()
    };
    return this.integrations[index];
  }
}

export default AdminService.getInstance(); 