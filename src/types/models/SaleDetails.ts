import type { ProductPatchRequestDto } from "./Product";
import type { Sale } from "./Sale";

export interface SaleDetails {
  id: number;
  saleResponseDto: Sale;
  productPatchRequestDtos: ProductPatchRequestDto;
  amount: number;
  discount: number;
  quantity: number;
}

export interface SaleDetailsRequest {
  id?: number;
  saleResponseDto?: Sale;
  productPatchRequestDtos?: ProductPatchRequestDto;
  amount?: number;
  discount?: number;
  quantity?: number;
}

export interface SaleDetailsResponse {
  id: number;
  saleResponseDto: Sale;
  productPatchRequestDtos: ProductPatchRequestDto;
  amount: number;
  discount: number;
  quantity: number;
}