import { formatCurrency } from '@/shared/utils/currency';
import { tokens } from '@/shared/styles/tokens';
import { SupplierResponse } from '../schemas/supplierSchemas';
import { Phone, MapPin, Tag } from 'lucide-react';

interface SupplierOverviewCardProps {
  supplier: SupplierResponse;
}

const translateType = (type?: string) => {
  if (!type) return 'غير محدد';
  const map: Record<string, string> = {
    'Wholesale': 'جملة',
    'Retail': 'تجزئة (قطاعي)',
    'Distributor': 'موزع',
    'Company': 'شركة',
    'Individual': 'فرد (شخصي)',
  };
  return map[type] || type;
};

export function SupplierOverviewCard({ supplier }: SupplierOverviewCardProps) {
  // فى حسابات الموردين: 
  // إذا كان الرصيد بالسالب (دائن) يعني أن المورد له فلوس عندنا.
  // إذا كان بالموجب (مدين) يعني أننا دافعين بزيادة أو المورد عليه فلوس لنا.
  const isOwedByUs = supplier.debtBalance < 0; // المورد له فلوس
  const isOwedToUs = supplier.debtBalance > 0; // نحن لنا فلوس

  return (
    <div className={`${tokens.card} p-6 bg-white flex flex-col md:flex-row gap-6 justify-between items-start`}>
      <div className="space-y-4 flex-1">
        <h2 className="text-2xl font-bold text-gray-900">{supplier.name}</h2>
        
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Tag size={18} className="text-gray-400" />
            <span className="text-sm font-medium">النوع:</span>
            <span className="text-sm font-bold text-gray-800">{translateType(supplier.type)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={18} className="text-gray-400" />
            <span className="text-sm font-medium">الهاتف:</span>
            <span className="text-sm font-bold text-gray-800 font-mono" dir="ltr">{supplier.phone || '---'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={18} className="text-gray-400" />
            <span className="text-sm font-medium">العنوان:</span>
            <span className="text-sm font-bold text-gray-800">{supplier.address || '---'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 min-w-[250px]">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center text-center">
          <span className="text-sm text-gray-500 font-medium mb-1">الرصيد الحالي للمورد</span>
          <span className={`text-2xl font-bold ${isOwedByUs ? 'text-red-600' : isOwedToUs ? 'text-green-600' : 'text-gray-900'}`}>
            {formatCurrency(Math.abs(supplier.debtBalance))}
          </span>
          <span className="text-xs text-gray-500 mt-1 font-medium">
            {isOwedByUs ? '(مطلوب سداده للمورد)' : isOwedToUs ? '(دفعنا بزيادة - لنا عند المورد)' : '(الحساب خالص ومُصَفَّر)'}
          </span>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-blue-50/50 rounded-xl p-3 border border-blue-100 text-center">
            <span className="text-xs text-gray-500 block mb-1">فواتير الشراء</span>
            <span className="text-lg font-bold text-blue-700">{supplier.purchaseInvoicesCount}</span>
          </div>
          <div className="flex-1 bg-orange-50/50 rounded-xl p-3 border border-orange-100 text-center">
            <span className="text-xs text-gray-500 block mb-1">المرتجعات</span>
            <span className="text-lg font-bold text-orange-700">{supplier.returnsCount}</span>
          </div>
        </div>
        
        <div className="text-center mt-2">
          <span className="text-xs text-gray-400">تاريخ الإضافة: {new Intl.DateTimeFormat('ar-EG').format(new Date(supplier.createdAt))}</span>
        </div>
      </div>
    </div>
  );
}
