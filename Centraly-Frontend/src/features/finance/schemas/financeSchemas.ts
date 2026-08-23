import * as z from "zod";

// --- Enums ---
export type DrawerTransactionType = 1 | 2; // Income = 1, Expense = 2
export type DrawerTransactionCategory = 1 | 2 | 3 | 4 | 5; 
export type ExpensePaymentSource = 1 | 2; // Drawer = 1, Safe = 2

// --- Drawer ---

export const openSessionSchema = z.object({
  openingBalance: z.number().min(0),
});
export type OpenSessionRequest = z.infer<typeof openSessionSchema>;

export const addManualTransactionSchema = z.object({
  type: z.number(),
  category: z.number(),
  amount: z.number().min(0.01),
  notes: z.string().optional(),
  source: z.string().optional(),
});
export type AddManualTransactionRequest = z.infer<typeof addManualTransactionSchema>;

export interface DrawerTransactionResponse {
  id: string;
  type: DrawerTransactionType;
  category: DrawerTransactionCategory;
  amount: number;
  balance: number;
  source?: string;
  notes?: string;
  createdAt: string;
  userId: string;
}

export interface DrawerSessionResponse {
  id: string;
  openingBalance: number;
  openedAt: string;
  openedByUserId: string;
  isClosed: boolean;
  closedAt?: string;
  totalIncome?: number;
  totalExpense?: number;
  closingBalance?: number;
  transactions: DrawerTransactionResponse[];
}

// --- Safe ---

export const createSafeSchema = z.object({
  name: z.string().min(1),
  isMain: z.boolean(),
  initialBalance: z.number().min(0),
});
export type CreateSafeRequest = z.infer<typeof createSafeSchema>;

export const receiveDrawerDepositSchema = z.object({
  drawerSessionId: z.string().min(1),
  amount: z.number().min(0.01),
  notes: z.string().optional(),
});
export type ReceiveDrawerDepositRequest = z.infer<typeof receiveDrawerDepositSchema>;

export interface SafeResponse {
  id: string;
  name: string;
  balance: number;
  isMain: boolean;
}

export interface SafeTransactionResponse {
  id: string;
  safeId: string;
  transactionType: string;
  category: string;
  amount: number;
  balanceAfter: number;
  createdAt: string;
  notes?: string;
}

// --- Expenses ---

export const createExpenseCategorySchema = z.object({
  name: z.string().min(1),
});
export type CreateExpenseCategoryRequest = z.infer<typeof createExpenseCategorySchema>;

export const createExpenseSchema = z.object({
  categoryId: z.string().min(1),
  amount: z.number().min(0.01),
  paymentSource: z.number(), // ExpensePaymentSource
  notes: z.string().optional(),
});
export type CreateExpenseRequest = z.infer<typeof createExpenseSchema>;

export interface ExpenseCategoryResponse {
  id: string;
  name: string;
}

export interface ExpenseResponse {
  id: string;
  categoryId: string;
  categoryName: string;
  amount: number;
  paymentSource: string;
  expenseDate: string;
  notes?: string;
}
