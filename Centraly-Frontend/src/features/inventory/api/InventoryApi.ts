import { apiClient } from "@/lib/axios";
import { IInventoryRepository } from "@/core/repositories/IInventoryRepository";
import { PaginatedList } from "@/shared/types/pagination";
import { 
  CategoryResponse, 
  CreateProductRequest, 
  DepartmentResponse, 
  ProductBatchResponse, 
  ProductResponse,
  ProductFilters
} from "../schemas/inventorySchemas";

export class InventoryRepository implements IInventoryRepository {
  async getCategories(filters?: ProductFilters): Promise<PaginatedList<CategoryResponse>> {
    const { data } = await apiClient.get<PaginatedList<CategoryResponse>>('/categories', { params: filters });
    return data;
  }

  async createCategory(reqData: { name: string; departmentId: string }): Promise<string> {
    const { data } = await apiClient.post<string>('/categories', reqData);
    return data;
  }

  async updateCategory(id: string, reqData: { name: string; departmentId: string }): Promise<void> {
    await apiClient.put(`/categories/${id}`, reqData);
  }

  async deleteCategory(id: string): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  }

  async getDepartments(categoryId?: string, filters?: ProductFilters): Promise<PaginatedList<DepartmentResponse>> {
    const params = { ...filters, categoryId };
    const { data } = await apiClient.get<PaginatedList<DepartmentResponse>>('/departments', { params });
    return data;
  }

  async createDepartment(reqData: { name: string }): Promise<string> {
    const { data } = await apiClient.post<string>('/departments', reqData);
    return data;
  }

  async updateDepartment(id: string, reqData: { name: string }): Promise<void> {
    await apiClient.put(`/departments/${id}`, reqData);
  }

  async deleteDepartment(id: string): Promise<void> {
    await apiClient.delete(`/departments/${id}`);
  }

  async getProducts(filters: ProductFilters): Promise<PaginatedList<ProductResponse>> {
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

  async getProductBatches(filters: ProductFilters): Promise<PaginatedList<ProductBatchResponse>> {
    const { data } = await apiClient.get<PaginatedList<ProductBatchResponse>>('/products/batches', { params: filters });
    return data;
  }
}

export const inventoryRepository = new InventoryRepository();
