import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { UserRole, getRolePermissions } from '@/lib/roles';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const RoleGuard = ({ 
  children, 
  allowedRoles, 
  redirectTo = '/' 
}: RoleGuardProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const userPermissions = getRolePermissions(user.role);
  const hasPermission = allowedRoles.includes(user.role);

  if (!hasPermission) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}; 