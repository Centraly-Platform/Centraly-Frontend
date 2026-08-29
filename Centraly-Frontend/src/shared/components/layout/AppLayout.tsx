import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useHeaderStore } from "../../hooks/useHeaderStore";
import { useSidebarStore } from "../../hooks/useSidebarStore";
import { BackButton } from "../ui/BackButton";
import { useEffect } from "react";
import { Menu } from "lucide-react";

// Map routes to default page titles
const defaultPageTitles: Record<string, string> = {
  "/": "لوحة القيادة",
  "/sales/pos": "نقطة البيع (POS)",
  "/sales/history": "سجل المبيعات",
  "/sales/returns": "مرتجعات المبيعات",
  "/purchases/new": "فاتورة مشتريات جديدة",
  "/purchases/history": "سجل المشتريات",
  "/purchases/returns": "مرتجعات الموردين",
  "/inventory/products": "المنتجات",
  "/inventory/categories": "الأقسام",
  "/contacts/customers": "العملاء",
  "/contacts/suppliers": "الموردين",
  "/finance/drawer": "الدرج والوردية",
  "/finance/safe": "الخزينة",
  "/finance/expenses": "المصروفات",
  "/settings": "الإعدادات",
};

export function AppLayout() {
  const location = useLocation();
  const { title, backPath, setTitle, setBackButton } = useHeaderStore();
  const { isOpen, toggle } = useSidebarStore();

  // Set default title based on route if available, and reset back button
  useEffect(() => {
    const defaultTitle = defaultPageTitles[location.pathname];
    if (defaultTitle) {
      setTitle(defaultTitle);
      setBackButton(false);
    }
  }, [location.pathname, setTitle, setBackButton]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans" dir="rtl">
      {/* Sidebar fixed on the right */}
      <Sidebar />

      {/* Main Content — offset by sidebar width */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isOpen ? 'mr-64' : 'mr-20'}`}>

        {/* Page Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-10 transition-all duration-300">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggle}
              className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <BackButton to={backPath} />
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-gray-200"></div>

            <div className="flex items-center gap-3 cursor-pointer p-1 pr-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-700">مدير النظام</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
              <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                م
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
