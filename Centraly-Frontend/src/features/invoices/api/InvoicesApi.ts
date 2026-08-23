import { apiClient } from "@/lib/axios";
import { IInvoicesRepository } from "@/core/repositories/IInvoicesRepository";
import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  CreateSalesInvoiceRequest, SalesInvoiceResponse,
  CreatePurchaseInvoiceRequest, PurchaseInvoiceResponse
} from "../schemas/invoiceSchemas";
import { CreateSupplierReturnRequest } from "../schemas/returnSchemas";

import { CreateCustomerReturnRequest } from '../schemas/returnSchemas';

export class InvoicesRepository implements IInvoicesRepository {
  // --- Sales ---
  async getSalesInvoices(filters: RequestFilters): Promise<PaginatedList<SalesInvoiceResponse>> {
    const { data } = await apiClient.get<PaginatedList<SalesInvoiceResponse>>('/sales-invoices', { params: filters });
    return data;
  }

  async getSalesInvoice(id: string): Promise<SalesInvoiceResponse> {
    const { data } = await apiClient.get<SalesInvoiceResponse>(`/sales-invoices/${id}`);
    return data;
  }

  async createSalesInvoice(reqData: CreateSalesInvoiceRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/sales-invoices', reqData);
    return data;
  }

  // --- Purchases ---
  async getPurchaseInvoices(filters: RequestFilters): Promise<PaginatedList<PurchaseInvoiceResponse>> {
    const { data } = await apiClient.get<PaginatedList<PurchaseInvoiceResponse>>('/purchase-invoices', { params: filters });
    return data;
  }

  async getPurchaseInvoice(id: string): Promise<PurchaseInvoiceResponse> {
    const { data } = await apiClient.get<PurchaseInvoiceResponse>(`/purchase-invoices/${id}`);
    return data;
  }

  async createPurchaseInvoice(reqData: CreatePurchaseInvoiceRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/purchase-invoices', reqData);
    return data;
  }

  // --- Returns ---
  async createCustomerReturn(customerId: string, reqData: CreateCustomerReturnRequest): Promise<string> {
    const { data } = await apiClient.post<string>(`/customers/${customerId}/transactions/returns`, reqData);
    return data;
  }

  async createSupplierReturn(reqData: CreateSupplierReturnRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/supplier-transactions/returns', reqData);
    return data;
  }
}

export const invoicesRepository = new InvoicesRepository();

