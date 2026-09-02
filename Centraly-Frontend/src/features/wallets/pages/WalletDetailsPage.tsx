import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWalletDetails } from '../hooks/useWalletDetails';
import { useHeaderStore } from '@/shared/hooks/useHeaderStore';
import { Wallet, ArrowDownToLine, ArrowUpFromLine, ChevronLeft, ChevronRight, TrendingUp, Filter } from 'lucide-react';
import { formatDate } from '@/shared/utils/date';
import { WalletOperationType, WalletOperationResponse } from '../schemas/walletSchemas';
import { tokens } from '@/shared/styles/tokens';

export function WalletDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { setTitle, setBackButton } = useHeaderStore();
  
  const [pageNumber, setPageNumber] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [operationType, setOperationType] = useState<WalletOperationType | ''>('');

  const { wallet, isLoadingWallet, operations, totalPages, isLoadingOperations } = useWalletDetails(id || '', {
    pageNumber,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    operationType: operationType !== '' ? operationType : undefined
  });

  useEffect(() => {
    setTitle('ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ø­ÙØ¸Ø©');
    setBackButton(true, '/settings/wallets');
    return () => setBackButton(false);
  }, [setTitle, setBackButton]);

  if (isLoadingWallet) {
    return <div className="p-8 text-center text-gray-500">Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª...</div>;
  }

  if (!wallet) {
    return <div className="p-8 text-center text-red-500">Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø¹Ø«ÙˆØ± Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø­ÙØ¸Ø©</div>;
  }

  const isProfitable = wallet.netProfit >= 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Wallet Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 md:col-span-2">
          <div className="w-20 h-20 rounded-[20px] bg-blue-50 flex items-center justify-center border border-gray-100 overflow-hidden shrink-0">
            {wallet.imageUrl ? (
              <img src={wallet.imageUrl.startsWith('http') ? wallet.imageUrl : `${import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7073'}${wallet.imageUrl}`} alt={wallet.name} className="w-full h-full object-cover" />
            ) : (
              <Wallet size={36} className="text-blue-500" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{wallet.name}</h1>
            <p className="text-gray-500 text-lg mb-2" dir="ltr">{wallet.phoneNumber}</p>
            <div className="flex gap-3">
              <span className={`px-3 py-1 text-sm font-medium rounded-lg ${wallet.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {wallet.isActive ? 'Ù†Ø´Ø·' : 'ØºÙŠØ± Ù†Ø´Ø·'}
              </span>
              <span className="px-3 py-1 text-sm font-medium bg-gray-50 text-gray-600 rounded-lg">
                ØªØ§Ø±ÙŠØ® Ø§Ù„Ø¥Ù†Ø´Ø§Ø¡: {formatDate(wallet.createdAt)}
              </span>
            </div>
          </div>
          
          <div className="mr-auto text-center border-r border-gray-100 pr-6">
            <p className="text-gray-500 font-medium mb-1">Ø§Ù„Ø±ØµÙŠØ¯ Ø§Ù„Ø­Ø§Ù„ÙŠ</p>
            <p className="text-3xl font-black text-[#0f8e4c] font-mono">
              {(wallet.balance || 0).toFixed(2)}
            </p>
          </div>
        </div>

        <div className={`bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-center items-center ${isProfitable ? 'border-green-100' : 'border-red-100'}`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isProfitable ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            <TrendingUp size={24} />
          </div>
          <p className="text-gray-500 font-medium mb-1">ØµØ§ÙÙŠ Ø§Ù„Ø£Ø±Ø¨Ø§Ø­ (Ù„ÙƒÙ„ Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª)</p>
          <p className={`text-3xl font-black font-mono dir-ltr ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
            {isProfitable ? '+' : ''}{(wallet.netProfit || 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Operations Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-gray-800">Ø³Ø¬Ù„ Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª</h2>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
              <Filter size={16} className="text-gray-400" />
              <select
                value={operationType}
                onChange={e => {
                  setOperationType(e.target.value ? Number(e.target.value) : '');
                  setPageNumber(1);
                }}
                className="bg-transparent border-none text-sm focus:ring-0 text-gray-600 py-0"
              >
                <option value="">ÙƒÙ„ Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª</option>
                <option value={WalletOperationType.CashIn}>Ø¥ÙŠØ¯Ø§Ø¹</option>
                <option value={WalletOperationType.CashOut}>Ø³Ø­Ø¨</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateFrom}
                onChange={e => { setDateFrom(e.target.value); setPageNumber(1); }}
                className={tokens.input + " py-1.5 text-sm w-auto"}
                title="Ù…Ù† ØªØ§Ø±ÙŠØ®"
              />
              <span className="text-gray-400">-</span>
              <input
                type="date"
                value={dateTo}
                onChange={e => { setDateTo(e.target.value); setPageNumber(1); }}
                className={tokens.input + " py-1.5 text-sm w-auto"}
                title="Ø¥Ù„Ù‰ ØªØ§Ø±ÙŠØ®"
              />
            </div>
          </div>
        </div>
        
        {isLoadingOperations ? (
          <div className="p-8 text-center text-gray-500">Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø³Ø¬Ù„...</div>
        ) : operations.length === 0 ? (
          <div className="p-12 text-center text-gray-400">Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø¹Ù…Ù„ÙŠØ§Øª ØªØ·Ø§Ø¨Ù‚ Ø§Ù„Ø¨Ø­Ø«</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-white text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Ø§Ù„ØªØ§Ø±ÙŠØ®</th>
                  <th className="px-6 py-4 font-semibold">Ù†ÙˆØ¹ Ø§Ù„Ø¹Ù…Ù„ÙŠØ©</th>
                  <th className="px-6 py-4 font-semibold">Ø§Ù„Ù…Ø¨Ù„Øº Ø§Ù„Ù…Ø­ÙˆÙ„</th>
                  <th className="px-6 py-4 font-semibold">Ø§Ù„Ù…Ø¨Ù„Øº Ø§Ù„ÙƒØ§Ø´</th>
                  <th className="px-6 py-4 font-semibold">Ø§Ù„Ø±Ø¨Ø­</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {operations.map((op: WalletOperationResponse) => {
                  const isDeposit = op.operationType === WalletOperationType.CashIn;
                  return (
                    <tr key={op.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 text-slate-600">{formatDate(op.createdAt)}</td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${isDeposit ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                          {isDeposit ? <ArrowDownToLine size={14} /> : <ArrowUpFromLine size={14} />}
                          {isDeposit ? 'Ø¥ÙŠØ¯Ø§Ø¹' : 'Ø³Ø­Ø¨'}
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
              ØµÙØ­Ø© {pageNumber} Ù…Ù† {totalPages}
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

