import { z } from "zod";
import { BaseFilters } from "@/shared/types/pagination";

export interface ProductFilters extends BaseFilters {
  categoryId?: string;
  departmentId?: string;
}

// Shared common filters
// Categories
export interface CategoryResponse {
  id: string;
  name: string;
  description?: string;
}

// Departments
export interface DepartmentResponse {
  id: string;
  categoryId: string;
  name: string;
}

// Products
export const createProductSchema = z.object({
  barcode: z.string().optional(),
  name: z.string().min(1, "اسم المنتج مطلوب"),
  departmentId: z.string().min(1, "القسم الفرعي مطلوب"),
  categoryId: z.string().min(1, "القسم الرئيسي مطلوب"),
  image: z.instanceof(File, { message: "يجب أن يكون ملفًا" }).optional(),
  minQuantityAlert: z.coerce.number().min(0, "يجب أن تكون 0 أو أكثر"),
  storageLocation: z.string().optional(),
  propertiesList: z.array(z.object({
    key: z.string().min(1, "الاسم مطلوب"),
    value: z.string().min(1, "القيمة مطلوبة")
  })).optional()
});

export type CreateProductRequest = z.infer<typeof createProductSchema> & {
  properties?: Record<string, string>;
};

export interface ProductResponse {
  id: string;
  barcode: string;
  name: string;
  departmentId: string;
  departmentName: string;
  categoryId: string;
  categoryName: string;
  minQuantityAlert: number;
  totalQuantity: number;
  averageUnitCost: number;
  storageLocation: string;
  imageUrl?: string;
  properties?: Record<string, string>;
}

// Batches
export interface ProductBatchResponse {
  id: string;
  productId: string;
  productName: string;
  supplierId?: string;
  supplierName?: string;
  purchaseInvoiceId?: string;
  quantity: number;
  unitCost: number;
  retailPrice: number;
  wholesalePrice: number;
  expiryDate?: string;
  receivedAt: string;
}
