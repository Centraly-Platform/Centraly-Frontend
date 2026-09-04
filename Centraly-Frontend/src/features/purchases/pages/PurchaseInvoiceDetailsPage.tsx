import { useParams, useNavigate } from 'react-router-dom';
import { usePurchaseInvoice } from '../hooks/usePurchases';
import { Printer, AlertCircle, Package, ShoppingCart, CheckCircle, Clock, Building2, ChevronLeft } from 'lucide-react';
import { tokens } from '@/shared/styles/tokens';
import { formatCurrency } from '@/shared/utils/currency';
import { useHeaderStore } from '@/shared/hooks/useHeaderStore';
import { BackButton } from '@/shared/components/ui/BackButton';
import { Spinner } from '@/shared/components/ui/Spinner';
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
    return (
      <div className="p-6 h-screen bg-gray-50">
        <BackButton to="/purchases/history" label="رجوع للسجل" />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Spinner size={40} className="mx-auto mb-3" />
            <p className="text-gray-500">جاري تحميل تفاصيل الفاتورة...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <AlertCircle size={48} className="text-red-400" />
        <p className="text-gray-500">الفاتورة غير موجودة أو حدث خطأ أثناء التحميل.</p>
        <button className={tokens.btn.primary} onClick={() => navigate('/purchases/history')}>
          العودة لسجل المشتريات
        </button>
      </div>
    );
  }

  const isPaid = invoice.remainingAmount <= 0;

  return (
    <div className="space-y-5 max-w-5xl mx-auto">

      {/* Top bar: date + status + print */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-gray-500 text-sm">
            {new Intl.DateTimeFormat('ar-EG', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(invoice.invoiceDate))}
          </span>
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
            isPaid ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
          }`}>
            {isPaid
              ? <><CheckCircle size={13} /> مدفوعة بالكامل</>
              : <><Clock size={13} /> متبقي دفع</>
            }
          </span>
        </div>
        <button
          className={`${tokens.btn.secondary} flex items-center gap-2`}
          onClick={() => window.print()}
        >
          <Printer size={16} />
          <span>طباعة</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Supplier - clickable */}
        <div
          className={`${tokens.card} p-4 md:col-span-1 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group`}
          onClick={() => invoice.supplier?.id && navigate(`/contacts/suppliers/${invoice.supplier.id}`)}
        >
          <p className="text-xs text-gray-500 mb-2">المورد</p>
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
              <Building2 size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {invoice.supplier?.name || '-'}
              </p>
              {invoice.supplier?.phone && (
                <p className="text-xs text-gray-400 mt-0.5">{invoice.supplier.phone}</p>
              )}
            </div>
            <ChevronLeft size={14} className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0" />
          </div>
        </div>

        {/* Total */}
        <div className={`${tokens.card} p-4`}>
          <p className="text-xs text-gray-500 mb-1">إجمالي الفاتورة</p>
          <p className="text-base font-bold text-gray-900">{formatCurrency(invoice.totalAmount)}</p>
        </div>

        {/* Paid */}
        <div className={`${tokens.card} p-4`}>
          <p className="text-xs text-gray-500 mb-1">المبلغ المدفوع</p>
          <p className="text-base font-bold text-green-600">{formatCurrency(invoice.paidAmount)}</p>
        </div>

        {/* Remaining */}
        <div className={`${tokens.card} p-4`}>
          <p className="text-xs text-gray-500 mb-1">المتبقي للمورد</p>
          <p className={`text-base font-bold ${invoice.remainingAmount > 0 ? 'text-red-600' : 'text-gray-400'}`}>
            {formatCurrency(invoice.remainingAmount)}
          </p>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className={`${tokens.card} p-4 border-r-4 border-blue-400 bg-blue-50`}>
          <p className="text-xs text-blue-600 font-semibold mb-1">ملاحظات الفاتورة</p>
          <p className="text-gray-700 text-sm">{invoice.notes}</p>
        </div>
      )}

      {/* Items Table */}
      <div className={tokens.card}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-800">
            الأصناف
            <span className="mr-2 text-sm font-normal text-gray-400">({invoice.items?.length || 0} صنف)</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="px-5 py-3 font-semibold">الصنف</th>
                <th className="px-5 py-3 font-semibold text-center">الكمية</th>
                <th className="px-5 py-3 font-semibold text-center">سعر الشراء (للوحدة)</th>
                <th className="px-5 py-3 font-semibold text-left">الإجمالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoice.items?.map((item, index) => (
                <tr key={item.purchaseInvoiceItemId ?? index} className="hover:bg-gray-50 transition-colors">
                  {/* Product info */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {item.product?.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name ?? ''}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                          <Package size={18} />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">{item.product?.name || 'â€”'}</p>
                        {item.product?.barcode && (
                          <p className="text-xs text-gray-400 dir-ltr mt-0.5">{item.product.barcode}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 font-bold text-sm px-2.5 py-0.5 rounded-full">
                      <ShoppingCart size={12} />
                      {item.quantity}
                    </span>
                  </td>

                  {/* Unit cost (purchase price) */}
                  <td className="px-5 py-4 text-center text-gray-700 font-medium">
                    {formatCurrency(item.unitCost)}
                  </td>

                  {/* Line total */}
                  <td className="px-5 py-4 text-left font-bold text-gray-900">
                    {formatCurrency(item.lineTotal)}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Footer row */}
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td colSpan={3} className="px-5 py-3 text-left text-sm font-semibold text-gray-600">
                  الإجمالي الكلي للفاتورة
                </td>
                <td className="px-5 py-3 text-left font-bold text-lg text-gray-900">
                  {formatCurrency(invoice.totalAmount)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
}


