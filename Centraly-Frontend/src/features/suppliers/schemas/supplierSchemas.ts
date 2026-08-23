import { z } from "zod";
import { BaseFilters } from "@/shared/types/pagination";

export interface SupplierFilters extends BaseFilters {
  searchValue?: string;
}

export interface SupplierResponse {
  supplierId: string;
  name: string;
  type?: string;
  phone?: string;
  address?: string;
  debtBalance: number;
  purchaseInvoicesCount: number;
  returnsCount: number;
  createdAt: string;
}

export interface SupplierStatementItemResponse {
  date: string;
  transactionType: string;
  transactionId: string;
  debit: number;
  credit: number;
  balanceAfter: number;
  notes?: string;
}

export const createSupplierSchema = z.object({
  name: z.string().min(1, "اسم المورد مطلوب"),
  type: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type CreateSupplierRequest = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierRequest = CreateSupplierRequest;
