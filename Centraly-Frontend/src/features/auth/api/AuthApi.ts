import { apiClient } from '@/lib/axios';
import { IAuthRepository, AuthResponse } from '@/core/repositories/IAuthRepository';
import { LoginFormData } from '../schemas/loginSchema';

export class AuthRepository implements IAuthRepository {
  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  }
}

export const authRepository = new AuthRepository();
