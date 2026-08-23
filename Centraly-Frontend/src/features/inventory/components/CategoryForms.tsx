import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { tokens } from '@/shared/styles/tokens';
import { DepartmentResponse } from '@/features/inventory/schemas/inventorySchemas';

export const createDepartmentSchema = z.object({
  name: z.string().min(1, "اسم القسم مطلوب"),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, "اسم القسم الفرعي مطلوب"),
  departmentId: z.string().min(1, "القسم الرئيسي مطلوب"),
});

interface DepartmentFormProps {
  form: UseFormReturn<z.infer<typeof createDepartmentSchema>>;
  onSubmit: (data: z.infer<typeof createDepartmentSchema>) => void;
}

export function DepartmentForm({ form, onSubmit }: DepartmentFormProps) {
  return (
    <form id="dep-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={tokens.font.label}>اسم القسم الرئيسي <span className="text-red-500">*</span></label>
        <input
          type="text"
          {...form.register('name')}
          className={`mt-1 block w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${form.formState.errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {form.formState.errors.name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>}
      </div>
    </form>
  );
}

interface CategoryFormProps {
  form: UseFormReturn<z.infer<typeof createCategorySchema>>;
  departments: DepartmentResponse[];
  onSubmit: (data: z.infer<typeof createCategorySchema>) => void;
}

export function CategoryForm({ form, departments, onSubmit }: CategoryFormProps) {
  return (
    <form id="cat-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={tokens.font.label}>القسم الرئيسي <span className="text-red-500">*</span></label>
        <select
          {...form.register('departmentId')}
          className={`mt-1 block w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white ${form.formState.errors.departmentId ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">-- اختر القسم الرئيسي --</option>
          {departments.map(d => (
            <option key={d.departmentId} value={d.departmentId}>{d.name}</option>
          ))}
        </select>
        {form.formState.errors.departmentId && <p className="text-red-500 text-xs mt-1">{form.formState.errors.departmentId.message}</p>}
      </div>
      <div>
        <label className={tokens.font.label}>اسم القسم الفرعي <span className="text-red-500">*</span></label>
        <input
          type="text"
          {...form.register('name')}
          className={`mt-1 block w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${form.formState.errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {form.formState.errors.name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>}
      </div>
    </form>
  );
}
