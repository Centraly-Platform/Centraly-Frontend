import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  CreateSalesInvoiceRequest, SalesInvoiceResponse,
  CreatePurchaseInvoiceRequest, PurchaseInvoiceResponse
} from "@/features/invoices/schemas/invoiceSchemas";
import { CreateSupplierReturnRequest, CreateCustomerReturnRequest } from "@/features/invoices/schemas/returnSchemas";

export interface IInvoicesRepository {
  // Sales Invoices
  getSalesInvoices(filters: RequestFilters): Promise<PaginatedList<SalesInvoiceResponse>>;
  getSalesInvoice(id: string): Promise<SalesInvoiceResponse>;
  createSalesInvoice(data: CreateSalesInvoiceRequest): Promise<string>;
  
  // Purchase Invoices
  getPurchaseInvoices(filters: RequestFilters): Promise<PaginatedList<PurchaseInvoiceResponse>>;
  getPurchaseInvoice(id: string): Promise<PurchaseInvoiceResponse>;
  createPurchaseInvoice(data: CreatePurchaseInvoiceRequest): Promise<string>;

  // Returns
  createSupplierReturn(data: CreateSupplierReturnRequest): Promise<string>;
  createCustomerReturn(customerId: string, data: CreateCustomerReturnRequest): Promise<string>;
}

