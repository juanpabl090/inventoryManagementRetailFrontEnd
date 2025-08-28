import { useMutation, useQueryClient } from "@tanstack/react-query";
import { add } from "../../services/producService";
import type { ProductResponse, ProductRequest } from "../../types/models/index";

export function usePostProducts() {
  const queryClient = useQueryClient();
  const { data, isPending, isSuccess, mutate, error, isError, reset } =
    useMutation<ProductResponse, Error, ProductRequest>({
      mutationKey: ["postProduct"],
      mutationFn: add,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    });

  return { data, isPending, isSuccess, mutate, error, isError, reset };
}
