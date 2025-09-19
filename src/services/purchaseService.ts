import { isAxiosError } from "axios";
import { API_PATHS } from "../constants/apiPaths";
import type {
  PurchaseResponse,
  PurchaseRequest,
  Purchase,
} from "../types/models/index";
import axiosInstance from "../utils/axiosInstance";

export const getAll = async (): Promise<Purchase[]> => {
  try {
    const res = await axiosInstance.get(API_PATHS.PURCHASES.ALL);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unexpected error occurred", {
      cause: error,
    });
  }
};

export const add = async (
  purchaseRequest: PurchaseRequest
): Promise<PurchaseResponse> => {
  try {
    const res = await axiosInstance.post(
      API_PATHS.PURCHASES.ADD,
      purchaseRequest
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("No se pudo agregar la compra", { cause: error });
  }
};
