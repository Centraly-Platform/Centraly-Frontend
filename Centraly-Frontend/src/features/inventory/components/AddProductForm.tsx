import { useForm, useWatch, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { createProductSchema, CategoryResponse } from '@/features/inventory/schemas/inventorySchemas';
import { useDepartments } from '@/features/inventory/hooks/useInventory';
import { tokens } from '@/shared/styles/tokens';
import { Plus, Trash2 } from 'lucide-react';

type ProductFormValues = z.infer<typeof createProductSchema>;

interface AddProductFormProps {
  categories?: CategoryResponse[];
  onSubmit: (data: ProductFormValues) => void;
  isSubmitting: boolean;
}

export function AddProductForm({ categories, onSubmit, isSubmitting: _ }: AddProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: { minQuantityAlert: 5, categoryId: '', departmentId: '', propertiesList: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'propertiesList'
  });

  // Watch categoryId to fetch related departments
  const selectedCategoryId = useWatch({ control, name: 'categoryId' });
  const { data: departmentsData } = useDepartments(selectedCategoryId || undefined);
  const departments = departmentsData?.items || [];

  return (
    <form id="add-product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Product Name */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          اسم المنتج <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('name')}
          placeholder="مثال: لابتوب ديل XPS"
          className={tokens.input}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>
        )}
      </div>

      {/* Barcode */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>الباركود</label>
        <div className="flex gap-2">
          <input
            type="text"
            {...register('barcode')}
            placeholder="ادخل الباركود أو استخدم القارئ"
            className={tokens.input}
          />
          <button type="button" className={tokens.btn.ghost}>
            توليد
          </button>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          القسم الرئيسي <span className="text-red-500">*</span>
        </label>
        <select {...register('categoryId')} className={tokens.select}>
          <option value="">اختر القسم</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500 text-xs mt-1">{String(errors.categoryId.message)}</p>
        )}
      </div>

      {/* Department */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          القسم الفرعي <span className="text-red-500">*</span>
        </label>
        <select {...register('departmentId')} className={tokens.select} disabled={!selectedCategoryId}>
          <option value="">اختر القسم الفرعي</option>
          {departments?.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </select>
        {errors.departmentId && (
          <p className="text-red-500 text-xs mt-1">{String(errors.departmentId.message)}</p>
        )}
      </div>

      {/* Min Quantity Alert */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          حد تنبيه الكمية (Min Quantity Alert) <span className="text-red-500">*</span>
        </label>
        <input type="number" {...register('minQuantityAlert')} className={tokens.input} />
        <p className={tokens.font.helperText + " mt-1"}>
          سيتم تنبيهك عندما تصل كمية هذا المنتج إلى هذا الرقم
        </p>
      </div>

      {/* Storage Location */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>مكان التخزين (Storage Location)</label>
        <input
          type="text"
          {...register('storageLocation')}
          placeholder="مثال: الرف A1"
          className={tokens.input}
        />
      </div>

      {/* Properties (Dictionary) */}
      <div className="pt-2 border-t border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <label className={tokens.font.label}>خصائص إضافية (اختياري)</label>
          <button
            type="button"
            onClick={() => append({ key: '', value: '' })}
            className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md"
          >
            <Plus size={14} /> إضافة خاصية
          </button>
        </div>

        {fields.length > 0 ? (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                <div className="flex-1">
                  <input
                    {...register(`propertiesList.${index}.key`)}
                    placeholder="الخاصية (مثال: اللون)"
                    className={tokens.input}
                  />
                  {errors.propertiesList?.[index]?.key && (
                    <p className="text-red-500 text-xs mt-1">{String(errors.propertiesList[index].key?.message)}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    {...register(`propertiesList.${index}.value`)}
                    placeholder="القيمة (مثال: أحمر)"
                    className={tokens.input}
                  />
                  {errors.propertiesList?.[index]?.value && (
                    <p className="text-red-500 text-xs mt-1">{String(errors.propertiesList[index].value?.message)}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">لا توجد خصائص مضافة. يمكنك إضافة تفاصيل مثل اللون، المقاس، إلخ.</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>صورة المنتج</label>
        <input
          type="file"
          accept="image/*"
          className={tokens.input}
          {...register('image')}
          onChange={(e) => {
            const file = e.target.files?.[0];
            setValue('image', file || undefined, { shouldValidate: true });
          }}
        />
        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message as string}</p>}
      </div>
    </form>
  );
}
