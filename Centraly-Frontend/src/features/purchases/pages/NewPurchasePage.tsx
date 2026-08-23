import { PurchaseInvoiceForm } from '../components/PurchaseInvoiceForm';
import { useCreatePurchaseInvoice } from '../hooks/usePurchases';
import { BackButton } from '@/shared/components/ui/BackButton';
import { toast } from 'sonner';

export function NewPurchasePage() {
  const { mutate: createInvoice, isPending } = useCreatePurchaseInvoice();

  const handleSubmit = (data: any) => {
    createInvoice(data, {
      onSuccess: () => {
        toast.success("تم حفظ فاتورة المشتريات بنجاح وإضافة الكميات للمخزن!");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "حدث خطأ أثناء حفظ الفاتورة");
      }
    });
  };

  return (
    <div className="space-y-4 w-full">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <BackButton to="/purchases/history" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">فاتورة مشتريات جديدة</h1>
          <p className="text-gray-500 text-sm mt-0.5">إدخال بضاعة جديدة للمخزن وتسجيل المديونية للمورد</p>
        </div>
      </div>

      <PurchaseInvoiceForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}
