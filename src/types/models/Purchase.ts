import type { Product } from "./Product";
import type { Supplier } from "./Supplier";

export interface Purchase {
  id: number;
  product: Product;
  supplier: Supplier;
  quantity: number;
  amount: number;
  date: string;
}

export interface PurchaseRequest {
  id?: number;
  product?: Product;
  supplier?: Supplier;
  quantity?: number;
  amount?: number;
  date?: string;
}

export interface PurchaseResponse {
  id: number;
  product: Product;
  supplier: Supplier;
  quantity: number;
  amount: number;
  date: string;
}