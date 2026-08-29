import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

export function ProtectedRoute({ children, requiredPermissions }: ProtectedRouteProps) {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAnyRequired = requiredPermissions.some(perm => hasPermission(perm));
    if (!hasAnyRequired) {
      // User is logged in but doesn't have the required permission
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}
