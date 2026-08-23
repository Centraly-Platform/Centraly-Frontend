import { useParams } from 'react-router-dom';
import { useSupplierDetails, useSupplierStatement } from '../hooks/useSuppliers';
import { SupplierOverviewCard } from '../components/SupplierOverviewCard';
import { SupplierStatementCard } from '../components/SupplierStatementCard';
import { PageLoader } from '@/shared/components/ui/PageLoader';
import { BackButton } from '@/shared/components/ui/BackButton';

export function SupplierDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: supplier, isLoading: isLoadingSupplier, isError } = useSupplierDetails(id!);
  const { data: statement, isLoading: isLoadingStatement } = useSupplierStatement(id!);

  if (isLoadingSupplier) {
    return <PageLoader />;
  }

  if (isError || !supplier) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-gray-500">لم يتم العثور على المورد.</p>
        <BackButton to="/contacts/suppliers" label="العودة للقائمة" />
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BackButton to="/contacts/suppliers" />
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
