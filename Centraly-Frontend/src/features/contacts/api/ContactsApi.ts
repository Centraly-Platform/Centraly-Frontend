import { apiClient } from "@/lib/axios";
import { IContactsRepository } from "@/core/repositories/IContactsRepository";
import { PaginatedList } from "@/shared/types/pagination";
import { 
  CreateCustomerRequest, CustomerResponse, CustomerStatementResponse, 
  CreateSupplierRequest, SupplierResponse, SupplierStatementItemResponse, 
  CreatePaymentRequest,
  ContactFilters,
  StatementFilters
} from "../schemas/contactSchemas";

import { CustomerDebtHistoryResponse } from '../schemas/contactSchemas';

export class ContactsRepository implements IContactsRepository {
  // --- Customers ---
  async getCustomers(filters: ContactFilters): Promise<PaginatedList<CustomerResponse>> {
    const { data } = await apiClient.get<PaginatedList<CustomerResponse>>('/customers', { params: filters });
    return data;
  }

  async getCustomer(id: string): Promise<CustomerResponse> {
    const { data } = await apiClient.get<CustomerResponse>(`/customers/${id}`);
    return data;
  }

  async getCustomerDebtHistory(id: string): Promise<CustomerDebtHistoryResponse> {
    const { data } = await apiClient.get<CustomerDebtHistoryResponse>(`/customers/${id}/debt-history`);
    return data;
  }

  async createCustomer(reqData: CreateCustomerRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/customers', reqData);
    return data;
  }

  async updateCustomer(id: string, reqData: CreateCustomerRequest): Promise<void> {
    await apiClient.put(`/customers/${id}`, reqData);
  }

  async deleteCustomer(id: string): Promise<void> {
    await apiClient.delete(`/customers/${id}`);
  }

  async getCustomerStatement(customerId: string): Promise<CustomerStatementResponse[]> {
    if (!customerId) throw new Error("customerId is required for statement");
    const { data } = await apiClient.get<CustomerStatementResponse[]>(`/customers/${customerId}/transactions/statement`);
    return data;
  }

  async addCustomerPayment(customerId: string, reqData: CreatePaymentRequest): Promise<string> {
    const { data } = await apiClient.post<string>(`/customers/${customerId}/transactions/payments`, reqData);
    return data;
  }

  // --- Suppliers ---
  async getSuppliers(filters: ContactFilters): Promise<PaginatedList<SupplierResponse>> {
    const { data } = await apiClient.get<PaginatedList<SupplierResponse>>('/suppliers', { params: filters });
    return data;
  }

  async getSupplier(id: string): Promise<SupplierResponse> {
    const { data } = await apiClient.get<SupplierResponse>(`/suppliers/${id}`);
    return data;
  }

  async createSupplier(reqData: CreateSupplierRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/suppliers', reqData);
    return data;
  }

  async updateSupplier(id: string, reqData: CreateSupplierRequest): Promise<void> {
    await apiClient.put(`/suppliers/${id}`, reqData);
  }

  async deleteSupplier(id: string): Promise<void> {
    await apiClient.delete(`/suppliers/${id}`);
  }

  async getSupplierStatement(filters: StatementFilters): Promise<PaginatedList<SupplierStatementItemResponse>> {
    if (!filters.supplierId) throw new Error("supplierId is required for statement");
    const { data } = await apiClient.get<PaginatedList<SupplierStatementItemResponse>>(`/suppliers/${filters.supplierId}/statement`, { params: filters });
    return data;
  }

  async addSupplierPayment(supplierId: string, reqData: CreatePaymentRequest): Promise<string> {
    const payload = { ...reqData, supplierId };
    const { data } = await apiClient.post<string>('/supplier-transactions/payments', payload);
    return data;
  }
}

export const contactsRepository = new ContactsRepository();

