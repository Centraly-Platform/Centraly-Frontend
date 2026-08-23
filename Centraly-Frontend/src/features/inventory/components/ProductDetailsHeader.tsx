import { Edit, Package, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';

interface ProductDetailsHeaderProps {
  product: ProductResponse;
  onEditClick: () => void;
}

export function ProductDetailsHeader({ product, onEditClick }: ProductDetailsHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-start relative z-20 h-20">
      <div className="flex items-start gap-6 relative w-full">
        {/* Overlapping Image Card */}
        <div className="w-36 absolute right-0 top-0 z-30">
          <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center gap-2 transition-transform hover:-translate-y-1">
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
            <div className="bg-gray-100 text-gray-600 font-mono text-[11px] font-bold px-2 py-1 rounded-lg w-full text-center border border-gray-200 truncate">
              # {product.barcode || '---'}
            </div>
          </div>
        </div>

        {/* Product Title */}
        <div className="pr-40 pt-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{product.name}</h1>
          <p className="text-gray-500 mt-1 font-mono text-sm font-semibold"># {product.barcode || 'بدون باركود'}</p>
        </div>
      </div>

      <div className="pt-2 shrink-0 flex items-center gap-2">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg transition-colors shadow-sm"
          title="رجوع"
        >
          <ArrowRight size={18} />
        </button>
        <button 
          onClick={onEditClick}
          className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
          title="تعديل بيانات المنتج"
        >
          <Edit size={18} />
        </button>
      </div>
    </div>
  );
}
