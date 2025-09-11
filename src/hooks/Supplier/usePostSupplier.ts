import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SupplierRequest, SupplierResponse } from "../../types/models";
import { add } from "../../services/SupplierService";

export const usePostSupplier = () => {
  const queryClient = useQueryClient();
  const { data, error, isError, isSuccess, mutate, reset } = useMutation<
    SupplierResponse,
    Error,
    SupplierRequest
  >({
    mutationKey: ["PostSupplier"],
    mutationFn: add,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Supplier"],
      });
    },
  });

  return { data, error, isError, isSuccess, mutate, reset };
};
