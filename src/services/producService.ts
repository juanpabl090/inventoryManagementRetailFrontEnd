import { isAxiosError } from "axios";
import type { Product, ProductRequest } from "../types/models/types";
import axiosInstance from "../utils/axiosInstance";

import { API_PATHS } from "../constants/apiPaths";

const path = "/products";

export const getProduct = async () => {
  const res = await axiosInstance.get(API_PATHS.PRODUCTS.GET);
  return res.data;
};

export const getAll = async () => {
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
    `${path}/productTypeName/${productTypeName}`
  );
  return res.data;
};

export const add = async (product: ProductRequest): Promise<Product> => {
  try {
    const res = await axiosInstance.post<Product>(
      API_PATHS.PRODUCTS.ADD,
      product
    );
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data || "No se pudo agregar el producto");
    } else {
      console.error("Error desconocido al agregar producto:", error);
      throw new Error("No se pudo agregar el producto");
    }
  }
};

export const deleteById = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(API_PATHS.PRODUCTS.DELETE_BY_ID(id));
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error?.response?.data || "No se pudo eliminar el producto"
      );
    }
  }
};

export const updatePatchProductByName = async (
  product: Product
): Promise<Product> => {
  const name = product.name;
  try {
    const res = await axiosInstance.patch(
      API_PATHS.PRODUCTS.UPDATE_PATCH_PRODUCT_BY_NAME(name),
      product
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error?.response?.data || "No se pudo actualizar el producto"
      );
    }
    throw new Error("Error desconocido al actualizar el producto" + error);
  }
};
