import { Calendar, Truck, Package, DollarSign } from 'lucide-react';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';

interface ProductBatchesCardProps {
  product: ProductResponse;
}

export function ProductBatchesCard({ product }: ProductBatchesCardProps) {
  const batches = product.batches || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Package size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">الدفعات المتوفرة (Batches)</h2>
            <p className="text-sm text-gray-500">تفاصيل الكميات والأسعار من الموردين</p>
          </div>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 shadow-sm">
          إجمالي الدفعات: {batches.length}
        </div>
      </div>
      
      <div className="p-0 overflow-x-auto">
        {batches.length > 0 ? (
          <table className="w-full text-right border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-gray-500 text-sm">
                <th className="px-6 py-4 font-semibold w-1/4">المورد</th>
                <th className="px-6 py-4 font-semibold">تاريخ الاستلام</th>
                <th className="px-6 py-4 font-semibold text-center">الكمية المتاحة</th>
                <th className="px-6 py-4 font-semibold text-left">سعر الشراء</th>
                <th className="px-6 py-4 font-semibold text-left">سعر الجملة</th>
                <th className="px-6 py-4 font-semibold text-left">سعر التجزئة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {batches.map((batch) => (
                <tr key={batch.batchId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-gray-400" />
                      <span className="font-bold text-gray-800">{batch.supplierName || '---'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-sm font-medium">
                        {new Date(batch.dateReceived).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-100 text-sm">
                      {batch.availableQuantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left font-mono font-semibold text-gray-700">
                    <div className="flex items-center justify-end gap-1">
                      {batch.purchasePrice.toLocaleString()} <DollarSign size={14} className="text-gray-400"/>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left font-mono font-semibold text-amber-600">
                    <div className="flex items-center justify-end gap-1">
                      {batch.wholesalePrice.toLocaleString()} <DollarSign size={14} className="text-amber-400"/>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left font-mono font-bold text-emerald-600 text-lg">
                    <div className="flex items-center justify-end gap-1">
                      {batch.retailPrice.toLocaleString()} <DollarSign size={14} className="text-emerald-400"/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Package size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-700">لا يوجد دفعات مسجلة</h3>
            <p className="text-gray-500 mt-1">لم يتم استلام أي كميات من الموردين لهذا المنتج بعد.</p>
          </div>
        )}
      </div>
    </div>
  );
}
