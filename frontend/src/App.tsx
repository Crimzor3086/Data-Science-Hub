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
import { TeamsPage } from "./pages/TeamsPage";
import TeamPage from "./pages/TeamPage";
import ServicesPage from "./pages/ServicesPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProjectsPage from "./pages/ProjectsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { AssignmentsPage } from "./pages/AssignmentsPage";
import SearchPage from './pages/SearchPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/teams" element={<TeamsPage />} />
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
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/assignments" element={<AssignmentsPage />} />
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
                  path="/analytics" 
                  element={
                    <RoleGuard allowedRoles={[UserRole.ADMIN]}>
                      <AnalyticsPage />
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
