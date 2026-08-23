import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactsRepository } from "../api/ContactsApi";
import { RequestFilters } from "@/shared/types/pagination";
import { CreateCustomerRequest, CreateSupplierRequest, CreatePaymentRequest } from "../schemas/contactSchemas";
import { toast } from "sonner";

export const CONTACT_KEYS = {
  customers: (filters: RequestFilters) => ["customers", filters] as const,
  customerDetails: (id: string) => ["customers", id] as const,
  customerStatement: (filters: RequestFilters) => ["customers", "statement", filters] as const,
  
  suppliers: (filters: RequestFilters) => ["suppliers", filters] as const,
  supplierDetails: (id: string) => ["suppliers", id] as const,
  supplierStatement: (filters: RequestFilters) => ["suppliers", "statement", filters] as const,
};

// --- Customer Queries & Mutations ---

export function useCustomers(filters: RequestFilters) {
  return useQuery({
    queryKey: CONTACT_KEYS.customers(filters),
    queryFn: () => contactsRepository.getCustomers(filters),
  });
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: CONTACT_KEYS.customerDetails(id),
    queryFn: () => contactsRepository.getCustomer(id),
    enabled: !!id,
  });
}

export function useCustomerStatement(filters: RequestFilters) {
  return useQuery({
    queryKey: CONTACT_KEYS.customerStatement(filters),
    queryFn: () => contactsRepository.getCustomerStatement(filters),
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCustomerRequest) => contactsRepository.createCustomer(data),
    onSuccess: () => {
      toast.success("تم إضافة العميل بنجاح");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة العميل"),
  });
}

export function useAddCustomerPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreatePaymentRequest }) => 
      contactsRepository.addCustomerPayment(id, data),
    onSuccess: (_, { id }) => {
      toast.success("تم تسجيل الدفعة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: CONTACT_KEYS.customerDetails(id) });
    },
    onError: () => toast.error("حدث خطأ أثناء تسجيل الدفعة"),
  });
}

// --- Supplier Queries & Mutations ---

export function useSuppliers(filters: RequestFilters) {
  return useQuery({
    queryKey: CONTACT_KEYS.suppliers(filters),
    queryFn: () => contactsRepository.getSuppliers(filters),
  });
}

export function useSupplier(id: string) {
  return useQuery({
    queryKey: CONTACT_KEYS.supplierDetails(id),
    queryFn: () => contactsRepository.getSupplier(id),
    enabled: !!id,
  });
}

export function useSupplierStatement(filters: RequestFilters) {
  return useQuery({
    queryKey: CONTACT_KEYS.supplierStatement(filters),
    queryFn: () => contactsRepository.getSupplierStatement(filters),
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSupplierRequest) => contactsRepository.createSupplier(data),
    onSuccess: () => {
      toast.success("تم إضافة المورد بنجاح");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة المورد"),
  });
}

export function useAddSupplierPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreatePaymentRequest }) => 
      contactsRepository.addSupplierPayment(id, data),
    onSuccess: (_, { id }) => {
      toast.success("تم تسجيل الدفعة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      queryClient.invalidateQueries({ queryKey: CONTACT_KEYS.supplierDetails(id) });
    },
    onError: () => toast.error("حدث خطأ أثناء تسجيل الدفعة"),
  });
}
