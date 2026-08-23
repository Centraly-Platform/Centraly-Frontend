import { useState } from 'react';
import { useCategories, useDepartments, useCreateCategory, useCreateDepartment, useDeleteCategory, useDeleteDepartment } from '@/features/inventory/hooks/useInventory';
import { DepartmentResponse, CategoryResponse } from '@/features/inventory/schemas/inventorySchemas';
import { DataTable } from '@/shared/components/ui/DataTable';
import { tokens } from '@/shared/styles/tokens';
import { Plus, Trash2, Layers, Tag } from 'lucide-react';
import { RightDrawer } from '@/shared/components/ui/RightDrawer';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const createDepartmentSchema = z.object({
  name: z.string().min(1, "اسم القسم مطلوب"),
});

const createCategorySchema = z.object({
  name: z.string().min(1, "اسم القسم الفرعي مطلوب"),
  departmentId: z.string().min(1, "القسم الرئيسي مطلوب"),
});

export function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<'departments' | 'categories'>('departments');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Queries
  const { data: departmentsData, isLoading: isLoadingDeps } = useDepartments();
  const { data: categoriesData, isLoading: isLoadingCats } = useCategories();

  // Mutations
  const createDepartment = useCreateDepartment();
  const createCategory = useCreateCategory();
  const deleteDepartment = useDeleteDepartment();
  const deleteCategory = useDeleteCategory();

  // Forms
  const depForm = useForm({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: { name: '' }
  });

  const catForm = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: '', departmentId: '' }
  });

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    depForm.reset();
    catForm.reset();
  };

  const onDepSubmit = (data: z.infer<typeof createDepartmentSchema>) => {
    createDepartment.mutate(data, { onSuccess: closeDrawer });
  };

  const onCatSubmit = (data: z.infer<typeof createCategorySchema>) => {
    createCategory.mutate(data, { onSuccess: closeDrawer });
  };

  // Tables Columns
  const depColumns = [
    {
      header: 'الاسم',
      cell: (row: DepartmentResponse) => <span className="font-semibold text-gray-800">{row.name}</span>
    },
    {
      header: 'عدد الأقسام الفرعية',
      cell: (row: DepartmentResponse) => row.categoriesCount
    },
    {
      header: 'تاريخ الإضافة',
      cell: (row: DepartmentResponse) => new Date(row.createdAt).toLocaleDateString('ar-EG')
    },
    {
      header: 'الإجراءات',
      cell: (row: DepartmentResponse) => (
        <button
          onClick={() => {
            if (confirm('هل أنت متأكد من حذف هذا القسم؟')) {
              deleteDepartment.mutate(row.departmentId);
            }
          }}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="حذف"
        >
          <Trash2 size={18} />
        </button>
      )
    }
  ];

  const catColumns = [
    {
      header: 'الاسم',
      cell: (row: CategoryResponse) => <span className="font-semibold text-gray-800">{row.name}</span>
    },
    {
      header: 'القسم الرئيسي',
      cell: (row: CategoryResponse) => <span className="text-gray-600">{row.department?.name}</span>
    },
    {
      header: 'عدد المنتجات',
      cell: (row: CategoryResponse) => row.productsCount
    },
    {
      header: 'تاريخ الإضافة',
      cell: (row: CategoryResponse) => new Date(row.createdAt).toLocaleDateString('ar-EG')
    },
    {
      header: 'الإجراءات',
      cell: (row: CategoryResponse) => (
        <button
          onClick={() => {
            if (confirm('هل أنت متأكد من حذف هذا القسم الفرعي؟')) {
              deleteCategory.mutate(row.categoryId);
            }
          }}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="حذف"
        >
          <Trash2 size={18} />
        </button>
      )
    }
  ];

  const drawerFooter = (
    <>
      <button type="button" onClick={closeDrawer} className={tokens.btn.secondary}>
        إلغاء
      </button>
      <button
        type="submit"
        form={activeTab === 'departments' ? 'dep-form' : 'cat-form'}
        disabled={activeTab === 'departments' ? createDepartment.isPending : createCategory.isPending}
        className={tokens.btn.primary + " disabled:opacity-60"}
      >
        حفظ
      </button>
    </>
  );

  return (
    <div className="space-y-6">
      
      {/* Header and Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 border border-gray-200 p-1 rounded-lg bg-gray-50">
          <button
            onClick={() => setActiveTab('departments')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm font-semibold ${activeTab === 'departments' ? 'bg-white shadow-sm text-blue-600 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Layers size={16} /> الأقسام الرئيسية
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm font-semibold ${activeTab === 'categories' ? 'bg-white shadow-sm text-blue-600 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Tag size={16} /> الأقسام الفرعية
          </button>
        </div>

        <button 
          onClick={() => setIsDrawerOpen(true)}
          className={tokens.btn.primary + " flex items-center gap-2"}
        >
          <Plus size={18} />
          {activeTab === 'departments' ? 'قسم رئيسي جديد' : 'قسم فرعي جديد'}
        </button>
      </div>

      {/* Tables */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {activeTab === 'departments' ? (
          <DataTable
            columns={depColumns}
            data={departmentsData?.items || []}
            isLoading={isLoadingDeps}
            pageIndex={1}
            totalPages={1}
            totalCount={departmentsData?.totalCount || 0}
            pageSize={departmentsData?.pageSize || 10}
            onNextPage={() => {}}
            onPrevPage={() => {}}
          />
        ) : (
          <DataTable
            columns={catColumns}
            data={categoriesData?.items || []}
            isLoading={isLoadingCats}
            pageIndex={1}
            totalPages={1}
            totalCount={categoriesData?.totalCount || 0}
            pageSize={categoriesData?.pageSize || 10}
            onNextPage={() => {}}
            onPrevPage={() => {}}
          />
        )}
      </div>

      {/* Create Drawer */}
      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={activeTab === 'departments' ? 'إضافة قسم رئيسي' : 'إضافة قسم فرعي'}
        footer={drawerFooter}
      >
        {activeTab === 'departments' ? (
          <form id="dep-form" onSubmit={depForm.handleSubmit(onDepSubmit)} className="space-y-4">
            <div>
              <label className={tokens.font.label}>اسم القسم الرئيسي <span className="text-red-500">*</span></label>
              <input
                type="text"
                {...depForm.register('name')}
                className={`mt-1 block w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${depForm.formState.errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {depForm.formState.errors.name && <p className="text-red-500 text-xs mt-1">{depForm.formState.errors.name.message}</p>}
            </div>
          </form>
        ) : (
          <form id="cat-form" onSubmit={catForm.handleSubmit(onCatSubmit)} className="space-y-4">
            <div>
              <label className={tokens.font.label}>القسم الرئيسي <span className="text-red-500">*</span></label>
              <select
                {...catForm.register('departmentId')}
                className={`mt-1 block w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white ${catForm.formState.errors.departmentId ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">-- اختر القسم الرئيسي --</option>
                {departmentsData?.items.map(d => (
                  <option key={d.departmentId} value={d.departmentId}>{d.name}</option>
                ))}
              </select>
              {catForm.formState.errors.departmentId && <p className="text-red-500 text-xs mt-1">{catForm.formState.errors.departmentId.message}</p>}
            </div>
            <div>
              <label className={tokens.font.label}>اسم القسم الفرعي <span className="text-red-500">*</span></label>
              <input
                type="text"
                {...catForm.register('name')}
                className={`mt-1 block w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${catForm.formState.errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {catForm.formState.errors.name && <p className="text-red-500 text-xs mt-1">{catForm.formState.errors.name.message}</p>}
            </div>
          </form>
        )}
      </RightDrawer>

    </div>
  );
}
