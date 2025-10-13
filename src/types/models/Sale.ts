import type { PorductListResponse, ProductsListRequest } from "./index";

export interface Sale {
  id: number;
  date: string;
  amount: number;
}

export interface SaleRequest {
  productsList: ProductsListRequest[];
  discount: number;
}

export interface SaleResponse {
  id: number;
  date: string;
  amount: number;
  saleDetailsResponseDto: saleDetailsResponseDto[];
}

export interface saleDetailsResponseDto {
  id: number;
  product: PorductListResponse;
  amount: number;
  discount: number;
  quantity: number;
}
