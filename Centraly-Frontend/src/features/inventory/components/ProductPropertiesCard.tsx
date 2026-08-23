import { Tag, Layers } from 'lucide-react';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';

interface ProductPropertiesCardProps {
  product: ProductResponse;
}

export function ProductPropertiesCard({ product }: ProductPropertiesCardProps) {
  if (!product.properties || Object.keys(product.properties).length === 0) {
    return null; // Don't show section if no properties
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center justify-end gap-3 w-full">
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-900">الخصائص</h2>
            <p className="text-sm text-gray-500 mt-1">المواصفات والخصائص الإضافية للمنتج</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Tag size={24} />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(product.properties).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">{key}</p>
                <p className="text-lg font-bold text-gray-900">{value as string}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <Layers size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
