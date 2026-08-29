import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { financeRepository } from "../api/FinanceApi";

import { 
  OpenSessionRequest, AddManualTransactionRequest, CreateSafeRequest, 
  ReceiveDrawerDepositRequest, AddManualSafeTransactionRequest, CreateExpenseCategoryRequest, CreateExpenseRequest,
  FinanceFilters 
} from "../schemas/financeSchemas";
import { toast } from "sonner";

export const FINANCE_KEYS = {
  activeDrawer: ["drawer", "active"] as const,
  drawerHistory: (filters: FinanceFilters) => ["drawer", "history", filters] as const,
  drawerSessionById: (id: string) => ["drawer", "history", id] as const,
  safes: ["safes"] as const,
  safeTransactions: (safeId: string, filters: FinanceFilters) => ["safes", safeId, "transactions", filters] as const,
  expenseCategories: ["expenseCategories"] as const,
  expenses: (filters: FinanceFilters) => ["expenses", filters] as const,
};

// --- Drawer ---

export function useActiveDrawer() {
  return useQuery({
    queryKey: FINANCE_KEYS.activeDrawer,
    queryFn: () => financeRepository.getCurrentDrawerSession(),
  });
}

export function useDrawerHistory(filters: FinanceFilters) {
  return useQuery({
    queryKey: FINANCE_KEYS.drawerHistory(filters),
    queryFn: () => financeRepository.getDrawerHistory(filters),
  });
}

export function useDrawerSessionById(id: string) {
  return useQuery({
    queryKey: FINANCE_KEYS.drawerSessionById(id),
    queryFn: () => financeRepository.getDrawerSessionById(id),
    enabled: !!id,
  });
}

export function useOpenDrawer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OpenSessionRequest) => financeRepository.openDrawerSession(data),
    onSuccess: () => {
      toast.success("تم فتح الدرج بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.activeDrawer });
    },
    onError: () => toast.error("حدث خطأ أثناء فتح الدرج"),
  });
}

export function useCloseDrawer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => financeRepository.closeDrawerSession(),
    onSuccess: () => {
      toast.success("تم إغلاق الدرج بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.activeDrawer });
    },
    onError: () => toast.error("حدث خطأ أثناء إغلاق الدرج"),
  });
}

export function useAddDrawerTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddManualTransactionRequest) => financeRepository.addDrawerTransaction(data),
    onSuccess: () => {
      toast.success("تم تسجيل الحركة بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.activeDrawer });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء تسجيل الحركة");
    },
  });
}

// --- Safe ---

export function useSafes() {
  return useQuery({
    queryKey: FINANCE_KEYS.safes,
    queryFn: () => financeRepository.getSafes(),
  });
}

export function useCreateSafe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSafeRequest) => financeRepository.createSafe(data),
    onSuccess: () => {
      toast.success("تم إضافة الخزينة بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.safes });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة الخزينة"),
  });
}

export function useDepositFromDrawer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ safeId, data }: { safeId: string, data: ReceiveDrawerDepositRequest }) => 
      financeRepository.depositFromDrawer(safeId, data),
    onSuccess: () => {
      toast.success("تم إيداع التوريدية بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.safes });
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.activeDrawer });
    },
    onError: () => toast.error("حدث خطأ أثناء الإيداع"),
  });
}

export function useAddManualSafeTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ safeId, data }: { safeId: string, data: AddManualSafeTransactionRequest }) => 
      financeRepository.addManualSafeTransaction(safeId, data),
    onSuccess: (_, variables) => {
      toast.success("تم تسجيل المعاملة بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.safes });
      queryClient.invalidateQueries({ queryKey: ["safes", variables.safeId, "transactions"] });
    },
    onError: () => toast.error("حدث خطأ أثناء تسجيل المعاملة"),
  });
}

// --- Expenses ---

export function useSafeTransactions(safeId: string, filters: FinanceFilters) {
  return useQuery({
    queryKey: FINANCE_KEYS.safeTransactions(safeId, filters),
    queryFn: () => financeRepository.getSafeTransactions(safeId, filters),
    enabled: !!safeId,
  });
}


export function useExpenseCategories() {
  return useQuery({
    queryKey: FINANCE_KEYS.expenseCategories,
    queryFn: () => financeRepository.getExpenseCategories(),
  });
}

export function useCreateExpenseCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateExpenseCategoryRequest) => financeRepository.createExpenseCategory(data),
    onSuccess: () => {
      toast.success("تم إضافة بند المصروف بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.expenseCategories });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة البند"),
  });
}

export function useRecordExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateExpenseRequest) => financeRepository.recordExpense(data),
    onSuccess: () => {
      toast.success("تم تسجيل المصروف بنجاح");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.activeDrawer });
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.safes });
    },
    onError: () => toast.error("حدث خطأ أثناء تسجيل المصروف"),
  });
}

export function useExpenses(filters: FinanceFilters) {
  return useQuery({
    queryKey: FINANCE_KEYS.expenses(filters),
    queryFn: () => financeRepository.getExpenses(filters),
  });
}
