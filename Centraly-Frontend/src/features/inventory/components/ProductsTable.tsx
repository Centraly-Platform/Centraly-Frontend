import { Edit, Eye, Trash2 } from 'lucide-react';
import { DataTable } from '@/shared/components/ui/DataTable';
import { ProductStatusBadge } from './ProductStatusBadge';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';
import { PaginatedList } from '@/shared/types/pagination';
import { tokens } from '@/shared/styles/tokens';

interface ProductsTableProps {
  data?: PaginatedList<ProductResponse>;
  isLoading: boolean;
  pageIndex: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onEdit?: (product: ProductResponse) => void;
  onDelete?: (product: ProductResponse) => void;
  onViewBatches?: (product: ProductResponse) => void;
}

/**
 * Products table — defines columns and delegates rendering to the shared DataTable.
 * All column definitions live here, NOT in the page.
 */
export function ProductsTable({
  data,
  isLoading,
  pageIndex,
  onNextPage,
  onPrevPage,
  onEdit,
  onDelete,
  onViewBatches,
}: ProductsTableProps) {
  const columns = [
    {
      header: 'المنتج',
      cell: (row: ProductResponse) => (
        <span className="font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      header: 'الباركود',
      cell: (row: ProductResponse) => (
        <span className={tokens.font.muted}>{row.barcode || '---'}</span>
      ),
    },
    {
      header: 'القسم',
      cell: (row: ProductResponse) => (
        <span className={tokens.badge.indigo}>{row.categoryName || '---'}</span>
      ),
    },
    {
      header: 'الكمية المتوفرة',
      cell: (row: ProductResponse) => (
        <ProductStatusBadge quantity={row.totalQuantity} reorderLevel={row.minQuantityAlert} />
      ),
    },
    {
      header: 'حد الطلب',
      cell: (row: ProductResponse) => (
        <span className={tokens.font.muted}>{row.minQuantityAlert}</span>
      ),
    },
    {
      header: 'الإجراءات',
      cell: (row: ProductResponse) => (
        <div className="flex justify-center gap-3 text-gray-400">
          <button
            onClick={() => onViewBatches?.(row)}
            className="hover:text-blue-600 transition-colors"
            title="عرض الدفعات"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => onEdit?.(row)}
            className="hover:text-amber-500 transition-colors"
            title="تعديل"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete?.(row)}
            className="hover:text-red-500 transition-colors"
            title="حذف"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data?.items || []}
      isLoading={isLoading}
      pageIndex={data?.pageNumber || pageIndex}
      totalPages={data?.totalPages || 1}
      totalCount={data?.totalCount || 0}
      pageSize={10}
      onNextPage={onNextPage}
      onPrevPage={onPrevPage}
    />
  );
}
