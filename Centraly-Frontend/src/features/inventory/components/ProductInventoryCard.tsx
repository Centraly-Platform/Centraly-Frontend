import { Package } from 'lucide-react';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';

interface ProductInventoryCardProps {
  product: ProductResponse;
}

export function ProductInventoryCard({ product }: ProductInventoryCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">حالة المخزون</h2>
      
      <div className="flex flex-col gap-4">
        <div className={`p-4 rounded-lg border ${product.isOutOfStock ? 'bg-red-50 border-red-200' : product.isLowStock ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
          <p className={`text-sm ${product.isOutOfStock ? 'text-red-600' : product.isLowStock ? 'text-amber-600' : 'text-emerald-600'} mb-1`}>الكمية الكلية المتوفرة</p>
          <p className={`text-3xl font-bold ${product.isOutOfStock ? 'text-red-700' : product.isLowStock ? 'text-amber-700' : 'text-emerald-700'}`}>
            {product.totalQuantity} <span className="text-lg font-normal">قطعة</span>
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 mb-1">حد تنبيه النواقص</p>
            <p className="text-xl font-bold text-gray-800">{product.minQuantityAlert}</p>
          </div>
          <div className="text-gray-300">
            <Package size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}
