import { createContext, useContext, useState, ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../api/AuthApi";
import { LoginFormData } from "../schemas/loginSchema";
import { toast } from "sonner";
import { storage } from "@/lib/storage";

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!storage.getToken());

  const logout = () => {
    storage.clearToken();
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
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
