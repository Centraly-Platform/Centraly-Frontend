import { useFormContext, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/shared/utils/currency';
import { tokens } from '@/shared/styles/tokens';
import { CreatePurchaseInvoiceRequest } from '../../schemas/purchaseSchemas';
import { ProductPickerModal } from '../ProductPickerModal';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';
import { ClearablePriceInput } from '@/shared/components/ui/ClearablePriceInput';

export function PurchaseInvoiceItemsTable() {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<CreatePurchaseInvoiceRequest>();
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchItems = watch('items');

  const handleAddProducts = (products: ProductResponse[]) => {
    const existingIds = new Set(fields.map((f) => f.productId));

    products.forEach((product) => {
      if (existingIds.has(product.productId)) return;
      append({
        productId: product.productId,
        productName: product.name,
        quantity: 1,
        unitCost: 0,
        wholesalePrice: 0,
        retailPrice: 0,
      });
    });
  };

  return (
    <>
      <div className={`${tokens.card} bg-white overflow-hidden`}>
        <div className="p-4 border-b border-[var(--color-border)] flex flex-wrap justify-between items-center gap-3 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-[var(--color-text-main)]">أصناف الفاتورة</h3>
            <span className={`${tokens.badge.indigo}`}>
              عدد الأصناف: {fields.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            className={`${tokens.btn.primary} flex items-center gap-2`}
          >
            <Plus size={16} />
            إضافة منتجات
          </button>
        </div>

        {errors.items?.message && (
          <div className="p-4 text-red-500 text-sm font-bold bg-red-50">
            {errors.items.message}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-white border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
              <tr>
                <th className="px-4 py-3">المنتج</th>
                <th className="px-4 py-3 w-32">الكمية</th>
                <th className="px-4 py-3 w-36">تكلفة الوحدة (الشراء)</th>
                <th className="px-4 py-3 w-36">سعر الجملة الجديد</th>
                <th className="px-4 py-3 w-36">سعر التجزئة الجديد</th>
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
                    <td className="px-4 py-3 font-bold text-[var(--color-text-main)]">
                      {field.productName}
                      <input type="hidden" {...register(`items.${index}.productId`)} />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="1"
                        step="1"
                        className={`${tokens.input} py-1 px-2 text-center w-20`}
                        {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                        onFocus={(e) => e.target.select()}
                        onBlur={(e) => {
                          if (!e.target.value || Number(e.target.value) < 1) {
                            setValue(`items.${index}.quantity`, 1, { shouldValidate: true });
                          }
                        }}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <ClearablePriceInput
                        registration={register(`items.${index}.unitCost`, { valueAsNumber: true })}
                        setValue={setValue}
                        name={`items.${index}.unitCost`}
                        currentValue={watchItems[index]?.unitCost}
                        className={`${tokens.input} py-1 px-2 text-center text-red-600 font-bold`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <ClearablePriceInput
                        registration={register(`items.${index}.wholesalePrice`, { valueAsNumber: true })}
                        setValue={setValue}
                        name={`items.${index}.wholesalePrice`}
                        currentValue={watchItems[index]?.wholesalePrice}
                        className={`${tokens.input} py-1 px-2 text-center`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <ClearablePriceInput
                        registration={register(`items.${index}.retailPrice`, { valueAsNumber: true })}
                        setValue={setValue}
                        name={`items.${index}.retailPrice`}
                        currentValue={watchItems[index]?.retailPrice}
                        className={`${tokens.input} py-1 px-2 text-center`}
                      />
                    </td>
                    <td className="px-4 py-3 font-bold text-[var(--color-text-main)]" dir="ltr">
                      {formatCurrency(total)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-400 hover:text-red-600 p-1"
                        aria-label={`حذف ${field.productName}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {fields.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[var(--color-text-muted)] font-medium">
                    اضغط «إضافة منتجات» لاختيار أصناف الفاتورة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isPickerOpen && (
        <ProductPickerModal
          isOpen={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
          onAdd={handleAddProducts}
          excludeProductIds={fields.map((f) => f.productId)}
        />
      )}
    </>
  );
}
