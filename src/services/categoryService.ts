import { isAxiosError } from "axios";
import { API_PATHS } from "../constants/apiPaths";
import type {
  Category,
  CategoryRequest,
  CategoryResponse,
} from "../types/models";
import axiosInstance from "../utils/axiosInstance";

export const getAll = async (): Promise<Category[]> => {
  try {
    const res = await axiosInstance.get(API_PATHS.CATEGORIES.ALL);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error?.message || "No se pudo crear la categoria");
    } else {
      throw new Error("Hubo un error al crear la categoria", {
        cause: error,
      });
    }
  }
};

export const add = async (
  category: CategoryRequest
): Promise<CategoryResponse> => {
  try {
    const res = await axiosInstance.post(API_PATHS.CATEGORIES.ADD, category);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error?.message || "No se pudo crear la categoria");
    } else {
      throw new Error("Hubo un error al crear la categoria", {
        cause: error,
      });
    }
  }
};

export const deleteById = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(API_PATHS.CATEGORIES.DELETEBYID(id));
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error?.message || "No se pudo actualizar la categoria");
    } else {
      throw new Error("Hubo un erro al actualizar la categoria", {
        cause: error,
      });
    }
  }
};

export const updateById = async (
  categoryRequest: CategoryRequest
): Promise<CategoryResponse> => {
  try {
    const res = await axiosInstance.put(
      API_PATHS.CATEGORIES.UPDATEBYID(Number(categoryRequest.id)),
      categoryRequest
    );
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error?.message || "No se pudo actualizar la categoria");
    } else {
      throw new Error("Hubo un erro al actualizar la categoria", {
        cause: error,
      });
    }
  }
};
