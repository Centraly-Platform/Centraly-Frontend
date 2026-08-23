import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { useProduct, useUpdateProduct, useCategories } from '@/features/inventory/hooks/useInventory';
import { createProductSchema, CreateProductRequest } from '@/features/inventory/schemas/inventorySchemas';
import { tokens } from '@/shared/styles/tokens';
import { ArrowRight, Edit, Package, Hash, Tag, Layers, Archive, Calendar } from 'lucide-react';
import { RightDrawer } from '@/shared/components/ui/RightDrawer';
import { AddProductForm } from '@/features/inventory/components/AddProductForm';

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: product, isLoading, error } = useProduct(id!);
  const updateProduct = useUpdateProduct();
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.items || [];

  if (isLoading) return <div className="p-8 text-center text-gray-500">جاري تحميل التفاصيل...</div>;
  if (error || !product) return <div className="p-8 text-center text-red-500">حدث خطأ أثناء تحميل تفاصيل المنتج.</div>;

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleFormSubmit = (formData: z.infer<typeof createProductSchema>) => {
    const payload: CreateProductRequest = { 
      name: formData.name,
      departmentId: formData.departmentId,
      categoryId: formData.categoryId,
      minQuantityAlert: formData.minQuantityAlert,
      barcode: formData.barcode,
      storageLocation: formData.storageLocation,
    };
    
    if (formData.image) {
      payload.image = formData.image;
    }

    if (formData.propertiesList && formData.propertiesList.length > 0) {
      payload.properties = {};
      formData.propertiesList.forEach((p: { key: string; value: string }) => {
        if (p.key && p.value) {
          payload.properties![p.key] = p.value;
        }
      });
    }

    updateProduct.mutate({ id: id!, data: payload }, { onSuccess: closeDrawer });
  };

  const drawerFooter = (
    <>
      <button type="button" onClick={closeDrawer} className={tokens.btn.secondary}>
        إلغاء
      </button>
      <button
        type="submit"
        form="add-product-form"
        disabled={updateProduct.isPending}
        className={tokens.btn.primary + " disabled:opacity-60"}
      >
        {updateProduct.isPending ? 'جاري الحفظ...' : 'حفظ التعديلات'}
      </button>
    </>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <ArrowRight size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <Hash size={16} /> {product.barcode || 'بدون باركود'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className={tokens.btn.primary + " flex items-center gap-2"}
        >
          <Edit size={18} />
          تعديل البيانات
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Info Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">المعلومات الأساسية</h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-32 h-32 rounded-xl object-cover border border-gray-200" />
              ) : (
                <div className="w-32 h-32 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400">
                  <Package size={48} />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 grow">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Tag size={14}/> القسم الرئيسي</p>
                <p className="font-semibold text-gray-800">{product.category?.name || '---'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Layers size={14}/> القسم الفرعي</p>
                <p className="font-semibold text-gray-800">{product.department?.name || '---'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Archive size={14}/> مكان التخزين</p>
                <p className="font-semibold text-gray-800">{product.storageLocation || 'غير محدد'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar size={14}/> تاريخ الإضافة</p>
                <p className="font-semibold text-gray-800">
                  {new Date(product.createdAt).toLocaleDateString('ar-EG')}
                </p>
              </div>
            </div>
          </div>

          {/* Custom Properties */}
          {product.properties && Object.keys(product.properties).length > 0 && (
            <div className="mt-8">
              <h3 className="text-md font-bold text-gray-800 mb-4 border-t pt-4">خصائص إضافية</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(product.properties).map(([key, value]) => (
                  <div key={key} className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-500 mb-1">{key}</p>
                    <p className="font-semibold text-blue-900">{value as string}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Inventory Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">حالة المخزون</h2>
          
          <div className="flex flex-col gap-4">
            <div className={`p-4 rounded-lg border ${product.isOutOfStock ? 'bg-red-50 border-red-200' : product.isLowStock ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
              <p className={`text-sm ${product.isOutOfStock ? 'text-red-600' : product.isLowStock ? 'text-amber-600' : 'text-emerald-600'} mb-1`}>الكمية الكلية المتوفرة</p>
              <p className={`text-3xl font-bold ${product.isOutOfStock ? 'text-red-700' : product.isLowStock ? 'text-amber-700' : 'text-emerald-700'}`}>
                {product.totalQuantity} <span className="text-lg font-normal">قطعة</span>
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">حد تنبيه النواقص</p>
                <p className="text-xl font-bold text-gray-800">{product.minQuantityAlert}</p>
              </div>
              <div className="text-gray-300">
                <Package size={32} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Edit product drawer */}
      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="تعديل بيانات المنتج"
        footer={drawerFooter}
      >
        <AddProductForm
          categories={categories}
          onSubmit={handleFormSubmit}
          isSubmitting={updateProduct.isPending}
          initialData={product}
        />
      </RightDrawer>
    </div>
  );
}
