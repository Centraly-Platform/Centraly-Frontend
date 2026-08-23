import React, { useEffect } from "react";
import { X } from "lucide-react";

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function RightDrawer({ isOpen, onClose, title, children, footer }: RightDrawerProps) {

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end" 
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Semi-transparent overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel — w-[450px] fixed, slides from right */}
      <div className="relative w-[450px] bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
        
        {/* Drawer Header — h-16, bg-gray-50 */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <h2 id="drawer-title" className="text-lg font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1.5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {/* Drawer Footer — bg-gray-50, border-t */}
        {footer && (
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-end gap-3 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
