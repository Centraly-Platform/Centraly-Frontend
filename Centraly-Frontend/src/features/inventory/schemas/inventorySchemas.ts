import { z } from "zod";
import { BaseFilters } from "@/shared/types/pagination";

export interface ProductFilters extends BaseFilters {
  categoryId?: string;
  departmentId?: string;
  stockStatus?: string;
}

// Shared common filters
// Categories
export interface CategoryResponse {
  categoryId: string;
  name: string;
  department: DepartmentSummary;
  productsCount: number;
  createdAt: string;
}

// Departments
export interface DepartmentResponse {
  departmentId: string;
  name: string;
  categoriesCount: number;
  productsCount: number;
  createdAt: string;
}

export const createDepartmentSchema = z.object({
  name: z.string().min(1, "اسم القسم الرئيسي مطلوب"),
});

export type CreateDepartmentRequest = z.infer<typeof createDepartmentSchema>;

export const createCategorySchema = z.object({
  name: z.string().min(1, "اسم القسم الفرعي مطلوب"),
  departmentId: z.string().min(1, "يجب اختيار القسم الرئيسي"),
});

export type CreateCategoryRequest = z.infer<typeof createCategorySchema>;

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

export interface DepartmentSummary {
  departmentId: string;
  name: string;
}

export interface CategorySummary {
  categoryId: string;
  name: string;
}

export interface ProductBatchResponse {
  batchId: string;
  supplierId?: string;
  supplierName?: string;
  availableQuantity: number;
  purchasePrice: number;
  wholesalePrice: number;
  retailPrice: number;
  dateReceived: string;
}

export interface ProductResponse {
  productId: string;
  barcode?: string;
  name?: string;
  department: DepartmentSummary;
  category: CategorySummary;
  totalQuantity: number;
  imageUrl?: string;
  minQuantityAlert: number;
  storageLocation?: string;
  isOutOfStock: boolean;
  isLowStock: boolean;
  createdAt: string;
  properties: Record<string, string>;
  batches: ProductBatchResponse[];
}
