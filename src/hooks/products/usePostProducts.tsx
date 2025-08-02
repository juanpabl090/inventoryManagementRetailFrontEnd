import { useMutation, useQueryClient } from "@tanstack/react-query";

import { add } from "../../services/producService";
import type { Product } from "../../types/types";

export default function usePostProducts() {
  const queryClient = useQueryClient();
  const { data, isPending, isSuccess, mutate, error } = useMutation<
    Product,
    Error,
    Product
  >({
    mutationKey: ["Product"],
    mutationFn: add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  return { data, isPending, isSuccess, mutate, error };
}
