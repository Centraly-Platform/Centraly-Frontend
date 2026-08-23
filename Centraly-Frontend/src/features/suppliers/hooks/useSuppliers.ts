import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supplierRepository } from "../api/SupplierApi";
import { SupplierFilters, CreateSupplierRequest, UpdateSupplierRequest } from "../schemas/supplierSchemas";
import { toast } from "sonner";

export const SUPPLIER_KEYS = {
  suppliers: (filters: SupplierFilters) => ["suppliers", filters] as const,
  supplierDetails: (id: string) => ["suppliers", id] as const,
};

export function useSuppliers(filters: SupplierFilters) {
  return useQuery({
    queryKey: SUPPLIER_KEYS.suppliers(filters),
    queryFn: () => supplierRepository.getSuppliers(filters),
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSupplierRequest) => supplierRepository.createSupplier(data),
    onSuccess: () => {
      toast.success("تم إضافة المورد بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة المورد"),
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSupplierRequest }) => 
      supplierRepository.updateSupplier(id, data),
    onSuccess: (_, { id }) => {
      toast.success("تم تحديث بيانات المورد بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      queryClient.invalidateQueries({ queryKey: SUPPLIER_KEYS.supplierDetails(id) });
    },
    onError: () => toast.error("حدث خطأ أثناء تحديث المورد"),
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => supplierRepository.deleteSupplier(id),
    onSuccess: () => {
      toast.success("تم حذف المورد بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: () => toast.error("حدث خطأ أثناء حذف المورد، قد يكون مرتبطاً بفواتير"),
  });
}
