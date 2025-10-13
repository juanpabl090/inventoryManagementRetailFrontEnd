import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerSale } from "../../services/SaleService";

export const usePostSales = () => {
  const queryCLient = useQueryClient();
  const { data, error, isError, isSuccess, mutate, reset } = useMutation({
    mutationKey: ["PostSale"],
    mutationFn: registerSale,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["Sale"],
      });
    },
  });

  return { data, error, isError, isSuccess, mutate, reset };
};
