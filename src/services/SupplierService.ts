import type { SupplierRequest, SupplierResponse } from "../types/models";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../constants/apiPaths";

export const getAll = async (): Promise<SupplierResponse[]> => {
  const res = await axiosInstance.get(API_PATHS.SUPPLIERS.ALL);
  return res.data;
};

export const add = async (
  supplierRequest: SupplierRequest,
): Promise<SupplierResponse> => {
  const res = await axiosInstance.post(
    API_PATHS.SUPPLIERS.ADD,
    supplierRequest,
  );
  return res.data;
};

export const updateById = async (
  supplierRequest: SupplierRequest,
): Promise<SupplierResponse> => {
  const res = await axiosInstance.put(
    API_PATHS.SUPPLIERS.UPDATEBYID(Number(supplierRequest.id)),
    supplierRequest,
  );
  return res.data;
};

export const deleteById = async (
  supplierRequest: SupplierRequest,
): Promise<void> => {
  await axiosInstance.delete(
    API_PATHS.SUPPLIERS.DELETEBYID(Number(supplierRequest.id)),
  );
};
