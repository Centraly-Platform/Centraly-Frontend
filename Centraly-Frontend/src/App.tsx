import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./features/auth/hooks/useAuth";
import { AppLayout } from "./shared/components/layout/AppLayout";

// Pages
import { LoginPage } from "./features/auth/pages/LoginPage";
import { DashboardPage } from "./features/dashboard/pages/DashboardPage";
import { ProductsPage } from "./features/inventory/pages/ProductsPage";
import { CategoriesPage } from "./features/inventory/pages/CategoriesPage";
import { PosPage } from "./features/sales/pages/PosPage";
import { SalesHistoryPage } from "./features/sales/pages/SalesHistoryPage";
import { PurchasesHistoryPage } from "./features/purchases/pages/PurchasesHistoryPage";
import { CustomersPage } from "./features/contacts/pages/CustomersPage";
import { SuppliersPage } from "./features/contacts/pages/SuppliersPage";
import { DrawerPage } from "./features/finance/pages/DrawerPage";
import { SafePage } from "./features/finance/pages/SafePage";
import { ExpensesPage } from "./features/finance/pages/ExpensesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 1000 * 60 },
  },
});

// Guard: redirects to /login if not authenticated
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// Placeholder for routes not yet built
function ComingSoon({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
      <p className="text-gray-400 text-sm">{label} — هذه الصفحة قيد الإنشاء...</p>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-center" richColors />
          <Routes>
            {/* Public */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected — wrapped in AppLayout */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/"                   element={<DashboardPage />} />

              <Route path="/sales/pos"          element={<PosPage />} />
              <Route path="/sales/history"      element={<SalesHistoryPage />} />
              <Route path="/sales/returns"      element={<ComingSoon label="مرتجعات المبيعات" />} />

              <Route path="/purchases/new"      element={<ComingSoon label="فاتورة مشتريات جديدة" />} />
              <Route path="/purchases/history"  element={<PurchasesHistoryPage />} />
              <Route path="/purchases/returns"  element={<ComingSoon label="مرتجعات الموردين" />} />

              <Route path="/inventory/products"   element={<ProductsPage />} />
              <Route path="/inventory/categories" element={<CategoriesPage />} />

              <Route path="/contacts/customers" element={<CustomersPage />} />
              <Route path="/contacts/suppliers" element={<SuppliersPage />} />

              <Route path="/finance/drawer"   element={<DrawerPage />} />
              <Route path="/finance/safe"     element={<SafePage />} />
              <Route path="/finance/expenses" element={<ExpensesPage />} />

              <Route path="/settings" element={<ComingSoon label="الإعدادات" />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
