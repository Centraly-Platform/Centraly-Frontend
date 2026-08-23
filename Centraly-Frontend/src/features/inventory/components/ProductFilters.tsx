import { Search, Plus } from 'lucide-react';
import { CategoryResponse } from '@/features/inventory/schemas/inventorySchemas';
import { tokens } from '@/shared/styles/tokens';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  categoryFilter: string;
  onCategoryChange: (val: string) => void;
  categories?: CategoryResponse[];
  onAddClick: () => void;
}

/**
 * Toolbar: search input + category dropdown + "Add Product" button.
 * Purely presentational — all state lives in the parent (ProductsPage).
 */
export function ProductFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories,
  onAddClick,
}: ProductFiltersProps) {
  return (
    <div className={`${tokens.card} p-4 flex flex-wrap gap-4 items-center justify-between bg-gray-50/50`}>
      {/* Left side: Search + Category filter */}
      <div className="flex items-center gap-3 flex-1 flex-wrap">
        {/* Search — pr-10 for icon space (RTL) */}
        <div className="relative max-w-sm flex-1 min-w-[200px]">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
          <input
            type="text"
            placeholder="بحث بالاسم أو الباركود..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
          />
        </div>

        {/* Category Select */}
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">جميع الأقسام</option>
          {categories?.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Right side: Add Button */}
      <button onClick={onAddClick} className={tokens.btn.primary + " flex items-center gap-2"}>
        <Plus size={16} />
        إضافة منتج جديد
      </button>
    </div>
  );
}
