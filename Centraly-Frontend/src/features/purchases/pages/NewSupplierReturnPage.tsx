import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderStore } from '@/shared/hooks/useHeaderStore';
import { useCreateSupplierReturn } from '../hooks/useSupplierReturns';
import { tokens } from '@/shared/styles/tokens';
import { useSuppliers } from '@/features/suppliers/hooks/useSuppliers';
import { Package, Trash2, Plus, AlertCircle } from 'lucide-react';
import { CreateSupplierReturnItemRequest } from '../schemas/supplierReturnSchemas';
import { formatCurrency } from '@/shared/utils/currency';

export function NewSupplierReturnPage() {
  const navigate = useNavigate();
  const { setTitle, setBackButton } = useHeaderStore();
  const createReturn = useCreateSupplierReturn();
  const { data: suppliersData, isLoading: isLoadingSuppliers } = useSuppliers({ pageSize: 100 });

  const [supplierId, setSupplierId] = useState('');
  const [reason, setReason] = useState<1 | 2 | 3>(1);
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<CreateSupplierReturnItemRequest[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle('مرتجع مورد جديد');
    setBackButton(true, '/purchases/returns');
  }, [setTitle, setBackButton]);

  const handleAddItem = () => {
    setItems([...items, { productId: '', batchId: '', quantity: 1, returnPrice: 0 }]);
  };

  const handleUpdateItem = (index: number, field: keyof CreateSupplierReturnItemRequest, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!supplierId) return setError('يجب اختيار مورد');
    if (items.length === 0) return setError('يجب إضافة صنف واحد على الأقل');
    if (items.some(i => !i.productId || !i.batchId || i.quantity <= 0)) {
      return setError('يرجى استكمال جميع بيانات الأصناف بشكل صحيح (معرف المنتج ومعرف الدفعة والكمية)');
    }

    createReturn.mutate(
      { supplierId, reason, notes, items },
      {
        onSuccess: () => navigate('/purchases/returns'),
        onError: (err: any) => setError(err.response?.data?.message || 'حدث خطأ أثناء حفظ المرتجع')
      }
    );
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.returnPrice), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-200">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      <form id="new-return-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Main Details */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">بيانات المرتجع الأساسية</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={`${tokens.font.label} block mb-2`}>المورد <span className="text-red-500">*</span></label>
              <select
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                className={tokens.input}
                disabled={isLoadingSuppliers}
              >
                <option value="">-- اختر المورد --</option>
                {suppliersData?.items.map(s => (
                  <option key={s.supplierId} value={s.supplierId}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`${tokens.font.label} block mb-2`}>سبب الإرجاع <span className="text-red-500">*</span></label>
              <select
                value={reason}
                onChange={(e) => setReason(Number(e.target.value) as 1 | 2 | 3)}
                className={tokens.input}
              >
                <option value={1}>عيب أو خلل في المنتج</option>
                <option value={2}>تغيير رأي</option>
                <option value={3}>سبب آخر</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`${tokens.font.label} block mb-2`}>ملاحظات إضافية</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={tokens.input}
              rows={2}
              placeholder="أي تفاصيل أخرى حول الإرجاع..."
            />
          </div>
        </div>

        {/* Items */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-800">الأصناف المرتجعة <span className="text-red-500">*</span></h2>
            <button
              type="button"
              onClick={handleAddItem}
              className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus size={16} /> إضافة صنف يدويًا
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex flex-wrap md:flex-nowrap items-end gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg relative group">
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="absolute top-2 left-2 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                  title="حذف الصنف"
                >
                  <Trash2 size={16} />
                </button>

                <div className="w-full md:w-1/3">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">معرف المنتج (ID)</label>
                  <input
                    type="text"
                    value={item.productId}
                    onChange={(e) => handleUpdateItem(index, 'productId', e.target.value)}
                    className={tokens.input + ' py-2 text-sm'}
                    placeholder="Product ID..."
                  />
                </div>
                
                <div className="w-full md:w-1/3">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">معرف الدفعة (Batch ID)</label>
                  <input
                    type="text"
                    value={item.batchId}
                    onChange={(e) => handleUpdateItem(index, 'batchId', e.target.value)}
                    className={tokens.input + ' py-2 text-sm'}
                    placeholder="Batch ID..."
                  />
                </div>

                <div className="w-1/2 md:w-24">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">الكمية</label>
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
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">سعر الإرجاع</label>
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
                <p className="text-gray-500">لم يتم إضافة أي أصناف للمرتجع.</p>
                <p className="text-sm text-gray-400 mt-1">اضغط على زر الإضافة لاختيار الأصناف.</p>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:right-64 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-between items-center z-10">
        <div>
          <p className="text-sm text-gray-500 font-semibold">إجمالي المرتجع</p>
          <p className="text-xl font-bold text-blue-700">{formatCurrency(totalAmount)}</p>
        </div>
        
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/purchases/returns')} className={tokens.btn.secondary}>
            إلغاء
          </button>
          <button 
            type="submit" 
            form="new-return-form" 
            disabled={createReturn.isPending}
            className={`${tokens.btn.primary} disabled:opacity-50 min-w-[120px]`}
          >
            {createReturn.isPending ? 'جاري الحفظ...' : 'حفظ المرتجع'}
          </button>
        </div>
      </div>
    </div>
  );
}
