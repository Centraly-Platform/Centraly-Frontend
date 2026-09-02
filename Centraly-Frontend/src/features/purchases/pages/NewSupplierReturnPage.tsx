import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useHeaderStore } from '@/shared/hooks/useHeaderStore';
import { useCreateSupplierReturn } from '../hooks/useSupplierReturns';
import { tokens } from '@/shared/styles/tokens';
import { useSuppliers } from '@/features/suppliers/hooks/useSuppliers';
import { Package, Trash2, AlertCircle, ShoppingCart } from 'lucide-react';
import { CreateSupplierReturnItemRequest } from '../schemas/supplierReturnSchemas';
import { formatCurrency } from '@/shared/utils/currency';
import { getApiErrorMessage } from '@/shared/utils/apiError';
import { SupplierBatchPickerModal } from '../components/SupplierBatchPickerModal';
import { SupplierBatchResponse } from '@/features/suppliers/schemas/supplierSchemas';
import { ReturnOptionsForm } from '@/features/sales/components/ReturnOptionsForm';
import { usePaymentSourcePrompt } from '@/features/finance/hooks/usePaymentSourcePrompt';

export function NewSupplierReturnPage() {
  const navigate = useNavigate();
  const { setTitle, setBackButton } = useHeaderStore();
  const createReturn = useCreateSupplierReturn();
  const { data: suppliersData, isLoading: isLoadingSuppliers } = useSuppliers({ pageSize: 100 });

  const [supplierId, setSupplierId] = useState('');
  const [reason, setReason] = useState<number>(1);
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<CreateSupplierReturnItemRequest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCashRefund, setIsCashRefund] = useState(false);
  const { promptPaymentSource, PaymentSourcePromptModal } = usePaymentSourcePrompt(4);

  useEffect(() => {
    setTitle('Ù…Ø±ØªØ¬Ø¹ Ù…ÙˆØ±Ø¯ Ø¬Ø¯ÙŠØ¯');
    setBackButton(true, '/purchases/returns');
  }, [setTitle, setBackButton]);

  const handleOpenModal = () => {
    if (!supplierId) {
      setError('ÙŠØ±Ø¬Ù‰ Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…ÙˆØ±Ø¯ Ø£ÙˆÙ„Ø§Ù‹ Ù‚Ø¨Ù„ Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ø£ØµÙ†Ø§Ù');
      return;
    }
    setError(null);
    setIsModalOpen(true);
  };

  const handleSelectBatch = (batch: SupplierBatchResponse) => {
    // Check if already added
    if (items.some(i => i.batchId === batch.batchId)) {
      alert('ØªÙ… Ø¥Ø¶Ø§ÙØ© Ù‡Ø°Ø§ Ø§Ù„ØµÙ†Ù Ù…Ø³Ø¨Ù‚Ø§Ù‹');
      return;
    }

    setItems([...items, { 
      productId: batch.productId, 
      batchId: batch.batchId, 
      quantity: 1, 
      returnPrice: batch.purchasePrice 
    }]);
    setIsModalOpen(false);
  };

  const handleUpdateItem = (index: number, field: keyof CreateSupplierReturnItemRequest, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!supplierId) return setError('ÙŠØ¬Ø¨ Ø§Ø®ØªÙŠØ§Ø± Ù…ÙˆØ±Ø¯');
    if (items.length === 0) return setError('ÙŠØ¬Ø¨ Ø¥Ø¶Ø§ÙØ© ØµÙ†Ù ÙˆØ§Ø­Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„');
    if (items.some(i => !i.productId || !i.batchId || i.quantity <= 0)) {
      return setError('ÙŠØ±Ø¬Ù‰ Ø§Ø³ØªÙƒÙ…Ø§Ù„ Ø¬Ù…ÙŠØ¹ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø£ØµÙ†Ø§Ù Ø¨Ø´ÙƒÙ„ ØµØ­ÙŠØ­ (Ù…Ø¹Ø±Ù Ø§Ù„Ù…Ù†ØªØ¬ ÙˆÙ…Ø¹Ø±Ù Ø§Ù„Ø¯ÙØ¹Ø© ÙˆØ§Ù„ÙƒÙ…ÙŠØ©)');
    }

    let finalPaymentSource: number | undefined;
    if (isCashRefund) {
      const sourceId = await promptPaymentSource();
      if (!sourceId) return;
      finalPaymentSource = sourceId;
    }

    createReturn.mutate(
      { supplierId, reason: reason as 1 | 2 | 3, notes, items, isCashRefund, paymentSource: finalPaymentSource },
      {
        onSuccess: () => {
          toast.success("ØªÙ… Ø­ÙØ¸ Ø§Ù„Ù…Ø±ØªØ¬Ø¹ Ø¨Ù†Ø¬Ø§Ø­!");
          navigate('/purchases/returns');
        },
        onError: (err: unknown) => setError(getApiErrorMessage(err, 'Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø­ÙØ¸ Ø§Ù„Ù…Ø±ØªØ¬Ø¹'))
      }
    );
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.returnPrice), 0);

  return (
    <div className="w-full space-y-6 pb-20">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-200">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      <form id="new-return-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Main Details */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø±ØªØ¬Ø¹ Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ©</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={`${tokens.font.label} block mb-2`}>Ø§Ù„Ù…ÙˆØ±Ø¯ <span className="text-red-500">*</span></label>
              <select
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                className={tokens.input}
                disabled={isLoadingSuppliers}
              >
                <option value="">-- Ø§Ø®ØªØ± Ø§Ù„Ù…ÙˆØ±Ø¯ --</option>
                {suppliersData?.items.map(s => (
                  <option key={s.supplierId} value={s.supplierId}>{s.name}</option>
                ))}
              </select>
            </div>

          </div>

          <ReturnOptionsForm
            reason={reason}
            onReasonChange={setReason}
            isCashRefund={isCashRefund}
            onCashRefundChange={setIsCashRefund}
            notes={notes}
            onNotesChange={setNotes}
          />
        </div>

        {/* Items */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-800">Ø§Ù„Ø£ØµÙ†Ø§Ù Ø§Ù„Ù…Ø±ØªØ¬Ø¹Ø© <span className="text-red-500">*</span></h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleOpenModal}
                className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ShoppingCart size={16} /> Ø§Ø®ØªÙŠØ§Ø± ØµÙ†Ù Ù…Ù† Ø§Ù„Ù…ÙˆØ±Ø¯
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex flex-wrap md:flex-nowrap items-end gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg relative group">
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="absolute top-2 left-2 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                  title="Ø­Ø°Ù Ø§Ù„ØµÙ†Ù"
                >
                  <Trash2 size={16} />
                </button>

                <div className="w-full md:w-1/3">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Ù…Ø¹Ø±Ù Ø§Ù„Ù…Ù†ØªØ¬ (ID)</label>
                  <input
                    type="text"
                    value={item.productId}
                    readOnly
                    className={tokens.input + ' py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed'}
                    placeholder="Product ID..."
                  />
                </div>
                
                <div className="w-full md:w-1/3">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Ù…Ø¹Ø±Ù Ø§Ù„Ø¯ÙØ¹Ø© (Batch ID)</label>
                  <input
                    type="text"
                    value={item.batchId}
                    readOnly
                    className={tokens.input + ' py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed'}
                    placeholder="Batch ID..."
                  />
                </div>

                <div className="w-1/2 md:w-24">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Ø§Ù„ÙƒÙ…ÙŠØ©</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || ''}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => handleUpdateItem(index, 'quantity', Number(e.target.value))}
                    className={tokens.input + ' py-2 text-sm text-center'}
                  />
                </div>

                <div className="w-1/2 md:w-32">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Ø³Ø¹Ø± Ø§Ù„Ø¥Ø±Ø¬Ø§Ø¹</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.returnPrice || ''}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => handleUpdateItem(index, 'returnPrice', Number(e.target.value))}
                    className={tokens.input + ' py-2 text-sm text-center'}
                  />
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="py-10 text-center border-2 border-dashed border-gray-200 rounded-xl">
                <Package size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">Ù„Ù… ÙŠØªÙ… Ø¥Ø¶Ø§ÙØ© Ø£ÙŠ Ø£ØµÙ†Ø§Ù Ù„Ù„Ù…Ø±ØªØ¬Ø¹.</p>
                <p className="text-sm text-gray-400 mt-1">Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø²Ø± Ø§Ù„Ø¥Ø¶Ø§ÙØ© Ù„Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ø£ØµÙ†Ø§Ù.</p>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:right-64 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-between items-center z-10">
        <div>
          <p className="text-sm text-gray-500 font-semibold">Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…Ø±ØªØ¬Ø¹</p>
          <p className="text-xl font-bold text-blue-700">{formatCurrency(totalAmount)}</p>
        </div>
        
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/purchases/returns')} className={tokens.btn.secondary}>
            Ø¥Ù„ØºØ§Ø¡
          </button>
          <button 
            type="submit" 
            form="new-return-form" 
            disabled={createReturn.isPending}
            className={`${tokens.btn.primary} disabled:opacity-50 min-w-[120px]`}
          >
            {createReturn.isPending ? 'Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø­ÙØ¸...' : 'Ø­ÙØ¸ Ø§Ù„Ù…Ø±ØªØ¬Ø¹'}
          </button>
        </div>
      </div>

      <SupplierBatchPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        supplierId={supplierId}
        onSelectBatch={handleSelectBatch}
      />
      <PaymentSourcePromptModal />
    </div>
  );
}
