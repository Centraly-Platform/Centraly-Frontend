import { useState } from 'react';
import { useWallets } from '../hooks/useWallets';
import { tokens } from '@/shared/styles/tokens';
import { Wallet, Plus } from 'lucide-react';
import { RightDrawer } from '@/shared/components/ui/RightDrawer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDate } from '@/lib/dateUtils';

const createWalletSchema = z.object({
  name: z.string().min(1, 'اسم المحفظة مطلوب'),
  provider: z.string().nullable().optional(),
  initialBalance: z.coerce.number().min(0, 'يجب أن يكون الرصيد 0 أو أكثر'),
});

type CreateWalletForm = z.infer<typeof createWalletSchema>;

export function WalletsAdminPage() {
  const { wallets, isLoading, createWallet, isCreating } = useWallets();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const form = useForm<CreateWalletForm>({
    resolver: zodResolver(createWalletSchema),
    defaultValues: { name: '', provider: '', initialBalance: 0 }
  });

  const onSubmit = (data: CreateWalletForm) => {
    createWallet(
      { name: data.name, provider: data.provider || null, initialBalance: data.initialBalance },
      { onSuccess: () => setIsDrawerOpen(false) }
    );
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    form.reset({ name: '', provider: '', initialBalance: 0 });
  };

  const drawerFooter = (
    <>
      <button type="button" onClick={closeDrawer} className={tokens.btn.secondary}>
        إلغاء
      </button>
      <button
        type="submit"
        form="wallet-form"
        disabled={isCreating}
        className={tokens.btn.primary + " disabled:opacity-60"}
      >
        {isCreating ? 'جاري الحفظ...' : 'حفظ'}
      </button>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800">إدارة المحافظ</h1>
          <p className="text-sm text-gray-500 mt-1">عرض وإضافة المحافظ الإلكترونية</p>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className={tokens.btn.primary + " flex items-center gap-2"}
        >
          <Plus size={18} />
          محفظة جديدة
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">جاري تحميل المحافظ...</div>
        ) : wallets.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex w-16 h-16 rounded-full bg-blue-50 items-center justify-center text-blue-500 mb-4">
              <Wallet size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">لا يوجد محافظ مسجلة</h3>
            <p className="text-gray-500 mb-4">قم بإضافة أول محفظة للبدء في العمليات</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">اسم المحفظة</th>
                  <th className="px-6 py-4 font-semibold">المزود</th>
                  <th className="px-6 py-4 font-semibold">الرصيد الحالي</th>
                  <th className="px-6 py-4 font-semibold">تاريخ الإنشاء</th>
                  <th className="px-6 py-4 font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {wallets.map(wallet => (
                  <tr key={wallet.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-800">{wallet.name}</td>
                    <td className="px-6 py-4 text-slate-500">{wallet.provider || '-'}</td>
                    <td className="px-6 py-4 font-bold text-slate-800 font-mono">
                      {wallet.balance.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(wallet.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${wallet.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
                        {wallet.isActive ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="إضافة محفظة جديدة"
        footer={drawerFooter}
      >
        <form id="wallet-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم المحفظة *</label>
            <input
              {...form.register('name')}
              className={tokens.input.base}
              placeholder="مثال: فودافون كاش - رقم 1"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">المزود</label>
            <input
              {...form.register('provider')}
              className={tokens.input.base}
              placeholder="مثال: Vodafone"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الرصيد الافتتاحي</label>
            <input
              type="number"
              step="0.01"
              {...form.register('initialBalance')}
              className={tokens.input.base}
            />
            {form.formState.errors.initialBalance && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.initialBalance.message}</p>
            )}
          </div>
        </form>
      </RightDrawer>
    </div>
  );
}
