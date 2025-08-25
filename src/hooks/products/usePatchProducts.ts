import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatchProductByName } from "../../services/producService";
import type { ProductRequest, ProductResponse } from "../../types/models/index";

export function usePatchProductsByName() {
  const queryClient = useQueryClient();
  const { error, isSuccess, mutate } = useMutation<
    ProductResponse,
    Error,
    ProductRequest
  >({
    mutationKey: ["patchProduct"],
    mutationFn: updatePatchProductByName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { error, isSuccess, mutate };
}
