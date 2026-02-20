import { lazy, useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { AuthContext } from "../context/authContext/authContext";
import Loader from "../components/loader";

const Products = lazy(() => import("../pages/Products"));
const Categories = lazy(() => import("../pages/Categories"));
const ProductTypes = lazy(() => import("../pages/ProductsTypes"));
const Suppliers = lazy(() => import("../pages/Suppliers"));
const Purchases = lazy(() => import("../pages/Purchases"));
const Sales = lazy(() => import("../pages/Sales"));
const Reports = lazy(() => import("../pages/Reports"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Nav = lazy(() => import("../layouts/Nav"));
const LeftMenu = lazy(() => import("../layouts/LeftMenu"));

const ProtectedRoutes = ({
  isAuthenticated,
  isLoading,
}: {
  isAuthenticated: boolean;
  isLoading: boolean | undefined;
}) => {
  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function PublicLayout() {
  return <Outlet />;
}

function PrivateLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-40 w-full">
        <Nav />
      </div>
      <div className="flex flex-1 ">
        <div className="max-w-7xl flex-shrink-0">
          <LeftMenu />
        </div>
        <main className="flex flex-col bg-neutral-100 w-screen p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function AppRoute() {
  const auth = useContext(AuthContext);
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Rutas protegidas */}
      <Route
        element={
          <ProtectedRoutes
            isAuthenticated={!!auth?.user}
            isLoading={auth?.loading}
          />
        }
      >
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Navigate to="products" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/productTypes" element={<ProductTypes />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
