import { useNavigate } from 'react-router-dom';
import { PurchaseInvoiceForm } from '../components/PurchaseInvoiceForm';
import { useCreatePurchaseInvoice } from '../hooks/usePurchases';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export function NewPurchasePage() {
  const navigate = useNavigate();
  const { mutate: createInvoice, isPending } = useCreatePurchaseInvoice();

  const handleSubmit = (data: any) => {
    createInvoice(data, {
      onSuccess: () => {
        toast.success("تم حفظ فاتورة المشتريات بنجاح وإضافة الكميات للمخزن!");
        navigate('/purchases/history');
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "حدث خطأ أثناء حفظ الفاتورة");
      }
    });
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/purchases/history')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="إلغاء والعودة"
        >
          <ArrowRight size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">فاتورة مشتريات جديدة</h1>
          <p className="text-gray-500 mt-1">إدخال بضاعة جديدة للمخزن وتسجيل المديونية للمورد</p>
        </div>
      </div>

      <PurchaseInvoiceForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}
