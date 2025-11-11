import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/SaleService";

export function useSalesById() {
  const { data, error, isError, isSuccess, isLoading } = useQuery({
    queryKey: [""],
    queryFn: getAll,
  });

  return { data, error, isError, isSuccess, isLoading };
}
