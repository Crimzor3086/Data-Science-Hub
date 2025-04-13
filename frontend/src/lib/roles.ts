export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  STUDENT = 'student'
}

export interface RolePermissions {
  canManageUsers: boolean;
  canViewAllProfiles: boolean;
  canManagePlatform: boolean;
  canAccessClientFeatures: boolean;
  canAccessStudentFeatures: boolean;
  canManageOwnProfile: boolean;
}

export const rolePermissions: Record<UserRole, RolePermissions> = {
  [UserRole.ADMIN]: {
    canManageUsers: true,
    canViewAllProfiles: true,
    canManagePlatform: true,
    canAccessClientFeatures: true,
    canAccessStudentFeatures: true,
    canManageOwnProfile: true
  },
  [UserRole.CLIENT]: {
    canManageUsers: false,
    canViewAllProfiles: false,
    canManagePlatform: false,
    canAccessClientFeatures: true,
    canAccessStudentFeatures: false,
    canManageOwnProfile: true
  },
  [UserRole.STUDENT]: {
    canManageUsers: false,
    canViewAllProfiles: false,
    canManagePlatform: false,
    canAccessClientFeatures: false,
    canAccessStudentFeatures: true,
    canManageOwnProfile: true
  }
};

export const getRolePermissions = (role: UserRole): RolePermissions => {
  return rolePermissions[role] || rolePermissions[UserRole.STUDENT];
}; 