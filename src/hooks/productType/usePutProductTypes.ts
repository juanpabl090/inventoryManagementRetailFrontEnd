import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ProductTypeRequest,
  ProductTypeResponse,
} from "../../types/models";
import { updateById } from "../../services/productTypeService";

export const usePutProductTypes = () => {
  const queryClient = useQueryClient();
  const { data, isError, isSuccess, error, reset, mutate } = useMutation<
    ProductTypeResponse,
    Error,
    ProductTypeRequest
  >({
    mutationKey: ["PutProductTypes"],
    mutationFn: updateById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ProductsTypes"] });
    },
  });
  return { data, isSuccess, isError, error, reset, mutate };
};
