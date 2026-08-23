interface ProductStatusBadgeProps {
  quantity: number;
  reorderLevel: number;
}

/**
 * Shows a colored dot + quantity text.
 * Green dot = stock OK, Red dot = low stock (below reorder level).
 */
export function ProductStatusBadge({ quantity, reorderLevel }: ProductStatusBadgeProps) {
  const isLow = quantity <= reorderLevel;
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isLow ? 'bg-red-500' : 'bg-green-500'}`} />
      <span className={isLow ? 'text-red-600 font-medium' : ''}>
        {quantity} قطعة
      </span>
    </div>
  );
}
