import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCustomer, useCustomerStatement, useAddCustomerPayment } from '../hooks/useContacts';
import { formatCurrency } from '@/shared/utils/currency';
import { useHeaderStore } from '@/shared/hooks/useHeaderStore';
import { RightDrawer } from '@/shared/components/ui/RightDrawer';
import { DataTable } from '@/shared/components/ui/DataTable';
import { InvoiceDetailsModal } from '@/features/sales/components/InvoiceDetailsModal';
import { usePaymentSourcePrompt } from '@/features/finance/hooks/usePaymentSourcePrompt';
import { ArrowDownLeft, ArrowUpRight, Wallet, ReceiptText, Calendar } from 'lucide-react';
import { tokens } from '@/shared/styles/tokens';
import { toast } from 'sonner';
import { CustomerStatementResponse } from '../schemas/contactSchemas';

export function CustomerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { setTitle, setBackButton } = useHeaderStore();

  const [pageIndex, setPageIndex] = useState(1);
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');
  const [filterType, setFilterType] = useState('الكل');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [isRefund, setIsRefund] = useState(false);

  const { data: customer, isLoading: isLoadingCustomer } = useCustomer(id!);
  const { promptPaymentSource, PaymentSourcePromptModal } = usePaymentSourcePrompt(7); // GlobalTransactionCategory.CustomerPayment
  const { data: statementData, isLoading: isLoadingStatement } = useCustomerStatement(id!);
  const addPayment = useAddCustomerPayment();

  // Client-side pagination and filtering for statement array
  const rawStatementArray = statementData || [];
  const statementArray = rawStatementArray.filter(item => {
    if (filterType === 'الكل') return true;
    if (filterType === 'فاتورة') return item.transactionType === 'Invoice' || item.transactionType === 'فاتورة';
    if (filterType === 'مرتجع') return item.transactionType === 'Return' || item.transactionType === 'مرتجع';
    if (filterType === 'سداد مديونية') return item.transactionType === 'Payment' || item.transactionType === 'دفعة';
    return true;
  });
  const pageSize = 10;
  const totalCount = statementArray.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const paginatedStatement = statementArray.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

  useEffect(() => {
    if (customer) {
      setTitle(`كشف حساب: ${customer.name}`);
      setBackButton(true, '/contacts/customers');
    }
  }, [customer, setTitle, setBackButton]);

  if (isLoadingCustomer) {
    return <div className="p-8 text-center text-gray-500">جاري تحميل بيانات العميل...</div>;
  }

  if (!customer) {
    return <div className="p-8 text-center text-red-500">العميل غير موجود.</div>;
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('المبلغ غير صحيح');
      return;
    }
    
    const source = await promptPaymentSource(isRefund ? 8 : 7);
    if (!source) return; // User canceled the prompt

    addPayment.mutate(
      { id: id!, data: { amount, notes: paymentNotes, paymentSource: source, isRefund } },
      {
        onSuccess: () => {
          setIsPaymentDrawerOpen(false);
          setPaymentAmount('');
          setPaymentNotes('');
        }
      }
    );
  };

  const columns = [
    {
      header: 'التاريخ',
      cell: (row: CustomerStatementResponse) => (
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} />
          {new Date(row.date).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      ),
    },
    {
      header: 'نوع العملية',
      cell: (row: CustomerStatementResponse) => {
        const isInvoice = row.transactionType.includes('Invoice') || row.transactionType === 'فاتورة';
        const isPayment = row.transactionType.includes('Payment') || row.transactionType === 'دفعة';
        const isReturn = row.transactionType.includes('Return') || row.transactionType === 'مرتجع';
        
        if (isInvoice) return (
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 cursor-pointer hover:bg-orange-200 transition-colors">
            فاتورة مبيعات
            <ReceiptText size={12} className="opacity-70" />
          </span>
        );
        if (isPayment) return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">سداد مديونية</span>;
        if (isReturn) return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">مرتجع مبيعات</span>;
        
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">{row.transactionType}</span>;
      },
    },
    {
      header: 'البيان',
      cell: (row: CustomerStatementResponse) => (
        <span className="text-gray-600 max-w-[200px] truncate block" title={row.notes || '-'}>
          {row.notes || '-'}
        </span>
      ),
    },
    {
      header: 'مدين (عليه)',
      cell: (row: CustomerStatementResponse) => row.debit > 0 ? (
        <span className="text-red-600 font-bold flex items-center gap-1" dir="ltr">
          <ArrowUpRight size={16} /> {formatCurrency(row.debit)}
        </span>
      ) : <span className="text-gray-400">-</span>,
    },
    {
      header: 'دائن (له)',
      cell: (row: CustomerStatementResponse) => row.credit > 0 ? (
        <span className="text-green-600 font-bold flex items-center gap-1" dir="ltr">
          <ArrowDownLeft size={16} /> {formatCurrency(row.credit)}
        </span>
      ) : <span className="text-gray-400">-</span>,
    },
    {
      header: 'الرصيد بعد العملية',
      cell: (row: CustomerStatementResponse) => {
        if (row.balanceAfter === 0) return <span className="text-gray-500 font-bold">0 ج.م</span>;
        if (row.balanceAfter > 0) return <span className="text-red-600 font-bold" dir="ltr">{formatCurrency(row.balanceAfter)}</span>;
        return <span className="text-green-600 font-bold" dir="ltr">{formatCurrency(Math.abs(row.balanceAfter))} (مقدم)</span>;
      },
    }
  ];

  const currentBalance = customer.debtBalance || 0;

  return (
    <div className="space-y-6">
      
      {/* Customer Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{customer.name}</h2>
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            {customer.phone && <p>الهاتف: <span className="font-semibold">{customer.phone}</span></p>}
          </div>
        </div>

        <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">الرصيد الحالي</p>
            <div className="text-2xl font-bold" dir="ltr">
              {currentBalance === 0 ? (
                <span className="text-gray-600">0.00 ج.م</span>
              ) : currentBalance > 0 ? (
                <span className="text-red-600">عليه {formatCurrency(currentBalance)}</span>
              ) : (
                <span className="text-green-600">له {formatCurrency(Math.abs(currentBalance))}</span>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsPaymentDrawerOpen(true)}
            className="flex items-center gap-2 bg-[#0f8e4c] hover:bg-[#0c7a40] text-white px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20"
          >
            <Wallet size={20} />
            تسديد دفعة
          </button>
        </div>
      </div>

      {/* Statement Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <ReceiptText className="text-gray-500" />
            حركة الحساب (كشف الحساب)
          </h3>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setPageIndex(1);
            }}
            className={tokens.select}
          >
            <option value="الكل">جميع العمليات</option>
            <option value="فاتورة">فاتورة مبيعات</option>
            <option value="مرتجع">مرتجع مبيعات</option>
            <option value="سداد مديونية">سداد مديونية</option>
          </select>
        </div>
        
        <div className="p-5">
          <DataTable
            columns={columns}
            data={paginatedStatement}
            isLoading={isLoadingStatement}
            pageIndex={pageIndex}
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={pageSize}
            onNextPage={() => setPageIndex(p => Math.min(p + 1, totalPages))}
            onPrevPage={() => setPageIndex(p => Math.max(p - 1, 1))}
            onRowClick={(row) => {
              if (row.transactionType === 'Invoice' || row.transactionType === 'فاتورة') {
                setSelectedInvoiceId(row.transactionId);
              }
            }}
          />
        </div>
      </div>

      <InvoiceDetailsModal
        isOpen={!!selectedInvoiceId}
        onClose={() => setSelectedInvoiceId(null)}
        invoiceId={selectedInvoiceId}
      />

      {/* Add Payment Drawer */}
      <RightDrawer
        isOpen={isPaymentDrawerOpen}
        onClose={() => setIsPaymentDrawerOpen(false)}
        title="استلام دفعة من العميل"
        footer={
          <>
            <button type="button" onClick={() => setIsPaymentDrawerOpen(false)} className={tokens.btn.secondary}>
              إلغاء
            </button>
            <button
              type="submit"
              form="payment-form"
              disabled={addPayment.isPending}
              className="bg-[#0f8e4c] hover:bg-[#0c7a40] text-white px-6 py-2.5 rounded-lg font-bold transition-colors disabled:opacity-60 shadow-md"
            >
              {addPayment.isPending ? 'جاري الحفظ...' : 'حفظ واستلام'}
            </button>
          </>
        }
      >
        <form id="payment-form" onSubmit={handlePaymentSubmit} className="space-y-6">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${!isRefund ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
              onClick={() => setIsRefund(false)}
            >
              تحصيل (سداد مديونية)
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${isRefund ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
              onClick={() => setIsRefund(true)}
            >
              رد أموال للعميل
            </button>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <p className="text-sm font-semibold text-orange-800 mb-1">المديونية الحالية</p>
            <p className="text-2xl font-bold text-orange-900" dir="ltr">{formatCurrency(currentBalance)}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              المبلغ المستلم <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className={tokens.input + ' pl-12 py-3 text-lg font-bold text-left'}
                placeholder="0.00"
                required
                dir="ltr"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">ج.م</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              البيان / ملاحظات
            </label>
            <textarea
              value={paymentNotes}
              onChange={(e) => setPaymentNotes(e.target.value)}
              className={tokens.input + ' py-3'}
              rows={3}
              placeholder="مثال: دفعة نقدية من الحساب"
            />
          </div>
        </form>
      </RightDrawer>
      <PaymentSourcePromptModal />
    </div>
  );
}
