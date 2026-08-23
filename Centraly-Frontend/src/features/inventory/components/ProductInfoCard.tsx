import { Package, Tag, Layers, Archive, Calendar, AlignLeft, Hash } from 'lucide-react';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';

interface ProductInfoCardProps {
  product: ProductResponse;
}

export function ProductInfoCard({ product }: ProductInfoCardProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <AlignLeft size={20} className="text-blue-500" /> المعلومات الأساسية
        </h2>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="shrink-0 flex flex-col items-center gap-3">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-40 h-40 rounded-xl object-cover border-4 border-white shadow-md" 
              />
            ) : (
              <div className="w-40 h-40 rounded-xl bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200 text-gray-400 shadow-sm">
                <Package size={48} strokeWidth={1} />
              </div>
            )}
            <div className="bg-gray-100 px-3 py-1.5 rounded text-xs font-mono font-bold text-gray-600 flex items-center gap-1 border border-gray-200">
              <Hash size={14}/> {product.barcode || 'بدون باركود'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 grow">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Layers size={16} />
                </div>
                <p className="text-sm font-semibold">القسم الرئيسي</p>
              </div>
              <p className="text-lg font-bold text-gray-800 pr-10">{product.department?.name || '---'}</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
                  <Tag size={16} />
                </div>
                <p className="text-sm font-semibold">القسم الفرعي</p>
              </div>
              <p className="text-lg font-bold text-gray-800 pr-10">{product.category?.name || '---'}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <Archive size={16} />
                </div>
                <p className="text-sm font-semibold">موقع التخزين</p>
              </div>
              <p className="text-lg font-bold text-gray-800 pr-10">{product.storageLocation || 'غير محدد'}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Calendar size={16} />
                </div>
                <p className="text-sm font-semibold">تاريخ الإضافة</p>
              </div>
              <p className="text-lg font-bold text-gray-800 pr-10">
                {new Date(product.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Custom Properties */}
        {product.properties && Object.keys(product.properties).length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Tag size={16} className="text-gray-400" /> خصائص إضافية
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(product.properties).map(([key, value]) => (
                <div key={key} className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 mb-1">{key}</p>
                  <p className="font-bold text-gray-900">{value as string}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
