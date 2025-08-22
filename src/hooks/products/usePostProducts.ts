import { useMutation, useQueryClient } from "@tanstack/react-query";

import { add } from "../../services/producService";
import type { Product, ProductRequest } from "../../types/models/types";

export function usePostProducts() {
  const queryClient = useQueryClient();
  const { data, isPending, isSuccess, mutate, error } = useMutation<
    Product,
    Error,
    ProductRequest
  >({
    mutationKey: ["postProduct"],
    mutationFn: add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { data, isPending, isSuccess, mutate, error };
}
