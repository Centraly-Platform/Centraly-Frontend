import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { invoicesRepository } from "../api/InvoicesApi";
import { RequestFilters } from "@/shared/types/pagination";
import { CreateSalesInvoiceRequest, CreatePurchaseInvoiceRequest } from "../schemas/invoiceSchemas";
import { CreateSupplierReturnRequest } from "../schemas/returnSchemas";
import { toast } from "sonner";

export const INVOICE_KEYS = {
  sales: (filters: RequestFilters) => ["salesInvoices", filters] as const,
  salesDetails: (id: string) => ["salesInvoices", id] as const,
  
  purchases: (filters: RequestFilters) => ["purchaseInvoices", filters] as const,
  purchaseDetails: (id: string) => ["purchaseInvoices", id] as const,
};

// --- Sales Invoices ---

export function useSalesInvoices(filters: RequestFilters) {
  return useQuery({
    queryKey: INVOICE_KEYS.sales(filters),
    queryFn: () => invoicesRepository.getSalesInvoices(filters),
  });
}

export function useSalesInvoice(id: string) {
  return useQuery({
    queryKey: INVOICE_KEYS.salesDetails(id),
    queryFn: () => invoicesRepository.getSalesInvoice(id),
    enabled: !!id,
  });
}

export function useCreateSalesInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSalesInvoiceRequest) => invoicesRepository.createSalesInvoice(data),
    onSuccess: () => {
      toast.success("تم إنشاء فاتورة المبيعات بنجاح");
      queryClient.invalidateQueries({ queryKey: ["salesInvoices"] });
    },
    onError: () => toast.error("حدث خطأ أثناء إنشاء فاتورة المبيعات"),
  });
}

// --- Purchase Invoices ---

export function usePurchaseInvoices(filters: RequestFilters) {
  return useQuery({
    queryKey: INVOICE_KEYS.purchases(filters),
    queryFn: () => invoicesRepository.getPurchaseInvoices(filters),
  });
}

export function usePurchaseInvoice(id: string) {
  return useQuery({
    queryKey: INVOICE_KEYS.purchaseDetails(id),
    queryFn: () => invoicesRepository.getPurchaseInvoice(id),
    enabled: !!id,
  });
}

export function useCreatePurchaseInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePurchaseInvoiceRequest) => invoicesRepository.createPurchaseInvoice(data),
    onSuccess: () => {
      toast.success("تم إنشاء فاتورة المشتريات بنجاح");
      queryClient.invalidateQueries({ queryKey: ["purchaseInvoices"] });
    },
    onError: () => toast.error("حدث خطأ أثناء إنشاء فاتورة المشتريات"),
  });
}

// --- Returns ---

export function useCreateSupplierReturn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSupplierReturnRequest) => invoicesRepository.createSupplierReturn(data),
    onSuccess: () => {
      toast.success("تم تسجيل مرتجع المورد بنجاح");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      // Might want to invalidate batches/inventory as well
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },
    onError: () => toast.error("حدث خطأ أثناء تسجيل המرتجع"),
  });
}
