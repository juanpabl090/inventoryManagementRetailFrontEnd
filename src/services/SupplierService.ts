import { isAxiosError } from "axios";
import type { SupplierRequest, SupplierResponse } from "../types/models";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../constants/apiPaths";

export const getAll = async (): Promise<SupplierResponse[]> => {
  try {
    const res = await axiosInstance.get(API_PATHS.SUPPLIERS.ALL);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("Hubo un error intentar cargar los proveedores", {
      cause: error,
    });
  }
};

export const add = async (
  supplierRequest: SupplierRequest
): Promise<SupplierResponse> => {
  try {
    const res = await axiosInstance.post(
      API_PATHS.SUPPLIERS.ADD,
      supplierRequest
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("Hubo un error intentar crear el proveedor", {
      cause: error,
    });
  }
};

export const updateById = async (
  supplierRequest: SupplierRequest
): Promise<SupplierResponse> => {
  try {
    const res = await axiosInstance.put(
      API_PATHS.SUPPLIERS.UPDATEBYID(Number(supplierRequest.id)),
      supplierRequest
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("Hubo un error intentar actualizar el proveedor", {
      cause: error,
    });
  }
};

export const deleteById = async (
  supplierRequest: SupplierRequest
): Promise<void> => {
  try {
    await axiosInstance.delete(
      API_PATHS.SUPPLIERS.DELETEBYID(Number(supplierRequest.id))
    );
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("Hubo un error intentar eliminar el proveedor", {
      cause: error,
    });
  }
};
