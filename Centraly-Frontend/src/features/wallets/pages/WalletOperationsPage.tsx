import { useState, useEffect } from 'react';
import { useWallets } from '../hooks/useWallets';
import { WalletOperationType, WalletResponse } from '../schemas/walletSchemas';
import { tokens } from '@/shared/styles/tokens';
import { Wallet, CreditCard, Banknote, X, ArrowDownToLine, ArrowUpFromLine, Coins } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useHeaderStore } from '@/shared/hooks/useHeaderStore';

const operationSchema = z.object({
  walletId: z.string().min(1, 'الرجاء اختيار المحفظة'),
  operationType: z.nativeEnum(WalletOperationType),
  transferredAmount: z.coerce.number().min(0.01, 'المبلغ يجب أن يكون أكبر من 0'),
  physicalCashAmount: z.coerce.number().min(0.01, 'المبلغ يجب أن يكون أكبر من 0'),
  notes: z.string().optional(),
});

type OperationForm = z.infer<typeof operationSchema>;

export function WalletOperationsPage() {
  const { setTitle } = useHeaderStore();
  const { wallets, isLoading, processOperation, isProcessing } = useWallets();
  const [selectedWallet, setSelectedWallet] = useState<WalletResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTitle('عمليات المحافظ');
  }, [setTitle]);

  const form = useForm<OperationForm>({
    resolver: zodResolver(operationSchema) as any,
    defaultValues: {
      walletId: '',
      operationType: WalletOperationType.CashIn,
      transferredAmount: 0,
      physicalCashAmount: 0,
      notes: ''
    }
  });

  const { watch, handleSubmit, reset } = form;
  const operationType = watch('operationType');
  const transferredAmount = watch('transferredAmount') || 0;
  const physicalCashAmount = watch('physicalCashAmount') || 0;

  // profit = (Cash received by store) - (Cash sent to customer/wallet)
  // For CashIn (Deposit): We take physicalCash, and we transfer money to wallet. Profit = physicalCash - transferred
  // For CashOut (Withdrawal): We receive transfer, and we give physicalCash. Profit = transferred - physicalCash
  const profit = operationType === WalletOperationType.CashIn 
    ? Number(physicalCashAmount) - Number(transferredAmount)
    : Number(transferredAmount) - Number(physicalCashAmount);

  const openOperationModal = (wallet: WalletResponse, type: WalletOperationType) => {
    setSelectedWallet(wallet);
    reset({
      walletId: wallet.id,
      operationType: type,
      transferredAmount: 0,
      physicalCashAmount: 0,
      notes: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWallet(null);
  };

  const onSubmit = (data: OperationForm) => {
    processOperation({
      walletId: data.walletId,
      operationType: data.operationType,
      transferredAmount: Number(data.transferredAmount),
      physicalCashAmount: Number(data.physicalCashAmount),
      notes: data.notes || null,
    }, {
      onSuccess: () => {
        closeModal();
      }
    });
  };

  const activeWallets = wallets.filter(w => w.isActive);

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {isLoading ? (
        <div className="flex items-center justify-center h-full min-h-[400px]">
          <div className="text-center text-gray-500 py-12">جاري تحميل المحافظ...</div>
        </div>
      ) : activeWallets.length === 0 ? (
        <div className="flex items-center justify-center h-full min-h-[400px]">
          <div className="text-center text-red-500 py-12">
            لا يوجد محافظ نشطة مسجلة! يرجى إضافة محفظة أولاً من الإعدادات.
          </div>
        </div>
      ) : (
        <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 content-start max-w-screen-2xl mx-auto">
            {activeWallets.map(wallet => (
              <div 
                key={wallet.id} 
                className="bg-white rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all overflow-hidden flex flex-col p-4 sm:p-5 relative"
              >
                <div className="h-28 sm:h-36 flex items-center justify-center mb-3 mt-2">
                  {wallet.imageUrl ? (
                    <img src={wallet.imageUrl} alt={wallet.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  ) : (
                    <Wallet size={56} className="text-gray-200" />
                  )}
                </div>
                
                <div className="flex flex-col flex-1 items-center text-center">
                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2 line-clamp-1 leading-snug">
                    {wallet.name}
                  </h3>
                  <div className="bg-gray-50/80 px-4 py-2 rounded-xl mb-5 border border-gray-100 shadow-sm">
                    <p className="text-[20px] sm:text-[22px] font-black text-[#0f8e4c] tracking-[0.15em]" dir="ltr">
                      {wallet.phoneNumber}
                    </p>
                  </div>
                  
                  <div className="mt-auto mb-5 font-bold text-[16px] sm:text-[20px] text-[#0f8e4c] bg-[#e6f4ed] px-5 py-2 rounded-xl border border-[#0f8e4c]/20 flex items-center justify-center gap-2">
                    <Coins size={22} className="text-[#0f8e4c]" />
                    الرصيد: {Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(wallet.balance)}
                  </div>

                  <div className="w-full flex gap-2 sm:gap-3">
                    <button 
                      onClick={() => openOperationModal(wallet, WalletOperationType.CashOut)}
                      className="flex-1 py-2 sm:py-3 rounded-xl text-sm sm:text-[15px] font-bold flex items-center justify-center gap-2 transition-all bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 shadow-sm"
                    >
                      <ArrowUpFromLine size={18} />
                      سحب
                    </button>
                    <button 
                      onClick={() => openOperationModal(wallet, WalletOperationType.CashIn)}
                      className="flex-1 py-2 sm:py-3 rounded-xl text-sm sm:text-[15px] font-bold flex items-center justify-center gap-2 transition-all bg-[#0f8e4c] hover:bg-[#0c7a40] text-white shadow-sm"
                    >
                      <ArrowDownToLine size={18} />
                      إيداع
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedWallet && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          onMouseDown={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="p-4 text-white flex justify-between items-center bg-[#0f8e4c]">
              <h2 className="text-lg font-bold flex items-center gap-2">
                {operationType === WalletOperationType.CashIn ? <CreditCard size={20} /> : <Banknote size={20} />}
                {operationType === WalletOperationType.CashIn ? 'عملية إيداع' : 'عملية سحب'} - {selectedWallet.name}
              </h2>
              <button onClick={closeModal} className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-5">
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {operationType === WalletOperationType.CashIn ? 'هتحول كام للمحفظة؟ *' : 'الزبون حولك كام؟ *'}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...form.register('transferredAmount')}
                    onFocus={(e) => e.target.select()}
                    className={tokens.input + " h-12 text-xl font-mono text-center focus:ring-[#0f8e4c] focus:border-[#0f8e4c] bg-gray-50"}
                    placeholder="0.00"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {operationType === WalletOperationType.CashIn ? 'أخدت كاش كام من الزبون؟ *' : 'هتدي للزبون كاش كام؟ *'}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...form.register('physicalCashAmount')}
                    onFocus={(e) => e.target.select()}
                    className={tokens.input + " h-12 text-xl font-mono text-center focus:ring-[#0f8e4c] focus:border-[#0f8e4c] bg-gray-50"}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="flex justify-between px-2">
                  <div className="w-1/2 text-center">
                    {form.formState.errors.transferredAmount && (
                      <p className="text-red-500 text-xs mt-1">{form.formState.errors.transferredAmount.message}</p>
                    )}
                  </div>
                  <div className="w-1/2 text-center">
                    {form.formState.errors.physicalCashAmount && (
                      <p className="text-red-500 text-xs mt-1">{form.formState.errors.physicalCashAmount.message}</p>
                    )}
                  </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">رقم الموبايل / ملاحظات (اختياري)</label>
                <input
                  {...form.register('notes')}
                  className={tokens.input + " h-10 focus:ring-[#0f8e4c] focus:border-[#0f8e4c]"}
                  placeholder="ملاحظات..."
                />
              </div>

              <div className={`p-3 rounded-xl border flex justify-between items-center ${profit > 0 ? 'bg-[#e6f4ed] border-[#0f8e4c]/30 text-[#0f8e4c]' : profit < 0 ? 'bg-red-50 border-red-200 text-red-800' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                <span className="font-bold text-sm">صافي الربح:</span>
                <span className="text-xl font-black font-mono dir-ltr">{profit > 0 ? '+' : ''}{profit.toFixed(2)}</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors text-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`flex-2 px-4 py-3 text-white rounded-xl font-bold transition-colors disabled:opacity-60 flex-[2] text-sm bg-[#0f8e4c] hover:bg-[#0c7a40]`}
                >
                  {isProcessing ? 'جاري التنفيذ...' : 'تأكيد العملية'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
