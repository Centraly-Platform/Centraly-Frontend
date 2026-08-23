import { Trash2, Edit } from 'lucide-react';
import { DataTable } from '@/shared/components/ui/DataTable';
import { SupplierResponse } from '../schemas/supplierSchemas';
import { PaginatedList } from '@/shared/types/pagination';

interface SuppliersTableProps {
  data?: PaginatedList<SupplierResponse>;
  isLoading: boolean;
  pageIndex: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onEdit?: (supplier: SupplierResponse) => void;
  onDelete?: (supplier: SupplierResponse) => void;
  onRowClick?: (supplier: SupplierResponse) => void;
}

export function SuppliersTable({
  data,
  isLoading,
  pageIndex,
  onNextPage,
  onPrevPage,
  onEdit,
  onDelete,
  onRowClick,
}: SuppliersTableProps) {
  const columns = [
    {
      header: 'اسم المورد',
      cell: (row: SupplierResponse) => (
        <span className="text-base font-bold text-gray-900">{row.name}</span>
      ),
    },
    {
      header: 'الهاتف',
      cell: (row: SupplierResponse) => (
        <span className="text-sm font-semibold text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded border border-gray-100" dir="ltr">
          {row.phone || '---'}
        </span>
      ),
    },
    {
      header: 'الرصيد المستحق',
      cell: (row: SupplierResponse) => (
        <span className={`text-base font-bold ${row.debtBalance > 0 ? 'text-red-600' : row.debtBalance < 0 ? 'text-green-600' : 'text-gray-900'}`}>
          {new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(row.debtBalance)}
        </span>
      ),
    },
    {
      header: 'عدد الفواتير',
      cell: (row: SupplierResponse) => (
        <span className="text-sm font-bold text-gray-800">{row.purchaseInvoicesCount}</span>
      ),
    },
    {
      header: 'عدد المرتجعات',
      cell: (row: SupplierResponse) => (
        <span className="text-sm font-bold text-gray-800">{row.returnsCount}</span>
      ),
    },
    {
      header: 'الإجراءات',
      cell: (row: SupplierResponse) => (
        <div className="flex justify-center gap-3 text-gray-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(row);
            }}
            className="hover:text-blue-500 transition-colors p-2 rounded-lg hover:bg-blue-50"
            title="تعديل"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(row);
            }}
            className="hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
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
      onRowClick={onRowClick}
    />
  );
}
