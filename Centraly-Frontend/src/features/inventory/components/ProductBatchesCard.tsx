import { Calendar, Truck, Package, Plus, MoreHorizontal } from 'lucide-react';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';

interface ProductBatchesCardProps {
  product: ProductResponse;
}

export function ProductBatchesCard({ product }: ProductBatchesCardProps) {
  const batches = product.batches || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Package size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">الدفعات (Batches)</h2>
            <p className="text-sm text-gray-500 mt-1">تفاصيل الكميات والأسعار من الموردين</p>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-700">
          إجمالي الدفعات: {batches.length}
        </div>
      </div>
      
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-right border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-white border-b border-gray-100 text-gray-500 text-sm">
              <th className="px-6 py-4 font-bold w-1/4">المورد</th>
              <th className="px-6 py-4 font-bold">تاريخ الاستلام</th>
              <th className="px-6 py-4 font-bold text-center">الكمية المتاحة</th>
              <th className="px-6 py-4 font-bold text-left">سعر الشراء</th>
              <th className="px-6 py-4 font-bold text-left">سعر الجملة</th>
              <th className="px-6 py-4 font-bold text-left">سعر التجزئة</th>
              <th className="px-6 py-4 font-bold text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {batches.length > 0 ? (
              batches.map((batch) => (
                <tr key={batch.batchId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Truck size={18} className="text-gray-400" />
                      <span className="font-bold text-gray-900">{batch.supplierName || '---'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="font-semibold text-gray-800">
                        {new Date(batch.dateReceived).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-100 text-sm">
                      {batch.availableQuantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left font-mono font-bold text-gray-800">
                    <div className="flex items-center justify-end gap-1">
                      {batch.purchasePrice.toLocaleString()} <span className="text-gray-400 text-sm">$</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left font-mono font-bold text-amber-600">
                    <div className="flex items-center justify-end gap-1">
                      {batch.wholesalePrice.toLocaleString()} <span className="text-amber-400 text-sm">$</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left font-mono font-bold text-emerald-600 text-lg">
                    <div className="flex items-center justify-end gap-1">
                      {batch.retailPrice.toLocaleString()} <span className="text-emerald-400 text-sm">$</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-500">
                  لا يوجد دفعات مسجلة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-white border-t border-gray-100">
        <button className="w-full py-3 flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl font-bold transition-colors">
          <Plus size={18} />
          إضافة دفعة جديدة
        </button>
      </div>
    </div>
  );
}
