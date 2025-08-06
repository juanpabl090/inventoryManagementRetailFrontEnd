import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatchProductByName } from "../../services/producService";
import type { Product } from "../../types/types";

export function usePatchProductsByName() {
  const queryClient = useQueryClient();
  const { error, isSuccess, mutate } = useMutation<Product, Error, Product>({
    mutationKey: ["patchProduct"],
    mutationFn: updatePatchProductByName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { error, isSuccess, mutate };
}
