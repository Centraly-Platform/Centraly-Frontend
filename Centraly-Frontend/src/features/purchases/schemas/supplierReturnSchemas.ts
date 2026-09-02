import * as z from 'zod';
import { BaseFilters } from '@/shared/types/pagination';

// Return reason labels and colors
export const RETURN_REASON_LABELS: Record<number, string> = {
  1: 'Ø¹ÙŠØ¨ Ø£Ùˆ Ø®Ù„Ù„ ÙÙŠ Ø§Ù„Ù…Ù†ØªØ¬',
  2: 'ØªØºÙŠÙŠØ± Ø±Ø£ÙŠ',
  3: 'Ø³Ø¨Ø¨ Ø¢Ø®Ø±',
};

export const RETURN_REASON_COLORS: Record<number, string> = {
  1: 'bg-red-50 text-red-700',
  2: 'bg-amber-50 text-amber-700',
  3: 'bg-gray-100 text-gray-600',
};

// Response types
export interface SupplierReturnProductSummary {
  productId: string;
  name?: string;
  barcode?: string;
  imageUrl?: string;
  retailPrice: number;
  wholesalePrice?: number;
  quantity: number;
}

export interface SupplierReturnItemResponse {
  supplierReturnItemId: string;
  product: SupplierReturnProductSummary;
  quantity: number;
  unitCost: number;
  lineTotal: number;
}

export interface SupplierReturnResponse {
  supplierReturnId: string;
  supplier: {
    id: string;
    name: string;
    phone?: string;
  };
  reason: 1 | 2 | 3;
  notes?: string;
  totalReturnedAmount: number;
  returnDate: string;
  items: SupplierReturnItemResponse[];
}

// Request schema
export const createSupplierReturnItemSchema = z.object({
  productId: z.string().min(1, 'ÙŠØ¬Ø¨ Ø§Ø®ØªÙŠØ§Ø± Ù…Ù†ØªØ¬'),
  batchId: z.string().min(1, 'ÙŠØ¬Ø¨ ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ø¯ÙØ¹Ø©'),
  quantity: z.number().min(1, 'Ø§Ù„ÙƒÙ…ÙŠØ© ÙŠØ¬Ø¨ Ø£Ù† ØªÙƒÙˆÙ† 1 Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„'),
  returnPrice: z.number().min(0, 'Ø³Ø¹Ø± Ø§Ù„Ø¥Ø±Ø¬Ø§Ø¹ ØºÙŠØ± ØµØ§Ù„Ø­'),
});

export type CreateSupplierReturnItemRequest = z.infer<typeof createSupplierReturnItemSchema>;

export const createSupplierReturnSchema = z.object({
  supplierId: z.string().min(1, 'ÙŠØ¬Ø¨ Ø§Ø®ØªÙŠØ§Ø± Ù…ÙˆØ±Ø¯'),
  reason: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  notes: z.string().optional(),
  items: z.array(createSupplierReturnItemSchema).min(1, 'ÙŠØ¬Ø¨ Ø¥Ø¶Ø§ÙØ© ØµÙ†Ù ÙˆØ§Ø­Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„'),
  isCashRefund: z.boolean().default(false),
  paymentSource: z.number().optional(),
});

export type CreateSupplierReturnRequest = z.infer<typeof createSupplierReturnSchema>;

// Filters
export interface SupplierReturnFilters extends BaseFilters {
  supplierId?: string;
}
