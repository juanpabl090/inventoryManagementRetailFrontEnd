import { API_PATHS } from "../constants/apiPaths";
import type {
  Category,
  CategoryRequest,
  CategoryResponse,
} from "../types/models";
import axiosInstance from "../utils/axiosInstance";

export const getAll = async (): Promise<Category[]> => {
  const res = await axiosInstance.get(API_PATHS.CATEGORIES.ALL);
  return res.data;
};

export const add = async (
  category: CategoryRequest,
): Promise<CategoryResponse> => {
  const res = await axiosInstance.post(API_PATHS.CATEGORIES.ADD, category);
  return res.data;
};

export const deleteById = async (id: number): Promise<void> => {
  await axiosInstance.delete(API_PATHS.CATEGORIES.DELETEBYID(id));
};

export const updateById = async (
  categoryRequest: CategoryRequest,
): Promise<CategoryResponse> => {
  const res = await axiosInstance.put(
    API_PATHS.CATEGORIES.UPDATEBYID(Number(categoryRequest.id)),
    categoryRequest,
  );
  return res.data;
};
