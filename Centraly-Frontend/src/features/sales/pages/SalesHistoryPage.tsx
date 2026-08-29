import { useState, useEffect } from 'react';
import { useSalesInvoices } from '../hooks/useSales';
import { DataTable } from '@/shared/components/ui/DataTable';
import { InvoiceDetailsModal } from '../components/InvoiceDetailsModal';
import { getSalesHistoryColumns } from '../components/SalesHistoryColumns';
import { SalesHistorySearchBar } from '../components/SalesHistorySearchBar';
import { useNavigate } from 'react-router-dom';

export function SalesHistoryPage() {
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Simple debounce for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
      setPageIndex(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchValue]);

  const { data, isLoading } = useSalesInvoices({
    pageNumber: pageIndex,
    pageSize,
    searchValue: debouncedSearch,
  });

  const columns = getSalesHistoryColumns((invoiceNumber) => {
    navigate(`/sales/returns/new?invoiceId=${invoiceNumber}`);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Filters and Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Search Bar */}
        <SalesHistorySearchBar 
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {/* Data Table */}
        <div className="p-5">
          <DataTable
            columns={columns}
            data={data?.items || []}
            isLoading={isLoading}
            totalCount={data?.totalCount || 0}
            pageSize={pageSize}
            pageIndex={pageIndex}
            totalPages={data?.totalPages || 1}
            onNextPage={() => setPageIndex(p => Math.min(p + 1, data?.totalPages || 1))}
            onPrevPage={() => setPageIndex(p => Math.max(p - 1, 1))}
            onRowClick={(row) => setSelectedInvoiceId(row.id)}
          />
        </div>
      </div>

      {/* Invoice Details Modal */}
      <InvoiceDetailsModal
        isOpen={!!selectedInvoiceId}
        onClose={() => setSelectedInvoiceId(null)}
        invoiceId={selectedInvoiceId}
      />
    </div>
  );
}
