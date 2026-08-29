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
        <p className="text-gray-500">لا توجد حركات مسجلة في هذه الخزينة حتى الآن.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">الوقت</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">النوع</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">التصنيف</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">المبلغ</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">الرصيد بعد الحركة</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">الملاحظات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((tx) => {
            // Assuming transactionType is string like 'Income' or 'Deposit' or numbers as strings. If backend sends numbers or text, adjust appropriately.
            // If it's something like "إيداع" or "سحب":
            const isIncome = tx.transactionType === 'إيداع' || tx.transactionType === '1' || tx.amount > 0; 
            
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
