import { useParams, useNavigate } from 'react-router-dom';
import { useSupplierDetails, useSupplierStatement } from '../hooks/useSuppliers';
import { SupplierOverviewCard } from '../components/SupplierOverviewCard';
import { SupplierStatementCard } from '../components/SupplierStatementCard';
import { ArrowRight } from 'lucide-react';
import { PageLoader } from '@/shared/components/ui/PageLoader';

export function SupplierDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: supplier, isLoading: isLoadingSupplier, isError } = useSupplierDetails(id!);
  const { data: statement, isLoading: isLoadingStatement } = useSupplierStatement(id!);

  if (isLoadingSupplier) {
    return <PageLoader />;
  }

  if (isError || !supplier) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-gray-500">لم يتم العثور على المورد.</p>
        <button 
          onClick={() => navigate('/contacts/suppliers')}
          className="text-blue-600 hover:underline"
        >
          العودة للقائمة
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/contacts/suppliers')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="العودة"
        >
          <ArrowRight size={20} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">تفاصيل المورد</h1>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Overview */}
        <SupplierOverviewCard supplier={supplier} />

        {/* Statement / Transactions */}
        <SupplierStatementCard statement={statement} isLoading={isLoadingStatement} />
      </div>
    </div>
  );
}
