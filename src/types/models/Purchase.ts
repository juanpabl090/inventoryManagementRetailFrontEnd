import type {
  Supplier,
  SupplierRequest,
  SupplierResponse,
  Product,
  ProductResponse,
  ProductPatchRequestDto,
} from "./index";

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
  product?: ProductPatchRequestDto;
  supplier?: SupplierRequest;
  quantity?: number;
  amount?: number;
  date?: string;
}

export interface PurchaseResponse {
  id: number;
  product: ProductResponse;
  supplier: SupplierResponse;
  quantity: number;
  amount: number;
  date: string;
}
