import { formatCurrency } from '@/shared/utils/currency';
import { formatDate } from '@/shared/utils/date';
import { DrawerTransactionResponse } from '../schemas/financeSchemas';

interface DrawerTransactionsTableProps {
  transactions: DrawerTransactionResponse[];
}

export function DrawerTransactionsTable({ transactions }: DrawerTransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
        <p className="text-gray-500">لا توجد حركات مسجلة في هذه الوردية حتى الآن.</p>
      </div>
    );
  }

  // Type: 1 = Income, 2 = Expense
  // Category: 1 = Sales, 2 = Returns, 3 = Deposit, 4 = Withdrawal, 5 = Expense
  const getCategoryLabel = (category: number) => {
    switch (category) {
      case 1: return 'مبيعات';
      case 2: return 'مرتجعات';
      case 3: return 'إيداع نقدي';
      case 4: return 'سحب نقدي';
      case 5: return 'مصروفات';
      default: return 'أخرى';
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">الوقت</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">النوع</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">المبلغ</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">الرصيد بعد الحركة</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">المصدر / الملاحظات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((tx) => {
            const isIncome = tx.type === 1;
            return (
              <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-600" dir="ltr">
                  {formatDate(tx.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                    isIncome ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {getCategoryLabel(tx.category)}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800" dir="ltr">
                  <span className={isIncome ? 'text-green-600' : 'text-red-600'}>
                    {isIncome ? '+' : '-'} {formatCurrency(tx.amount)}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800" dir="ltr">
                  {formatCurrency(tx.balance)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {tx.notes || tx.source || '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
