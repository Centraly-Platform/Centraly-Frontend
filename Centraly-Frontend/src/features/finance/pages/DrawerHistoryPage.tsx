import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrawerHistory } from '../hooks/useFinance';
import { FinanceFilters } from '../schemas/financeSchemas';
import { PageLoader } from '@/shared/components/ui/PageLoader';
import { DataTable } from '@/shared/components/ui/DataTable';
import { formatCurrency } from '@/shared/utils/currency';
import { formatDate } from '@/shared/utils/date';
import { Wallet, CheckCircle } from 'lucide-react';

export function DrawerHistoryPage() {
  const [filters, setFilters] = useState<FinanceFilters>({ pageNumber: 1, pageSize: 50 });
  const navigate = useNavigate();
  
  const { data: pagedData, isLoading } = useDrawerHistory(filters);

  if (isLoading) {
    return <PageLoader />;
  }

  const sessions = pagedData?.items || [];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-3 items-center">
        <Wallet className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">سجل الورديات</h1>
          <p className="text-gray-500 mt-1 text-sm">عرض الورديات السابقة وتفاصيلها المالية</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <DataTable
          data={sessions}
          columns={[
            {
              header: 'الحالة',
              cell: (item: any) => item.isClosed ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700">
                  <CheckCircle className="w-4 h-4" /> مغلقة
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium bg-green-100 text-green-700">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> جارية الآن
                </span>
              )
            },
            {
              header: 'وقت الفتح',
              cell: (item: any) => <span dir="ltr">{formatDate(item.openedAt)}</span>
            },
            {
              header: 'وقت الإغلاق',
              cell: (item: any) => item.closedAt ? <span dir="ltr">{formatDate(item.closedAt)}</span> : '-'
            },
            {
              header: 'الرصيد الافتتاحي',
              cell: (item: any) => <span dir="ltr" className="font-medium text-gray-700">{formatCurrency(item.openingBalance)}</span>
            },
            {
              header: 'إجمالي المبيعات/الداخل',
              cell: (item: any) => <span dir="ltr" className="font-semibold text-green-600">+{formatCurrency(item.totalIncome || 0)}</span>
            },
            {
              header: 'الرصيد النهائي للصندوق',
              cell: (item: any) => <span dir="ltr" className="font-bold text-blue-700">{formatCurrency(item.closingBalance || 0)}</span>
            }
          ]}
          isLoading={isLoading}
          totalCount={pagedData?.totalCount || 0}
          pageSize={filters.pageSize || 50}
          pageIndex={filters.pageNumber || 1}
          totalPages={pagedData?.totalPages || 1}
          onNextPage={() => setFilters(prev => ({ ...prev, pageNumber: (prev.pageNumber || 1) + 1 }))}
          onPrevPage={() => setFilters(prev => ({ ...prev, pageNumber: Math.max((prev.pageNumber || 1) - 1, 1) }))}
          onRowClick={(row: any) => navigate(`/finance/drawer/history/${row.id}`)}
        />
      </div>
    </div>
  );
}
