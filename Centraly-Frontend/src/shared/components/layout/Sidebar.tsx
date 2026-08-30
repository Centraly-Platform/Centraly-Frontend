import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, ShoppingCart, ShoppingBag,
  Package, Users, Wallet, Settings,
  LogOut, MonitorSmartphone
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Permissions } from "@/features/auth/schemas/permissions";
import { useSidebarStore } from "../../hooks/useSidebarStore";

const menuGroups: { title: string, permission?: string, items: { name: string, path: string, icon: any, permission?: string }[] }[] = [
  {
    title: "الرئيسية",
    items: [
      { name: "لوحة القيادة", path: "/", icon: LayoutDashboard },
    ]
  },
  {
    title: "المبيعات",
    permission: Permissions.SalesRead,
    items: [
      { name: "نقطة البيع (POS)", path: "/sales/pos", icon: MonitorSmartphone, permission: Permissions.SalesWrite },
      { name: "سجل المبيعات", path: "/sales/history", icon: ShoppingCart, permission: Permissions.SalesRead },
      { name: "المرتجعات", path: "/sales/returns", icon: ShoppingCart, permission: Permissions.SalesRead },
    ]
  },
  {
    title: "المشتريات",
    permission: Permissions.PurchasesRead,
    items: [
      { name: "فاتورة مشتريات", path: "/purchases/new", icon: ShoppingBag, permission: Permissions.PurchasesWrite },
      { name: "سجل المشتريات", path: "/purchases/history", icon: ShoppingBag, permission: Permissions.PurchasesRead },
      { name: "مرتجعات الموردين", path: "/purchases/returns", icon: ShoppingBag, permission: Permissions.PurchasesRead },
    ]
  },
  {
    title: "المخزون",
    permission: Permissions.InventoryRead,
    items: [
      { name: "المنتجات", path: "/inventory/products", icon: Package, permission: Permissions.InventoryRead },
      { name: "الأقسام", path: "/inventory/categories", icon: Package, permission: Permissions.InventoryRead },
    ]
  },
  {
    title: "جهات الاتصال",
    permission: Permissions.ContactsRead,
    items: [
      { name: "العملاء", path: "/contacts/customers", icon: Users, permission: Permissions.ContactsRead },
      { name: "الموردين", path: "/contacts/suppliers", icon: Users, permission: Permissions.ContactsRead },
    ]
  },
  {
    title: "المالية",
    permission: Permissions.FinanceRead,
    items: [
      { name: "الدرج والوردية", path: "/finance/drawer", icon: Wallet, permission: Permissions.FinanceRead },
      { name: "الخزينة", path: "/finance/safe", icon: Wallet, permission: Permissions.FinanceRead },
      { name: "المصروفات", path: "/finance/expenses", icon: Wallet, permission: Permissions.FinanceRead },
      { name: "معاملات المالك", path: "/finance/owner-transactions", icon: Wallet, permission: Permissions.FinanceRead },
      { name: "عمليات المحافظ", path: "/operations/wallets", icon: Wallet, permission: Permissions.FinanceWrite },
    ]
  }
];

export function Sidebar() {
  const location = useLocation();
  const { logout, hasPermission } = useAuth();
  const { isOpen } = useSidebarStore();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-slate-900 text-slate-300 flex flex-col h-screen fixed right-0 top-0 border-l border-slate-800 flex-shrink-0 z-20`}>

      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800 bg-slate-950 shrink-0">
        <h1 className={`text-xl font-bold text-white tracking-wider transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
          سنترالي
        </h1>
        {!isOpen && (
          <h1 className="text-xl font-bold text-white tracking-wider">س</h1>
        )}
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 custom-scrollbar">
        {menuGroups.map((group, gi) => {
          const visibleItems = group.items.filter((item) => !item.permission || hasPermission(item.permission));
          if (visibleItems.length === 0) return null;
          if (group.permission && !hasPermission(group.permission)) return null;

          return (
          <div key={gi} className="mb-6">
            {/* Group title */}
            <h3 className={`px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 mb-0 overflow-hidden'}`}>
              {group.title}
            </h3>
            
            {/* When closed, we still need some spacing between groups */}
            {!isOpen && gi > 0 && <div className="h-4"></div>}

            <ul className="space-y-1">
              {visibleItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      title={!isOpen ? item.name : undefined}
                      className={`flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center px-0'} py-2.5 rounded-lg transition-colors text-sm font-medium ${
                        active
                          ? "bg-blue-600 text-white"
                          : "hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      {/* Icons — w-5 h-5 = 20px */}
                      <item.icon size={20} className={`shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
                      <span className={`transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
                        {item.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          );
        })}

        {/* Settings */}
        <div className="border-t border-slate-800 pt-4 mt-2 space-y-1">
          <Link
            to="/settings/finance-policies"
            title={!isOpen ? "سياسات النظام" : undefined}
            className={`flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center px-0'} py-2.5 rounded-lg transition-colors text-sm font-medium ${
              location.pathname === "/settings/finance-policies"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Settings size={20} className="text-slate-400 shrink-0" />
            <span className={`transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
              سياسات النظام
            </span>
          </Link>
          <Link
            to="/settings/wallets"
            title={!isOpen ? "إدارة المحافظ" : undefined}
            className={`flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center px-0'} py-2.5 rounded-lg transition-colors text-sm font-medium ${
              location.pathname === "/settings/wallets"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Wallet size={20} className="text-slate-400 shrink-0" />
            <span className={`transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
              إدارة المحافظ
            </span>
          </Link>
        </div>
      </div>

      {/* Logout */}
      <div className={`p-4 border-t border-slate-800 bg-slate-950 shrink-0 ${!isOpen && 'flex justify-center'}`}>
        <button
          onClick={logout}
          title={!isOpen ? "تسجيل خروج" : undefined}
          className={`flex items-center ${isOpen ? 'gap-3 px-3 w-full' : 'justify-center w-10'} py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium`}
        >
          <LogOut size={20} className="shrink-0" />
          <span className={`transition-all duration-300 whitespace-nowrap ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
            تسجيل خروج
          </span>
        </button>
      </div>
    </aside>
  );
}
