import { formatCurrency } from '@/shared/utils/currency';
import { formatDate } from '@/shared/utils/date';
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
      header: 'Ø§Ù„Ù†ÙˆØ¹',
      cell: (row: OwnerTransactionResponse) => (
        <span className={row.category === 10 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
          {row.category === 10 ? 'Ø¥ÙŠØ¯Ø§Ø¹ Ø±Ø£Ø³ Ù…Ø§Ù„' : 'Ø³Ø­Ø¨ Ø£Ø±Ø¨Ø§Ø­'}
        </span>
      ),
    },
    {
      header: 'Ø§Ù„Ù…Ø¨Ù„Øº',
      cell: (row: OwnerTransactionResponse) => (
        <span dir="ltr" className="font-semibold text-gray-800 inline-block">
          {formatCurrency(row.amount)}
        </span>
      ),
    },
    {
      header: 'Ø§Ù„Ù…ØµØ¯Ø±',
      cell: (row: OwnerTransactionResponse) => (
        <span className="text-gray-600 text-sm">
          {row.paymentSource === 1 ? 'Ø§Ù„Ø¯Ø±Ø¬' : 'Ø§Ù„Ø®Ø²ÙŠÙ†Ø©'}
        </span>
      ),
    },
    {
      header: 'Ø§Ù„ØªØ§Ø±ÙŠØ®',
      cell: (row: OwnerTransactionResponse) => (
        <span className="text-gray-600 text-sm">
          {formatDate(row.createdAt)}
        </span>
      ),
    },
    {
      header: 'Ù…Ù„Ø§Ø­Ø¸Ø§Øª',
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
            Ù…Ø¹Ø§Ù…Ù„Ø§Øª Ø§Ù„Ù…Ø§Ù„Ùƒ
          </h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1.5 text-sm">
            Ø¥Ø¯Ø§Ø±Ø© Ø¥ÙŠØ¯Ø§Ø¹ Ø±Ø£Ø³ Ø§Ù„Ù…Ø§Ù„ ÙˆØ³Ø­Ø¨ Ø§Ù„Ø£Ø±Ø¨Ø§Ø­
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleOpenModal('Deposit')}
            className={tokens.btn.primary + " flex items-center gap-2 bg-green-600 hover:bg-green-700"}
          >
            <ArrowDownCircle className="w-5 h-5" />
            Ø¥ÙŠØ¯Ø§Ø¹ Ø±Ø£Ø³ Ù…Ø§Ù„
          </button>
          <button 
            onClick={() => handleOpenModal('Withdrawal')}
            className={tokens.btn.primary + " flex items-center gap-2 bg-red-600 hover:bg-red-700"}
          >
            <ArrowUpCircle className="w-5 h-5" />
            Ø³Ø­Ø¨ Ø£Ø±Ø¨Ø§Ø­
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Ø³Ø¬Ù„ Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª</h3>
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
        title={modalState.type === 'Deposit' ? 'Ø¥ÙŠØ¯Ø§Ø¹ Ø±Ø£Ø³ Ù…Ø§Ù„ Ø¬Ø¯ÙŠØ¯' : 'Ø³Ø­Ø¨ Ø£Ø±Ø¨Ø§Ø­'}
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ø§Ù„Ù…Ø¨Ù„Øº</label>
            <input
              type="number"
              required
              min="0.01"
              step="any"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className={tokens.input}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ù…Ù„Ø§Ø­Ø¸Ø§Øª (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={tokens.input}
              rows={3}
              placeholder="Ø£Ø¯Ø®Ù„ Ø£ÙŠ Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ù‡Ù†Ø§..."
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={isSubmitting} className={`${tokens.btn.primary} flex-1`}>
              {isSubmitting ? 'Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø­ÙØ¸...' : 'ØªØ£ÙƒÙŠØ¯'}
            </button>
            <button 
              type="button" 
              onClick={() => setModalState({ isOpen: false, type: null })}
              className={`${tokens.btn.ghost} flex-1`}
            >
              Ø¥Ù„ØºØ§Ø¡
            </button>
          </div>
        </form>
      </BaseModal>
    </div>
  );
}




