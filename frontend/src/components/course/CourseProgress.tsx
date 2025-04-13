import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  BookOpen, 
  Award, 
  BarChart2, 
  CheckCircle2, 
  PlayCircle,
  Download
} from 'lucide-react';
import { courseProgressService } from '@/services/courseProgress';
import { CourseProgress as CourseProgressType } from '@/types/course';

interface ProgressReport {
  overallProgress: number;
  timeSpent: number;
  completedModules: number;
  totalModules: number;
  averageQuizScore: number;
  averageAssignmentScore: number;
  certificates: CourseProgressType['certificates'];
}

interface CourseProgressProps {
  userId: string;
  courseId: string;
}

export function CourseProgress({ userId, courseId }: CourseProgressProps) {
  const [progress, setProgress] = useState<CourseProgressType | null>(null);
  const [report, setReport] = useState<ProgressReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const [progressData, reportData] = await Promise.all([
          courseProgressService.getCourseProgress(userId, courseId),
          courseProgressService.generateProgressReport(userId, courseId)
        ]);
        setProgress(progressData);
        setReport(reportData);
      } catch (error) {
        console.error('Error loading course progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [userId, courseId]);

  if (loading) {
    return <div>Loading progress...</div>;
  }

  if (!progress || !report) {
    return <div>No progress data available</div>;
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            Course Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{progress.overallProgress}%</span>
              </div>
              <Progress value={progress.overallProgress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time Spent</p>
                  <p className="font-medium">{formatTime(report.timeSpent)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Modules</p>
                  <p className="font-medium">
                    {report.completedModules}/{report.totalModules}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Quiz Average</p>
                  <p className="font-medium">{report.averageQuizScore}%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Assignment Avg</p>
                  <p className="font-medium">{report.averageAssignmentScore}%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Module Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(progress.moduleProgress).map(([moduleId, moduleProgress]) => (
              <div key={moduleId} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">Module {moduleId}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(moduleProgress.timeSpent)} spent
                    </p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      moduleProgress.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                      moduleProgress.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      'bg-gray-100 text-gray-800 border-gray-200'
                    }
                  >
                    {moduleProgress.status}
                  </Badge>
                </div>
                {moduleProgress.score && (
                  <div className="text-sm text-muted-foreground">
                    Score: {moduleProgress.score}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certificates */}
      {progress.certificates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progress.certificates.map((certificate) => (
                <div key={certificate.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">
                      {certificate.type === 'completion' ? 'Course Completion' : 'Achievement'} Certificate
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Issued on {new Date(certificate.issuedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Learning Button */}
      {progress.status !== 'completed' && (
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlayCircle className="h-4 w-4 mr-2" />
          Continue Learning
        </Button>
      )}
    </div>
  );
} 