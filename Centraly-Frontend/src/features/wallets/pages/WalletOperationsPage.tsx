import { useState, useMemo } from 'react';
import { useWallets } from '../hooks/useWallets';
import { WalletOperationType } from '../schemas/walletSchemas';
import { tokens } from '@/shared/styles/tokens';
import { Wallet, ArrowRightLeft, CreditCard, Banknote } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const operationSchema = z.object({
  walletId: z.string().min(1, 'الرجاء اختيار المحفظة'),
  operationType: z.nativeEnum(WalletOperationType),
  transferredAmount: z.coerce.number().min(0.01, 'المبلغ يجب أن يكون أكبر من 0'),
  physicalCashAmount: z.coerce.number().min(0.01, 'المبلغ يجب أن يكون أكبر من 0'),
  notes: z.string().nullable().optional(),
});

type OperationForm = z.infer<typeof operationSchema>;

export function WalletOperationsPage() {
  const { wallets, isLoading, processOperation, isProcessing } = useWallets();

  const form = useForm<OperationForm>({
    resolver: zodResolver(operationSchema),
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

  const profit = useMemo(() => {
    if (operationType === WalletOperationType.CashIn) {
      // CashIn: Customer gives physical cash, gets transferred amount
      // Profit = Physical Cash - Transferred Amount
      return physicalCashAmount - transferredAmount;
    } else {
      // CashOut: Customer sends transferred amount, gets physical cash
      // Profit = Transferred Amount - Physical Cash
      return transferredAmount - physicalCashAmount;
    }
  }, [operationType, transferredAmount, physicalCashAmount]);

  const onSubmit = (data: OperationForm) => {
    processOperation(data, {
      onSuccess: () => {
        reset();
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800">عمليات المحافظ</h1>
          <p className="text-sm text-gray-500 mt-1">إيداع وسحب من المحافظ الإلكترونية</p>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
          <ArrowRightLeft size={24} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {isLoading ? (
          <div className="text-center text-gray-500 py-8">جاري تحميل المحافظ...</div>
        ) : wallets.length === 0 ? (
          <div className="text-center text-red-500 py-8">لا يوجد محافظ مسجلة! يرجى إضافة محفظة أولاً من الإعدادات.</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wallet Select */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">المحفظة *</label>
                <div className="relative">
                  <select
                    {...form.register('walletId')}
                    className={tokens.input.base + " pl-10 h-12 text-lg"}
                  >
                    <option value="">اختر المحفظة...</option>
                    {wallets.filter(w => w.isActive).map(wallet => (
                      <option key={wallet.id} value={wallet.id}>
                        {wallet.name} (الرصيد: {wallet.balance.toFixed(2)})
                      </option>
                    ))}
                  </select>
                  <Wallet className="absolute left-3 top-3.5 text-gray-400" size={20} />
                </div>
                {form.formState.errors.walletId && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.walletId.message}</p>
                )}
              </div>

              {/* Operation Type Radio */}
              <div className="col-span-1 md:col-span-2 flex gap-4">
                <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  operationType === WalletOperationType.CashIn 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-blue-200'
                }`}>
                  <input
                    type="radio"
                    value={WalletOperationType.CashIn}
                    {...form.register('operationType', { valueAsNumber: true })}
                    className="sr-only"
                  />
                  <CreditCard size={20} />
                  <span className="font-bold">إيداع في المحفظة (Cash-In)</span>
                </label>

                <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  operationType === WalletOperationType.CashOut 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-gray-200 hover:border-purple-200'
                }`}>
                  <input
                    type="radio"
                    value={WalletOperationType.CashOut}
                    {...form.register('operationType', { valueAsNumber: true })}
                    className="sr-only"
                  />
                  <Banknote size={20} />
                  <span className="font-bold">سحب من المحفظة (Cash-Out)</span>
                </label>
              </div>

              {/* Amounts */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المبلغ المحول إلكترونياً *</label>
                <input
                  type="number"
                  step="0.01"
                  {...form.register('transferredAmount')}
                  className={tokens.input.base + " h-14 text-2xl font-mono"}
                  placeholder="0.00"
                />
                {form.formState.errors.transferredAmount && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.transferredAmount.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المبلغ الكاش *</label>
                <input
                  type="number"
                  step="0.01"
                  {...form.register('physicalCashAmount')}
                  className={tokens.input.base + " h-14 text-2xl font-mono"}
                  placeholder="0.00"
                />
                {form.formState.errors.physicalCashAmount && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.physicalCashAmount.message}</p>
                )}
              </div>

              {/* Notes */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم الموبايل / ملاحظات</label>
                <input
                  {...form.register('notes')}
                  className={tokens.input.base}
                  placeholder="010..."
                />
              </div>
            </div>

            {/* Profit display */}
            <div className={`p-6 rounded-xl border ${profit > 0 ? 'bg-green-50 border-green-200 text-green-800' : profit < 0 ? 'bg-red-50 border-red-200 text-red-800' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">الربح المحسوب للعملية:</span>
                <span className="text-3xl font-bold font-mono dir-ltr">{profit > 0 ? '+' : ''}{profit.toFixed(2)}</span>
              </div>
              <p className="text-sm mt-2 opacity-80">
                {operationType === WalletOperationType.CashIn 
                  ? "حساب الإيداع: المبلغ الكاش المدفوع من العميل - المبلغ المحول إلكترونياً للمحفظة"
                  : "حساب السحب: المبلغ المحول إلكترونياً من العميل - المبلغ الكاش المسلم للعميل"}
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={tokens.btn.primary + " w-full h-14 text-lg font-bold disabled:opacity-60"}
            >
              {isProcessing ? 'جاري تنفيذ العملية...' : 'تأكيد العملية'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
