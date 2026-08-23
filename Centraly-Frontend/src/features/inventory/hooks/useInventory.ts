import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryRepository } from "../api/InventoryApi";
import { ProductFilters, CreateProductRequest } from "../schemas/inventorySchemas";
import { toast } from "sonner";

export const INVENTORY_KEYS = {
  categories: ["categories"] as const,
  departments: (categoryId?: string) => ["departments", categoryId] as const,
  products: (filters: ProductFilters) => ["products", filters] as const,
  productDetails: (id: string) => ["products", id] as const,
  batches: (filters: ProductFilters) => ["batches", filters] as const,
};

// --- Queries ---

export function useCategories(filters: ProductFilters = { pageNumber: 1, pageSize: 100 }) {
  return useQuery({
    queryKey: [...INVENTORY_KEYS.categories, filters],
    queryFn: () => inventoryRepository.getCategories(filters),
  });
}

export function useDepartments(categoryId?: string, filters: ProductFilters = { pageNumber: 1, pageSize: 100 }) {
  return useQuery({
    queryKey: [...INVENTORY_KEYS.departments(categoryId), filters],
    queryFn: () => inventoryRepository.getDepartments(categoryId, filters),
  });
}

export function useProducts(filters: ProductFilters) {
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

export function useProductBatches(filters: ProductFilters) {
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

// --- Categories Mutations ---

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; departmentId: string }) => inventoryRepository.createCategory(data),
    onSuccess: () => {
      toast.success("تم إضافة القسم الفرعي بنجاح!");
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.categories });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة القسم الفرعي"),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string; departmentId: string } }) => 
      inventoryRepository.updateCategory(id, data),
    onSuccess: () => {
      toast.success("تم تعديل القسم الفرعي بنجاح!");
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.categories });
    },
    onError: () => toast.error("حدث خطأ أثناء تعديل القسم الفرعي"),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryRepository.deleteCategory(id),
    onSuccess: () => {
      toast.success("تم حذف القسم الفرعي بنجاح!");
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.categories });
    },
    onError: () => toast.error("حدث خطأ أثناء حذف القسم الفرعي"),
  });
}

// --- Departments Mutations ---

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) => inventoryRepository.createDepartment(data),
    onSuccess: () => {
      toast.success("تم إضافة القسم الرئيسي بنجاح!");
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.departments() });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة القسم الرئيسي"),
  });
}

export function useUpdateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) => 
      inventoryRepository.updateDepartment(id, data),
    onSuccess: () => {
      toast.success("تم تعديل القسم الرئيسي بنجاح!");
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.departments() });
    },
    onError: () => toast.error("حدث خطأ أثناء تعديل القسم الرئيسي"),
  });
}

export function useDeleteDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryRepository.deleteDepartment(id),
    onSuccess: () => {
      toast.success("تم حذف القسم الرئيسي بنجاح!");
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.departments() });
    },
    onError: () => toast.error("حدث خطأ أثناء حذف القسم الرئيسي"),
  });
}
