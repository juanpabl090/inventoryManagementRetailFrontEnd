import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CategoryRequest, CategoryResponse } from "../../types/models";
import { updateById } from "../../services/categoryService";

export default function usePutCategories() {
  const queryClient = useQueryClient();
  const { error, isSuccess, isError, mutate, reset } = useMutation<
    CategoryResponse,
    Error,
    CategoryRequest
  >({
    mutationKey: ["patchCategory"],
    mutationFn: updateById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { error, isSuccess, isError, mutate, reset };
}
