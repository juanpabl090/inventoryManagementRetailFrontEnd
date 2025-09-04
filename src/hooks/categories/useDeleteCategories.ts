import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteById } from "../../services/categoryService";

export default function useDeleteCategories() {
  const QueryClient = useQueryClient();
  const { data, error, isPending, isSuccess, mutate, isError, reset } =
    useMutation<void, Error, number>({
      mutationKey: ["deleteCategory"],
      mutationFn: deleteById,
      onSuccess: () => {
        QueryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    });

  return { data, error, isPending, isSuccess, mutate, isError, reset };
}
