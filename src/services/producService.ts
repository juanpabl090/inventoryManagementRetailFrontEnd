import { isAxiosError } from "axios";
import type { Product } from "../types/types";
import axiosInstance from "../utils/axiosInstance";

const path = "/products";

export const getProduct = async () => {
  const res = await axiosInstance.get(`${path}/get`);
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

export const add = async (product: Product): Promise<Product> => {
  try {
    const res = await axiosInstance.post<Product>(`${path}/add`, product);
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
    await axiosInstance.delete(`${path}/delete/id/${id}`);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error?.response?.data || "No se pudo eliminar el producto"
      );
    }
  }
};
