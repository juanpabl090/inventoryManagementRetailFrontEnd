import axiosInstance from "../utils/axiosInstance";
import type {
  ProductTypeRequest,
  ProductTypeResponse,
} from "../types/models/ProductType";
import { API_PATHS } from "../constants/apiPaths";
import { isAxiosError } from "axios";

export const add = async (
  productTypeRequest: ProductTypeRequest
): Promise<ProductTypeResponse> => {
  try {
    const res = await axiosInstance.post(
      API_PATHS.PRODUCT_TYPES.ADD,
      productTypeRequest
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.message);
    }
    throw new Error("Hubo un error al crear el tipo de producto", {
      cause: error,
    });
  }
};
export const getAll = async (): Promise<ProductTypeResponse[]> => {
  try {
    const res = await axiosInstance.get(API_PATHS.PRODUCT_TYPES.ALL);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.message);
    }
    throw new Error("Hubo un error al cargar los tipos de producto", {
      cause: error,
    });
  }
};
export const deleteById = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(API_PATHS.PRODUCT_TYPES.DELETEBYID(id));
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.message);
    }
    throw new Error("Hubo un error al eliminar el tipo de producto", {
      cause: error,
    });
  }
};
export const updateById = async (
  productTypeRequest: ProductTypeRequest
): Promise<ProductTypeResponse> => {
  try {
    const res = await axiosInstance.put(
      API_PATHS.PRODUCT_TYPES.UPDATEBYID(Number(productTypeRequest.id)),
      productTypeRequest
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.message);
    }
    throw new Error("Hubo un error al actualizar el tipo de producto", {
      cause: error,
    });
  }
};
