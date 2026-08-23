import { z } from "zod";
import { BaseFilters } from "@/shared/types/pagination";

export interface InvoiceFilters extends BaseFilters {
  startDate?: string;
  endDate?: string;
  customerId?: string;
  supplierId?: string;
}

// --- Enums ---
export type SaleTypeDto = 1 | 2; // e.g. 1 = Retail, 2 = Wholesale
export type PaymentMethodDto = 1 | 2 | 3; // e.g. 1 = Cash, 2 = Credit/Visa, 3 = Deferred

// --- Sales Invoice ---

export const createSalesInvoiceItemSchema = z.object({
  productId: z.string().min(1, "المنتج مطلوب"),
  batchId: z.string().min(1, "رقم الدفعة مطلوب"),
  quantity: z.number().min(1, "الكمية يجب أن تكون 1 على الأقل"),
  sellingPrice: z.number().min(0),
});
export type CreateSalesInvoiceItemRequest = z.infer<typeof createSalesInvoiceItemSchema>;

export const createSalesInvoiceSchema = z.object({
  customerId: z.string().nullable().optional(),
  customerName: z.string().nullable().optional(),
  customerPhone: z.string().nullable().optional(),
  saleType: z.number(), // SaleTypeDto
  paymentMethod: z.number(), // PaymentMethodDto
  paidAmount: z.number().min(0),
  notes: z.string().nullable().optional(),
  items: z.array(createSalesInvoiceItemSchema).min(1, "يجب إضافة منتج واحد على الأقل"),
});
export type CreateSalesInvoiceRequest = z.infer<typeof createSalesInvoiceSchema>;

export interface SalesInvoiceItemResponse {
  id: string;
  productId: string;
  batchId: string;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  lineTotal: number;
}

export interface CustomerSummary {
  id: string;
  name: string;
  phone?: string;
}

export interface SalesInvoiceResponse {
  id: string;
  invoiceNumber: string;
  customer?: CustomerSummary;
  saleType: SaleTypeDto;
  paymentMethod: PaymentMethodDto;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  notes?: string;
  createdAt: string;
  items: SalesInvoiceItemResponse[];
}

// --- Purchase Invoice ---

export const createPurchaseInvoiceItemSchema = z.object({
  productId: z.string().min(1, "المنتج مطلوب"),
  quantity: z.number().min(1, "الكمية يجب أن تكون 1 على الأقل"),
  unitCost: z.number().min(0, "سعر الشراء غير صالح"),
  wholesalePrice: z.number().min(0),
  retailPrice: z.number().min(0),
});
export type CreatePurchaseInvoiceItemRequest = z.infer<typeof createPurchaseInvoiceItemSchema>;

export const createPurchaseInvoiceSchema = z.object({
  supplierId: z.string().min(1, "المورد مطلوب"),
  paidAmount: z.number().min(0),
  notes: z.string().nullable().optional(),
  items: z.array(createPurchaseInvoiceItemSchema).min(1, "يجب إضافة منتج واحد على الأقل"),
});
export type CreatePurchaseInvoiceRequest = z.infer<typeof createPurchaseInvoiceSchema>;

export interface PurchaseInvoiceItemResponse {
  id: string;
  productId: string;
  quantity: number;
  unitCost: number;
  lineTotal: number;
}

export interface PurchaseInvoiceResponse {
  id: string;
  invoiceNumber: string;
  supplierId: string;
  supplierName: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  notes?: string;
  createdAt: string;
  items: PurchaseInvoiceItemResponse[];
}
