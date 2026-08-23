import { useParams, useNavigate } from 'react-router-dom';
import { usePurchaseInvoice } from '../hooks/usePurchases';
import { Printer, AlertCircle } from 'lucide-react';
import { tokens } from '@/shared/styles/tokens';
import { formatCurrency } from '@/shared/utils/currency';
import { useHeaderStore } from '@/shared/hooks/useHeaderStore';
import { useEffect } from 'react';

export function PurchaseInvoiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setTitle, setBackButton } = useHeaderStore();

  const { data: invoice, isLoading, error } = usePurchaseInvoice(id!);

  useEffect(() => {
    if (invoice) {
      setTitle(`فاتورة مشتريات #${invoice.invoiceNumber}`);
    } else {
      setTitle('تفاصيل الفاتورة');
    }
    setBackButton(true, "/purchases/history");
  }, [invoice, setTitle, setBackButton]);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">جاري التحميل...</div>;
  }

  if (error || !invoice) {
    return (
      <div className="p-8 text-center text-red-500 flex flex-col items-center">
        <AlertCircle size={48} className="mb-4" />
        <p>حدث خطأ أثناء تحميل تفاصيل الفاتورة أو الفاتورة غير موجودة.</p>
        <button className={`${tokens.btn.primary} mt-4`} onClick={() => navigate('/purchases/history')}>
          العودة לסجل المشتريات
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Actions */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500 font-medium">
          بتاريخ: {new Intl.DateTimeFormat('ar-EG', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(invoice.invoiceDate))}
        </p>
        <button className={`${tokens.btn.secondary} flex items-center gap-2`} onClick={() => window.print()}>
          <Printer size={18} />
          <span>طباعة</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${tokens.card} p-4`}>
          <p className={tokens.font.muted}>المورد</p>
          <p className="text-lg font-bold text-gray-900 mt-1">{invoice.supplier?.name || '-'}</p>
        </div>
        <div className={`${tokens.card} p-4`}>
          <p className={tokens.font.muted}>الإجمالي</p>
          <p className="text-lg font-bold text-gray-900 mt-1">{formatCurrency(invoice.totalAmount)}</p>
        </div>
        <div className={`${tokens.card} p-4`}>
          <p className={tokens.font.muted}>المدفوع</p>
          <p className="text-lg font-bold text-green-600 mt-1">{formatCurrency(invoice.paidAmount)}</p>
        </div>
        <div className={`${tokens.card} p-4`}>
          <p className={tokens.font.muted}>المتبقي</p>
          <p className={`text-lg font-bold mt-1 ${invoice.remainingAmount > 0 ? 'text-red-600' : 'text-gray-900'}`}>
            {formatCurrency(invoice.remainingAmount)}
          </p>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className={`${tokens.card} p-4 bg-gray-50`}>
          <p className={tokens.font.muted}>ملاحظات الفاتورة</p>
          <p className="text-gray-800 mt-1">{invoice.notes}</p>
        </div>
      )}

      {/* Items Table */}
      <div className={tokens.card}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-800">الأصناف ({invoice.items?.length || 0})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold">الصنف</th>
                <th className="px-4 py-3 font-semibold">الكمية</th>
                <th className="px-4 py-3 font-semibold">سعر الوحدة</th>
                <th className="px-4 py-3 font-semibold">الإجمالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoice.items?.map((item) => (
                <tr key={item.invoiceItemId} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">{item.productName}</td>
                  <td className="px-4 py-4">{item.quantity}</td>
                  <td className="px-4 py-4">{formatCurrency(item.unitCost)}</td>
                  <td className="px-4 py-4 font-bold">{formatCurrency(item.totalCost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
