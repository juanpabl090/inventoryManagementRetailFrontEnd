import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SupplierRequest } from "../../types/models";
import { deleteById } from "../../services/SupplierService";

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();
  const { data, error, isError, isSuccess, mutate, reset } = useMutation<
    void,
    Error,
    SupplierRequest
  >({
    mutationKey: ["DeleteSupplier"],
    mutationFn: deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Supplier"],
      });
    },
  });

  return { data, error, isError, isSuccess, mutate, reset };
};
