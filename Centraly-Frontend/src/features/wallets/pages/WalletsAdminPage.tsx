import { useState, useEffect } from 'react';
import { useWallets } from '../hooks/useWallets';
import { tokens } from '@/shared/styles/tokens';
import { Wallet, Plus, Edit2, Info } from 'lucide-react';
import { RightDrawer } from '@/shared/components/ui/RightDrawer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDate } from '@/shared/utils/date';
import { useHeaderStore } from '@/shared/hooks/useHeaderStore';
import { useNavigate } from 'react-router-dom';
import { WalletResponse } from '../schemas/walletSchemas';
import { GlobalWalletOperationsTable } from '../components/GlobalWalletOperationsTable';

const walletFormSchema = z.object({
  name: z.string().min(1, 'Ø§Ø³Ù… Ø§Ù„Ù…Ø­ÙØ¸Ø© Ù…Ø·Ù„ÙˆØ¨'),
  phoneNumber: z.string().min(1, 'Ø±Ù‚Ù… Ø§Ù„ØªÙ„ÙŠÙÙˆÙ† Ù…Ø·Ù„ÙˆØ¨'), 
  ownerName: z.string().optional(),
  initialBalance: z.coerce.number().min(0, 'ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† Ø§Ù„Ø±ØµÙŠØ¯ 0 Ø£Ùˆ Ø£ÙƒØ«Ø±').optional(),
  isActive: z.boolean(),
  image: z.any().optional()
});

type WalletFormValues = z.infer<typeof walletFormSchema>;

