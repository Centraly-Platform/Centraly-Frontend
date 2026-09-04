import { useState } from 'react';
import { useExpenses } from '../hooks/useFinance';
import { ExpensesTable } from '../components/ExpensesTable';
import { CreateExpenseModal } from '../components/CreateExpenseModal';
import { PageLoader } from '@/shared/components/ui/PageLoader';
import { tokens } from '@/shared/styles/tokens';
import { PlusCircle, ReceiptText } from 'lucide-react';

export function ExpensesPage() {
  const { data: expensesData, isLoading } = useExpenses({ pageNumber: 1, pageSize: 50 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ReceiptText className="w-7 h-7 text-red-600" />
            المصروفات
          </h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1.5 text-sm">
            إدارة وتسجيل مصروفات الفرع
          </p>
        </div>
        <div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className={tokens.btn.primary + " flex items-center gap-2"}
          >
            <PlusCircle className="w-5 h-5" />
            تسجيل مصروف
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">سجل المصروفات</h3>
        <ExpensesTable expenses={expensesData || []} />
      </div>

      {isModalOpen && (
        <CreateExpenseModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
