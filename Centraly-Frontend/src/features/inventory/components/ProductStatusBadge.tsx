import { AlertTriangle } from 'lucide-react';

interface ProductStatusBadgeProps {
  quantity: number;
  reorderLevel: number;
}

/**
 * Shows a colored dot/icon + quantity text.
 * Green dot = stock OK, Red warning icon = low stock (below reorder level).
 */
export function ProductStatusBadge({ quantity, reorderLevel }: ProductStatusBadgeProps) {
  const isLow = quantity <= reorderLevel;
  
  if (isLow) {
    return (
      <div className="flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-md border border-red-100 w-fit">
        <AlertTriangle size={14} className="text-red-600" />
        <span className="text-sm font-bold">
          {quantity === 0 ? 'نفد المخزون' : 'مخزون منخفض'}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-md border border-green-100 w-fit">
      <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
      <span className="text-sm font-bold">
        متوفر
      </span>
    </div>
  );
}
