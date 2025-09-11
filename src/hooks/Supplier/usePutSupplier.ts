import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SupplierRequest, SupplierResponse } from "../../types/models";
import { updateById } from "../../services/SupplierService";

export const usePutSupplier = () => {
  const queryClient = useQueryClient();
  const { data, error, isError, isSuccess, mutate, reset } = useMutation<
    SupplierResponse,
    Error,
    SupplierRequest
  >({
    mutationKey: ["PutSupplier"],
    mutationFn: updateById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Supplier"],
      });
    },
  });

  return { data, error, isError, isSuccess, mutate, reset };
};
