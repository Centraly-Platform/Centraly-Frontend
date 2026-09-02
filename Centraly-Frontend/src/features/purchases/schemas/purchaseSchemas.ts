import * as z from 'zod';
import { BaseFilters } from '@/shared/types/pagination';

// Requests
export const purchaseInvoiceItemSchema = z.object({
  productId: z.string().min(1, "ÙŠØ¬Ø¨ Ø§Ø®ØªÙŠØ§Ø± Ù…Ù†ØªØ¬"),
  productName: z.string().optional(), // Frontend only helper
  productUsage: z.number().optional(), // Frontend only: 1=SaleOnly, 2=MaintenanceOnly, 3=Both
  quantity: z.number().min(1, "Ø§Ù„ÙƒÙ…ÙŠØ© ÙŠØ¬Ø¨ Ø£Ù† ØªÙƒÙˆÙ† Ø£ÙƒØ¨Ø± Ù…Ù† ØµÙØ±"),
  unitCost: z.number().min(0, "ØªÙƒÙ„ÙØ© Ø§Ù„ÙˆØ­Ø¯Ø© ÙŠØ¬Ø¨ Ø£Ù† ØªÙƒÙˆÙ† 0 Ø£Ùˆ Ø£ÙƒØ«Ø±"),
  wholesalePrice: z.number().min(0, "Ø³Ø¹Ø± Ø§Ù„Ø¬Ù…Ù„Ø© ØºÙŠØ± ØµØ§Ù„Ø­"),
  retailPrice: z.number().min(0, "Ø³Ø¹Ø± Ø§Ù„ØªØ¬Ø²Ø¦Ø© ØºÙŠØ± ØµØ§Ù„Ø­"),
  maintenancePrice: z.number().min(0, "Ø³Ø¹Ø± Ø§Ù„ØµÙŠØ§Ù†Ø© ØºÙŠØ± ØµØ§Ù„Ø­").optional(),
});

export type CreatePurchaseInvoiceItemRequest = z.infer<typeof purchaseInvoiceItemSchema>;

export const createPurchaseInvoiceSchema = z.object({
  supplierId: z.string().min(1, "ÙŠØ¬Ø¨ Ø§Ø®ØªÙŠØ§Ø± Ù…ÙˆØ±Ø¯"),
  paidAmount: z.number().min(0, "Ø§Ù„Ù…Ø¨Ù„Øº Ø§Ù„Ù…Ø¯ÙÙˆØ¹ ØºÙŠØ± ØµØ§Ù„Ø­"),
  paymentSource: z.number().optional(),
  notes: z.string().optional(),
  items: z.array(purchaseInvoiceItemSchema).min(1, "ÙŠØ¬Ø¨ Ø¥Ø¶Ø§ÙØ© Ù…Ù†ØªØ¬ ÙˆØ§Ø­Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„"),
});

export type CreatePurchaseInvoiceRequest = z.infer<typeof createPurchaseInvoiceSchema>;

// Responses
export interface ProductSummary {
  productId: string;
  name?: string;
  barcode?: string;
  imageUrl?: string;
  retailPrice: number;
  wholesalePrice?: number;
  quantity: number;
}

export interface PurchaseInvoiceItemResponse {
  purchaseInvoiceItemId: string;
  product: ProductSummary;
  quantity: number;
  unitCost: number;
  lineTotal: number;
}

export interface PurchaseInvoiceResponse {
  purchaseInvoiceId: string;
  invoiceNumber: string;
  invoiceDate: string;
  supplier: {
    id: string;
    name: string;
    phone?: string;
  };
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  notes?: string;
  items: PurchaseInvoiceItemResponse[];
}

export interface PurchaseFilters extends BaseFilters {
  supplierId?: string;
  startDate?: string;
  endDate?: string;
}
