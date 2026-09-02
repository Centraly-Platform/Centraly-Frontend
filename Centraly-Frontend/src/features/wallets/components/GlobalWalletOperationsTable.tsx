import { useState } from 'react';
import { useGlobalWalletOperations } from '../hooks/useGlobalWalletOperations';
import { useWallets } from '../hooks/useWallets';
import { tokens } from '@/shared/styles/tokens';
import { ArrowDownToLine, ArrowUpFromLine, ChevronLeft, ChevronRight, Filter, TrendingUp } from 'lucide-react';
import { formatDate } from '@/shared/utils/date';
import { WalletOperationType, WalletOperationResponse } from '../schemas/walletSchemas';

export function GlobalWalletOperationsTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [operationType, setOperationType] = useState<WalletOperationType | ''>('');
  const [walletId, setWalletId] = useState('');

  const { wallets } = useWallets();

  const { operations, totalPages, isLoadingOperations, totalProfit } = useGlobalWalletOperations({
    pageNumber,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    operationType: operationType !== '' ? operationType : undefined,
    walletId: walletId || undefined
  });

  const isProfitable = totalProfit >= 0;

  return (
    <div className="space-y-6">
      
      {/* Top Summary Card */}
      <div className={`bg-white rounded-2xl shadow-sm border p-6 flex items-center justify-between gap-4 ${isProfitable ? 'border-green-100' : 'border-red-100'}`}>
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">صافي الأرباح (للفلتر الحالي)</h2>
          <p className="text-gray-500 text-sm">يتم حسابه بناءً على العمليات المعروضة فقط</p>
        </div>
        <div className="flex items-center gap-4">
          <p className={`text-4xl font-black font-mono dir-ltr ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
            {isProfitable ? '+' : ''}{(totalProfit || 0).toFixed(2)}
          </p>
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${isProfitable ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            <TrendingUp size={28} />
          </div>
        </div>
      </div>

      {/* Operations Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm min-w-[150px]">
              <Filter size={16} className="text-gray-400 shrink-0" />
              <select
                value={walletId}
                onChange={e => { setWalletId(e.target.value); setPageNumber(1); }}
                className="bg-transparent border-none text-sm focus:ring-0 text-gray-600 py-0 w-full"
              >
                <option value="">كل المحافظ</option>
                {wallets.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
              <Filter size={16} className="text-gray-400 shrink-0" />
              <select
                value={operationType}
                onChange={e => { setOperationType(e.target.value ? Number(e.target.value) : ''); setPageNumber(1); }}
                className="bg-transparent border-none text-sm focus:ring-0 text-gray-600 py-0"
              >
                <option value="">كل العمليات</option>
                <option value={WalletOperationType.CashIn}>إيداع</option>
                <option value={WalletOperationType.CashOut}>سحب</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateFrom}
                onChange={e => { setDateFrom(e.target.value); setPageNumber(1); }}
                className={tokens.input + " py-1.5 text-sm w-auto"}
                title="من تاريخ"
              />
              <span className="text-gray-400">-</span>
              <input
                type="date"
                value={dateTo}
                onChange={e => { setDateTo(e.target.value); setPageNumber(1); }}
                className={tokens.input + " py-1.5 text-sm w-auto"}
                title="إلى تاريخ"
              />
            </div>
          </div>
        </div>
        
        {isLoadingOperations ? (
          <div className="p-8 text-center text-gray-500">جاري تحميل السجل...</div>
        ) : operations.length === 0 ? (
          <div className="p-12 text-center text-gray-400">لا يوجد عمليات تطابق البحث</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-white text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">التاريخ</th>
                  <th className="px-6 py-4 font-semibold">المحفظة</th>
                  <th className="px-6 py-4 font-semibold">نوع العملية</th>
                  <th className="px-6 py-4 font-semibold">المبلغ المحول</th>
                  <th className="px-6 py-4 font-semibold">المبلغ الكاش</th>
                  <th className="px-6 py-4 font-semibold">الربح</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {operations.map((op: WalletOperationResponse) => {
                  const isDeposit = op.operationType === WalletOperationType.CashIn;
                  const wallet = wallets.find(w => w.id === op.walletId);
                  return (
                    <tr key={op.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 text-slate-600">{formatDate(op.createdAt)}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">{wallet?.name || 'غير معروف'}</td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${isDeposit ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                          {isDeposit ? <ArrowDownToLine size={14} /> : <ArrowUpFromLine size={14} />}
                          {isDeposit ? 'إيداع' : 'سحب'}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono font-medium text-slate-700">{op.transferredAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 font-mono font-medium text-slate-700">{op.physicalCashAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 font-mono font-bold">
                        <span className={op.profit > 0 ? 'text-green-600' : op.profit < 0 ? 'text-red-600' : 'text-gray-400'}>
                          {op.profit > 0 ? '+' : ''}{op.profit.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="border-t border-gray-100 p-4 bg-white flex items-center justify-center gap-4">
            <button
              disabled={pageNumber === 1}
              onClick={() => setPageNumber(p => Math.max(1, p - 1))}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
            <span className="font-semibold text-gray-700 text-sm">
              صفحة {pageNumber} من {totalPages}
            </span>
            <button
              disabled={pageNumber === totalPages}
              onClick={() => setPageNumber(p => Math.min(totalPages, p + 1))}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
