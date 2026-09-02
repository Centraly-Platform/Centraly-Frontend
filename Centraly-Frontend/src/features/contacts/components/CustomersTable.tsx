import { CustomerResponse } from '../schemas/contactSchemas';
import { PaginatedList } from '@/shared/types/pagination';
import { DataTable } from '@/shared/components/ui/DataTable';
import { formatCurrency } from '@/shared/utils/currency';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { HasPermission } from '@/features/auth/components/HasPermission';
import { Permissions } from '@/features/auth/schemas/permissions';

interface CustomersTableProps {
  data?: PaginatedList<CustomerResponse>;
  isLoading: boolean;
  pageIndex: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onEdit: (customer: CustomerResponse) => void;
  onDelete: (customer: CustomerResponse) => void;
  onRowClick: (customer: CustomerResponse) => void;
}

export function CustomersTable({
  data,
  isLoading,
  pageIndex,
  onNextPage,
  onPrevPage,
  onEdit,
  onDelete,
  onRowClick
}: CustomersTableProps) {
  const columns = [
    {
      header: 'Ø§Ø³Ù… Ø§Ù„Ø¹Ù…ÙŠÙ„',
      cell: (row: CustomerResponse) => (
        <span className="font-bold text-gray-800">{row.name}</span>
      ),
    },
    {
      header: 'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ',
      cell: (row: CustomerResponse) => row.phone || <span className="text-gray-400">-</span>,
    },
    {
      header: 'Ø§Ù„Ù…Ø¯ÙŠÙˆÙ†ÙŠØ© (Ø§Ù„Ø±ØµÙŠØ¯)',
      cell: (row: CustomerResponse) => {
        const balance = row.debtBalance || 0;
        if (balance === 0) return <span className="text-gray-500 font-medium">0 Ø¬.Ù…</span>;
        if (balance > 0) return <span className="text-red-600 font-bold" dir="ltr">{formatCurrency(balance)}</span>; // owes us
        return <span className="text-green-600 font-bold" dir="ltr">{formatCurrency(Math.abs(balance))} (Ù…Ù‚Ø¯Ù…)</span>; // we owe them
      },
    },
    {
      header: 'ØªØ§Ø±ÙŠØ® Ø§Ù„Ø¥Ø¶Ø§ÙØ©',
      cell: (row: CustomerResponse) => new Date(row.createdAt).toLocaleDateString('ar-EG'),
    },
    {
      header: 'Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª',
      cell: (row: CustomerResponse) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => onRowClick(row)}
            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="ÙƒØ´Ù Ø­Ø³Ø§Ø¨ / Ø§Ù„ØªÙØ§ØµÙŠÙ„"
            aria-label="ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø¹Ù…ÙŠÙ„"
          >
            <Eye size={18} />
          </button>
          <HasPermission permission={Permissions.CustomersWrite}>
            <button
              type="button"
              onClick={() => onEdit(row)}
              className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
              title="ØªØ¹Ø¯ÙŠÙ„"
              aria-label="ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ø¹Ù…ÙŠÙ„"
            >
              <Edit2 size={18} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(row)}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Ø­Ø°Ù"
              aria-label="Ø­Ø°Ù Ø§Ù„Ø¹Ù…ÙŠÙ„"
            >
              <Trash2 size={18} />
            </button>
          </HasPermission>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data?.items || []}
      isLoading={isLoading}
      pageIndex={pageIndex}
      totalPages={data?.totalPages || 1}
      totalCount={data?.totalCount || 0}
      pageSize={data?.pageSize || 10}
      onNextPage={onNextPage}
      onPrevPage={onPrevPage}
      onRowClick={onRowClick}
    />
  );
}

