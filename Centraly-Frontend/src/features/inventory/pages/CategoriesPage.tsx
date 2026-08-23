import { useState, useMemo } from 'react';
import { useCategories, useDepartments, useCreateCategory, useCreateDepartment, useDeleteCategory, useDeleteDepartment } from '@/features/inventory/hooks/useInventory';
import { CategoryResponse } from '@/features/inventory/schemas/inventorySchemas';
import { tokens } from '@/shared/styles/tokens';
import { Plus, Trash2, Layers, Tag, ChevronDown, ChevronRight, Package } from 'lucide-react';
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
  const [expandedDeps, setExpandedDeps] = useState<Record<string, boolean>>({});
  const [drawerMode, setDrawerMode] = useState<'department' | 'category'>('department');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Queries
  const { data: departmentsData, isLoading: isLoadingDeps } = useDepartments();
  const { data: categoriesData, isLoading: isLoadingCats } = useCategories();

  // Mutations
  const createDepartment = useCreateDepartment();
  const createCategory = useCreateCategory();
  const deleteDepartment = useDeleteDepartment();
  const deleteCategory = useDeleteCategory();

  // Group Categories by Department
  const categoriesByDep = useMemo(() => {
    const map: Record<string, CategoryResponse[]> = {};
    if (categoriesData?.items) {
      categoriesData.items.forEach(c => {
        const depId = c.department.departmentId;
        if (!map[depId]) map[depId] = [];
        map[depId].push(c);
      });
    }
    return map;
  }, [categoriesData]);

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

  const openAddDepartment = () => {
    setDrawerMode('department');
    setIsDrawerOpen(true);
  };

  const openAddCategory = (departmentId?: string) => {
    setDrawerMode('category');
    catForm.reset({ departmentId: departmentId || '', name: '' });
    setIsDrawerOpen(true);
  };

  const onDepSubmit = (data: z.infer<typeof createDepartmentSchema>) => {
    createDepartment.mutate(data, { onSuccess: closeDrawer });
  };

  const onCatSubmit = (data: z.infer<typeof createCategorySchema>) => {
    createCategory.mutate(data, { onSuccess: closeDrawer });
  };

  const toggleDep = (id: string) => {
    setExpandedDeps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const drawerFooter = (
    <>
      <button type="button" onClick={closeDrawer} className={tokens.btn.secondary}>
        إلغاء
      </button>
      <button
        type="submit"
        form={drawerMode === 'department' ? 'dep-form' : 'cat-form'}
        disabled={drawerMode === 'department' ? createDepartment.isPending : createCategory.isPending}
        className={tokens.btn.primary + " disabled:opacity-60"}
      >
        حفظ
      </button>
    </>
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الأقسام</h1>
          <p className="text-gray-500 mt-1">إدارة الأقسام الرئيسية والفرعية</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => openAddCategory()}
            className={tokens.btn.secondary + " flex items-center gap-2"}
          >
            <Tag size={18} />
            قسم فرعي جديد
          </button>
          <button 
            onClick={openAddDepartment}
            className={tokens.btn.primary + " flex items-center gap-2"}
          >
            <Layers size={18} />
            قسم رئيسي جديد
          </button>
        </div>
      </div>

      {/* Loading State */}
      {(isLoadingDeps || isLoadingCats) && (
        <div className="p-8 text-center text-gray-500">جاري تحميل الأقسام...</div>
      )}

      {/* Departments List */}
      <div className="space-y-4">
        {departmentsData?.items.map((dep) => {
          const isExpanded = expandedDeps[dep.departmentId];
          const depCategories = categoriesByDep[dep.departmentId] || [];

          return (
            <div key={dep.departmentId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Department Header */}
              <div 
                className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${isExpanded ? 'border-b border-gray-100 bg-gray-50' : ''}`}
                onClick={() => toggleDep(dep.departmentId)}
              >
                <div className="flex items-center gap-3">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{dep.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Tag size={12}/> {dep.categoriesCount} أقسام فرعية</span>
                      <span className="flex items-center gap-1"><Package size={12}/> {dep.productsCount} منتجات</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openAddCategory(dep.departmentId);
                    }}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Plus size={16} /> إضافة قسم فرعي
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`هل أنت متأكد من حذف القسم الرئيسي "${dep.name}"؟`)) {
                        deleteDepartment.mutate(dep.departmentId);
                      }
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    title="حذف القسم"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Categories List (Expanded) */}
              {isExpanded && (
                <div className="p-4 bg-gray-50/50">
                  {depCategories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {depCategories.map(cat => (
                        <div key={cat.categoryId} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                              <Tag size={14} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{cat.name}</p>
                              <p className="text-xs text-gray-500">{cat.productsCount} منتج</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              if (confirm(`هل أنت متأكد من حذف القسم الفرعي "${cat.name}"؟`)) {
                                deleteCategory.mutate(cat.categoryId);
                              }
                            }}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="inline-flex w-12 h-12 rounded-full bg-gray-100 items-center justify-center text-gray-400 mb-3">
                        <Tag size={20} />
                      </div>
                      <p className="text-gray-500 font-medium">لا يوجد أقسام فرعية بعد</p>
                      <button 
                        onClick={() => openAddCategory(dep.departmentId)}
                        className="text-blue-600 text-sm mt-2 font-semibold hover:underline"
                      >
                        إضافة قسم فرعي جديد
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {departmentsData?.items && departmentsData.items.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="inline-flex w-16 h-16 rounded-full bg-blue-50 items-center justify-center text-blue-500 mb-4">
              <Layers size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">لا يوجد أي أقسام رئيسية</h3>
            <p className="text-gray-500 mb-4">ابدأ بإضافة قسم رئيسي لتتمكن من تنظيم منتجاتك</p>
            <button 
              onClick={openAddDepartment}
              className={tokens.btn.primary + " inline-flex items-center gap-2"}
            >
              <Plus size={18} />
              إضافة قسم رئيسي
            </button>
          </div>
        )}
      </div>

      {/* Create Drawer */}
      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={drawerMode === 'department' ? 'إضافة قسم رئيسي' : 'إضافة قسم فرعي'}
        footer={drawerFooter}
      >
        {drawerMode === 'department' ? (
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
