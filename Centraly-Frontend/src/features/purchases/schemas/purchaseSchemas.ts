import * as z from 'zod';
import { BaseFilters } from '@/shared/types/pagination';

// Requests
export const purchaseInvoiceItemSchema = z.object({
  productId: z.string().min(1, "يجب اختيار منتج"),
  productName: z.string().optional(), // Frontend only helper
  quantity: z.number().min(1, "الكمية يجب أن تكون أكبر من صفر"),
  unitCost: z.number().min(0, "تكلفة الوحدة يجب أن تكون 0 أو أكثر"),
  wholesalePrice: z.number().min(0, "سعر الجملة غير صالح"),
  retailPrice: z.number().min(0, "سعر التجزئة غير صالح"),
});

export type CreatePurchaseInvoiceItemRequest = z.infer<typeof purchaseInvoiceItemSchema>;

export const createPurchaseInvoiceSchema = z.object({
  supplierId: z.string().min(1, "يجب اختيار مورد"),
  paidAmount: z.number().min(0, "المبلغ المدفوع غير صالح"),
  notes: z.string().optional(),
  items: z.array(purchaseInvoiceItemSchema).min(1, "يجب إضافة منتج واحد على الأقل"),
});

export type CreatePurchaseInvoiceRequest = z.infer<typeof createPurchaseInvoiceSchema>;

// Responses
export interface PurchaseInvoiceItemResponse {
  invoiceItemId: string;
  invoiceId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  batchId?: string;
}

export interface PurchaseInvoiceResponse {
  invoiceId: string;
  invoiceNumber: string;
  invoiceDate: string;
  supplierId: string;
  supplierName: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  notes?: string;
  createdByName?: string;
  items: PurchaseInvoiceItemResponse[];
}

export interface PurchaseFilters extends BaseFilters {
  supplierId?: string;
  startDate?: string;
  endDate?: string;
}
