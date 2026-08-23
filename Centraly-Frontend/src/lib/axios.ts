import axios from 'axios';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';

// ─────────────────────────────────────────────────────────
// Base URL — always points to the .NET backend
// ─────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7073';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every request
apiClient.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.clearToken();
      window.location.href = '/login';
      toast.error('انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.');
    } else if (error.response?.status >= 500) {
      toast.error('حدث خطأ في الخادم (Server Error).');
    }
    return Promise.reject(error);
  }
);
