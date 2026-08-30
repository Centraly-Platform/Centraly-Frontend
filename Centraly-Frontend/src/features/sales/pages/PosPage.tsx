import { useState, useEffect } from 'react';
import { useHeaderStore } from '@/shared/hooks/useHeaderStore';
import { useProducts } from '@/features/inventory/hooks/useInventory';
import { ProductResponse, ProductBatchResponse } from '@/features/inventory/schemas/inventorySchemas';
import { PosProductGrid } from '../components/PosProductGrid';
import { PosCart } from '../components/PosCart';
import { BatchSelectionModal } from '../components/BatchSelectionModal';
import { CheckoutModal } from '../components/CheckoutModal';
import { useCreateSalesInvoice } from '../hooks/useSales';
import { usePosCart } from '../hooks/usePosCart';
import { SaleType, PaymentMethod } from '../schemas/salesSchemas';
import { ShoppingCart, X } from 'lucide-react';

export function PosPage() {
  const { setTitle, setBackButton } = useHeaderStore();
  const cart = usePosCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [checkoutMethod, setCheckoutMethod] = useState<PaymentMethod | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  const { data: productsData, isLoading: isLoadingProducts } = useProducts({
    pageNumber: pageNumber,
    pageSize: 8,
    searchValue: searchTerm || undefined,
    categoryId: selectedCategoryId || undefined,
    departmentId: selectedDepartmentId || undefined,
  });

  const createInvoiceMutation = useCreateSalesInvoice();

  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm, selectedDepartmentId, selectedCategoryId]);

  useEffect(() => {
    setTitle('نقطة البيع (POS)');
    setBackButton(false);
  }, [setTitle, setBackButton]);

  const handleProductClick = (product: ProductResponse) => {
    setSelectedProduct(product);
    setIsBatchModalOpen(true);
  };

  const handleSelectBatch = (batch: ProductBatchResponse, selectedPrice: number) => {
    if (!selectedProduct) return;

    cart.addItem({
      id: `${selectedProduct.productId}_${batch.batchId}_${selectedPrice}`,
      productId: selectedProduct.productId,
      productName: selectedProduct.name || 'منتج غير معروف',
      batchId: batch.batchId,
      batchName: batch.supplierName || 'شركة غير معروفة',
      imageUrl: selectedProduct.imageUrl,
      properties: selectedProduct.properties,
      price: selectedPrice,
      quantity: 1,
      maxQuantity: batch.availableQuantity,
    });

    setIsBatchModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCheckoutClick = (method: PaymentMethod) => {
    setCheckoutMethod(method);
    setIsCheckoutModalOpen(true);
  };

  const handleConfirmCheckout = (customerName: string, customerPhone: string, paidAmount: number, paymentSource?: number) => {
    if (!checkoutMethod) return;

    createInvoiceMutation.mutate({
      customerName: customerName.trim() || undefined,
      customerPhone: customerPhone.trim() || undefined,
      saleType: SaleType.Retail,
      paymentMethod: checkoutMethod,
      paidAmount: paidAmount,
      paymentSource: paymentSource,
      items: cart.items.map((item) => ({
        productId: item.productId,
        batchId: item.batchId,
        quantity: item.quantity,
        sellingPrice: item.price,
      })),
    }, {
      onSuccess: () => {
        cart.clear();
        setIsCheckoutModalOpen(false);
        setCheckoutMethod(null);
      },
    });
  };

  const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="-m-6 w-[calc(100%+3rem)] h-[calc(100vh-theme(spacing.16))] bg-gray-50 overflow-hidden flex flex-col lg:flex-row relative">
      <div className="flex-1 overflow-hidden relative pb-[80px] lg:pb-0">
        <PosProductGrid
          products={productsData?.items || []}
          isLoading={isLoadingProducts}
          onProductClick={handleProductClick}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDepartmentId={selectedDepartmentId}
          setSelectedDepartmentId={setSelectedDepartmentId}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={productsData?.totalPages || 1}
        />
      </div>

      {/* Desktop Cart */}
      <div className="hidden lg:block w-[380px] shrink-0 h-full border-r border-gray-200">
        <PosCart
          items={cart.items}
          onUpdateQuantity={cart.updateQuantity}
          onRemoveItem={cart.removeItem}
          onClearCart={cart.clear}
          onCheckout={handleCheckoutClick}
        />
      </div>

      {/* Mobile Cart Button / Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 flex items-center justify-between">
         <div className="flex flex-col">
            <span className="text-gray-500 text-sm font-semibold">الإجمالي ({totalQuantity} منتجات)</span>
            <span className="text-[#0f8e4c] font-bold text-lg">{new Intl.NumberFormat('en-EG', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(totalAmount)} ج.م</span>
         </div>
         <button 
           onClick={() => setIsMobileCartOpen(true)}
           className="bg-[#0f8e4c] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm"
         >
           <ShoppingCart size={20} />
           عرض السلة
         </button>
      </div>

      {/* Mobile Cart Drawer */}
      {isMobileCartOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileCartOpen(false)} />
          {/* Drawer */}
          <div className="absolute top-0 right-0 bottom-0 w-[90%] max-w-[400px] bg-[#f8f9fa] shadow-2xl flex flex-col">
             {/* Close button row */}
             <div className="p-4 pb-0 flex justify-start bg-[#f8f9fa] shrink-0 z-30">
               <button onClick={() => setIsMobileCartOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-100 rounded-xl transition-colors shadow-sm">
                 <X size={20} className="text-gray-600" />
               </button>
             </div>
             <div className="flex-1 overflow-hidden relative">
               <PosCart
                 items={cart.items}
                 onUpdateQuantity={cart.updateQuantity}
                 onRemoveItem={cart.removeItem}
                 onClearCart={cart.clear}
                 onCheckout={(method) => {
                   handleCheckoutClick(method);
                   setIsMobileCartOpen(false);
                 }}
               />
             </div>
          </div>
        </div>
      )}

      <BatchSelectionModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        product={selectedProduct}
        onSelectBatch={handleSelectBatch}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        totalAmount={cart.totalAmount}
        paymentMethod={checkoutMethod}
        onConfirm={handleConfirmCheckout}
        isSubmitting={createInvoiceMutation.isPending}
      />
    </div>
  );
}

