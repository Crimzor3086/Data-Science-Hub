import { Course, CourseProgress, Module } from '@/types/course';

class CourseProgressService {
  private static instance: CourseProgressService;
  private progressData: Map<string, CourseProgress> = new Map();

  private constructor() {
    // Initialize with mock data
    this.initializeMockData();
  }

  public static getInstance(): CourseProgressService {
    if (!CourseProgressService.instance) {
      CourseProgressService.instance = new CourseProgressService();
    }
    return CourseProgressService.instance;
  }

  private initializeMockData() {
    // Mock progress data for demonstration
    const mockProgress: CourseProgress = {
      userId: 'user1',
      courseId: '1',
      enrollmentDate: new Date(),
      lastAccessed: new Date(),
      status: 'in-progress',
      overallProgress: 75,
      moduleProgress: {
        'module1': {
          status: 'completed',
          completedAt: new Date(),
          timeSpent: 120,
          score: 95,
          attempts: 1
        },
        'module2': {
          status: 'in-progress',
          timeSpent: 45,
          attempts: 0
        }
      },
      quizScores: {
        'quiz1': {
          score: 90,
          attempts: 2,
          lastAttempt: new Date(),
          passed: true
        }
      },
      assignmentScores: {
        'assignment1': {
          score: 85,
          submittedAt: new Date(),
          feedback: 'Good work!',
          status: 'graded'
        }
      },
      certificates: []
    };

    this.progressData.set('1', mockProgress);
  }

  public async getCourseProgress(userId: string, courseId: string): Promise<CourseProgress | null> {
    // In a real application, this would fetch from an API
    return this.progressData.get(courseId) || null;
  }

  public async updateModuleProgress(
    userId: string,
    courseId: string,
    moduleId: string,
    progress: Partial<CourseProgress['moduleProgress'][string]>
  ): Promise<CourseProgress> {
    const courseProgress = await this.getCourseProgress(userId, courseId);
    if (!courseProgress) {
      throw new Error('Course progress not found');
    }

    // Update module progress
    courseProgress.moduleProgress[moduleId] = {
      ...courseProgress.moduleProgress[moduleId],
      ...progress
    };

    // Update overall progress
    courseProgress.overallProgress = this.calculateOverallProgress(courseProgress);
    
    // Update status
    courseProgress.status = this.determineCourseStatus(courseProgress);
    
    // Update last accessed
    courseProgress.lastAccessed = new Date();

    // Save progress
    this.progressData.set(courseId, courseProgress);

    return courseProgress;
  }

  public async updateQuizScore(
    userId: string,
    courseId: string,
    quizId: string,
    score: number
  ): Promise<CourseProgress> {
    const courseProgress = await this.getCourseProgress(userId, courseId);
    if (!courseProgress) {
      throw new Error('Course progress not found');
    }

    // Update quiz score
    courseProgress.quizScores[quizId] = {
      score,
      attempts: (courseProgress.quizScores[quizId]?.attempts || 0) + 1,
      lastAttempt: new Date(),
      passed: score >= 70 // Assuming 70% is passing
    };

    // Save progress
    this.progressData.set(courseId, courseProgress);

    return courseProgress;
  }

  public async updateAssignmentScore(
    userId: string,
    courseId: string,
    assignmentId: string,
    score: number,
    feedback?: string
  ): Promise<CourseProgress> {
    const courseProgress = await this.getCourseProgress(userId, courseId);
    if (!courseProgress) {
      throw new Error('Course progress not found');
    }

    // Update assignment score
    courseProgress.assignmentScores[assignmentId] = {
      score,
      submittedAt: new Date(),
      feedback,
      status: 'graded'
    };

    // Save progress
    this.progressData.set(courseId, courseProgress);

    return courseProgress;
  }

  private calculateOverallProgress(progress: CourseProgress): number {
    const modules = Object.values(progress.moduleProgress);
    if (modules.length === 0) return 0;

    const completedModules = modules.filter(m => m.status === 'completed').length;
    return Math.round((completedModules / modules.length) * 100);
  }

  private determineCourseStatus(progress: CourseProgress): CourseProgress['status'] {
    if (progress.overallProgress === 100) return 'completed';
    if (progress.overallProgress > 0) return 'in-progress';
    return 'not-started';
  }

  public async getRecommendedModules(
    userId: string,
    courseId: string
  ): Promise<Module[]> {
    const progress = await this.getCourseProgress(userId, courseId);
    if (!progress) return [];

    // Get incomplete modules that have completed prerequisites
    const incompleteModules = Object.entries(progress.moduleProgress)
      .filter(([_, moduleProgress]) => moduleProgress.status !== 'completed')
      .map(([moduleId]) => moduleId);

    // In a real application, this would fetch from an API
    return [];
  }

  public async generateProgressReport(
    userId: string,
    courseId: string
  ): Promise<{
    overallProgress: number;
    timeSpent: number;
    completedModules: number;
    totalModules: number;
    averageQuizScore: number;
    averageAssignmentScore: number;
    certificates: CourseProgress['certificates'];
  }> {
    const progress = await this.getCourseProgress(userId, courseId);
    if (!progress) {
      throw new Error('Course progress not found');
    }

    const timeSpent = Object.values(progress.moduleProgress)
      .reduce((total, module) => total + module.timeSpent, 0);

    const quizScores = Object.values(progress.quizScores);
    const assignmentScores = Object.values(progress.assignmentScores);

    return {
      overallProgress: progress.overallProgress,
      timeSpent,
      completedModules: Object.values(progress.moduleProgress)
        .filter(m => m.status === 'completed').length,
      totalModules: Object.keys(progress.moduleProgress).length,
      averageQuizScore: quizScores.length > 0
        ? quizScores.reduce((sum, quiz) => sum + quiz.score, 0) / quizScores.length
        : 0,
      averageAssignmentScore: assignmentScores.length > 0
        ? assignmentScores.reduce((sum, assignment) => sum + assignment.score, 0) / assignmentScores.length
        : 0,
      certificates: progress.certificates
    };
  }
}

export const courseProgressService = CourseProgressService.getInstance(); 