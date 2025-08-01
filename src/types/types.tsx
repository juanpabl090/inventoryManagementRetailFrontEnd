export interface Product {
  id?: number;
  name: string;
  description: string;
  categoryId: number;
  buyPrice: number;
  salePrice: number;
  stock: number;
  createdDate: string;
  updatedDate: string;
  supplierId: number;
  productTypeId: number;
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductType {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Purchase {
  id: string;
  productId: string;
  supplierId: string;
  quantity: number;
  totalAmount: number;
  date: Date;
  createdAt: Date;
}

export interface Sale {
  id: string;
  totalAmount: number;
  date: Date;
  details: SaleDetail[];
  createdAt: Date;
}

export interface SaleDetail {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  subtotal: number;
}

export type ActiveTab =
  | "products"
  | "categories"
  | "productTypes"
  | "suppliers"
  | "purchases"
  | "sales"
  | "reports";
