import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, ShoppingCart, ShoppingBag,
  Package, Users, Wallet, Settings,
  LogOut, MonitorSmartphone
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

const menuGroups = [
  {
    title: "الرئيسية",
    items: [
      { name: "لوحة القيادة", path: "/", icon: LayoutDashboard },
    ]
  },
  {
    title: "المبيعات",
    items: [
      { name: "نقطة البيع (POS)", path: "/sales/pos", icon: MonitorSmartphone },
      { name: "سجل المبيعات", path: "/sales/history", icon: ShoppingCart },
      { name: "المرتجعات", path: "/sales/returns", icon: ShoppingCart },
    ]
  },
  {
    title: "المشتريات",
    items: [
      { name: "فاتورة مشتريات", path: "/purchases/new", icon: ShoppingBag },
      { name: "سجل المشتريات", path: "/purchases/history", icon: ShoppingBag },
      { name: "مرتجعات الموردين", path: "/purchases/returns", icon: ShoppingBag },
    ]
  },
  {
    title: "المخزون",
    items: [
      { name: "المنتجات", path: "/inventory/products", icon: Package },
      { name: "الأقسام", path: "/inventory/categories", icon: Package },
    ]
  },
  {
    title: "جهات الاتصال",
    items: [
      { name: "العملاء", path: "/contacts/customers", icon: Users },
      { name: "الموردين", path: "/contacts/suppliers", icon: Users },
    ]
  },
  {
    title: "المالية",
    items: [
      { name: "الدرج والوردية", path: "/finance/drawer", icon: Wallet },
      { name: "الخزينة", path: "/finance/safe", icon: Wallet },
      { name: "المصروفات", path: "/finance/expenses", icon: Wallet },
    ]
  }
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    // w-64 fixed height, bg-slate-900, text-slate-300
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed right-0 top-0 border-l border-slate-800 flex-shrink-0">

      {/* Logo — h-16, bg-slate-950, centered */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800 bg-slate-950">
        <h1 className="text-xl font-bold text-white tracking-wider">سنترالي</h1>
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {menuGroups.map((group, gi) => (
          <div key={gi} className="mb-6">
            {/* Group title — text-xs uppercase text-slate-500 */}
            <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                        active
                          ? "bg-blue-600 text-white"
                          : "hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      {/* Icons — w-5 h-5 = 20px */}
                      <item.icon size={20} className={active ? "text-white" : "text-slate-400"} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Settings */}
        <div className="border-t border-slate-800 pt-4">
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
              location.pathname.startsWith("/settings")
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Settings size={20} className="text-slate-400" />
            <span>الإعدادات</span>
          </Link>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
        >
          <LogOut size={20} />
          تسجيل خروج
        </button>
      </div>
    </aside>
  );
}
