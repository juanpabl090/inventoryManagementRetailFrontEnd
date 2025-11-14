import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/SaleService";

export function useSalesById(start: string, end: string) {
  const { data, error, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["GetSalesById", { start, end }],
    queryFn: () => getAll(start, end),
    enabled: !!start && !!end,
  });

  return { data, error, isError, isSuccess, isLoading };
}
