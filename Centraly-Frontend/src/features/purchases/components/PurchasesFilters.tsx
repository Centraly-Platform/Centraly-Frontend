import { tokens } from '@/shared/styles/tokens';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useSuppliers } from '@/features/suppliers/hooks/useSuppliers';

interface PurchasesFiltersProps {
  onSearch: (searchTerm: string) => void;
  onSupplierChange: (supplierId: string) => void;
}

export function PurchasesFilters({ onSearch, onSupplierChange }: PurchasesFiltersProps) {
  const [term, setTerm] = useState('');
  const { data: suppliersData } = useSuppliers({ pageNumber: 1, pageSize: 500 });
  const suppliers = suppliersData?.items || [];

  return (
    <div className={`${tokens.card} p-4 bg-white flex flex-col md:flex-row gap-4 justify-between items-center mb-6`}>
      <div className="relative w-full md:w-96">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="ابحث برقم الفاتورة..."
          className={`${tokens.input} pl-3 pr-10`}
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>

      <div className="w-full md:w-64">
        <select
          className={tokens.input}
          onChange={(e) => onSupplierChange(e.target.value)}
        >
          <option value="">كل الموردين</option>
          {suppliers.map(s => (
            <option key={s.supplierId} value={s.supplierId}>{s.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
