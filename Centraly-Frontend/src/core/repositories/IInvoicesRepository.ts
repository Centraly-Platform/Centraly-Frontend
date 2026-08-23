import { PaginatedList } from "@/shared/types/pagination";
import { 
  CreateSalesInvoiceRequest,  SalesInvoiceResponse, 
  CreatePurchaseInvoiceRequest, 
  PurchaseInvoiceResponse,
  InvoiceFilters
} from "@/features/invoices/schemas/invoiceSchemas";
import { CreateSupplierReturnRequest, CreateCustomerReturnRequest } from "@/features/invoices/schemas/returnSchemas";

export interface IInvoicesRepository {
  // Sales Invoices
  getSalesInvoices(filters: InvoiceFilters): Promise<PaginatedList<SalesInvoiceResponse>>;
  getSalesInvoice(id: string): Promise<SalesInvoiceResponse>;
  createSalesInvoice(data: CreateSalesInvoiceRequest): Promise<string>;
  
  // Purchase Invoices
  getPurchaseInvoices(filters: InvoiceFilters): Promise<PaginatedList<PurchaseInvoiceResponse>>;
  getPurchaseInvoice(id: string): Promise<PurchaseInvoiceResponse>;
  createPurchaseInvoice(data: CreatePurchaseInvoiceRequest): Promise<string>;

  // Returns
  createSupplierReturn(data: CreateSupplierReturnRequest): Promise<string>;
  createCustomerReturn(customerId: string, data: CreateCustomerReturnRequest): Promise<string>;
}

