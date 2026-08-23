import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { financeRepository } from "../api/FinanceApi";

import { 
  OpenSessionRequest, AddManualTransactionRequest, CreateSafeRequest, 
  ReceiveDrawerDepositRequest, CreateExpenseCategoryRequest, CreateExpenseRequest,
  FinanceFilters 
} from "../schemas/financeSchemas";
import { toast } from "sonner";

export const FINANCE_KEYS = {
  activeDrawer: ["drawer", "active"] as const,
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
    onError: () => toast.error("حدث خطأ أثناء تسجيل الحركة"),
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

export function useReceiveDrawerDeposit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ safeId, data }: { safeId: string, data: ReceiveDrawerDepositRequest }) => 
      financeRepository.receiveDrawerDeposit(safeId, data),
    onSuccess: () => {
      toast.success("تم إيداع النقدية بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.safes });
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.activeDrawer });
    },
    onError: () => toast.error("حدث خطأ أثناء الإيداع"),
  });
}

// --- Expenses ---

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

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateExpenseRequest) => financeRepository.createExpense(data),
    onSuccess: () => {
      toast.success("تم تسجيل المصروف بنجاح");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.activeDrawer });
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.safes });
    },
    onError: () => toast.error("حدث خطأ أثناء تسجيل المصروف"),
  });
}
