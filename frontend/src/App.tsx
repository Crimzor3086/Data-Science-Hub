import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { UserRole } from "@/lib/roles";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/team" element={<TeamsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route 
              path="/profile" 
              element={
                <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.CLIENT, UserRole.STUDENT]}>
                  <ProfilePage />
                </RoleGuard>
              } 
            />
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
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
