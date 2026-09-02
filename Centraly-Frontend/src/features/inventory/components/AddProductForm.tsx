import { useForm, useWatch, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { useDepartments, useCategories } from '@/features/inventory/hooks/useInventory';
import { tokens } from '@/shared/styles/tokens';
import { Plus, Trash2 } from 'lucide-react';
import { ProductResponse, createProductSchema } from '../schemas/inventorySchemas';

type ProductFormValues = z.infer<typeof createProductSchema>;

interface AddProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  isSubmitting: boolean;
  initialData?: ProductResponse;
}

export function AddProductForm({ onSubmit, initialData, isSubmitting: _ }: AddProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      barcode: initialData.barcode || '',
      categoryId: initialData.category?.categoryId || '',
      departmentId: initialData.department?.departmentId || '',
      minQuantityAlert: initialData.minQuantityAlert,
      storageLocation: initialData.storageLocation || '',
      usage: initialData.usage || 3,
      propertiesList: Object.entries(initialData.properties || {}).map(([key, value]) => ({ key, value: value as string }))
    } : { minQuantityAlert: 5, categoryId: '', departmentId: '', usage: 3, propertiesList: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'propertiesList'
  });

  // Watch departmentId to fetch related categories
  const selectedDepartmentId = useWatch({ control, name: 'departmentId' });
  const { data: categoriesData } = useCategories(selectedDepartmentId || undefined);
  const categories = categoriesData?.items || [];
  
  const { data: departmentsData } = useDepartments();
  const departments = departmentsData?.items || [];

  return (
    <form id="add-product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Product Name */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬ <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('name')}
          placeholder="Ù…Ø«Ø§Ù„: Ù„Ø§Ø¨ØªÙˆØ¨ Ø¯ÙŠÙ„ XPS"
          className={tokens.input}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>
        )}
      </div>

      {/* Barcode */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>Ø§Ù„Ø¨Ø§Ø±ÙƒÙˆØ¯</label>
        <div className="flex gap-2">
          <input
            type="text"
            {...register('barcode')}
            placeholder="Ø§Ø¯Ø®Ù„ Ø§Ù„Ø¨Ø§Ø±ÙƒÙˆØ¯ Ø£Ùˆ Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„Ù‚Ø§Ø±Ø¦"
            className={tokens.input}
          />
          <button 
            type="button" 
            className={tokens.btn.ghost}
            onClick={() => {
              const randomBarcode = Math.floor(100000000000 + Math.random() * 900000000000).toString();
              setValue('barcode', randomBarcode, { shouldValidate: true });
            }}
          >
            ØªÙˆÙ„ÙŠØ¯
          </button>
        </div>
        {errors.barcode && <p className={"text-xs text-[var(--color-danger)]"}>{String(errors.barcode.message)}</p>}
      </div>

      {/* Department Select */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          Ø§Ù„Ù‚Ø³Ù… Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ <span className="text-red-500">*</span>
        </label>
        <select className={tokens.input} {...register('departmentId')} onChange={(e) => {
          register('departmentId').onChange(e);
          setValue('categoryId', ''); // Reset child when parent changes
        }}>
          <option value="">Ø§Ø®ØªØ± Ø§Ù„Ù‚Ø³Ù… Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ...</option>
          {departments?.map((dep) => (
            <option key={dep.departmentId} value={dep.departmentId}>
              {dep.name}
            </option>
          ))}
        </select>
        {errors.departmentId && <p className="text-red-500 text-xs mt-1">{String(errors.departmentId.message)}</p>}
      </div>

      {/* Category Select */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>Ø§Ù„Ù‚Ø³Ù… Ø§Ù„ÙØ±Ø¹ÙŠ</label>
        <select className={tokens.input} {...register('categoryId')} disabled={!selectedDepartmentId}>
          <option value="">Ø§Ø®ØªØ± Ø§Ù„Ù‚Ø³Ù… Ø§Ù„ÙØ±Ø¹ÙŠ...</option>
          {categories?.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500 text-xs mt-1">{String(errors.categoryId.message)}</p>
        )}
      </div>

      {/* Usage Select */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          Ù†ÙˆØ¹ Ø§Ù„Ù…Ù†ØªØ¬ (Usage) <span className="text-red-500">*</span>
        </label>
        <select className={tokens.input} {...register('usage')}>
          <option value="3">Ø¨ÙŠØ¹ Ø£Ùˆ ØµÙŠØ§Ù†Ø©</option>
          <option value="1">Ø¨ÙŠØ¹ ÙÙ‚Ø·</option>
          <option value="2">ØµÙŠØ§Ù†Ø© ÙÙ‚Ø· (Ù‚Ø·Ø¹ ØºÙŠØ§Ø± Ø¯Ø§Ø®Ù„ÙŠØ©)</option>
        </select>
        {errors.usage && (
          <p className="text-red-500 text-xs mt-1">{String(errors.usage.message)}</p>
        )}
      </div>

      {/* Min Quantity Alert */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          Ø­Ø¯ ØªÙ†Ø¨ÙŠÙ‡ Ø§Ù„ÙƒÙ…ÙŠØ© (Min Quantity Alert) <span className="text-red-500">*</span>
        </label>
        <input type="number" {...register('minQuantityAlert')} className={tokens.input} />
        <p className={tokens.font.helperText + " mt-1"}>
          Ø³ÙŠØªÙ… ØªÙ†Ø¨ÙŠÙ‡Ùƒ Ø¹Ù†Ø¯Ù…Ø§ ØªØµÙ„ ÙƒÙ…ÙŠØ© Ù‡Ø°Ø§ Ø§Ù„Ù…Ù†ØªØ¬ Ø¥Ù„Ù‰ Ù‡Ø°Ø§ Ø§Ù„Ø±Ù‚Ù…
        </p>
      </div>

      {/* Storage Location */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>Ù…ÙƒØ§Ù† Ø§Ù„ØªØ®Ø²ÙŠÙ† (Storage Location)</label>
        <input
          type="text"
          {...register('storageLocation')}
          placeholder="Ù…Ø«Ø§Ù„: Ø§Ù„Ø±Ù A1"
          className={tokens.input}
        />
      </div>

      {/* Properties (Dictionary) */}
      <div className="pt-2 border-t border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <label className={tokens.font.label}>Ø®ØµØ§Ø¦Øµ Ø¥Ø¶Ø§ÙÙŠØ© (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)</label>
          <button
            type="button"
            onClick={() => append({ key: '', value: '' })}
            className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md"
          >
            <Plus size={14} /> Ø¥Ø¶Ø§ÙØ© Ø®Ø§ØµÙŠØ©
          </button>
        </div>

        {fields.length > 0 ? (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                <div className="flex-1">
                  <input
                    {...register(`propertiesList.${index}.key`)}
                    placeholder="Ø§Ù„Ø®Ø§ØµÙŠØ© (Ù…Ø«Ø§Ù„: Ø§Ù„Ù„ÙˆÙ†)"
                    className={tokens.input}
                  />
                  {errors.propertiesList?.[index]?.key && (
                    <p className="text-red-500 text-xs mt-1">{String(errors.propertiesList[index].key?.message)}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    {...register(`propertiesList.${index}.value`)}
                    placeholder="Ø§Ù„Ù‚ÙŠÙ…Ø© (Ù…Ø«Ø§Ù„: Ø£Ø­Ù…Ø±)"
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
          <p className="text-xs text-gray-400">Ù„Ø§ ØªÙˆØ¬Ø¯ Ø®ØµØ§Ø¦Øµ Ù…Ø¶Ø§ÙØ©. ÙŠÙ…ÙƒÙ†Ùƒ Ø¥Ø¶Ø§ÙØ© ØªÙØ§ØµÙŠÙ„ Ù…Ø«Ù„ Ø§Ù„Ù„ÙˆÙ†ØŒ Ø§Ù„Ù…Ù‚Ø§Ø³ØŒ Ø¥Ù„Ø®.</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>ØµÙˆØ±Ø© Ø§Ù„Ù…Ù†ØªØ¬</label>
        <input
          type="file"
          accept="image/*"
          className={tokens.input}
          name="image"
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

