import { formatCurrency } from '@/shared/utils/currency';
import { formatDate } from '@/shared/utils/date';
import { SafeTransactionResponse } from '../schemas/financeSchemas';

interface SafeTransactionsTableProps {
  transactions: SafeTransactionResponse[];
}

export function SafeTransactionsTable({ transactions }: SafeTransactionsTableProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
        <p className="text-gray-500">Ù„Ø§ ØªÙˆØ¬Ø¯ Ø­Ø±ÙƒØ§Øª Ù…Ø³Ø¬Ù„Ø© ÙÙŠ Ù‡Ø°Ù‡ Ø§Ù„Ø®Ø²ÙŠÙ†Ø© Ø­ØªÙ‰ Ø§Ù„Ø¢Ù†.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Ø§Ù„ÙˆÙ‚Øª</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Ø§Ù„Ù†ÙˆØ¹</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Ø§Ù„ØªØµÙ†ÙŠÙ</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Ø§Ù„Ù…Ø¨Ù„Øº</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Ø§Ù„Ø±ØµÙŠØ¯ Ø¨Ø¹Ø¯ Ø§Ù„Ø­Ø±ÙƒØ©</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Ø§Ù„Ù…Ù„Ø§Ø­Ø¸Ø§Øª</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((tx) => {
            // Assuming transactionType is string like 'Income' or 'Deposit' or numbers as strings. If backend sends numbers or text, adjust appropriately.
            // If it's something like "Ø¥ÙŠØ¯Ø§Ø¹" or "Ø³Ø­Ø¨":
            const isIncome = tx.transactionType === 'Income' || tx.amount > 0; 
            
            return (
              <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-600" dir="ltr">
                  {formatDate(tx.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                    isIncome ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {tx.transactionType}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {tx.category}
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800" dir="ltr">
                  <span className={isIncome ? 'text-green-600' : 'text-red-600'}>
                    {isIncome ? '+' : '-'} {formatCurrency(Math.abs(tx.amount))}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800" dir="ltr">
                  {formatCurrency(tx.balanceAfter)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {tx.notes || '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

