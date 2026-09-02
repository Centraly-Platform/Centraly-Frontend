import { useState, useEffect } from 'react';
import { User, Phone, Banknote } from 'lucide-react';
import { PaymentMethod, SaleType } from '../schemas/salesSchemas';
import { PaymentSource } from '@/features/finance/schemas/financeSchemas';
import { usePaymentSourcePrompt } from '@/features/finance/hooks/usePaymentSourcePrompt';
import { tokens } from '@/shared/styles/tokens';
import { formatCurrency } from '@/shared/utils/currency';
import { BaseModal } from '@/shared/components/ui/BaseModal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  paymentMethod: PaymentMethod | null;
  onConfirm: (customerName: string, customerPhone: string, paidAmount: number, paymentSource?: PaymentSource, saleType?: SaleType) => void;
  isSubmitting: boolean;
}

export function CheckoutModal({
  isOpen,
  onClose,
  totalAmount,
  paymentMethod,
  onConfirm,
  isSubmitting,
}: CheckoutModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [saleType, setSaleType] = useState<SaleType>(SaleType.Retail);
  const [paidAmount, setPaidAmount] = useState<number | string>(totalAmount);
  const [error, setError] = useState('');

  const { promptPaymentSource, PaymentSourcePromptModal, isPoliciesLoading } = usePaymentSourcePrompt(1); // GlobalTransactionCategory.CashSale

  useEffect(() => {
    if (isOpen) {
      setCustomerName('');
      setCustomerPhone('');
      setPaidAmount(paymentMethod === PaymentMethod.Cash ? totalAmount : 0);
      setError('');
    }
  }, [isOpen, paymentMethod, totalAmount]);

  if (!paymentMethod) return null;

  const isCredit = paymentMethod === PaymentMethod.Deferred;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const paid = Number(paidAmount);
    if (isNaN(paid) || paid < 0) {
      setError('ÙŠØ±Ø¬Ù‰ Ø¥Ø¯Ø®Ø§Ù„ Ù…Ø¨Ù„Øº Ø¯ÙØ¹ ØµØ­ÙŠØ­');
      return;
    }

    if (isCredit) {
      if (!customerName.trim() || !customerPhone.trim()) {
        setError('ÙŠØ¬Ø¨ Ø¥Ø¯Ø®Ø§Ù„ Ø§Ø³Ù… Ø§Ù„Ø¹Ù…ÙŠÙ„ ÙˆØ±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ ÙÙŠ Ø­Ø§Ù„Ø© Ø§Ù„Ø¨ÙŠØ¹ Ø§Ù„Ø¢Ø¬Ù„');
        return;
      }
      if (paid >= totalAmount) {
        setError('Ù„Ø§ ÙŠÙ…ÙƒÙ† Ø£Ù† ÙŠÙƒÙˆÙ† Ø§Ù„Ù…Ø¨Ù„Øº Ø§Ù„Ù…Ø¯ÙÙˆØ¹ Ø£ÙƒØ¨Ø± Ù…Ù† Ø£Ùˆ ÙŠØ³Ø§ÙˆÙŠ Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ ÙÙŠ Ø­Ø§Ù„Ø© Ø§Ù„Ø¨ÙŠØ¹ Ø§Ù„Ø¢Ø¬Ù„');
        return;
      }
    } else if (paid < totalAmount) {
      setError('ÙÙŠ Ø­Ø§Ù„Ø© Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ù†Ù‚Ø¯ÙŠ ÙŠØ¬Ø¨ Ø¯ÙØ¹ Ø§Ù„Ù…Ø¨Ù„Øº ÙƒØ§Ù…Ù„Ø§Ù‹');
      return;
    }

    let finalSource: PaymentSource | undefined = undefined;
    if (paid > 0) {
      const source = await promptPaymentSource();
      if (!source) return; // User closed the prompt
      finalSource = source;
    }

    onConfirm(customerName, customerPhone, isCredit ? paid : totalAmount, finalSource, saleType);
  };

  return (
    <>
      <PaymentSourcePromptModal />
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title={isCredit ? 'Ø¥ØªÙ…Ø§Ù… Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ø¢Ø¬Ù„' : 'Ø¥ØªÙ…Ø§Ù… Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ù†Ù‚Ø¯ÙŠ'}
        size="md"
        zIndexClassName="z-[60]"
        headerClassName={isCredit ? 'bg-amber-50' : 'bg-emerald-50'}
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-[var(--color-page-bg)] p-4 rounded-xl flex items-center justify-between border border-[var(--color-border)]">
            <span className="text-[var(--color-text-muted)] font-semibold">Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…Ø·Ù„ÙˆØ¨:</span>
            <span className="text-2xl font-bold text-[var(--color-text-main)]">{formatCurrency(totalAmount)}</span>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-[var(--color-danger)] rounded-lg text-sm font-semibold text-center border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-[var(--color-text-main)] mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                نوع الفاتورة
              </span>
            </label>
            <select
              value={saleType}
              onChange={(e) => setSaleType(Number(e.target.value) as SaleType)}
              className={tokens.input + ' py-3 mb-4'}
            >
              <option value={SaleType.Retail}>قطاعي (تجزئة)</option>
              <option value={SaleType.Wholesale}>جملة</option>
            </select>
          </div>
          <div>`n            <label className="text-sm font-semibold text-[var(--color-text-main)] mb-2 flex items-center justify-between">`n              <span className="flex items-center gap-1.5">`n                <Phone size={16} /> Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ
              </span>
              {isCredit && <span className="text-[var(--color-danger)]">*</span>}
            </label>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Ù…Ø«Ø§Ù„: 010xxxxxxxx"
              className={tokens.input + ' py-3 text-left'}
              required={isCredit}
              dir="ltr"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[var(--color-text-main)] mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User size={16} /> Ø§Ø³Ù… Ø§Ù„Ø¹Ù…ÙŠÙ„
              </span>
              {isCredit && <span className="text-[var(--color-danger)]">*</span>}
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ù…Ø«Ø§Ù„: Ø£Ø­Ù…Ø¯ Ù…Ø­Ù…Ø¯"
              className={tokens.input + ' py-3'}
              required={isCredit}
            />
          </div>

          {isCredit && (
            <div className="pt-2 border-t border-[var(--color-border)]">
              <label className="text-sm font-semibold text-[var(--color-text-main)] mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Banknote size={16} /> Ø§Ù„Ù…Ø¨Ù„Øº Ø§Ù„Ù…Ø¯ÙÙˆØ¹ Ø§Ù„Ø¢Ù†
                </span>
                <span className="text-[var(--color-danger)]">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                onFocus={() => {
                  if (paidAmount === 0 || paidAmount === '0') setPaidAmount('');
                }}
                onBlur={(e) => {
                  if (e.target.value === '') setPaidAmount(0);
                }}
                className={`${tokens.input} py-3 text-xl font-bold text-[var(--color-primary)] text-left`}
                required
                dir="ltr"
              />
              {Number(paidAmount) >= 0 && Number(paidAmount) < totalAmount && (
                <p className="text-sm text-amber-700 mt-2.5 font-bold">
                  Ø§Ù„Ù…ØªØ¨Ù‚ÙŠ ÙƒÙ…Ø¯ÙŠÙˆÙ†ÙŠØ©: {formatCurrency(totalAmount - Number(paidAmount))}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isPoliciesLoading}
            className={`w-full py-3.5 rounded-xl font-bold text-white text-lg disabled:opacity-70 ${
              isCredit ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isSubmitting ? 'Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ£ÙƒÙŠØ¯...' : 'ØªØ£ÙƒÙŠØ¯ ÙˆØ­ÙØ¸ Ø§Ù„ÙØ§ØªÙˆØ±Ø©'}
          </button>
        </form>
      </BaseModal>
    </>
  );
}

