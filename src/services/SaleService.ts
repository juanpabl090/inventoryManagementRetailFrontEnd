import type { SaleRequest } from "./../types/models/Sale";
import { isAxiosError } from "axios";
import { API_PATHS } from "../constants/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import type { SaleResponse, salesByDate } from "../types/models";

export const registerSale = async (
  SaleRequest: SaleRequest
): Promise<SaleResponse> => {
  try {
    const res = await axiosInstance.post(
      API_PATHS.SALES.REGISTER_SALE,
      SaleRequest
    );
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data || error?.message);
    }
    throw new Error("No se pudo registrar la compra", { cause: error });
  }
};

export const getAll = async (
  start: string,
  end: string
): Promise<salesByDate[]> => {
  try {
    const res = await axiosInstance.get(API_PATHS.SALES.GET_BY_ID, {
      params: {
        start: start,
        end: end,
      },
    });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data || error?.message);
    }
    throw new Error("No se pudo obtener la lista de ventas", { cause: error });
  }
};
