import { useState } from 'react';
import { useProducts, useCategories, useCreateProduct } from '@/features/inventory/hooks/useInventory';
import { RightDrawer } from '@/shared/components/ui/RightDrawer';
import { ProductFilters } from '@/features/inventory/components/ProductFilters';
import { ProductsTable } from '@/features/inventory/components/ProductsTable';
import { AddProductForm } from '@/features/inventory/components/AddProductForm';
import { tokens } from '@/shared/styles/tokens';

/**
 * ProductsPage — composes feature components only.
 * No inline UI, no column definitions, no form markup lives here.
 * Responsible only for: state management + data fetching + event wiring.
 */
export function ProductsPage() {
  const [pageIndex, setPageIndex]         = useState(1);
  const [searchTerm, setSearchTerm]       = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isDrawerOpen, setIsDrawerOpen]   = useState(false);

  const { data, isLoading }  = useProducts({
    pageNumber: pageIndex,
    pageSize: 10,
    searchValue: searchTerm || undefined,
    categoryId: categoryFilter || undefined,
  });
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.items || [];
  const createProduct        = useCreateProduct();

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setPageIndex(1);
  };

  const handleCategoryChange = (val: string) => {
    setCategoryFilter(val);
    setPageIndex(1);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (formData: any) => {
    // react-hook-form returns a FileList for file inputs
    const finalData = { ...formData };
    if (finalData.image && finalData.image.length > 0) {
      finalData.image = finalData.image[0]; // extract File
    } else {
      delete finalData.image; // remove if empty
    }

    // Convert propertiesList array to properties Record<string, string>
    if (finalData.propertiesList && finalData.propertiesList.length > 0) {
      finalData.properties = {};
      finalData.propertiesList.forEach((p: { key: string; value: string }) => {
        if (p.key && p.value) {
          finalData.properties[p.key] = p.value;
        }
      });
    }
    delete finalData.propertiesList;

    createProduct.mutate(finalData, { onSuccess: closeDrawer });
  };

  const drawerFooter = (
    <>
      <button type="button" onClick={closeDrawer} className={tokens.btn.secondary}>
        إلغاء
      </button>
      <button
        type="submit"
        form="add-product-form"
        disabled={createProduct.isPending}
        className={tokens.btn.primary + " disabled:opacity-60"}
      >
        {createProduct.isPending ? 'جاري الحفظ...' : 'حفظ المنتج'}
      </button>
    </>
  );

  return (
    <div className="space-y-4">

      {/* Filter toolbar */}
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        categoryFilter={categoryFilter}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        onAddClick={() => setIsDrawerOpen(true)}
      />

      {/* Data table */}
      <ProductsTable
        data={data}
        isLoading={isLoading}
        pageIndex={pageIndex}
        onNextPage={() => setPageIndex((p) => p + 1)}
        onPrevPage={() => setPageIndex((p) => p - 1)}
      />

      {/* Add product drawer */}
      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="إضافة منتج جديد"
        footer={drawerFooter}
      >
        <AddProductForm
          categories={categories}
          onSubmit={handleFormSubmit}
          isSubmitting={createProduct.isPending}
        />
      </RightDrawer>
    </div>
  );
}
