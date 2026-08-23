import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./features/auth/hooks/useAuth";
import { AppLayout } from "./shared/components/layout/AppLayout";
import { PageLoader } from "./shared/components/ui/PageLoader";
import { FeatureBoundaryLayout } from "./shared/components/errors/FeatureBoundaryLayout";

// Lazy Loaded Pages
const LoginPage = lazy(() => import("./features/auth/pages/LoginPage").then(module => ({ default: module.LoginPage })));
const DashboardPage = lazy(() => import("./features/dashboard/pages/DashboardPage").then(module => ({ default: module.DashboardPage })));
const ProductsPage = lazy(() => import("./features/inventory/pages/ProductsPage").then(module => ({ default: module.ProductsPage })));
const ProductDetailsPage = lazy(() => import("./features/inventory/pages/ProductDetailsPage").then(module => ({ default: module.ProductDetailsPage })));
const CategoriesPage = lazy(() => import("./features/inventory/pages/CategoriesPage").then(module => ({ default: module.CategoriesPage })));
const PosPage = lazy(() => import("./features/sales/pages/PosPage").then(module => ({ default: module.PosPage })));
const SalesHistoryPage = lazy(() => import("./features/sales/pages/SalesHistoryPage").then(module => ({ default: module.SalesHistoryPage })));
const PurchasesHistoryPage = lazy(() => import("./features/purchases/pages/PurchasesHistoryPage").then(module => ({ default: module.PurchasesHistoryPage })));
const CustomersPage = lazy(() => import("./features/contacts/pages/CustomersPage").then(module => ({ default: module.CustomersPage })));
const SuppliersPage = lazy(() => import("./features/suppliers/pages/SuppliersPage").then(module => ({ default: module.SuppliersPage })));
const DrawerPage = lazy(() => import("./features/finance/pages/DrawerPage").then(module => ({ default: module.DrawerPage })));
const SafePage = lazy(() => import("./features/finance/pages/SafePage").then(module => ({ default: module.SafePage })));
const ExpensesPage = lazy(() => import("./features/finance/pages/ExpensesPage").then(module => ({ default: module.ExpensesPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 1000 * 60 },
  },
});

// Guard: redirects to /login if not authenticated, and checks permissions
function ProtectedRoute({ children, requiredPermissions = [] }: { children: React.ReactNode, requiredPermissions?: string[] }) {
  const { isAuthenticated, hasPermission } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (requiredPermissions.length > 0) {
    const hasAll = requiredPermissions.every(p => hasPermission(p));
    if (!hasAll) {
      return (
        <div className="flex h-screen items-center justify-center bg-gray-50 flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-800">غير مصرح لك بالدخول</h1>
          <p className="text-gray-500">لا تملك الصلاحيات الكافية للوصول إلى هذه الصفحة.</p>
        </div>
      );
    }
  }

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
          
          <Suspense fallback={<PageLoader />}>
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
                <Route path="/" element={<DashboardPage />} />

                <Route element={<FeatureBoundaryLayout featureName="المبيعات" />}>
                  <Route path="/sales/pos"          element={<PosPage />} />
                  <Route path="/sales/history"      element={<SalesHistoryPage />} />
                  <Route path="/sales/returns"      element={<ComingSoon label="مرتجعات المبيعات" />} />
                </Route>

                <Route element={<FeatureBoundaryLayout featureName="المشتريات" />}>
                  <Route path="/purchases/new"      element={<ComingSoon label="فاتورة مشتريات جديدة" />} />
                  <Route path="/purchases/history"  element={<PurchasesHistoryPage />} />
                  <Route path="/purchases/returns"  element={<ComingSoon label="مرتجعات الموردين" />} />
                </Route>

                <Route element={<FeatureBoundaryLayout featureName="المخزون" />}>
                  <Route path="/inventory/products"   element={<ProductsPage />} />
                  <Route path="/inventory/products/:id" element={<ProductDetailsPage />} />
                  <Route path="/inventory/categories" element={<CategoriesPage />} />
                </Route>

                <Route element={<FeatureBoundaryLayout featureName="جهات الاتصال" />}>
                  <Route path="/contacts/customers" element={<CustomersPage />} />
                  <Route path="/contacts/suppliers" element={<SuppliersPage />} />
                </Route>

                <Route element={<FeatureBoundaryLayout featureName="المالية" />}>
                  <Route path="/finance/drawer"   element={<DrawerPage />} />
                  <Route path="/finance/safe"     element={<SafePage />} />
                  <Route path="/finance/expenses" element={<ExpensesPage />} />
                </Route>

                <Route path="/settings" element={<ComingSoon label="الإعدادات" />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
