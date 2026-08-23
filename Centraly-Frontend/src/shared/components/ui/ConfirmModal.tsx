import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { tokens } from '@/shared/styles/tokens';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  type = 'danger',
  isLoading = false
}: ConfirmModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch(type) {
      case 'danger': 
        return <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0"><AlertTriangle size={20} /></div>;
      case 'warning':
        return <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0"><AlertCircle size={20} /></div>;
      case 'info':
        return <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Info size={20} /></div>;
    }
  };

  const getBtnClass = () => {
    if (type === 'danger') return "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60";
    if (type === 'warning') return "bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60";
    return tokens.btn.primary;
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6 flex gap-4">
          {getIcon()}
          <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <div className="text-sm text-gray-500 mt-2 leading-relaxed">
              {message}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
          <button 
            onClick={onClose} 
            disabled={isLoading} 
            className={tokens.btn.secondary}
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm} 
            disabled={isLoading} 
            className={getBtnClass()}
          >
            {isLoading ? 'جاري المعالجة...' : confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
