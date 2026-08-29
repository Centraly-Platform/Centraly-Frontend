import { createContext, useContext, useState, ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../api/AuthApi";
import { LoginFormData } from "../schemas/loginSchema";
import { toast } from "sonner";
import { storage } from "@/lib/storage";
import { getApiErrorMessage } from "@/shared/utils/apiError";

interface AuthContextType {
  isAuthenticated: boolean;
  permissions: string[];
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!storage.getToken());
  const [permissions, setPermissions] = useState<string[]>(
    isAuthenticated ? storage.getPermissions() : []
  );

  const logout = () => {
    storage.clearToken();
    storage.clearPermissions();
    setIsAuthenticated(false);
    setPermissions([]);
    window.location.href = '/login';
  };

  const hasPermission = (_permission: string) => {
    // DEV MODE: Always return true
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, permissions, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginFormData) => authRepository.login(data),
    onSuccess: (data) => {
      toast.success("تم تسجيل الدخول بنجاح!");
      storage.setToken(data.token);
      // Ensure we have permissions array, default to empty if not returned by old backend
      const perms = data.permissions || [];
      storage.setPermissions(perms);
      window.location.href = '/';
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, "فشل تسجيل الدخول. تحقق من البيانات."));
    },
  });
}
