import {
  User,
  Project,
  Dataset,
  Student,
  Course,
  Message,
  Announcement,
  SupportTicket,
  Report,
  BillingInfo,
  ActivityLog
} from '../types/client';

class ClientService {
  private static instance: ClientService;
  private client: User | null = null;
  private projects: Project[] = [];
  private datasets: Dataset[] = [];
  private students: Student[] = [];
  private courses: Course[] = [];
  private messages: Message[] = [];
  private announcements: Announcement[] = [];
  private tickets: SupportTicket[] = [];
  private reports: Report[] = [];
  private billingInfo: BillingInfo | null = null;
  private activityLogs: ActivityLog[] = [];

  private constructor() {
    // Initialize with empty data
  }

  public static getInstance(): ClientService {
    if (!ClientService.instance) {
      ClientService.instance = new ClientService();
    }
    return ClientService.instance;
  }

  // Client Dashboard
  public async getDashboardData(): Promise<{
    ongoingProjects: Project[];
    assignedStudents: Student[];
    recentActivity: ActivityLog[];
    notifications: Message[];
  }> {
    return {
      ongoingProjects: this.projects.filter(p => p.status === 'in-progress'),
      assignedStudents: this.students,
      recentActivity: this.activityLogs.slice(0, 10),
      notifications: this.messages.filter(m => m.isNotification && !m.isRead)
    };
  }

  // Profile Management
  public async getProfile(): Promise<User | null> {
    return this.client;
  }

  public async updateProfile(updates: Partial<User>): Promise<User | null> {
    if (!this.client) return null;
    
    this.client = { ...this.client, ...updates };
    return this.client;
  }

