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
import axios, { AxiosError, AxiosInstance } from 'axios';
import { NotFoundError, ValidationError, ApiError } from '@/lib/errors';

// Define error types
export class ClientServiceError extends Error {
  constructor(message: string, public code?: string, public status?: number) {
    super(message);
    this.name = 'ClientServiceError';
  }
}

export class NetworkError extends ClientServiceError {
  constructor(message: string = 'Network error occurred') {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends ClientServiceError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends ClientServiceError {
  constructor(message: string = 'You do not have permission to perform this action') {
    super(message, 'FORBIDDEN', 403);
    this.name = 'AuthorizationError';
  }
}

interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export class ClientService {
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
  private readonly baseUrl: string;
  private readonly api: AxiosInstance;

  private constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public static getInstance(): ClientService {
    if (!ClientService.instance) {
      ClientService.instance = new ClientService();
    }
    return ClientService.instance;
  }

  private handleApiError(error: AxiosError<ApiErrorResponse>): never {
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 404) {
        throw new NotFoundError(data.message || 'Resource not found');
      }
      
      if (status === 422 && data.errors) {
        throw new ValidationError(data.message || 'Validation failed', data.errors);
      }
      
      throw new ApiError(data.message || 'An error occurred');
    }
    
    throw new ApiError('Network error occurred');
  }

  // Client Dashboard
  public async getDashboardData(): Promise<{
    ongoingProjects: Project[];
    assignedStudents: Student[];
    recentActivity: ActivityLog[];
    notifications: Message[];
  }> {
    try {
      // In a real app, this would be an API call
      return {
        ongoingProjects: this.projects.filter(p => p.status === 'in-progress'),
        assignedStudents: this.students.slice(0, 5),
        recentActivity: this.activityLogs.slice(0, 10),
        notifications: this.messages.filter(m => !m.isRead)
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleApiError(error);
      }
      throw new ApiError('Failed to fetch dashboard data');
    }
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
    try {
      // In a real app, this would be an API call
      return this.datasets;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleApiError(error);
      }
      throw new ApiError('Failed to fetch datasets');
    }
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

  public async downloadDataset(datasetId: string): Promise<Blob> {
    try {
      const response = await this.api.get(`/datasets/${datasetId}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleApiError(error);
      }
      throw new ApiError('Failed to download dataset');
    }
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
    try {
      // In a real app, this would be an API call
      return this.students;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleApiError(error);
      }
      throw new ApiError('Failed to fetch assigned students');
    }
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
    try {
      // In a real app, this would be an API call
      return this.courses;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleApiError(error);
      }
      throw new ApiError('Failed to fetch client courses');
    }
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
    try {
      // In a real app, this would be an API call
      return this.messages;
    } catch (error) {
      return this.handleApiError(error as AxiosError<ApiErrorResponse>);
    }
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
    try {
      // In a real app, this would be an API call
      return this.announcements;
    } catch (error) {
      return this.handleApiError(error as AxiosError<ApiErrorResponse>);
    }
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
    try {
      // In a real app, this would be an API call
      return [];
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleApiError(error);
      }
      throw new ApiError('Failed to fetch reports');
    }
  }

  public async downloadReport(reportId: string): Promise<Blob> {
    const report = this.reports.find(r => r.id === reportId);
    if (!report) throw new Error('Report not found');
    
    // In a real app, this would download the report from a server
    return new Blob(['Mock report content'], { type: 'application/pdf' });
  }

  // Billing & Subscription
  public async getBillingInfo(): Promise<BillingInfo> {
    try {
      // In a real app, this would be an API call
      return this.billingInfo;
    } catch (error) {
      return this.handleApiError(error as AxiosError<ApiErrorResponse>);
    }
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
    try {
      // In a real app, this would be an API call
      return this.tickets;
    } catch (error) {
      return this.handleApiError(error as AxiosError<ApiErrorResponse>);
    }
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
    try {
      // In a real app, this would be an API call
      return this.activityLogs;
    } catch (error) {
      return this.handleApiError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async getAnalytics(): Promise<{
    totalStudents: number;
    activeProjects: number;
    completedCourses: number;
    averageProgress: number;
  }> {
    try {
      // In a real app, this would be an API call
      return {
        totalStudents: this.students.length,
        activeProjects: this.projects.filter(p => p.status === 'in-progress').length,
        completedCourses: 0,
        averageProgress: 0
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleApiError(error);
      }
      throw new ApiError('Failed to fetch analytics');
    }
  }

  public async generateReport(type: 'analytics' | 'performance' | 'usage' | 'custom'): Promise<Report> {
    try {
      return {
        id: Math.random().toString(36).substr(2, 9),
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
        description: `Generated ${type} report`,
        type,
        format: 'pdf',
        date: new Date(),
        size: 0,
        downloads: 0
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleApiError(error);
      }
      throw new ApiError('Failed to generate report');
    }
  }
}

export default ClientService.getInstance(); 