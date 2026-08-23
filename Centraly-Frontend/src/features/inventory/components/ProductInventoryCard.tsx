import { Package, BellRing, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';

interface ProductInventoryCardProps {
  product: ProductResponse;
}

export function ProductInventoryCard({ product }: ProductInventoryCardProps) {
  const isOutOfStock = product.totalQuantity === 0;
  const isLowStock = !isOutOfStock && product.totalQuantity <= product.minQuantityAlert;

  const getStatusConfig = () => {
    if (isOutOfStock) return {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      label: 'text-red-600',
      icon: <AlertTriangle size={24} className="text-red-500" />,
      title: 'نفد المخزون'
    };
    if (isLowStock) return {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      label: 'text-amber-600',
      icon: <AlertTriangle size={24} className="text-amber-500" />,
      title: 'مخزون منخفض'
    };
    return {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      label: 'text-emerald-600',
      icon: <CheckCircle2 size={24} className="text-emerald-500" />,
      title: 'مخزون كافٍ'
    };
  };

  const config = getStatusConfig();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Package size={20} className="text-indigo-500" /> حالة المخزون
        </h2>
      </div>
      
      <div className="p-6 flex flex-col gap-6 flex-grow justify-center">
        <div className={`p-6 rounded-xl border-2 flex items-center justify-between ${config.bg} ${config.border}`}>
          <div>
            <p className={`text-sm font-bold mb-1 ${config.label}`}>الكمية الإجمالية المتوفرة</p>
            <p className={`text-4xl font-black ${config.text}`}>
              {product.totalQuantity} <span className="text-lg font-bold opacity-75">قطعة</span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            {config.icon}
            <span className={`text-xs font-bold ${config.label}`}>{config.title}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
              <BellRing size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-600 mb-0.5">حد التنبيه للمخزون</p>
              <p className="text-xs text-gray-400">نقطة إعادة الطلب</p>
            </div>
          </div>
          <div className="text-2xl font-black text-gray-800 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
            {product.minQuantityAlert}
          </div>
        </div>
      </div>
    </div>
  );
}
