import { useState } from 'react';
import { useProducts } from '@/features/inventory/hooks/useInventory';
import { Search } from 'lucide-react';
import { tokens } from '@/shared/styles/tokens';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';

interface ProductSearchDropdownProps {
  onSelect: (product: ProductResponse) => void;
}

export function ProductSearchDropdown({ onSelect }: ProductSearchDropdownProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data, isLoading } = useProducts({
    searchValue: searchTerm,
    pageNumber: 1,
    pageSize: 10,
  });

  const products = data?.items || [];

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="ابحث باسم المنتج أو الباركود..."
          className={`${tokens.input} pl-3 pr-10`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm.length > 1 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-sm text-gray-500">جاري البحث...</div>
          ) : products.length > 0 ? (
            <ul className="py-1">
              {products.map((product) => (
                <li
                  key={product.productId}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                  onClick={() => {
                    onSelect(product);
                    setSearchTerm('');
                  }}
                >
                  <div>
                    <p className="text-sm font-bold text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.barcode || 'بدون باركود'}</p>
                  </div>
                  <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                    إضافة للفاتورة
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-center text-sm text-gray-500">لم يتم العثور على منتجات</div>
          )}
        </div>
      )}
    </div>
  );
}
