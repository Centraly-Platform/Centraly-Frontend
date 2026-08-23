import { useEffect } from 'react';
import { PurchaseInvoiceForm } from '../components/PurchaseInvoiceForm';
import { useCreatePurchaseInvoice } from '../hooks/usePurchases';
import { toast } from 'sonner';
import { useHeaderStore } from '@/shared/hooks/useHeaderStore';
import { useNavigate } from 'react-router-dom';

export function NewPurchasePage() {
  const { mutate: createInvoice, isPending } = useCreatePurchaseInvoice();
  const { setTitle, setBackButton } = useHeaderStore();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("فاتورة مشتريات جديدة");
    setBackButton(true, "/purchases/history");
  }, [setTitle, setBackButton]);

  const handleSubmit = (data: any) => {
    createInvoice(data, {
      onSuccess: () => {
        toast.success("تم حفظ فاتورة المشتريات بنجاح وإضافة الكميات للمخزن!");
        navigate("/purchases/history");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "حدث خطأ أثناء حفظ الفاتورة");
      }
    });
  };

  return (
    <div className="space-y-4 w-full">
      <PurchaseInvoiceForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}
