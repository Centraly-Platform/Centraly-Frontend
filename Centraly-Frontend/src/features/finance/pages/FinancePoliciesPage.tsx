import { useEffect, useState } from 'react';
import { useHeaderStore } from '@/shared/hooks/useHeaderStore';
import { useFinancePolicies, useUpdateFinancePolicy } from '../hooks/useFinancePolicies';
import { GlobalTransactionCategory, PaymentSourcePolicy } from '../schemas/financeSchemas';
import { tokens } from '@/shared/styles/tokens';
import { ShieldAlert, Loader2 } from 'lucide-react';

export function FinancePoliciesPage() {
  const { setTitle, setBackButton } = useHeaderStore();
  const { data: policies, isLoading } = useFinancePolicies();
  const { mutate: updatePolicy, isPending } = useUpdateFinancePolicy();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    setTitle("السياسات المالية للمدير");
    setBackButton(false);
  }, [setTitle, setBackButton]);

  const categoryLabels: Record<string, string> = {
    CashSale: 'المبيعات النقدية (نقطة البيع - POS)',
    SalesReturn: 'مرتجعات المبيعات نقدي (إضافة مرتجع مبيعات)',
    CashPurchase: 'المشتريات النقدية (فاتورة مشتريات جديدة)',
    PurchaseReturn: 'مرتجعات المشتريات نقدي',
    SupplierPayment: 'سداد دفعة لمورد (سجل الموردين > سداد)',
    SupplierReceipt: 'استلام دفعة من مورد (سجل الموردين > استلام)',
    CustomerPayment: 'تحصيل دفعة من عميل (سجل العملاء > تحصيل)',
    CustomerRefund: 'رد أموال لعميل',
    Expense: 'المصروفات العامة (المالية > المصروفات)',
    OwnerDeposit: 'إيداع رأس مال المالك (قريباً)',
    OwnerWithdrawal: 'مسحوبات الأرباح للمالك (قريباً)',
    ManualIncome: 'إيراد يدوي عام (الدرج / الخزينة > إضافة إيراد)',
    ManualExpense: 'مصروف يدوي عام (الدرج / الخزينة > إضافة مصروف)',
  };

  const categoryEnumMap: Record<string, GlobalTransactionCategory> = {
    CashSale: 1,
    SalesReturn: 2,
    CashPurchase: 3,
    PurchaseReturn: 4,
    SupplierPayment: 5,
    SupplierReceipt: 6,
    CustomerPayment: 7,
    CustomerRefund: 8,
    Expense: 9,
    OwnerDeposit: 10,
    OwnerWithdrawal: 11,
    ManualIncome: 12,
    ManualExpense: 13,
  };

  const handlePolicyChange = (categoryString: string, newPolicyString: string) => {
    const enumValue = categoryEnumMap[categoryString];
    let policyValue: PaymentSourcePolicy = 3;
    if (newPolicyString === 'DrawerOnly') policyValue = 1;
    if (newPolicyString === 'SafeOnly') policyValue = 2;

    setUpdatingId(categoryString);
    updatePolicy(
      { category: enumValue, data: { allowedSource: policyValue } },
      {
        onSettled: () => setUpdatingId(null)
      }
    );
  };

  if (isLoading) {
    return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-gray-400 w-8 h-8" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4">
        <ShieldAlert className="text-amber-600 flex-shrink-0" size={28} />
        <div>
          <h3 className="font-bold text-amber-800 text-lg mb-1">لوحة تحكم المدير: سياسات مصادر الأموال</h3>
          <p className="text-amber-700 leading-relaxed">
            من هنا يمكنك التحكم في المصدر المالي الإجباري لكل حركة في النظام. 
            <strong> الدرج فقط (Drawer Only): </strong>يُجبر النظام على سحب/إيداع الأموال من درج الكاشير للوردية الحالية.
            <strong> الخزينة فقط (Safe Only): </strong>يُجبر النظام على التعامل مع الخزينة الرئيسية.
            <strong> اختياري (Either): </strong>يطلب من المستخدم اختيار المصدر أثناء تنفيذ العملية.
            <em>أي تعديل هنا يتم تطبيقه فوراً على كل شاشات النظام.</em>
          </p>
        </div>
      </div>

      <div className={`${tokens.card} overflow-hidden`}>
        <table className="w-full text-right">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">نوع العملية المالية</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm w-72">السياسة المطبقة (مصدر الأموال)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {policies?.map((policy) => (
              <tr key={policy.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{categoryLabels[policy.category] || policy.category}</div>
                  <div className="text-xs text-gray-500 font-mono mt-1 opacity-70">{policy.category}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <select
                      value={policy.allowedSource}
                      onChange={(e) => handlePolicyChange(policy.category, e.target.value)}
                      disabled={isPending && updatingId === policy.category}
                      className={`${tokens.input} bg-white font-semibold cursor-pointer appearance-none ${
                        policy.allowedSource === 'DrawerOnly' ? 'text-blue-700 border-blue-200 bg-blue-50' :
                        policy.allowedSource === 'SafeOnly' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' :
                        'text-purple-700 border-purple-200 bg-purple-50'
                      }`}
                    >
                      <option value="DrawerOnly">الدرج فقط (Drawer Only)</option>
                      <option value="SafeOnly">الخزينة فقط (Safe Only)</option>
                      <option value="Either">الدرج أو الخزينة (Either)</option>
                    </select>
                    {isPending && updatingId === policy.category && (
                      <Loader2 className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 animate-spin" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
