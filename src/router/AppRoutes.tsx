import { Navigate, Route, Routes } from "react-router";
import {
  Products,
  Categories,
  ProductTypes,
  Suppliers,
  Purchases,
  Sales,
  Reports,
} from "../pages/index";

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="products" replace />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Categories" element={<Categories />} />
      <Route path="/ProductTypes" element={<ProductTypes />} />
      <Route path="/Suppliers" element={<Suppliers />} />
      <Route path="/Purchases" element={<Purchases />} />
      <Route path="/Sales" element={<Sales />} />
      <Route path="/Reports" element={<Reports />} />
    </Routes>
  );
}
