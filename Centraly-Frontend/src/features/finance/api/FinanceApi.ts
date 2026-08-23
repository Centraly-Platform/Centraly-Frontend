import { apiClient } from "@/lib/axios";
import { IFinanceRepository } from "@/core/repositories/IFinanceRepository";
import { PaginatedList } from "@/shared/types/pagination";
import { 
  OpenSessionRequest, DrawerSessionResponse, AddManualTransactionRequest,
  CreateSafeRequest, SafeResponse, SafeTransactionResponse, ReceiveDrawerDepositRequest,
  CreateExpenseCategoryRequest, ExpenseCategoryResponse,
  CreateExpenseRequest, ExpenseResponse,
  FinanceFilters
} from "../schemas/financeSchemas";

export class FinanceRepository implements IFinanceRepository {
  // --- Drawer ---
  async getCurrentDrawerSession(): Promise<DrawerSessionResponse> {
    const { data } = await apiClient.get<DrawerSessionResponse>('/drawers/active');
    return data;
  }

  async openDrawerSession(reqData: OpenSessionRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/drawers/open', reqData);
    return data;
  }

  async closeDrawerSession(): Promise<void> {
    await apiClient.post('/drawers/close');
  }

  async addDrawerTransaction(reqData: AddManualTransactionRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/drawers/transactions/manual', reqData);
    return data;
  }

  // --- Safe ---
  async getSafes(): Promise<SafeResponse[]> {
    const { data } = await apiClient.get<SafeResponse[]>('/Safe'); // Route is 'Safe' uppercase in backend controller
    return data;
  }

  async createSafe(reqData: CreateSafeRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/Safe', reqData);
    return data;
  }

  async receiveDrawerDeposit(safeId: string, reqData: ReceiveDrawerDepositRequest): Promise<string> {
    const { data } = await apiClient.post<string>(`/Safe/${safeId}/deposit`, reqData);
    return data;
  }

  async getSafeTransactions(safeId: string, filters: FinanceFilters): Promise<PaginatedList<SafeTransactionResponse>> {
    // Backend doesn't have GetAllSafeTransactions endpoint in controller yet, mocking it for now or leaving it ready
    const { data } = await apiClient.get<PaginatedList<SafeTransactionResponse>>(`/Safe/${safeId}/transactions`, { params: filters });
    return data;
  }

  // --- Expenses ---
  async getExpenseCategories(): Promise<ExpenseCategoryResponse[]> {
    const { data } = await apiClient.get<ExpenseCategoryResponse[]>('/expenses/categories');
    return data;
  }

  async createExpenseCategory(reqData: CreateExpenseCategoryRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/expenses/categories', reqData);
    return data;
  }

  async getExpenses(filters: FinanceFilters): Promise<PaginatedList<ExpenseResponse>> {
    // Note: Ensure backend has a GET /expenses endpoint with pagination.
    const { data } = await apiClient.get<PaginatedList<ExpenseResponse>>('/expenses', { params: filters });
    return data;
  }

  async createExpense(reqData: CreateExpenseRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/expenses', reqData);
    return data;
  }
}

export const financeRepository = new FinanceRepository();
