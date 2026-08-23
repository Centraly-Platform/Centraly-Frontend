import { useState, useMemo } from 'react';
import { 
  useCategories, useDepartments, 
  useCreateCategory, useCreateDepartment, 
  useUpdateCategory, useUpdateDepartment,
  useDeleteCategory, useDeleteDepartment 
} from '@/features/inventory/hooks/useInventory';
import { CategoryResponse } from '@/features/inventory/schemas/inventorySchemas';
import { tokens } from '@/shared/styles/tokens';
import { Layers, Tag, Plus } from 'lucide-react';
import { RightDrawer } from '@/shared/components/ui/RightDrawer';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DepartmentCard } from '@/features/inventory/components/DepartmentCard';
import { DepartmentForm, CategoryForm, createDepartmentSchema, createCategorySchema } from '@/features/inventory/components/CategoryForms';
import { ConfirmModal } from '@/shared/components/ui/ConfirmModal';

export function CategoriesPage() {
  const [drawerMode, setDrawerMode] = useState<'department' | 'category'>('department');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState<{ id: string, name: string, type: 'department' | 'category' } | null>(null);

  // Queries
  const { data: departmentsData, isLoading: isLoadingDeps } = useDepartments();
  const { data: categoriesData, isLoading: isLoadingCats } = useCategories();

  // Mutations
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();
  const deleteDepartment = useDeleteDepartment();
  
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
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
    setEditingId(null);
    depForm.reset({ name: '' });
    catForm.reset({ name: '', departmentId: '' });
  };

  const openAddDepartment = () => {
    setDrawerMode('department');
    setEditingId(null);
    depForm.reset({ name: '' });
    setIsDrawerOpen(true);
  };

  const openEditDepartment = (id: string, name: string) => {
    setDrawerMode('department');
    setEditingId(id);
    depForm.reset({ name });
    setIsDrawerOpen(true);
  };

  const openAddCategory = (departmentId?: string) => {
    setDrawerMode('category');
    setEditingId(null);
    catForm.reset({ departmentId: departmentId || '', name: '' });
    setIsDrawerOpen(true);
  };

  const openEditCategory = (id: string, name: string, departmentId: string) => {
    setDrawerMode('category');
    setEditingId(id);
    catForm.reset({ name, departmentId });
    setIsDrawerOpen(true);
  };

  const onDepSubmit = (data: z.infer<typeof createDepartmentSchema>) => {
    if (editingId) {
      updateDepartment.mutate({ id: editingId, data }, { onSuccess: closeDrawer });
    } else {
      createDepartment.mutate(data, { onSuccess: closeDrawer });
    }
  };

  const onCatSubmit = (data: z.infer<typeof createCategorySchema>) => {
    if (editingId) {
      updateCategory.mutate({ id: editingId, data }, { onSuccess: closeDrawer });
    } else {
      createCategory.mutate(data, { onSuccess: closeDrawer });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteInfo) return;
    if (deleteInfo.type === 'department') {
      deleteDepartment.mutate(deleteInfo.id, { onSuccess: () => setDeleteInfo(null) });
    } else {
      deleteCategory.mutate(deleteInfo.id, { onSuccess: () => setDeleteInfo(null) });
    }
  };

  const isSaving = createDepartment.isPending || updateDepartment.isPending || createCategory.isPending || updateCategory.isPending;

  const drawerFooter = (
    <>
      <button type="button" onClick={closeDrawer} className={tokens.btn.secondary}>
        إلغاء
      </button>
      <button
        type="submit"
        form={drawerMode === 'department' ? 'dep-form' : 'cat-form'}
        disabled={isSaving}
        className={tokens.btn.primary + " disabled:opacity-60"}
      >
        {isSaving ? 'جاري الحفظ...' : 'حفظ'}
      </button>
    </>
  );

  const drawerTitle = () => {
    if (drawerMode === 'department') return editingId ? 'تعديل القسم الرئيسي' : 'إضافة قسم رئيسي';
    return editingId ? 'تعديل القسم الفرعي' : 'إضافة قسم فرعي';
  };

  return (
    <div className="space-y-6">
      
      {/* Actions */}
      <div className="flex justify-end items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
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
        {departmentsData?.items.map((dep) => (
          <DepartmentCard
            key={dep.departmentId}
            department={dep}
            categories={categoriesByDep[dep.departmentId] || []}
            onAddCategory={openAddCategory}
            onEditDepartment={openEditDepartment}
            onDeleteDepartment={(id, name) => setDeleteInfo({ id, name, type: 'department' })}
            onEditCategory={openEditCategory}
            onDeleteCategory={(id, name) => setDeleteInfo({ id, name, type: 'category' })}
          />
        ))}

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

      {/* Create / Edit Drawer */}
      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={drawerTitle()}
        footer={drawerFooter}
      >
        {drawerMode === 'department' ? (
          <DepartmentForm form={depForm} onSubmit={onDepSubmit} />
        ) : (
          <CategoryForm 
            form={catForm} 
            departments={departmentsData?.items || []} 
            onSubmit={onCatSubmit} 
          />
        )}
      </RightDrawer>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteInfo}
        onClose={() => setDeleteInfo(null)}
        onConfirm={handleConfirmDelete}
        title={deleteInfo?.type === 'department' ? 'حذف قسم رئيسي' : 'حذف قسم فرعي'}
        message={
          <>
            هل أنت متأكد من رغبتك في حذف <strong>{deleteInfo?.name}</strong>؟<br />
            لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
          </>
        }
        confirmText="نعم، احذف"
        cancelText="إلغاء"
        type="danger"
        isLoading={deleteDepartment.isPending || deleteCategory.isPending}
      />
    </div>
  );
}
