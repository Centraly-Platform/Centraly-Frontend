import { createContext, useContext, useState, ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../api/AuthApi";
import { LoginFormData } from "../schemas/loginSchema";
import { toast } from "sonner";
import { storage } from "@/lib/storage";

interface AuthContextType {
  isAuthenticated: boolean;
  permissions: string[];
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!storage.getToken());
  // Mock permissions until backend sends them in the login response
  const [permissions, setPermissions] = useState<string[]>(isAuthenticated ? ["inventory:read", "inventory:write", "sales:read"] : []);

  const logout = () => {
    storage.clearToken();
    setIsAuthenticated(false);
    setPermissions([]);
    window.location.href = '/login';
  };

  const hasPermission = (permission: string) => {
    // Admin override or specific permission check
    return permissions.includes("admin") || permissions.includes(permission);
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
      window.location.href = '/';
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err.response?.data?.message || "فشل تسجيل الدخول. تحقق من البيانات.";
      toast.error(message);
    },
  });
}
