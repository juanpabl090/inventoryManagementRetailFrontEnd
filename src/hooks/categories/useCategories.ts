import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/categoryService";
import type { Category } from "../../types/models";

export default function useCategories() {
  const { data, isError, isSuccess, isLoading, error } = useQuery<
    Category[],
    Error
  >({
    queryKey: ["categories"],
    queryFn: getAll,
  });

  return { data, isError, isSuccess, isLoading, error };
}
