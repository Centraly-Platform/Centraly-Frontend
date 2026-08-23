import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  CategoryResponse, 
  CreateProductRequest, 
  DepartmentResponse, 
  ProductBatchResponse, 
  ProductResponse 
} from "@/features/inventory/schemas/inventorySchemas";

export interface IInventoryRepository {
  // Categories
  getCategories(filters?: RequestFilters): Promise<PaginatedList<CategoryResponse>>;
  createCategory(name: string, description?: string): Promise<string>;
  
  // Departments
  getDepartments(categoryId?: string, filters?: RequestFilters): Promise<PaginatedList<DepartmentResponse>>;
  createDepartment(categoryId: string, name: string): Promise<string>;

  // Products
  getProducts(filters: RequestFilters): Promise<PaginatedList<ProductResponse>>;
  getProduct(id: string): Promise<ProductResponse>;
  createProduct(data: CreateProductRequest): Promise<string>;
  updateProduct(id: string, data: CreateProductRequest): Promise<void>;
  deleteProduct(id: string): Promise<void>;

  // Batches
  getProductBatches(filters: RequestFilters): Promise<PaginatedList<ProductBatchResponse>>;
}
