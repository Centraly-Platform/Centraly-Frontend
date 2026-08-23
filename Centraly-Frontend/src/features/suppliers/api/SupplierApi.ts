import { apiClient } from "@/lib/axios";
import { PaginatedList } from "@/shared/types/pagination";
import { SupplierResponse, CreateSupplierRequest, UpdateSupplierRequest, SupplierFilters } from "../schemas/supplierSchemas";

export const supplierRepository = {
  getSuppliers: async (filters: SupplierFilters): Promise<PaginatedList<SupplierResponse>> => {
    const response = await apiClient.get<PaginatedList<SupplierResponse>>('/suppliers', { params: filters });
    return response.data;
  },
  
  getSupplier: async (id: string): Promise<SupplierResponse> => {
    const response = await apiClient.get<SupplierResponse>(`/suppliers/${id}`);
    return response.data;
  },
  
  createSupplier: async (data: CreateSupplierRequest): Promise<SupplierResponse> => {
    const response = await apiClient.post<SupplierResponse>('/suppliers', data);
    return response.data;
  },
  
  updateSupplier: async (id: string, data: UpdateSupplierRequest): Promise<SupplierResponse> => {
    const response = await apiClient.put<SupplierResponse>(`/suppliers/${id}`, data);
    return response.data;
  },
  
  deleteSupplier: async (id: string): Promise<void> => {
    await apiClient.delete(`/suppliers/${id}`);
  },
};
