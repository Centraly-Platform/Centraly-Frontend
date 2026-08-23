import { Package, Tag, Layers, Archive, Calendar } from 'lucide-react';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';

interface ProductInfoCardProps {
  product: ProductResponse;
}

export function ProductInfoCard({ product }: ProductInfoCardProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">المعلومات الأساسية</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="shrink-0">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-32 h-32 rounded-xl object-cover border border-gray-200" />
          ) : (
            <div className="w-32 h-32 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400">
              <Package size={48} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 grow">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Tag size={14}/> القسم الرئيسي</p>
            <p className="font-semibold text-gray-800">{product.category?.name || '---'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Layers size={14}/> القسم الفرعي</p>
            <p className="font-semibold text-gray-800">{product.department?.name || '---'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Archive size={14}/> مكان التخزين</p>
            <p className="font-semibold text-gray-800">{product.storageLocation || 'غير محدد'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar size={14}/> تاريخ الإضافة</p>
            <p className="font-semibold text-gray-800">
              {new Date(product.createdAt).toLocaleDateString('ar-EG')}
            </p>
          </div>
        </div>
      </div>

      {/* Custom Properties */}
      {product.properties && Object.keys(product.properties).length > 0 && (
        <div className="mt-8">
          <h3 className="text-md font-bold text-gray-800 mb-4 border-t pt-4">خصائص إضافية</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(product.properties).map(([key, value]) => (
              <div key={key} className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-500 mb-1">{key}</p>
                <p className="font-semibold text-blue-900">{value as string}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
