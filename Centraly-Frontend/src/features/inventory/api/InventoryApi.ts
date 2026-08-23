import { apiClient } from "@/lib/axios";
import { IInventoryRepository } from "@/core/repositories/IInventoryRepository";
import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  CategoryResponse, 
  CreateProductRequest, 
  DepartmentResponse, 
  ProductBatchResponse, 
  ProductResponse 
} from "../schemas/inventorySchemas";

export class InventoryRepository implements IInventoryRepository {
  async getCategories(filters?: RequestFilters): Promise<PaginatedList<CategoryResponse>> {
    const { data } = await apiClient.get<PaginatedList<CategoryResponse>>('/categories', { params: filters });
    return data;
  }

  async createCategory(name: string, description?: string): Promise<string> {
    const { data } = await apiClient.post<string>('/categories', { name, description });
    return data;
  }

  async getDepartments(categoryId?: string, filters?: RequestFilters): Promise<PaginatedList<DepartmentResponse>> {
    const params = { ...filters, categoryId };
    const { data } = await apiClient.get<PaginatedList<DepartmentResponse>>('/departments', { params });
    return data;
  }

  async createDepartment(categoryId: string, name: string): Promise<string> {
    const { data } = await apiClient.post<string>('/departments', { categoryId, name });
    return data;
  }

  async getProducts(filters: RequestFilters): Promise<PaginatedList<ProductResponse>> {
    const { data } = await apiClient.get<PaginatedList<ProductResponse>>('/products', { params: filters });
    return data;
  }

  async getProduct(id: string): Promise<ProductResponse> {
    const { data } = await apiClient.get<ProductResponse>(`/products/${id}`);
    return data;
  }

  async createProduct(reqData: CreateProductRequest): Promise<string> {
    const formData = new FormData();
    if (reqData.barcode) formData.append('Barcode', reqData.barcode);
    if (reqData.name) formData.append('Name', reqData.name);
    if (reqData.departmentId) formData.append('DepartmentId', reqData.departmentId);
    if (reqData.categoryId) formData.append('CategoryId', reqData.categoryId);
    formData.append('MinQuantityAlert', reqData.minQuantityAlert.toString());
    if (reqData.storageLocation) formData.append('StorageLocation', reqData.storageLocation);
    if (reqData.image instanceof File) {
      formData.append('Image', reqData.image);
    }
    if (reqData.properties) {
      Object.entries(reqData.properties).forEach(([key, value]) => {
        formData.append(`Properties[${key}]`, value as string);
      });
    }

    const { data } = await apiClient.post<string>('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  }

  async updateProduct(id: string, reqData: CreateProductRequest): Promise<void> {
    const formData = new FormData();
    if (reqData.barcode) formData.append('Barcode', reqData.barcode);
    if (reqData.name) formData.append('Name', reqData.name);
    if (reqData.departmentId) formData.append('DepartmentId', reqData.departmentId);
    if (reqData.categoryId) formData.append('CategoryId', reqData.categoryId);
    formData.append('MinQuantityAlert', reqData.minQuantityAlert.toString());
    if (reqData.storageLocation) formData.append('StorageLocation', reqData.storageLocation);
    if (reqData.image instanceof File) {
      formData.append('Image', reqData.image);
    }
    if (reqData.properties) {
      Object.entries(reqData.properties).forEach(([key, value]) => {
        formData.append(`Properties[${key}]`, value as string);
      });
    }

    await apiClient.put(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  }

  async getProductBatches(filters: RequestFilters): Promise<PaginatedList<ProductBatchResponse>> {
    const { data } = await apiClient.get<PaginatedList<ProductBatchResponse>>('/products/batches', { params: filters });
    return data;
  }
}

export const inventoryRepository = new InventoryRepository();
