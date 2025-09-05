import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CategoryRequest, CategoryResponse } from "../../types/models";
import { add } from "../../services/categoryService";

export default function usePostCategories() {
  const queryClient = useQueryClient();
  const { data, error, isError, isSuccess, mutate, isPending, reset } =
    useMutation<CategoryResponse, Error, CategoryRequest>({
      mutationKey: ["postCategory"],
      mutationFn: add,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    });

  return { data, error, isError, isSuccess, mutate, isPending, reset };
}
