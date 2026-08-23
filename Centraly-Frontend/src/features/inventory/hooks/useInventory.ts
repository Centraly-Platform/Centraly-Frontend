import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryRepository } from "../api/InventoryApi";
import { RequestFilters } from "@/shared/types/pagination";
import { CreateProductRequest } from "../schemas/inventorySchemas";
import { toast } from "sonner";

export const INVENTORY_KEYS = {
  categories: ["categories"] as const,
  departments: (categoryId?: string) => ["departments", categoryId] as const,
  products: (filters: RequestFilters) => ["products", filters] as const,
  productDetails: (id: string) => ["products", id] as const,
  batches: (filters: RequestFilters) => ["batches", filters] as const,
};

// --- Queries ---

export function useCategories(filters: RequestFilters = { pageNumber: 1, pageSize: 100 }) {
  return useQuery({
    queryKey: [...INVENTORY_KEYS.categories, filters],
    queryFn: () => inventoryRepository.getCategories(filters),
  });
}

export function useDepartments(categoryId?: string, filters: RequestFilters = { pageNumber: 1, pageSize: 100 }) {
  return useQuery({
    queryKey: [...INVENTORY_KEYS.departments(categoryId), filters],
    queryFn: () => inventoryRepository.getDepartments(categoryId, filters),
  });
}

export function useProducts(filters: RequestFilters) {
  return useQuery({
    queryKey: INVENTORY_KEYS.products(filters),
    queryFn: () => inventoryRepository.getProducts(filters),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: INVENTORY_KEYS.productDetails(id),
    queryFn: () => inventoryRepository.getProduct(id),
    enabled: !!id,
  });
}

export function useProductBatches(filters: RequestFilters) {
  return useQuery({
    queryKey: INVENTORY_KEYS.batches(filters),
    queryFn: () => inventoryRepository.getProductBatches(filters),
  });
}

// --- Mutations ---

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductRequest) => inventoryRepository.createProduct(data),
    onSuccess: () => {
      toast.success("تم إضافة المنتج بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة المنتج"),
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateProductRequest }) => 
      inventoryRepository.updateProduct(id, data),
    onSuccess: (_, { id }) => {
      toast.success("تم تعديل المنتج بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.productDetails(id) });
    },
    onError: () => toast.error("حدث خطأ أثناء تعديل المنتج"),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryRepository.deleteProduct(id),
    onSuccess: () => {
      toast.success("تم حذف المنتج بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("حدث خطأ أثناء حذف المنتج"),
  });
}
