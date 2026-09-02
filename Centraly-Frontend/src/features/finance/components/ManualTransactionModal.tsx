import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseModal } from '@/shared/components/ui/BaseModal';
import { addManualTransactionSchema, AddManualTransactionRequest } from '../schemas/financeSchemas';
import { useAddDrawerTransaction } from '../hooks/useFinance';
import { tokens } from '@/shared/styles/tokens';

interface ManualTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManualTransactionModal({ isOpen, onClose }: ManualTransactionModalProps) {
  const addTransaction = useAddDrawerTransaction();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddManualTransactionRequest>({
    resolver: zodResolver(addManualTransactionSchema),
    defaultValues: { type: 1, category: 3, amount: 0, notes: '', source: '' }
  });

  const transactionType = watch('type');

  const onSubmit = (data: AddManualTransactionRequest) => {
    // Override category just to be safe
    data.category = 6; // 6 = Operational
    addTransaction.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      }
    });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Ø¥Ø¶Ø§ÙØ© Ù…Ø¹Ø§Ù…Ù„Ø© ÙŠØ¯ÙˆÙŠØ© Ù„Ù„Ø¯Ø±Ø¬">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Type Selection */}
        <div className="grid grid-cols-2 gap-3">
          <label 
            onClick={() => { setValue('type', 1, { shouldValidate: true }); setValue('category', 3); }}
            className={`
            cursor-pointer rounded-xl border-2 p-4 text-center transition-all
            ${transactionType === 1 ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:border-gray-300'}
          `}>
            <div className="font-semibold text-lg">Ø¥ÙŠØ¯Ø§Ø¹ Ù†Ù‚Ø¯ÙŠ</div>
            <div className="text-sm opacity-80 mt-1">Ø¥Ø¶Ø§ÙØ© ÙÙ„ÙˆØ³ Ù„Ù„Ø¯Ø±Ø¬</div>
          </label>
          <label 
            onClick={() => { setValue('type', 2, { shouldValidate: true }); setValue('category', 4); }}
            className={`
            cursor-pointer rounded-xl border-2 p-4 text-center transition-all
            ${transactionType === 2 ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 hover:border-gray-300'}
          `}>
            <div className="font-semibold text-lg">Ø³Ø­Ø¨ Ù†Ù‚Ø¯ÙŠ</div>
            <div className="text-sm opacity-80 mt-1">Ø£Ø®Ø° ÙÙ„ÙˆØ³ Ù…Ù† Ø§Ù„Ø¯Ø±Ø¬</div>
          </label>
        </div>

        <div>
          <label className={tokens.font.label + " block mb-1.5"}>Ø§Ù„Ù…Ø¨Ù„Øº (Ø¬.Ù…)</label>
          <input
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            onFocus={(e) => e.target.value === '0' && (e.target.value = '')}
            className={tokens.input}
            placeholder="0.00"
          />
          {errors.amount && <p className="text-red-500 text-xs mt-1">{String(errors.amount.message)}</p>}
        </div>

        <div>
          <label className={tokens.font.label + " block mb-1.5"}>Ø§Ù„Ø¨ÙŠØ§Ù† / Ø§Ù„Ø³Ø¨Ø¨</label>
          <input
            type="text"
            {...register('notes')}
            className={tokens.input}
            placeholder="Ù…Ø«Ø§Ù„: ÙÙƒØ© Ø¥Ø¶Ø§ÙÙŠØ©ØŒ Ø´Ø±Ø§Ø¡ Ø´Ø§ÙŠ..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 mt-2">
          <button type="button" onClick={onClose} className={tokens.btn.ghost}>
            Ø¥Ù„ØºØ§Ø¡
          </button>
          <button
            type="submit"
            disabled={addTransaction.isPending}
            className={tokens.btn.primary}
          >
            {addTransaction.isPending ? 'Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø­ÙØ¸...' : 'Ø­ÙØ¸ Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø©'}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}

