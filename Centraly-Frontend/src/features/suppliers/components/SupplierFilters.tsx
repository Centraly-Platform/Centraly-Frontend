import { Search, Plus } from 'lucide-react';
import { tokens } from '@/shared/styles/tokens';

interface SupplierFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onAddClick: () => void;
}

export function SupplierFilters({
  searchTerm,
  onSearchChange,
  onAddClick,
}: SupplierFiltersProps) {
  return (
    <div className={`${tokens.card} p-4 flex flex-wrap gap-4 items-center justify-between bg-white shadow-sm`}>
      {/* Left side: Search */}
      <div className="flex items-center gap-3 flex-1 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-[350px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="بحث بالاسم أو الهاتف..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`${tokens.input} bg-gray-50`}
          />
        </div>
      </div>

      {/* Right side: Add Button */}
      <button onClick={onAddClick} className={tokens.btn.primary + " flex items-center gap-2 whitespace-nowrap"}>
        <Plus size={16} />
        إضافة مورد جديد
      </button>
    </div>
  );
}
