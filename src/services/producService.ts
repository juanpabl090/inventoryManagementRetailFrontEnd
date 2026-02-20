import type {
  ProductResponse,
  ProductRequest,
  Product,
} from "../types/models/index";
import axiosInstance from "../utils/axiosInstance";

import { API_PATHS } from "../constants/apiPaths";

const path = "/products";

export const getProduct = async () => {
  const res = await axiosInstance.get(API_PATHS.PRODUCTS.GET);
  return res.data;
};

export const getAll = async (): Promise<Product[]> => {
  const res = await axiosInstance.get(API_PATHS.PRODUCTS.ALL);
  return res.data;
};

export const getProductById = async (id: number) => {
  const res = await axiosInstance.get(`${path}/id/${id}`);
  return res.data;
};
export const getProductByName = async (name: string) => {
  const res = await axiosInstance.get(`${path}/name/${name}`);
  return res.data;
};

export const getProductTypeName = async (productTypeName: string) => {
  const res = await axiosInstance.get(
    `${path}/productTypeName/${productTypeName}`,
  );
  return res.data;
};

export const add = async (
  product: ProductRequest,
): Promise<ProductResponse> => {
  const res = await axiosInstance.post<ProductResponse>(
    API_PATHS.PRODUCTS.ADD,
    product,
  );
  return res.data;
};

export const deleteById = async (id: number): Promise<void> => {
  await axiosInstance.delete(API_PATHS.PRODUCTS.DELETE_BY_ID(id));
};

export const updatePatchProductByName = async (
  product: ProductRequest,
): Promise<ProductResponse> => {
  const name = product.name;
  const res = await axiosInstance.patch(
    API_PATHS.PRODUCTS.UPDATE_PATCH_PRODUCT_BY_NAME(name),
    product,
  );
  return res.data;
};