  public async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    // In a real app, this would validate the current password and update it securely
    return true;
  }

  public async uploadProfileImage(file: File): Promise<string> {
    // In a real app, this would upload the file to a server and return the URL
    return URL.createObjectURL(file);
  }

  public async uploadDocument(file: File, type: string): Promise<string> {
    // In a real app, this would upload the file to a server and return the URL
    return URL.createObjectURL(file);
  }

  // Project / Dataset Access
  public async getDatasets(): Promise<Dataset[]> {
    return this.datasets;
  }

  public async requestDataset(request: { name: string; description: string; purpose: string }): Promise<Dataset> {
    const newDataset: Dataset = {
      id: Math.random().toString(36).substr(2, 9),
      name: request.name,
      description: request.description,
      purpose: request.purpose,
      status: 'pending',
      createdAt: new Date(),
      size: 0,
      format: 'unknown',
      accessLevel: 'private',
      tags: [],
      feedback: []
    };
    
    this.datasets.push(newDataset);
    return newDataset;
  }

  public async uploadDataset(file: File, metadata: { name: string; description: string; tags: string[] }): Promise<Dataset> {
    // In a real app, this would upload the file to a server
    const newDataset: Dataset = {
      id: Math.random().toString(36).substr(2, 9),
      name: metadata.name,
      description: metadata.description,
      purpose: 'Client uploaded dataset',
      status: 'active',
      createdAt: new Date(),
      size: file.size,
      format: file.name.split('.').pop() || 'unknown',
      accessLevel: 'private',
      tags: metadata.tags,
      feedback: []
    };
    
    this.datasets.push(newDataset);
    return newDataset;
  }

  public async downloadDataset(id: string): Promise<Blob> {
    const dataset = this.datasets.find(d => d.id === id);
    if (!dataset) throw new Error('Dataset not found');
    
    // In a real app, this would download the file from a server
    return new Blob(['Mock dataset content'], { type: 'text/plain' });
  }

  public async addDatasetFeedback(id: string, feedback: { comment: string; rating: number }): Promise<Dataset> {
    const dataset = this.datasets.find(d => d.id === id);
    if (!dataset) throw new Error('Dataset not found');
    
    dataset.feedback.push({
      id: Math.random().toString(36).substr(2, 9),
      comment: feedback.comment,
      rating: feedback.rating,
      createdAt: new Date(),
      createdBy: this.client?.id || 'unknown'
    });
    
    return dataset;
  }

  // Student Monitoring
  public async getAssignedStudents(): Promise<Student[]> {
    return this.students;
  }

  public async getStudentProgress(studentId: string): Promise<{
    courses: { id: string; name: string; progress: number; lastAccessed: Date }[];
    assignments: { id: string; title: string; status: string; score: number }[];
  }> {
    const student = this.students.find(s => s.id === studentId);
    if (!student) throw new Error('Student not found');
    
    // In a real app, this would fetch the student's progress from a server
    return {
      courses: [],
      assignments: []
    };
  }

  public async sendMessageToStudent(studentId: string, message: { subject: string; content: string }): Promise<Message> {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      subject: message.subject,
      content: message.content,
      from: this.client?.id || 'unknown',
      to: studentId,
      createdAt: new Date(),
      isRead: false,
      isNotification: false
    };
    
    this.messages.push(newMessage);
    return newMessage;
  }

  public async reviewSubmission(submissionId: string, review: { approved: boolean; feedback: string }): Promise<boolean> {
    // In a real app, this would update the submission status on a server
    return true;
  }

  // Course / Content Access
  public async getClientCourses(): Promise<Course[]> {
    return this.courses;
  }

  public async getCourseInsights(courseId: string): Promise<{
    accessCount: number;
    completionRate: number;
    averageScore: number;
    studentProgress: { studentId: string; progress: number }[];
  }> {
    // In a real app, this would fetch the course insights from a server
    return {
      accessCount: 0,
      completionRate: 0,
      averageScore: 0,
      studentProgress: []
    };
  }

  // Communication Tools
  public async getMessages(): Promise<Message[]> {
    return this.messages;
  }

  public async sendMessage(message: { to: string; subject: string; content: string }): Promise<Message> {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      subject: message.subject,
      content: message.content,
      from: this.client?.id || 'unknown',
      to: message.to,
      createdAt: new Date(),
      isRead: false,
      isNotification: false
    };
    
    this.messages.push(newMessage);
    return newMessage;
  }

  public async markMessageAsRead(messageId: string): Promise<Message | undefined> {
    const message = this.messages.find(m => m.id === messageId);
    if (!message) return undefined;
    
    message.isRead = true;
    return message;
  }

  public async getAnnouncements(): Promise<Announcement[]> {
    return this.announcements;
  }

  // Request Services / Reports
  public async requestService(request: { 
    type: 'dataset' | 'analysis' | 'consultation'; 
    description: string; 
    priority: 'low' | 'medium' | 'high';
  }): Promise<SupportTicket> {
    const newTicket: SupportTicket = {
      id: Math.random().toString(36).substr(2, 9),
      subject: `Request for ${request.type}`,
      description: request.description,
      status: 'open',
      priority: request.priority,
      category: request.type,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: this.client?.id || 'unknown'
    };
    
    this.tickets.push(newTicket);
    return newTicket;
  }

  public async getReports(): Promise<Report[]> {
    return this.reports;
  }

  public async downloadReport(reportId: string): Promise<Blob> {
    const report = this.reports.find(r => r.id === reportId);
    if (!report) throw new Error('Report not found');
    
    // In a real app, this would download the report from a server
    return new Blob(['Mock report content'], { type: 'application/pdf' });
  }

  // Billing & Subscription
  public async getBillingInfo(): Promise<BillingInfo | null> {
    return this.billingInfo;
  }

  public async updateBillingInfo(info: Partial<BillingInfo>): Promise<BillingInfo | null> {
    if (!this.billingInfo) {
      this.billingInfo = {
        id: Math.random().toString(36).substr(2, 9),
        plan: 'basic',
        status: 'active',
        paymentMethod: 'credit_card',
        billingAddress: '',
        invoices: []
      };
    }
    
    this.billingInfo = { ...this.billingInfo, ...info };
    return this.billingInfo;
  }

  public async getInvoices(): Promise<{ id: string; date: Date; amount: number; status: string }[]> {
    return this.billingInfo?.invoices || [];
  }

  // Support & Help
  public async getSupportTickets(): Promise<SupportTicket[]> {
    return this.tickets;
  }

  public async createSupportTicket(ticket: { 
    subject: string; 
    description: string; 
    category: string; 
    priority: 'low' | 'medium' | 'high' | 'urgent';
  }): Promise<SupportTicket> {
    const newTicket: SupportTicket = {
      id: Math.random().toString(36).substr(2, 9),
      subject: ticket.subject,
      description: ticket.description,
      status: 'open',
      priority: ticket.priority,
      category: ticket.category,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: this.client?.id || 'unknown'
    };
    
    this.tickets.push(newTicket);
    return newTicket;
  }

  public async updateSupportTicket(id: string, updates: Partial<SupportTicket>): Promise<SupportTicket | undefined> {
    const ticket = this.tickets.find(t => t.id === id);
    if (!ticket) return undefined;
    
    Object.assign(ticket, updates, { updatedAt: new Date() });
    return ticket;
  }

  // Activity Logs
  public async getActivityLogs(): Promise<ActivityLog[]> {
    return this.activityLogs;
  }
}

export default ClientService.getInstance(); 