import * as z from "zod";

// --- Customers ---

export const createCustomerSchema = z.object({
  name: z.string().min(1, "Ø§Ù„Ø§Ø³Ù… Ù…Ø·Ù„ÙˆØ¨"),
  phone: z.string().optional(),
  email: z.string().email("Ø¨Ø±ÙŠØ¯ ØºÙŠØ± ØµØ§Ù„Ø­").optional().or(z.literal("")),
  address: z.string().optional(),
  notes: z.string().optional(),
});
export type CreateCustomerRequest = z.infer<typeof createCustomerSchema>;

export interface CustomerResponse {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  balance: number;
  createdAt: string;
}

export interface CustomerStatementResponse {
  date: string;
  transactionType: string;
  transactionId: string;
  debit: number;
  credit: number;
  balanceAfter: number;
  notes?: string;
}

// --- Suppliers ---

export const createSupplierSchema = z.object({
  name: z.string().min(1, "Ø§Ù„Ø§Ø³Ù… Ù…Ø·Ù„ÙˆØ¨"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().email("Ø¨Ø±ÙŠØ¯ ØºÙŠØ± ØµØ§Ù„Ø­").optional().or(z.literal("")),
  address: z.string().optional(),
  notes: z.string().optional(),
});
export type CreateSupplierRequest = z.infer<typeof createSupplierSchema>;

export interface SupplierResponse {
  id: string;
  name: string;
  companyName?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  balance: number;
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

// --- Payments ---

export const createPaymentSchema = z.object({
  amount: z.number().min(0.01, "Ø§Ù„Ù…Ø¨Ù„Øº ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† Ø£ÙƒØ¨Ø± Ù…Ù† ØµÙØ±"),
  notes: z.string().optional(),
});
export type CreatePaymentRequest = z.infer<typeof createPaymentSchema>;

// --- Customer Debt History ---
export interface CustomerInvoiceSummary {
  id: string;
  invoiceNumber: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  createdAt: string;
}
export interface CustomerDebtPaymentResponse {
  id: string;
  amount: number;
  createdAt: string;
  notes?: string;
}
export interface CustomerDebtHistoryResponse {
  customer: CustomerResponse;
  deferredInvoices: CustomerInvoiceSummary[];
  payments: CustomerDebtPaymentResponse[];
}
