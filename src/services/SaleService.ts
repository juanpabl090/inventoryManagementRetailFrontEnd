import type { SaleRequest } from "./../types/models/Sale";
import { API_PATHS } from "../constants/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import type { SaleResponse, salesByDate } from "../types/models";

export const registerSale = async (
  SaleRequest: SaleRequest,
): Promise<SaleResponse> => {
  const res = await axiosInstance.post(
    API_PATHS.SALES.REGISTER_SALE,
    SaleRequest,
  );
  return res.data;
};

export const getAll = async (
  start: string,
  end: string,
): Promise<salesByDate[]> => {
  const res = await axiosInstance.get(API_PATHS.SALES.GET_BY_ID, {
    params: {
      start: start,
      end: end,
    },
  });
  return res.data;
};
