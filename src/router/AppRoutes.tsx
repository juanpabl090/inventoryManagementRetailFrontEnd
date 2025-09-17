import { lazy, Suspense, useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { AuthContext } from "../context/authContext/authContext";

const Products = lazy(() => import("../pages/Products"));
const Categories = lazy(() => import("../pages/Categories"));
const ProductTypes = lazy(() => import("../pages/ProductsTypes"));
const Suppliers = lazy(() => import("../pages/Suppliers"));
const Purchases = lazy(() => import("../pages/Purchases"));
const Sales = lazy(() => import("../pages/Sales"));
const Reports = lazy(() => import("../pages/Reports"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/auth/Login"));

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
};

const ProtectedRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default function AppRoute() {
  const auth = useContext(AuthContext);
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={<ProtectedRoutes isAuthenticated={!!auth?.accessToken} />}
        >
          <Route path="/" element={<Navigate to="products" replace />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/ProductTypes" element={<ProductTypes />} />
          <Route path="/Suppliers" element={<Suppliers />} />
          <Route path="/Purchases" element={<Purchases />} />
          <Route path="/Sales" element={<Sales />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={auth?.accessToken ? "/" : "/login"} />}
        />
      </Routes>
    </Suspense>
  );
}
