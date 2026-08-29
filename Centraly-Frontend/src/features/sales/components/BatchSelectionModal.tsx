import { Building2 } from 'lucide-react';
import { ProductResponse, ProductBatchResponse } from '@/features/inventory/schemas/inventorySchemas';
import { formatCurrency } from '@/shared/utils/currency';
import { BaseModal } from '@/shared/components/ui/BaseModal';

interface BatchSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductResponse | null;
  onSelectBatch: (batch: ProductBatchResponse, selectedPrice: number) => void;
}

export function BatchSelectionModal({ isOpen, onClose, product, onSelectBatch }: BatchSelectionModalProps) {
  if (!product) return null;

  const availableBatches = product.batches.filter((b) => b.availableQuantity > 0);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="اختيار الشركة والسعر" subtitle={product.name} size="3xl">
      <div className="p-6">
        {availableBatches.length === 0 ? (
          <div className="text-center py-10 text-[var(--color-text-muted)] font-medium">
            لا توجد دفعات متاحة لهذا المنتج في المخزون.
          </div>
        ) : (
          <div className="space-y-3">
            {availableBatches.map((batch) => (
              <div
                key={batch.batchId}
                className="flex items-center justify-between p-4 bg-white border border-[var(--color-border)] rounded-xl gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
                    <Building2 size={24} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-[var(--color-text-main)] truncate">
                      {batch.supplierName || 'بدون مورد'}
                    </h4>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      تاريخ: {new Date(batch.dateReceived).toLocaleDateString('ar-EG')} • متاح {batch.availableQuantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelectBatch(batch, batch.wholesalePrice)}
                    className="flex items-center justify-between w-[160px] p-3 bg-white hover:bg-gray-50 border-2 border-[var(--color-border)] hover:border-emerald-600 text-[var(--color-text-main)] rounded-xl transition-colors"
                  >
                    <span className="text-sm font-bold text-[var(--color-text-muted)]">جملة</span>
                    <span className="font-bold">{formatCurrency(batch.wholesalePrice)}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectBatch(batch, batch.retailPrice)}
                    className="flex items-center justify-between w-[160px] p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                  >
                    <span className="text-sm font-bold">تجزئة</span>
                    <span className="font-bold">{formatCurrency(batch.retailPrice)}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseModal>
  );
}
