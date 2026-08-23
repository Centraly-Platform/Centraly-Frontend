import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  OpenSessionRequest, DrawerSessionResponse, AddManualTransactionRequest,
  CreateSafeRequest, SafeResponse, SafeTransactionResponse, ReceiveDrawerDepositRequest,
  CreateExpenseCategoryRequest, ExpenseCategoryResponse,
  CreateExpenseRequest, ExpenseResponse
} from "@/features/finance/schemas/financeSchemas";

export interface IFinanceRepository {
  // Drawer
  getCurrentDrawerSession(): Promise<DrawerSessionResponse>;
  openDrawerSession(data: OpenSessionRequest): Promise<string>;
  closeDrawerSession(): Promise<void>;
  addDrawerTransaction(data: AddManualTransactionRequest): Promise<string>;

  // Safe
  getSafes(): Promise<SafeResponse[]>;
  createSafe(data: CreateSafeRequest): Promise<string>;
  getSafeTransactions(safeId: string, filters: RequestFilters): Promise<PaginatedList<SafeTransactionResponse>>;
  receiveDrawerDeposit(safeId: string, data: ReceiveDrawerDepositRequest): Promise<string>;

  // Expenses
  getExpenseCategories(): Promise<ExpenseCategoryResponse[]>;
  createExpenseCategory(data: CreateExpenseCategoryRequest): Promise<string>;
  getExpenses(filters: RequestFilters): Promise<PaginatedList<ExpenseResponse>>;
  createExpense(data: CreateExpenseRequest): Promise<string>;
}
