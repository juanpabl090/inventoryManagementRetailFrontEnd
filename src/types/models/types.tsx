export interface Product {
  id?: number;
  name: string;
  description: string;
  category: Category;
  buyPrice: number;
  salePrice: number;
  stock: number;
  createdDate?: string;
  updatedDate?: string;
  supplier: Supplier;
  productType: ProductType;
}

export interface ProductAdd {
  id?: number;
  name: string;
  description: string;
  category: number;
  buyPrice: number;
  salePrice: number;
  stock: number;
  createdDate?: string;
  updatedDate?: string;
  supplier: number;
  productType: number;
}

export interface Category {
  id?: number;
  name: string;
}

export interface ProductType {
  id?: number;
  name: string;
  products?: Product[];
}

export interface Supplier {
  id?: number;
  name: string;
  contact?: Contact;
}

export interface Contact {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Purchase {
  id?: number;
  productId: string | Product;
  supplierId: string | Supplier;
  quantity: number;
  totalAmount: number;
  date: Date;
}

export interface Sale {
  id?: number;
  date: Date;
  amount: number;
}

export interface SaleDetail {
  id: string;
  saleId: string | Sale;
  productId: string | Product;
  amount: number;
  discount: number;
  quantity: number;
}

export type ActiveTab =
  | "products"
  | "categories"
  | "productTypes"
  | "suppliers"
  | "purchases"
  | "sales"
  | "reports";
