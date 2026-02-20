import axiosInstance from "../utils/axiosInstance";
import type {
  ProductTypeRequest,
  ProductTypeResponse,
} from "../types/models/ProductType";
import { API_PATHS } from "../constants/apiPaths";

export const add = async (
  productTypeRequest: ProductTypeRequest,
): Promise<ProductTypeResponse> => {
  const res = await axiosInstance.post(
    API_PATHS.PRODUCT_TYPES.ADD,
    productTypeRequest,
  );
  return res.data;
};
export const getAll = async (): Promise<ProductTypeResponse[]> => {
  const res = await axiosInstance.get(API_PATHS.PRODUCT_TYPES.ALL);
  return res.data;
};
export const deleteById = async (id: number): Promise<void> => {
  await axiosInstance.delete(API_PATHS.PRODUCT_TYPES.DELETEBYID(id));
};
export const updateById = async (
  productTypeRequest: ProductTypeRequest,
): Promise<ProductTypeResponse> => {
  const res = await axiosInstance.put(
    API_PATHS.PRODUCT_TYPES.UPDATEBYID(Number(productTypeRequest.id)),
    productTypeRequest,
  );
  return res.data;
};