export function WalletsAdminPage() {
  const { setTitle } = useHeaderStore();
  const navigate = useNavigate();
  const { wallets, isLoading, createWallet, isCreating, updateWallet, isUpdating } = useWallets();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingWallet, setEditingWallet] = useState<WalletResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'history'>('list');

  useEffect(() => {
    setTitle('Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ø­Ø§ÙØ¸');
  }, [setTitle]);

  const form = useForm<WalletFormValues>({
    resolver: zodResolver(walletFormSchema) as any,
    defaultValues: { name: '', phoneNumber: '', ownerName: '', initialBalance: 0, isActive: true }
  });

  const openCreateDrawer = () => {
    setEditingWallet(null);
    form.reset({ name: '', phoneNumber: '', ownerName: '', initialBalance: 0, isActive: true });
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (wallet: WalletResponse, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingWallet(wallet);
    form.reset({
      name: wallet.name,
      phoneNumber: wallet.phoneNumber,
      ownerName: wallet.ownerName || '',
      initialBalance: wallet.balance,
      isActive: wallet.isActive,
    });
    setIsDrawerOpen(true);
  };

  const onSubmit = (data: WalletFormValues) => {
    if (editingWallet) {
      updateWallet(
        { 
          walletId: editingWallet.id,
          data: {
            name: data.name,
            phoneNumber: data.phoneNumber,
            ownerName: data.ownerName || undefined,
            isActive: data.isActive,
            image: data.image?.[0]
          }
        },
        { onSuccess: () => setIsDrawerOpen(false) }
      );
    } else {
      createWallet(
        { 
          name: data.name, 
          phoneNumber: data.phoneNumber, 
          ownerName: data.ownerName || undefined, 
          initialBalance: data.initialBalance || 0,
          image: data.image?.[0]
        },
        { onSuccess: () => setIsDrawerOpen(false) }
      );
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingWallet(null);
    form.reset();
  };

  const isSaving = isCreating || isUpdating;

  const drawerFooter = (
    <>
      <button type="button" onClick={closeDrawer} className={tokens.btn.secondary}>
        Ø¥Ù„ØºØ§Ø¡
      </button>
      <button
        type="submit"
        form="wallet-form"
        disabled={isSaving}
        className={tokens.btn.primary + " disabled:opacity-60"}
      >
        {isSaving ? 'Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø­ÙØ¸...' : 'Ø­ÙØ¸'}
      </button>
    </>
  );

  return (
    <div className="space-y-6">
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('list')}
          className={`py-3 px-6 font-semibold text-sm border-b-2 transition-colors ${activeTab === 'list' ? 'border-[#0f8e4c] text-[#0f8e4c]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Ø§Ù„Ù…Ø­Ø§ÙØ¸
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-3 px-6 font-semibold text-sm border-b-2 transition-colors ${activeTab === 'history' ? 'border-[#0f8e4c] text-[#0f8e4c]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Ø³Ø¬Ù„ Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø´Ø§Ù…Ù„
        </button>
      </div>

      {activeTab === 'list' && (
        <>
          <div className="flex justify-end">
            <button 
              onClick={openCreateDrawer}
              className={tokens.btn.primary + " flex items-center gap-2"}
            >
              <Plus size={18} />
              Ù…Ø­ÙØ¸Ø© Ø¬Ø¯ÙŠØ¯Ø©
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ø­Ø§ÙØ¸...</div>
            ) : wallets.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex w-16 h-16 rounded-full bg-blue-50 items-center justify-center text-blue-500 mb-4">
                  <Wallet size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ø­Ø§ÙØ¸ Ù…Ø³Ø¬Ù„Ø©</h3>
                <p className="text-gray-500 mb-4">Ù‚Ù… Ø¨Ø¥Ø¶Ø§ÙØ© Ø£ÙˆÙ„ Ù…Ø­ÙØ¸Ø© Ù„Ù„Ø¨Ø¯Ø¡ ÙÙŠ Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Ø§Ø³Ù… Ø§Ù„Ù…Ø­ÙØ¸Ø©</th>
                  <th className="px-6 py-4 font-semibold">Ø±Ù‚Ù… Ø§Ù„ØªÙ„ÙŠÙÙˆÙ†</th>
                  <th className="px-6 py-4 font-semibold">Ø§Ø³Ù… Ø§Ù„Ù…Ø§Ù„Ùƒ</th>
                  <th className="px-6 py-4 font-semibold">Ø§Ù„Ø±ØµÙŠØ¯ Ø§Ù„Ø­Ø§Ù„ÙŠ</th>
                  <th className="px-6 py-4 font-semibold">ØªØ§Ø±ÙŠØ® Ø§Ù„Ø¥Ù†Ø´Ø§Ø¡</th>
                  <th className="px-6 py-4 font-semibold">Ø§Ù„Ø­Ø§Ù„Ø©</th>
                  <th className="px-6 py-4 font-semibold">Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {wallets.map(wallet => (
                  <tr 
                    key={wallet.id} 
                    className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/wallets/${wallet.id}`)}
                  >
                    <td className="px-6 py-4 font-medium text-slate-800">
                      <div className="flex items-center gap-3">
                        {wallet.imageUrl ? (
                          <img src={wallet.imageUrl.startsWith('http') ? wallet.imageUrl : `${import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7073'}${wallet.imageUrl}`} alt={wallet.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                            <Wallet size={16} />
                          </div>
                        )}
                        <span>{wallet.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500" dir="ltr">{wallet.phoneNumber}</td>
                    <td className="px-6 py-4 text-slate-500">{wallet.ownerName || '-'}</td>
                    <td className="px-6 py-4 font-bold text-[#0f8e4c] font-mono">
                      {wallet.balance.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(wallet.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${wallet.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {wallet.isActive ? 'Ù†Ø´Ø·' : 'ØºÙŠØ± Ù†Ø´Ø·'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => openEditDrawer(wallet, e)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="ØªØ¹Ø¯ÙŠÙ„"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                          title="Ø§Ù„ØªÙØ§ØµÙŠÙ„"
                        >
                          <Info size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </>
      )}

      {activeTab === 'history' && (
        <GlobalWalletOperationsTable />
      )}

      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingWallet ? "ØªØ¹Ø¯ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø­ÙØ¸Ø©" : "Ø¥Ø¶Ø§ÙØ© Ù…Ø­ÙØ¸Ø© Ø¬Ø¯ÙŠØ¯Ø©"}
        footer={drawerFooter}
      >
        <form id="wallet-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ø§Ø³Ù… Ø§Ù„Ù…Ø­ÙØ¸Ø© *</label>
            <input
              {...form.register('name')}
              className={tokens.input}
              placeholder="Ù…Ø«Ø§Ù„: ÙÙˆØ¯Ø§ÙÙˆÙ† ÙƒØ§Ø´ - Ø±Ù‚Ù… 1"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ø±Ù‚Ù… Ø§Ù„ØªÙ„ÙŠÙÙˆÙ† *</label>
            <input
              {...form.register('phoneNumber')}
              className={tokens.input}
              placeholder="Ù…Ø«Ø§Ù„: 01012345678"
            />
            {form.formState.errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.phoneNumber.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ø§Ø³Ù… Ø§Ù„Ù…Ø§Ù„Ùƒ (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)</label>
            <input
              {...form.register('ownerName')}
              className={tokens.input}
              placeholder="Ù…Ø«Ø§Ù„: Ø£Ø­Ù…Ø¯ Ù…Ø­Ù…Ø¯"
            />
          </div>
          
          {!editingWallet && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ø§Ù„Ø±ØµÙŠØ¯ Ø§Ù„Ø§ÙØªØªØ§Ø­ÙŠ</label>
              <input
                type="number"
                step="0.01"
                {...form.register('initialBalance')}
                className={tokens.input}
              />
              {form.formState.errors.initialBalance && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.initialBalance.message}</p>
              )}
            </div>
          )}

          {editingWallet && (
            <div className="flex items-center gap-2 pt-2 pb-2">
              <input
                type="checkbox"
                id="isActive"
                {...form.register('isActive')}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Ø§Ù„Ù…Ø­ÙØ¸Ø© Ù†Ø´Ø·Ø©
              </label>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ØµÙˆØ±Ø© Ø§Ù„Ù…Ø­ÙØ¸Ø© {editingWallet ? '(Ø§Ø®ØªÙŠØ§Ø±ÙŠ - Ù„Ø¹Ø¯Ù… Ø§Ù„ØªØºÙŠÙŠØ± Ø§ØªØ±ÙƒÙ‡Ø§ ÙØ§Ø±ØºØ©)' : '*'}
            </label>
            <input
              type="file"
              accept="image/*"
              {...form.register('image')}
              className={tokens.input}
            />
            {form.formState.errors.image && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.image?.message as string}</p>
            )}
          </div>
        </form>
      </RightDrawer>
    </div>
  );
}

