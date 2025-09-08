import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteById } from "../../services/productTypeService";

export const useDeleteProductTypes = () => {
  const queryClient = useQueryClient();
  const { data, isError, isSuccess, error, reset, mutate } = useMutation<
    void,
    Error,
    number
  >({
    mutationKey: ["DeleteProductType"],
    mutationFn: deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ProductsTypes"] });
    },
  });

  return { data, isError, isSuccess, error, reset, mutate };
};
