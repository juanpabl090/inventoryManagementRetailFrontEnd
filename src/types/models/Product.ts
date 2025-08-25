import type { Category } from "./Category";
import type { ProductType } from "./ProductType";
import type { Supplier } from "./Supplier";

export interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  buyPrice: number;
  salePrice: number;
  stock: number;
  createdDate: string;
  updatedDate: string;
  supplier: Supplier;
  productType: ProductType;
}

export interface ProductRequest {
  id?: number;
  name: string;
  description: string;
  categoryId: number;
  buyPrice: number;
  salePrice: number;
  stock: number;
  createdDate?: string;
  updatedDate?: string;
  supplierId: number;
  productTypeId: number;
}

export interface ProductResponse {
  id: number;
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

export interface ProductPatchRequestDto {
  id?: number;
  name?: string;
  description?: string;
  categoryId?: Category;
  buyPrice?: number;
  salePrice?: number;
  stock?: number;
  createdDate?: string;
  updatedDate?: string;
  supplierId?: Supplier;
  productTypeId?: ProductType;
}
