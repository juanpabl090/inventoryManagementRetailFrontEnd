import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  PurchaseRequest,
  PurchaseResponse,
} from "../../types/models/index";
import { add } from "../../services/purchaseService";

export const usePostPurchase = () => {
  const queryClient = useQueryClient();
  const { data, mutate, error, isError, isSuccess, reset } = useMutation<
    PurchaseResponse,
    Error,
    PurchaseRequest
  >({
    mutationKey: ["PostPurchase"],
    mutationFn: add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Purchases"] });
    },
  });

  return { data, mutate, error, isError, isSuccess, reset };
};
