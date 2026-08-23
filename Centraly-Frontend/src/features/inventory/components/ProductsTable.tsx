import { Trash2 } from 'lucide-react';
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
  onDelete?: (product: ProductResponse) => void;
  onRowClick?: (product: ProductResponse) => void;
}

/**
 * Products table — defines columns and delegates rendering to the shared DataTable.
 */
export function ProductsTable({
  data,
  isLoading,
  pageIndex,
  onNextPage,
  onPrevPage,
  onDelete,
  onRowClick,
}: ProductsTableProps) {
  const columns = [
    {
      header: 'الصورة',
      cell: (row: ProductResponse) => (
        <div className="flex items-center">
          {row.imageUrl ? (
            <img src={row.imageUrl} alt={row.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400 text-xs font-bold">
              {row.name ? row.name.charAt(0).toUpperCase() : '?'}
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'اسم المنتج',
      cell: (row: ProductResponse) => (
        <span className="font-semibold text-gray-900">{row.name}</span>
      ),
    },
    {
      header: 'الباركود',
      cell: (row: ProductResponse) => (
        <span className="text-gray-600 font-mono text-sm">{row.barcode || '---'}</span>
      ),
    },
    {
      header: 'القسم',
      cell: (row: ProductResponse) => (
        <div className="flex flex-col gap-1 items-start">
          <span className={tokens.badge.indigo}>{row.category?.name || '---'}</span>
          {row.department?.name && (
            <span className="text-xs text-gray-500">{row.department.name}</span>
          )}
        </div>
      ),
    },
    {
      header: 'الكمية',
      cell: (row: ProductResponse) => (
        <span className="font-semibold text-gray-800">{row.totalQuantity}</span>
      ),
    },
    {
      header: 'موقع التخزين',
      cell: (row: ProductResponse) => (
        <span className="text-gray-600 text-sm">{row.storageLocation || '---'}</span>
      ),
    },
    {
      header: 'حالة المخزون',
      cell: (row: ProductResponse) => (
        <ProductStatusBadge quantity={row.totalQuantity} reorderLevel={row.minQuantityAlert} />
      ),
    },
    {
      header: 'الإجراءات',
      cell: (row: ProductResponse) => (
        <div className="flex justify-center gap-3 text-gray-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(row);
            }}
            className="hover:text-red-500 transition-colors p-1"
            title="حذف"
            aria-label="حذف المنتج"
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
      onRowClick={onRowClick}
    />
  );
}
