import { useForm, useFieldArray, UseFormRegisterReturn, UseFormSetValue, FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/shared/utils/currency';
import { tokens } from '@/shared/styles/tokens';
import { useSuppliers } from '@/features/suppliers/hooks/useSuppliers';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';
import { createPurchaseInvoiceSchema, CreatePurchaseInvoiceRequest } from '../schemas/purchaseSchemas';
import { ProductPickerModal } from './ProductPickerModal';

interface PurchaseInvoiceFormProps {
  onSubmit: (data: CreatePurchaseInvoiceRequest) => void;
  isSubmitting?: boolean;
}

/** Clears default 0 on focus so the user can type a clean price; restores 0 if left empty. */
function ClearablePriceInput({
  registration,
  setValue,
  name,
  currentValue,
  className,
}: {
  registration: UseFormRegisterReturn;
  setValue: UseFormSetValue<CreatePurchaseInvoiceRequest>;
  name: FieldPath<CreatePurchaseInvoiceRequest>;
  currentValue: number | undefined;
  className?: string;
}) {
  const { onBlur, onChange, ...rest } = registration;

  return (
    <input
      type="number"
      min="0"
      step="0.01"
      className={className}
      {...rest}
      onChange={onChange}
      onFocus={(e) => {
        if (currentValue === 0 || e.target.value === '0') {
          setValue(name, '' as unknown as number, { shouldDirty: true });
        } else {
          e.target.select();
        }
      }}
      onBlur={(e) => {
        onBlur(e);
        if (e.target.value === '' || Number.isNaN(e.target.valueAsNumber)) {
          setValue(name, 0, { shouldValidate: true });
        }
      }}
    />
  );
}

export function PurchaseInvoiceForm({ onSubmit, isSubmitting }: PurchaseInvoiceFormProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { data: suppliersData, isLoading: isLoadingSuppliers } = useSuppliers({ pageNumber: 1, pageSize: 500 });
  const suppliers = suppliersData?.items || [];

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
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

  const watchItems = watch('items');
  const watchPaidAmount = watch('paidAmount');

  const totalInvoice = watchItems.reduce(
    (acc, item) => acc + ((item.quantity || 0) * (item.unitCost || 0)),
    0
  );
  const remaining = totalInvoice - (watchPaidAmount || 0);

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className={`${tokens.card} p-6 bg-white space-y-4`}>
          <h3 className="text-lg font-bold text-[var(--color-text-main)] border-b border-[var(--color-border)] pb-2">
            البيانات الأساسية
          </h3>

          <div>
            <label className={`${tokens.font.label} mb-2 block`}>
              المورد <span className="text-red-500">*</span>
            </label>
            <select
              {...register('supplierId')}
              className={`${tokens.select} max-w-md`}
              disabled={isLoadingSuppliers}
            >
              <option value="">-- اختر المورد --</option>
              {suppliers.map((s) => (
                <option key={s.supplierId} value={s.supplierId}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.supplierId && (
              <p className="text-red-500 text-xs mt-1 font-semibold">{errors.supplierId.message}</p>
            )}
          </div>
        </div>

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
                          className={`${tokens.input} py-1 px-2 text-center`}
                          {...register(`items.${index}.quantity`, { valueAsNumber: true })}
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
                <label className={`${tokens.font.label} mb-2 block`}>
                  المبلغ المدفوع (سداد نقدي من الخزينة)
                </label>
                <ClearablePriceInput
                  registration={register('paidAmount', { valueAsNumber: true })}
                  setValue={setValue}
                  name="paidAmount"
                  currentValue={watchPaidAmount}
                  className={`${tokens.input} text-xl font-bold text-green-700`}
                />
                <p className={`${tokens.font.helperText} mt-1`}>
                  اتركه 0 إذا كانت الفاتورة آجلة بالكامل.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-xl border border-[var(--color-border)] flex flex-col gap-4">
              <div className="flex justify-between items-center text-lg">
                <span className="text-[var(--color-text-muted)]">إجمالي الفاتورة:</span>
                <span className="font-bold text-[var(--color-text-main)]">
                  {formatCurrency(totalInvoice)}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg text-green-700">
                <span>المدفوع:</span>
                <span className="font-bold">{formatCurrency(watchPaidAmount || 0)}</span>
              </div>
              <div className="h-px bg-gray-300 w-full" />
              <div className="flex justify-between items-center text-xl">
                <span className="text-[var(--color-text-main)] font-bold">المتبقي للمورد:</span>
                <span className={`font-bold ${remaining > 0 ? 'text-red-600' : 'text-[var(--color-text-main)]'}`}>
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
