import { useState } from 'react';
import { useOwnerTransactions, useCreateOwnerTransaction } from '../hooks/useOwnerTransactions';
import { usePaymentSourcePrompt } from '../hooks/usePaymentSourcePrompt';
import { PageLoader } from '@/shared/components/ui/PageLoader';
import { tokens } from '@/shared/styles/tokens';
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';
import { DataTable } from '@/shared/components/ui/DataTable';
import { BaseModal } from '@/shared/components/ui/BaseModal';
import { OwnerTransactionResponse } from '../schemas/financeSchemas';

export function OwnerTransactionsPage() {
  const { data: transactions, isLoading } = useOwnerTransactions();
  const { mutate: createTransaction, isPending: isSubmitting } = useCreateOwnerTransaction();
  const { promptPaymentSource, PaymentSourcePromptModal } = usePaymentSourcePrompt();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'Deposit' | 'Withdrawal' | null;
  }>({ isOpen: false, type: null });

  const [amount, setAmount] = useState<number | ''>('');
  const [notes, setNotes] = useState('');

  if (isLoading) return <PageLoader />;

  const handleOpenModal = (type: 'Deposit' | 'Withdrawal') => {
    setModalState({ isOpen: true, type });
    setAmount('');
    setNotes('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    const category = modalState.type === 'Deposit' ? 10 : 11;
    const source = await promptPaymentSource(category);

    if (source) {
      createTransaction(
        {
          category,
          amount: Number(amount),
          notes,
          paymentSource: source,
        },
        {
          onSuccess: () => {
            setModalState({ isOpen: false, type: null });
          },
        }
      );
    }
  };

  const columns = [
    {
      header: 'النوع',
      cell: (row: OwnerTransactionResponse) => (
        <span className={row.category === 10 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
          {row.category === 10 ? 'إيداع رأس مال' : 'سحب أرباح'}
        </span>
      ),
    },
    {
      header: 'المبلغ',
      cell: (row: OwnerTransactionResponse) => (
        <span dir="ltr" className="font-semibold text-gray-800 inline-block">
          {row.amount.toLocaleString()} د.ع
        </span>
      ),
    },
    {
      header: 'المصدر',
      cell: (row: OwnerTransactionResponse) => (
        <span className="text-gray-600 text-sm">
          {row.paymentSource === 1 ? 'الدرج' : 'الخزينة'}
        </span>
      ),
    },
    {
      header: 'التاريخ',
      cell: (row: OwnerTransactionResponse) => (
        <span className="text-gray-600 text-sm">
          {new Date(row.createdAt).toLocaleString('ar-IQ')}
        </span>
      ),
    },
    {
      header: 'ملاحظات',
      cell: (row: OwnerTransactionResponse) => (
        <span className="text-gray-500 text-sm">
          {row.notes || '-'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Wallet className="w-7 h-7 text-indigo-600" />
            معاملات المالك
          </h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1.5 text-sm">
            إدارة إيداع رأس المال وسحب الأرباح
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleOpenModal('Deposit')}
            className={tokens.btn.primary + " flex items-center gap-2 bg-green-600 hover:bg-green-700"}
          >
            <ArrowDownCircle className="w-5 h-5" />
            إيداع رأس مال
          </button>
          <button 
            onClick={() => handleOpenModal('Withdrawal')}
            className={tokens.btn.primary + " flex items-center gap-2 bg-red-600 hover:bg-red-700"}
          >
            <ArrowUpCircle className="w-5 h-5" />
            سحب أرباح
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">سجل المعاملات</h3>
        <DataTable
          columns={columns}
          data={transactions || []}
          pageIndex={1}
          totalPages={1}
          totalCount={transactions?.length || 0}
          pageSize={transactions?.length || 50}
          onNextPage={() => {}}
          onPrevPage={() => {}}
        />
      </div>

      <PaymentSourcePromptModal />

      <BaseModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, type: null })}
        title={modalState.type === 'Deposit' ? 'إيداع رأس مال جديد' : 'سحب أرباح'}
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">المبلغ</label>
            <input
              type="number"
              required
              min="0.01"
              step="any"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className={tokens.input.base}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات (اختياري)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={tokens.input.base}
              rows={3}
              placeholder="أدخل أي ملاحظات هنا..."
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={isSubmitting} className={`${tokens.btn.primary} flex-1`}>
              {isSubmitting ? 'جاري الحفظ...' : 'تأكيد'}
            </button>
            <button 
              type="button" 
              onClick={() => setModalState({ isOpen: false, type: null })}
              className={`${tokens.btn.ghost} flex-1`}
            >
              إلغاء
            </button>
          </div>
        </form>
      </BaseModal>
    </div>
  );
}
