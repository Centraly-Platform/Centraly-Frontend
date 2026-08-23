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
  onEdit?: (product: ProductResponse) => void;
  onDelete?: (product: ProductResponse) => void;
  onRowClick?: (product: ProductResponse) => void;
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
  onDelete,
  onRowClick,
}: ProductsTableProps) {
  const columns = [
    {
      header: 'المنتج',
      cell: (row: ProductResponse) => (
        <div className="flex items-center gap-3">
          {row.imageUrl ? (
            <img src={row.imageUrl} alt={row.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400 text-xs font-bold">
              {row.name ? row.name.charAt(0).toUpperCase() : '?'}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{row.name}</span>
            <span className="text-xs text-gray-500">{row.barcode || 'بدون باركود'}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'سعر البيع',
      cell: (row: ProductResponse) => {
        // Get retail price from the latest/first batch if available
        const latestBatch = row.batches?.[0];
        const price = latestBatch ? latestBatch.retailPrice : 0;
        return <span className="font-semibold text-emerald-600">{price.toFixed(2)} ج.م</span>;
      },
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
      header: 'الكمية والمخزون',
      cell: (row: ProductResponse) => (
        <div className="flex flex-col gap-1 items-start">
          <ProductStatusBadge quantity={row.totalQuantity} reorderLevel={row.minQuantityAlert} />
          {row.storageLocation && (
            <span className="text-xs text-gray-400">المكان: {row.storageLocation}</span>
          )}
        </div>
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
            className="hover:text-red-500 transition-colors"
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
