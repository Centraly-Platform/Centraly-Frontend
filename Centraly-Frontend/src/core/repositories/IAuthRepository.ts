import { LoginFormData } from "@/features/auth/schemas/loginSchema";

export interface AuthResponse {
  token: string;
  permissions?: string[];
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface IAuthRepository {
  login(data: LoginFormData): Promise<AuthResponse>;
}
