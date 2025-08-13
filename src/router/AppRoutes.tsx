import { Navigate, Outlet, Route, Routes } from "react-router";
import {
  Products,
  Categories,
  ProductTypes as RoutesTypes,
  Suppliers,
  Purchases,
  Sales,
  Reports,
  NotFound,
  Login,
} from "../pages/index";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

interface ProtectedRoutesProps {
  isAuthenticated: boolean;
}

const ProtectedRoutes = ({ isAuthenticated }: ProtectedRoutesProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default function AppRoute() {
  const auth = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={<ProtectedRoutes isAuthenticated={!!auth?.accessToken} />}
      >
        <Route path="/" element={<Navigate to="products" replace />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/ProductTypes" element={<RoutesTypes />} />
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
  );
}
