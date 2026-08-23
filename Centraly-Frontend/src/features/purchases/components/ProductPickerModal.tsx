import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, X } from 'lucide-react';
import { tokens } from '@/shared/styles/tokens';
import { DataTable } from '@/shared/components/ui/DataTable';
import { useDebounce } from '@/shared/hooks/useDebounce';
import {
  useProducts,
  useCategories,
  useDepartments,
} from '@/features/inventory/hooks/useInventory';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';

interface ProductPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (products: ProductResponse[]) => void;
  /** Product IDs already on the invoice — shown checked & disabled */
  excludeProductIds?: string[];
}

const PAGE_SIZE = 10;

export function ProductPickerModal({
  isOpen,
  onClose,
  onAdd,
  excludeProductIds = [],
}: ProductPickerModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedMap, setSelectedMap] = useState<Map<string, ProductResponse>>(new Map());

  const debouncedSearch = useDebounce(searchTerm, 400);
  const excludedSet = new Set(excludeProductIds);

  const { data, isLoading } = useProducts({
    pageNumber: pageIndex,
    pageSize: PAGE_SIZE,
    searchValue: debouncedSearch || undefined,
    departmentId: departmentId || undefined,
    categoryId: categoryId || undefined,
  });

  const { data: departmentsData } = useDepartments();
  const { data: categoriesData } = useCategories();

  const products = data?.items ?? [];
  const departments = departmentsData?.items ?? [];
  const categories = categoriesData?.items ?? [];

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    setSearchTerm('');
    setDepartmentId('');
    setCategoryId('');
    setPageIndex(1);
    setSelectedMap(new Map());

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleProduct = (product: ProductResponse) => {
    if (excludedSet.has(product.productId)) return;

    setSelectedMap((prev) => {
      const next = new Map(prev);
      if (next.has(product.productId)) next.delete(product.productId);
      else next.set(product.productId, product);
      return next;
    });
  };

  const handleAdd = () => {
    const selected = Array.from(selectedMap.values()).filter(
      (p) => !excludedSet.has(p.productId)
    );
    if (selected.length === 0) return;
    onAdd(selected);
    onClose();
  };

  const newSelectionCount = selectedMap.size;

  const columns = [
    {
      header: '',
      cell: (row: ProductResponse) => {
        const alreadyOnInvoice = excludedSet.has(row.productId);
        const checked = alreadyOnInvoice || selectedMap.has(row.productId);
        return (
          <input
            type="checkbox"
            checked={checked}
            disabled={alreadyOnInvoice}
            onChange={() => toggleProduct(row)}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer disabled:cursor-not-allowed"
            aria-label={`اختيار ${row.name}`}
          />
        );
      },
    },
    {
      header: 'الصورة',
      cell: (row: ProductResponse) => (
        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0">
          {row.imageUrl ? (
            <img
              src={row.imageUrl}
              alt={row.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <span className={`text-gray-300 text-xs ${row.imageUrl ? 'hidden' : ''}`}>📦</span>
        </div>
      ),
    },
    {
      header: 'المنتج',
      cell: (row: ProductResponse) => (
        <div>
          <p className="font-semibold text-[var(--color-text-main)]">{row.name}</p>
          {excludedSet.has(row.productId) && (
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">مضاف مسبقاً للفاتورة</p>
          )}
        </div>
      ),
    },
    {
      header: 'الباركود',
      cell: (row: ProductResponse) => (
        <span className="text-[var(--color-text-muted)] font-mono text-xs">{row.barcode || '—'}</span>
      ),
    },
    {
      header: 'القسم الرئيسي',
      cell: (row: ProductResponse) => row.department?.name || '—',
    },
    {
      header: 'القسم الفرعي',
      cell: (row: ProductResponse) => row.category?.name || '—',
    },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-picker-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between shrink-0">
          <div>
            <h2 id="product-picker-title" className="text-lg font-bold text-[var(--color-text-main)]">
              إضافة منتجات للفاتورة
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
              ابحث أو فلتر ثم حدد المنتجات المطلوبة
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="إغلاق"
          >
            <X size={20} className="text-[var(--color-text-muted)]" />
          </button>
        </div>

        <div className="px-6 py-3 border-b border-[var(--color-border)] shrink-0 bg-gray-50/50">
          <div className="grid grid-cols-3 gap-3 items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="ابحث باسم المنتج أو الباركود..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPageIndex(1);
                }}
                className={`${tokens.input} pr-10`}
                autoFocus
              />
            </div>

            {/* Main category filter */}
            <select
              value={departmentId}
              onChange={(e) => {
                setDepartmentId(e.target.value);
                setCategoryId('');
                setPageIndex(1);
              }}
              className={tokens.select}
            >
              <option value="">الأقسام الرئيسية</option>
              {departments.map((dep) => (
                <option key={dep.departmentId} value={dep.departmentId}>
                  {dep.name}
                </option>
              ))}
            </select>

            {/* Sub category filter */}
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setPageIndex(1);
              }}
              className={tokens.select}
            >
              <option value="">الأقسام الفرعية</option>
              {categories
                .filter((cat) => !departmentId || cat.department.departmentId === departmentId)
                .map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <DataTable
            columns={columns}
            data={products}
            isLoading={isLoading}
            pageIndex={pageIndex}
            totalPages={data?.totalPages ?? 1}
            totalCount={data?.totalCount ?? 0}
            pageSize={PAGE_SIZE}
            onNextPage={() => setPageIndex((p) => p + 1)}
            onPrevPage={() => setPageIndex((p) => Math.max(1, p - 1))}
            onRowClick={toggleProduct}
          />
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-[var(--color-border)] flex items-center justify-between gap-3 shrink-0">
          <span className="text-sm text-[var(--color-text-muted)]">
            {newSelectionCount > 0
              ? `تم تحديد ${newSelectionCount} منتج`
              : 'لم يتم تحديد منتجات بعد'}
          </span>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className={tokens.btn.secondary}>
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleAdd}
              disabled={newSelectionCount === 0}
              className={`${tokens.btn.primary} disabled:opacity-50`}
            >
              إضافة ({newSelectionCount})
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
