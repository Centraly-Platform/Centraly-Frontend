import * as z from "zod";

export type ReturnReasonDto = 1 | 2 | 3 | 4;

// --- Supplier Return ---

export const createSupplierReturnItemSchema = z.object({
  productId: z.string().min(1, "Ø§Ù„Ù…Ù†ØªØ¬ Ù…Ø·Ù„ÙˆØ¨"),
  batchId: z.string().min(1, "Ø§Ù„Ø¯ÙØ¹Ø© Ù…Ø·Ù„ÙˆØ¨Ø©"),
  quantity: z.number().min(1),
  returnPrice: z.number().min(0),
});
export type CreateSupplierReturnItemRequest = z.infer<typeof createSupplierReturnItemSchema>;

export const createSupplierReturnSchema = z.object({
  supplierId: z.string().min(1, "Ø§Ù„Ù…ÙˆØ±Ø¯ Ù…Ø·Ù„ÙˆØ¨"),
  reason: z.number(), // ReturnReasonDto
  notes: z.string().nullable().optional(),
  items: z.array(createSupplierReturnItemSchema).min(1, "ÙŠØ¬Ø¨ Ø¥Ø¶Ø§ÙØ© Ù…Ù†ØªØ¬ ÙˆØ§Ø­Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„"),
});
export type CreateSupplierReturnRequest = z.infer<typeof createSupplierReturnSchema>;

export interface SupplierReturnItemResponse {
  supplierReturnItemId: string;
  product: { id: string; name: string };
  quantity: number;
  unitCost: number;
  lineTotal: number;
}

export interface SupplierReturnResponse {
  supplierReturnId: string;
  supplier: { id: string; name: string };
  reason: ReturnReasonDto;
  notes?: string;
  totalReturnedAmount: number;
  returnDate: string;
  items: SupplierReturnItemResponse[];
}

// Note: CustomerReturn follows a similar structure in backend.

// --- Customer Return ---
export const returnItemSchema = z.object({
  productId: z.string(),
  batchId: z.string(),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
});
export type ReturnItemRequest = z.infer<typeof returnItemSchema>;

export const createCustomerReturnSchema = z.object({
  invoiceId: z.string(),
  reason: z.number(), // ReturnReasonDto
  notes: z.string().optional(),
  isCashRefund: z.boolean(),
  items: z.array(returnItemSchema).min(1),
});
export type CreateCustomerReturnRequest = z.infer<typeof createCustomerReturnSchema>;

export interface ReturnItemResponse {
  id: string;
  productId: string;
  batchId: string;
  quantity: number;
  unitPrice: number;
}

export interface ReturnRecordResponse {
  id: string;
  invoiceId: string;
  isFullInvoiceReturn: boolean;
  reason: ReturnReasonDto;
  notes?: string;
  isCashRefund: boolean;
  totalReturnedAmount: number;
  returnDate: string;
  items: ReturnItemResponse[];
}
