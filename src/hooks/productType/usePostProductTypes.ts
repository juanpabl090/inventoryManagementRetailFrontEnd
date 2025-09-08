import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ProductTypeRequest,
  ProductTypeResponse,
} from "../../types/models";
import { add } from "../../services/productTypeService";

export const usePostProductTypes = () => {
  const queryClient = useQueryClient();
  const { data, isError, isSuccess, error, mutate, reset } = useMutation<
    ProductTypeResponse,
    Error,
    ProductTypeRequest
  >({
    mutationKey: ["PostProductType"],
    mutationFn: add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ProductsTypes"] });
    },
  });

  return { data, isError, isSuccess, error, mutate, reset };
};
