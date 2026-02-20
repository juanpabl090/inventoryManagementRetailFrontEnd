import { API_PATHS } from "../constants/apiPaths";
import type {
  PurchaseResponse,
  PurchaseRequest,
  Purchase,
} from "../types/models/index";
import axiosInstance from "../utils/axiosInstance";

export const getAll = async (): Promise<Purchase[]> => {
  const res = await axiosInstance.get(API_PATHS.PURCHASES.ALL);
  return res.data;
};

export const add = async (
  purchaseRequest: PurchaseRequest,
): Promise<PurchaseResponse> => {
  const res = await axiosInstance.post(
    API_PATHS.PURCHASES.ADD,
    purchaseRequest,
  );
  return res.data;
};
