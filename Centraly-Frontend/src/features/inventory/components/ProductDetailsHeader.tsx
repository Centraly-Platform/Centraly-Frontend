import { ArrowRight, Edit, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';
import { tokens } from '@/shared/styles/tokens';

interface ProductDetailsHeaderProps {
  product: ProductResponse;
  onEditClick: () => void;
}

export function ProductDetailsHeader({ product, onEditClick }: ProductDetailsHeaderProps) {
  const navigate = useNavigate();

  return (
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
        onClick={onEditClick}
        className={tokens.btn.primary + " flex items-center gap-2"}
      >
        <Edit size={18} />
        تعديل البيانات
      </button>
    </div>
  );
}
