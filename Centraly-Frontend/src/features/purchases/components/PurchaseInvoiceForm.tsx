import { formatCurrency } from '@/shared/utils/currency';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPurchaseInvoiceSchema, CreatePurchaseInvoiceRequest } from '../schemas/purchaseSchemas';
import { tokens } from '@/shared/styles/tokens';
import { useSuppliers } from '@/features/suppliers/hooks/useSuppliers';
import { ProductSearchDropdown } from './ProductSearchDropdown';
import { Trash2 } from 'lucide-react';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';

interface PurchaseInvoiceFormProps {
  onSubmit: (data: CreatePurchaseInvoiceRequest) => void;
  isSubmitting?: boolean;
}

export function PurchaseInvoiceForm({ onSubmit, isSubmitting }: PurchaseInvoiceFormProps) {
  const { data: suppliersData, isLoading: isLoadingSuppliers } = useSuppliers({ pageNumber: 1, pageSize: 500 });
  const suppliers = suppliersData?.items || [];

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreatePurchaseInvoiceRequest>({
    resolver: zodResolver(createPurchaseInvoiceSchema),
    defaultValues: {
      supplierId: '',
      paidAmount: 0,
      notes: '',
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // Watch items to calculate totals
  const watchItems = watch('items');
  const watchPaidAmount = watch('paidAmount');
  
  const totalInvoice = watchItems.reduce((acc, item) => acc + ((item.quantity || 0) * (item.unitCost || 0)), 0);
  const remaining = totalInvoice - (watchPaidAmount || 0);

  const handleAddProduct = (product: ProductResponse) => {
    // Check if already added
    const exists = fields.find(f => f.productId === product.productId);
    if (exists) {
      // Just ignore or show a toast
      return;
    }
    append({
      productId: product.productId,
      productName: product.name,
      quantity: 1,
      unitCost: 0,
      wholesalePrice: 0,
      retailPrice: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className={`${tokens.card} p-6 bg-white space-y-4`}>
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">البيانات الأساسية</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`${tokens.font.label} mb-2 block`}>المورد <span className="text-red-500">*</span></label>
            <select
              {...register('supplierId')}
              className={tokens.input}
              disabled={isLoadingSuppliers}
            >
              <option value="">-- اختر المورد --</option>
              {suppliers.map(s => (
                <option key={s.supplierId} value={s.supplierId}>{s.name}</option>
              ))}
            </select>
            {errors.supplierId && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.supplierId.message}</p>}
          </div>

          <div>
            <label className={`${tokens.font.label} mb-2 block`}>بحث وإضافة منتج للفاتورة</label>
            <ProductSearchDropdown onSelect={handleAddProduct} />
          </div>
        </div>
      </div>

      <div className={`${tokens.card} bg-white overflow-hidden`}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-800">أصناف الفاتورة</h3>
          <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            عدد الأصناف: {fields.length}
          </span>
        </div>

        {errors.items?.message && (
          <div className="p-4 text-red-500 text-sm font-bold bg-red-50">
            {errors.items.message}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-white border-b text-gray-500">
              <tr>
                <th className="px-4 py-3">المنتج</th>
                <th className="px-4 py-3 w-32">الكمية</th>
                <th className="px-4 py-3 w-32">تكلفة الوحدة (الشراء)</th>
                <th className="px-4 py-3 w-32">سعر الجملة الجديد</th>
                <th className="px-4 py-3 w-32">سعر التجزئة الجديد</th>
                <th className="px-4 py-3 w-32">الإجمالي</th>
                <th className="px-4 py-3 w-16 text-center">حذف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fields.map((field, index) => {
                const itemQty = watchItems[index]?.quantity || 0;
                const itemCost = watchItems[index]?.unitCost || 0;
                const total = itemQty * itemCost;

                return (
                  <tr key={field.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-800">
                      {field.productName}
                      <input type="hidden" {...register(`items.${index}.productId`)} />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="1"
                        className={`${tokens.input} py-1 px-2 text-center`}
                        {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className={`${tokens.input} py-1 px-2 text-center text-red-600 font-bold`}
                        {...register(`items.${index}.unitCost`, { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className={`${tokens.input} py-1 px-2 text-center`}
                        {...register(`items.${index}.wholesalePrice`, { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className={`${tokens.input} py-1 px-2 text-center`}
                        {...register(`items.${index}.retailPrice`, { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-900" dir="ltr">
                      {formatCurrency(total)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-400 hover:text-red-600 p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {fields.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400 font-medium">
                    قم بالبحث عن منتجات وإضافتها للفاتورة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${tokens.card} p-6 bg-white`}>
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
          <div className="w-full md:w-1/2 space-y-4">
            <div>
              <label className={`${tokens.font.label} mb-2 block`}>ملاحظات الفاتورة</label>
              <textarea
                {...register('notes')}
                rows={3}
                className={tokens.input}
                placeholder="أي ملاحظات إضافية على الفاتورة..."
              />
            </div>
            <div>
              <label className={`${tokens.font.label} mb-2 block`}>المبلغ المدفوع (سداد نقدي من الخزينة)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className={`${tokens.input} text-xl font-bold text-green-700`}
                {...register('paidAmount', { valueAsNumber: true })}
              />
              <p className="text-xs text-gray-500 mt-1">اتركه 0 إذا كانت الفاتورة آجلة بالكامل.</p>
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col gap-4">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">إجمالي الفاتورة:</span>
              <span className="font-bold text-gray-900">
                {formatCurrency(totalInvoice)}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg text-green-700">
              <span>المدفوع:</span>
              <span className="font-bold">
                {formatCurrency(watchPaidAmount || 0)}
              </span>
            </div>
            <div className="h-px bg-gray-300 w-full" />
            <div className="flex justify-between items-center text-xl">
              <span className="text-gray-800 font-bold">المتبقي للمورد:</span>
              <span className={`font-bold ${remaining > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                {formatCurrency(remaining)}
              </span>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || fields.length === 0}
              className={`${tokens.btn.primary} w-full py-3 mt-2 text-lg disabled:opacity-50`}
            >
              {isSubmitting ? 'جاري الحفظ...' : 'حفظ الفاتورة'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
