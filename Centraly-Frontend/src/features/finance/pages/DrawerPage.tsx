import { useState } from 'react';
import { useActiveDrawer } from '../hooks/useFinance';
import { OpenDrawerForm } from '../components/OpenDrawerForm';
import { DrawerTransactionsTable } from '../components/DrawerTransactionsTable';
import { CloseDrawerModal } from '../components/CloseDrawerModal';
import { ManualTransactionModal } from '../components/ManualTransactionModal';
import { PageLoader } from '@/shared/components/ui/PageLoader';
import { tokens } from '@/shared/styles/tokens';
import { formatCurrency } from '@/shared/utils/currency';
import { formatDate } from '@/shared/utils/date';
import { PlusCircle, Wallet, ArrowUpRight, ArrowDownRight, Clock, History } from 'lucide-react';
import { DrawerTransactionResponse } from '../schemas/financeSchemas';
import { Link } from 'react-router-dom';

export function DrawerPage() {
  const { data: session, isLoading } = useActiveDrawer();
  
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isManualTxModalOpen, setIsManualTxModalOpen] = useState(false);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!session) {
    return <OpenDrawerForm />;
  }

  const runningIncome = session.transactions.filter((t: DrawerTransactionResponse) => t.type === 1).reduce((acc: number, t: DrawerTransactionResponse) => acc + t.amount, 0);
  const runningExpense = session.transactions.filter((t: DrawerTransactionResponse) => t.type === 2).reduce((acc: number, t: DrawerTransactionResponse) => acc + t.amount, 0);
  const currentBalance = session.openingBalance + runningIncome - runningExpense;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Wallet className="w-7 h-7 text-blue-600" />
            الوردية الحالية
          </h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1.5 text-sm">
            <Clock className="w-4 h-4" /> تم فتح الوردية: {formatDate(session.openedAt)}
          </p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/finance/drawer/history"
            className={tokens.btn.ghost + " flex items-center gap-2 text-gray-600"}
          >
            <History className="w-5 h-5" />
            سجل الورديات
          </Link>
          <button 
            onClick={() => setIsManualTxModalOpen(true)}
            className={tokens.btn.secondary + " flex items-center gap-2"}
          >
            <PlusCircle className="w-5 h-5" />
            تسجيل حركة يدوية
          </button>
          <button 
            onClick={() => setIsCloseModalOpen(true)}
            className={tokens.btn.primary + " bg-red-600 hover:bg-red-700 ring-red-500"}
          >
            إغلاق الوردية
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="text-gray-500 text-sm mb-1">الرصيد الافتتاحي</div>
          <div className="text-2xl font-bold text-gray-800" dir="ltr">{formatCurrency(session.openingBalance)}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-full -z-10"></div>
          <div className="text-green-700 text-sm mb-1 flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" />
            إجمالي الداخل
          </div>
          <div className="text-2xl font-bold text-green-700" dir="ltr">+{formatCurrency(runningIncome)}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full -z-10"></div>
          <div className="text-red-700 text-sm mb-1 flex items-center gap-1">
            <ArrowDownRight className="w-4 h-4" />
            إجمالي الخارج
          </div>
          <div className="text-2xl font-bold text-red-700" dir="ltr">-{formatCurrency(runningExpense)}</div>
        </div>
        <div className="bg-blue-600 p-5 rounded-xl shadow-md text-white">
          <div className="text-blue-100 text-sm mb-1">الرصيد الفعلي المتوقع الآن</div>
          <div className="text-2xl font-bold" dir="ltr">{formatCurrency(currentBalance)}</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">سجل الحركات</h3>
        <DrawerTransactionsTable transactions={session.transactions} />
      </div>

      {isCloseModalOpen && (
        <CloseDrawerModal 
          isOpen={isCloseModalOpen} 
          onClose={() => setIsCloseModalOpen(false)} 
          session={session} 
        />
      )}

      {isManualTxModalOpen && (
        <ManualTransactionModal 
          isOpen={isManualTxModalOpen} 
          onClose={() => setIsManualTxModalOpen(false)} 
        />
      )}
    </div>
  );
}
