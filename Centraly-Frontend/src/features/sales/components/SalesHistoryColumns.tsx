import { formatCurrency } from '@/shared/utils/currency';
import { formatDate } from '@/shared/utils/date';
import { CornerUpLeft } from 'lucide-react';
import { SaleType, PaymentMethod, SalesInvoiceResponse } from '../schemas/salesSchemas';

export const getSalesHistoryColumns = (onReturnClick: (invoiceNumber: string) => void) => [
  {
    header: 'رقم الفاتورة',
    cell: (row: SalesInvoiceResponse) => (
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
          {row.invoiceNumber}
        </span>
        {row.hasReturns && (
          <span className="px-2 py-1 text-[10px] font-bold bg-red-100 text-red-600 rounded-full" title="يوجد مرتجعات على هذه الفاتورة">
            يوجد مرتجع
          </span>
        )}
      </div>
    ),
  },
  {
    header: 'العميل',
    cell: (row: SalesInvoiceResponse) => (
      <div className="flex flex-col">
        <span className="font-bold text-gray-800">{row.customer?.name || 'عميل نقدي (بدون اسم)'}</span>
        {row.customer?.phone && <span className="text-xs text-gray-500">{row.customer.phone}</span>}
      </div>
    ),
  },
  {
    header: 'تاريخ الفاتورة',
    cell: (row: SalesInvoiceResponse) => formatDate(row.createdAt),
  },
  {
    header: 'نوع الفاتورة',
    cell: (row: SalesInvoiceResponse) => {
      const isWholesale = row.saleType === SaleType.Wholesale;
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${isWholesale ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
          {isWholesale ? 'جملة' : 'قطاعي'}
        </span>
      );
    },
  },
  {
    header: 'طريقة الدفع',
    cell: (row: SalesInvoiceResponse) => {
      const isCash = row.paymentMethod === PaymentMethod.Cash;
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${isCash ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
          {isCash ? 'كاش (نقدي)' : 'آجل (ذمة)'}
        </span>
      );
    },
  },
  {
    header: 'الإجمالي',
    cell: (row: SalesInvoiceResponse) => (
      <span className="font-bold text-gray-900" dir="ltr">{formatCurrency(row.totalAmount)}</span>
    ),
  },
  {
    header: 'الإجراءات',
    cell: (row: SalesInvoiceResponse) => (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onReturnClick(row.invoiceNumber);
        }}
        className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors font-medium text-sm border border-red-200"
        title="إرجاع الفاتورة"
      >
        <CornerUpLeft size={16} />
        <span>إرجاع</span>
      </button>
    ),
  },
];
