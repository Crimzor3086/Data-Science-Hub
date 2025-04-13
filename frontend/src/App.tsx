import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { UserRole } from "@/lib/roles";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CoursesPage from "./pages/CoursesPage";
import TeamsPage from "./pages/TeamsPage";
import ServicesPage from "./pages/ServicesPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ClientDashboardPage from "./pages/ClientDashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import ReportsPage from "./pages/ReportsPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import ProgressPage from "./pages/ProgressPage";
import SignUpPage from './pages/SignUpPage';
import SearchPage from './pages/SearchPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/team" element={<TeamsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route 
                  path="/profile" 
                  element={
                    <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.CLIENT, UserRole.STUDENT]}>
                      <ProfilePage />
                    </RoleGuard>
                  } 
                />
                <Route 
                  path="/client-dashboard" 
                  element={
                    <RoleGuard allowedRoles={[UserRole.CLIENT]}>
                      <ClientDashboardPage />
                    </RoleGuard>
                  } 
                />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/assignments" element={<AssignmentsPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <RoleGuard allowedRoles={[UserRole.ADMIN]}>
                      <AdminPage />
                    </RoleGuard>
                  } 
                />
                <Route 
                  path="/admin/users" 
                  element={
                    <RoleGuard allowedRoles={[UserRole.ADMIN]}>
                      <UsersPage />
                    </RoleGuard>
                  } 
                />
                <Route 
                  path="/admin/analytics" 
                  element={
                    <RoleGuard allowedRoles={[UserRole.ADMIN]}>
                      <AnalyticsPage />
                    </RoleGuard>
                  } 
                />
                {/* Redirects for convenience */}
                <Route 
                  path="/users" 
                  element={
                    <RoleGuard allowedRoles={[UserRole.ADMIN]} redirectTo="/login">
                      <Navigate to="/admin/users" replace />
                    </RoleGuard>
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <RoleGuard allowedRoles={[UserRole.ADMIN]} redirectTo="/login">
                      <Navigate to="/admin/analytics" replace />
                    </RoleGuard>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
