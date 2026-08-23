import { ArrowRight, Edit, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';

interface ProductDetailsHeaderProps {
  product: ProductResponse;
  onEditClick: () => void;
}

export function ProductDetailsHeader({ product, onEditClick }: ProductDetailsHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-start">
      <div className="flex items-start gap-6">
        {/* Product Image Card */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center gap-3 w-40 shrink-0">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-32 object-contain rounded-xl"
            />
          ) : (
            <div className="w-full h-32 bg-gray-50 flex items-center justify-center rounded-xl text-gray-300">
              <Package size={48} strokeWidth={1.5} />
            </div>
          )}
          <div className="bg-gray-100 text-gray-600 font-mono text-xs font-bold px-3 py-1.5 rounded-lg w-full text-center border border-gray-200 truncate">
            # {product.barcode || '---'}
          </div>
        </div>

        {/* Product Title */}
        <div className="pt-4">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{product.name}</h1>
          <p className="text-gray-500 mt-2 font-mono text-sm"># {product.barcode || '---'}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-200 font-semibold transition-colors shadow-sm"
        >
          <ArrowRight size={18} />
          رجوع
        </button>
        <button 
          onClick={onEditClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-sm"
        >
          <Edit size={18} />
          تعديل البيانات
        </button>
      </div>
    </div>
  );
}
