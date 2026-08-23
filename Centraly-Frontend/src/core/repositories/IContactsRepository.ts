import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  CreateCustomerRequest, 
  CustomerResponse, 
  CustomerStatementResponse, CustomerDebtHistoryResponse, 
  CreateSupplierRequest, 
  SupplierResponse, 
  SupplierStatementItemResponse, 
  CreatePaymentRequest 
} from "@/features/contacts/schemas/contactSchemas";

export interface IContactsRepository {
  // Customers
  getCustomers(filters: RequestFilters): Promise<PaginatedList<CustomerResponse>>;
  getCustomer(id: string): Promise<CustomerResponse>;
  getCustomerDebtHistory(id: string): Promise<CustomerDebtHistoryResponse>;
  createCustomer(data: CreateCustomerRequest): Promise<string>;
  updateCustomer(id: string, data: CreateCustomerRequest): Promise<void>;
  deleteCustomer(id: string): Promise<void>;
  
  // Customer Transactions
  getCustomerStatement(filters: RequestFilters): Promise<PaginatedList<CustomerStatementResponse>>;
  addCustomerPayment(customerId: string, data: CreatePaymentRequest): Promise<string>;

  // Suppliers
  getSuppliers(filters: RequestFilters): Promise<PaginatedList<SupplierResponse>>;
  getSupplier(id: string): Promise<SupplierResponse>;
  createSupplier(data: CreateSupplierRequest): Promise<string>;
  updateSupplier(id: string, data: CreateSupplierRequest): Promise<void>;
  deleteSupplier(id: string): Promise<void>;

  // Supplier Transactions
  getSupplierStatement(filters: RequestFilters): Promise<PaginatedList<SupplierStatementItemResponse>>;
  addSupplierPayment(supplierId: string, data: CreatePaymentRequest): Promise<string>;
}

