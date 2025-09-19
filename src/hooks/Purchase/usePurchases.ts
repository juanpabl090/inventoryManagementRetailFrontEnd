import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/purchaseService";
import type { Purchase } from "../../types/models";

export const usePurchases = () => {
  const { data, error, isError, isSuccess, isLoading } = useQuery<
    Purchase[],
    Error
  >({
    queryKey: ["Purchases"],
    queryFn: getAll,
  });

  return { data, error, isError, isSuccess, isLoading };
};
